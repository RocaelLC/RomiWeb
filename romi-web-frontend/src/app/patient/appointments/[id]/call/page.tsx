"use client";
import { useParams } from 'next/navigation';
import CallView from '@/components/call/CallView';

export default function PatientCallPage() {
  const params = useParams();
  const id = String(params?.id ?? '');
  return <CallView appointmentId={id} role="patient" />;
}

