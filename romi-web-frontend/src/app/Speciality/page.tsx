import {
  Brain,
  HeartPulse,
  Baby,
  Users,
  MessageCircle,
  Stethoscope,
  CalendarClock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "ROMI — Especialidades",
};

const specialties = [
  {
    icon: Brain,
    name: "Psicología clínica",
    description:
      "Atención a adultos con enfoque en salud mental, trastornos del estado de ánimo, ansiedad y procesos emocionales complejos.",
    focus: "Evaluación, intervención y seguimiento terapéutico.",
  },
  {
    icon: HeartPulse,
    name: "Psiquiatría",
    description:
      "Apoyo en la organización de consultas, seguimiento a tratamiento farmacológico y coordinación con otros profesionales.",
    focus: "Acompañamiento en adherencia y comunicación clara.",
  },
  {
    icon: Baby,
    name: "Psicología infantil y adolescentes",
    description:
      "Acompañamiento a niños, niñas y adolescentes, integrando también a familias y cuidadores en el proceso.",
    focus: "Enfoque evolutivo, educativo y de contención.",
  },
  {
    icon: Users,
    name: "Terapia de pareja y familiar",
    description:
      "Organización de citas y seguimiento en procesos terapéuticos donde participan varias personas.",
    focus: "Comunicación, acuerdos y continuidad del proceso.",
  },
  {
    icon: MessageCircle,
    name: "Psicoterapia en línea",
    description:
      "Especialistas que integran ROMI como apoyo entre sesiones para mantener el acompañamiento en canales digitales.",
    focus: "Consultas remotas con apoyo tecnológico.",
  },
  {
    icon: Stethoscope,
    name: "Otras especialidades médicas",
    description:
      "Profesionales de otras áreas de la salud que desean sumar un enfoque de salud mental y seguimiento cercano.",
    focus: "Visión integral de la salud de la persona.",
  },
];

const flows = [
  {
    step: "01",
    title: "Elige la especialidad",
    text: "La persona identifica el tipo de apoyo que necesita o se orienta a partir de la información de la plataforma.",
  },
  {
    step: "02",
    title: "Conecta con un profesional",
    text: "ROMI facilita el enlace con especialistas que trabajan con esa área específica.",
  },
  {
    step: "03",
    title: "Agenda y seguimiento",
    text: "Se gestionan citas, recordatorios y seguimiento entre sesiones con apoyo de ROMI.",
  },
];

export default function SpecialityPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="border-b border-border bg-gradient-to-b from-primary/30 via-primary/10 to-background">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-16">
          <header className="text-center max-w-3xl mx-auto">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-medium text-primary mb-4">
              <Stethoscope className="h-4 w-4" />
              <span>Red de especialistas</span>
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
              Especialidades que trabajan con ROMI
            </h1>

            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              ROMI acompaña a profesionales de distintas especialidades de salud
              mental y médica, respetando siempre su forma de trabajar y el vínculo
              con cada paciente.
            </p>
          </header>

          {/* Bloque principal: descripción + diferencial */}
          <div className="mt-10 grid gap-8 md:grid-cols-2 items-stretch">
            <article className="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-7 flex flex-col">
              <p className="text-xs font-semibold text-primary mb-1">
                Enfoque integrador
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Pensado para la práctica real
              </h2>

              <p className="mt-3 text-sm text-muted-foreground">
                ROMI no reemplaza al profesional, lo acompaña. Cada especialidad
                mantiene su enfoque clínico y ROMI se integra como apoyo para la
                organización, seguimiento y comunicación con las personas que
                atienden.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Adaptable a distintos marcos teóricos y estilos de trabajo.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Útil tanto en consulta presencial como en línea.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Acompañamiento entre sesiones sin saturar al profesional.</span>
                </li>
              </ul>
            </article>

            <aside className="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-primary mb-2">
                  Para personas que buscan ayuda
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                  Encuentra el tipo de apoyo que necesitas
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  La sección de especialidades puede ayudar a orientar a las
                  personas sobre qué tipo de profesional podría ser más adecuado
                  según lo que están viviendo.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-primary" />
                    <span>Información clara sobre cada especialidad.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Enfoque en accesibilidad y acompañamiento.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <a
                  href="/Services"
                  className="w-full inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-95 transition"
                >
                  Ver servicios que usan ROMI
                </a>
                <p className="mt-2 text-[11px] text-muted-foreground text-center">
                  Puedes combinar la información de especialidades con los módulos
                  de servicios para decidir cómo empezar.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* GRID DE ESPECIALIDADES */}
      <section className="mx-auto max-w-6xl px-4 py-14 lg:py-16 space-y-8">
        <header className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Especialidades que pueden trabajar con{" "}
            <span className="text-primary">ROMI</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            La plataforma está pensada para adaptarse a distintas áreas, siempre
            con sensibilidad hacia la salud mental y el contexto de cada persona.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {specialties.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.name}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    {s.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">{s.description}</p>
                <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Enfoque: </span>
                  {s.focus}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* CÓMO SE INTEGRA EN EL FLUJO */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-14 grid gap-10 md:grid-cols-[1.2fr,1fr] items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              ¿Cómo se integra ROMI en las distintas especialidades?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Independientemente del modelo terapéutico o especialidad, ROMI se
              incorpora como un apoyo en la organización, la comunicación y el
              seguimiento, sin interferir con las decisiones clínicas.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {flows.map((f) => (
                <div
                  key={f.step}
                  className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                >
                  <span className="text-xs font-mono text-primary mb-1 inline-block">
                    {f.step}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm text-sm text-muted-foreground space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                Comunicación clara con las personas
              </h3>
            </div>
            <p>
              ROMI puede ayudar a explicar, en un lenguaje cercano, qué hace
              cada especialidad y qué pueden esperar las personas al iniciar un
              proceso de atención.
            </p>
            <p>
              Esto disminuye dudas, mejora la adherencia y permite que la primera
              consulta se viva con más claridad y menos incertidumbre.
            </p>
          </aside>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-border bg-primary/5">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
              Profesionales y equipos
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
              ¿Te gustaría sumar tu especialidad a ROMI?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Si trabajas en una especialidad de salud y quieres explorar cómo
              ROMI puede acompañar tus procesos, podemos conversar y diseñar
              juntos la mejor forma de integrarlo.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[260px]">
            <a
              href="/Contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-95 transition"
            >
              Contactar al equipo de ROMI
            </a>
            <p className="text-xs text-muted-foreground">
              Cuéntanos tu especialidad, tu contexto y cómo imaginas el apoyo de
              ROMI en tu práctica.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
