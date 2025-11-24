"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getToken } from "@/lib/auth";

type Role = "doctor" | "patient";

type Incoming =
  | { type: "system"; text: string }
  | { type: "sdp-offer"; sdp: any }
  | { type: "sdp-answer"; sdp: any }
  | { type: "ice-candidate"; candidate: any }
  | { type: "alert"; level: "info" | "warn" | "critical"; text: string }
  | {
      type: "details";
      diagnosis: string;
      prescription: string[];
      followUp: string;
    };

export function useWebRTCCall(appointmentId: string, role: Role) {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [events, setEvents] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const iceServers = useMemo<RTCConfiguration>(() => {
    const stunUrl =
      process.env.NEXT_PUBLIC_RTC_STUN || "stun:stun.l.google.com:19302";

    const turnUrls = process.env.NEXT_PUBLIC_RTC_TURN_URLS;
    const turnUser = process.env.NEXT_PUBLIC_RTC_TURN_USERNAME;
    const turnPass = process.env.NEXT_PUBLIC_RTC_TURN_PASSWORD;

    const servers: RTCIceServer[] = [{ urls: stunUrl }];

    if (turnUrls && turnUser && turnPass) {
      servers.push({
        urls: turnUrls.split(",").map((u) => u.trim()),
        username: turnUser,
        credential: turnPass,
      });
    }

    return { iceServers: servers };
  }, []);

  const push = (t: string) => setEvents((p) => [...p, t]);

  useEffect(() => {
    if (!appointmentId) {
      setError("No se encontró el ID de la cita.");
      return;
    }

    setError(null);

    if (pcRef.current) {
      console.log("[RTC] Reutilizando PeerConnection existente");
      return;
    }

    let cancelled = false;

    const start = async () => {
      try {
        console.log("[RTC] Iniciando llamada para", appointmentId, "como", role);

        const pc = new RTCPeerConnection(iceServers);
        pcRef.current = pc;

        pc.onicecandidate = (e) => {
          if (e.candidate) {
            sendWs({ type: "ice-candidate", candidate: e.candidate });
          }
        };

        pc.ontrack = (e) => {
          if (!cancelled) setRemoteStream(e.streams[0]);
        };

        pc.onconnectionstatechange = () => {
          const state = pc.connectionState;
          console.log("[RTC] connectionState:", state);
          if (state === "failed") {
            setError(
              "No se pudo establecer la conexión de videollamada. " +
                "Puedes volver a intentar o continuar la consulta por chat."
            );
          }
        };

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (cancelled || pc.signalingState === "closed") {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        stream.getTracks().forEach((t) => pc.addTrack(t, stream));
        localStreamRef.current = stream;
        setLocalStream(stream);

        // 👉 SIEMPRE construir el WS hacia el backend (Render) usando env
        const baseCall =
          process.env.NEXT_PUBLIC_WS_CALL_BASE?.replace(/\/$/, "") ||
          (typeof window !== "undefined"
            ? `${window.location.protocol === "https:" ? "wss" : "ws"}://localhost:3001`
            : "ws://localhost:3001");

        const wsUrl = `${baseCall}/call`;
        console.log("CALL_WS_URL:", wsUrl);

        const token = getToken();
        const url = new URL(wsUrl);
        url.searchParams.set("aid", appointmentId);
        url.searchParams.set("role", role);
        if (token) url.searchParams.set("token", token);

        const ws = new WebSocket(url.toString());
        wsRef.current = ws;

        if (role === "doctor") {
          const dc = pc.createDataChannel("data");
          dcRef.current = dc;
          attachDataChannel(dc);
        }

        ws.onopen = async () => {
          console.log("[RTC] WS conectado:", url.toString());
          push("Conectado a señalización");

          if (role === "doctor") {
            if (pc.signalingState === "closed") return;
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            sendWs({ type: "sdp-offer", sdp: offer });
          }
        };

        ws.onerror = (ev) => {
          console.error("CALL WS error:", ev);
        };

        ws.onclose = (e) => {
          console.log("[RTC] WS cerrado", e.code, e.reason);
          if (!cancelled && !error) {
            setError(
              `Conexión cerrada (${e.code})${
                e.reason ? ": " + e.reason : ""
              }`
            );
          }
        };

        ws.onmessage = async (ev) => {
          const msg = JSON.parse(ev.data) as Incoming;

          if (msg.type === "system") {
            push(msg.text);
            if (/no autorizado/i.test(msg.text)) setError(msg.text);
          }

          if (msg.type === "sdp-offer") {
            if (pc.signalingState === "closed") return;
            await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            sendWs({ type: "sdp-answer", sdp: answer });
          }

          if (msg.type === "sdp-answer") {
            if (pc.signalingState === "closed") return;
            await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
          }

          if (msg.type === "ice-candidate") {
            try {
              await pc.addIceCandidate(new RTCIceCandidate(msg.candidate));
            } catch (err) {
              console.warn("Error al agregar ICE", err);
            }
          }

          if (msg.type === "alert") {
            push(`Alerta: ${msg.level.toUpperCase()} · ${msg.text}`);
          }

          if (msg.type === "details") {
            push(`Detalles: ${msg.diagnosis}`);
          }
        };

        function sendWs(data: any) {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
          }
        }

        function attachDataChannel(dc: RTCDataChannel) {
          dc.onmessage = (e) => {
            try {
              const m = JSON.parse(e.data);
              if (m?.type) push(`DC: ${m.type}`);
            } catch {}
          };
        }
      } catch (err: any) {
        console.error("Error iniciando WebRTC:", err);
        setError(
          err?.message ??
            "Ocurrió un error al iniciar la videollamada. Intenta recargar la página."
        );
      }
    };

    start();

    return () => {
      cancelled = true;
      console.log("[RTC] Limpieza de llamada");

      try {
        wsRef.current?.close();
      } catch {}
      wsRef.current = null;

      try {
        pcRef.current?.getSenders().forEach((s) => s.track?.stop());
        pcRef.current?.close();
      } catch {}
      pcRef.current = null;

      try {
        localStreamRef.current?.getTracks().forEach((t) => t.stop());
      } catch {}
      localStreamRef.current = null;
    };
  }, [appointmentId, role, iceServers]);

  const sendAlert = (level: "info" | "warn" | "critical", text: string) => {
    wsRef.current?.send(
      JSON.stringify({
        type: "alert",
        level,
        text,
      })
    );
  };

  const sendDetails = (
    diagnosis: string,
    prescription: string[],
    followUp: string
  ) => {
    const payload = { type: "details", diagnosis, prescription, followUp };
    const dc = dcRef.current;
    if (dc && dc.readyState === "open") {
      dc.send(JSON.stringify(payload));
    }
    wsRef.current?.send(JSON.stringify(payload));
  };

  return { localStream, remoteStream, events, sendAlert, sendDetails, error };
}
