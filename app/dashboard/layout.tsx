"use client"
import { useState, useRef } from "react";
import { Sidebar } from "@/components/organisms/dashboard/sidebar";
import { DashboardHeader } from "@/components/organisms/dashboard/header";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { toast, Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();
  const toastShown = useRef(false);

  const handleLogout = () => {
    if (toastShown.current) return;
    toastShown.current = true;
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
    setTimeout(() => {
      toastShown.current = false;
      router.push("/");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7FC] dark:bg-[#18192A]">
      <Toaster position="top-center" />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-8 mt-16">
          <div className="container mx-auto space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}