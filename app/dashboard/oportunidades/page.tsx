"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/organisms/event-card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EventModal } from "@/components/organisms/dashboard/event-modal";
import { DeleteEventModal } from "@/components/organisms/dashboard/delete-event-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  getLocalOpportunities,
  createItem,
  deleteItem,
  updateItem,
} from "@/lib/data-storage";
import { GET_OPPORTUNITIES } from "@/backend-integration/graphql/queries";
import {
  CREATE_OPPORTUNITY,
  UPDATE_OPPORTUNITY,
  DELETE_OPPORTUNITY,
} from "@/backend-integration/graphql/mutations";

interface Opportunity {
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

// TODO: Reemplazar con conexión a Django

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [graphqlError, setGraphqlError] = useState<string | null>(null);
  const router = useRouter();

  const loadOpportunities = async () => {
    try {
      setIsLoading(true);
      setGraphqlError(null);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const graphqlVariables = { userId: "current", limit: 50, offset: 0 };
      const graphqlResult = GET_OPPORTUNITIES;

      const storedOpportunities = getLocalOpportunities?.() || [];
      setOpportunities(storedOpportunities);
    } catch (error) {
      setGraphqlError("Error loading opportunities from GraphQL");
      const storedOpportunities = getLocalOpportunities?.() || [];
      setOpportunities(storedOpportunities);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOpportunities();
  }, []);

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsEditModalOpen(true);
  };

  const handleDelete = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedOpportunity) return;
    try {
      setIsDeleting(true);
      setGraphqlError(null);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const graphqlVariables = {
        id: selectedOpportunity.id,
        userId: "current",
      };
      const graphqlResult = DELETE_OPPORTUNITY;

      deleteItem(String(selectedOpportunity.id));
      let legacyOpportunities = JSON.parse(
        localStorage.getItem("opportunities") || "[]",
      );
      legacyOpportunities = legacyOpportunities.filter(
        (o: Opportunity) => String(o.id) !== String(selectedOpportunity.id),
      );
      localStorage.setItem(
        "opportunities",
        JSON.stringify(legacyOpportunities),
      );
      await loadOpportunities();
      setIsDeleteModalOpen(false);
      setSelectedOpportunity(null);
      toast.success("Oportunidad eliminada exitosamente", {
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
      setGraphqlError("Error deleting opportunity in GraphQL");
      toast.error("Error al eliminar la oportunidad");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateSubmit = async (opportunityData: Opportunity) => {
    try {
      setIsCreating(true);
      setGraphqlError(null);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const graphqlVariables = {
        input: {
          title: opportunityData.title,
          description: opportunityData.description,
          location: opportunityData.location,
          date: opportunityData.date,
          time: opportunityData.time,
          category: opportunityData.category,
          organizer: opportunityData.organizer,
          website: opportunityData.website,
          fullDescription: opportunityData.fullDescription,
          requirements: opportunityData.requirements,
          benefits: opportunityData.benefits,
          applicationProcess: opportunityData.applicationProcess,
          userId: "current",
        },
      };
      const graphqlResult = CREATE_OPPORTUNITY;

      createItem({ ...opportunityData, type: "opportunity" });
      const legacyOpportunities = JSON.parse(
        localStorage.getItem("opportunities") || "[]",
      );
      legacyOpportunities.push(opportunityData);
      localStorage.setItem(
        "opportunities",
        JSON.stringify(legacyOpportunities),
      );
      await loadOpportunities();
      setIsCreateModalOpen(false);
      toast.success("Oportunidad creada exitosamente", {
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
      setGraphqlError("Error creating opportunity in GraphQL");
      toast.error("Error al crear la oportunidad");
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditSubmit = async (opportunityData: Opportunity) => {
    try {
      setIsUpdating(true);
      setGraphqlError(null);
      await new Promise((resolve) => setTimeout(resolve, 900));

      const graphqlVariables = {
        id: opportunityData.id,
        input: {
          title: opportunityData.title,
          description: opportunityData.description,
          location: opportunityData.location,
          date: opportunityData.date,
          time: opportunityData.time,
          category: opportunityData.category,
          organizer: opportunityData.organizer,
          website: opportunityData.website,
          fullDescription: opportunityData.fullDescription,
          requirements: opportunityData.requirements,
          benefits: opportunityData.benefits,
          applicationProcess: opportunityData.applicationProcess,
          userId: "current",
        },
      };
      const graphqlResult = UPDATE_OPPORTUNITY;

      updateItem(String(opportunityData.id), {
        ...opportunityData,
        id: String(opportunityData.id),
      });
      let legacyOpportunities = JSON.parse(
        localStorage.getItem("opportunities") || "[]",
      );
      legacyOpportunities = legacyOpportunities.map((o: Opportunity) =>
        String(o.id) === String(opportunityData.id)
          ? { ...opportunityData, id: String(opportunityData.id) }
          : o,
      );
      localStorage.setItem(
        "opportunities",
        JSON.stringify(legacyOpportunities),
      );
      await loadOpportunities();
      setIsEditModalOpen(false);
      setSelectedOpportunity(null);
      toast.success("Oportunidad actualizada exitosamente", {
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
      setGraphqlError("Error updating opportunity in GraphQL");
      toast.error("Error al actualizar la oportunidad");
    } finally {
      setIsUpdating(false);
    }
  };

  const getCategoryStyles = (category: string) => {
    const styles = {
      backgroundColor: "#F1F0FB",
      color: "#8B5CF6",
    };

    switch (category.toLowerCase()) {
      case "tiempo completo":
        return { backgroundColor: "#F1F0FB", color: "#8B5CF6" };
      case "medio tiempo":
        return { backgroundColor: "#F0FDF4", color: "#22C55E" };
      case "freelance":
        return { backgroundColor: "#FEF2F2", color: "#EF4444" };
      case "práctica":
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
            Oportunidades
          </h1>
          <p className="text-[#8E9196] text-lg">
            Gestiona tus oportunidades publicadas
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold px-6 py-2 rounded-lg"
          disabled={isLoading || isCreating || isUpdating || isDeleting}
        >
          <Plus className="w-4 h-4 mr-2" />
          {isCreating ? "Creando..." : "Crear Oportunidad"}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando oportunidades...</div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opportunity) => (
            <EventCard
              key={opportunity.id}
              event={opportunity}
              getCategoryStyles={getCategoryStyles}
              formatDate={formatDate}
              isDashboard={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
              type="oportunidad"
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
      {selectedOpportunity && (
        <EventModal
          mode="edit"
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSubmit={handleEditSubmit}
          initialData={selectedOpportunity}
        />
      )}
      {selectedOpportunity && (
        <DeleteEventModal
          event={selectedOpportunity}
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
