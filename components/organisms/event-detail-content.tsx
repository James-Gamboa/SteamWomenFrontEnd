"use client";

import { SectionList } from "./section-list";

interface EventDetailContentProps {
  event: {
    fullDescription: string;
    requirements: string[];
    benefits: string[];
    applicationProcess: string;
  };
}

export function EventDetailContent({ event }: EventDetailContentProps) {
  return (
    <>
      <div className="mb-8">
        <h2
          className="mb-4 font-bold text-xl lg:text-2xl"
          style={{
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: "600",
          }}
        >
          Acerca del evento
        </h2>
        <p
          className="leading-relaxed text-sm lg:text-base"
          style={{
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: "400",
            lineHeight: "1.6",
          }}
        >
          {event.fullDescription}
        </p>
      </div>
      <SectionList
        title="Requisitos para participar"
        items={event.requirements}
      />
      <SectionList title="Qué incluye" items={event.benefits} />
      <div className="mb-8">
        <h3
          className="mb-4 font-bold text-lg lg:text-xl"
          style={{
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: "600",
          }}
        >
          Proceso de aplicación
        </h3>
        <p
          className="text-sm lg:text-base"
          style={{
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: "400",
            lineHeight: "1.6",
          }}
        >
          {event.applicationProcess}
        </p>
      </div>
    </>
  );
}
