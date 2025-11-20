import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  MessageCircle,
  Headphones,
  Compass,
  Send,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "ROMI — Contacto",
};

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

export default function ContactPage() {
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
                <MessageCircle className="h-4 w-4" />
                Estamos aquí para ayudarte
              </p>

              <h1 className="text-5xl md:text-6xl font-fredoka-one drop-shadow-sm mb-6">
                Contáctanos
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 font-poppins">
                Envíanos tus preguntas, comentarios o solicitudes. Nuestro equipo se pondrá en contacto contigo a la brevedad.
              </p>

              {/* Estadísticas */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold font-fredoka-one">24h</div>
                  <div className="text-sm text-white/80 font-poppins">Respuesta</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-fredoka-one">24/7</div>
                  <div className="text-sm text-white/80 font-poppins">Chat ROMI</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-fredoka-one">100%</div>
                  <div className="text-sm text-white/80 font-poppins">Atención</div>
                </div>
              </div>
            </div>

            {/* Panel lateral navegación */}
            <aside className="md:col-span-2">
              <nav className="rounded-3xl bg-white/80 backdrop-blur border border-white/50 p-6 flex flex-col gap-4 shadow-lg">
                <h2 className="text-[#d58b88] font-fredoka-one text-xl flex items-center gap-2">
                  <Compass className="h-5 w-5" /> Navegación
                </h2>
                <SideLink href="#formulario" title="Enviar Mensaje" active />
                <SideLink href="#info" title="Información de Contacto" />
                <SideLink href="#soporte" title="Opciones de Soporte" />
              </nav>
            </aside>
          </div>
        </div>
      </section>

      {/* FORM + CONTACT INFO */}
      <section id="formulario" className="relative left-1/2 -translate-x-1/2 w-screen scroll-mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-20 grid gap-8 md:grid-cols-[1.3fr,1fr]">
        {/* FORMULARIO */}
        <article className="rounded-3xl border border-[#d58b88]/20 bg-gradient-to-br from-white to-[#f8f6f6] shadow-sm p-6 sm:p-7">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#2d2d2d] font-fredoka-one mb-4">
            Envíanos un Mensaje
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-[#d58b88]/30 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d58b88]/60 font-poppins"
                placeholder="Escribe tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-[#d58b88]/30 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d58b88]/60 font-poppins"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1">
                Asunto
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-[#d58b88]/30 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d58b88]/60 font-poppins"
                placeholder="¿Sobre qué te gustaría hablar?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] font-poppins mb-1">
                Mensaje
              </label>
              <textarea
                rows={5}
                className="w-full rounded-xl border border-[#d58b88]/30 bg-white px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#d58b88]/60 font-poppins"
                placeholder="Cuéntanos con más detalle en qué podemos ayudarte."
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#d58b88] px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90 transition font-fredoka-one"
              >
                <Send className="h-4 w-4" />
                Enviar Mensaje
              </button>
            </div>
          </form>
        </article>

        {/* INFO DE CONTACTO + HORARIO */}
        <div className="space-y-6">
          {/* Información de contacto */}
          <article className="rounded-3xl border border-[#d58b88]/20 bg-white shadow-sm p-6 sm:p-7">
            <h2 className="text-lg sm:text-xl font-semibold text-[#2d2d2d] font-fredoka-one mb-4">
              Información de Contacto
            </h2>

            <ul className="space-y-3 text-sm text-gray-600 font-poppins">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#d58b88]/10">
                  <Mail className="h-4 w-4 text-[#d58b88]" />
                </span>
                <div>
                  <p className="font-medium text-[#2d2d2d]">Correo</p>
                  <p>contacto@romi.ai (ejemplo)</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#d58b88]/10">
                  <Phone className="h-4 w-4 text-[#d58b88]" />
                </span>
                <div>
                  <p className="font-medium text-[#2d2d2d]">Teléfono</p>
                  <p>+52 (555) 123-4567</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#d58b88]/10">
                  <MapPin className="h-4 w-4 text-[#d58b88]" />
                </span>
                <div>
                  <p className="font-medium text-[#2d2d2d]">Dirección</p>
                  <p>Av. Ejemplo 123, Ciudad de México, México</p>
                </div>
              </li>
            </ul>
          </article>

          {/* Horario de atención */}
          <article className="rounded-3xl border border-[#d58b88]/20 bg-gradient-to-br from-[#EBD9D8]/20 to-white shadow-sm p-6 sm:p-7 text-sm text-gray-600 font-poppins">
            <h2 className="text-lg sm:text-xl font-semibold text-[#2d2d2d] font-fredoka-one mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#d58b88]" />
              Horario de Atención
            </h2>
            <p>
              <span className="font-semibold text-[#2d2d2d]">
                Lunes a Viernes:
              </span>{" "}
              9:00 AM – 6:00 PM (GMT-6)
            </p>
            <p>
              <span className="font-semibold text-[#2d2d2d]">Sábados:</span>{" "}
              10:00 AM – 2:00 PM (GMT-6)
            </p>
            <p>
              <span className="font-semibold text-[#2d2d2d]">
                Domingos y Feriados:
              </span>{" "}
              Cerrado
            </p>
            <p className="mt-3 text-xs">
              Nuestro asistente virtual ROMI puede estar disponible 24/7 según
              la implementación.
            </p>
          </article>
        </div>
        </div>
      </section>

      {/* SOPORTE ADICIONAL */}
      <section id="soporte" className="relative left-1/2 -translate-x-1/2 w-screen scroll-mt-24 border-y border-[#d58b88]/20 bg-[#f8f6f6]">
        <div className="mx-auto max-w-7xl px-8 py-20">
          <header className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl sm:text-4xl font-fredoka-one text-[#d58b88] mb-4">
              Opciones de Soporte Adicional
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 font-poppins">
              Encuentra la ayuda que necesitas a través de nuestros canales de
              soporte.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Preguntas frecuentes */}
            <article className="rounded-2xl border border-[#d58b88]/20 bg-white p-6 shadow-sm text-center hover:shadow-md transition">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#d58b88]/10">
                <HelpCircle className="h-6 w-6 text-[#d58b88]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#2d2d2d] font-fredoka-one">
                Preguntas Frecuentes
              </h3>
              <p className="mt-2 text-sm text-gray-600 font-poppins">
                Encuentra respuestas rápidas a tus dudas.
              </p>
              <button className="mt-4 inline-flex items-center justify-center rounded-full border border-[#d58b88]/30 px-4 py-1.5 text-xs font-medium text-[#d58b88] hover:bg-[#d58b88]/5 transition font-poppins">
                Acceder Ahora
              </button>
            </article>

            {/* Chat ROMI */}
            <article className="rounded-2xl border border-[#d58b88]/20 bg-white p-6 shadow-sm text-center hover:shadow-md transition">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#d58b88]/10">
                <MessageCircle className="h-6 w-6 text-[#d58b88]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#2d2d2d] font-fredoka-one">
                Chat ROMI
              </h3>
              <p className="mt-2 text-sm text-gray-600 font-poppins">
                Habla con nuestro asistente virtual.
              </p>
              <button className="mt-4 inline-flex items-center justify-center rounded-full border border-[#d58b88]/30 px-4 py-1.5 text-xs font-medium text-[#d58b88] hover:bg-[#d58b88]/5 transition font-poppins">
                Acceder Ahora
              </button>
            </article>

            {/* Soporte técnico */}
            <article className="rounded-2xl border border-[#d58b88]/20 bg-white p-6 shadow-sm text-center hover:shadow-md transition">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#d58b88]/10">
                <Headphones className="h-6 w-6 text-[#d58b88]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#2d2d2d] font-fredoka-one">
                Soporte Técnico
              </h3>
              <p className="mt-2 text-sm text-gray-600 font-poppins">
                Asistencia especializada para profesionales.
              </p>
              <button className="mt-4 inline-flex items-center justify-center rounded-full border border-[#d58b88]/30 px-4 py-1.5 text-xs font-medium text-[#d58b88] hover:bg-[#d58b88]/5 transition font-poppins">
                Acceder Ahora
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* MAPA / FOOTER VISUAL */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen bg-white">
        <div className="mx-auto max-w-7xl px-8 py-16 lg:py-20">
          <div className="rounded-3xl border border-[#d58b88]/20 bg-gradient-to-br from-[#f8f6f6] to-white shadow-sm h-64 flex items-center justify-center text-sm text-gray-600 font-poppins">
            {/* Aquí podrías integrar un mapa real más adelante */}
            Mapa de ubicaciones o usuarios ROMI se mostrará aquí.
          </div>
        </div>
      </section>
    </main>
  );
}
