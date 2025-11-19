'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetchAuth, endpoints } from '@/lib/api';

export default function AppointmentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const run = async () => {
      const res = await apiFetchAuth(endpoints.appointments.byId(params.id));
      setData(res);
    };
    run();
  }, [params.id]);

  if (!data) return <p className="p-6">Loading…</p>;

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Appointment Detail</h1>
      <div className="border rounded p-4 space-y-2">
        <p><b>Patient:</b> {data.patient?.email ?? '—'}</p>
        <p><b>Doctor:</b> {data.doctor?.email ?? '—'}</p>
        <p><b>Date/Time:</b> {new Date(data.scheduledAt).toLocaleString()}</p>
        <p><b>Status:</b> {data.status}</p>
        <p><b>Reason:</b> {data.reason || '—'}</p>
      </div>
      <button onClick={() => router.back()} className="px-4 py-2 border rounded">Back</button>
    </main>
  );
}
