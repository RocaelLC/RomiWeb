import {
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  MessageCircle,
  Headphones,
} from "lucide-react";

export const metadata = {
  title: "ROMI — Contacto",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="border-b border-border bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-16">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
              Contáctanos
            </h1>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Estamos aquí para ayudarte. Envíanos tus preguntas, comentarios o
              solicitudes y nuestro equipo se pondrá en contacto contigo a la brevedad.
            </p>
          </header>
        </div>
      </section>

      {/* FORM + CONTACT INFO */}
      <section className="mx-auto max-w-6xl px-4 py-12 lg:py-14 grid gap-8 md:grid-cols-[1.3fr,1fr]">
        {/* FORMULARIO */}
        <article className="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-7">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
            Envíanos un Mensaje
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                placeholder="Escribe tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Asunto
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                placeholder="¿Sobre qué te gustaría hablar?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Mensaje
              </label>
              <textarea
                rows={5}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/60"
                placeholder="Cuéntanos con más detalle en qué podemos ayudarte."
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-95 transition"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </article>

        {/* INFO DE CONTACTO + HORARIO */}
        <div className="space-y-6">
          {/* Información de contacto */}
          <article className="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-7">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
              Información de Contacto
            </h2>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <p className="font-medium text-foreground">Correo</p>
                  <p>contacto@romi.ai (ejemplo)</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <p className="font-medium text-foreground">Teléfono</p>
                  <p>+52 (555) 123-4567</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <p className="font-medium text-foreground">Dirección</p>
                  <p>Av. Ejemplo 123, Ciudad de México, México</p>
                </div>
              </li>
            </ul>
          </article>

          {/* Horario de atención */}
          <article className="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-7 text-sm text-muted-foreground">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
              Horario de Atención
            </h2>
            <p>
              <span className="font-semibold text-foreground">
                Lunes a Viernes:
              </span>{" "}
              9:00 AM – 6:00 PM (GMT-6)
            </p>
            <p>
              <span className="font-semibold text-foreground">Sábados:</span>{" "}
              10:00 AM – 2:00 PM (GMT-6)
            </p>
            <p>
              <span className="font-semibold text-foreground">
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
      </section>

      {/* SOPORTE ADICIONAL */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-14">
          <header className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Opciones de Soporte Adicional
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Encuentra la ayuda que necesitas a través de nuestros canales de
              soporte.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Preguntas frecuentes */}
            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">
                Preguntas Frecuentes
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Encuentra respuestas rápidas a tus dudas.
              </p>
              <button className="mt-4 inline-flex items-center justify-center rounded-full border border-primary px-4 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 transition">
                Acceder Ahora
              </button>
            </article>

            {/* Chat ROMI */}
            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">
                Chat ROMI
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Habla con nuestro asistente virtual.
              </p>
              <button className="mt-4 inline-flex items-center justify-center rounded-full border border-primary px-4 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 transition">
                Acceder Ahora
              </button>
            </article>

            {/* Soporte técnico */}
            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">
                Soporte Técnico
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Asistencia especializada para profesionales.
              </p>
              <button className="mt-4 inline-flex items-center justify-center rounded-full border border-primary px-4 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 transition">
                Acceder Ahora
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* MAPA / FOOTER VISUAL */}
      <section className="mx-auto max-w-6xl px-4 py-10 lg:py-12">
        <div className="rounded-3xl border border-border bg-card shadow-sm h-64 flex items-center justify-center text-sm text-muted-foreground">
          {/* Aquí podrías integrar un mapa real más adelante */}
          Mapa de ubicaciones o usuarios ROMI se mostrará aquí.
        </div>
      </section>
    </main>
  );
}
