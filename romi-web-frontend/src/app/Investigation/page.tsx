import {
  Beaker,
  BookOpenCheck,
  LineChart,
  ShieldCheck,
  Users,
  FileText,
  Sparkles,
  Compass,
  Download,
  BookOpen,
  Layers,
  Award,
  TrendingUp
} from "lucide-react";

export const metadata = { title: "ROMI — Investigación" };

const researchLines = [
  {
    title: "Salud mental y bienestar digital",
    description:
      "Estudio del impacto de ROMI en la reducción de síntomas, adherencia al tratamiento y bienestar percibido.",
  },
  {
    title: "Experiencia del paciente",
    description:
      "Análisis de la satisfacción, accesibilidad y percepción de acompañamiento durante y entre consultas.",
  },
  {
    title: "Eficiencia clínica",
    description:
      "Medición del tiempo en consulta, carga administrativa y organización de información clínica.",
  },
];

const evidenceBlocks = [
  {
    tag: "Marco teórico",
    title: "ROMI se fundamenta en modelos basados en evidencia",
    points: [
      "Uso de principios de psicoeducación y acompañamiento continuo.",
      "Diseño centrado en la relación profesional–paciente.",
      "Integración con buenas prácticas de seguimiento clínico.",
    ],
  },
  {
    tag: "Evaluación continua",
    title: "Medimos, ajustamos y volvemos a medir",
    points: [
      "Análisis de uso real de la plataforma en consultas.",
      "Encuestas a profesionales y pacientes sobre la experiencia.",
      "Iteración de funcionalidades según hallazgos de investigación.",
    ],
  },
];

const publications = [
  {
    year: "En desarrollo",
    title: "Protocolos para evaluar asistentes digitales en salud mental",
    type: "Protocolo de estudio",
  },
  {
    year: "Próximamente",
    title: "Impacto de ROMI en la organización de la consulta psicológica",
    type: "Estudio observacional",
  },
];

