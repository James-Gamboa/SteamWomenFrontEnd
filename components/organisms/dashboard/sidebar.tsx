"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  User,
  LogOut,
  X,
  Home,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Eventos",
    href: "/dashboard/eventos",
    icon: Calendar,
  },
  {
    name: "Oportunidades",
    href: "/dashboard/oportunidades",
    icon: Briefcase,
  },
  {
    name: "Perfil",
    href: "/dashboard/perfil",
    icon: User,
  },
];

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) {
  const pathname = usePathname();

  const handleNavClick = () => setOpen(false);

  const Drawer = (
    <div className={cn(
      "fixed inset-0 z-40 flex md:hidden transition-all",
      open ? "" : "pointer-events-none"
    )}>
      <div
        className={cn(
          "fixed inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={() => setOpen(false)}
        aria-label="Cerrar menú"
        tabIndex={open ? 0 : -1}
      />
      <aside
        className={cn(
          "relative w-64 bg-white dark:bg-[#1A1F2C] border-r border-gray-100 dark:border-gray-800 shadow-md flex flex-col py-6 px-2 min-h-full transform transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center mb-8 px-4 pt-8 justify-between">
          <span className="text-2xl font-extrabold text-[#8B5CF6] tracking-wide">STEAMWomen</span>
          <button
            className="md:hidden p-2 rounded hover:bg-[#ede9fe]"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors",
                  isActive
                    ? "bg-[#8B5CF6] text-white shadow"
                    : "text-[#1A1F2C] dark:text-[#C8C8C9] hover:bg-[#ede9fe] dark:hover:bg-[#2a2342]"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 flex flex-col gap-2 md:hidden px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#8B5CF6] font-bold text-lg py-2"
            onClick={handleNavClick}
          >
            <Home className="h-5 w-5" />
            Volver al Home
          </Link>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-[#8B5CF6] hover:bg-[#ede9fe] py-2"
            onClick={() => {
              setOpen(false);
              // lógica de logout aquí
            }}
          >
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </Button>
        </div>
      </aside>
    </div>
  );

  const FixedSidebar = (
    <aside className="hidden md:flex w-64 bg-white dark:bg-[#1A1F2C] border-r border-gray-100 dark:border-gray-800 shadow-md flex-col py-6 px-2 min-h-screen">
      <div className="flex flex-col gap-2 mb-8 px-4 pt-8">
        <span className="text-2xl font-extrabold text-[#8B5CF6] tracking-wide">STEAMWomen</span>
        <Link
          href="/"
          className="flex items-center gap-2 text-[#8B5CF6] font-bold text-lg py-2"
        >
          <Home className="h-5 w-5" />
          Volver al Home
        </Link>
      </div>
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors",
                isActive
                  ? "bg-[#8B5CF6] text-white shadow"
                  : "text-[#1A1F2C] dark:text-[#C8C8C9] hover:bg-[#ede9fe] dark:hover:bg-[#2a2342]"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-4 hidden md:flex">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-[#8B5CF6] hover:bg-[#ede9fe] py-2"
          onClick={() => {
            // lógica de logout aquí
          }}
        >
          <LogOut className="h-5 w-5" />
          Cerrar sesión
        </Button>
      </div>
    </aside>
  );

  return (
    <>
      {Drawer}
      {FixedSidebar}
    </>
  );
} 