"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, List, CalendarDays } from "lucide-react";

interface EventsFiltersProps {
  viewMode: "list" | "calendar";
  setViewMode: (mode: "list" | "calendar") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const categories = [
  "Evento",
  "Beca",
  "Mentoría",
  "Conferencia",
  "Taller",
  "Investigación",
  "Concurso",
];
const provinces = [
  "Virtual",
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón",
];

export function EventsFilters({
  viewMode,
  setViewMode,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
}: EventsFiltersProps) {
  return (
    <div className="flex flex-col gap-4 mb-6 lg:mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
            style={{ color: "#8E9196" }}
          />
          <Input
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#C8C8C9",
              fontFamily: "DM Sans, sans-serif",
            }}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            value={selectedCategory || "all"}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger
              className="w-full sm:w-48"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C8C8C9",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedLocation || "all"}
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger
              className="w-full sm:w-48"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C8C8C9",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              <SelectValue placeholder="Todas las ubicaciones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ubicaciones</SelectItem>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex items-center gap-2"
            style={{
              backgroundColor: viewMode === "list" ? "#8B5CF6" : "transparent",
              color: viewMode === "list" ? "#FFFFFF" : "#1A1F2C",
              borderColor: "#C8C8C9",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Vista de lista</span>
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("calendar")}
            className="flex items-center gap-2"
            style={{
              backgroundColor:
                viewMode === "calendar" ? "#8B5CF6" : "transparent",
              color: viewMode === "calendar" ? "#FFFFFF" : "#1A1F2C",
              borderColor: "#C8C8C9",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">Vista de calendario</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
