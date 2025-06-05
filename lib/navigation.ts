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
import { title } from "process";

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
      title: "Usuarios",
      href: "/dashboard/usuarios",
      icon: Users,
    },
    {
      title: "Eventos",
      href: "/dashboard/eventos",
      icon: Calendar,
    },
    {
      title: "Oportunidades",
      href: "/dashboard/oportunidades",
      icon: Briefcase,
    },
    {
      title: "Postulaciones",
      href: "/dashboard/postulaciones",
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
}; 