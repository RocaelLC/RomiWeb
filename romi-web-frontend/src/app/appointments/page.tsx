"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetchAuth, endpoints } from "@/lib/api";
import {
  Trash2,
  CalendarDays,
  Clock3,
  Stethoscope,
  PlusCircle,
} from "lucide-react";

type Appointment = {
  id: string;
  scheduledAt: string;
  reason?: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "ATTENDED";
  doctor?: { id: string; name?: string; email?: string };
};

type PatientAppointmentsRes = Appointment[] | { items: Appointment[] };

type TabKey = "upcoming" | "history" | "all";

export default function PatientAppointmentsPage() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tab, setTab] = useState<TabKey>("upcoming");

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
    const ok = confirm("¿Seguro que deseas eliminar esta cita?");
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
        return d >= now && (ap.status === "PENDING" || ap.status === "ACCEPTED");
      }),
    [items, now]
  );

  const history = useMemo(
    () =>
      items.filter((ap) => {
        const d = new Date(ap.scheduledAt);
        return (
          d < now ||
          ap.status === "ATTENDED" ||
          ap.status === "CANCELLED" ||
          ap.status === "REJECTED"
        );
      }),
    [items, now]
  );

  const stats = useMemo(
    () => ({
      total: items.length,
      proximas: upcoming.length,
      realizadas: items.filter((p) => p.status === "ATTENDED").length,
    }),
    [items, upcoming]
  );

  // Lista que se muestra según tab (UNA sola tabla siempre)
  const listToShow = useMemo(() => {
    if (tab === "upcoming") return upcoming;
    if (tab === "history") return history;
    return items;
  }, [tab, upcoming, history, items]);

  const tabLabel = useMemo(() => {
    if (tab === "upcoming") return "Próximas";
    if (tab === "history") return "Historial";
    return "Todas";
  }, [tab]);

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
          Ocurrió un error al cargar tus citas: {error}
        </p>
        <button onClick={fetchData} className="px-3 py-2 rounded border text-sm">
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
            Revisa tus próximas consultas, historial y gestiona tus citas.
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

      {/* Cards (no repiten) */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-card p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-50">
            <CalendarDays className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Próximas</div>
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

      {/* TABS */}
      <section className="flex flex-wrap gap-2">
        <button
          onClick={() => setTab("upcoming")}
          className={`px-4 py-2 rounded-full border text-sm ${
            tab === "upcoming" ? "bg-primary text-primary-foreground border-primary" : "bg-white"
          }`}
        >
          Próximas ({upcoming.length})
        </button>

        <button
          onClick={() => setTab("history")}
          className={`px-4 py-2 rounded-full border text-sm ${
            tab === "history" ? "bg-primary text-primary-foreground border-primary" : "bg-white"
          }`}
        >
          Historial ({history.length})
        </button>

        <button
          onClick={() => setTab("all")}
          className={`px-4 py-2 rounded-full border text-sm ${
            tab === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-white"
          }`}
        >
          Todas ({items.length})
        </button>
      </section>

      {/* UNA sola tabla */}
      {!!items.length && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">{tabLabel}</h2>
            <button onClick={fetchData} className="px-3 py-1.5 rounded border text-xs">
              Actualizar
            </button>
          </div>

          {listToShow.length === 0 ? (
            <div className="p-6 border rounded-2xl bg-card text-sm text-muted-foreground">
              No hay citas para mostrar en “{tabLabel}”.
            </div>
          ) : (
            <div className="overflow-x-auto border rounded">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3">Médico</th>
                    <th className="text-left p-3">Fecha / Hora</th>
                    <th className="text-left p-3">Motivo</th>
                    <th className="text-left p-3">Estatus</th>
                    <th className="text-right p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {listToShow.map((ap) => (
                    <tr key={ap.id} className="border-t">
                      <td className="p-3">
                        {ap.doctor?.name || ap.doctor?.email || "Médico asignado"}
                      </td>
                      <td className="p-3">
                        {new Date(ap.scheduledAt).toLocaleString()}
                      </td>
                      <td className="p-3">{ap.reason || "—"}</td>
                      <td className="p-3 text-xs">{ap.status}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => router.push(`/patient/appointments/${ap.id}`)}
                          className="px-3 py-1 rounded border text-xs"
                        >
                          Detalles
                        </button>

                        {(ap.status === "PENDING" || ap.status === "CANCELLED") && (
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
          )}
        </section>
      )}

      {!items.length && (
        <section className="p-6 border rounded-2xl bg-card text-sm space-y-2">
          <p>No tienes citas por ahora.</p>
          <p className="text-muted-foreground">
            Puedes agendar tu primera cita desde el botón{" "}
            <span className="font-medium">“Agendar nueva cita”</span> arriba.
          </p>
        </section>
      )}
    </main>
  );
}
