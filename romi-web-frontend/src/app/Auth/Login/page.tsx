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

      setAuthToken(res.access_token);
      login(res.access_token);

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

      window.location.href = '/dashboard';
    } catch (err: any) {
      const message = err?.message || 'Correo o contraseña incorrectos.';
      setError("root", { message });
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center relative left-1/2 -translate-x-1/2 w-screen overflow-hidden">
      {/* Full-screen gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d58b88] via-[#d79c9c] to-[#dabebd] animate-gradient-slow" />

      {/* Blur circles with animations */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#edcccc]/40 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#edcccc]/40 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fade-in-up">
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl hover:shadow-[#d58b88]/20 hover:shadow-3xl p-8 transition-all duration-500">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#d58b88] to-[#d79c9c] mb-4 shadow-lg animate-bounce-slow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl  text-[#2d2d2d] font-fredoka-one mb-2">
              ¡Bienvenido!
            </h1>
            <p className="text-sm text-[#2d2d2d]/70 font-poppins">
              Inicia sesión en ROMI
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1.5">
                Correo
              </label>
              <input
                type="email"
                placeholder="Correo"
                className="w-full rounded-xl border-2 border-[#d58b88]/20 bg-white/50 px-4 py-3 text-sm focus:outline-none focus:border-[#d58b88] focus:bg-white focus:shadow-lg focus:shadow-[#d58b88]/10 font-poppins transition-all duration-300 hover:border-[#d58b88]/40 hover:bg-white"
                {...register("email")}
              />
              {errors.email && (
                <small className="text-red-600 text-xs mt-1 block font-poppins">
                  {errors.email.message}
                </small>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full rounded-xl border-2 border-[#d58b88]/20 bg-white/50 px-4 py-3 text-sm focus:outline-none focus:border-[#d58b88] focus:bg-white focus:shadow-lg focus:shadow-[#d58b88]/10 font-poppins transition-all duration-300 hover:border-[#d58b88]/40 hover:bg-white"
                {...register("password")}
              />
              {errors.password && (
                <small className="text-red-600 text-xs mt-1 block font-poppins">
                  {errors.password.message}
                </small>
              )}
            </div>

            {errors.root && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700 font-poppins">
                {errors.root.message}
              </div>
            )}

            <button
              type="submit"
              className="group relative w-full bg-gradient-to-r from-[#d58b88] to-[#d79c9c] hover:from-[#d79c9c] hover:to-[#dabebd] text-white font-fredoka-one py-3.5 rounded-xl mt-2 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#d58b88]/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              disabled={isSubmitting}
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#d58b88]/10">
            <p className="text-sm text-[#2d2d2d]/70 font-poppins text-center">
              ¿No tienes cuenta?{" "}
              <Link href="/Auth/Login/Register" className="text-[#d58b88] font-semibold hover:text-[#d79c9c] transition-colors duration-300 relative group">
                Crear cuenta
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d58b88] to-[#d79c9c] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#d58b88] via-[#d79c9c] to-[#dabebd]">
        <div className="text-white font-poppins">Cargando…</div>
      </div>
    }>
      <LoginInner />
    </Suspense>
  );
}
