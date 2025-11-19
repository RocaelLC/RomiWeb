"use client";
import { useEffect, useState } from 'react';

const ITEMS = [
  { key: 'conn', label: 'Conexión a internet estable' },
  { key: 'miccam', label: 'Micrófono y cámara funcionando' },
  { key: 'place', label: 'Lugar silencioso y con buena iluminación' },
  { key: 'docs', label: 'Documentos y estudios a la mano' },
  { key: 'id', label: 'Identificación oficial' },
];

export default function PrepChecklist({ storageKey }: { storageKey: string }) {
  const key = `romi_checklist_${storageKey}`;
  const [state, setState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || '{}');
      setState(saved);
    } catch {}
  }, [key]);

  const toggle = (k: string) => {
    setState(prev => {
      const next = { ...prev, [k]: !prev[k] };
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="font-medium mb-3">Checklist de preparación</h3>
      <ul className="space-y-2">
        {ITEMS.map(i => (
          <li key={i.key} className="flex items-center gap-3">
            <input
              id={`chk_${i.key}`}
              type="checkbox"
              checked={!!state[i.key]}
              onChange={() => toggle(i.key)}
              className="h-4 w-4"
            />
            <label htmlFor={`chk_${i.key}`} className="text-sm">{i.label}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

