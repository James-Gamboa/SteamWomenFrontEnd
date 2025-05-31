"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Share } from "lucide-react";
import { useState } from "react";

interface EventDetailSidebarProps {
  event: {
    registrationUrl: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    capacity: string;
    price: string;
    website: string;
  };
  formatDate: (dateString: string) => string;
  isSticky: boolean;
}

export function EventDetailSidebar({
  event,
  formatDate,
  isSticky,
}: EventDetailSidebarProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className={`transition-all duration-300 ${isSticky ? "lg:sticky lg:top-24" : ""}`}
    >
      <Card
        className="mb-6 shadow-lg border-0 transform transition-transform hover:scale-[1.01]"
        style={{ backgroundColor: "#F1F0FB" }}
      >
        <CardHeader>
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
            onClick={() => window.open(event.registrationUrl, "_blank")}
          >
            Registrarse ahora
          </Button>
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
                {formatDate(event.date).split(",")[1]}
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
            <div className="flex justify-between">
              <span
                style={{ color: "#8E9196", fontFamily: "DM Sans, sans-serif" }}
              >
                Capacidad
              </span>
              <span
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                {event.capacity}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                style={{ color: "#8E9196", fontFamily: "DM Sans, sans-serif" }}
              >
                Precio
              </span>
              <span
                style={{
                  color: "#8B5CF6",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                {event.price}
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
              className="text-sm hover:opacity-80"
              style={{
                color: "#8B5CF6",
                fontFamily: "DM Sans, sans-serif",
                textDecoration: "underline",
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
