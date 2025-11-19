import {
  Beaker,
  BookOpenCheck,
  LineChart,
  ShieldCheck,
  Users,
  FileText,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "ROMI — Investigación",
};

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
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="border-b border-border bg-gradient-to-b from-primary/30 via-primary/10 to-background">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-16">
          <header className="text-center max-w-3xl mx-auto">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-medium text-primary mb-4">
              <Beaker className="h-4 w-4" />
              <span>Investigación y evidencia</span>
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
              Investigación con base clínica y humana
            </h1>

            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              ROMI se construye y evoluciona a partir de la evidencia, la
              experiencia clínica y la colaboración con profesionales de la
              salud mental.
            </p>
          </header>

          {/* Bloque principal */}
          <div className="mt-10 grid gap-8 md:grid-cols-2 items-stretch">
            {/* Tarjeta 1 */}
            <article className="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-7 flex flex-col">
              <p className="text-xs font-semibold text-primary mb-1">
                Líneas de investigación
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Evaluamos el impacto de ROMI
              </h2>

              <p className="mt-3 text-sm text-muted-foreground">
                Analizamos cómo el uso de ROMI influye en la práctica clínica,
                la percepción del paciente y la eficiencia del trabajo
                profesional.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Diseño centrado en salud mental y bienestar.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>
                    Colaboración con psicólogos, psiquiatras y médicos.
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpenCheck className="h-4 w-4 text-primary" />
                  <span>Uso de instrumentos y marcos basados en evidencia.</span>
                </li>
              </ul>
            </article>

            {/* Tarjeta 2 */}
            <aside className="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-primary mb-2">
                  Colaboraciones
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                  ¿Quieres investigar con ROMI?
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  Podemos trabajar en conjunto para diseñar estudios,
                  implementar protocolos y analizar resultados relacionados con
                  el uso de asistentes digitales en salud mental.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Apoyo en el diseño de protocolos de investigación.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Trabajo conjunto con equipos clínicos y académicos.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <a
                  href="/Contact"
                  className="w-full inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95 transition"
                >
                  Proponer una colaboración
                </a>
                <p className="mt-2 text-[11px] text-muted-foreground text-center">
                  Ideal para universidades, clínicas, hospitales o grupos de
                  investigación.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* LÍNEAS DE INVESTIGACIÓN */}
      <section className="mx-auto max-w-6xl px-4 py-14 lg:py-16 space-y-8">
        <header className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Líneas de <span className="text-primary">investigación</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Exploramos cómo la tecnología puede apoyar, sin sustituir, la
            relación terapéutica y el trabajo clínico cotidiano.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {researchLines.map((line) => (
            <article
              key={line.title}
              className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm"
            >
              <h3 className="text-base sm:text-lg font-semibold text-foreground">
                {line.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {line.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* EVIDENCIA Y MÉTODOS */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-14 grid gap-10 md:grid-cols-[1.2fr,1fr] items-start">
          <div className="space-y-6">
            {evidenceBlocks.map((block) => (
              <article
                key={block.title}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                  {block.tag}
                </p>
                <h3 className="text-sm sm:text-base font-semibold text-foreground">
                  {block.title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {block.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm text-sm text-muted-foreground space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                Datos, ética y seguridad
              </h3>
            </div>
            <p>
              La investigación con ROMI respeta principios éticos, protección de
              datos y confidencialidad de la información de pacientes y
              profesionales.
            </p>
            <ul className="space-y-2">
              <li>Uso responsable de datos anonimizados o agregados.</li>
              <li>Respeto a la normativa aplicable y al criterio de los comités.</li>
              <li>Enfoque en el beneficio y bienestar de las personas usuarias.</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* PUBLICACIONES */}
      <section className="mx-auto max-w-6xl px-4 py-14 lg:py-16">
        <header className="max-w-2xl mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Publicaciones y <span className="text-primary">producción</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Estos son algunos de los proyectos y documentos que estamos
            desarrollando alrededor de ROMI.
          </p>
        </header>

        <div className="space-y-3">
          {publications.map((pub) => (
            <div
              key={pub.title}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm"
            >
              <div>
                <p className="text-xs font-semibold text-primary">{pub.year}</p>
                <p className="text-sm sm:text-base font-medium text-foreground">
                  {pub.title}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {pub.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-border bg-primary/5">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
              Colaboración
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
              ¿Te interesa investigar sobre asistentes digitales en salud mental?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Podemos explorar proyectos conjuntos, diseños de estudio y
              evaluaciones del impacto de ROMI en contextos clínicos reales.
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
              Cuéntanos tu contexto, población y objetivos de investigación.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
