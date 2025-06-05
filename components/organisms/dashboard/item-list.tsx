"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dataStorage } from "@/lib/data-storage";
import { useAuth } from "@/lib/context/auth-context";
import { toast } from "sonner";
import { ItemFilters } from "./item-filters";
import { Calendar, List } from "lucide-react";
import { BaseItem } from "@/lib/data-storage";

interface ItemListProps {
  type: "event" | "opportunity";
  showActions?: boolean;
  onItemDeleted?: () => void;
  onItemEdited?: () => void;
}

export function ItemList({ type, showActions = false, onItemDeleted, onItemEdited }: ItemListProps) {
  const { user } = useAuth();
  const [items, setItems] = useState<BaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [view, setView] = useState<"list" | "calendar">("list");

  useEffect(() => {
    const loadItems = () => {
      const storedItems = dataStorage.getItems(type);
      setItems(storedItems);
    };

    loadItems();
    window.addEventListener("storage", loadItems);
    return () => window.removeEventListener("storage", loadItems);
  }, [type]);

  const handleDelete = (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      dataStorage.deleteItem(id);
      toast.success("Elemento eliminado exitosamente");
      if (onItemDeleted) onItemDeleted();
    }
  };

  const handleEdit = (id: string) => {
    if (onItemEdited) onItemEdited();
  };

  const handleApply = (id: string) => {
    if (!user) {
      toast.error("Debes iniciar sesión para postularte");
      return;
    }

    if (user.role !== "student") {
      toast.error("Solo los estudiantes pueden postularse");
      return;
    }

    const success = dataStorage.createApplication(id, type, user.id, user.email);
    if (success) {
      toast.success("¡Postulación exitosa!");
    } else {
      toast.error("Ya te has postulado a este elemento");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !category || item.category === category;
    const matchesLocation = !location || item.location === location;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <ItemFilters
            type={type}
            category={category}
            location={location}
            onCategoryChange={setCategory}
            onLocationChange={setLocation}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Fecha</SelectItem>
              <SelectItem value="title">Título</SelectItem>
            </SelectContent>
          </Select>
          {type === "event" && (
            <div className="flex items-center gap-2">
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "calendar" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setView("calendar")}
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedItems.map((item) => (
          <Card key={item.id} className="p-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Fecha:</span> {new Date(item.date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Ubicación:</span> {item.location}
              </p>
              {showActions && (
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              )}
              {!showActions && user?.role === "student" && (
                <Button
                  className="w-full"
                  onClick={() => handleApply(item.id)}
                >
                  Postularme
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 