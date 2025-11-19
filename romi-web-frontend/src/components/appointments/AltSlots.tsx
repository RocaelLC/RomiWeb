export default function AltSlots({ slots, onSelect }: { slots: string[]; onSelect: (iso: string) => void }) {
  if (!slots?.length) return null;
  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Horarios alternativos</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {slots.map((s) => (
          <button key={s} onClick={() => onSelect(s)} className="px-3 py-2 rounded-lg border hover:bg-zinc-50 text-sm">
            {new Date(s).toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
}

