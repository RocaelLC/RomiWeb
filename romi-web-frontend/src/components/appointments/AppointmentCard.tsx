"use client";
import { User, Stethoscope, CalendarClock, ExternalLink, Check, X } from 'lucide-react';
import type { Appointment } from '@/lib/types';
import StatusChip from './StatusChip';
import { formatLocal } from '@/lib/time';

type Props = {
  appt: Appointment;
  onAccept?: () => void;
  onReject?: () => void;
  onOpen?: () => void;
  onStart?: () => void;
};

export default function AppointmentCard({ appt, onAccept, onReject, onOpen, onStart }: Props) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-cyan-100 text-cyan-900 flex items-center justify-center font-semibold">
          {appt.patient.initials}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{appt.patient.name}</span>
            <StatusChip value={appt.status} />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Stethoscope className="w-4 h-4" /> {appt.specialty}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarClock className="w-4 h-4" /> {formatLocal(appt.startUTC, appt.tz)}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={onOpen} className="px-3 py-2 rounded-lg border hover:bg-accent inline-flex items-center gap-2"><ExternalLink className="w-4 h-4"/>Ver</button>
          {appt.status === 'requested' && (
            <>
              <button onClick={onAccept} className="px-3 py-2 rounded-lg bg-[#d58b88] text-white inline-flex items-center gap-2"><Check className="w-4 h-4"/>Aceptar</button>
              <button onClick={onReject} className="px-3 py-2 rounded-lg border text-rose-700 hover:bg-rose-50 inline-flex items-center gap-2"><X className="w-4 h-4"/>Rechazar</button>
            </>
          )}
          {appt.status === 'accepted' && (
            <button onClick={onStart} className="px-3 py-2 rounded-lg bg-emerald-700 text-white">Iniciar</button>
          )}
        </div>
      </div>
    </div>
  );
}
