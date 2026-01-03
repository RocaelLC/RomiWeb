'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetchAuth, endpoints } from '@/lib/api';

type Note = {
  id: string;
  subjective: string;
  objective?: string | null;
  assessment?: string | null;
  plan?: string | null;
  createdAt: string;
};

export default function AppointmentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteForm, setNoteForm] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const run = async () => {
      const res = await apiFetchAuth(endpoints.appointments.byId(params.id));
      setData(res);

      const notesRes = await apiFetchAuth<Note[]>(
        endpoints.clinicalNotes.byAppointment(params.id),
        { method: 'GET' },
      );
      setNotes(Array.isArray(notesRes) ? notesRes : []);
    };
    run();
  }, [params.id]);

  const submitNote = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setSaving(true);
    try {
      await apiFetchAuth(endpoints.clinicalNotes.create, {
        method: 'POST',
        body: JSON.stringify({
          appointmentId: params.id,
          subjective: noteForm.subjective,
          objective: noteForm.objective || undefined,
          assessment: noteForm.assessment || undefined,
          plan: noteForm.plan || undefined,
        }),
      });
      setNoteForm({ subjective: '', objective: '', assessment: '', plan: '' });
      const notesRes = await apiFetchAuth<Note[]>(
        endpoints.clinicalNotes.byAppointment(params.id),
        { method: 'GET' },
      );
      setNotes(Array.isArray(notesRes) ? notesRes : []);
    } catch (err: any) {
      alert(err?.message ?? 'Error al guardar la nota');
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <p className="p-6">Loading…</p>;

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Detalle de cita</h1>
      <div className="border rounded p-4 space-y-2">
        <p><b>Paciente:</b> {data.patient?.email ?? '—'}</p>
        <p><b>Doctor:</b> {data.doctor?.email ?? '—'}</p>
        <p><b>Fecha/Hora:</b> {new Date(data.scheduledAt).toLocaleString()}</p>
        <p><b>Estado:</b> {data.status}</p>
        <p><b>Motivo:</b> {data.reason || '—'}</p>
      </div>

      <section className="border rounded p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Notas clínicas</h2>
          <span className="text-sm text-gray-500">{notes.length} registradas</span>
        </div>

        {notes.length === 0 ? (
          <p className="text-sm text-gray-600">Aún no hay notas para esta cita.</p>
        ) : (
          <div className="space-y-3">
            {notes.map((n) => (
              <article key={n.id} className="rounded border p-3 space-y-1 bg-slate-50">
                <div className="text-xs text-gray-500">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
                <div className="text-sm">
                  <b>Subjetivo: </b>{n.subjective}
                </div>
                {n.objective && <div className="text-sm"><b>Objetivo: </b>{n.objective}</div>}
                {n.assessment && <div className="text-sm"><b>Diagnóstico: </b>{n.assessment}</div>}
                {n.plan && <div className="text-sm"><b>Plan: </b>{n.plan}</div>}
              </article>
            ))}
          </div>
        )}

        <form onSubmit={submitNote} className="space-y-3">
          <h3 className="font-medium">Agregar nota</h3>
          <div className="space-y-1">
            <label className="text-sm font-medium">Subjetivo</label>
            <textarea
              className="w-full rounded border p-2"
              required
              value={noteForm.subjective}
              onChange={(e) => setNoteForm((prev) => ({ ...prev, subjective: e.target.value }))}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Objetivo</label>
            <textarea
              className="w-full rounded border p-2"
              value={noteForm.objective}
              onChange={(e) => setNoteForm((prev) => ({ ...prev, objective: e.target.value }))}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Diagnóstico</label>
            <textarea
              className="w-full rounded border p-2"
              value={noteForm.assessment}
              onChange={(e) => setNoteForm((prev) => ({ ...prev, assessment: e.target.value }))}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Plan</label>
            <textarea
              className="w-full rounded border p-2"
              value={noteForm.plan}
              onChange={(e) => setNoteForm((prev) => ({ ...prev, plan: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded bg-cyan-700 text-white hover:bg-cyan-800 disabled:opacity-50"
          >
            {saving ? 'Guardando…' : 'Guardar nota'}
          </button>
        </form>
      </section>

      <button onClick={() => router.back()} className="px-4 py-2 border rounded">Volver</button>
    </main>
  );
}
