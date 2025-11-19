export type AppointmentStatus =
  | 'requested'
  | 'accepted'
  | 'rejected'
  | 'in_progress'
  | 'completed'
  | 'no_show';

export type Appointment = {
  id: string;
  patient: { id: string; name: string; initials: string; avatar?: string };
  doctor: { id: string; name: string };
  specialty: string;
  startUTC: string;
  tz: string;
  status: AppointmentStatus;
  joinUrl?: string;
  reasonRejection?: string;
  altSlots?: string[];
};

export type PreConsultAnswers = {
  appointmentId: string;
  chiefComplaint: string;
  symptoms: string[];
  onset: string;
  meds: string;
  history: string;
  files: string[];
};

export type AiIntakeSummary = {
  appointmentId: string;
  summary: string;
  bulletPoints: string[];
  riskFlags: string[];
};

