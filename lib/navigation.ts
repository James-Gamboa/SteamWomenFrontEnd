import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  User,
  Home,
  Users,
  FileText,
  Building2,
  GraduationCap,
  BarChart3,
  ClipboardList,
  Lightbulb,
  Settings,
} from "lucide-react";

export const navigationByRole = {
  company: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Mis Oportunidades",
      href: "/dashboard/oportunidades",
      icon: Briefcase,
    },
    {
      name: "Crear Oportunidad",
      href: "/dashboard/oportunidades/crear",
      icon: FileText,
    },
    {
      name: "Candidatos Postulados",
      href: "/dashboard/oportunidades-aplicadas",
      icon: Users,
    },
    {
      name: "Mis Eventos",
      href: "/dashboard/eventos",
      icon: Calendar,
    },
    {
      name: "Estadísticas",
      href: "/dashboard/estadisticas",
      icon: BarChart3,
    },
    {
      name: "Perfil",
      href: "/dashboard/perfil",
      icon: User,
    },
  ],
  student: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Mis Postulaciones",
      href: "/dashboard/oportunidades-aplicadas",
      icon: ClipboardList,
    },
    {
      name: "Eventos Inscritos",
      href: "/dashboard/eventos-inscritos",
      icon: Calendar,
    },
    {
      name: "Perfil",
      href: "/dashboard/perfil",
      icon: User,
    },
  ],
  admin: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Usuarios",
      href: "/dashboard/usuarios",
      icon: Users,
    },
    {
      name: "Oportunidades",
      href: "/dashboard/oportunidades",
      icon: Briefcase,
    },
    {
      name: "Eventos",
      href: "/dashboard/eventos",
      icon: Calendar,
    },
    {
      name: "Postulaciones",
      href: "/dashboard/postulaciones",
      icon: ClipboardList,
    },
    {
      name: "Configuración",
      href: "/dashboard/configuracion",
      icon: Settings,
    },
  ],
}; 