import { apiFetchAuth, endpoints } from '@/lib/api';

export async function fetchDoctorAppointments(doctorId: string) {
  // Citas pendientes del doctor
  const pending = await apiFetchAuth<{ items: any[] }>(
    `${endpoints.appointments.byDoctor(doctorId)}?status=PENDING`
  ).catch(() => ({ items: [] }));

  // Próximas aceptadas para los siguientes 7 días
  const now = new Date().toISOString();
  const to = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const next = await apiFetchAuth<{ items: any[] }>(
    `${endpoints.appointments.byDoctor(doctorId)}?status=ACCEPTED&from=${now}&to=${to}`
  ).catch(() => ({ items: [] }));

  return { pending: pending.items ?? [], next: next.items ?? [] };
}
