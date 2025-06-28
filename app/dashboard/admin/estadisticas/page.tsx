"use client";

import { useEffect, useState } from "react";
import { Users, User, Briefcase, Calendar, ClipboardList } from "lucide-react";
import { eventsData } from "@/lib/events-data";
import { opportunitiesEventsData } from "@/lib/opportunities-events-data";
import { getItems } from "@/lib/data-storage";
import { storageUtils } from "@/lib/local-storage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { GET_DASHBOARD_STATS } from "@/backend-integration/graphql/queries";

// TODO: Reemplazar con conexión a Django

const AdminEstadisticasPage = () => {
  const [stats, setStats] = useState({
    total: 0,
    admins: 0,
    companies: 0,
    students: 0,
    events: 0,
    opportunities: 0,
    applications: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [graphqlError, setGraphqlError] = useState<string | null>(null);
  const router = useRouter();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      toast.error("Acceso denegado");
      router.push("/dashboard");
      return;
    }

    const loadStats = async () => {
      try {
        setIsLoading(true);
        setGraphqlError(null);
        const graphqlResult = GET_DASHBOARD_STATS;
        const userStats = storageUtils.getStats();
        const localItems = getItems();
        const eventsCount =
          eventsData.length +
          localItems.filter((item) => item.type === "event").length;
        const opportunitiesCount =
          opportunitiesEventsData.length +
          localItems.filter((item) => item.type === "opportunity").length;
        const applicationsCount = JSON.parse(
          localStorage.getItem("applications") || "[]",
        ).length;

        setStats({
          ...userStats,
          events: eventsCount,
          opportunities: opportunitiesCount,
          applications: applicationsCount,
        });
      } catch (error) {
        setGraphqlError("Error loading statistics from GraphQL");
        const userStats = storageUtils.getStats();
        const localItems = getItems();
        const eventsCount =
          eventsData.length +
          localItems.filter((item) => item.type === "event").length;
        const opportunitiesCount =
          opportunitiesEventsData.length +
          localItems.filter((item) => item.type === "opportunity").length;
        const applicationsCount = JSON.parse(
          localStorage.getItem("applications") || "[]",
        ).length;

        setStats({
          ...userStats,
          events: eventsCount,
          opportunities: opportunitiesCount,
          applications: applicationsCount,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [currentUser, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Cargando estadísticas...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-8">
      {graphqlError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {graphqlError}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6">Estadísticas Generales</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-[#232347] shadow p-6 flex items-center gap-4">
          <Users className="h-10 w-10 text-purple-600" />
          <div>
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-gray-500">Usuarios totales</div>
          </div>
        </Card>
        <Card className="bg-white dark:bg-[#232347] shadow p-6 flex items-center gap-4">
          <User className="h-10 w-10 text-green-600" />
          <div>
            <div className="text-3xl font-bold">{stats.students}</div>
            <div className="text-gray-500">Estudiantes</div>
          </div>
        </Card>
        <Card className="bg-white dark:bg-[#232347] shadow p-6 flex items-center gap-4">
          <Briefcase className="h-10 w-10 text-blue-600" />
          <div>
            <div className="text-3xl font-bold">{stats.companies}</div>
            <div className="text-gray-500">Empresas</div>
          </div>
        </Card>
        <Card className="bg-white dark:bg-[#232347] shadow p-6 flex items-center gap-4">
          <User className="h-10 w-10 text-purple-700" />
          <div>
            <div className="text-3xl font-bold">{stats.admins}</div>
            <div className="text-gray-500">Administradores</div>
          </div>
        </Card>
        <Card className="bg-white dark:bg-[#232347] shadow p-6 flex items-center gap-4">
          <Calendar className="h-10 w-10 text-pink-600" />
          <div>
            <div className="text-3xl font-bold">{stats.events}</div>
            <div className="text-gray-500">Eventos creados</div>
          </div>
        </Card>
        <Card className="bg-white dark:bg-[#232347] shadow p-6 flex items-center gap-4">
          <ClipboardList className="h-10 w-10 text-yellow-600" />
          <div>
            <div className="text-3xl font-bold">{stats.opportunities}</div>
            <div className="text-gray-500">Oportunidades creadas</div>
          </div>
        </Card>
        <Card className="bg-white dark:bg-[#232347] shadow p-6 flex items-center gap-4">
          <ClipboardList className="h-10 w-10 text-cyan-600" />
          <div>
            <div className="text-3xl font-bold">{stats.applications}</div>
            <div className="text-gray-500">Postulaciones registradas</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminEstadisticasPage;
