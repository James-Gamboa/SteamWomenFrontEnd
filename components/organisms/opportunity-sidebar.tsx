import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Share } from "lucide-react";
import { useState } from "react";

export function OpportunitySidebar({ opportunity }: { opportunity: any }) {
  const [liked, setLiked] = useState(false);

  return (
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
        >
          Aplicar ahora
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
          {opportunity.organizer && (
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
                {opportunity.organizer}
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
              className="text-sm hover:opacity-80"
              style={{
                color: "#8B5CF6",
                fontFamily: "DM Sans, sans-serif",
                textDecoration: "underline",
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
