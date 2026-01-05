"use client";
import { useEffect, useMemo, useState } from "react";

type Props = { appointmentId: string };

const ITEMS = [
  { key: "internet", label: "Conexión a internet estable" },
  { key: "miccam", label: "Micrófono y cámara funcionando" },
  { key: "place", label: "Lugar silencioso y con buena iluminación" },
  { key: "docs", label: "Documentos y estudios a la mano" },
  { key: "id", label: "Identificación oficial" },
] as const;

export function PrepChecklist({ appointmentId }: Props) {
  const storageKey = `romi:prepChecklist:${appointmentId}`;

  const [state, setState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setState(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {}
  }, [storageKey, state]);

  const allDone = useMemo(
    () => ITEMS.every((it) => !!state[it.key]),
    [state]
  );

  if (allDone) return null;


  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="font-medium mb-3">Checklist de preparación</h3>
      <div className="space-y-2">
        {ITEMS.map((it) => (
          <label key={it.key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!state[it.key]}
              onChange={(e) =>
                setState((p) => ({ ...p, [it.key]: e.target.checked }))
              }
            />
            {it.label}
          </label>
        ))}
      </div>
    </div>
  );
}
