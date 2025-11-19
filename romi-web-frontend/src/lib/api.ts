import { getToken } from "./auth";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export async function apiFetch(path: string, init: RequestInit = {}) {
  const url = `${API_BASE}${path}`;
  const headers = new Headers(init.headers ?? {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const method = init.method ?? "POST";

  const res = await fetch(url, {
    ...init,
    method,
    headers,
    body: method === "GET" ? undefined : init.body,
    credentials: "include",
    mode: "cors",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${text}`);
  }

  return res.json();
}

export async function apiFetchAuth<T = any>(
  path: string,
  init: RequestInit = {},
) {
  return apiFetch(path, { method: init.method ?? "GET", ...init }) as Promise<T>;
}


export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
  },

  appointments: {
    byPatient: "/appointments/patient",
    byDoctor: (id: string) => `/appointments/doctor/${id}`,
    byId: (id: string) => `/appointments/${id}`,         
    create: "/appointments",
    updateStatus: (id: string) => `/appointments/${id}/status`,
    delete: (id: string) => `/appointments/${id}`,
    historyMe: "/appointments/history/me"
  },
  users: {
    listDoctors: "/users/doctors",
    me: "/users/me",
  },

  notifications: {
    list: (onlyUnread?: boolean) =>
      `/notifications${onlyUnread ? "?onlyUnread=true" : ""}`,

    markAllRead: "/notifications/read-all",


    markRead: (id: string) => `/notifications/${id}/read`,
  },
  chat: {
    historyByAppointment: (id: string) => `/chat/appointments/${id}`,
  },
};


