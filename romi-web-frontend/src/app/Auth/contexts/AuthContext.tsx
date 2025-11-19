"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { decodeJwt, getToken, clearToken, setToken } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";

type Role = "DOCTOR" | "PATIENT";
type Decoded = { sub: string; role?: Role | Role[]; roles?: (Role | string)[]; exp?: number };

type User = { id: string; roles: Role[] };

type AuthCtx = {
  user: User | null;
  ready: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  ready: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const boot = () => {
    const t = getToken();
    if (!t) {
      setUser(null);
      setReady(true);
      return;
    }
    const decoded = decodeJwt<Decoded>(t);
    const now = Math.floor(Date.now() / 1000);
    const rawRoles = (decoded?.roles ?? decoded?.role) as (Role | string)[] | undefined;
    const rolesArr = rawRoles
      ? (Array.isArray(rawRoles) ? rawRoles : [rawRoles]).map((r) => String(r).toUpperCase() as Role)
      : [];
    if (!decoded || (decoded.exp && decoded.exp < now) || rolesArr.length === 0) {
      clearToken();
      setUser(null);
      setReady(true);
      if (!pathname?.startsWith("/Auth")) router.replace("/Auth/Login");
      return;
    }
    setUser({ id: decoded.sub, roles: rolesArr as Role[] });
    setReady(true);
  };

  useEffect(() => {
    boot();
  }, [pathname]);

  const login = (accessToken: string) => {
    setToken(accessToken);
    const d = decodeJwt<Decoded>(accessToken);
    const rawRoles = (d?.roles ?? d?.role) as (Role | string)[] | undefined;
    const rolesArr = rawRoles
      ? (Array.isArray(rawRoles) ? rawRoles : [rawRoles]).map((r) => String(r).toUpperCase() as Role)
      : [];
    if (d?.sub && rolesArr.length > 0) {
      setUser({ id: d.sub, roles: rolesArr as Role[] });
    } else {
      // Descarta tokens inválidos y reinicia el estado
      clearToken();
      setUser(null);
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
    router.replace("/Auth/Login");
  };

  const value = useMemo(() => ({ user, ready, login, logout }), [user, ready]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
