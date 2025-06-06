"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/organisms/event-card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EventModal } from "@/components/organisms/dashboard/event-modal";
import { DeleteEventModal } from "@/components/organisms/dashboard/delete-event-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const loadOpportunities = () => {
    const storedOpportunities = JSON.parse(localStorage.getItem("opportunities") || "[]");
    setOpportunities(storedOpportunities);
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

  const handleDeleteConfirm = () => {
    if (!selectedOpportunity) return;
    const updatedOpportunities = opportunities.filter((o) => o.id !== selectedOpportunity.id);
    localStorage.setItem("opportunities", JSON.stringify(updatedOpportunities));
    setOpportunities(updatedOpportunities);
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
  };

  const handleCreateSubmit = (opportunityData: Opportunity) => {
    const updatedOpportunities = [...opportunities, opportunityData];
    localStorage.setItem("opportunities", JSON.stringify(updatedOpportunities));
    setOpportunities(updatedOpportunities);
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
  };

  const handleEditSubmit = (opportunityData: Opportunity) => {
    const updatedOpportunities = opportunities.map((o) => (o.id === opportunityData.id ? opportunityData : o));
    localStorage.setItem("opportunities", JSON.stringify(updatedOpportunities));
    setOpportunities(updatedOpportunities);
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
      month: date.toLocaleString('es-ES', { month: 'long' }),
      year: date.getFullYear()
    };
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-[#8B5CF6] mb-2">
            Oportunidades
          </h1>
          <p className="text-[#8E9196] text-lg">
            Gestiona tus oportunidades publicadas
          </p>
        </div>
        <Button onClick={handleCreate} className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold px-6 py-2 rounded-lg">
          <Plus className="w-4 h-4 mr-2" /> Crear Oportunidad
        </Button>
      </div>

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