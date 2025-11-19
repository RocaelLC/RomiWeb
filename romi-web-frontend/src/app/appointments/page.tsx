"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetchAuth, endpoints } from "@/lib/api";
import { Trash2, CalendarDays, Clock3, Stethoscope, PlusCircle } from "lucide-react";

type Appointment = {
  id: string;
  scheduledAt: string;
  reason?: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "ATTENDED";
  doctor?: { id: string; name?: string; email?: string };
};

type PatientAppointmentsRes = Appointment[] | { items: Appointment[] };

export default function PatientAppointmentsPage() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetchAuth<PatientAppointmentsRes>(
        `${endpoints.appointments.byPatient}?page=1&size=50`,
        { method: "GET" }
      );
      const data = Array.isArray(res) ? res : res.items ?? [];
      setItems(data);
    } catch (e: any) {
      setError(e?.message ?? "Error al cargar citas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData().catch(() => setLoading(false));
  }, [fetchData]);

  const deleteAppointment = async (id: string) => {
    const ok = confirm("Â¿Seguro que deseas eliminar esta cita?");
    if (!ok) return;

    try {
      await apiFetchAuth(endpoints.appointments.delete(id), {
        method: "DELETE",
      });
      fetchData();
    } catch (err: any) {
      alert("Error al eliminar la cita: " + err.message);
    }
  };

  const now = new Date();

  const upcoming = useMemo(
    () =>
      items.filter((ap) => {
        const d = new Date(ap.scheduledAt);
        return (
          d >= now &&
          (ap.status === "PENDING" || ap.status === "ACCEPTED")
        );
      }),
    [items, now]
  );

  const past = useMemo(
    () =>
      items.filter((ap) => {
        const d = new Date(ap.scheduledAt);
        return (
          d < now &&
          (ap.status === "ATTENDED" ||
            ap.status === "CANCELLED" ||
            ap.status === "REJECTED")
        );
      }),
    [items, now]
  );

  const nextAppointment = useMemo(() => {
    if (!upcoming.length) return null;
    return [...upcoming].sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() -
        new Date(b.scheduledAt).getTime()
    )[0];
  }, [upcoming]);

  const stats = useMemo(
    () => ({
      total: items.length,
      proximas: upcoming.length,
      realizadas: past.filter((p) => p.status === "ATTENDED").length,
    }),
    [items.length, upcoming.length, past]
  );

  if (loading)
    return (
      <main className="max-w-5xl mx-auto p-6 space-y-4">
        <div className="h-6 w-40 bg-gray-100 animate-pulse rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
        </div>
        <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
      </main>
    );

  if (error)
    return (
      <main className="max-w-5xl mx-auto p-6 space-y-4">
        <p className="text-sm text-red-600">
          OcurriÃ³ un error al cargar tus citas: {error}
        </p>
        <button
          onClick={fetchData}
          className="px-3 py-2 rounded border text-sm"
        >
          Reintentar
        </button>
      </main>
    );

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
     <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Mis citas</h1>
          <p className="text-sm text-muted-foreground">
            Revisa tus prÃ³ximas consultas, historial y gestiona tus citas.
          </p>
        </div>
        <button
          onClick={() => router.push("/doctores")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm hover:bg-primary/90"
        >
          <PlusCircle className="w-4 h-4" />
          Agendar nueva cita
        </button>
      </header>

     <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-card p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-50">
            <CalendarDays className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">PrÃ³ximas</div>
            <div className="text-2xl font-semibold">{stats.proximas}</div>
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-50">
            <Stethoscope className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Realizadas</div>
            <div className="text-2xl font-semibold">{stats.realizadas}</div>
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-slate-50">
            <Clock3 className="w-5 h-5 text-slate-700" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-2xl font-semibold">{stats.total}</div>
          </div>
        </div>
      </section>

      {nextAppointment && (
        <section className="rounded-2xl border bg-card p-4 flex flex-col sm:flex-row justify-between gap-3">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-1">
              PrÃ³xima cita
            </h2>
            <p className="text-base font-semibold">
              {nextAppointment.doctor?.name ||
                nextAppointment.doctor?.email ||
                "MÃ©dico asignado"}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(nextAppointment.scheduledAt).toLocaleString()}
            </p>
            {nextAppointment.reason && (
              <p className="mt-1 text-xs text-muted-foreground">
                Motivo: {nextAppointment.reason}
              </p>
            )}
          </div>
          <div className="flex items-end gap-2 justify-end">
            <button
              className="px-3 py-1.5 rounded border text-xs"
              onClick={() => router.push(`/appointments/${nextAppointment.id}`)}
            >
              Ver detalles
            </button>
            {(nextAppointment.status === "PENDING" ||
              nextAppointment.status === "CANCELLED") && (
              <button
                onClick={() => deleteAppointment(nextAppointment.id)}
                className="inline-flex items-center justify-center px-3 py-1.5 rounded border text-xs text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Eliminar
              </button>
            )}
          </div>
        </section>
      )}

      {!!upcoming.length && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">PrÃ³ximas citas</h2>
            <span className="text-xs text-muted-foreground">
              {upcoming.length} en los siguientes dÃ­as
            </span>
          </div>
          <div className="grid gap-3">
            {upcoming.slice(0, 5).map((ap) => (
              <div
                key={ap.id}
                className="rounded-xl border bg-card p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <p className="text-sm font-medium">
                    {ap.doctor?.name ||
                      ap.doctor?.email ||
                      "MÃ©dico asignado"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(ap.scheduledAt).toLocaleString()}
                  </p>
                  {ap.reason && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {ap.reason}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                    {ap.status === "PENDING"
                      ? "Pendiente de confirmaciÃ³n"
                      : "Confirmada"}
                  </span>
                  <button
                    onClick={() => router.push(`/appointments/${ap.id}`)}
                    className="px-3 py-1 rounded border text-xs"
                  >
                    Detalles
                  </button>
                  {(ap.status === "PENDING" ||
                    ap.status === "CANCELLED") && (
                    <button
                      onClick={() => deleteAppointment(ap.id)}
                      className="inline-flex items-center justify-center px-2 py-1 rounded text-xs text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

     {!!past.length && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Historial reciente</h2>
            <span className="text-xs text-muted-foreground">
              Mostrando Ãºltimas {Math.min(past.length, 5)} citas
            </span>
          </div>
          <div className="grid gap-3">
            {past.slice(0, 5).map((ap) => (
              <div
                key={ap.id}
                className="rounded-xl border bg-card p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium">
                    {ap.doctor?.name || ap.doctor?.email || "MÃ©dico"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(ap.scheduledAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                      ap.status === "ATTENDED"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-50 text-slate-700"
                    }`}
                  >
                    {ap.status}
                  </span>
                  <button
                    onClick={() => router.push(`/appointments/${ap.id}`)}
                    className="px-3 py-1 rounded border text-xs"
                  >
                    Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

     {!!items.length && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Todas mis citas</h2>
            <button
              onClick={fetchData}
              className="px-3 py-1.5 rounded border text-xs"
            >
              Actualizar
            </button>
          </div>
          <div className="overflow-x-auto border rounded">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3">MÃ©dico</th>
                  <th className="text-left p-3">Fecha / Hora</th>
                  <th className="text-left p-3">Motivo</th>
                  <th className="text-left p-3">Estatus</th>
                  <th className="text-right p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((ap) => (
                  <tr key={ap.id} className="border-t">
                    <td className="p-3">
                      {ap.doctor?.name ||
                        ap.doctor?.email ||
                        "MÃ©dico asignado"}
                    </td>
                    <td className="p-3">
                      {new Date(ap.scheduledAt).toLocaleString()}
                    </td>
                    <td className="p-3">{ap.reason || "â€”"}</td>
                    <td className="p-3 text-xs">{ap.status}</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() =>
                          router.push(`/appointments/${ap.id}`)
                        }
                        className="px-3 py-1 rounded border text-xs"
                      >
                        Detalles
                      </button>
                      {(ap.status === "PENDING" ||
                        ap.status === "CANCELLED") && (
                        <button
                          onClick={() => deleteAppointment(ap.id)}
                          className="inline-flex items-center justify-center px-2 py-1 rounded text-xs text-red-600 hover:bg-red-50"
                          title="Eliminar cita"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {!items.length && (
        <section className="p-6 border rounded-2xl bg-card text-sm space-y-2">
          <p>No tienes citas por ahora.</p>
          <p className="text-muted-foreground">
            Puedes agendar tu primera cita desde el botÃ³n{" "}
            <span className="font-medium">â€œAgendar nueva citaâ€</span> arriba.
          </p>
        </section>
      )}
    </main>
  );
}

