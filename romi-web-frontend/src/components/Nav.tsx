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
  { href: "/Presentation", label: "Presentación" },
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
        const data = await apiFetchAuth(endpoints.notifications.list(true), {
          method: "GET",
        });
        setUnread(Array.isArray(data) ? data.length : 0);
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
      <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-4">
          <Link href="/" className="font-bold text-xl tracking-tight text-primary">
            <div className="flex items-center">
              <Image
                src="/images/ROMO.PNG"
                alt="ROMI — Tu asistente virtual"
                width={140}
                height={46}
                priority
                className="h-9 w-auto"
              />
              <span className="sr-only">ROMI</span>
            </div>
          </Link>

          {/* LINKS PÚBLICOS */}
          <div className="hidden md:flex items-center gap-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-full text-l transition ${
                  isActive(l.href)
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex-1" />

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-2">
            {/*  Panel según rol */}
            {isLoggedIn && isDoctor && (
              <Link
                href={doctorDashboardHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 whitespace-nowrap"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Solicitudes</span>
              </Link>
            )}

            {isLoggedIn && isPatient && (
              <Link
                href={patientDashboardHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 whitespace-nowrap"
              >
                <CalendarDays className="h-4 w-4" />
                <span>Mis citas</span>
              </Link>
            )}

            {/* Chat ROMI */}
            <div className="relative">
              <Link
                href="/chat"
                className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm hover:bg-primary/90 whitespace-nowrap"
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
                className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm hover:bg-primary/90 whitespace-nowrap"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                href="/Auth/Login"
                className="px-3 py-1.5 rounded-full text-sm border hover:bg-muted"
              >
                Iniciar sesión
              </Link>
            )}
          </div>

          {/* BOTÓN MENÚ MOBILE */}
          <button
            className="md:hidden ml-auto p-2 rounded hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE */}
        {open && (
          <div className="md:hidden border-t border-border bg-white/80 backdrop-blur">
            <div className="px-4 py-3 flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm transition ${
                    isActive(l.href)
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                </Link>
              ))}

              {/*  Panel según rol (mobile) */}
              {isLoggedIn && isDoctor && (
                <Link
                  href={doctorDashboardHref}
                  onClick={() => setOpen(false)}
                  className="mt-1 px-3 py-2 rounded-md text-sm border border-primary/40 bg-primary/10 text-primary flex items-center gap-2 hover:bg-primary/15 whitespace-nowrap"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Panel médico</span>
                </Link>
              )}

              {isLoggedIn && isPatient && (
                <Link
                  href={patientDashboardHref}
                  onClick={() => setOpen(false)}
                  className="mt-1 px-3 py-2 rounded-md text-sm border border-primary/40 bg-primary/10 text-primary flex items-center gap-2 hover:bg-primary/15 whitespace-nowrap"
                >
                  <CalendarDays className="h-4 w-4" />
                  <span>Mis citas</span>
                </Link>
              )}

              <div className="h-2" />

              {/* Chat ROMI */}
              <div className="relative">
                <Link
                  href="/chat"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm text-center hover:bg-primary/90 whitespace-nowrap"
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
                  className="mt-1 px-3 py-2 rounded-md text-sm border hover:bg-muted"
                >
                  Cerrar sesión
                </button>
              ) : (
                <Link
                  href="/Auth/Login"
                  onClick={() => setOpen(false)}
                  className="mt-1 px-3 py-2 rounded-md text-sm border text-center hover:bg-muted"
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
