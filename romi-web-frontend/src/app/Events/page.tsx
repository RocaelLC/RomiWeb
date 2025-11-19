import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Filter,
  ExternalLink,
  PlayCircle,
} from "lucide-react";

export const metadata = {
  title: "ROMI — Eventos Médicos",
};

const events = [
  {
    tag: "Congreso",
    image: "/images/congreso.jpeg",
    title: "Congreso Internacional de Oncología 2025",
    date: "15–18 Enero 2025",
    time: "09:00 – 18:00",
    location: "Virtual (Plataforma Zoom)",
    description:
      "Únete a los mejores especialistas en oncología en nuestro próximo congreso virtual. Presentaciones, talleres y networking.",
    price: "$250 USD",
  },
  {
    tag: "Simposio",
    image: "/images/congreso2.jpeg",
    title: "Simposio de Avances en Cardiología",
    date: "25 Febrero 2025",
    time: "10:00 – 16:00",
    location: "Ciudad de México (Hotel Hilton)",
    description:
      "Discusión de los últimos avances en diagnóstico y tratamiento cardiovascular. Casos clínicos y mesas redondas.",
    price: "$150 USD",
  },
];

const international = [
  {
    title: "ESMO",
    subtitle: "European Society for Medical Oncology",
    link: "https://www.esmo.org/",
  },
  {
    title: "ASCO",
    subtitle: "American Society of Clinical Oncology",
    link: "https://www.asco.org/",
  },
  {
    title: "SMEO",
    subtitle: "Sociedad Mexicana de Oncología",
    link: "https://www.smeo.org.mx/",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="w-full bg-gradient-to-b from-[#FDE7C6] to-[#FFF4E5] border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-center text-4xl sm:text-5xl font-semibold text-[#D97706]">
            Eventos Médicos
          </h1>

          <p className="mt-4 text-center text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Mantente al día con los últimos congresos, simposios, webinars y talleres.
            Conecta con expertos y amplía tus conocimientos.
          </p>

          <div className="mt-10 flex justify-between items-center gap-4 flex-wrap">
            {/* Filtro */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white shadow-sm hover:bg-muted transition">
              <Filter className="h-4 w-4" />
              <span>Filtrar por Tipo</span>
            </button>

            {/* Botón calendario */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F59E0B] text-white font-medium shadow hover:opacity-90 transition">
              <CalendarDays className="h-4 w-4" />
              Ver Calendario Mensual
            </button>
          </div>
        </div>
      </section>

      {/* EVENTS LIST */}
      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-2">
        {events.map((ev) => (
          <article
            key={ev.title}
            className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden"
          >
            {/* Imagen */}
            <div className="relative w-full h-56">
              <Image
                src={ev.image}
                alt={ev.title}
                fill
                className="object-cover"
              />

              {/* Tag */}
              <span className="absolute top-3 left-3 bg-[#F59E0B] text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                {ev.tag}
              </span>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold text-foreground">
                {ev.title}
              </h3>

              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#D97706]" />
                  {ev.date}
                </p>

                <p className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-[#D97706]" />
                  {ev.time}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#D97706]" />
                  {ev.location}
                </p>
              </div>

              <p className="text-sm text-muted-foreground">{ev.description}</p>

              {/* Price & actions */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-[#D97706]">
                  {ev.price}
                </span>

                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border text-sm rounded-lg hover:bg-muted transition">
                    Plataforma
                  </button>

                  <button className="px-4 py-1.5 bg-[#D97706] text-white text-sm rounded-lg shadow hover:opacity-90 transition">
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* INTERNATIONAL SECTION */}
      <section className="bg-muted/40 border-t border-border py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl sm:text-3xl font-semibold text-foreground">
            Congresos Internacionales Destacados
          </h2>

          <p className="mt-2 text-center text-sm text-muted-foreground max-w-xl mx-auto">
            Enlaces a los principales congresos médicos a nivel mundial.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {international.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center"
              >
                <div className="w-10 h-10 mx-auto rounded-full bg-[#F59E0B]/20 flex items-center justify-center mb-4">
                  <span className="text-[#F59E0B] text-xl">🏅</span>
                </div>

                <h3 className="font-semibold text-lg text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.subtitle}
                </p>

                <a
                  href={item.link}
                  className="inline-flex items-center gap-2 px-4 py-2 border text-sm rounded-lg hover:bg-muted transition"
                  target="_blank"
                >
                  Visitar sitio <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
