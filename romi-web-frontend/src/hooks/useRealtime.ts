"use client";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getToken } from "@/lib/auth";
import type { NotificationDTO } from "@/types/notifications";
import type { ChatMessagePayload } from "@/types/realtime";

function getRealtimeUrl() {
  // Usa la URL del gateway solo cuando esté configurada
  return process.env.NEXT_PUBLIC_REALTIME_URL || "";
}

export function useRealtime(options: { userId?: string | null; appointmentIds?: string[] } = {}) {
  const { userId, appointmentIds = [] } = options;
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessagePayload[]>>({});
  const socketRef = useRef<Socket | null>(null);
  const joinedAppointments = useRef(new Set<string>());

  useEffect(() => {
    if (!userId) return;
    const token = getToken();
    if (!token) return;
    const url = getRealtimeUrl();
    if (!url) {
      // Sin URL configurada no se abre el socket
      console.warn("[useRealtime] Realtime desactivado (sin NEXT_PUBLIC_REALTIME_URL)");
      return;
    }

    const socket = io(url, { auth: { token } });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join-user-channel", { userId });
    });

    socket.on("notification", (notif: NotificationDTO) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    socket.on("chat:message", (msg: ChatMessagePayload) => {
      setChatMessages((prev) => ({
        ...prev,
        [msg.appointmentId]: [...(prev[msg.appointmentId] ?? []), msg],
      }));
    });

    socket.on("disconnect", () => {
      joinedAppointments.current.clear();
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      joinedAppointments.current.clear();
    };
  }, [userId]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    appointmentIds.forEach((id) => {
      if (!id || joinedAppointments.current.has(id)) return;
      socket.emit("join-appointment-room", { appointmentId: id });
      joinedAppointments.current.add(id);
    });
  }, [appointmentIds]);

  return { socket: socketRef.current, notifications, chatMessages };
}
