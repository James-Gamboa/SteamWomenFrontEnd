"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, ArrowUpDown } from "lucide-react";
import { BaseItem, ItemType } from "@/lib/data-storage";

interface ItemFiltersProps {
  type: "event" | "opportunity";
  category: string;
  location: string;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

const categories: Record<"event" | "opportunity", string[]> = {
  event: [
    "Conferencia",
    "Taller",
    "Networking",
    "Hackathon",
    "Otro"
  ],
  opportunity: [
    "Tiempo completo",
    "Medio tiempo",
    "Freelance",
    "Práctica",
    "Otro"
  ]
};

const locations = [
  "Heredia",
  "Alajuela",
  "Cartago",
  "Limón",
  "Puntarenas",
  "Otro"
] as const;

type Location = typeof locations[number];

// TODO: Reemplazar con conexión a Django

export function ItemFilters({
  type,
  category,
  location,
  onCategoryChange,
  onLocationChange
}: ItemFiltersProps) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "relevance">("date");
  const [customCategories, setCustomCategories] = useState<string[]>([]);

  useEffect(() => {
    const items = localStorage.getItem("items");
    if (items) {
      const parsedItems: BaseItem[] = JSON.parse(items);
      const uniqueCategories = Array.from(
        new Set(parsedItems.filter(item => item.type === type).map(item => item.category))
      );
      setCustomCategories(uniqueCategories);
    }
  }, [type]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todas</SelectItem>
          {categories[type as "event" | "opportunity"].map((cat: string) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={location} onValueChange={onLocationChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ubicación" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todas</SelectItem>
          {locations.map((loc: Location) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={(value: "date" | "relevance") => setSortBy(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Fecha
            </div>
          </SelectItem>
          <SelectItem value="relevance">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Relevancia
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 