
export const metadata = { title: "ROMI — Presentación" };
import { Target, Handshake, Heart, Lightbulb, Shield, Users, Globe, Zap, User } from "lucide-react";

export default function Page() {
    return (
        <main className="max-w-6xl mx-auto px-4 ">
            <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-romi">
                <div className="mx-auto max-w-6xl px-4 py-24 text-center text-secondary-foreground">
                    <h1 className="text-5xl font-extrabold grid place-items-center">Transformando la Medicina del Futuro</h1>
                    <p className="mt-4 text-lg/7 opacity-90 mt-8 ">Somos una plataforma integral que conecta profesionales de la salud con tecnología avanzada
                        para mejorar la atención médica en todo el mundo.</p>
                </div>
            </section>
            

            <div className="text-left mt-18">
                <h1 className="font-semibold text-[#023E8E] text-4xl mt-10 text-primary text-center">¿Quiénes somos?</h1>
            </div>
            {/*bloque de codigo para dividir en dos columnas con md:grid-cols(N) */}
            <section className="mt-10 grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border p-6">
                    <p className="text-base text-zinc-600 mt-2">
                        HubROMI nació de la visión de democratizar el acceso a la salud a través de la tecnología.
                        Somos un equipo multidisciplinario de médicos, ingenieros y especialistas en salud digital.
                    </p>
                    <p className=" text-zinc-600 mt-4">
                        Nuestra plataforma integra inteligencia artificial, telemedicina, educación médica continua
                        y herramientas de gestión clínica en un ecosistema completo que empodera a los profesionales de la salud.
                    </p>
                    <p className="text-zinc-600 mt-4">
                        Con presencia en más de 15 países y una comunidad de más de 10,000 profesionales de la salud médicos,
                        continuamos innovando para hacer que la medicina sea más accesible, eficiente y efectiva.
                    </p>
                </div>


                <div className="rounded-2xl border p-6 flex items-center justify-center">
                    <img
                        src="images/doctor.jpg"
                        alt="Doctor escribiendo"
                        className="rounded-xl shadow-lg object-cover w-full h-80 md:h-[400px]"
                    />
                </div>
            </section>
            



            <h1 className="text-3xl font-bold text-[#023E8A] text-center m-8 text-primary">Nuestra Misión y Visión</h1>
            <p className="text-center text-base text-zinc-600 mt-2">
                Los principios que guían cada decisión y acción en HubROMImedia.
            </p>
            <section className="mt-10 grid md:grid-cols-2 gap-6 ">
                <div className="rounded-2xl border p-6">
                    <Handshake className="mx-auto w-15 h-15 text-blue-600 text-primary" />
                    <h2 className="font-semibold text-center ">Misión</h2>
                    <p className="text-sm text-zinc-600 mt-2">Democratizar el acceso a la atención médica de calidad
                        mediante tecnología innovadora, conectando profesionales de la salud con herramientas
                        avanzadas que mejoran los resultados clínicos y la experiencia del paciente.
                    </p>
                </div>
                <div className="rounded-2xl border p-6 text-center space-y-3">
                    <Target className="mx-auto w-15 h-15 text-blue-600 text-primary" />
                    <h2 className="font-semibold text-xl">Visión</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Ser la plataforma líder mundial en salud digital, transformando la
                        medicina a través de la inteligencia artificial y la telemedicina,
                        creando un futuro donde la atención médica de excelencia sea accesible
                        para todos.
                    </p>
                </div>
            </section>

            <h1 className="text-center text-3xl font-bold text-[#023E8A] m-12 text-primary">Nuestros Valores</h1>

            <section className="mt-10 grid md:grid-cols-3 gap-6">
                <div className="rounded-3xl border p-6 shadow-inner mt-6 text-center">
                    <Heart className="mx-auto w-15 h-15 text-blue-600 text-primary" />
                    <h2 className="font-semibold text-xl mt-7">Compromiso con la Salud</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Dedicados a mejorar la calidad de vida de las personas a través de la innovación médica.
                    </p>
                </div>
                <div className="rounded-3xl border p-6 shadow-inner mt-6 text-center">
                    <Lightbulb className="mx-auto w-15 h-15 text-blue-600 text-primary" />
                    <h2 className="font-semibold text-xl mt-7">Innovación Constante</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Desarrollamos soluciones tecnológicas avanzadas para los desafíos médicos actuales.
                    </p>
                </div>
                <div className="rounded-3xl border p-6 shadow-inner mt-6 text-center">
                    <Shield className="mx-auto w-15 h-15 text-blue-600 text-primary" />
                    <h2 className="font-semibold text-xl mt-7">Seguridad y Privacidad</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Protegemos la información médica con los más altos estándares de seguridad.
                    </p>
                </div>
                <div className="rounded-2xl border p-6 shadow-inner mt-6 text-center">
                    <Users className="mx-auto w-15 h-15 text-blue-600 text-primary" />
                    <h2 className="font-semibold text-xl mt-7">Colaboración</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Fomentamos el trabajo en equipo entre profesionales de la salud.
                    </p>
                </div>
                <div className="rounded-2xl border p-6 shadow-inner mt-6 text-center">
                    <Globe className="mx-auto w-15 h-15 text-blue-600 text-primary" />
                    <h2 className="font-semibold text-xl mt-7">Accesibilidad Global</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Hacemos que la atención médica de calidad sea accesible en todo el mundo.
                    </p>
                </div>
                <div className="rounded-2xl border p-6 shadow-inner mt-6 text-center">
                    <Zap className="mx-auto w-15 h-15 text-blue-600 text-primary" />
                    <h2 className="font-semibold text-xl mt-7">Eficiencia</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Optimizamos los procesos médicos para brindar atención más
                    </p>
                </div>

            </section>
            <h1 className=" text-center text-3xl font-bold text-[#023E8A] m-12 text-primary">Nuestro Equipo</h1>
            <p className="text-center text-base text-zinc-600 mt-2">
                Profesionales excepcionales comprometidos con la innovación médica.
            </p>
            <section className="mt-10 grid md:grid-cols-4 gap-6">
                <div className="rounded-2xl border p-6 shadow-inner mt-6 text-center">
                    <User className="mx-auto w-15 h-15 text-blue-600 text-primary" />
                    <h2 className="font-semibold text-xl mt-7">Juan Pérez</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Especialista en telemedicina con más de 10 años de experiencia.
                    </p>
                </div>
                <div className="rounded-2xl border p-6 shadow-inner mt-6 text-center">
                    <User className="mx-auto w-15 h-15 text-blue-600 text-primary" />
                    <h2 className="font-semibold text-xl mt-7">María López</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Experta en inteligencia artificial aplicada a la salud.
                    </p>
                </div>
                <div className="rounded-2xl border p-6 shadow-inner mt-6 text-center">
                    <User className="mx-auto w-15 h-15 text-blue-600 text-primary" />
                    <h2 className="font-semibold text-xl mt-7">Carlos García</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Ingeniero de software con enfoque en soluciones médicas.
                    </p>
                </div>
                <div className="rounded-2xl border p-6 shadow-inner mt-6 text-center">
                    <User className="mx-auto w-15 h-15 text-blue-600 text-primary" />
                    <h2 className="font-semibold text-xl mt-7">Carlos García</h2>
                    <p className="text-sm text-zinc-600 mt-2">
                        Ingeniero de software con enfoque en soluciones médicas.
                    </p>
                </div>
            </section>
            <h1 className=" text-center text-3xl font-bold text-[#023E8A] m-12 text-primary">Nuestra Historia</h1>
            <p className="text-center text-base text-zinc-600 mt-2">
                Un recorrido de innovación y crecimiento en el sector de la salud digital.
            </p>

            <section className="relative mx-auto max-w-6xl py-16">
                {/* Línea vertical centrada */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-indigo-300/80 mt-16"></div>

                {/* FILA 0 (tarjeta a la izquierda) */}
                <li className="relative grid grid-cols-1 md:grid-cols-2 items-center">
                    <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 ring-8 ring-white"></span>

                    {/* Tarjeta izquierda */}
                    <div className="md:pr-12">
                        <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 md:justify-self-end">
                            <p className="text-indigo-600 font-bold text-lg text-right md:text-left text-primary">2020</p>
                            <h3 className="mt-1 text-xl font-semibold text-slate-900 text-right md:text-left">Fundación de HubROMImedia</h3>
                            <p className="mt-2 text-slate-600 text-right md:text-left">Inicio de la plataforma con enfoque en telemedicina.</p>
                        </div>
                    </div>

                    {/* Espaciador derecha (solo desktop) */}
                    <div className="hidden md:block"></div>
                </li>



                <ol className="space-y-16">
                    {/* FILA 1 (tarjeta a la derecha) */}
                    <li className="relative grid grid-cols-1 md:grid-cols-2 items-center">
                        {/* Punto en la línea */}
                        <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 ring-8 ring-white"></span>

                        {/* Espaciador izquierda (solo desktop) */}
                        <div className="hidden md:block"></div>

                        {/* Tarjeta derecha */}
                        <div className="md:pl-12">
                            <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5">
                                <p className="text-indigo-600 font-bold text-lg text-primary">2021</p>
                                <h3 className="mt-1 text-xl font-semibold text-slate-900">Lanzamiento de ROMI</h3>
                                <p className="mt-2 text-slate-600">Primer asistente médico con IA en español.</p>
                            </div>
                        </div>
                    </li>

                    {/* FILA 2 (tarjeta a la izquierda) */}
                    <li className="relative grid grid-cols-1 md:grid-cols-2 items-center">
                        <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 ring-8 ring-white"></span>

                        {/* Tarjeta izquierda */}
                        <div className="md:pr-12">
                            <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 md:justify-self-end">
                                <p className="text-indigo-600 font-bold text-lg text-right md:text-left text-primary">2022</p>
                                <h3 className="mt-1 text-xl font-semibold text-slate-900 text-right md:text-left">10,000 Profesionales</h3>
                                <p className="mt-2 text-slate-600 text-right md:text-left">Alcanzamos 10,000 médicos registrados.</p>
                            </div>
                        </div>

                        {/* Espaciador derecha (solo desktop) */}
                        <div className="hidden md:block"></div>
                    </li>

                    {/* FILA 3 (tarjeta a la derecha) */}
                    <li className="relative grid grid-cols-1 md:grid-cols-2 items-center">
                        <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 ring-8 ring-white"></span>

                        <div className="hidden md:block"></div>

                        <div className="md:pl-12">
                            <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5">
                                <p className="text-indigo-600 font-bold text-lg text-primary">2023</p>
                                <h3 className="mt-1 text-xl font-semibold text-slate-900">Expansión Internacional</h3>
                                <p className="mt-2 text-slate-600">Presencia en 15 países de Latinoamérica.</p>
                            </div>
                        </div>
                    </li>
                    {/* FILA 4 (tarjeta a la izquierda) */}
                    <li className="relative grid grid-cols-1 md:grid-cols-2 items-center ">
                        <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 ring-8 ring-white "></span>

                        {/* Tarjeta izquierda */}
                        <div className="md:pr-12">
                            <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 md:justify-self-end">
                                <p className="text-indigo-600 font-bold text-lg text-right md:text-left text-primary">2024</p>
                                <h3 className="mt-1 text-xl font-semibold text-slate-900 text-right md:text-left">Portal Premium</h3>
                                <p className="mt-2 text-slate-600 text-right md:text-left"> Lanzamiento de servicios especializados.</p>
                            </div>
                        </div>

                        {/* Espaciador derecha (solo desktop) */}
                        <div className="hidden md:block"></div>
                    </li>
                </ol>
            </section>
        </main >
    );
}

