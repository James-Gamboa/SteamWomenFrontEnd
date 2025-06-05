import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  User,
  Users,
  FileText,
  ClipboardList,
  Home,
} from "lucide-react";

export const navigationByRole = {
  company: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Mis Eventos",
      href: "/dashboard/eventos",
      icon: Calendar,
    },
    {
      title: "Mis Oportunidades",
      href: "/dashboard/oportunidades",
      icon: Briefcase,
    },
    {
      title: "Ver Candidatos",
      href: "/dashboard/postulaciones-aplicadas",
      icon: FileText,
    },
    {
      title: "Mi Perfil",
      href: "/dashboard/perfil",
      icon: User,
    },
    {
      title: "Volver al inicio",
      href: "/",
      icon: Home,
    },
  ],
  student: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Mis Postulaciones",
      href: "/dashboard/oportunidades-aplicadas",
      icon: ClipboardList,
    },
    {
      title: "Eventos Inscritos",
      href: "/dashboard/eventos-inscritos",
      icon: Calendar,
    },
    {
      title: "Perfil",
      href: "/dashboard/perfil",
      icon: User,
    },
    {
      title: "Volver al inicio",
      href: "/",
      icon: Home,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Gestión de Usuarios",
      href: "/dashboard/admin/usuarios",
      icon: Users,
    },
    {
      title: "Estadísticas",
      href: "/dashboard/admin/estadisticas",
      icon: ClipboardList,
    },
    {
      title: "Configuración",
      href: "/dashboard/admin/configuracion",
      icon: User,
    },
    {
      title: "Volver al inicio",
      href: "/",
      icon: Home,
    },
  ],
}; 