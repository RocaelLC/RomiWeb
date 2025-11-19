"use client";

import { useEffect, useState } from "react";
import { CalendarDays, User, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetchAuth, endpoints } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function NewAppointment({ doctorId }: { doctorId: string }) {
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [formMsg, setFormMsg] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setToken(getToken());
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const list = await apiFetchAuth<any[]>(endpoints.users.listDoctors, {
          method: "GET",
        });
        const d = list.find((x) => String(x.id) === String(doctorId));
        setDoctor(d || null);
      } catch (e: any) {
        setError(e?.message ?? "Error al cargar el doctor");
      } finally {
        setLoading(false);
      }
    })();
  }, [doctorId, token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !time) return setFormMsg("Selecciona fecha y hora");

    const start = new Date(`${date}T${time}:00Z`).toISOString();
    const payload = {
      doctorId,
      scheduledAt: start,
      reason: reason?.trim() || undefined,
      status: "PENDING",
      channel: "telehealth",
    };

    try {
      setSending(true);
      const res = await apiFetchAuth<{ id: string }>(endpoints.appointments.create, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      router.push(`/appointments/success?id=${res.id}`);
    } catch (err: any) {
      setFormMsg(err.message ?? "Ocurrió un error al agendar la cita");
    } finally {
      setSending(false);
    }
  }


  if (!hydrated) {
    return null;
  }

  if (!token) {
    return (
      <div className="max-w-md mx-auto p-6 mt-10 border rounded-xl bg-warning/15 text-warning-foreground text-center">
        <p>Necesitas iniciar sesión para agendar una cita.</p>
        <Link
          href={`/Auth/Login?next=/appointments/new?doctorId=${doctorId}`}
          className="text-primary underline"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  if (loading) return <div className="animate-pulse h-40 bg-zinc-100 rounded-xl" />;
  if (error) return <div className="text-destructive p-4">{error}</div>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="rounded-xl border shadow-sm bg-white p-5 flex gap-4 items-center">
        <div className="h-14 w-14 bg-primary/15 text-primary flex items-center justify-center rounded-full">
          <User className="w-7 h-7" />
        </div>
        <div>
          <h2 className="font-semibold text-lg text-zinc-800">{doctor?.name}</h2>
          <p className="text-sm text-zinc-500">{doctor?.specialty}</p>
          <div className="flex items-center text-xs text-zinc-400 gap-1">
            <Star className="w-3 h-3 text-accent" /> 4.8 / {doctor?.years_exp ?? 10} años exp.
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-xl border shadow-sm bg-white p-6 space-y-4"
      >
        <h3 className="text-primary font-semibold flex items-center gap-2">
          <CalendarDays className="w-5 h-5" /> Detalles de la cita
        </h3>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Fecha</label>
          <input
            type="date"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Hora</label>
          <input
            type="time"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Motivo</label>
          <textarea
            className="mt-1 w-full rounded-lg border px-3 py-2"
            rows={3}
            placeholder="Describe brevemente tu motivo"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {formMsg && (
          <p className="text-sm text-warning-foreground bg-warning/15 border border-warning rounded-lg p-2">
            {formMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition"
        >
          {sending ? "Agendando..." : "Confirmar cita"}
        </button>
      </form>
    </div>
  );
}
