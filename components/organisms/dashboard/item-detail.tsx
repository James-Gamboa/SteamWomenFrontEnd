"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dataStorage } from "@/lib/data-storage";
import { useAuth } from "@/lib/context/auth-context";
import { toast } from "sonner";
import { BaseItem } from "@/lib/data-storage";
import { Calendar, MapPin, Building2, Globe, FileText, Award, Send } from "lucide-react";

// TODO: Reemplazar con conexión a Django 

interface ItemDetailProps {
  id: string;
  type: "event" | "opportunity";
  showActions?: boolean;
  onItemDeleted?: () => void;
  onItemEdited?: () => void;
}

export function ItemDetail({ id, type, showActions = false, onItemDeleted, onItemEdited }: ItemDetailProps) {
  const { user } = useAuth();
  const [item, setItem] = useState<BaseItem | null>(null);

  useEffect(() => {
    const loadItem = () => {
      const storedItem = dataStorage.getItem(id);
      setItem(storedItem);
    };

    loadItem();
    window.addEventListener("storage", loadItem);
    return () => window.removeEventListener("storage", loadItem);
  }, [id]);

  if (!item) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Elemento no encontrado</p>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      dataStorage.deleteItem(id);
      toast.success("Elemento eliminado exitosamente");
      if (onItemDeleted) onItemDeleted();
    }
  };

  const handleEdit = () => {
    if (onItemEdited) onItemEdited();
  };

  const handleApply = () => {
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

  const requirements = Array.isArray(item.requirements) ? item.requirements : [item.requirements];
  const benefits = Array.isArray(item.benefits) ? item.benefits : [item.benefits];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <p className="text-gray-500 mt-2">{item.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Fecha</p>
                <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Ubicación</p>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Organizador</p>
                <p className="text-sm text-gray-500">{item.organizer}</p>
              </div>
            </div>
          </div>

          {item.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-gray-500" />
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                {item.website}
              </a>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Descripción completa</h2>
              <p className="text-gray-600 mt-2">{item.fullDescription}</p>
            </div>

            {requirements.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">Requisitos</h2>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {benefits.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">Beneficios</h2>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-600">{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {item.applicationProcess && (
              <div>
                <h2 className="text-lg font-semibold">Proceso de aplicación</h2>
                <p className="text-gray-600 mt-2">{item.applicationProcess}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {showActions ? (
              <>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleEdit}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleDelete}
                >
                  Eliminar
                </Button>
              </>
            ) : user?.role === "student" ? (
              <Button
                className="flex-1"
                onClick={handleApply}
              >
                <Send className="h-4 w-4 mr-2" />
                Postularme
              </Button>
            ) : null}
          </div>
        </div>
      </Card>
    </div>
  );
}
