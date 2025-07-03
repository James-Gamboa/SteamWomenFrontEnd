"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Mail, User, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { GET_STUDENT_APPLICATIONS } from "@/backend-integration/graphql/queries";
import { UPDATE_APPLICATION } from "@/backend-integration/graphql/mutations";

interface EventRegistration {
  userId: string;
  userName: string;
  eventSlug: string;
  eventTitle: string;
  organizer: string;
  fechaRegistro: string;
  provincia: string;
  categoria: string;
  estado: string;
}

interface OpportunityApplication {
  userId: string;
  userName: string;
  opportunityId: string;
  opportunityTitle: string;
  company: string;
  fechaPostulacion: string;
  provincia?: string;
  categoria?: string;
  estado: string;
}

interface StudentApplication {
  id: string;
  type: "event" | "opportunity";
  studentId: string;
  studentName: string;
  studentEmail: string;
  itemTitle: string;
  itemId: string;
  applicationDate: string;
  status: string;
  location?: string;
  category?: string;
}

export default function OportunidadesAplicadasPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [filterType, setFilterType] = useState<"all" | "event" | "opportunity">(
    "all",
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "accepted" | "rejected"
  >("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [graphqlError, setGraphqlError] = useState<string | null>(null);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setIsLoading(true);
        setGraphqlError(null);
        const graphqlResult = GET_STUDENT_APPLICATIONS;
        if (user && user.role === "student") {
          const studentApplications = JSON.parse(
            localStorage.getItem("student_applications") || "[]",
          );
          const eventRegistrations = JSON.parse(
            localStorage.getItem("student_event_registrations") || "[]",
          );
          const allApplications: StudentApplication[] = [
            ...studentApplications.map((app: any) => ({
              id: app.opportunityId,
              type: "opportunity" as const,
              studentId: app.userId,
              studentName: app.userName,
              studentEmail: user.email,
              itemTitle: app.opportunityTitle,
              itemId: app.opportunityId,
              applicationDate: app.fechaPostulacion,
              status: app.estado || "Pendiente",
              location: app.provincia,
              category: app.categoria,
            })),
            ...eventRegistrations.map((reg: any) => ({
              id: reg.eventSlug,
              type: "event" as const,
              studentId: reg.userId,
              studentName: reg.userName,
              studentEmail: user.email,
              itemTitle: reg.eventTitle,
              itemId: reg.eventSlug,
              applicationDate: reg.fechaRegistro,
              status: reg.estado || "Pendiente",
              location: reg.provincia,
              category: reg.categoria,
            })),
          ].filter((app: StudentApplication) => app.studentId === user.id);
          setApplications(allApplications);
        } else if (user && user.role === "company") {
          const eventRegistrations = JSON.parse(
            localStorage.getItem("organizer_event_registrations") || "[]",
          );
          const opportunityApplications = JSON.parse(
            localStorage.getItem("opportunity_applications") || "[]",
          );
          const allApplications: StudentApplication[] = [
            ...eventRegistrations.map((reg: any) => ({
              id: `${reg.eventId}-${reg.registrantId}`,
              type: "event" as const,
              studentId: reg.registrantId,
              studentName: reg.registrantName,
              studentEmail: reg.registrantEmail,
              itemTitle: reg.eventTitle,
              itemId: reg.eventId,
              applicationDate: reg.fechaRegistro,
              status: reg.estado || "Pendiente",
              location: "",
              category: "",
            })),
            ...opportunityApplications.map((app: any) => ({
              id: `${app.opportunityId}-${app.studentId}`,
              type: "opportunity" as const,
              studentId: app.studentId,
              studentName: app.studentName,
              studentEmail: app.studentEmail,
              itemTitle: app.opportunityTitle,
              itemId: app.opportunityId,
              applicationDate: app.fechaPostulacion,
              status: app.estado || "Pendiente",
              location: app.provincia,
              category: app.categoria,
            })),
          ];
          setApplications(allApplications);
        }
      } catch (error) {
        setGraphqlError("Error loading applications from GraphQL");
        setApplications([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadApplications();
    window.addEventListener("storage", loadApplications);
    return () => window.removeEventListener("storage", loadApplications);
  }, [user]);

  const handleStatusUpdate = async (
    applicationId: string,
    newStatus: string,
  ) => {
    try {
      setIsUpdating(true);
      setGraphqlError(null);
      const graphqlResult = UPDATE_APPLICATION;
      const updatedApplications = applications.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app,
      );
      setApplications(updatedApplications);

      if (user?.role === "company") {
        const eventRegistrations = JSON.parse(
          localStorage.getItem("organizer_event_registrations") || "[]",
        );
        const opportunityApplications = JSON.parse(
          localStorage.getItem("opportunity_applications") || "[]",
        );

        const application = applications.find(
          (app) => app.id === applicationId,
        );
        if (application?.type === "event") {
          const updatedEventRegistrations = eventRegistrations.map(
            (reg: any) =>
              `${reg.eventId}-${reg.registrantId}` === applicationId
                ? { ...reg, estado: newStatus }
                : reg,
          );
          localStorage.setItem(
            "organizer_event_registrations",
            JSON.stringify(updatedEventRegistrations),
          );

          const studentEventRegistrations = JSON.parse(
            localStorage.getItem("student_event_registrations") || "[]",
          );
          const updatedStudentEventRegistrations =
            studentEventRegistrations.map((reg: any) =>
              reg.userId === application.studentId &&
              (reg.eventTitle?.toLowerCase().trim() ===
                application.itemTitle?.toLowerCase().trim() ||
                String(reg.eventSlug).toLowerCase().trim() ===
                  String(application.itemId).toLowerCase().trim() ||
                String(reg.eventId).toLowerCase().trim() ===
                  String(application.itemId).toLowerCase().trim())
                ? { ...reg, estado: newStatus }
                : reg,
            );
          localStorage.setItem(
            "student_event_registrations",
            JSON.stringify(updatedStudentEventRegistrations),
          );
        } else if (application?.type === "opportunity") {
          const updatedOpportunityApplications = opportunityApplications.map(
            (app: any) =>
              `${app.opportunityId}-${app.studentId}` === applicationId
                ? { ...app, estado: newStatus }
                : app,
          );
          localStorage.setItem(
            "opportunity_applications",
            JSON.stringify(updatedOpportunityApplications),
          );

          const studentApplications = JSON.parse(
            localStorage.getItem("student_applications") || "[]",
          );
          const updatedStudentApplications = studentApplications.map(
            (app: any) =>
              app.opportunityId === application.itemId &&
              app.userId === application.studentId
                ? { ...app, estado: newStatus }
                : app,
          );
          localStorage.setItem(
            "student_applications",
            JSON.stringify(updatedStudentApplications),
          );
        }
      }

      toast.success(`Estado actualizado a ${newStatus}`);
    } catch (error) {
      setGraphqlError("Error updating application status in GraphQL");
      toast.error("Error al actualizar el estado");
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesType = filterType === "all" || app.type === filterType;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "pending" &&
        app.status.toLowerCase() === "pendiente") ||
      (filterStatus === "accepted" &&
        app.status.toLowerCase() === "aceptado") ||
      (filterStatus === "rejected" && app.status.toLowerCase() === "rechazado");
    return matchesType && matchesStatus;
  });

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Cargando aplicaciones desde GraphQL...</div>
      </div>
    );
  }

  const isCompany = user.role === "company";
  const isStudent = user.role === "student";

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "aceptado":
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rechazado":
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pendiente":
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="space-y-6">
      {graphqlError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {graphqlError}
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
          {isCompany ? "Candidatos Postulados" : "Mis Postulaciones"}
        </h1>
        <p className="text-[#C8C8C9] mt-2">
          {isCompany
            ? "Gestiona las postulaciones a tus eventos y oportunidades"
            : "Sigue el estado de tus postulaciones"}
        </p>
      </div>

      {isCompany && (
        <div className="flex gap-4 mb-6">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="border rounded px-3 py-2"
          >
            <option value="all">Todos los tipos</option>
            <option value="event">Eventos</option>
            <option value="opportunity">Oportunidades</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border rounded px-3 py-2"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="accepted">Aceptado</option>
            <option value="rejected">Rechazado</option>
          </select>
        </div>
      )}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {isCompany ? "Postulaciones Recientes" : "Mis Postulaciones"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredApplications.length === 0 ? (
              <div className="text-center text-[#C8C8C9] py-8">
                {isCompany
                  ? "No hay postulaciones para mostrar."
                  : "Aún no te has postulado a ninguna oportunidad o evento."}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        {app.type === "event" ? (
                          <Calendar className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Briefcase className="h-4 w-4 text-green-500" />
                        )}
                        <p className="font-medium">{app.itemTitle}</p>
                        <Badge variant="outline" className="text-xs">
                          {app.type === "event" ? "Evento" : "Oportunidad"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-[#8E9196]">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{app.studentName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{app.studentEmail}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(app.applicationDate).toLocaleDateString()}
                          </span>
                        </div>
                        {app.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{app.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center mt-2">
                        <Badge className={`ml-2 ${getStatusColor(app.status)}`}>
                          {app.status.toLowerCase() === "aceptado" ||
                          app.status.toLowerCase() === "accepted"
                            ? "Aprobado"
                            : app.status.toLowerCase() === "rechazado" ||
                                app.status.toLowerCase() === "rejected"
                              ? "Rechazado"
                              : "Pendiente"}
                        </Badge>
                      </div>
                      {app.category && (
                        <div className="flex gap-2">
                          <span className="text-xs bg-[#F1F0FB] text-[#8B5CF6] px-2 py-0.5 rounded">
                            {app.category}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>

                      {isCompany &&
                        app.status.toLowerCase() === "pendiente" && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleStatusUpdate(app.id, "Aceptado")
                              }
                              className="text-green-600 hover:text-green-700"
                              disabled={isUpdating}
                            >
                              {isUpdating ? "..." : "✓"}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleStatusUpdate(app.id, "Rechazado")
                              }
                              className="text-red-600 hover:text-red-700"
                              disabled={isUpdating}
                            >
                              {isUpdating ? "..." : "✕"}
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