export default function InvestigationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO con degradado (única zona color) */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d58b88] via-[#d79c9c] to-[#dabebd]" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#edcccc]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#dabebd]/40 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-24">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Texto principal */}
            <div className="md:col-span-3 text-white">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-medium text-white/90 mb-4">
                <Beaker className="h-4 w-4" /> <span>Investigación y evidencia</span>
              </p>
              <h1 className="font-fredoka-one text-5xl md:text-6xl leading-tight drop-shadow-sm">
                Investigación basada en <span className="text-[#edcccc]">evidencia</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-white/90 font-poppins max-w-xl">
                ROMI evoluciona a partir de datos clínicos reales, colaboración con profesionales y mejora continua enfocada en el bienestar y la práctica terapéutica.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#lineas" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#d58b88] shadow hover:shadow-lg hover:scale-[1.04] transition">
                  <LineChart className="h-5 w-5" /> Líneas
                </a>
                <a href="#evidencia" className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-7 py-3 text-sm font-semibold text-[#d58b88] border border-white/50 hover:bg-white transition">
                  <BookOpenCheck className="h-5 w-5" /> Evidencia
                </a>
                <a href="#publicaciones" className="inline-flex items-center gap-2 rounded-full bg-[#c7d68f] px-7 py-3 text-sm font-semibold text-white shadow hover:bg-[#bfcf82] transition">
                  <FileText className="h-5 w-5" /> Publicaciones
                </a>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                <MiniMetric icon={Award} value="10+" label="Estudios" />
                <MiniMetric icon={TrendingUp} value="97%" label="Adopción" />
                <MiniMetric icon={Layers} value="1.2K" label="Datos analizados" />
              </div>
            </div>
            {/* Navegación lateral */}
            <aside className="md:col-span-2">
              <nav aria-label="Navegación investigación" className="rounded-3xl bg-white/80 backdrop-blur border border-[#d58b88]/20 p-6 flex flex-col gap-4 shadow-lg">
                <h2 className="text-[#d58b88] font-fredoka-one text-xl flex items-center gap-2"><Compass className="h-5 w-5" /> Navegación</h2>
                <SideLink active icon={LineChart} label="Líneas" />
                <SideLink icon={BookOpenCheck} label="Evidencia" />
                <SideLink icon={FileText} label="Publicaciones" />
                <SideLink icon={Users} label="Colaboración" />
              </nav>
            </aside>
          </div>
        </div>
      </section>

      {/* LÍNEAS DE INVESTIGACIÓN */}
      <section id="lineas" className="relative left-1/2 -translate-x-1/2 w-screen scroll-mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-20 space-y-12">
          <header className="max-w-3xl">
            <h2 className="text-4xl font-fredoka-one text-[#d58b88]">Líneas de investigación</h2>
            <p className="mt-4 text-base text-gray-600 font-poppins max-w-xl">Exploramos cómo la tecnología apoya la relación terapéutica y potencia la práctica clínica cotidiana sin sustituir el vínculo humano.</p>
          </header>
          <div className="grid gap-7 md:grid-cols-3">
            {researchLines.map(line => (
              <article key={line.title} className="rounded-3xl border border-[#d58b88]/20 bg-white shadow-sm p-6 flex flex-col gap-3 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-gray-800 font-poppins">{line.title}</h3>
                <p className="text-sm text-gray-600 font-poppins">{line.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EVIDENCIA Y MÉTODOS */}
      <section id="evidencia" className="relative left-1/2 -translate-x-1/2 w-screen scroll-mt-24 border-y border-[#d58b88]/20 bg-[#FDFBFA]">
        <div className="mx-auto max-w-7xl px-8 py-20 grid gap-12 md:grid-cols-[1.2fr,1fr] items-start">
          <div className="space-y-8">
            {evidenceBlocks.map(block => (
              <article key={block.title} className="rounded-3xl border border-[#d58b88]/20 bg-white p-6 shadow-sm hover:shadow-md transition">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#d58b88] mb-1">{block.tag}</p>
                <h3 className="text-base font-semibold text-gray-800 font-poppins">{block.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-600 font-poppins">
                  {block.points.map(p => (
                    <li key={p} className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 text-[#d58b88] shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <aside className="rounded-3xl border border-[#d58b88]/20 bg-white p-6 shadow-sm space-y-4 text-sm text-gray-600 font-poppins">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-5 w-5 text-[#d58b88]" />
              <h3 className="text-base font-semibold text-gray-800 font-poppins">Datos, ética y seguridad</h3>
            </div>
            <p>La investigación con ROMI respeta principios éticos, protección de datos y confidencialidad de la información de pacientes y profesionales.</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Uso responsable de datos anonimizados o agregados.</li>
              <li>Respeto a la normativa y comités correspondientes.</li>
              <li>Enfoque en beneficio y bienestar de las personas.</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* PUBLICACIONES */}
      <section id="publicaciones" className="relative left-1/2 -translate-x-1/2 w-screen scroll-mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-20 space-y-10">
          <header className="max-w-3xl mb-4">
            <h2 className="text-4xl font-fredoka-one text-[#d58b88]">Publicaciones y producción</h2>
            <p className="mt-4 text-base text-gray-600 font-poppins max-w-xl">Proyectos y documentos en curso que fortalecen el marco conceptual y clínico de ROMI.</p>
          </header>
          <div className="space-y-4">
            {publications.map(pub => (
              <article key={pub.title} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-3xl border border-[#d58b88]/20 bg-white p-5 shadow-sm hover:shadow-md transition">
                <div>
                  <p className="text-xs font-semibold text-[#d58b88]">{pub.year}</p>
                  <p className="text-sm sm:text-base font-medium text-gray-800 font-poppins">{pub.title}</p>
                  <p className="text-xs sm:text-sm text-gray-600 font-poppins">{pub.type}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="colaboracion" className="relative left-1/2 -translate-x-1/2 w-screen bg-white border-t border-[#edcccc]">
        <div className="mx-auto max-w-7xl px-8 py-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#d58b88]">Colaboración</p>
            <h2 className="text-3xl font-fredoka-one text-[#d58b88]">¿Te interesa investigar con ROMI?</h2>
            <p className="text-sm md:text-base text-gray-600 font-poppins">Exploramos proyectos conjuntos, diseños de estudio y evaluaciones sobre impacto clínico y organizacional del asistente digital en salud mental.</p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[260px]">
            <a href="/Contact" className="inline-flex items-center justify-center rounded-full bg-[#d58b88] px-6 py-3 text-sm font-semibold text-white shadow hover:shadow-lg hover:scale-[1.04] transition">
              Contactar equipo ROMI
            </a>
            <p className="text-xs text-gray-600 font-poppins">Comparte contexto, población y objetivos de investigación.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

// MiniMetric reutilizado
function MiniMetric({ icon: Icon, value, label }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; value: string; label: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-white opacity-90" aria-hidden="true" />
        <span className="text-sm font-semibold text-white font-poppins">{value}</span>
      </div>
      <span className="text-[11px] tracking-wide uppercase text-white/70 font-poppins">{label}</span>
    </div>
  );
}

function SideLink({ icon: Icon, label, active = false }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string; active?: boolean }) {
  const href = `#${label.toLowerCase().split(' ')[0]}`;
  const base = "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition border focus:outline-none focus:ring-2 focus:ring-[#d58b88]";
  if (active) {
    return (
      <a href={href} aria-current="page" className={`${base} bg-[#d58b88] text-white border-[#d58b88] shadow-sm hover:shadow-md`}>
        <Icon className="h-4 w-4" aria-hidden="true" /> {label}
      </a>
    );
  }
  return (
    <a href={href} className={`${base} bg-white/80 text-[#2d2d2d] border-[#d58b88]/20 hover:bg-[#edcccc]/60 hover:border-[#d58b88]/40`}>
      <Icon className="h-4 w-4 text-[#d58b88]" aria-hidden="true" /> {label}
    </a>
  );
}
