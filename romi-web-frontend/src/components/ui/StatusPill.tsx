"use client";

const MAP: Record<string, string> = {
  PENDING:   "bg-amber-50 text-amber-700 border-amber-200",
  ACCEPTED:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  REJECTED:  "bg-rose-50 text-rose-700 border-rose-200",
  CANCELED:  "bg-zinc-100 text-zinc-600 border-zinc-200",
};

export default function StatusPill({ value }: { value: string }) {
  const cls = MAP[value] ?? "bg-zinc-100 text-zinc-600 border-zinc-200";
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${cls}`}>
      {value}
    </span>
  );
}