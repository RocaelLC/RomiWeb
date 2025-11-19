"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Book, Brain, HeartPlus, Calendar } from "lucide-react";
import { BookmarkX as BookmarkSlashIcon } from "lucide-react";
type Slide = {
  title: string;
  subtitle: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
};
//declaro los slides con sus propiedades2
const slides: Slide[] = [
  {
    title: "ROMI - Tu Asistente Médico Inteligente",
    subtitle: "Inteligencia artificial al servicio de la medicina",
    description: "Obtén respuestas médicas precisas y actualizadas las 24 horas del día",
    ctaText: "Probar ROMI",
    ctaHref: "/chat",
  },
  {
    title: "Telemedicina integrada",
    subtitle: "Agenda, videollamadas y notas clínicas",
    description: "Todo en un solo lugar, seguro y rápido",
    ctaText: "Ver funciones",
    ctaHref: "/Presentation",
  },
  {
    title: "Cumplimiento y seguridad",
    subtitle: "Roles, auditoría y respaldos",
    description: "Mejores prácticas para proteger a tus pacientes",
    ctaText: "Conócenos",
    ctaHref: "/AboutUs",
  },
];

export default function Home() {
  const [i, setI] = useState(0);
  const total = slides.length;
  const timer = useRef<NodeJS.Timeout | null>(null);

  // en este bloque utilice un useEffect para que el slider avance automáticamente cada 6 segundos, utilizando setInterval.
  useEffect(() => {
    timer.current && clearInterval(timer.current);
    timer.current = setInterval(() => setI((v) => (v + 1) % total), 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [i, total]);

  const go = (idx: number) => {
    if (timer.current) clearInterval(timer.current);
    setI(idx);
  };

  return (
    <main className="min-h-screen">
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <div className="relative isolate overflow-hidden bg-gradient-romi">
          {/* Track */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {slides.map((s, idx) => (
              <div key={idx} className="w-full shrink-0">
                <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
                  <h1 className="text-center text-4xl md:text-6xl font-extrabold text-white">
                    {s.title}
                  </h1>
                  <p className="mt-4 text-lg md:text-2xl text-center text-white/90">
                    {s.subtitle}
                  </p>
                  {s.description && (
                    <p className="mt-2 text-center text-white/80">{s.description}</p>
                  )}
                  <div className="mt-8 flex justify-center gap-4">
                    {s.ctaText && s.ctaHref && (
                      <Link
                        href={s.ctaHref}
                        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground transition hover:bg-primary/90"
                      >
                        {s.ctaText} →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Ir al slide ${idx + 1}`}
                onClick={() => go(idx)}
                className={`h-2.5 w-2.5 rounded-full bg-white/80 transition ${
                  i === idx ? "scale-125" : "opacity-60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
            <h1 className=" text-center text-3xl font-bold text-primary m-12">Servicios Principales</h1>
            <p className="text-center text-base text-zinc-600 mt-2">
               Descubre nuetras soluciones innovadoras diseñadas para transformar la atención médica.
            </p>
            <section className="mt-10 grid md:grid-cols-4 gap-5 max-w-6xl mx-auto ">
                <div className="rounded-2xl border  p-6 shadow-inner mt-6 text-center">
                    <Brain className="mx-auto w-15 h-15 text-secondary" />
                    <h2 className="font-semibold text-xl mt-7">Asistente ROMI</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        IA médica avanzada para consultas y diagnósticos
                    </p>
                </div>
                <div className="rounded-2xl border p-6 shadow-inner mt-6 text-center">
                    <HeartPlus className="mx-auto w-15 h-15 text-secondary" />
                    <h2 className="font-semibold text-xl mt-7">Telesalud</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Consultas médicas remotas con especialistas
                    </p>
                </div>
                <div className="rounded-2xl border p-6 shadow-inner mt-6 text-center">
                    <Book className="mx-auto w-15 h-15 text-accent" />
                    <h2 className="font-semibold text-xl mt-7">Formación Médica</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Cursos y recursos educativos actualizados
                    </p>
                </div>
                <div className="rounded-2xl border p-6 shadow-inner mt-6 text-center">
                    <Calendar className="mx-auto w-15 h-15 text-secondary" />
                    <h2 className="font-semibold text-xl mt-7">Eventos Médicos</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                       Congresos, simposios y conferencias
                    </p>
                </div>
            </section>
            <section className="mt-10 grid md:grid-cols-4 gap-5 max-w-6xl mx-auto ">

            </section>
      </section>
    </main>
  );
}
