"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GET_STUDENT_APPLICATIONS } from "@/backend-integration/graphql/queries";
import { UPDATE_APPLICATION } from "@/backend-integration/graphql/mutations";

interface Application {
  id: number;
  applicantName: string;
  applicantEmail: string;
  status: string;
  date: string;
  itemTitle: string;
  itemType: string;
}

export default function PostulacionesPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [graphqlError, setGraphqlError] = useState<string | null>(null);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setIsLoading(true);
        setGraphqlError(null);
        const graphqlResult = GET_STUDENT_APPLICATIONS;
        const stored = localStorage.getItem("applications");
        if (stored) {
          setApplications(JSON.parse(stored));
        }
      } catch (error) {
        setGraphqlError("Error loading applications from GraphQL");
        const stored = localStorage.getItem("applications");
        if (stored) {
          setApplications(JSON.parse(stored));
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadApplications();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      setIsUpdating(true);
      setGraphqlError(null);
      const graphqlResult = UPDATE_APPLICATION;
      const updated = applications.map((app) =>
        app.id === id ? { ...app, status } : app,
      );
      setApplications(updated);
      localStorage.setItem("applications", JSON.stringify(updated));
      toast.success(
        `Postulación ${status === "accepted" ? "aceptada" : "rechazada"}`,
      );
    } catch (error) {
      setGraphqlError("Error updating application status in GraphQL");
      toast.error("Error al actualizar el estado");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Cargando postulaciones...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {graphqlError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {graphqlError}
        </div>
      )}
      <h1 className="text-3xl font-extrabold text-[#8B5CF6] mb-4">
        Ver Postulaciones
      </h1>
      <div className="grid gap-6">
        {applications.length === 0 && (
          <div className="text-gray-500">No hay postulaciones registradas.</div>
        )}
        {applications.map((app) => (
          <Card
            key={app.id}
            className="p-4 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="font-semibold text-lg">{app.applicantName}</div>
              <div className="text-sm text-gray-500">{app.applicantEmail}</div>
              <div className="text-sm mt-1">
                {app.itemType === "event" ? "Evento" : "Oportunidad"}:{" "}
                <span className="font-medium">{app.itemTitle}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Fecha: {app.date}
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <span
                className={
                  app.status === "pending"
                    ? "text-yellow-500"
                    : app.status === "accepted"
                      ? "text-green-600"
                      : "text-red-600"
                }
              >
                {app.status === "pending"
                  ? "Pendiente"
                  : app.status === "accepted"
                    ? "Aceptada"
                    : "Rechazada"}
              </span>
              {app.status === "pending" && (
                <>
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleStatusChange(app.id, "accepted")}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Actualizando..." : "Aceptar"}
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleStatusChange(app.id, "rejected")}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Actualizando..." : "Rechazar"}
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
