"use client";
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import StatusChip from '@/components/appointments/StatusChip';
import ReminderBanner from '@/components/appointments/ReminderBanner';
import PrepChecklist from '@/components/appointments/PrepChecklist';
import PreConsultForm from '@/components/appointments/PreConsultForm';
import IntakePreview from '@/components/appointments/IntakePreview';
import AltSlots from '@/components/appointments/AltSlots';
import { findAppointment, getAiIntakeSummary, toast } from '@/lib/mock';
import { formatLocal } from '@/lib/time';

export default function PatientAppointmentPage() {
  const params = useParams();
  const id = String(params?.id ?? '');
  const appt = useMemo(() => findAppointment(id), [id]);
  const ai = useMemo(() => (appt ? getAiIntakeSummary(appt.id) : null), [appt]);

  if (!appt) return <div className="p-6">No se encontró la cita.</div>;

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Cita {appt.status === 'accepted' ? 'confirmada' : appt.status}</h1>
        <div className="text-sm text-muted-foreground">
          {formatLocal(appt.startUTC, appt.tz)} · {appt.doctor.name} · {appt.specialty} <StatusChip value={appt.status}/>
        </div>
      </header>

      <ReminderBanner startUTC={appt.startUTC} joinHref={`/patient/appointments/${appt.id}/call`} />

      {appt.status === 'rejected' ? (
        <section className="rounded-xl border bg-card p-4">
          <h3 className="font-medium">Cita rechazada</h3>
          <p className="text-sm text-muted-foreground">Motivo: {appt.reasonRejection || 'No disponible'}</p>
          <AltSlots slots={appt.altSlots || []} onSelect={(s) => toast(`Slot seleccionado: ${new Date(s).toLocaleString()}`)} />
        </section>
      ) : (
        <div className="grid md:grid-cols-[1fr_360px] gap-4">
          <section className="space-y-4">
            {appt.status === 'accepted' && (
              <div className="flex justify-end">
                <button
                  onClick={() => (window.location.href = `/patient/appointments/${appt.id}/call`)}
                  className="px-4 py-2 rounded-lg bg-cyan-700 text-white hover:bg-cyan-800"
                >
                  Unirme a consulta
                </button>
              </div>
            )}
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Preparar consulta</h3>
              <button className="px-3 py-2 rounded-lg border text-sm">Probar mic/cam/red</button>
            </div>
            <PrepChecklist storageKey={appt.id} />
            <PreConsultForm appointmentId={appt.id} />
            <div>
              <button onClick={() => toast('Abrir ROMI IA (simulado)')} className="px-4 py-2 rounded-lg bg-cyan-700 text-white">Hablar con ROMI IA</button>
            </div>
          </section>
          <aside>{ai && <IntakePreview data={ai} />}</aside>
        </div>
      )}
    </main>
  );
}
