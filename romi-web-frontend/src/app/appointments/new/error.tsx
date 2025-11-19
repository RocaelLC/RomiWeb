"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl border bg-red-50 text-red-700">
      <p className="font-semibold">Hubo un error al cargar “Nueva cita”.</p>
      <p className="mt-2 text-sm">{error.message}</p>
      <button onClick={reset} className="mt-4 px-4 py-2 rounded bg-red-600 text-white">
        Reintentar
      </button>
    </div>
  );
}
