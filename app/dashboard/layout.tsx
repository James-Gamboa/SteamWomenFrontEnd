"use client"

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/organisms/dashboard/sidebar";
import { useAuth } from "@/lib/context/auth-context";
import { redirect } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, [user]);

  if (!user) return null;

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
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}