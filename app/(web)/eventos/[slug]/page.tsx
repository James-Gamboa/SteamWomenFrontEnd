"use client";

import { EventsDetailTemplate } from "@/components/templates/events-detail-template";
import { useEffect, useState, use } from "react";
import { eventsData } from "@/lib/events-data";
import { GET_EVENT } from "@/backend-integration/graphql/queries";

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
  const [isLoading, setIsLoading] = useState(true);
  const [graphqlError, setGraphqlError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setIsLoading(true);
        setGraphqlError(null);
        const graphqlResult = GET_EVENT;
        const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
        let currentEvent = storedEvents.find((e: Event) => e.slug === slug);
        if (!currentEvent) {
          currentEvent = eventsData.find((e: Event) => e.slug === slug);
        }
        setEvent(currentEvent || null);
      } catch (error) {
        setGraphqlError("Error loading event from GraphQL");
        const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
        let currentEvent = storedEvents.find((e: Event) => e.slug === slug);
        if (!currentEvent) {
          currentEvent = eventsData.find((e: Event) => e.slug === slug);
        }
        setEvent(currentEvent || null);
      } finally {
        setIsLoading(false);
      }
    };
    loadEvent();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container py-16 text-center">
        <div className="text-lg">Cargando evento...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container py-16 text-center">
        {graphqlError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {graphqlError}
          </div>
        )}
        <h2 className="text-2xl font-bold">Evento no encontrado</h2>
        <a href="/eventos" className="text-primary underline">
          Volver a eventos
        </a>
      </div>
    );
  }

  return (
    <div>
      {graphqlError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {graphqlError}
        </div>
      )}
      <EventsDetailTemplate event={event} />
    </div>
  );
}
