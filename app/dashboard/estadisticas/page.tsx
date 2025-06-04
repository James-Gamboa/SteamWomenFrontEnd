"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth-context";

export default function EstadisticasPage() {
  const { user } = useAuth();

  if (!user || user.role !== "company") return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
          Estadísticas
        </h1>
        <p className="text-[#C8C8C9] mt-2">
          Métricas y análisis de tus oportunidades
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Postulaciones Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#8B5CF6]">0</p>
            <p className="text-[#C8C8C9] text-sm">Total de candidatos postulados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Oportunidades Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#8B5CF6]">0</p>
            <p className="text-[#C8C8C9] text-sm">Oportunidades publicadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vistas Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#8B5CF6]">0</p>
            <p className="text-[#C8C8C9] text-sm">Visualizaciones de tus oportunidades</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 