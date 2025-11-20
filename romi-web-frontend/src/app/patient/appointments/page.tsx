"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiFetchAuth, endpoints } from "@/lib/api";
import StatusChip from "@/components/appointments/StatusChip";
import { CalendarClock, Stethoscope } from "lucide-react";
import { formatLocal } from "@/lib/time";

type Item = { id: string; scheduledAt: string; status: "PENDING"|"ACCEPTED"|"CANCELED"|"COMPLETED"; doctorId?: string; reason?: string };

export default function PatientAppointmentsListPage() {
  const [pending, setPending] = useState<Item[]>([]);
  const [accepted, setAccepted] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const get = async (status: string) => apiFetchAuth<{ items?: Item[] }>(`${endpoints.appointments.byPatient}?status=${status}`, { method: 'GET' });
      const [p, a] = await Promise.all([get('PENDING'), get('ACCEPTED')]);
      setPending(p.items ?? []);
      setAccepted(a.items ?? []);
    } catch {
      setPending([]); setAccepted([]);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const card = (x: Item) => (
    <div key={x.id} className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Stethoscope className="w-4 h-4"/> Consulta médica</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarClock className="w-4 h-4"/> {formatLocal(x.scheduledAt, tz)}</div>
        </div>
        <StatusChip value={x.status === 'PENDING' ? 'requested' : 'accepted'} />
      </div>
      {x.status === 'ACCEPTED' && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => (window.location.href = `/patient/appointments/${x.id}/call`)}
            className="px-3 py-2 rounded-lg bg-cyan-700 text-white hover:bg-cyan-800 text-sm"
          >
            Unirme a consulta
          </button>
        </div>
      )}
    </div>
  );

  if (loading) return <div className="p-6">Cargando…</div>;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Mis Citas</h1>
      </header>

      {!!pending.length && (
        <section className="space-y-2">
          <h2 className="text-lg font-medium">Pendientes de confirmación</h2>
          {pending.map(card)}
        </section>
      )}

      {!!accepted.length && (
        <section className="space-y-2">
          <h2 className="text-lg font-medium">Confirmadas</h2>
          {accepted.map(card)}
        </section>
      )}

      {!pending.length && !accepted.length && (
        <p className="text-muted-foreground">No tienes citas pendientes ni confirmadas.</p>
      )}
    </main>
  );
}
