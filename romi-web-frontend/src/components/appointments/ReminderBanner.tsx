"use client";
import { BellRing, Video } from 'lucide-react';
import { countdown } from '@/lib/time';

export default function ReminderBanner({ startUTC, joinHref }: { startUTC: string; joinHref?: string }) {
  const { hours, minutes } = countdown(startUTC);
  let label = '';
  let cta = 'Probar cámara';
  if (hours > 12) label = 'Tu consulta será próximamente';
  else if (hours > 2) label = 'Recordatorio: tu consulta es hoy';
  else if (hours > 0 || (hours === 0 && minutes > 10)) label = 'Faltan pocas horas para tu consulta';
  else if (hours === 0 && minutes <= 10 && minutes >= 0) { label = 'Tu consulta inicia en minutos'; cta = 'Unirme a consulta'; }
  else if (hours < 0) label = 'Consulta en progreso o finalizada';

  return (
    <div className="mb-3 flex items-center gap-3 rounded-xl border bg-card p-3">
      <BellRing className="w-5 h-5 text-cyan-700" />
      <div className="flex-1 text-sm text-muted-foreground">{label}</div>
      <button
        onClick={() => { if (cta === 'Unirme a consulta' && joinHref) window.location.href = joinHref; }}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-accent"
      >
        <Video className="w-4 h-4" /> {cta}
      </button>
    </div>
  );
}
