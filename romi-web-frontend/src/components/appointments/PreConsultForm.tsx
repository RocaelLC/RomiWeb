"use client";
import { useState } from 'react';
import type { PreConsultAnswers } from '@/lib/types';
import { toast } from '@/lib/mock';

type Props = { appointmentId: string; onSaved?: (data: PreConsultAnswers) => void };

export default function PreConsultForm({ appointmentId, onSaved }: Props) {
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [symptoms, setSymptoms] = useState<string>('fiebre, dolor de cabeza');
  const [onset, setOnset] = useState('3 días');
  const [meds, setMeds] = useState('Ibuprofeno');
  const [history, setHistory] = useState('Sin antecedentes relevantes');
  const [files, setFiles] = useState<string>('estudio1.pdf, foto_lesión.jpg');
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    const data: PreConsultAnswers = {
      appointmentId,
      chiefComplaint,
      symptoms: symptoms.split(',').map(s => s.trim()).filter(Boolean),
      onset,
      meds,
      history,
      files: files.split(',').map(s => s.trim()).filter(Boolean),
    };
    try {
      const ok = (await import('@/lib/mock')).savePreConsult(data);
      if (ok) { toast('Pre-consulta guardada'); onSaved?.(data); }
      else toast('No se pudo guardar');
    } finally { setBusy(false); }
  };

  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="font-medium mb-3">Pre-consulta</h3>
      <div className="grid gap-3">
        <label className="text-sm">
          Motivo principal
          <input value={chiefComplaint} onChange={e => setChiefComplaint(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="¿Qué te preocupa?" />
        </label>
        <label className="text-sm">
          Síntomas (separados por coma)
          <input value={symptoms} onChange={e => setSymptoms(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="text-sm">
            Inicio/duración
            <input value={onset} onChange={e => setOnset(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </label>
          <label className="text-sm">
            Medicación actual
            <input value={meds} onChange={e => setMeds(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </label>
        </div>
        <label className="text-sm">
          Antecedentes
          <textarea value={history} onChange={e => setHistory(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" rows={3} />
        </label>
        <label className="text-sm">
          Archivos (nombres simulados, separados por coma)
          <input value={files} onChange={e => setFiles(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </label>
        <div className="flex justify-end">
          <button onClick={save} disabled={busy} className="px-4 py-2 rounded-lg bg-cyan-700 text-white disabled:opacity-50">{busy ? 'Guardando…' : 'Guardar'}</button>
        </div>
      </div>
    </div>
  );
}

