"use client";

import { useEffect, useRef, useState } from "react";
import { useWebRTCCall } from "./useWebRTCCall";
import { Megaphone, ShieldAlert } from "lucide-react";
import CallLinkPanel from "@/components/video/CallLinkPanel";

export default function CallView({
  appointmentId,
  role,
}: {
  appointmentId: string;
  role: "doctor" | "patient";
}) {
  const {
    localStream,
    remoteStream,
    events,
    sendAlert,
    sendDetails,
    error,

    // ✅ ahora sí existen:
    callLink,
    patientReady,
    sendCallLink,
    sendReady,
  } = useWebRTCCall(appointmentId, role);

  const lv = useRef<HTMLVideoElement>(null);
  const rv = useRef<HTMLVideoElement>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  useEffect(() => {
    if (lv.current && localStream) {
      lv.current.srcObject = localStream;
      lv.current.muted = true;
    }
  }, [localStream]);

  useEffect(() => {
    if (rv.current && remoteStream) {
      rv.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const toggleMic = () => {
    if (!localStream) return;
    const next = !micOn;
    setMicOn(next);
    localStream.getAudioTracks().forEach((t) => (t.enabled = next));
  };

  const toggleCam = () => {
    if (!localStream) return;
    const next = !camOn;
    setCamOn(next);
    localStream.getVideoTracks().forEach((t) => (t.enabled = next));
  };

  return (
    <main className="max-w-6xl mx-auto p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Videoconsulta</h1>
        <div className="flex gap-2">
          <button
            onClick={toggleMic}
            className={`px-3 py-2 rounded-lg border ${
              micOn ? "bg-emerald-50" : ""
            }`}
          >
            {micOn ? "Mic ON" : "Mic OFF"}
          </button>
          <button
            onClick={toggleCam}
            className={`px-3 py-2 rounded-lg border ${
              camOn ? "bg-emerald-50" : ""
            }`}
          >
            {camOn ? "Cam ON" : "Cam OFF"}
          </button>
        </div>
      </header>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 text-rose-800 p-3 text-sm">
          {error}
        </div>
      )}

      <section className="grid md:grid-cols-2 gap-3">
        <div className="aspect-video bg-black rounded-xl overflow-hidden">
          <video ref={rv} className="w-full h-full object-cover" autoPlay playsInline />
        </div>
        <div className="aspect-video bg-black rounded-xl overflow-hidden">
          <video ref={lv} className="w-full h-full object-cover" autoPlay playsInline muted />
        </div>
      </section>

      {/* ✅ PANEL CHAT BLANCO (link + listo) */}
      <CallLinkPanel
        role={role}
        callLink={callLink}
        patientReady={patientReady}
        onSendLink={sendCallLink}
        onReady={sendReady}
      />

      {/* acciones doctor opcionales */}
      {role === "doctor" && (
        <section className="flex flex-wrap gap-2">
          <button
            onClick={() => sendAlert("info", "Estamos por comenzar")}
            className="px-3 py-2 rounded-lg border inline-flex items-center gap-2"
          >
            <Megaphone className="w-4 h-4" />
            Enviar alerta
          </button>
          <button
            onClick={() =>
              sendDetails(
                "Consulta inicial",
                ["Paracetamol 500mg c/8h x 3 días"],
                "Control en 7 días"
              )
            }
            className="px-3 py-2 rounded-lg border inline-flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            Enviar detalles
          </button>
        </section>
      )}

      <section className="rounded-xl border bg-card p-3 max-h-40 overflow-auto text-sm text-muted-foreground">
        {events.map((e, i) => (
          <div key={i}>{e}</div>
        ))}
      </section>
    </main>
  );
}
