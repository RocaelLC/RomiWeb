"use client";

import { useEffect, useRef, useState } from "react";

type Slide = {
  title: string;
  subtitle: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
};

const slides: Slide[] = [
  {
    title: "ROMI - Tu Asistente MÃ©dico Inteligente",
    subtitle: "Inteligencia artificial al servicio de la medicina",
    description: "ObtÃ©n respuestas mÃ©dicas precisas y actualizadas las 24 horas del dÃ­a",
    ctaText: "Probar ROMI",
    ctaHref: "/chat",
  },
  {
    title: "Telemedicina integrada",
    subtitle: "Agenda, videollamadas y notas clÃ­nicas",
    description: "Todo en un solo lugar, seguro y rÃ¡pido",
    ctaText: "Ver funciones",
    ctaHref: "/Presentation",
  },
  {
    title: "Cumplimiento y seguridad",
    subtitle: "Roles, auditorÃ­a y respaldos",
    description: "Mejores prÃ¡cticas para proteger a tus pacientes",
    ctaText: "ConÃ³cenos",
    ctaHref: "/AboutUs",
  },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const total = slides.length;
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Autoplay (cambia cada 6s). Se pausa al interactuar con dots.
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
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
      <div className="relative isolate overflow-hidden bg-gradient-romi">
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
                    <a
                      href={s.ctaHref}
                      className="px-6 py-3 rounded-xl bg-primary text-primary-foreground transition hover:bg-primary/90"
                    >
                      {s.ctaText} â†’
                    </a>
                  )}
                  <input
                    className="hidden md:block w-40 rounded-xl bg-white/90 px-3 py-3 text-sm outline-none placeholder:text-zinc-400"
                    placeholder="Buscarâ€¦"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

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
  );
}
