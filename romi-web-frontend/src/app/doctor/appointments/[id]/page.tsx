"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetchAuth, endpoints } from "@/lib/api";

type Note = {
  id: string;
  subjective: string;
  objective?: string | null;
  assessment?: string | null;
  plan?: string | null;
  createdAt: string;
};

type Preconsultation = {
  id: string;
  chiefComplaint?: string | null;
  symptoms?: string[] | null;
  onset?: string | null;
  meds?: string | null;
  history?: string | null;
  files?: { name: string; url?: string }[] | null;
  createdAt: string;
};

export default function AppointmentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [pre, setPre] = useState<Preconsultation | null>(null);

  const [noteForm, setNoteForm] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });

  const [saving, setSaving] = useState(false);

  const loadAll = async (appointmentId: string) => {

    try {
      const res = await apiFetchAuth(endpoints.appointments.byId(appointmentId));
      console.log("✅ Cita recibida:", res);
      setData(res);

      
      const notesRes = await apiFetchAuth<Note[]>(
        endpoints.clinicalNotes.byAppointment(appointmentId),
        { method: "GET" }
      );
      setNotes(Array.isArray(notesRes) ? notesRes : []);

      try {
        const preRes = await apiFetchAuth<Preconsultation>(
          `/preconsultations/appointment/${appointmentId}`,
          { method: "GET" }
        );
        setPre(preRes ?? null);
      } catch (e) {
        setPre(null);
      }
    } catch (e) {
      // si falla algo fuerte, dejamos data en null para que se vea "Loading…"
      setData(null);
      setNotes([]);
      setPre(null);
    } finally {
    }
  };

  useEffect(() => {
    const id = params?.id;

    if (!id) {
      return;
    }

    loadAll(id);
  }, [params?.id]);

  const submitNote = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!params?.id) return;

    setSaving(true);
    try {

      await apiFetchAuth(endpoints.clinicalNotes.create, {
        method: "POST",
        body: JSON.stringify({
          appointmentId: params.id,
          subjective: noteForm.subjective,
          objective: noteForm.objective || undefined,
          assessment: noteForm.assessment || undefined,
          plan: noteForm.plan || undefined,
        }),
      });

      setNoteForm({ subjective: "", objective: "", assessment: "", plan: "" });

      const notesRes = await apiFetchAuth<Note[]>(
        endpoints.clinicalNotes.byAppointment(params.id),
        { method: "GET" }
      );
      setNotes(Array.isArray(notesRes) ? notesRes : []);
    } catch (err: any) {
      console.error("❌ Error al guardar nota:", err);
      alert(err?.message ?? "Error al guardar la nota");
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <p className="p-6">Loading…</p>;

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      {/* Header */}
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Detalle de cita</h1>
        <button
          onClick={() => router.back()}
          className="px-3 py-2 border rounded-lg hover:bg-zinc-50"
        >
          Volver
        </button>
      </header>

      {/* Info cita */}
      <div className="border rounded-xl p-4 space-y-2 bg-white">
        <p>
          <b>Paciente:</b> {data.patient?.email ?? "—"}
        </p>
        <p>
          <b>Doctor:</b> {data.doctor?.email ?? "—"}
        </p>
        <p>
          <b>Fecha/Hora:</b>{" "}
          {data.scheduledAt ? new Date(data.scheduledAt).toLocaleString() : "—"}
        </p>
        <p>
          <b>Estado:</b> {data.status}
        </p>
        <p>
          <b>Motivo:</b> {data.reason || "—"}
        </p>
      </div>

      {/* PRE-CONSULTA */}
      <section className="border rounded-xl p-4 space-y-3 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Pre-consulta del paciente</h2>
          <span className="text-sm text-gray-500">
            {pre ? "Registrada" : "No registrada"}
          </span>
        </div>

        {!pre ? (
          <p className="text-sm text-gray-600">
            El paciente aún no ha completado el cuestionario de pre-consulta.
          </p>
        ) : (
          <div className="space-y-2 text-sm">
            <p>
              <b>Motivo principal:</b> {pre.chiefComplaint || "—"}
            </p>
            <p>
              <b>Síntomas:</b> {(pre.symptoms || []).join(", ") || "—"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <p>
                <b>Inicio/duración:</b> {pre.onset || "—"}
              </p>
              <p>
                <b>Medicación:</b> {pre.meds || "—"}
              </p>
            </div>
            <p>
              <b>Antecedentes:</b> {pre.history || "—"}
            </p>

            <div>
              <b>Archivos:</b>{" "}
              {pre.files && pre.files.length > 0 ? (
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  {pre.files.map((f, idx) => (
                    <li key={`${f.name}-${idx}`}>
                      {f.url ? (
                        <a className="underline" href={f.url} target="_blank" rel="noreferrer">
                          {f.name}
                        </a>
                      ) : (
                        f.name
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <span>—</span>
              )}
            </div>
          </div>
        )}
      </section>

      {/* NOTAS CLÍNICAS */}
      <section className="border rounded-xl p-4 space-y-3 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Notas clínicas</h2>
          <span className="text-sm text-gray-500">{notes.length} registradas</span>
        </div>

        {notes.length === 0 ? (
          <p className="text-sm text-gray-600">Aún no hay notas para esta cita.</p>
        ) : (
          <div className="space-y-3">
            {notes.map((n) => (
              <article
                key={n.id}
                className="rounded-xl border p-3 space-y-1 bg-slate-50"
              >
                <div className="text-xs text-gray-500">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
                <div className="text-sm">
                  <b>Subjetivo: </b>
                  {n.subjective}
                </div>
                {n.objective && (
                  <div className="text-sm">
                    <b>Objetivo: </b>
                    {n.objective}
                  </div>
                )}
                {n.assessment && (
                  <div className="text-sm">
                    <b>Diagnóstico: </b>
                    {n.assessment}
                  </div>
                )}
                {n.plan && (
                  <div className="text-sm">
                    <b>Plan: </b>
                    {n.plan}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        <form onSubmit={submitNote} className="space-y-3 pt-2 border-t">
          <h3 className="font-medium">Agregar nota</h3>

          <div className="space-y-1">
            <label className="text-sm font-medium">Subjetivo</label>
            <textarea
              className="w-full rounded-lg border p-2"
              required
              value={noteForm.subjective}
              onChange={(e) =>
                setNoteForm((prev) => ({ ...prev, subjective: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Objetivo</label>
            <textarea
              className="w-full rounded-lg border p-2"
              value={noteForm.objective}
              onChange={(e) =>
                setNoteForm((prev) => ({ ...prev, objective: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Diagnóstico</label>
            <textarea
              className="w-full rounded-lg border p-2"
              value={noteForm.assessment}
              onChange={(e) =>
                setNoteForm((prev) => ({ ...prev, assessment: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Plan</label>
            <textarea
              className="w-full rounded-lg border p-2"
              value={noteForm.plan}
              onChange={(e) =>
                setNoteForm((prev) => ({ ...prev, plan: e.target.value }))
              }
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-cyan-700 text-white hover:bg-cyan-800 disabled:opacity-50"
          >
            {saving ? "Guardando…" : "Guardar nota"}
          </button>
        </form>
      </section>
    </main>
  );
}
