import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Briefcase, Users, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-[#8B5CF6] mb-2">
          ¡Bienvenido a tu Dashboard!
        </h1>
        <p className="text-[#8E9196] text-lg">
          Aquí podrás gestionar tus eventos y oportunidades
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl shadow-lg transition hover:scale-105 border border-[#ede9fe]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Eventos Activos</CardTitle>
            <Calendar className="h-5 w-5 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">12</div>
            <p className="text-xs text-[#C8C8C9]">+2 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-lg transition hover:scale-105 border border-[#ede9fe]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Oportunidades</CardTitle>
            <Briefcase className="h-5 w-5 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">8</div>
            <p className="text-xs text-[#C8C8C9]">+3 nuevas esta semana</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-lg transition hover:scale-105 border border-[#ede9fe]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Participantes</CardTitle>
            <Users className="h-5 w-5 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">245</div>
            <p className="text-xs text-[#C8C8C9]">+12% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-lg transition hover:scale-105 border border-[#ede9fe]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Tasa de Éxito</CardTitle>
            <TrendingUp className="h-5 w-5 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">89%</div>
            <p className="text-xs text-[#C8C8C9]">+4% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-4 rounded-xl shadow-lg border border-[#ede9fe]">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-[#C8C8C9]">No hay actividad reciente</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 rounded-xl shadow-lg border border-[#ede9fe]">
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-[#C8C8C9]">No hay eventos próximos</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
