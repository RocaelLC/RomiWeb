"use client";

import { ShieldCheck, Video, Clock3 } from "lucide-react";

export default function DoctorsHero() {
  return (
    <>
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-romi">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Telemedicina Avanzada
          </h1>
          <p className="mt-3 text-base md:text-lg opacity-90">
            Conecta con especialistas de primer nivel desde la comodidad de tu hogar.
            Consultas seguras, diagnosticos precisos y seguimiento personalizado.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 text-zinc-800 px-3 py-1.5 text-sm shadow-sm">
              <Video className="w-4 h-4 text-cyan-600" />
              Consultas HD
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 text-zinc-800 px-3 py-1.5 text-sm shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Seguro
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 text-zinc-800 px-3 py-1.5 text-sm shadow-sm">
              <Clock3 className="w-4 h-4 text-cyan-700" />
              24/7 Disponible
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-primary">
          Encuentra tu Especialista
        </h2>
        <p className="mt-5 text-zinc-500 text-center">
          Selecciona la especialidad o busca por nombre/ciudad y elige con quien consultar.
        </p>
      </div>
    </>
  );
}
