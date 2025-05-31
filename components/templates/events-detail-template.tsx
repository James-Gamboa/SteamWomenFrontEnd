"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { eventsData } from "@/lib/events-data";
import { EventDetailHeader } from "@/components/organisms/event-detail-header";
import { EventDetailSidebar } from "@/components/organisms/event-detail-sidebar";
import { EventDetailContent } from "@/components/organisms/event-detail-content";
import { EventDetailSimilar } from "@/components/organisms/event-detail-similar";

interface EventsDetailTemplateProps {
  slug: string;
}

const eventsDataBySlug = eventsData.reduce(
  (acc, curr) => {
    acc[curr.slug] = curr;
    return acc;
  },
  {} as Record<string, (typeof eventsData)[number]>,
);

export function EventsDetailTemplate({ slug }: EventsDetailTemplateProps) {
  const [isSticky, setIsSticky] = useState(true);
  const registrationInfoRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const event = eventsDataBySlug[slug as keyof typeof eventsDataBySlug];
  const similarEvents = Object.entries(eventsDataBySlug)
    .filter(([key]) => key !== slug)
    .slice(0, 2)
    .map(([key, value]) => ({ ...value, slug: key, id: String(value.id) }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        rootMargin: "-100px 0px 0px 0px",
        threshold: 0,
      },
    );

    if (registrationInfoRef.current) {
      observer.observe(registrationInfoRef.current);
    }

    return () => {
      if (registrationInfoRef.current) {
        observer.unobserve(registrationInfoRef.current);
      }
    };
  }, []);

  const getCategoryStyles = (category: string) => {
    const styles = {
      Networking: { backgroundColor: "#A78BFA", color: "#FFFFFF" },
      Taller: { backgroundColor: "#F97316", color: "#FFFFFF" },
      Webinar: { backgroundColor: "#8B5CF6", color: "#FFFFFF" },
      Hackathon: { backgroundColor: "#0EA5E9", color: "#FFFFFF" },
      Conferencia: { backgroundColor: "#38BDF8", color: "#FFFFFF" },
    };
    return (
      styles[category as keyof typeof styles] || {
        backgroundColor: "#C8C8C9",
        color: "#1A1F2C",
      }
    );
  };

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateObject = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("es-ES", { month: "short" }).replace(".", ""),
      year: date.getFullYear()
    };
  };

  if (!event) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold">Evento no encontrado</h2>
        <Link href="/eventos" className="text-primary underline">
          Volver a eventos
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "80px" }}
    >
      <div className="container py-8">
        <Link
          href="/eventos"
          className="inline-flex items-center mb-6 transition-colors hover:opacity-80"
          style={{
            color: "#8E9196",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a eventos
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EventDetailHeader
              event={event}
              getCategoryStyles={getCategoryStyles}
              formatDate={formatDateString}
            />
            <EventDetailContent event={event} />
          </div>
          <div className="lg:col-span-1">
            <div ref={sidebarRef}>
              <EventDetailSidebar
                event={event}
                formatDate={formatDateString}
                isSticky={isSticky}
              />
            </div>
          </div>
        </div>
        <EventDetailSimilar
          similarEvents={similarEvents}
          getCategoryStyles={getCategoryStyles}
          formatDate={formatDateObject}
        />
      </div>
    </div>
  );
}
