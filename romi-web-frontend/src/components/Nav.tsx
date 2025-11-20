"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, LayoutDashboard, CalendarDays } from "lucide-react";
import { useAuth } from "@/app/Auth/contexts/AuthContext";
import Image from "next/image";
import { useRealtime } from "@/hooks/useRealtime";
import { apiFetchAuth, endpoints } from "@/lib/api";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/Services", label: "Servicios" },
  { href: "/Formation", label: "Formación" },
  { href: "/Investigation", label: "Investigación" },
  { href: "/Speciality", label: "Especialidades" },
  { href: "/Events", label: "Eventos" },
  { href: "/Contact", label: "Contacto" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const [unread, setUnread] = useState(0);
  const userId = user?.id ?? null;
  const { notifications: realtimeNotifications } = useRealtime({ userId });

  useEffect(() => {
    if (!userId) {
      setUnread(0);
      return;
    }
    (async () => {
      try {
        const data = await apiFetchAuth(
  endpoints.notifications.list(), 
  { method: "GET" },
);


        setUnread(
          Array.isArray(data) ? data.filter((n: any) => !n.readAt).length : 0
        );
      } catch {
        setUnread(0);
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (!realtimeNotifications.length) return;
    setUnread((prev) => prev + realtimeNotifications.filter((n) => !n.readAt).length);
  }, [realtimeNotifications]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  // 👇 Ajusta aquí si tu campo no se llama "role"
  const role = user?.roles?.[0] ?? null;
  const isDoctor = role === "DOCTOR";
  const isPatient = role === "PATIENT";

  const doctorDashboardHref = "/dashboard";
  const patientDashboardHref = "/appointments";

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/ROMO.png"
              alt="ROMI"
              width={120}
              height={40}
              className="object-contain transition-transform group-hover:scale-105"
            />
            
          </Link>

          {/* LINKS PÚBLICOS */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${isActive(l.href)
                  ? "text-primary"
                  : "text-gray-600 hover:text-gray-900"}`}
              >
                {l.label}
                <span className={`absolute left-2 right-2 -bottom-1 h-[2px] rounded-full bg-primary transition-opacity ${isActive(l.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}></span>
              </Link>
            ))}
          </div>

          <div className="flex-1" />

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-3">
            {/*  Panel según rol */}
            {isLoggedIn && isDoctor && (
              <Link
                href={doctorDashboardHref}
                className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-white px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 whitespace-nowrap"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Solicitudes</span>
              </Link>
            )}

            {isLoggedIn && isPatient && (
              <Link
                href={patientDashboardHref}
                className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-white px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 whitespace-nowrap"
              >
                <CalendarDays className="h-4 w-4" />
                <span>Mis citas</span>
              </Link>
            )}

            {/* Chat ROMI */}
            <div className="relative group">
              <Link
                href="/chat"
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#d58b88] via-[#d79c9c] to-[#dabebd] text-white text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-[#d58b88]/30 whitespace-nowrap shadow-md transition-all duration-300 ease-out"
              >
                Chat ROMI
              </Link>
              {unread > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-semibold text-white">
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </div>

            {/* Login / Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#d58b88] via-[#d79c9c] to-[#dabebd] text-white text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-[#d58b88]/30 whitespace-nowrap shadow-md transition-all duration-300 ease-out"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                href="/Auth/Login"
                className="px-4 py-2.5 rounded-full text-sm font-medium border-2 border-[#d58b88] text-[#d58b88] bg-white hover:bg-[#d58b88] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#d58b88]/20 whitespace-nowrap transition-all duration-300 ease-out"
              >
                Iniciar sesión
              </Link>
            )}
          </div>

          {/* BOTÓN MENÚ MOBILE */}
          <button
            className="md:hidden ml-auto p-2 rounded-md hover:bg-gray-100 active:scale-95 transition"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE */}
        {open && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-inner">
            <div className="px-4 py-4 flex flex-col gap-2">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(l.href)
                    ? "text-primary bg-primary/5"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  {l.label}
                </Link>
              ))}

              {/*  Panel según rol (mobile) */}
              {isLoggedIn && isDoctor && (
                <Link
                  href={doctorDashboardHref}
                  onClick={() => setOpen(false)}
                  className="mt-1 px-3 py-2 rounded-md text-sm border border-primary/30 bg-white text-primary flex items-center gap-2 hover:bg-primary/5 whitespace-nowrap"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Panel médico</span>
                </Link>
              )}

              {isLoggedIn && isPatient && (
                <Link
                  href={patientDashboardHref}
                  onClick={() => setOpen(false)}
                  className="mt-1 px-3 py-2 rounded-md text-sm border border-primary/30 bg-white text-primary flex items-center gap-2 hover:bg-primary/5 whitespace-nowrap"
                >
                  <CalendarDays className="h-4 w-4" />
                  <span>Mis citas</span>
                </Link>
              )}

              <div className="h-2" />

              {/* Chat ROMI */}
              <div className="relative group">
                <Link
                  href="/chat"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 rounded-full bg-gradient-to-r from-[#d58b88] via-[#d79c9c] to-[#dabebd] text-white text-sm text-center font-medium hover:scale-[1.02] hover:shadow-lg hover:shadow-[#d58b88]/30 whitespace-nowrap shadow-md transition-all duration-300 ease-out"
                >
                  Chat ROMI
                </Link>
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-semibold text-white">
                    {unread > 99 ? "99+" : unread}
                  </span>
                )}
              </div>

              {/* Login / Logout */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="mt-1 w-full px-4 py-2.5 rounded-full bg-gradient-to-r from-[#d58b88] via-[#d79c9c] to-[#dabebd] text-white text-sm font-medium hover:scale-[1.02] hover:shadow-lg hover:shadow-[#d58b88]/30 shadow-md transition-all duration-300 ease-out"
                >
                  Cerrar sesión
                </button>
              ) : (
                <Link
                  href="/Auth/Login"
                  onClick={() => setOpen(false)}
                  className="mt-1 block px-4 py-2.5 rounded-full text-sm font-medium border-2 border-[#d58b88] text-[#d58b88] bg-white hover:bg-[#d58b88] hover:text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-[#d58b88]/20 text-center transition-all duration-300 ease-out"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="h-2" />
    </>
  );
}
