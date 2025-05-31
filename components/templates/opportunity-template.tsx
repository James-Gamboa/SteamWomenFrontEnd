"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { opportunitiesEventsData } from "@/lib/opportunities-events-data";
import { OpportunityCard } from "@/components/organisms/opportunity-card";
import { OpportunityFilters } from "@/components/organisms/opportunity-filters";

export function OpportunityTemplate() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const opportunities = opportunitiesEventsData;

  const getCategoryStyles = (category: string) => {
    const styles = {
      Networking: { backgroundColor: "#A78BFA", color: "#FFFFFF" },
      Taller: { backgroundColor: "#F97316", color: "#FFFFFF" },
      Webinar: { backgroundColor: "#8B5CF6", color: "#FFFFFF" },
      Hackathon: { backgroundColor: "#0EA5E9", color: "#FFFFFF" },
      Conferencia: { backgroundColor: "#38BDF8", color: "#FFFFFF" },
      Evento: { backgroundColor: "#A78BFA", color: "#FFFFFF" },
      Beca: { backgroundColor: "#38BDF8", color: "#FFFFFF" },
      Mentoría: { backgroundColor: "#8B5CF6", color: "#FFFFFF" },
      Investigación: { backgroundColor: "#FB923C", color: "#FFFFFF" },
      Concurso: { backgroundColor: "#A78BFA", color: "#FFFFFF" },
    };
    return (
      styles[category as keyof typeof styles] || {
        backgroundColor: "#C8C8C9",
        color: "#1A1F2C",
      }
    );
  };

  const itemsPerPage = 6;
  const filteredOpportunities = opportunities
    .filter(
      (op) =>
        !searchTerm ||
        op.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter(
      (op) =>
        selectedCategory === "all" ||
        !selectedCategory ||
        op.category.toLowerCase() === selectedCategory.toLowerCase(),
    )
    .filter(
      (op) =>
        selectedLocation === "all" ||
        !selectedLocation ||
        op.location.toLowerCase().includes(selectedLocation.toLowerCase()),
    );

  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOpportunities = filteredOpportunities.slice(
    startIndex,
    endIndex,
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "80px" }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1
            className="text-[32px] sm:text-[37px] lg:text-[48px] mb-4 font-bold"
            style={{
              lineHeight: "65px",
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
            }}
          >
            Oportunidades
          </h1>
          <p
            className="max-w-2xl mx-auto"
            style={{
              fontSize: "18px",
              lineHeight: "28px",
              color: "#8E9196",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "400",
            }}
          >
            Explora becas, eventos, talleres y más oportunidades diseñadas para
            impulsar tu carrera en áreas STEAM en Costa Rica.
          </p>
        </div>

        <OpportunityFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        {currentOpportunities.length === 0 ? (
          <div
            className="text-center py-12 text-lg"
            style={{
              color: "#8B5CF6",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 600,
            }}
          >
            No se encontraron oportunidades para los filtros seleccionados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        )}

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
      </div>
    </div>
  );
}
