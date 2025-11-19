"use client";
import { useEffect, useState } from "react";
import { apiFetchAuth, endpoints } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

type Appointment = {
  id: string;
  patient: { email: string };
  scheduledAt: string;
  reason?: string | null;
  status: "PENDING" | "ACCEPTED" | "CANCELED" | "COMPLETED";
};

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const router = useRouter();

  async function loadAppointments() {
    try {
      const token = getToken();
      if (!token) {
        router.replace("/Auth/Login");
        return;
      }

      // Toma el doctorId directamente del payload del token
      const { sub: doctorId } = JSON.parse(atob(token.split(".")[1]));
      const res = await apiFetchAuth(endpoints.appointments.byDoctor(doctorId), { method: "GET" }) as { items?: Appointment[] };
      setAppointments(res.items ?? []);
    } catch (err) {
      console.error("Error loading doctor appointments:", err);
    }
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Panel del Doctor</h1>
      <p className="text-gray-600 mb-6">
        Aquí puedes ver y gestionar las citas que te han sido asignadas.
      </p>

      <div className="space-y-4">
        {appointments.length === 0 && <p>No tienes citas pendientes.</p>}

        {appointments.map((a) => (
          <div key={a.id} className="border p-4 rounded-md shadow-sm flex justify-between items-center">
            <div>
              <p><b>Paciente:</b> {a.patient?.email}</p>
              <p><b>Fecha:</b> {new Date(a.scheduledAt).toLocaleString()}</p>
              <p><b>Motivo:</b> {a.reason ?? "No especificado"}</p>
            </div>
            <div className="space-x-2">
              {a.status === "PENDING" && (
                <>
                  <button
                    onClick={() => apiFetchAuth(endpoints.appointments.updateStatus(a.id), {
                      method: "PATCH",
                      body: JSON.stringify({ status: "ACCEPTED" }),
                    }).then(loadAppointments)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => apiFetchAuth(endpoints.appointments.updateStatus(a.id), {
                      method: "PATCH",
                      body: JSON.stringify({ status: "CANCELED" }),
                    }).then(loadAppointments)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Rechazar
                  </button>
                </>
              )}
              {a.status !== "PENDING" && (
                <span className="text-sm italic text-gray-500">{a.status}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
