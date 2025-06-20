"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Share } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  date: string;
  category: string;
  website?: string;
}

interface OpportunitySidebarProps {
  opportunity: Opportunity;
  isSticky?: boolean;
}

export function OpportunitySidebar({
  opportunity,
  isSticky = false,
}: OpportunitySidebarProps) {
  const [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handleApplyClick = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para postularte a esta oportunidad.");
      return;
    }
    if (user.role !== "student") {
      toast.error("Solo los estudiantes pueden postularse a oportunidades.");
      return;
    }
    const applications = JSON.parse(localStorage.getItem("student_applications") || "[]");
    const alreadyApplied = applications.some(
      (app: any) => app.userId === user.id && app.opportunityId === opportunity.id
    );
    if (alreadyApplied) {
      toast.error("Ya te has postulado a esta oportunidad.");
      return;
    }
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (!user) return;
    
    if (user.role === "student") {
      const applications = JSON.parse(localStorage.getItem("student_applications") || "[]");
      const province = opportunity.location.split(",")[0].trim();
      applications.push({
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        opportunityId: opportunity.id,
        opportunityTitle: opportunity.title,
        company: opportunity.company,
        fechaAplicacion: new Date().toISOString(),
        provincia: province,
        categoria: opportunity.category,
        estado: "Pendiente"
      });
      localStorage.setItem("student_applications", JSON.stringify(applications));
    }

    const companyApplications = JSON.parse(localStorage.getItem("company_applications") || "[]");
    companyApplications.push({
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title,
      company: opportunity.company,
      applicantId: user.id,
      applicantName: `${user.firstName} ${user.lastName}`,
      applicantEmail: user.email,
      fechaAplicacion: new Date().toISOString(),
      estado: "Pendiente"
    });
    localStorage.setItem("company_applications", JSON.stringify(companyApplications));

    setModalOpen(false);
    toast.success("¡Postulación enviada con éxito!");
  };

  return (
    <Card
      className="mb-6 shadow-lg border-0 transform transition-transform hover:scale-[1.01]"
      style={{ backgroundColor: "#F1F0FB" }}
    >
      <CardHeader>
        {
          <Button
            className="w-full mb-4 py-6 text-lg shadow-md transform transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: "#8B5CF6",
              color: "#FFFFFF",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "8px",
            }}
            onClick={handleApplyClick}
          >
            Aplicar ahora
          </Button>
        }
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>¿Deseas postularte a esta oportunidad?</DialogTitle>
              </DialogHeader>
              <div className="mb-4">
                <p className="font-semibold">{opportunity.title}</p>
                <p className="text-sm text-[#8E9196]">{opportunity.company}</p>
                <p className="text-xs text-[#8E9196]">{formatDate(opportunity.date)}</p>
                <p className="text-xs text-[#8E9196] mt-2">Categoría: {opportunity.category}</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={handleConfirm}>
                  Confirmar postulación
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 py-5 transition-all hover:bg-pink-50"
            style={{
              borderColor: "#C8C8C9",
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              borderRadius: "8px",
            }}
            onClick={() => setLiked((prev) => !prev)}
          >
            <Heart
              className="h-5 w-5 mr-1"
              fill={liked ? "#e25555" : "none"}
              color={liked ? "#e25555" : "#8E9196"}
            />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 py-5 transition-all hover:bg-blue-50"
            style={{
              borderColor: "#C8C8C9",
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              borderRadius: "8px",
            }}
          >
            <Share className="h-5 w-5 mr-1 text-blue-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <h4
          className="mb-3 font-bold"
          style={{
            fontSize: "16px",
            lineHeight: "20px",
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: "600",
          }}
        >
          Información clave
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span
              style={{ color: "#8E9196", fontFamily: "DM Sans, sans-serif" }}
            >
              Categoría
            </span>
            <span
              style={{
                color: "#1A1F2C",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
              }}
            >
              {opportunity.category}
            </span>
          </div>
          <div className="flex justify-between">
            <span
              style={{ color: "#8E9196", fontFamily: "DM Sans, sans-serif" }}
            >
              Ubicación
            </span>
            <span
              style={{
                color: "#1A1F2C",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
              }}
            >
              {opportunity.location}
            </span>
          </div>
          <div className="flex justify-between">
            <span
              style={{ color: "#8E9196", fontFamily: "DM Sans, sans-serif" }}
            >
              Fecha
            </span>
            <span
              style={{
                color: "#1A1F2C",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
              }}
            >
              {opportunity.date}
            </span>
          </div>
          {opportunity.company && (
            <div className="flex justify-between">
              <span
                style={{ color: "#8E9196", fontFamily: "DM Sans, sans-serif" }}
              >
                Empresa
              </span>
              <span
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                {opportunity.company}
              </span>
            </div>
          )}
        </div>
        {opportunity.website && (
          <div
            className="mt-4 pt-4 border-t"
            style={{ borderColor: "#C8C8C9" }}
          >
            <h5
              className="mb-2 font-bold"
              style={{
                fontSize: "14px",
                lineHeight: "18px",
                color: "#1A1F2C",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
              }}
            >
              Sitio web oficial
            </h5>
            <a
              href={opportunity.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-80 break-words"
              style={{
                color: "#8B5CF6",
                fontFamily: "DM Sans, sans-serif",
                textDecoration: "underline",
                wordBreak: "break-word",
              }}
            >
              {opportunity.website}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
