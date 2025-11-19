"use client";

import { MapPin, Languages, CalendarDays, Star } from "lucide-react";
import Link from "next/link";

export type Doctor = {
  id: number | string;
  name: string;
  specialty: string;
  city?: string;
  price?: number;               // MXN
  rating?: number;              // 0..5
  years_exp?: number;           // años de experiencia
  next_available?: string;      // texto "Hoy 3:00 PM"
  languages?: string[];         // ["Español","Inglés"]
  is_available?: boolean;
};

export default function DoctorCard({ d }: { d: Doctor }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm hover:shadow-md transition">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{d.name}</h3>
            <Link href="#" className="text-sm text-primary hover:underline">
              {d.specialty}
            </Link>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${d.is_available ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}
          >
            {d.is_available ? "Disponible" : "Ocupado"}
          </span>
        </div>

        <div className="mt-3 space-y-2 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>
              {d.rating?.toFixed(1) ?? "4.8"}{" "}
              <span className="text-zinc-400">({d.years_exp ?? 10} años)</span>
            </span>
          </div>
          {d.city && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{d.city}</span>
            </div>
          )}
          {d.next_available && (
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>Próxima cita: {d.next_available}</span>
            </div>
          )}
          {!!d.languages?.length && (
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4" />
              <span>Idiomas: {d.languages.join(", ")}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-cyan-700 font-bold">
            {typeof d.price === "number" ? `$${d.price} MXN` : "$800 MXN"}
            <span className="ml-1 text-xs text-zinc-400 font-normal">por consulta</span>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/appointments/new?doctorId=${d.id}`}
              className="px-6 py-1 rounded bg-gradient-romi text-white text-center hover:bg-rose-700"
            >
              Agendar Cita
            </Link>
            <Link
              href={`/doctores/${d.id}`}
              className="px-3 py-2 rounded-lg border text-sm hover:bg-zinc-50 text-center"
            >
              Ver perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

