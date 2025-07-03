"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/organisms/event-card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EventModal } from "@/components/organisms/dashboard/event-modal";
import { DeleteEventModal } from "@/components/organisms/dashboard/delete-event-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { GET_EVENTS } from "@/backend-integration/graphql/queries";
import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from "@/backend-integration/graphql/mutations";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  category: string;
  organizer: string;
  website: string;
  slug: string;
  image: string;
  fullDescription: string;
  requirements: string[];
  benefits: string[];
  applicationProcess: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [graphqlError, setGraphqlError] = useState<string | null>(null);
  const router = useRouter();

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      setGraphqlError(null);
      const graphqlResult = GET_EVENTS;
      const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
      setEvents(storedEvents);
    } catch (error) {
      setGraphqlError("Error loading events from GraphQL");
      const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
      setEvents(storedEvents);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDelete = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEvent) return;
    try {
      const graphqlResult = DELETE_EVENT;
      const updatedEvents = events.filter((e) => e.id !== selectedEvent.id);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      setIsDeleteModalOpen(false);
      setSelectedEvent(null);
      toast.success("Evento eliminado exitosamente", {
        style: {
          backgroundColor: "#F1F0FB",
          color: "#1A1F2C",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
    } catch (error) {
      toast.error("Error al eliminar el evento");
    }
  };

  const handleCreateSubmit = async (eventData: Event) => {
    try {
      const graphqlResult = CREATE_EVENT;
      const updatedEvents = [...events, eventData];
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      setIsCreateModalOpen(false);
      toast.success("Evento creado exitosamente", {
        style: {
          backgroundColor: "#F1F0FB",
          color: "#1A1F2C",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
    } catch (error) {
      toast.error("Error al crear el evento");
    }
  };

  const handleEditSubmit = async (eventData: Event) => {
    try {
      const graphqlResult = UPDATE_EVENT;
      const updatedEvents = events.map((e) =>
        e.id === eventData.id ? eventData : e,
      );
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      setIsEditModalOpen(false);
      setSelectedEvent(null);
      toast.success("Evento actualizado exitosamente", {
        style: {
          backgroundColor: "#F1F0FB",
          color: "#1A1F2C",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
    } catch (error) {
      toast.error("Error al actualizar el evento");
    }
  };

  const getCategoryStyles = (category: string) => {
    const styles = {
      backgroundColor: "#F1F0FB",
      color: "#8B5CF6",
    };

    switch (category.toLowerCase()) {
      case "conferencia":
        return { backgroundColor: "#F1F0FB", color: "#8B5CF6" };
      case "taller":
        return { backgroundColor: "#F0FDF4", color: "#22C55E" };
      case "networking":
        return { backgroundColor: "#FEF2F2", color: "#EF4444" };
      case "hackathon":
        return { backgroundColor: "#FEF3C7", color: "#D97706" };
      case "otro":
        return { backgroundColor: "#E0E7FF", color: "#6366F1" };
      default:
        return styles;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString("es-ES", { month: "long" }),
      year: date.getFullYear(),
    };
  };

  return (
    <div className="space-y-8">
      {graphqlError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {graphqlError}
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-[#8B5CF6] mb-2">
            Eventos
          </h1>
          <p className="text-[#8E9196] text-lg">
            Gestiona tus eventos publicados
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold px-6 py-2 rounded-lg"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4 mr-2" /> Crear Evento
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando eventos...</div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              getCategoryStyles={getCategoryStyles}
              formatDate={formatDate}
              isDashboard={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
              type="event"
            />
          ))}
        </div>
      )}

      <EventModal
        mode="create"
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreateSubmit}
      />
      {selectedEvent && (
        <EventModal
          mode="edit"
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSubmit={handleEditSubmit}
          initialData={selectedEvent}
        />
      )}
      {selectedEvent && (
        <DeleteEventModal
          event={selectedEvent}
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
