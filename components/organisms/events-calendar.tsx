"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { opportunitiesEventsData } from "@/lib/opportunities-events-data";

interface EventsCalendarProps {
  searchTerm: string;
  selectedCategory: string;
  selectedLocation: string;
}

const events = opportunitiesEventsData;

export function EventsCalendar({
  searchTerm,
  selectedCategory,
  selectedLocation,
}: EventsCalendarProps) {
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || event.category === selectedCategory;
      const matchesLocation =
        !selectedLocation || event.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [searchTerm, selectedCategory, selectedLocation]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date
        .toLocaleDateString("es-ES", { month: "short" })
        .replace(".", ""),
      year: date.getFullYear(),
    };
  };

  const eventsByMonth = useMemo(() => {
    const grouped: { [key: string]: typeof events } = {};
    filteredEvents.forEach((event) => {
      const date = new Date(event.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(event);
    });
    return grouped;
  }, [filteredEvents]);

  return (
    <div className="space-y-6">
      {Object.entries(eventsByMonth).map(([monthKey, monthEvents]) => {
        const firstEvent = monthEvents[0];
        const date = new Date(firstEvent.date);
        const monthName = date.toLocaleDateString("es-ES", {
          month: "long",
          year: "numeric",
        });

        return (
          <div key={monthKey} className="space-y-4">
            <h3
              className="text-xl lg:text-2xl font-bold capitalize"
              style={{
                color: "#1A1F2C",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
              }}
            >
              {monthName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {monthEvents.map((event) => {
                const eventDate = formatDate(event.date);
                return (
                  <Link key={event.id} href={`/eventos/${event.slug}`}>
                    <div
                      className="overflow-hidden flex hover:shadow-lg transition-all duration-300 border-0 shadow-sm cursor-pointer transform hover:scale-[1.02]"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                      }}
                    >
                      <div
                        className="flex flex-col items-center justify-center p-4 min-w-[80px]"
                        style={{ backgroundColor: "#8B5CF6" }}
                      >
                        <div
                          className="text-2xl lg:text-3xl font-bold"
                          style={{ color: "#FFFFFF" }}
                        >
                          {eventDate.day}
                        </div>
                        <div
                          className="text-sm font-medium capitalize"
                          style={{ color: "#FFFFFF" }}
                        >
                          {eventDate.month}
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge
                            className="px-2 py-1 rounded-full border-0 text-xs"
                            style={{
                              ...getCategoryStyles(event.category),
                              fontFamily: "DM Sans, sans-serif",
                              fontWeight: "600",
                            }}
                          >
                            {event.category}
                          </Badge>
                        </div>
                        <h4
                          className="font-bold mb-2 line-clamp-2 text-sm lg:text-base"
                          style={{ color: "#1A1F2C" }}
                        >
                          {event.title}
                        </h4>
                        <div className="space-y-1 text-xs">
                          <div
                            className="flex items-center"
                            style={{ color: "#8E9196" }}
                          >
                            <Calendar className="h-3 w-3 mr-1" />
                            <span style={{ fontFamily: "DM Sans, sans-serif" }}>
                              {event.time}
                            </span>
                          </div>
                          <div
                            className="flex items-center"
                            style={{ color: "#8E9196" }}
                          >
                            <MapPin className="h-3 w-3 mr-1" />
                            <span style={{ fontFamily: "DM Sans, sans-serif" }}>
                              {event.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
