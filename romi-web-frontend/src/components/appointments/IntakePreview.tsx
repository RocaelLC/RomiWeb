import type { AiIntakeSummary } from '@/lib/types';

export default function IntakePreview({ data }: { data: AiIntakeSummary }) {
  return (
    <aside className="w-full md:w-96 border-l md:sticky md:top-4 h-fit rounded-xl md:rounded-none md:border bg-card p-4">
      <h3 className="font-semibold mb-2">Resumen IA</h3>
      <p className="text-sm text-muted-foreground mb-3">{data.summary}</p>
      <ul className="list-disc ml-5 space-y-1 text-sm">
        {data.bulletPoints.map((b, i) => (<li key={i}>{b}</li>))}
      </ul>
      {!!data.riskFlags.length && (
        <div className="mt-3 flex flex-wrap gap-2">
          {data.riskFlags.map((r, i) => (
            <span key={i} className="px-2 py-1 rounded-full text-xs border bg-rose-50 text-rose-700 border-rose-200">{r}</span>
          ))}
        </div>
      )}
    </aside>
  );
}

