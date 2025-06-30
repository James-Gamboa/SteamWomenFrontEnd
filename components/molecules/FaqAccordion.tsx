"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function FaqAccordion() {
  return (
    <section className="bg-white py-16 px-4">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#2D2D2D] font-sans"
      style={{
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
              lineHeight: "1.1",
            }}>
        
        Preguntas Frecuentes
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full max-w-3xl mx-auto space-y-2"
      >
        {[
          {
            question: "¿Qué es Ecosystem for Women?",
            answer:
              "Una iniciativa para fortalecer el liderazgo femenino en tecnología, promoviendo espacios inclusivos, aprendizaje comunitario y desarrollo profesional.",
          },
          {
            question: "¿Cómo puedo apoyar el proyecto?",
            answer:
              "Puedes apoyar compartiendo nuestra misión, participando en eventos o realizando donaciones a través de plataformas como Ko-fi, Donorbox o PayPal, accesibles desde nuestro Linktree.",
          },
          {
            question: "¿Qué tipo de actividades realizan?",
            answer:
              "Facilitamos talleres, mentorías, encuentros colaborativos y recursos gratuitos centrados en tecnología accesible, diseño inclusivo y liderazgo comunitario.",
          },
          {
            question: "¿Necesito experiencia previa para unirme?",
            answer:
              "No. Nuestro espacio está abierto tanto para principiantes como para profesionales que deseen compartir, aprender y construir comunidad.",
          },
          {
            question: "¿Cómo me entero de eventos y actividades?",
            answer:
              "Síguenos en redes sociales, suscríbete a nuestro boletín o visita nuestro Linktree donde publicamos actualizaciones periódicas.",
          },
          {
            question: "¿Puedo participar si estoy fuera de Costa Rica?",
            answer:
              "¡Absolutamente! Muchas de nuestras actividades son virtuales y abiertas a personas de toda Latinoamérica y comunidades globales.",
          },
          {
            question: "¿Dónde puedo ver los términos y política de privacidad?",
            answer:
              "Puedes consultarlos en nuestro sitio web o mediante un enlace disponible en nuestro Linktree. Están disponibles en formato accesible y PDF.",
          },
        ].map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-white"
          >
            <AccordionTrigger className="text-[#1A1F2C] font-medium font-sans py-4 px-6 hover:no-underline focus:outline-none"  style={{
              fontFamily: "DM Sans, sans-serif",
            }}>
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-[#4B4B4B] font-sans leading-relaxed pl-6 pr-6 pb-4 border-l-4 border-[#A267AC]" style={{
              fontFamily: "DM Sans, sans-serif",
            }}>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
