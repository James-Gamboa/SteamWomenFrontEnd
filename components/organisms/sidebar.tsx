"use client";

import { useAuth } from "@/lib/context/auth-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LayoutDashboard, Calendar, Briefcase, User, FileText, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onLogout?: () => void;
}

const iconMap = {
  LayoutDashboard,
  Calendar,
  Briefcase,
  User,
  FileText,
  Users,
};

export function Sidebar({ className, open, setOpen, onLogout }: SidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!user) return null;

  const navigation = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "LayoutDashboard",
      roles: ["student", "company", "admin"],
    },
    {
      title: "Mi Perfil",
      href: "/dashboard/perfil",
      icon: "User",
      roles: ["student", "company", "admin"],
    },
    {
      title: "Mis Eventos",
      href: "/dashboard/eventos",
      icon: "Calendar",
      roles: ["company"],
    },
    {
      title: "Mis Oportunidades",
      href: "/dashboard/oportunidades",
      icon: "Briefcase",
      roles: ["company"],
    },
    {
      title: "Mis Postulaciones",
      href: "/dashboard/postulaciones",
      icon: "FileText",
      roles: ["student"],
    },
    {
      title: "Eventos",
      href: "/eventos",
      icon: "Calendar",
      roles: ["student"],
    },
    {
      title: "Oportunidades",
      href: "/oportunidades",
      icon: "Briefcase",
      roles: ["student"],
    },
    {
      title: "Usuarios",
      href: "/dashboard/usuarios",
      icon: "Users",
      roles: ["admin"],
    },
    {
      title: "Eventos",
      href: "/dashboard/eventos",
      icon: "Calendar",
      roles: ["admin"],
    },
    {
      title: "Oportunidades",
      href: "/dashboard/oportunidades",
      icon: "Briefcase",
      roles: ["admin"],
    },
    {
      title: "Postulaciones",
      href: "/dashboard/postulaciones",
      icon: "FileText",
      roles: ["admin"],
    },
  ];

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(user.role)
  );

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 py-4">
        <ScrollArea className="h-full">
          <div className="space-y-1 px-2">
            {filteredNavigation.map((item) => (
              <Button
                key={item.href}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start flex items-center gap-3 px-4 py-2 text-base font-medium",
                  pathname === item.href && "bg-[#F1F0FB] text-[#8B5CF6]"
                )}
              >
                <Link href={item.href} passHref legacyBehavior>
                  <a className="flex items-center gap-3 w-full">
                    {item.icon && (() => {
                      const Icon = iconMap[item.icon as keyof typeof iconMap];
                      return Icon ? <Icon className="h-5 w-5" /> : null;
                    })()}
                    <span className="whitespace-nowrap">{item.title}</span>
                  </a>
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="p-4 border-t">
        <div className="space-y-2">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-[#8E9196] hover:text-[#1A1F2C] hover:bg-[#F1F0FB] flex items-center gap-3 px-4 py-2 text-base font-medium"
          >
            <Link href="/" passHref legacyBehavior>
              <a className="flex items-center gap-3 w-full">
                <span className="whitespace-nowrap">Volver al Inicio</span>
              </a>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-[#8E9196] hover:text-[#1A1F2C] hover:bg-[#F1F0FB] flex items-center gap-3 px-4 py-2 text-base font-medium"
            onClick={onLogout}
          >
            <span className="whitespace-nowrap">Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:w-72 lg:pt-5 lg:pb-4 lg:bg-white lg:border-r">
        <div className="flex flex-col flex-grow">
          <div className="flex items-center flex-shrink-0 px-6">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#8B5CF6]">SteamWomen</span>
            </Link>
          </div>
          <NavContent />
        </div>
      </div>

      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden fixed top-4 left-4 z-50"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <div className="flex items-center flex-shrink-0 px-6 py-4">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#8B5CF6]">SteamWomen</span>
            </Link>
          </div>
          <NavContent />
        </SheetContent>
      </Sheet>
    </>
  );
} 