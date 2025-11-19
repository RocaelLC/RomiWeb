"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppointments } from '@/store/useAppointments';
import AppointmentCard from '@/components/appointments/AppointmentCard';
import AppointmentAccordion from '@/components/appointments/AppointmentAccordion';
import IntakePreview from '@/components/appointments/IntakePreview';
import { getAiIntakeSummary, toast } from '@/lib/mock';

export default function DoctorAppointmentsPage() {
  const { items, accept, reject, refresh } = useAppointments();
  const [mode, setMode] = useState<'cards'|'compact'>('cards');
  const [openId, setOpenId] = useState<string | null>(null);
  const router = useRouter();

  const onAccept = (id: string) => { accept(id); toast('Cita aceptada'); refresh(); };
  const onReject = (id: string) => {
    const reason = window.prompt('Motivo del rechazo:') || '';
    reject(id, reason); toast('Cita rechazada'); refresh();
  };
  const onOpen = (id: string) => setOpenId(id);
  const onStart = (url?: string) => { toast('Abriendo consulta…'); if (url) router.push(url); };

  const preview = openId ? getAiIntakeSummary(openId) : null;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-semibold">Mis Citas</h1>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <span>Vista:</span>
          <button onClick={() => setMode('cards')} className={`px-3 py-1 rounded-lg border ${mode==='cards'?'bg-cyan-600 text-white border-cyan-600':''}`}>Cards</button>
          <button onClick={() => setMode('compact')} className={`px-3 py-1 rounded-lg border ${mode==='compact'?'bg-cyan-600 text-white border-cyan-600':''}`}>Compacto</button>
        </div>
      </header>

      <div className="grid md:grid-cols-[1fr_380px] gap-4">
        <section className="space-y-3">
          {mode === 'cards' ? (
            items.map(a => (
              <AppointmentCard
                key={a.id}
                appt={a}
                onAccept={() => onAccept(a.id)}
                onReject={() => onReject(a.id)}
                onOpen={() => onOpen(a.id)}
                onStart={() => onStart(a.joinUrl)}
              />
            ))
          ) : (
            <AppointmentAccordion items={items} onOpen={(id) => onOpen(id)} />
          )}
        </section>

        <aside>{preview && <IntakePreview data={preview} />}</aside>
      </div>
    </main>
  );
}

