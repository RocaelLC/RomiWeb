"use client";
import type { Appointment } from '@/lib/types';
import StatusChip from './StatusChip';
import { formatLocal } from '@/lib/time';

type Props = {
  items: Appointment[];
  onOpen?: (id: string) => void;
};

function Group({ title, items, onOpen }: { title: string; items: Appointment[]; onOpen?: (id: string) => void }) {
  if (!items.length) return null;
  return (
    <details className="rounded-xl border bg-card p-3" open>
      <summary className="cursor-pointer select-none font-medium">{title} <span className="text-xs text-muted-foreground">({items.length})</span></summary>
      <ul className="mt-2 divide-y">
        {items.map(a => (
          <li key={a.id} className="py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-900 flex items-center justify-center text-sm font-semibold">{a.patient.initials}</span>
              <div className="text-sm">
                <div className="font-medium">{a.patient.name} <StatusChip value={a.status}/></div>
                <div className="text-muted-foreground">{a.specialty} · {formatLocal(a.startUTC, a.tz)}</div>
              </div>
            </div>
            <button onClick={() => onOpen?.(a.id)} className="px-3 py-2 rounded-lg border text-sm hover:bg-accent">Ver</button>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function AppointmentAccordion({ items, onOpen }: Props) {
  const requested = items.filter(i => i.status === 'requested');
  const accepted = items.filter(i => i.status === 'accepted');
  const completed = items.filter(i => i.status === 'completed');
  const rejected = items.filter(i => i.status === 'rejected');
  return (
    <div className="space-y-3">
      <Group title="Solicitadas" items={requested} onOpen={onOpen} />
      <Group title="Aceptadas" items={accepted} onOpen={onOpen} />
      <Group title="Rechazadas" items={rejected} onOpen={onOpen} />
      <Group title="Completadas" items={completed} onOpen={onOpen} />
    </div>
  );
}

