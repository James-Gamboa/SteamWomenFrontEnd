"use client"
import { useState } from "react";
import { Sidebar } from "@/components/organisms/dashboard/sidebar";
import { DashboardHeader } from "@/components/organisms/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F7FC] dark:bg-[#18192A]">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-8 mt-16">
          <div className="container mx-auto space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}