"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { AuthModal } from "@/components/organisms/auth-modal"

export function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("register")

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10

      setPrevScrollPos(currentScrollPos)
      setVisible(isVisible)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  const handleLoginClick = () => {
    setAuthMode("login")
    setAuthModalOpen(true)
  }

  const handleRegisterClick = () => {
    setAuthMode("register")
    setAuthModalOpen(true)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 shadow-sm transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-bold text-xl transition-colors hover:opacity-80"
              style={{
                color: "#8B5CF6",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "24px",
                lineHeight: "35px",
                fontWeight: "600",
              }}
            >
              STEAMWOMEN
            </Link>

            <nav className="hidden md:flex items-center justify-center space-x-8 flex-1 mx-8">
              <Link
                href="/"
                className="transition-colors font-medium hover:opacity-80"
                style={{
                  color: "#8B5CF6",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: "500",
                }}
              >
                Inicio
              </Link>
              <Link
                href="/oportunidades"
                className="transition-colors font-medium hover:opacity-80"
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: "500",
                }}
              >
                Oportunidades
              </Link>
              <Link
                href="/eventos"
                className="transition-colors font-medium hover:opacity-80"
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: "500",
                }}
              >
                Eventos
              </Link>
              <Link
                href="/nosotras"
                className="transition-colors font-medium hover:opacity-80"
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: "500",
                }}
              >
                Nosotras
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
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
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}
