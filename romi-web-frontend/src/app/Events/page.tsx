import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Filter,
  ExternalLink,
  PlayCircle,
  Compass,
  Calendar,
  Globe,
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

function SideLink({ href, title, active = false }: { href: string; title: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
        active ? "bg-[#d58b88]/10 text-[#d58b88]" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {title}
    </Link>
  );
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen overflow-hidden">
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#d58b88] via-[#d79c9c] to-[#dabebd]" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#edcccc]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#dabebd]/40 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-24">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            {/* Contenido principal */}
            <div className="md:col-span-3 text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-4 py-1.5 text-xs font-medium mb-6">
                <Calendar className="h-4 w-4" />
                Eventos médicos 2025
              </p>

              <h1 className="text-5xl md:text-6xl font-fredoka-one drop-shadow-sm mb-6">
                Congresos y Eventos Médicos
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 font-poppins">
                Mantente al día con los últimos congresos, simposios, webinars y talleres. Conecta con expertos y amplía tus conocimientos.
              </p>

              {/* Estadísticas */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold font-fredoka-one">20+</div>
                  <div className="text-sm text-white/80 font-poppins">Eventos 2025</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-fredoka-one">Global</div>
                  <div className="text-sm text-white/80 font-poppins">Alcance</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-fredoka-one">Virtual</div>
                  <div className="text-sm text-white/80 font-poppins">Y Presencial</div>
                </div>
              </div>
            </div>

            {/* Panel lateral navegación */}
            <aside className="md:col-span-2">
              <nav className="rounded-3xl bg-white/80 backdrop-blur border border-white/50 p-6 flex flex-col gap-4 shadow-lg">
                <h2 className="text-[#d58b88] font-fredoka-one text-xl flex items-center gap-2">
                  <Compass className="h-5 w-5" /> Navegación
                </h2>
                <SideLink href="#proximos" title="Próximos Eventos" active />
                <SideLink href="#internacionales" title="Congresos Internacionales" />
                <SideLink href="#calendario" title="Ver Calendario" />
              </nav>
            </aside>
          </div>
        </div>
      </section>

      {/* EVENTS LIST */}
      <section id="proximos" className="relative left-1/2 -translate-x-1/2 w-screen scroll-mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-20">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-fredoka-one text-[#d58b88] mb-4">
              Próximos Eventos
            </h2>
            <p className="text-base text-gray-600 font-poppins">
              Inscríbete en los eventos más relevantes del sector salud
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
        {events.map((ev) => (
          <article
            key={ev.title}
            className="rounded-3xl border border-[#d58b88]/20 bg-white shadow-sm overflow-hidden hover:shadow-md transition"
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
              <span className="absolute top-3 left-3 bg-[#d58b88] text-white text-xs font-medium px-3 py-1 rounded-full shadow font-fredoka-one">
                {ev.tag}
              </span>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold text-[#2d2d2d] font-fredoka-one">
                {ev.title}
              </h3>

              <div className="space-y-1 text-sm text-gray-600 font-poppins">
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#d58b88]" />
                  {ev.date}
                </p>

                <p className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-[#d58b88]" />
                  {ev.time}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#d58b88]" />
                  {ev.location}
                </p>
              </div>

              <p className="text-sm text-gray-600 font-poppins">{ev.description}</p>

              {/* Price & actions */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-[#d58b88] font-fredoka-one">
                  {ev.price}
                </span>

                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-[#d58b88]/20 text-sm rounded-lg hover:bg-[#d58b88]/5 transition text-[#2d2d2d] font-poppins">
                    Plataforma
                  </button>

                  <button className="px-4 py-1.5 bg-[#d58b88] text-white text-sm rounded-lg shadow hover:opacity-90 transition font-fredoka-one">
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
        </div>
        </div>
      </section>

      {/* INTERNATIONAL SECTION */}
      <section id="internacionales" className="relative left-1/2 -translate-x-1/2 w-screen scroll-mt-24 bg-[#f8f6f6] border-y border-[#d58b88]/20">
        <div className="mx-auto max-w-7xl px-8 py-20">
          <h2 className="text-center text-3xl sm:text-4xl font-fredoka-one text-[#d58b88] mb-4">
            Congresos Internacionales Destacados
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600 font-poppins max-w-xl mx-auto">
            Enlaces a los principales congresos médicos a nivel mundial.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {international.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#d58b88]/20 bg-white p-6 shadow-sm text-center hover:shadow-md transition"
              >
                <div className="w-10 h-10 mx-auto rounded-full bg-[#d58b88]/20 flex items-center justify-center mb-4">
                  <span className="text-[#d58b88] text-xl">🏅</span>
                </div>

                <h3 className="font-semibold text-lg text-[#2d2d2d] font-fredoka-one">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 font-poppins mb-3">
                  {item.subtitle}
                </p>

                <a
                  href={item.link}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#d58b88]/20 text-sm rounded-lg hover:bg-[#d58b88]/5 transition font-poppins text-[#2d2d2d]"
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
