"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { getToken } from '@/lib/auth';

type Role = 'doctor' | 'patient';

type Incoming =
  | { type: 'system'; text: string }
  | { type: 'sdp-offer'; sdp: any }
  | { type: 'sdp-answer'; sdp: any }
  | { type: 'ice-candidate'; candidate: any }
  | { type: 'alert'; level: 'info'|'warn'|'critical'; text: string }
  | { type: 'details'; diagnosis: string; prescription: string[]; followUp: string };

export function useWebRTCCall(appointmentId: string, role: Role) {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [events, setEvents] = useState<string[]>([]);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const [error, setError] = useState<string | null>(null);

  const iceServers = useMemo<RTCConfiguration>(() => ({
    iceServers: [
      { urls: (process.env.NEXT_PUBLIC_RTC_STUN || 'stun:stun.l.google.com:19302') },
      // Configura servidores TURN en producción mediante variables de entorno
    ],
  }), []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const pc = new RTCPeerConnection(iceServers);
      pcRef.current = pc;

      pc.onicecandidate = (e) => {
        if (e.candidate) send({ type: 'ice-candidate', candidate: e.candidate });
      };
      pc.ontrack = (e) => { if (mounted) setRemoteStream(e.streams[0]); };
      pc.ondatachannel = (e) => { dcRef.current = e.channel; attachDataChannel(e.channel); };

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (!mounted || !pcRef.current || pcRef.current.signalingState === 'closed') {
        // Si el efecto ya se desmontó, libera la captura local
        stream.getTracks().forEach(t => t.stop());
        return;
      }
      stream.getTracks().forEach(t => pcRef.current!.addTrack(t, stream));
      if (mounted) setLocalStream(stream);

      const base = process.env.NEXT_PUBLIC_WS_URL?.replace('/chat', '/call')
        ?? `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/call`;
      const token = getToken();
      const url = new URL(base);
      url.searchParams.set('aid', appointmentId);
      url.searchParams.set('role', role);
      if (token) url.searchParams.set('token', token);
      const ws = new WebSocket(url.toString());
      wsRef.current = ws;

      if (role === 'doctor') {
        const dc = pc.createDataChannel('data');
        dcRef.current = dc;
        attachDataChannel(dc);
      }

      ws.onmessage = async (ev) => {
        const msg = JSON.parse(ev.data) as Incoming;
        if (msg.type === 'system') {
          push(`${msg.text}`);
          if (/no autorizado/i.test(msg.text)) setError(msg.text);
        }
        if (msg.type === 'sdp-offer') {
          if (pc.signalingState === 'closed') return;
          await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          send({ type: 'sdp-answer', sdp: answer });
        }
        if (msg.type === 'sdp-answer') {
          if (pc.signalingState === 'closed') return;
          await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
        }
        if (msg.type === 'ice-candidate') {
          try { await pc.addIceCandidate(new RTCIceCandidate(msg.candidate)); } catch {}
        }
        if (msg.type === 'alert') push(`Alerta: ${msg.level.toUpperCase()} · ${msg.text}`);
        if (msg.type === 'details') push(`Detalles: ${msg.diagnosis}`);
      };
      ws.onclose = (e) => {
        if (!error) setError(`Conexión cerrada (${e.code})${e.reason ? ': ' + e.reason : ''}`);
      };

      ws.onopen = async () => {
        push('Conectado a señalización');
        if (role === 'doctor') {
          if (pc.signalingState === 'closed') return;
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          send({ type: 'sdp-offer', sdp: offer });
        }
      };

      function send(data: any) {
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(data));
      }

      function attachDataChannel(dc: RTCDataChannel) {
        dc.onmessage = (e) => {
          try { const m = JSON.parse(e.data); if (m?.type) push(`DC: ${m.type}`); } catch {}
        };
      }
    })();
    return () => {
      mounted = false;
      try { wsRef.current?.close(); } catch {}
      try { pcRef.current?.close(); } catch {}
      try { localStream?.getTracks().forEach(t => t.stop()); } catch {}
    };
  }, [appointmentId, role, iceServers]);

  const sendAlert = (level: 'info'|'warn'|'critical', text: string) => {
    wsRef.current?.send(JSON.stringify({ type: 'alert', level, text }));
  };
  const sendDetails = (diagnosis: string, prescription: string[], followUp: string) => {
    const payload = { type: 'details', diagnosis, prescription, followUp };
    const dc = dcRef.current; if (dc && dc.readyState === 'open') dc.send(JSON.stringify(payload));
    wsRef.current?.send(JSON.stringify(payload));
  };

  const push = (t: string) => setEvents((p) => [...p, t]);

  return { localStream, remoteStream, events, sendAlert, sendDetails, error };
}
