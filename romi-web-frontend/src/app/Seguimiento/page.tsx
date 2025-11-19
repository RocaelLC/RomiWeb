"use client";
import { useState, useEffect } from "react";
import { apiFetchAuth, endpoints } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function PatientDashboard() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");

  async function loadDoctors() {
    try {
      const res = await apiFetchAuth<any[]>(endpoints.users.listDoctors, { method: "GET" });
      setDoctors(res ?? []);
    } catch (err) {
      console.error("Error loading doctors:", err);
    }
  }

  async function submitAppointment(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiFetchAuth(endpoints.appointments.create, {
        method: "POST",
        body: JSON.stringify({
          doctorId: selected,
          scheduledAt: date,
          reason,
        }),
      });
      alert("Cita solicitada correctamente ✅");
      setSelected("");
      setReason("");
      setDate("");
    } catch (err) {
      console.error("Error creando cita:", err);
      alert("Error al crear la cita ❌");
    }
  }

useEffect(() => {
  loadDoctors();
}, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Panel del Paciente</h1>
      <form onSubmit={submitAppointment} className="grid gap-4 max-w-md">
        <label>
          <span>Médico:</span>
          <select
            className="border p-2 w-full rounded"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Selecciona un médico</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.specialty}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Fecha y hora:</span>
          <input
            type="datetime-local"
            className="border p-2 w-full rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          <span>Motivo:</span>
          <textarea
            className="border p-2 w-full rounded"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe el motivo de tu consulta"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Confirmar Cita
        </button>
      </form>
    </div>
  );
}
