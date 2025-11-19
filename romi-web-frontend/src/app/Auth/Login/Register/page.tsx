"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
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
    <div className="mx-auto max-w-md py-10">
      <h1 className="text-2xl font-semibold mb-1">Crear cuenta</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Regístrate para usar ROMI
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Input label="Nombre (opcional)" {...register("name")} error={errors.name?.message} />
        <div className="grid gap-1.5">
          <label className="text-sm text-muted-foreground">Soy un</label>
          <div className="flex items-center gap-x-4">
            <label className="flex items-center gap-x-2">
              <input type="radio" value="patient" {...register("role")} defaultChecked />
              <span className="text-sm font-medium">Paciente</span>
            </label>
            <label className="flex items-center gap-x-2">
              <input type="radio" value="doctor" {...register("role")} />
              <span className="text-sm font-medium">Doctor</span>
            </label>
          </div>
          {errors.role && <p className="text-xs text-red-600">{errors.role.message}</p>}
        </div>
        {watchRole === "doctor" && (
          <div className="rounded-xl border p-4 bg-zinc-50 space-y-3">
            <h3 className="font-medium text-sm text-zinc-700">Datos del profesional</h3>
            <Input label="Especialidad *" {...register("specialty")} error={errors.specialty?.message} />
            <Input label="Ciudad" {...register("city")} error={errors.city?.message} />
            <Input
              label="Idiomas (separados por coma)"
              placeholder="Español, Inglés"
              {...register("languages")}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Precio por consulta (MXN)" type="number" step="100" {...register("price")} />
              <Input label="Años de experiencia" type="number" {...register("yearsExp")} />
            </div>
            <Input
              label="Próxima disponibilidad (texto)"
              placeholder="Hoy 3:00 PM"
              {...register("nextAvailable")}
            />
          </div>
        )}
        <Input label="Correo" type="email" {...register("email")} error={errors.email?.message} />
        <Input label="Contraseña" type="password" passwordToggle {...register("password")} error={errors.password?.message} />
        <Input label="Confirmar contraseña" type="password" passwordToggle {...register("confirm")} error={errors.confirm?.message} />
        {errors.root && (
          <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-md">
            {errors.root.message}
          </p>
        )}
        <Button type="submit" loading={isSubmitting} className="mt-2">
          Crear cuenta
        </Button>
      </form>
      <p className="text-sm text-muted-foreground mt-4">
        ¿Ya tienes cuenta?{" "}
        <Link href="/Auth/Login" className="text-cyan-700 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}


