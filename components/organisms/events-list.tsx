"use client";

import { useMemo } from "react";
import { EventCard } from "./event-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { eventsData } from "@/lib/events-data";

interface EventsListProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchTerm: string;
  selectedCategory: string;
  selectedLocation: string;
}

export function EventsList({
  currentPage,
  setCurrentPage,
  searchTerm,
  selectedCategory,
  selectedLocation,
}: EventsListProps) {
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || !selectedCategory || event.category === selectedCategory;
      const matchesLocation =
        selectedLocation === "all" || !selectedLocation || event.location === selectedLocation;

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

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  return (
    <div>
      {currentEvents.length === 0 ? (
        <div
          className="text-center py-12 text-lg"
          style={{
            color: "#8B5CF6",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 600,
          }}
        >
          No se encontraron eventos para los filtros seleccionados.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8 lg:mb-12">
          {currentEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              getCategoryStyles={getCategoryStyles}
              formatDate={formatDate}
              isDashboard={false}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-12 h-12 flex items-center justify-center border rounded border-[#8B5CF6] bg-white transition-all duration-200 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F1F0FB]"}`}
            aria-label="Anterior"
            style={{ outline: "none" }}
          >
            <ChevronLeft className="h-6 w-6 text-[#8B5CF6]" />
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            const isCurrentPage = currentPage === pageNumber;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-4 py-2 text-lg font-semibold transition-all duration-200 bg-transparent border-none focus:outline-none ${
                  isCurrentPage
                    ? "text-[#8B5CF6] border-b-2 border-[#8B5CF6]"
                    : "text-[#1A1F2C] hover:text-[#8B5CF6]"
                }`}
                style={{ minWidth: "32px" }}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`w-12 h-12 flex items-center justify-center border rounded border-[#8B5CF6] bg-white transition-all duration-200 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F1F0FB]"}`}
            aria-label="Siguiente"
            style={{ outline: "none" }}
          >
            <ChevronRight className="h-6 w-6 text-[#8B5CF6]" />
          </button>
        </div>
      )}
    </div>
  );
}
