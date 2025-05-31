"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}: MobileMenuProps) {
  const pathname = usePathname();
  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Oportunidades", href: "/oportunidades" },
    { label: "Eventos", href: "/eventos" },
    { label: "Nosotras", href: "/nosotras" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Cerrar menú</span>
          </Button>
          <nav className="flex flex-col items-center space-y-6 mb-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`text-lg font-medium px-6 py-2 rounded transition-colors w-full text-center ${
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-purple-500 font-semibold bg-purple-50"
                    : "text-gray-900 hover:text-purple-500"
                }`}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            <Button
              variant="outline"
              className="w-full hover:opacity-80"
              onClick={() => {
                onLogin();
                onClose();
              }}
              style={{
                color: "#1A1F2C",
                borderColor: "#C8C8C9",
                backgroundColor: "transparent",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "16px",
                lineHeight: "20px",
                fontWeight: "600",
              }}
            >
              Iniciar sesión
            </Button>
            <Button
              className="w-full hover:opacity-90"
              onClick={() => {
                onRegister();
                onClose();
              }}
              style={{
                backgroundColor: "#8B5CF6",
                color: "#FFFFFF",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "16px",
                lineHeight: "20px",
                fontWeight: "600",
              }}
            >
              Registrarse
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
