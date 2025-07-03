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
import { generateSlug } from "@/lib/utils/slug-utils";
import {
  safeStorageSet,
  safeStorageGet,
  getStorageUsage,
} from "@/lib/utils/storage-utils";

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

const useQuery = (query: any) => {
  const [data, setData] = useState<{ opportunities: Opportunity[] }>({ opportunities: [] });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const items = safeStorageGet<any[]>("items") || [];
    const opportunities = items.filter((item) => item.type === "opportunity");
    setData({ opportunities });
    setLoading(false);
  }, []);
  return { data, loading, error: null };
};

const useMutation = (mutation: any) => {
  return [
    async (variables: any) => {
      let items = safeStorageGet<any[]>("items") || [];
      if (mutation === CREATE_OPPORTUNITY) {
        items.push(variables.input);
        safeStorageSet("items", items);
      } else if (mutation === UPDATE_OPPORTUNITY) {
        items = items.map((o: Opportunity) => o.id === variables.id ? variables.input : o);
        safeStorageSet("items", items);
      } else if (mutation === DELETE_OPPORTUNITY) {
        items = items.filter((o: Opportunity) => o.id !== variables.id);
        safeStorageSet("items", items);
      }
      return { data: null };
    },
    { loading: false, error: null },
  ];
};

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
    setIsLoading(true);
    try {
      const items = safeStorageGet<any[]>("items") || [];
      const opportunities = items.filter((item) => item.type === "opportunity");
      setOpportunities(opportunities);
    } catch (error) {
      console.error("Error loading opportunities:", error);
      toast.error("Error al cargar las oportunidades", {
        style: {
          backgroundColor: "#FEF2F2",
          color: "#DC2626",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
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
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const items = safeStorageGet<any[]>("items") || [];
      const updatedItems = items.filter(
        (item: any) => item.id !== selectedOpportunity.id,
      );
      const saveSuccess = safeStorageSet("items", updatedItems);

      if (!saveSuccess) {
        toast.error(
          "Error al eliminar la oportunidad. Espacio de almacenamiento insuficiente.",
          {
            style: {
              backgroundColor: "#FEF2F2",
              color: "#DC2626",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "500",
            },
          },
        );
        return;
      }

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
      console.error("Error deleting opportunity:", error);
      toast.error("Error al eliminar la oportunidad", {
        style: {
          backgroundColor: "#FEF2F2",
          color: "#DC2626",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateSubmit = async (opportunityData: Opportunity) => {
    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const baseSlug = generateSlug(opportunityData.title || "oportunidad");
      const uniqueSlug = `${baseSlug}-${Date.now()}`;
      const now = new Date().toISOString();
      const newOpportunity = {
        id: opportunityData.id || Date.now(),
        title: opportunityData.title || "",
        description: opportunityData.description || "",
        location: opportunityData.location || "",
        date: opportunityData.date || new Date().toISOString().slice(0, 10),
        time: opportunityData.time || "",
        category: opportunityData.category || "otro",
        organizer: opportunityData.organizer || "",
        website: opportunityData.website || "",
        slug: uniqueSlug,
        image: opportunityData.image || "",
        fullDescription: opportunityData.fullDescription || "",
        requirements: opportunityData.requirements || [],
        benefits: opportunityData.benefits || [],
        applicationProcess: opportunityData.applicationProcess || "",
        type: "opportunity",
        createdAt: now,
        updatedAt: now,
      };

      const items = safeStorageGet<any[]>("items") || [];
      items.push(newOpportunity);
      const saveSuccess = safeStorageSet("items", items);

      if (!saveSuccess) {
        const usage = getStorageUsage();
        toast.error(
          `Error al crear la oportunidad. Espacio de almacenamiento insuficiente (${usage.percentage.toFixed(1)}% usado).`,
          {
            style: {
              backgroundColor: "#FEF2F2",
              color: "#DC2626",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "500",
            },
          },
        );
        return;
      }

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
      console.error("Error creating opportunity:", error);
      toast.error("Error al crear la oportunidad", {
        style: {
          backgroundColor: "#FEF2F2",
          color: "#DC2626",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditSubmit = async (opportunityData: Opportunity) => {
    setIsUpdating(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    try {
      const items = safeStorageGet<any[]>("items") || [];
      const updatedItems = items.map((item: any) =>
        item.id === opportunityData.id
          ? { ...item, ...opportunityData, updatedAt: new Date().toISOString() }
          : item,
      );
      const saveSuccess = safeStorageSet("items", updatedItems);

      if (!saveSuccess) {
        toast.error(
          "Error al actualizar la oportunidad. Espacio de almacenamiento insuficiente.",
          {
            style: {
              backgroundColor: "#FEF2F2",
              color: "#DC2626",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "500",
            },
          },
        );
        return;
      }

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
      console.error("Error updating opportunity:", error);
      toast.error("Error al actualizar la oportunidad", {
        style: {
          backgroundColor: "#FEF2F2",
          color: "#DC2626",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
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
