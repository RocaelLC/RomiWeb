import { Appointment, AppointmentStatus, PreConsultAnswers, AiIntakeSummary } from './types';

// simple in-memory store + localStorage persistence for pre-consult
const APPTS: Appointment[] = (() => {
  const now = Date.now();
  const h = (n: number) => new Date(now + n * 3600000).toISOString();
  return [
    { id: 'a1', patient: { id: 'p1', name: 'María López', initials: 'ML' }, doctor: { id: 'd1', name: 'Dr. Juan Pérez' }, specialty: 'Cardiología', startUTC: h(26), tz: 'America/Mexico_City', status: 'requested' },
    { id: 'a2', patient: { id: 'p2', name: 'José Martínez', initials: 'JM' }, doctor: { id: 'd1', name: 'Dr. Juan Pérez' }, specialty: 'Dermatología', startUTC: h(2), tz: 'America/Mexico_City', status: 'accepted', joinUrl: '/meet/a2' },
    { id: 'a3', patient: { id: 'p3', name: 'Ana Gómez', initials: 'AG' }, doctor: { id: 'd1', name: 'Dr. Juan Pérez' }, specialty: 'Endocrinología', startUTC: h(-1), tz: 'America/Mexico_City', status: 'completed' },
    { id: 'a4', patient: { id: 'p4', name: 'Luis Rivera', initials: 'LR' }, doctor: { id: 'd1', name: 'Dr. Juan Pérez' }, specialty: 'Pediatría', startUTC: h(0.5), tz: 'America/Mexico_City', status: 'requested' },
    { id: 'a5', patient: { id: 'p5', name: 'Sofía Díaz', initials: 'SD' }, doctor: { id: 'd1', name: 'Dr. Juan Pérez' }, specialty: 'Neurología', startUTC: h(50), tz: 'America/Mexico_City', status: 'rejected', reasonRejection: 'Conflicto de agenda' },
    { id: 'a6', patient: { id: 'p6', name: 'Carlos Ruiz', initials: 'CR' }, doctor: { id: 'd1', name: 'Dr. Juan Pérez' }, specialty: 'Ginecología', startUTC: h(10), tz: 'America/Mexico_City', status: 'requested' },
  ];
})();

export function listAppointments() {
  return [...APPTS];
}

export function findAppointment(id: string) {
  return APPTS.find(a => a.id === id) || null;
}

export function setStatus(id: string, status: AppointmentStatus) {
  const a = APPTS.find(x => x.id === id);
  if (a) a.status = status;
  return a || null;
}

export function acceptAppointment(id: string) {
  const a = setStatus(id, 'accepted');
  if (a) a.joinUrl = `/meet/${id}`;
  return a;
}

export function rejectAppointment(id: string, reason: string) {
  const a = setStatus(id, 'rejected');
  if (a) {
    a.reasonRejection = reason || 'No disponible';
    a.altSlots = getAltSlots(a.startUTC, a.tz);
  }
  return a;
}

export function getAltSlots(startUTC: string, tz: string) {
  const base = new Date(startUTC).getTime();
  const opts = [6, 12, 24, 48].map(h => new Date(base + h * 3600000).toISOString());
  return opts;
}

const PRE_KEY = 'romi_pre_consult';
export function savePreConsult(data: PreConsultAnswers) {
  try {
    const all = JSON.parse(localStorage.getItem(PRE_KEY) || '[]');
    const without = all.filter((x: any) => x.appointmentId !== data.appointmentId);
    without.push(data);
    localStorage.setItem(PRE_KEY, JSON.stringify(without));
    return true;
  } catch {
    return false;
  }
}

export function getPreConsult(appointmentId: string): PreConsultAnswers | null {
  try {
    const all = JSON.parse(localStorage.getItem(PRE_KEY) || '[]');
    return all.find((x: any) => x.appointmentId === appointmentId) || null;
  } catch { return null; }
}

export function simulateReminders(_appointment: Appointment) {
  // no-op in mock; UI will compute banners from time
}

export function getAiIntakeSummary(appointmentId: string): AiIntakeSummary {
  return {
    appointmentId,
    summary: 'Paciente con síntomas compatibles; se recomienda evaluación en videconsulta, descartar banderas rojas.',
    bulletPoints: [
      'Motivo principal: dolor torácico leve',
      'Síntomas: palpitaciones, fatiga',
      'Inicio: hace 3 días, intermitente',
      'Medicamentos: ibuprofeno 400mg',
    ],
    riskFlags: ['Cardiovascular', 'Dolor torácico'],
  };
}

export function toast(msg: string) {
  if (typeof window !== 'undefined') {
    // simple shim; replace with shadcn toast if available
    // eslint-disable-next-line no-alert
    window.alert(msg);
  } else {
    // eslint-disable-next-line no-console
    console.log('[toast]', msg);
  }
}

