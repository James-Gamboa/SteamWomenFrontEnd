"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AuthModal } from "@/components/organisms/auth-modal";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { MobileMenu } from "@/components/molecules/mobile-menu";
import { useAuth } from "@/lib/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, logout } = useAuth();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleLoginClick = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthMode("register");
    setAuthModalOpen(true);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-between min-w-0">
            <Link
              href="/"
              className="font-bold text-xl transition-colors hover:opacity-80 truncate"
              style={{
                color: "#8B5CF6",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "24px",
                lineHeight: "35px",
                fontWeight: "600",
                maxWidth: "100%",
              }}
            >
              STEAM WOMEN
            </Link>
            <nav className="hidden lg:flex items-center justify-center space-x-8 flex-1 mx-8">
              <Link
                href="/"
                className="transition-colors font-medium hover:opacity-80"
                style={{
                  color: pathname === "/" ? "#8B5CF6" : "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: pathname === "/" ? "600" : "500",
                }}
              >
                Inicio
              </Link>
              <Link
                href="/oportunidades"
                className="transition-colors font-medium hover:opacity-80"
                style={{
                  color: pathname.startsWith("/oportunidades")
                    ? "#8B5CF6"
                    : "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: pathname.startsWith("/oportunidades")
                    ? "600"
                    : "500",
                }}
              >
                Oportunidades
              </Link>
              <Link
                href="/eventos"
                className="transition-colors font-medium hover:opacity-80"
                style={{
                  color: pathname.startsWith("/eventos")
                    ? "#8B5CF6"
                    : "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: pathname.startsWith("/eventos") ? "600" : "500",
                }}
              >
                Eventos
              </Link>
              <Link
                href="/nosotras"
                className="transition-colors font-medium hover:opacity-80"
                style={{
                  color: pathname.startsWith("/nosotras")
                    ? "#8B5CF6"
                    : "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: pathname.startsWith("/nosotras") ? "600" : "500",
                }}
              >
                Nosotras
              </Link>
            </nav>

            <button
              className="block lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              tabIndex={0}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-purple-500" />
              ) : (
                <Menu className="h-6 w-6 text-purple-500" />
              )}
            </button>

            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button
                      className="hover:opacity-90"
                      style={{
                        backgroundColor: "#8B5CF6",
                        color: "#FFFFFF",
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "16px",
                        lineHeight: "20px",
                        fontWeight: "600",
                      }}
                    >
                      Ir al Dashboard
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="hover:opacity-80"
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
                        <User className="h-5 w-5 mr-2" />
                        {user.firstName || user.email}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="hover:opacity-80"
                    onClick={handleLoginClick}
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
                    className="hover:opacity-90"
                    onClick={handleRegisterClick}
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
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogin={handleLoginClick}
        onRegister={handleRegisterClick}
        user={user}
        onLogout={logout}
      />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
}
