"use client";

import { useAuth } from "@/lib/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Lightbulb, User } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  const studentDashboard = (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
          Bienvenida, {user?.firstName || "Estudiante"}
        </h1>
        <p className="text-[#C8C8C9] mt-2">
          Encuentra oportunidades y eventos para impulsar tu carrera en STEAM
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
            <Briefcase className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Explora</div>
            <p className="text-xs text-[#C8C8C9] mt-1">
              Descubre nuevas oportunidades laborales
            </p>
            <Button asChild className="mt-4 w-full bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Link href="/oportunidades">Ver Oportunidades</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Participa</div>
            <p className="text-xs text-[#C8C8C9] mt-1">
              Únete a eventos y networking
            </p>
            <Button asChild className="mt-4 w-full bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Link href="/eventos">Ver Eventos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const companyDashboard = (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
          Bienvenida, {user?.firstName || "Empresa"}
        </h1>
        <p className="text-[#C8C8C9] mt-2">
          Gestiona tus oportunidades y encuentra talento STEAM
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
            <Briefcase className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Gestiona</div>
            <p className="text-xs text-[#C8C8C9] mt-1">
              Crea y administra tus ofertas
            </p>
            <Button asChild className="mt-4 w-full bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Link href="/dashboard/oportunidades">Ver Oportunidades</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidatos</CardTitle>
            <User className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Revisa</div>
            <p className="text-xs text-[#C8C8C9] mt-1">
              Gestiona las postulaciones recibidas
            </p>
            <Button asChild className="mt-4 w-full bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Link href="/dashboard/oportunidades-aplicadas">Ver Candidatos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Organiza</div>
            <p className="text-xs text-[#C8C8C9] mt-1">
              Crea y gestiona tus eventos
            </p>
            <Button asChild className="mt-4 w-full bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Link href="/dashboard/eventos">Ver Eventos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const adminDashboard = (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
          Panel de Administración
        </h1>
        <p className="text-[#C8C8C9] mt-2">
          Gestiona usuarios, oportunidades y eventos
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <User className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Gestiona</div>
            <p className="text-xs text-[#C8C8C9] mt-1">
              Administra usuarios y roles
            </p>
            <Button asChild className="mt-4 w-full bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Link href="/dashboard/usuarios">Ver Usuarios</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
            <Briefcase className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Modera</div>
            <p className="text-xs text-[#C8C8C9] mt-1">
              Revisa y gestiona ofertas
            </p>
            <Button asChild className="mt-4 w-full bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Link href="/dashboard/oportunidades">Ver Oportunidades</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Supervisa</div>
            <p className="text-xs text-[#C8C8C9] mt-1">
              Gestiona eventos y contenido
            </p>
            <Button asChild className="mt-4 w-full bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Link href="/dashboard/eventos">Ver Eventos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (!user) return null;

  switch (user.role) {
    case "student":
      return studentDashboard;
    case "company":
      return companyDashboard;
    case "admin":
      return adminDashboard;
    default:
      return null;
  }
}
