"use client";

import { EventsHeader } from "@/components/organisms/events-header";
import { EventsFilters } from "@/components/organisms/events-filters";
import { EventsList } from "@/components/organisms/events-list";
import { EventsCalendar } from "@/components/organisms/events-calendar";
import { EventsCTA } from "@/components/organisms/events-cta";
import { eventsData } from "@/lib/events-data";
import { useEffect, useState } from "react";

export function EventsTemplate() {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allEvents, setAllEvents] = useState(eventsData);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
  (sin duplicados por id)
    const merged = [
      ...storedEvents,
      ...eventsData.filter((e) => !storedEvents.some((se) => se.id === e.id)),
    ];
    setAllEvents(merged);
  }, []);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "80px" }}
    >
      <div className="container py-8 lg:py-12">
        <EventsHeader />
        <EventsFilters
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        {viewMode === "list" ? (
          <EventsList
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            events={allEvents}
          />
        ) : (
          <EventsCalendar
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            events={allEvents}
          />
        )}
        <EventsCTA />
      </div>
    </main>
  );
}
