"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, apiFetchAuth, endpoints } from "@/lib/api";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import { useRealtime } from "@/hooks/useRealtime";
import type { EventKind } from "@/types/appointments";
import type { NotificationDTO } from "@/types/notifications";

type Me = { sub?: string; email?: string; name?: string; roles?: string[] };
type BackendAppt = {
  id: string;
  scheduledAt: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "ATTENDED";
  patient?: { id: string; email?: string; name?: string };
};
type HistoryItem = {
  id: string;
  scheduledAt: string;
  patient: { id: string; name?: string; email?: string };
  reason?: string;
  notes?: { text: string; createdAt: string }[];
  events?: { id: string; kind: EventKind; message: string; createdAt: string }[];
};

export default function DashboardPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [doctorId, setDoctorId] = useState<string>("");
  const [pending, setPending] = useState<BackendAppt[]>([]);
  const [acceptedList, setAcceptedList] = useState<BackendAppt[]>([]);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const m = await apiFetch("/auth/me", { method: "GET" });
        setMe(m);
        setDoctorId(m?.sub || "");
      } catch { }
    })();
  }, []);

  const loadAppointments = useCallback(async (docId: string) => {
    if (!docId) return;
    const base = endpoints.appointments.byDoctor(docId);
    const get = async (status: string) =>
      apiFetchAuth<{ items?: BackendAppt[] }>(`${base}?status=${status}&page=1&size=10`, { method: "GET" });
    try {
      const [p, a, c] = await Promise.all([get("PENDING"), get("ACCEPTED"), get("ATTENDED")]);
      setPending(p.items ?? []);
      setAcceptedList(a.items ?? []);
      setAcceptedCount((a.items ?? []).length);
      setCompletedCount((c.items ?? []).length);
      const historyData = await apiFetchAuth<HistoryItem[]>(endpoints.appointments.historyMe, { method: "GET" });
      setHistory(historyData ?? []);
    } catch { }
  }, []);

  const fetchNotifications = useCallback(async () => {
    setLoadingNotifications(true);
    try {
      const data = await apiFetchAuth<NotificationDTO[]>(
        endpoints.notifications.list(), // todas
        { method: "GET" },
      );

      setNotifications(data ?? []);
    } finally {
      setLoadingNotifications(false);
    }
  }, []);

  useEffect(() => {
    if (!doctorId) return;
    loadAppointments(doctorId);
    fetchNotifications();
  }, [doctorId, loadAppointments, fetchNotifications]);

  const { notifications: realtimeNotifications } = useRealtime({
    userId: doctorId,
    appointmentIds: acceptedList.map((a) => a.id),
  });

  useEffect(() => {
    if (!realtimeNotifications.length) return;
    setNotifications((prev) => {
      const ids = new Set(prev.map((n) => n.id));
      const newcomers = realtimeNotifications.filter((n) => !ids.has(n.id));
      if (!newcomers.length) return prev;
      return [...newcomers, ...prev];
    });
  }, [realtimeNotifications]);

  const markNotificationRead = async (id: string) => {
    try {
      await apiFetchAuth(endpoints.notifications.markRead(id), { method: "PATCH" });
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, readAt: new Date().toISOString() } : n)));
    } catch { }
  };

  const counts = useMemo(
    () => ({
      porAceptar: pending.length,
      pendientes: acceptedCount,
      hechas: completedCount,
    }),
    [pending.length, acceptedCount, completedCount],
  );

  const toCard = (x: BackendAppt) => ({
    id: x.id,
    patient: {
      id: x.patient?.id || "unknown",
      name: x.patient?.email || "Paciente",
      initials: (x.patient?.email || "P")[0].toUpperCase(),
    },
    doctor: { id: doctorId, name: me?.name || me?.email || "Doctor" },
    specialty: "General",
    startUTC: x.scheduledAt,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    status: "requested" as const,
  });

  const toCardAccepted = (x: BackendAppt) => ({
    ...toCard(x),
    status: "accepted" as const,
  });

  const onAccept = async (id: string) => {
    try {
      await apiFetchAuth(endpoints.appointments.updateStatus(id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ACCEPTED" }),
      });
      if (doctorId) loadAppointments(doctorId);
    } catch { }
  };

  const onReject = async (id: string) => {
    try {
      await apiFetchAuth(endpoints.appointments.updateStatus(id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });
      if (doctorId) loadAppointments(doctorId);
    } catch { }
  };

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">
          Hola Dr.
          {me?.name ? `, ${me.name}` : me?.name ? `, ${me.name}` : ""}
        </h1>
        <p className="text-sm text-muted-foreground">Bienvenido a tu panel. Revisa tus citas.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-card p-4">
          <div className="text-sm text-muted-foreground">Por aceptar</div>
          <div className="text-3xl font-bold text-cyan-700">{counts.porAceptar}</div>
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <div className="text-sm text-muted-foreground">Pendientes</div>
          <div className="text-3xl font-bold text-amber-700">{counts.pendientes}</div>
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <div className="text-sm text-muted-foreground">Hechas</div>
          <div className="text-3xl font-bold text-emerald-700">{counts.hechas}</div>
        </div>
      </section>

      {!!pending.length && (
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Citas por aceptar</h2>
          {pending.map((a) => (
            <AppointmentCard
              key={a.id}
              appt={toCard(a)}
              onAccept={() => onAccept(a.id)}
              onReject={() => onReject(a.id)}
              onOpen={() => router.push(`/doctor/appointments/${a.id}`)}
              onStart={() => { }}
            />
          ))}
        </section>
      )}

      {!!acceptedList.length && (
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Citas confirmadas</h2>
          {acceptedList.map((a) => (
            <AppointmentCard
              key={a.id}
              appt={toCardAccepted(a)}
              onOpen={() => router.push(`/doctor/appointments/${a.id}`)}
              onStart={() => router.push(`/doctor/appointments/${a.id}/call`)}
            />
          ))}
        </section>
      )}

      {!!history.length && (
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Historial reciente</h2>
          <div className="grid gap-4">
            {history.slice(0, 5).map((item) => (
              <div key={item.id} className="rounded-2xl border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.patient.name || item.patient.email}</p>
                    <p className="text-sm text-muted-foreground">{new Date(item.scheduledAt).toLocaleString()}</p>
                  </div>
                  <button className="text-sm text-cyan-700" onClick={() => router.push(`/doctor/appointments/${item.id}`)}>
                    Ver detalles
                  </button>
                </div>
                {!!item.events?.length && (
                  <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                    {item.events.slice(-3).map((event) => (
                      <li key={event.id}>• {event.message}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Notificaciones</h2>
          <button className="text-sm text-cyan-700" onClick={fetchNotifications} disabled={loadingNotifications}>
            {loadingNotifications ? "Actualizando…" : "Actualizar"}
          </button>
        </div>
        <div className="space-y-2">
          {notifications.slice(0, 5).map((notif) => (
            <div key={notif.id} className="rounded-xl border bg-card p-3 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{notif.title}</p>
                  <p className="text-muted-foreground">{notif.body}</p>
                </div>
                {!notif.readAt && (
                  <button className="text-xs text-cyan-700" onClick={() => markNotificationRead(notif.id)}>
                    Marcar como leída
                  </button>
                )}
              </div>
            </div>
          ))}
          {!notifications.length && !loadingNotifications && (
            <p className="text-sm text-muted-foreground">Sin notificaciones por ahora.</p>
          )}
        </div>
      </section>
    </main>
  );
}
