"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/organisms/dashboard/sidebar";
import { useAuth } from "@/lib/context/auth-context";
import { redirect, useRouter } from "next/navigation";
import { Menu, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useStorageMonitor } from "@/hooks/use-storage-monitor";

const AdminRouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user && user.role !== "admin") {
      alert("Acceso denegado: No tienes permisos para ver este panel.");
      router.replace("/home");
    }
  }, [user, isLoading, router]);

  if (isLoading) return null;
  if (!user || user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="text-xl font-bold text-red-600">
          Acceso denegado: No tienes permisos para ver este panel.
        </span>
      </div>
    );
  }
  return <>{children}</>;
};

const StorageWarningBanner = () => {
  const { isWarning, isCritical, storageInfo } = useStorageMonitor();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || (!isWarning && !isCritical)) return null;

  const getAlertVariant = () => {
    if (isCritical) return "destructive";
    return "default";
  };

  const getMessage = () => {
    if (isCritical) {
      return `¡Almacenamiento crítico! (${storageInfo.percentage.toFixed(1)}% usado). Limpia datos antiguos para evitar errores.`;
    }
    return `Almacenamiento bajo (${storageInfo.percentage.toFixed(1)}% usado). Considera limpiar datos antiguos.`;
  };

  return (
    <Alert variant={getAlertVariant()} className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="flex-1">{getMessage()}</AlertDescription>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(false)}
        className="ml-2"
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, [user]);

  if (!user) return null;

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const isAdminRoute = pathname.startsWith("/dashboard/admin");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        <div className="hidden md:flex md:w-64 md:flex-col">
          <Sidebar />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-10 bg-white border-b px-4 py-3 md:hidden">
            <div className="flex items-center justify-between">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                </SheetContent>
              </Sheet>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              <StorageWarningBanner />
              {isAdminRoute ? (
                <AdminRouteGuard>{children}</AdminRouteGuard>
              ) : (
                children
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
