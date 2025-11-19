"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiFetch } from "@/lib/api";
import { setAuthToken } from "@/lib/authToken";
import { useAuth } from "@/app/Auth/contexts/AuthContext";

const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  remember: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

function LoginInner() {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } =
    useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { remember: true } });

  async function onSubmit(data: FormData) {
    try {
      const res = await apiFetch('/auth/login', {
        body: JSON.stringify({ email: data.email, password: data.password })
      });
      if (!res?.access_token) throw new Error("No access_token");

      setAuthToken(res.access_token); // almacenamiento auxiliar
      login(res.access_token); // actualiza contexto y cookie 'access_token'

      try {
        const me = await apiFetch('/auth/me', { method: 'GET' });
        const roles: string[] = (me?.roles ?? []).map((r: any) => String(r).toUpperCase());
        const dest = roles.includes('DOCTOR')
          ? '/dashboard'
          : roles.includes('PATIENT')
            ? '/appointments'
            : '/dashboard';
        window.location.href = dest;
        return;
      } catch {}

      window.location.href = '/dashboard'; // fallback
    } catch (err: any) {
      const message = err?.message || 'Correo o contraseña incorrectos.';
      setError("root", { message });
    }
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <h1 className="text-2xl font-semibold mb-1">Iniciar sesión</h1>
      <p className="text-sm text-muted-foreground mb-6">Accede con tu cuenta de ROMI</p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <input type="email" placeholder="Correo" className="border p-2 rounded" {...register("email")} />
        {errors.email && <small className="text-red-600">{errors.email.message}</small>}

        <input type="password" placeholder="Contraseña" className="border p-2 rounded" {...register("password")} />
        {errors.password && <small className="text-red-600">{errors.password.message}</small>}

        {errors.root && <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">{errors.root.message}</p>}

        <button
          type="submit"
          className=" text-primary  bg-cyan-700 text-white py-2 rounded mt-2 hover:bg-cyan-800 "
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="text-sm text-muted-foreground mt-4">
        ¿No tienes cuenta?{" "}
        <Link href="/Auth/Login/Register" className="text-cyan-700 hover:underline">
          Crear cuenta
        </Link>
      </p>
    </div>
  );
 }

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-6">Cargando…</div>}>
      <LoginInner />
    </Suspense>
  );
}
