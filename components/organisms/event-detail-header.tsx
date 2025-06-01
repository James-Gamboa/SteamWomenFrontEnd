"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { EventMeta } from "./event-meta";

interface EventDetailHeaderProps {
  event: {
    title: string;
    image: string;
    category: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
  };
  getCategoryStyles: (category: string) => {
    backgroundColor: string;
    color: string;
  };
  formatDate: (dateString: string) => string;
}

export function EventDetailHeader({
  event,
  getCategoryStyles,
  formatDate,
}: EventDetailHeaderProps) {
  return (
    <>
      <div className="relative mb-6">
        <Image
          src={event.image || "/dummy-women.jpg.jpeg"}
          alt={event.title}
          width={800}
          height={400}
          className="w-full h-64 md:h-80 object-cover rounded-lg"
        />
        <Badge
          className="absolute top-4 left-4 px-3 py-1 rounded-full border-0"
          style={{
            ...getCategoryStyles(event.category),
            fontFamily: "DM Sans, sans-serif",
            fontSize: "12px",
            lineHeight: "15px",
            fontWeight: "600",
          }}
        >
          {event.category}
        </Badge>
      </div>
      <div className="mb-6">
        <h1
          className="mb-4 font-bold text-2xl sm:text-3xl lg:text-4xl"
          style={{
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: "600",
            lineHeight: "1.2",
          }}
        >
          {event.title}
        </h1>
        <EventMeta
          date={event.date}
          time={event.time}
          location={event.location}
          organizer={event.organizer}
          formatDate={formatDate}
        />
      </div>
    </>
  );
}
