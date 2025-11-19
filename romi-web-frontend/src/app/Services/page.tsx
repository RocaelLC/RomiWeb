
import Link from 'next/link';
import { Brain, Check, HospitalIcon,  UserCheck, VideoIcon } from "lucide-react";

export const metadata = { title: "ROMI — Servicios" };

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto px-4">
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-romi">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center text-secondary-foreground">
          <h1 className="text-5xl font-extrabold grid place-items-center">
            Servicios Médicos <span className="text-foreground/80">Integrales</span>
          </h1>
          <p className="mt-4 text-lg/7  mt-8 ">
            Soluciones tecnologías avanzadas para transformar la atención médica y mejorar los resultados de salud
          </p>
        </div>
      </section>
      <div>
        <h1 className="text-3xl font-bold text-center mt-12 text-primary">Servicios Principales</h1>
        <p className="mt-4 text-lg/7 opacity-90 text-center">Descubre nuestras soluciones innovadoras diseñadas para revolucionar la atención médica.</p>
      </div>

      {/* Bloque de código para dividir en dos columnas */}

      <section className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6">
          <p className="text-base text-zinc-600 mt-2">IA Avanzada</p>
          <div className="flex items-center">
            <Brain className="h-10 w-10 m-3" />

            <h1 className="text-2xl text-primary font-semibold ">Asistente Medico ROMI</h1>
          </div>
          <p className="text-base text-zinc-600 mt-2">
            Inteligencia artificial avanzada para consultas médicas diagnósticos y recomendaciones de tratamiento.</p>
          <ul className="mt-4 space-y-2" >

            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" /> Consultas médicas 24/7</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" /> Análisis de síntomas</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" /> Recomendaciones de tratamiento</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" /> Base de datos médica actualizada</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" /> Integración con WhatsApp</p>
          </ul>

          <Link
            href="/chat"
            className="mt-4 inline-flex items-center justify-center
                       rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium
                       text-foreground shadow-sm "
          >
            Explorar Servicio
          </Link>
        </div>

        <div className="rounded-2xl border p-6 flex items-center justify-center">
          <img
            src="images/taylorMedico.jpg"
            alt="Doctor escribiendo"
            className="rounded-xl shadow-lg object-cover w-full h-80 md:h-[400px]"
          />
        </div>
      </section>
      <section className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6 flex items-center justify-center">
          <img
            src="images/services.jpg"
            alt="Doctor escribiendo"
            className="rounded-xl shadow-lg object-cover w-full h-80 md:h-[400px]"
          />
        </div>

        <div className="rounded-2xl border p-6">
          <p className="text-base text-zinc-600 mt-2">Certificado</p>
          <div className="flex items-center">

            <VideoIcon className="h-10 w-10 m-3" />
            <h1 className="text-2xl  font-semibold text-primary">Telesalud</h1>
          </div>
          <p className="text-base text-zinc-600 mt-2">
            Plataforma completa de telemedicina para consultas remotas con especialistas certificados
          </p>
          <ul className="mt-4 space-y-2">
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Videoconsultas HD</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Especialistas certificados</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Historial médico digital</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Recetas electrónicas</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Seguimiento post-consulta</p>
          </ul>

          <Link
            href="/doctores"
            className="mt-4 inline-flex items-center justify-center
                       rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium
                       text-foreground shadow-sm "
          >
            Explorar Servicio
          </Link>
          

        </div>
      </section>

      <section className="mt-10 grid md:grid-cols-2 gap-6">

        <div className="rounded-2xl border p-6">
          <p className="text-base text-zinc-600 mt-2">Tiempo real</p>

          <div className="flex items-center">
            < HospitalIcon className="h-10 w-10  m-3" />
            <h1 className="text-2xl text-primary font-semibold">Seguimiento Clínico</h1>
          </div>
          <p className="text-base text-zinc-600 mt-2">
            Monitoreo continuo de pacientes con herramientas avanzadas de seguimiento y análisis.
          </p>
          <ul className="mt-4 space-y-2">
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Monitoreo en tiempo real</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Alertas automáticas</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Reportes detallados</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Integración con dispositivos</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Dashboard personalizado</p>
          </ul>

          <Link
            href="/Seguimiento"
            className="mt-4 inline-flex items-center justify-center
                       rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium
                       text-foreground shadow-sm "
          >
            Explorar Servicio
          </Link>
        </div>

        <div className="rounded-2xl border p-6 flex items-center justify-center">
          <img
            src="images/dayanMedico.jpg"
            alt="Doctor escribiendo"
            className="rounded-xl shadow-lg object-cover w-full h-80 md:h-[400px]"
          />
        </div>
      </section>

      <section className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6 flex items-center justify-center">
          <img
            src="images/services.jpg"
            alt="Doctor escribiendo"
            className="rounded-xl shadow-lg object-cover w-full h-80 md:h-[400px]"
          />
        </div>

        <div className="rounded-2xl border p-6 ">
          <p className="text-base text-zinc-600 mt-2">Personalizado</p>
          <div className="flex items-center">
            <UserCheck className="h-10 w-10 m-3" />

            <h1 className="text-2xl text-primary font-semibold">Programas Personalizados</h1>
          </div>
          <p className="text-base text-zinc-600 mt-2">
            Planes de salud adaptados a las necesidades específicas de cada paciente o institución.
          </p>
          <ul className="mt-4 space-y-2">
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Evaluación personalizada</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Planes de tratamiento</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Seguimiento especializado</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Educación del paciente</p>
            <p className="list-disc list-inside"><Check className="h-6 w-6 text-primary inline-block mr-2" />Soporte continuo</p>
          </ul>

          <Link
            href="/Seguimiento"
            className="mt-4 inline-flex items-center justify-center
                       rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium
                       text-foreground shadow-sm "
          >
            Explorar Servicio
          </Link>
        </div>
      </section>
      
    </main>
    
  );
  
}
