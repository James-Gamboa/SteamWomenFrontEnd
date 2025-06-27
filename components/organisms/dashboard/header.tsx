"use client";

import { Menu } from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#1A1F2C] border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
        >
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </header>
  );
}
