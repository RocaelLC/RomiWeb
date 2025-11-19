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
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-romi">
        <div className="  mx-auto max-w-6xl px-4 py-24 text-center text-secondary-foreground">
          {/* Título */}
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold grid place-items-center">
              Formación Médica Continua
            </h1>
            <p className="mt-1 text-sm sm:text-base text-secondary-foreground">
              Mantente actualizado con los últimos avances médicos. Cursos,
              talleres, recursos y herramientas para el desarrollo profesional
              continuo.
            </p>
          </header>

          {/* Botones principales (Certificaciones / Clases en vivo / Recursos) */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm px-4 py-2 text-xs sm:text-sm font-medium text-foreground border border-[#d58b88]/20">
              <GraduationCap className="h-4 w-4 text-[#d58b88]" />
              Certificaciones
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm px-4 py-2 text-xs sm:text-sm font-medium text-foreground border border-[#d58b88]/20">
              <Video className="h-4 w-4 text-[#d58b88]" />
              Clases en Vivo
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm px-4 py-2 text-xs sm:text-sm font-medium text-foreground border border-[#d58b88]/20">
              <Download className="h-4 w-4 text-[#d58b88]" />
              Recursos Gratuitos
            </button>
          </div>

          {/* Tabs (Cursos / Talleres / Recursos / Calculadoras) */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <TabPill icon={BookOpen} label="Cursos" active />
            <TabPill icon={Users} label="Talleres" active />
            <TabPill icon={Download} label="Recursos" active/>
            <TabPill icon={Calculator} label="Calculadoras" active/>
          </div>
        </div>
      </section>

      {/* CURSOS ESPECIALIZADOS */}
      <section className="mx-auto max-w-6xl px-4 py-14 lg:py-16 space-y-8">
        <header className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Cursos <span className="text-[#d58b88]">Especializados</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Programas de formación diseñados por expertos para el desarrollo
            profesional médico.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.title}
              className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden flex flex-col"
            >
              {/* Header tipo overlay simulando gradiente del prototipo */}
              <div className="relative h-32 bg-[#e3c094]" />
              <div className="p-5 sm:p-6 flex-1 flex flex-col gap-3 -mt-10 relative">
                <div className="flex justify-between items-center text-xs">
                  <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 font-medium text-[#d58b88] border border-white shadow-sm">
                    {course.levelTag}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 font-medium text-xs text-foreground">
                    {course.levelChip}
                  </span>
                </div>

                <div>
                  <h3 className="mt-2 text-base sm:text-lg font-semibold text-foreground">
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

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[#e3c094]">
                    <Star className="h-4 w-4 fill-[#e3c094] text-[#e3c094]" />
                    <span className="text-foreground">{course.rating}</span>
                  </div>
                  <span className="text-lg font-semibold text-[#d58b88]">
                    {course.price}
                  </span>
                </div>

                <button className="mt-4 inline-flex items-center justify-center rounded-full bg-[#c7d68f] hover:bg-[#b95859] transition px-4 py-2 text-xs sm:text-sm font-medium text-white shadow ">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Inscribirse Ahora
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA INTERMEDIA */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-romi">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-14 text-center text-white space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            ¿Listo para avanzar en tu carrera?
          </h2>
          <p className="text-sm sm:text-base max-w-2xl mx-auto">
            Únete a profesionales que están transformando su práctica con
            formación médica continua y herramientas digitales.
          </p>
          <button className="inline-flex items-center justify-center rounded-full bg-white/95 px-6 py-2.5 text-sm font-medium text-[#d58b88] shadow hover:bg-white transition">
            <GraduationCap className="h-4 w-4 mr-2" />
            Explorar todos los cursos
          </button>
        </div>
      </section>

      {/* TALLERES Y SIMPOSIOS */}
      <section className="mx-auto max-w-6xl px-4 py-14 lg:py-16 space-y-8">
        <header className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Talleres y <span className="text-[#d58b88]">Simposios</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Eventos presenciales y virtuales para el intercambio de
            conocimientos.
          </p>
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

              <button className="mt-5 inline-flex items-center justify-center rounded-full bg-[#c7d68f] hover:bg-[#b95859] transition px-6 py-2 text-xs sm:text-sm font-medium text-white shadow ">
                <Users className="h-4 w-4 mr-2" />
                Reservar mi lugar
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* BIBLIOTECA DE RECURSOS */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-16 space-y-8">
          <header className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Biblioteca de <span className="text-[#d58b88]">Recursos</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Accede a guías, videos, podcasts y material educativo actualizado.
            </p>
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

                  <button className="mt-5 inline-flex items-center justify-center rounded-full bg-[#c7d68f] hover:bg-[#b95859] transition px-6 py-2 text-xs sm:text-sm font-medium text-white shadow ">
                    <Download className="h-4 w-4 mr-2" />
                    {res.actionLabel}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALCULADORAS MÉDICAS */}
      <section className="mx-auto max-w-6xl px-4 py-14 lg:py-16">
        <header className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Calculadoras <span className="text-[#d58b88]">Médicas</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Herramientas interactivas para cálculos clínicos y diagnósticos.
          </p>
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

              <button className="mt-5 inline-flex items-center justify-center rounded-full bg-[#c7d68f] hover:bg-[#b95859] transition px-6 py-2 text-xs sm:text-sm font-medium text-white shadow ">
                <Calculator className="h-4 w-4 mr-2" />
                Usar Calculadora
              </button>
            </article>
          ))}
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
  if (active) {
    return (
      <button className="inline-flex items-center gap-2 rounded-full bg-white shadow-md px-5 py-2 text-sm font-medium text-[#d58b88] border border-[#d58b88]/40">
        <Icon className="h-4 w-4" />
        {label}
      </button>
    );
  }

  return (
    <button className="inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2 text-sm font-medium text-muted-foreground border border-border hover:bg-white shadow-sm transition">
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
