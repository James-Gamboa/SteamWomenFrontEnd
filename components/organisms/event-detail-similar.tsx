"use client";

import { EventCard } from "./event-card";

interface EventDetailSimilarProps {
  similarEvents: Array<{
    id: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    category: string;
    date: string;
    time: string;
    location: string;
  }>;
  getCategoryStyles: (category: string) => {
    backgroundColor: string;
    color: string;
  };
  formatDate: (dateString: string) => {
    day: number;
    month: string;
    year: number;
  };
}

export function EventDetailSimilar({
  similarEvents,
  getCategoryStyles,
  formatDate,
}: EventDetailSimilarProps) {
  return (
    <div className="mt-12 lg:mt-16">
      <h3
        className="mb-6 font-bold text-xl lg:text-2xl"
        style={{
          color: "#1A1F2C",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "600",
        }}
      >
        Eventos similares
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {similarEvents.map((similar) => (
          <EventCard
            key={similar.id}
            event={similar}
            getCategoryStyles={getCategoryStyles}
            formatDate={formatDate}
            type={similar.category === "oportunidad" ? "oportunidad" : "event"}
          />
        ))}
      </div>
    </div>
  );
}
