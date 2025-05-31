"use client";

import { AgendaList } from "./agenda-list";
import { SectionList } from "./section-list";

interface EventDetailContentProps {
  event: {
    fullDescription: string;
    agenda: Array<{ activity: string; time: string; description: string }>;
    requirements: string[];
    benefits: string[];
    registrationInfo: string;
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
      <div className="mb-8">
        <SectionList title="Agenda del evento" items={[]} />
        <AgendaList agenda={event.agenda} />
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
          Información de registro
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
          {event.registrationInfo}
        </p>
      </div>
    </>
  );
}
