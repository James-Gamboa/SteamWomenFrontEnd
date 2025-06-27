"use client";

import { EventsDetailTemplate } from "@/components/templates/events-detail-template";
import { useEffect, useState, use } from "react";
import { eventsData } from "@/lib/events-data";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  category: string;
  organizer: string;
  website: string;
  slug: string;
  image: string;
  fullDescription: string;
  requirements: string[];
  benefits: string[];
  applicationProcess?: string;
}

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    let currentEvent = storedEvents.find((e: Event) => e.slug === slug);
    if (!currentEvent) {
      currentEvent = eventsData.find((e: Event) => e.slug === slug);
    }
    setEvent(currentEvent || null);
  }, [slug]);

  if (!event) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold">Evento no encontrado</h2>
        <a href="/eventos" className="text-primary underline">
          Volver a eventos
        </a>
      </div>
    );
  }

  return <EventsDetailTemplate event={event} />;
}
