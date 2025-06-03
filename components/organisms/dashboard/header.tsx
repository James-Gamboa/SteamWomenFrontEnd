"use client";

import { Menu } from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  onLogout: () => void;
}

export function DashboardHeader({ onMenuClick, onLogout }: DashboardHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#1A1F2C] border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          onClick={onLogout}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
} 