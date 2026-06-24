'use client'

import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Seccion2() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [infoData, setInfoData] = useState([]);
  const scrollerRef = useRef(null);

  const fallbackServices = [
    {
      id: "srv-1",
      name: "Atención médica general y familiar",
      description: "Evaluación integral de salud, orientación profesional y acompañamiento continuo.",
      image: "/fondo2.png",
    },
    {
      id: "srv-2",
      name: "Atención psicológica para niños y adultos",
      description: "Apoyo emocional para ansiedad, estrés y procesos personales en todas las etapas.",
      image: "/fondo3.png",
    },
    {
      id: "srv-3",
      name: "Nutrición y bienestar metabólico",
      description: "Planes personalizados para mejorar hábitos, energía y salud a largo plazo.",
      image: "/fondo1.png",
    },
  ];

  const services = infoData.map((item) => ({
    id: item.id_publicacionesTituloDescripcion,
    name: item.publicacionesTitulo,
    description: item.publicacionesDescripcion,
    image: `https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${item.publicacionesTituloDescripcionImagen}/card`,
  }));

  async function loadServices() {
    try {
      const res = await fetch(`${API}/publicacionesTituloDetalle/seleccionarPublicacionesTituloDetalle`, {
        method: "GET",
        headers: { Accept: "application/json" },
        mode: "cors",
      });

      if (!res.ok) {
        return toast.error(`No ha sido posible cargar las imagenes del sistema contacte a soporte de NativeCode`);
      }

      const data = await res.json();
      setInfoData(data);
    } catch {
      return toast.error(`No ha sido posible cargar las imagenes del sistema contacte a soporte de NativeCode`);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  const content = services.length > 0 ? services : fallbackServices;

  const scrollByAmount = (direction) => {
    const container = scrollerRef.current;
    if (!container) return;
    const firstCardWidth = container.firstElementChild?.clientWidth ?? 0;
    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    const amount =
      firstCardWidth > 0 ? Math.round(firstCardWidth + gap) : Math.round(container.clientWidth * 0.82);
    container.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="servicios" className="scroll-mt-24 bg-transparent py-22 text-[#5d462d] sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <RevealOnScroll>
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#9a7750]/72">Especialidades integrales</p>
              <h2 className="mt-4 max-w-4xl text-balance text-4xl leading-[1] text-[#4f361d] sm:text-5xl">
                Medicina, psicología, estética y terapias en un mismo ecosistema de bienestar.
              </h2>
            </div>
            <Link
              href="/servicios"
              className="inline-flex justify-center rounded-full border border-[#d7b792]/48 bg-[#f2ddc2]/36 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#5b4228] transition hover:bg-[#e8cfac]/44"
            >
              Ver detalle completo
            </Link>
          </div>
        </RevealOnScroll>

        <div className="mt-8 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            aria-label="Desplazar servicios hacia la izquierda"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e6d0b0]/58 text-[#664b2d] transition duration-300 hover:bg-[#dbc29e]/72"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            aria-label="Desplazar servicios hacia la derecha"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e6d0b0]/58 text-[#664b2d] transition duration-300 hover:bg-[#dbc29e]/72"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="hide-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {content.map((service, index) => (
            <RevealOnScroll
              key={service.id ?? service.name}
              className="w-[86%] shrink-0 snap-start sm:w-[66%] lg:w-[41%]"
              delayClass={index % 2 === 0 ? "delay-100" : "delay-150"}
            >
              <Link
                href="/agendaProfesionales"
                aria-label={`Agendar para ${service.name}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#d8bc9c]/35 bg-[linear-gradient(180deg,rgba(252,245,234,0.95)_0%,rgba(243,230,211,0.9)_100%)] shadow-[0_16px_36px_-22px_rgba(122,91,55,0.28)] transition duration-300 ease-out hover:-translate-y-1"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,28,20,0.03)_0%,rgba(42,28,20,0.34)_100%)]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-medium tracking-[0.02em] text-[#573e24]">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-7 tracking-[0.02em] text-[#6b5233]/82">
                    {service.description || "Atención personalizada con acompañamiento profesional y seguimiento continuo para resultados sostenibles."}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#d8bc9d]/36 pt-4">
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8a663d] transition-colors duration-300 group-hover:text-[#6f4d28]">
                      Agendar hora
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d4b38f]/36 bg-[#efdbc0]/42 transition-all duration-300 group-hover:border-[#bf9568]/44 group-hover:bg-[#e8c7a1]/48">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#7a5a35] transition-all duration-300 group-hover:translate-x-px group-hover:text-[#5f411f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
