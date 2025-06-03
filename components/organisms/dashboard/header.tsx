"use client";

import { Menu } from "lucide-react";

export function DashboardHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="fixed left-0 top-0 w-full z-30 flex items-center bg-white dark:bg-[#1A1F2C] border-b border-gray-100 dark:border-gray-800 h-16 px-4 md:ml-64 shadow-sm">
      {onMenuClick && (
        <button
          className="md:hidden mr-2 p-2 rounded hover:bg-[#ede9fe]"
          onClick={onMenuClick}
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6 text-[#8B5CF6]" />
        </button>
      )}
      <span className="text-xl font-extrabold text-[#8B5CF6] tracking-wide md:hidden">STEAMWomen</span>
    </header>
  );
} 