export const metadata = { title: "Cita creada — ROMI" };

export default function Page({ searchParams }: { searchParams: { id?: string; doctorId?: string } }) {
  const { id, doctorId } = searchParams || {};
  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <div className="rounded-xl border p-6 bg-emerald-50 border-emerald-200">
        <h1 className="text-2xl font-bold text-emerald-800">¡Cita creada correctamente!</h1>
        <p className="mt-2 text-emerald-900">
          Tu solicitud quedó registrada {id ? <>con el folio <span className="font-semibold">{id}</span></> : null}.
        </p>
        <div className="mt-6 space-x-3">
          <a href="/appointments" className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700">
            Ver mis citas
          </a>
          <a href={`/doctores${doctorId ? `?pref=${doctorId}` : ""}`} className="px-4 py-2 rounded border hover:bg-zinc-50">
            Agendar otra
          </a>
        </div>
      </div>
    </main>
  );
}

