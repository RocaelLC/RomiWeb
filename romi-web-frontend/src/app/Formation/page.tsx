import {
  BookOpen,
  GraduationCap,
  Video,
  Download,
  Calculator,
  Clock3,
  Users,
  Star,
  CalendarDays,
  PlayCircle,
  FileText,
  Headphones,
  Award,
  TrendingUp,
  Layers,
  Sparkles,
  Compass
} from "lucide-react";

export const metadata = {
  title: "ROMI — Formación",
};

const courses = [
  {
    levelTag: "Especialización",
    levelChip: "Avanzado",
    title: "Cardiología Avanzada",
    teacher: "Dr. María González",
    duration: "8 semanas",
    students: "245 estudiantes",
    rating: "4.9",
    price: "$2,500 MXN",
  },
  {
    levelTag: "Especialización",
    levelChip: "Intermedio",
    title: "Oncología Moderna",
    teacher: "Dr. Carlos Rodríguez",
    duration: "12 semanas",
    students: "189 estudiantes",
    rating: "4.8",
    price: "$3,200 MXN",
  },
  {
    levelTag: "Actualización",
    levelChip: "Básico",
    title: "Diabetes y Endocrinología",
    teacher: "Dra. Ana Martínez",
    duration: "6 semanas",
    students: "312 estudiantes",
    rating: "4.9",
    price: "$1,800 MXN",
  },
];

const workshops = [
  {
    title: "Taller de Diagnóstico por Imagen",
    date: "15 Marzo 2024",
    time: "09:00 - 17:00",
    mode: "Virtual",
    spots: "25 cupos disponibles",
    price: "$800 MXN",
  },
  {
    title: "Cirugía Mínimamente Invasiva",
    date: "22 Marzo 2024",
    time: "08:00 - 16:00",
    mode: "Ciudad de México",
    spots: "15 cupos disponibles",
    price: "$1,200 MXN",
  },
];

const resources = [
  {
    icon: FileText,
    title: "Guía Clínica de Hipertensión 2024",
    info: "1250 descargas",
    size: "2.5 MB",
    actionLabel: "Descargar",
  },
  {
    icon: PlayCircle,
    title: "Técnicas de Sutura Avanzadas",
    info: "3400 visualizaciones · 45 min",
    size: "",
    actionLabel: "Acceder",
  },
  {
    icon: Headphones,
    title: "Medicina Basada en Evidencia",
    info: "12 episodios · 30 min promedio",
    size: "",
    actionLabel: "Acceder",
  },
];

const calculators = [
  {
    title: "Riesgo Cardiovascular",
    description: "Calcula el riesgo cardiovascular a 10 años.",
    fields: ["Edad", "Sexo", "Presión Arterial", "Colesterol", "Diabetes"],
  },
  {
    title: "Índice de Masa Corporal",
    description: "Calcula el IMC y categoría de peso.",
    fields: ["Peso (kg)", "Altura (cm)"],
  },
  {
    title: "Costos Médicos Atribuibles",
    description: "Estima costos médicos por condición.",
    fields: ["Condición", "Edad", "Severidad", "Tratamiento"],
  },
];

