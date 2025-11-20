"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { apiFetch, endpoints } from "@/lib/api";
const numberInput = z
  .string()
  .optional()
  .transform((v) => (v && !isNaN(Number(v)) ? Number(v) : undefined));
const schema = z
  .object({
    name: z.string().min(2, "Nombre muy corto").max(100).optional(),
    email: z.string().email("Correo inválido"),
    password: z.string().min(6, "minimo 6 caracteres"),
    confirm: z.string().min(6, "minimo 6 caracteres"),
    role: z.enum(["doctor", "patient"], { message: "Debes seleccionar un rol" }),
    specialty: z.string().optional(),
    city: z.string().optional(),
    languages: z.string().optional(),
    price: numberInput,
    yearsExp: numberInput,
    nextAvailable: z.string().optional(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  })
  .refine((d) => d.role !== "doctor" || !!d.specialty, {
    message: "La especialidad es requerida para doctores",
    path: ["specialty"],
  });
type FormData = z.infer<typeof schema>;
export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: "patient" },
  });
  const watchRole = watch("role", "patient");
  const onSubmit = async (data: FormData) => {
    try {
      const payload: any = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role.toUpperCase(),
      };
      if (data.role === "doctor") {
        payload.specialty = data.specialty;
        if (data.city) payload.city = data.city;
        if (data.languages)
          payload.languages = data.languages
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        if (data.price) payload.price = data.price;
        if (data.yearsExp) payload.yearsExp = data.yearsExp;
        if (data.nextAvailable) payload.nextAvailable = data.nextAvailable;
      }
      await apiFetch(endpoints.auth.register, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      router.replace("/Auth/Login");
    } catch (err: any) {
      console.error("Register error:", err);
      const raw = err?.message ?? "Ocurrió un error inesperado.";
      const message =
        Array.isArray(raw) ? raw.join(" • ") : String(raw);
      setError("root", { message });
    }
  };
  useEffect(() => {
    if (getToken()) router.replace("/doctor/appointments?filter=pending,confirmed");
  }, [router]);
  return (
    <main className="min-h-screen flex items-center justify-center relative left-1/2 -translate-x-1/2 w-screen overflow-hidden py-12">
      {/* Full-screen gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d58b88] via-[#d79c9c] to-[#dabebd] animate-gradient-slow" />

      {/* Blur circles with animations */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#edcccc]/40 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#edcccc]/40 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fade-in-up">
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl hover:shadow-[#d58b88]/20 hover:shadow-3xl p-8 transition-all duration-500">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#d58b88] to-[#d79c9c] mb-4 shadow-lg animate-bounce-slow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl  text-[#2d2d2d] font-fredoka-one mb-2">
              Crear cuenta
            </h1>
            <p className="text-sm text-[#2d2d2d]/70 font-poppins">
              Únete a ROMI hoy
            </p>
          </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1.5">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Tu nombre completo"
            className="w-full rounded-xl border-2 border-[#d58b88]/20 bg-white/50 px-4 py-3 text-sm focus:outline-none focus:border-[#d58b88] focus:bg-white focus:shadow-lg focus:shadow-[#d58b88]/10 font-poppins transition-all duration-300 hover:border-[#d58b88]/40 hover:bg-white"
            {...register("name")}
          />
          {errors.name && (
            <small className="text-red-600 text-xs mt-1 block font-poppins">
              {errors.name.message}
            </small>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-2">
            Soy un
          </label>
          <div className="flex items-center gap-x-6">
            <label className="flex items-center gap-x-2 cursor-pointer group">
              <input
                type="radio"
                value="patient"
                {...register("role")}
                defaultChecked
                className="w-5 h-5 text-[#d58b88] border-2 border-[#d58b88]/30 focus:ring-2 focus:ring-[#d58b88]/60 transition-all cursor-pointer"
              />
              <span className="text-sm font-medium text-[#2d2d2d] font-poppins group-hover:text-[#d58b88] transition-colors">Paciente</span>
            </label>
            <label className="flex items-center gap-x-2 cursor-pointer group">
              <input
                type="radio"
                value="doctor"
                {...register("role")}
                className="w-5 h-5 text-[#d58b88] border-2 border-[#d58b88]/30 focus:ring-2 focus:ring-[#d58b88]/60 transition-all cursor-pointer"
              />
              <span className="text-sm font-medium text-[#2d2d2d] font-poppins group-hover:text-[#d58b88] transition-colors">Doctor</span>
            </label>
          </div>
          {errors.role && (
            <small className="text-red-600 text-xs mt-1 block font-poppins">
              {errors.role.message}
            </small>
          )}
        </div>
        {watchRole === "doctor" && (
          <div className="rounded-2xl border-2 border-[#d58b88]/20 bg-gradient-to-br from-[#f8f6f6] to-white p-5 space-y-4 animate-slide-down shadow-inner">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-[#d58b88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-semibold text-sm text-[#2d2d2d] font-fredoka-one">
                Datos del profesional
              </h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1.5">
                Especialidad *
              </label>
              <input
                type="text"
                placeholder="Ej: Cardiología"
                className="w-full rounded-xl border-2 border-[#d58b88]/20 bg-white/50 px-4 py-3 text-sm focus:outline-none focus:border-[#d58b88] focus:bg-white focus:shadow-lg focus:shadow-[#d58b88]/10 font-poppins transition-all duration-300 hover:border-[#d58b88]/40 hover:bg-white"
                {...register("specialty")}
              />
              {errors.specialty && (
                <small className="text-red-600 text-xs mt-1 block font-poppins">
                  {errors.specialty.message}
                </small>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1.5">
                Ciudad
              </label>
              <input
                type="text"
                placeholder="Ej: Ciudad de México"
                className="w-full rounded-xl border-2 border-[#d58b88]/20 bg-white/50 px-4 py-3 text-sm focus:outline-none focus:border-[#d58b88] focus:bg-white focus:shadow-lg focus:shadow-[#d58b88]/10 font-poppins transition-all duration-300 hover:border-[#d58b88]/40 hover:bg-white"
                {...register("city")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1.5">
                Idiomas (separados por coma)
              </label>
              <input
                type="text"
                placeholder="Español, Inglés"
                className="w-full rounded-xl border-2 border-[#d58b88]/20 bg-white/50 px-4 py-3 text-sm focus:outline-none focus:border-[#d58b88] focus:bg-white focus:shadow-lg focus:shadow-[#d58b88]/10 font-poppins transition-all duration-300 hover:border-[#d58b88]/40 hover:bg-white"
                {...register("languages")}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1.5">
                  Precio consulta (MXN)
                </label>
                <input
                  type="number"
                  step="100"
                  placeholder="500"
                  className="w-full rounded-xl border-2 border-[#d58b88]/20 bg-white/50 px-4 py-3 text-sm focus:outline-none focus:border-[#d58b88] focus:bg-white focus:shadow-lg focus:shadow-[#d58b88]/10 font-poppins transition-all duration-300 hover:border-[#d58b88]/40 hover:bg-white"
                  {...register("price")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1.5">
                  Años experiencia
                </label>
                <input
                  type="number"
                  placeholder="5"
                  className="w-full rounded-xl border-2 border-[#d58b88]/20 bg-white/50 px-4 py-3 text-sm focus:outline-none focus:border-[#d58b88] focus:bg-white focus:shadow-lg focus:shadow-[#d58b88]/10 font-poppins transition-all duration-300 hover:border-[#d58b88]/40 hover:bg-white"
                  {...register("yearsExp")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1.5">
                Próxima disponibilidad
              </label>
              <input
                type="text"
                placeholder="Hoy 3:00 PM"
                className="w-full rounded-xl border-2 border-[#d58b88]/20 bg-white/50 px-4 py-3 text-sm focus:outline-none focus:border-[#d58b88] focus:bg-white focus:shadow-lg focus:shadow-[#d58b88]/10 font-poppins transition-all duration-300 hover:border-[#d58b88]/40 hover:bg-white"
                {...register("nextAvailable")}
              />
            </div>
          </div>
        )}
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

        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1.5">
            Confirmar contraseña
          </label>
          <input
            type="password"
            placeholder="Conirmar contraseña"
            className="w-full rounded-xl border-2 border-[#d58b88]/20 bg-white/50 px-4 py-3 text-sm focus:outline-none focus:border-[#d58b88] focus:bg-white focus:shadow-lg focus:shadow-[#d58b88]/10 font-poppins transition-all duration-300 hover:border-[#d58b88]/40 hover:bg-white"
            {...register("confirm")}
          />
          {errors.confirm && (
            <small className="text-red-600 text-xs mt-1 block font-poppins">
              {errors.confirm.message}
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
          className="group relative w-full bg-gradient-to-r from-[#d58b88] to-[#d79c9c] hover:from-[#d79c9c] hover:to-[#dabebd] text-white font-fredoka-one  py-3.5 rounded-xl transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#d58b88]/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
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
                Creando cuenta...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Crear cuenta
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
          ¿Ya tienes cuenta?{" "}
          <Link href="/Auth/Login" className="text-[#d58b88] font-semibold hover:text-[#d79c9c] transition-colors duration-300 relative group">
            Inicia sesión
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d58b88] to-[#d79c9c] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </p>
      </div>
        </div>
      </div>
    </main>
  );
}


