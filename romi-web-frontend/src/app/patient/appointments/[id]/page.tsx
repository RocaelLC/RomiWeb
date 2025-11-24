"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StatusChip from "@/components/appointments/StatusChip";
import ReminderBanner from "@/components/appointments/ReminderBanner";
import PrepChecklist from "@/components/appointments/PrepChecklist";
import PreConsultForm from "@/components/appointments/PreConsultForm";
import IntakePreview from "@/components/appointments/IntakePreview";
import AltSlots from "@/components/appointments/AltSlots";
import { apiFetchAuth, endpoints } from "@/lib/api";
import { formatLocal } from "@/lib/time";
import type { AppointmentStatus } from "@/lib/types"; // 👈 usa el tipo real


type AppointmentDetail = {
  id: string;
  status: AppointmentStatus;
  startUTC: string;
  tz: string;
  doctor: { id: string; name?: string; email?: string };
  specialty?: string;
  reasonRejection?: string | null;
  altSlots?: string[];
};


const toast = (msg: string) => {
  alert(msg);
};

function normalizeStatus(raw: string): AppointmentStatus {
  const upper = raw.toUpperCase();

  const map: Record<string, AppointmentStatus> = {
    PENDING: "pending" as AppointmentStatus,
    ACCEPTED: "accepted" as AppointmentStatus,
    REJECTED: "rejected" as AppointmentStatus,
    CANCELLED: "cancelled" as AppointmentStatus,
    ATTENDED: "attended" as AppointmentStatus,
  };

  return map[upper] ?? ("pending" as AppointmentStatus);
}


export default function PatientAppointmentPage() {
  const params = useParams();
  const id = String(params?.id ?? "");

  const [appt, setAppt] = useState<AppointmentDetail | null>(null);
  const [aiSummary, setAiSummary] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchAppointment = async () => {
      setLoading(true);
      setError(null);
      try {
        const raw = await apiFetchAuth<any>(
          endpoints.appointments.byId(id),
          { method: "GET" }
        );

        const data: AppointmentDetail = {
          ...raw,
          status: normalizeStatus(raw.status),
        };

        setAppt(data);
        // si luego llamas a IA, aquí
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? "Error al cargar la cita");
        setAppt(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto p-6 space-y-4">
        <div className="h-6 w-40 bg-gray-100 animate-pulse rounded" />
        <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-5xl mx-auto p-6 space-y-4">
        <p className="text-sm text-red-600">
          Ocurrió un error al cargar la cita: {error}
        </p>
      </main>
    );
  }

  if (!appt) {
    return <div className="p-6">No se encontró la cita.</div>;
  }

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">
          Cita {appt.status === "accepted" ? "confirmada" : appt.status}
        </h1>
        <div className="text-sm text-muted-foreground">
          {formatLocal(appt.startUTC, appt.tz)} ·{" "}
          {appt.doctor.name || appt.doctor.email} ·{" "}
          {appt.specialty ?? "General"}{" "}
          <StatusChip value={appt.status} />
        </div>
      </header>

      <ReminderBanner
        startUTC={appt.startUTC}
        joinHref={`/patient/appointments/${appt.id}/call`}
      />

      {appt.status === "rejected" ? (
        <section className="rounded-xl border bg-card p-4">
          <h3 className="font-medium">Cita rechazada</h3>
          <p className="text-sm text-muted-foreground">
            Motivo: {appt.reasonRejection || "No disponible"}
          </p>
          <AltSlots
            slots={appt.altSlots || []}
            onSelect={(s) =>
              toast(`Slot seleccionado: ${new Date(s).toLocaleString()}`)
            }
          />
        </section>
      ) : (
        <div className="grid md:grid-cols-[1fr_360px] gap-4">
          <section className="space-y-4">
            {appt.status === "accepted" && (
              <div className="flex justify-end">
                <button
                  onClick={() =>
                    (window.location.href = `/patient/appointments/${appt.id}/call`)
                  }
                  className="px-4 py-2 rounded-lg bg-cyan-700 text-white hover:bg-cyan-800"
                >
                  Unirme a consulta
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <h3 className="font-medium">Preparar consulta</h3>
              <button className="px-3 py-2 rounded-lg border text-sm">
                Probar mic/cam/red
              </button>
            </div>

            <PrepChecklist storageKey={appt.id} />
            <PreConsultForm appointmentId={appt.id} />

            <div>
              <button
                onClick={() => toast("Abrir ROMI IA (simulado)")}
                className="px-4 py-2 rounded-lg bg-cyan-700 text-white"
              >
                Hablar con ROMI IA
              </button>
            </div>
          </section>

          <aside>{aiSummary && <IntakePreview data={aiSummary} />}</aside>
        </div>
      )}
    </main>
  );
}