export default function FormationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen overflow-hidden">
        {/* Fondo con capas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#d58b88] via-[#d79c9c] to-[#dabebd]" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#edcccc]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#dabebd]/40 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-24">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            {/* Texto principal */}
            <div className="md:col-span-3 text-white">
              <h1 className="font-fredoka-one text-5xl md:text-6xl leading-tight drop-shadow-sm">
                Formación Médica <span className="text-[#EBD9D8]">Integral</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-white/90 font-poppins max-w-xl">
                Aprende, actualiza y certifica tus habilidades clínicas con contenido curado, casos reales y recursos descargables.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#cursos" aria-label="Ir a cursos" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#d58b88] shadow hover:shadow-lg hover:scale-[1.04] transition">
                  <BookOpen className="h-5 w-5" /> Cursos
                </a>
                <a href="#talleres" aria-label="Ir a talleres" className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-7 py-3 text-sm font-semibold text-[#d58b88] border border-white/50 hover:bg-white transition">
                  <Users className="h-5 w-5" /> Talleres
                </a>
                <a href="#recursos" aria-label="Ir a recursos" className="inline-flex items-center gap-2 rounded-full bg-[#c7d68f] px-7 py-3 text-sm font-semibold text-white shadow hover:bg-[#bfcf82] transition">
                  <Download className="h-5 w-5" /> Recursos
                </a>
              </div>
              {/* Métricas inline */}
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                <MiniMetric icon={Award} value="35+" label="Certificaciones" />
                <MiniMetric icon={TrendingUp} value="97%" label="Satisfacción" />
                <MiniMetric icon={Layers} value="1.2K" label="Recursos" />
              </div>
            </div>
            {/* Panel lateral navegación */}
            <aside className="md:col-span-2">
              <nav aria-label="Categorías" className="rounded-3xl bg-white/80 backdrop-blur border border-[#d58b88]/20 p-6 flex flex-col gap-4 shadow-lg">
                <h2 className="text-[#d58b88] font-fredoka-one text-xl flex items-center gap-2"><Compass className="h-5 w-5" /> Navegación</h2>
                <SideLink active icon={BookOpen} label="Cursos" />
                <SideLink icon={Users} label="Talleres" />
                <SideLink icon={Download} label="Recursos" />
                <SideLink icon={Calculator} label="Calculadoras" />
                <SideLink icon={Video} label="Clases en Vivo" />
                <SideLink icon={GraduationCap} label="Certificaciones" />
              </nav>
            </aside>
          </div>
        </div>
      </section>

      {/* CURSOS ESPECIALIZADOS (v2) */}
      <section id="cursos" className="relative left-1/2 -translate-x-1/2 w-screen scroll-mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-24 space-y-14">
        <header className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-fredoka-one text-[#d58b88] mb-5">Cursos Especializados</h2>
          <p className="text-base text-gray-600 font-poppins">Programas con enfoque práctico y evidencia actual para elevar tu perfil clínico.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.title}
              className="group rounded-3xl border border-[#d58b88]/20 bg-white shadow-sm overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >
              <div className="relative h-36 bg-[#edcccc]">
              </div>
              <div className="p-6 flex-1 flex flex-col gap-4 -mt-14 relative">
                <div className="flex justify-between items-center text-xs">
                  <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 font-medium text-[#d58b88] border border-white shadow-sm">
                    {course.levelTag}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 font-medium text-xs text-foreground">
                    {course.levelChip}
                  </span>
                </div>

                <div>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 font-poppins">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#d58b88] font-medium">
                    {course.teacher}
                  </p>
                </div>

                <div className="mt-1 space-y-1 text-xs sm:text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-[#d58b88]" />
                    {course.duration}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#d58b88]" />
                    {course.students}
                  </p>
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[#e3c094]">
                    <Star className="h-4 w-4 fill-[#e3c094] text-[#e3c094]" aria-hidden="true" />
                    <span className="text-gray-700">{course.rating}</span>
                  </div>
                  <span className="text-lg font-semibold text-[#d58b88]">{course.price}</span>
                </div>

                <button aria-label={`Inscribirse al curso ${course.title}`} className="mt-3 inline-flex items-center justify-center rounded-full bg-[#c7d68f] hover:bg-[#b95859] transition px-5 py-2.5 text-xs sm:text-sm font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-[#d58b88]">
                  <BookOpen className="h-4 w-4 mr-2" aria-hidden="true" /> Inscribirse
                </button>
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      {/* STRIP CTA (v2 fondo blanco) */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen py-20 bg-white border-t border-[#edcccc]">
        <div className="max-w-5xl mx-auto px-6 text-center text-[#2d2d2d] space-y-6">
          <h2 className="text-3xl md:text-4xl font-fredoka-one text-[#d58b88]">
            Impulsa tu Carrera Médica Hoy
          </h2>
          <p className="text-sm md:text-base font-poppins max-w-2xl mx-auto text-gray-600">
            Accede a rutas de formación, talleres prácticos y recursos exclusivos que elevan tu perfil profesional.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button aria-label="Ver rutas" className="inline-flex items-center gap-2 rounded-full bg-[#d58b88] px-8 py-3 text-sm font-semibold text-white shadow hover:shadow-lg hover:scale-[1.04] transition focus:outline-none focus:ring-2 focus:ring-[#d58b88]">
              <GraduationCap className="h-5 w-5" /> Rutas Formativas
            </button>
            <button aria-label="Solicitar asesoría" className="inline-flex items-center gap-2 rounded-full bg-[#c7d68f] px-8 py-3 text-sm font-semibold text-white shadow hover:bg-[#bfcf82] transition focus:outline-none focus:ring-2 focus:ring-[#c7d68f]">
              <Sparkles className="h-5 w-5" /> Asesoría
            </button>
          </div>
        </div>
      </section>

      {/* TALLERES Y SIMPOSIOS */}
      <section id="talleres" className="relative left-1/2 -translate-x-1/2 w-screen scroll-mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-20 space-y-10">
        <header className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-fredoka-one text-[#d58b88] mb-4">Talleres y Simposios</h2>
          <p className="text-sm md:text-base text-gray-600 font-poppins">Eventos presenciales y virtuales para intercambio de conocimiento.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {workshops.map((wk) => (
            <article
              key={wk.title}
              className="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-7 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    {wk.title}
                  </h3>
                  <span className="text-lg font-semibold text-[#d58b88]">
                    {wk.price}
                  </span>
                </div>

                <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[#d58b88]" />
                    {wk.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-[#d58b88]" />
                    {wk.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#d58b88]" />
                    {wk.spots}
                  </p>
                  <p className="text-xs text-[#d58b88] font-medium">
                    {wk.mode}
                  </p>
                </div>
              </div>

              <button aria-label={`Reservar taller ${wk.title}`} className="mt-5 inline-flex items-center justify-center rounded-full bg-[#c7d68f] hover:bg-[#b95859] transition px-6 py-2 text-xs sm:text-sm font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-[#d58b88]">
                <Users className="h-4 w-4 mr-2" aria-hidden="true" /> Reservar
              </button>
            </article>
          ))}
        </div>
        </div>
      </section>

      {/* BIBLIOTECA DE RECURSOS */}
      <section id="recursos" className="relative left-1/2 -translate-x-1/2 w-screen scroll-mt-24 border-y border-[#d58b88]/20 bg-[#FDFBFA]">
        <div className="mx-auto max-w-7xl px-8 py-20 space-y-10">
          <header className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-fredoka-one text-[#d58b88] mb-4">Biblioteca de Recursos</h2>
            <p className="text-sm md:text-base text-gray-600 font-poppins">Guías, videos, podcasts y material educativo siempre actualizado.</p>
          </header>

          <div className="grid gap-5">
            {resources.map((res) => {
              const Icon = res.icon;
              return (
                <article
                  key={res.title}
                  className="rounded-2xl border border-border bg-card shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d58b88]/10">
                      <Icon className="h-5 w-5 text-[#d58b88]" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-foreground">
                        {res.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {res.info}
                      </p>
                      {res.size && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {res.size}
                        </p>
                      )}
                    </div>
                  </div>

                  <button aria-label={`${res.actionLabel} recurso ${res.title}`} className="mt-5 inline-flex items-center justify-center rounded-full bg-[#c7d68f] hover:bg-[#b95859] transition px-6 py-2 text-xs sm:text-sm font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-[#d58b88]">
                    <Download className="h-4 w-4 mr-2" aria-hidden="true" /> {res.actionLabel}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALCULADORAS MÉDICAS */}
      <section id="calculadoras" className="relative left-1/2 -translate-x-1/2 w-screen scroll-mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-20">
        <header className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-fredoka-one text-[#d58b88] mb-4">Calculadoras Médicas</h2>
          <p className="text-sm md:text-base text-gray-600 font-poppins">Herramientas interactivas para cálculos clínicos y apoyo diagnóstico.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {calculators.map((calc) => (
            <article
              key={calc.title}
              className="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d58b88] to-[#e3c094] mb-4">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  {calc.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {calc.description}
                </p>
                <p className="mt-3 text-xs font-semibold text-foreground">
                  Campos requeridos:
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {calc.fields.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-[#c7d68f]/15 border border-[#c7d68f]/60 px-2.5 py-1 text-[11px] font-medium text-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <button aria-label={`Usar calculadora ${calc.title}`} className="mt-5 inline-flex items-center justify-center rounded-full bg-[#c7d68f] hover:bg-[#b95859] transition px-6 py-2 text-xs sm:text-sm font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-[#d58b88]">
                <Calculator className="h-4 w-4 mr-2" aria-hidden="true" /> Usar
              </button>
            </article>
          ))}
        </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Componentes pequeños reutilizables ---------- */

function TabPill({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
}) {
  const base = "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium border transition focus:outline-none focus:ring-2 focus:ring-[#d58b88]";
  if (active) {
    return (
      <button role="tab" aria-selected="true" className={`${base} bg-white text-[#d58b88] border-[#d58b88]/40 shadow-md`}>
        <Icon className="h-4 w-4" aria-hidden="true" /> {label}
      </button>
    );
  }
  return (
    <button role="tab" aria-selected="false" className={`${base} bg-white/70 text-gray-600 border-border hover:bg-white shadow-sm`}>
      <Icon className="h-4 w-4" aria-hidden="true" /> {label}
    </button>
  );
}

function Metric({ icon: Icon, label, value }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 py-6 px-4 flex flex-col items-center text-white">
      <Icon className="h-6 w-6 mb-2" aria-hidden="true" />
      <span className="text-xl font-semibold font-fredoka-one">{value}</span>
      <span className="text-xs tracking-wide uppercase opacity-80 font-poppins">{label}</span>
    </div>
  );
}

// Mini metric for inline small stats in hero
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

// Side navigation link component
function SideLink({ icon: Icon, label, active = false }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string; active?: boolean }) {
  const href = `#${label.toLowerCase().split(' ')[0]}`; // cursos, talleres, recursos, calculadoras, etc.
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
