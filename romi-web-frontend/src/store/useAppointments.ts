"use client";
import { useCallback, useMemo, useState } from 'react';
import type { Appointment, PreConsultAnswers } from '@/lib/types';
import { listAppointments, acceptAppointment, rejectAppointment, savePreConsult, simulateReminders } from '@/lib/mock';

export function useAppointments() {
  const [items, setItems] = useState<Appointment[]>(() => listAppointments());

  const refresh = useCallback(() => setItems(listAppointments()), []);

  const accept = useCallback((id: string) => {
    const a = acceptAppointment(id);
    simulateReminders(a!);
    setItems(listAppointments());
    return a;
  }, []);

  const reject = useCallback((id: string, reason: string) => {
    const a = rejectAppointment(id, reason);
    setItems(listAppointments());
    return a;
  }, []);

  const savePre = useCallback((data: PreConsultAnswers) => {
    const ok = savePreConsult(data);
    return ok;
  }, []);

  return useMemo(() => ({ items, refresh, accept, reject, savePre }), [items, refresh, accept, reject, savePre]);
}

