export enum AppointmentStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  ATTENDED = 'ATTENDED',
}

export enum EventKind {
  APPOINTMENT_CREATED = 'APPOINTMENT_CREATED',
  APPOINTMENT_STATUS_CHANGED = 'APPOINTMENT_STATUS_CHANGED',
  APPOINTMENT_NOTE_ADDED = 'APPOINTMENT_NOTE_ADDED',
  CHAT_MESSAGE_SENT = 'CHAT_MESSAGE_SENT',
}

export type AppointmentEvent = {
  id: string;
  kind: EventKind;
  message: string;
  createdAt: string;
  payload?: Record<string, any> | null;
};

