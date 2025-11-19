export enum NotificationType {
  APPT_CREATED = 'APPT_CREATED',
  APPT_ACCEPTED = 'APPT_ACCEPTED',
  APPT_REJECTED = 'APPT_REJECTED',
  APPT_CANCELLED = 'APPT_CANCELLED',
  APPT_REMINDER = 'APPT_REMINDER',
  APPT_ATTENDED = 'APPT_ATTENDED',
  CHAT_MESSAGE = 'CHAT_MESSAGE',
}

export type NotificationDTO = {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  appointmentId?: string | null;
  createdAt: string;
  readAt?: string | null;
};
