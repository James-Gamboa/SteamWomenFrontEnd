"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dataStorage, Application, ItemType } from "@/lib/data-storage";
import { useAuth } from "@/lib/context/auth-context";
import { Calendar, Mail, Check, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ApplicationsListProps {
  type?: ItemType;
  itemId?: string;
  studentId?: string;
}

export function ApplicationsList({ type, itemId, studentId }: ApplicationsListProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadApplications = () => {
      let loadedApplications: Application[] = [];
      if (itemId) {
        loadedApplications = dataStorage.getApplicationsByItem(itemId);
      } else if (studentId) {
        loadedApplications = dataStorage.getApplicationsByStudent(studentId);
      }
      if (type) {
        loadedApplications = loadedApplications.filter(app => app.itemType === type);
      }
      setApplications(loadedApplications);
    };

    loadApplications();
    window.addEventListener("storage", loadApplications);
    return () => window.removeEventListener("storage", loadApplications);
  }, [type, itemId, studentId]);

  const handleStatusUpdate = (applicationId: string, status: Application['status']) => {
    const updatedApplication = dataStorage.updateApplicationStatus(applicationId, status);
    if (updatedApplication) {
      toast.success(`Estado actualizado a ${status === 'accepted' ? 'aceptado' : 'rechazado'}`, {
        style: {
          backgroundColor: "#F1F0FB",
          color: "#1A1F2C",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
    }
  };

  const handleViewItem = (itemId: string, itemType: ItemType) => {
    router.push(`/${itemType}s/${itemId}`);
  };

  return (
    <div className="space-y-6">
      {applications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay postulaciones para mostrar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((application) => {
            const item = dataStorage.getItem(application.itemId);
            if (!item) return null;

            return (
              <Card key={application.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail className="h-4 w-4" />
                    <span>{application.studentEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(application.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      application.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : application.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {application.status === 'pending'
                        ? 'Pendiente'
                        : application.status === 'accepted'
                        ? 'Aceptado'
                        : 'Rechazado'}
                    </span>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleViewItem(item.id, item.type)}
                    className="w-full"
                  >
                    Ver {item.type === 'event' ? 'Evento' : 'Oportunidad'}
                  </Button>
                  {user?.role === 'company' && application.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(application.id, 'accepted')}
                        className="flex-1"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Aceptar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(application.id, 'rejected')}
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Rechazar
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
} 