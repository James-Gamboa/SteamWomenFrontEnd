"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  X,
  Home,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Calendar,
  Briefcase,
  User,
  Users,
  FileText,
  Building2,
  GraduationCap,
  BarChart3,
  ClipboardList,
  Lightbulb,
  Settings,
  Plus,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { toast } from "sonner";
import { getRoleLabel } from "@/utils/role-label";
import { navigationByRole } from "@/lib/navigation";

// TODO: Reemplazar con conexión a Django

interface SidebarProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onLogout?: () => void;
}

export function Sidebar({ open, setOpen, onLogout }: SidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("¡Sesión cerrada exitosamente!", {
      style: {
        backgroundColor: "#F1F0FB",
        color: "#1A1F2C",
        fontFamily: "DM Sans, sans-serif",
        fontSize: "14px",
        lineHeight: "18px",
        fontWeight: "500",
      },
    });
    router.push("/");
  };

  if (!user) return null;

  const navigation = navigationByRole[user.role] || [];

  const Drawer = (
    <div
      className={cn(
        "fixed inset-0 z-40 flex md:hidden transition-all",
        open ? "" : "pointer-events-none",
      )}
    >
      <div
        className={cn(
          "fixed inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={() => setOpen?.(false)}
        aria-label="Cerrar menú"
        tabIndex={open ? 0 : -1}
      />
      <aside
        className={cn(
          "relative w-64 bg-white dark:bg-[#1A1F2C] border-r border-gray-100 dark:border-gray-800 shadow-md flex flex-col py-6 px-2 min-h-full transform transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center mb-8 px-4 pt-8 justify-between">
          <span className="text-2xl font-extrabold text-[#8B5CF6] tracking-wide">
            STEAMWomen
          </span>
          <button
            className="md:hidden p-2 rounded hover:bg-[#ede9fe]"
            onClick={() => setOpen?.(false)}
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
                key={item.title}
                href={item.href}
                onClick={() => {
                  router.push(item.href);
                  if (setOpen) setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors",
                  isActive
                    ? "bg-[#8B5CF6] text-white shadow"
                    : "text-[#1A1F2C] dark:text-[#C8C8C9] hover:bg-[#ede9fe] dark:hover:bg-[#2a2342]",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-2 px-4 pb-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#8B5CF6] font-bold text-lg py-2"
            onClick={() => {
              router.push("/");
              if (setOpen) setOpen(false);
            }}
          >
            <Home className="h-5 w-5" />
            Volver al Home
          </Link>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-[#8B5CF6] hover:bg-[#ede9fe] py-2"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </Button>
        </div>
      </aside>
    </div>
  );

  const FixedSidebar = (
    <aside
      className={cn(
        "hidden md:flex bg-white dark:bg-[#1A1F2C] border-r border-gray-100 dark:border-gray-800 shadow-md flex-col py-0 min-h-screen transition-all duration-300",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex flex-col items-center gap-2 py-8 px-4 bg-[#F1F0FB] dark:bg-[#232347] border-b border-gray-100 dark:border-gray-800">
        <span
          className={cn(
            "font-extrabold text-[#8B5CF6] tracking-wide transition-all duration-300",
            collapsed ? "text-xl" : "text-3xl",
          )}
        >
          SW
        </span>
        {user && !collapsed && (
          <div className="flex flex-col items-center mt-2">
            <div className="w-12 h-12 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white text-xl font-bold mb-1">
              {(user.firstName
                ? user.firstName[0]
                : user.email[0]
              ).toUpperCase()}
            </div>
            <span className="text-base font-semibold text-[#1A1F2C] dark:text-white">
              {user.firstName
                ? `${user.firstName} ${user.lastName || ""}`.trim()
                : user.email}
            </span>
            <span className="text-xs text-[#8B5CF6] font-medium capitalize">
              {getRoleLabel(user.role)}
            </span>
          </div>
        )}
      </div>
      <div className="border-b border-gray-100 dark:border-gray-800 my-2" />
      <nav className="flex-1 space-y-1 px-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors",
                isActive
                  ? "bg-[#8B5CF6] text-white shadow"
                  : "text-[#1A1F2C] dark:text-[#C8C8C9] hover:bg-[#ede9fe] dark:hover:bg-[#2a2342]",
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-4 py-4 border-t border-gray-100 dark:border-gray-800">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-center gap-2 text-[#8B5CF6] hover:bg-[#ede9fe] py-2"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
          {!collapsed && <span>Colapsar</span>}
        </Button>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-center gap-2 text-[#8B5CF6] hover:bg-[#ede9fe] py-2 mt-2"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Cerrar sesión</span>}
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
