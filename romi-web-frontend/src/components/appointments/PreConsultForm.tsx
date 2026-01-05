"use client";

import { useEffect, useMemo, useState } from "react";
import type { PreConsultAnswers } from "@/lib/types";
import { apiFetch } from "@/lib/api";
import { toast } from "@/lib/mock";

type Props = { appointmentId: string; onSaved?: (data: PreConsultAnswers) => void };

export default function PreConsultForm({ appointmentId, onSaved }: Props) {
  const storageKey = useMemo(() => `romi:preconsult:sent:${appointmentId}`, [appointmentId]);

  const [chiefComplaint, setChiefComplaint] = useState("");
  const [symptoms, setSymptoms] = useState<string>("");
  const [onset, setOnset] = useState("");
  const [meds, setMeds] = useState("");
  const [history, setHistory] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);

  const [saved, setSaved] = useState(false);

  // ✅ persistencia: si ya se guardó, ocultar al recargar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw === "1") setSaved(true);
    } catch {}
  }, [storageKey]);

  const save = async () => {
    if (busy || saved) return;

    setBusy(true);

    const data: PreConsultAnswers = {
      appointmentId,
      chiefComplaint,
      symptoms: symptoms
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      onset,
      meds,
      history,
      files: selectedFiles.map((f) => f.name), // metadata por ahora
    };

    try {
      await apiFetch("/preconsultations", {
        method: "POST",
        body: JSON.stringify({
          appointmentId,
          chiefComplaint: data.chiefComplaint,
          symptoms: data.symptoms,
          onset: data.onset,
          meds: data.meds,
          history: data.history,
          files: selectedFiles.map((f) => ({ name: f.name })),
        }),
      });

      // ✅ marcar como enviado y persistir
      setSaved(true);
      try {
        localStorage.setItem(storageKey, "1");
      } catch {}

      toast("Pre-consulta enviada ✅");
      onSaved?.(data);
    } catch (e) {
      console.error(e);
      toast("No se pudo guardar");
    } finally {
      setBusy(false);
    }
  };

  // ✅ si ya se guardó, ya no mostrar el formulario
  if (saved) {
    return (
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-medium">Pre-consulta</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
            Enviada
          </span>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Listo ✅ Tu pre-consulta fue enviada y el médico podrá verla en el detalle de tu cita.
        </p>

        {/* opcional: botón para editar (lo puedes quitar si no quieres reabrir) */}
        <button
          className="mt-3 text-sm underline opacity-80 hover:opacity-100"
          onClick={() => {
            setSaved(false);
            try {
              localStorage.removeItem(storageKey);
            } catch {}
          }}
        >
          Editar (opcional)
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="font-medium mb-3">Pre-consulta</h3>

      <div className="grid gap-3">
        <label className="text-sm">
          Motivo principal
          <input
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="¿Qué te preocupa?"
          />
        </label>

        <label className="text-sm">
          Síntomas (separados por coma)
          <input
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="ej. fiebre, dolor de cabeza"
          />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="text-sm">
            Inicio/duración
            <input
              value={onset}
              onChange={(e) => setOnset(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="ej. 3 días"
            />
          </label>

          <label className="text-sm">
            Medicación actual
            <input
              value={meds}
              onChange={(e) => setMeds(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="ej. Ibuprofeno"
            />
          </label>
        </div>

        <label className="text-sm">
          Antecedentes
          <textarea
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            rows={3}
            placeholder="ej. Sin antecedentes relevantes"
          />
        </label>

        <label className="text-sm">
          Archivos (opcional)
          <input
            type="file"
            multiple
            className="mt-1 w-full rounded-lg border px-3 py-2 bg-white"
            onChange={(e) => setSelectedFiles(Array.from(e.target.files ?? []))}
          />
          {selectedFiles.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              Seleccionados: {selectedFiles.map((f) => f.name).join(", ")}
            </p>
          )}
        </label>

        <div className="flex justify-end">
          <button
            onClick={save}
            disabled={busy}
            className="px-4 py-2 rounded-lg bg-cyan-700 text-white disabled:opacity-50"
          >
            {busy ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
