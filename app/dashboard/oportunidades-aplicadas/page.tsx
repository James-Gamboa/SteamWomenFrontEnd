"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface Application {
  userId: string;
  userName: string;
  opportunityId: string;
  opportunityTitle: string;
  company: string;
  fechaPostulacion: string;
  provincia?: string;
  categoria?: string;
}

export default function OportunidadesAplicadasPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (user && user.role === "student") {
      const all = JSON.parse(localStorage.getItem("student_applications") || "[]");
      setApplications(all.filter((app: Application) => app.userId === user.id));
    }
  }, [user]);

  if (!user) return null;

  const isCompany = user.role === "company";
  const isStudent = user.role === "student";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
          {isCompany ? "Candidatos Postulados" : "Mis Postulaciones"}
        </h1>
        <p className="text-[#C8C8C9] mt-2">
          {isCompany
            ? "Gestiona las postulaciones a tus oportunidades"
            : "Sigue el estado de tus postulaciones"
          }
        </p>
      </div>

      <div className="grid gap-6">
        {isCompany ? (
          <Card>
            <CardHeader>
              <CardTitle>Postulaciones Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">Desarrollador Frontend</p>
                    <p className="text-sm text-[#C8C8C9]">María García</p>
                  </div>
                  <Badge variant="secondary">Pendiente</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">Diseñador UX/UI</p>
                    <p className="text-sm text-[#C8C8C9]">Ana Martínez</p>
                  </div>
                  <Badge variant="secondary">En Revisión</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Mis Postulaciones</CardTitle>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center text-[#C8C8C9] py-8">
                  Aún no te has postulado a ninguna oportunidad.
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.opportunityId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{app.opportunityTitle}</p>
                        <p className="text-sm text-[#C8C8C9]">{app.company}</p>
                        <div className="flex gap-2 mt-1">
                          {app.provincia && <span className="text-xs bg-[#F1F0FB] text-[#8B5CF6] px-2 py-0.5 rounded">{app.provincia}</span>}
                          {app.categoria && <span className="text-xs bg-[#F1F0FB] text-[#F97316] px-2 py-0.5 rounded">{app.categoria}</span>}
                        </div>
                        <p className="text-xs text-[#8E9196]">{new Date(app.fechaPostulacion).toLocaleDateString()}</p>
                      </div>
                      <Badge variant="secondary">Pendiente</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 