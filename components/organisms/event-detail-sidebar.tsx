"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Share } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  website: string;
  category: string;
  slug: string;
}

interface EventDetailSidebarProps {
  event: Event;
  formatDate: (dateString: string) => string;
  isSticky: boolean;
}

export function EventDetailSidebar({
  event,
  formatDate,
  isSticky,
}: EventDetailSidebarProps) {
  const [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  const handleRegisterClick = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para registrarte en el evento.");
      return;
    }
    if (user.role !== "student") {
      toast.error("Solo los estudiantes pueden registrarse a eventos.");
      return;
    }
    const registrations = JSON.parse(
      localStorage.getItem("student_event_registrations") || "[]",
    );
    const alreadyRegistered = registrations.some(
      (reg: any) => reg.userId === user.id && reg.eventSlug === event.slug,
    );
    if (alreadyRegistered) {
      toast.error("Ya te has registrado a este evento.");
      return;
    }
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (!user) return;

    const registrations = JSON.parse(
      localStorage.getItem("student_event_registrations") || "[]",
    );
    const province = event.location.split(",")[0].trim();
    registrations.push({
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      eventSlug: event.slug,
      eventTitle: event.title,
      organizer: event.organizer,
      fechaRegistro: new Date().toISOString(),
      provincia: province,
      categoria: event.category,
      estado: "Pendiente",
    });
    localStorage.setItem(
      "student_event_registrations",
      JSON.stringify(registrations),
    );

    const organizerRegistrations = JSON.parse(
      localStorage.getItem("organizer_event_registrations") || "[]",
    );
    organizerRegistrations.push({
      eventId: event.id,
      eventTitle: event.title,
      organizer: event.organizer,
      registrantId: user.id,
      registrantName: `${user.firstName} ${user.lastName}`,
      registrantEmail: user.email,
      fechaRegistro: new Date().toISOString(),
      estado: "Pendiente",
    });
    localStorage.setItem(
      "organizer_event_registrations",
      JSON.stringify(organizerRegistrations),
    );

    setModalOpen(false);
    toast.success("¡Registro exitoso!");
  };

  return (
    <div
      className={`transition-all duration-300 ${isSticky ? "lg:sticky lg:top-24" : ""}`}
    >
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
              onClick={handleRegisterClick}
            >
              Inscribirse al evento
            </Button>
          }
          {user?.role === "student" && (
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>¿Deseas registrarte a este evento?</DialogTitle>
                </DialogHeader>
                <div className="mb-4">
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-[#8E9196]">{event.organizer}</p>
                  <p className="text-xs text-[#8E9196]">
                    {formatDate(event.date)}
                  </p>
                  <p className="text-xs text-[#8E9196] mt-2">
                    Categoría: {event.category}
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                    onClick={handleConfirm}
                  >
                    Confirmar registro
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
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
            className="mb-3 font-bold text-base"
            style={{
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
            }}
          >
            Información del evento
          </h4>
          <div className="space-y-3 text-sm">
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
                {formatDate(event.date)}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                style={{ color: "#8E9196", fontFamily: "DM Sans, sans-serif" }}
              >
                Hora
              </span>
              <span
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                {event.time}
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
                {event.location}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                style={{ color: "#8E9196", fontFamily: "DM Sans, sans-serif" }}
              >
                Organizador
              </span>
              <span
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                {event.organizer}
              </span>
            </div>
          </div>
          <div
            className="mt-4 pt-4 border-t"
            style={{ borderColor: "#C8C8C9" }}
          >
            <h5
              className="mb-2 font-bold text-sm"
              style={{
                color: "#1A1F2C",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
              }}
            >
              Sitio web del organizador
            </h5>
            <a
              href={event.website}
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
              {event.website}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
