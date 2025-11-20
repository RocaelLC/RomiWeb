import Link from 'next/link';
import { Smartphone, Brain, Video, Activity, Zap, Shield, MessageSquare, Clock, Heart, ArrowRight, Compass } from "lucide-react";

export const metadata = { title: "ROMI — Servicios" };

function SideLink({ href, title, active = false }: { href: string; title: string; active?: boolean }) {
  return active ? (
    <a href={href} aria-current="page" className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition bg-[#d58b88] text-white border border-[#d58b88] hover:bg-[#c17a76]">
      {title}
    </a>
  ) : (
    <a href={href} className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition bg-white text-[#2d2d2d] border border-[#d58b88]/30 hover:bg-[#edcccc]/50">
      {title}
    </a>
  );
}

function Hero() {
  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen overflow-hidden">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d58b88] via-[#d79c9c] to-[#dabebd]" />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#edcccc]/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#dabebd]/40 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-24">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          {/* Contenido principal */}
          <div className="md:col-span-3 text-white">
            <h1 className="font-fredoka-one text-5xl md:text-6xl leading-tight drop-shadow-sm">
              Servicios <span className="text-[#EBD9D8]">Médicos</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/90 font-poppins max-w-xl">
              Tecnología de inteligencia artificial y especialistas certificados para transformar tu experiencia médica. Atención integral en un solo lugar.
            </p>
            
            {/* Estadísticas */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <p className="text-3xl font-fredoka-one text-white">24/7</p>
                <p className="text-xs text-white/80 font-poppins">Disponibilidad</p>
              </div>
              <div>
                <p className="text-3xl font-fredoka-one text-white">+50K</p>
                <p className="text-xs text-white/80 font-poppins">Usuarios</p>
              </div>
              <div>
                <p className="text-3xl font-fredoka-one text-white">98%</p>
                <p className="text-xs text-white/80 font-poppins">Satisfacción</p>
              </div>
            </div>
          </div>
          
          {/* Navegación lateral */}
          <aside className="md:col-span-2">
            <nav aria-label="Categorías" className="rounded-3xl bg-white/80 backdrop-blur border border-[#d58b88]/20 p-6 flex flex-col gap-4 shadow-lg">
              <h2 className="text-[#d58b88] font-fredoka-one text-xl flex items-center gap-2">
                <Compass className="h-5 w-5" /> Navegación
              </h2>
              <SideLink href="#servicios" title="Nuestros Servicios" active />
              <SideLink href="#caracteristicas" title="Características" />
              <SideLink href="#cta" title="Comenzar" />
            </nav>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ServiciosSection() {
  return (
    <section id="servicios" className="relative left-1/2 -translate-x-1/2 w-screen scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-8 py-24 space-y-14">
        <header className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-fredoka-one text-[#d58b88] mb-5">Nuestros Servicios</h2>
          <p className="text-base text-gray-600 font-poppins">Cada solución está diseñada para ofrecerte la mejor experiencia médica</p>
        </header>
        
        {/* Grid de servicios */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 - ROMI AI */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#d58b88] to-[#d79c9c] p-8 hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <div className="w-14 h-14 bg-white/30 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-fredoka-one text-white">Asistente ROMI</h3>
              </div>
              <p className="text-white/90 font-poppins mb-6">
                IA médica de última generación disponible 24/7 para consultas, análisis y recomendaciones personalizadas.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white font-poppins text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Análisis de síntomas inteligente
                </li>
                <li className="flex items-center gap-2 text-white font-poppins text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Disponible en WhatsApp
                </li>
                <li className="flex items-center gap-2 text-white font-poppins text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Base de datos médica actualizada
                </li>
              </ul>
              <Link href="/chat" className="inline-flex items-center gap-2 px-6 py-2 bg-white text-[#d58b88] rounded-full font-semibold text-sm hover:bg-gray-100 transition">
                Probar Ahora
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Card 2 - App Mobile */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#d58b88] to-[#d79c9c] p-8 hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <div className="w-14 h-14 bg-white/30 rounded-xl flex items-center justify-center mb-4">
                  <Smartphone className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-fredoka-one text-white">App Móvil</h3>
              </div>
              <p className="text-white/90 font-poppins mb-6">
                Tu doctor en el bolsillo. Chat con IA, monitoreo de salud y conexión con especialistas.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white font-poppins text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Chat médico en tiempo real
                </li>
                <li className="flex items-center gap-2 text-white font-poppins text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Monitoreo de síntomas
                </li>
                <li className="flex items-center gap-2 text-white font-poppins text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Historial médico seguro
                </li>
              </ul>
              <Link href="/chat" className="inline-flex items-center gap-2 px-6 py-2 bg-white text-[#d58b88] rounded-full font-semibold text-sm hover:bg-gray-100 transition">
                Descargar
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Card 3 - Telesalud */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#d79c9c] to-[#dabebd] p-8 hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <div className="w-14 h-14 bg-white/30 rounded-xl flex items-center justify-center mb-4">
                  <Video className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-fredoka-one text-white">Telesalud</h3>
              </div>
              <p className="text-white/90 font-poppins mb-6">
                Consultas remotas con especialistas certificados desde cualquier lugar. Videollamadas HD y recetas electrónicas.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white font-poppins text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Médicos certificados
                </li>
                <li className="flex items-center gap-2 text-white font-poppins text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Citas flexibles
                </li>
                <li className="flex items-center gap-2 text-white font-poppins text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Recetas digitales
                </li>
              </ul>
              <Link href="/doctores" className="inline-flex items-center gap-2 px-6 py-2 bg-white text-[#d79c9c] rounded-full font-semibold text-sm hover:bg-gray-100 transition">
                Agendar Cita
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Card 4 - Monitoreo */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#d58b88]/80 to-[#d79c9c]/80 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <div className="w-14 h-14 bg-white/30 rounded-xl flex items-center justify-center mb-4">
                  <Activity className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-fredoka-one text-white">Monitoreo Clínico</h3>
              </div>
              <p className="text-white/90 font-poppins mb-6">
                Seguimiento continuo en tiempo real con alertas inteligentes y análisis avanzados de tu salud.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white font-poppins text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Monitoreo 24/7
                </li>
                <li className="flex items-center gap-2 text-white font-poppins text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Alertas automáticas
                </li>
                <li className="flex items-center gap-2 text-white font-poppins text-sm">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Wearables integrados
                </li>
              </ul>
              <Link href="/chat" className="inline-flex items-center gap-2 px-6 py-2 bg-white text-[#d58b88] rounded-full font-semibold text-sm hover:bg-gray-100 transition">
                Explorar
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaracteristicasSection() {
  return (
    <section id="caracteristicas" className="relative left-1/2 -translate-x-1/2 w-screen bg-[#f8f6f6]">
      <div className="mx-auto max-w-7xl px-8 py-20">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-fredoka-one text-[#2d2d2d] mb-4">¿Por qué elegir ROMI?</h2>
          <p className="text-base text-gray-600 font-poppins">Características que nos hacen diferente</p>
        </header>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#d58b88] to-[#d79c9c] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-fredoka-one text-[#d58b88] mb-2">Seguridad Garantizada</h3>
            <p className="text-gray-600 font-poppins">Encriptación de nivel médico para proteger tu información personal</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#dabebd] to-[#edcccc] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="text-[#d58b88]" size={28} />
            </div>
            <h3 className="text-xl font-fredoka-one text-[#d58b88] mb-2">Respuesta Rápida</h3>
            <p className="text-gray-600 font-poppins">Consultas instantáneas sin tiempos de espera innecesarios</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#d58b88]/60 to-[#d79c9c]/60 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-fredoka-one text-[#d58b88] mb-2">Atención Personalizada</h3>
            <p className="text-gray-600 font-poppins">Planes de salud adaptados a tus necesidades específicas</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="relative left-1/2 -translate-x-1/2 w-screen py-20 bg-gradient-to-r from-[#d58b88] via-[#d79c9c] to-[#dabebd] text-center">
      <div className="max-w-4xl mx-auto px-6 text-white space-y-6">
        <h2 className="text-3xl sm:text-5xl font-fredoka-one">
          Comienza tu Transformación de Salud Hoy
        </h2>
        <p className="text-base sm:text-lg font-poppins max-w-2xl mx-auto opacity-90">
          Acceso a IA médica, especialistas y monitoreo de salud en una plataforma integrada
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/chat" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#d58b88] rounded-full font-fredoka-one text-base hover:bg-gray-100 hover:shadow-lg transition">
            Probar ROMI Gratis
          </Link>
          <Link href="/doctores" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full font-fredoka-one text-base hover:bg-white/10 transition">
            Ver Especialistas
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <ServiciosSection />
      <CaracteristicasSection />
      <CTA />
    </main>
  );
}