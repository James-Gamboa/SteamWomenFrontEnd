"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Building } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
}

export function AuthModal({
  isOpen,
  onClose,
  mode,
  onModeChange,
}: AuthModalProps) {
  const [accountType, setAccountType] = useState<"student" | "company">(
    "company",
  );
  const [formData, setFormData] = useState({
    organizationName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { accountType, ...formData, mode });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md mx-auto p-0 border-0"
        style={{
          backgroundColor: "#F1F0FB",
          borderRadius: "12px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <div className="p-8">
          <DialogHeader className="text-center mb-8">
            <DialogTitle asChild>
              <h2
                className="mb-4"
                style={{
                  fontSize: "32px",
                  lineHeight: "40px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                {mode === "register" ? "Crear Cuenta" : "Iniciar Sesión"}
              </h2>
            </DialogTitle>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                color: "#8E9196",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "400",
              }}
            >
              {mode === "register"
                ? "Únete a la comunidad y accede a oportunidades exclusivas"
                : "Accede a tu cuenta y continúa tu crecimiento profesional"}
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                className="mb-4 block"
                style={{
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                Tipo de cuenta
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAccountType("student")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    accountType === "student"
                      ? "border-purple-500"
                      : "border-gray-200"
                  }`}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor:
                      accountType === "student" ? "#8B5CF6" : "#C8C8C9",
                  }}
                >
                  <GraduationCap
                    className="h-6 w-6 mx-auto mb-2"
                    style={{
                      color: accountType === "student" ? "#8B5CF6" : "#8E9196",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      lineHeight: "18px",
                      color: accountType === "student" ? "#8B5CF6" : "#8E9196",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "500",
                    }}
                  >
                    Estudiante
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType("company")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    accountType === "company"
                      ? "border-purple-500"
                      : "border-gray-200"
                  }`}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor:
                      accountType === "company" ? "#8B5CF6" : "#C8C8C9",
                  }}
                >
                  <Building
                    className="h-6 w-6 mx-auto mb-2"
                    style={{
                      color: accountType === "company" ? "#8B5CF6" : "#8E9196",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      lineHeight: "18px",
                      color: accountType === "company" ? "#8B5CF6" : "#8E9196",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "500",
                    }}
                  >
                    Empresa
                  </span>
                </button>
              </div>
            </div>

            {mode === "register" && accountType === "company" && (
              <div>
                <Label
                  htmlFor="organizationName"
                  className="mb-2 block"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#1A1F2C",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "600",
                  }}
                >
                  Nombre de la organización
                </Label>
                <Input
                  id="organizationName"
                  placeholder="Nombre de tu empresa u organización"
                  value={formData.organizationName}
                  onChange={(e) =>
                    handleInputChange("organizationName", e.target.value)
                  }
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                />
              </div>
            )}

            {mode === "register" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="mb-2 block"
                    style={{
                      fontSize: "14px",
                      lineHeight: "18px",
                      color: "#1A1F2C",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    Nombre
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Tu nombre"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#C8C8C9",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="mb-2 block"
                    style={{
                      fontSize: "14px",
                      lineHeight: "18px",
                      color: "#1A1F2C",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    Apellido
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Tu apellido"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#C8C8C9",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <Label
                htmlFor="email"
                className="mb-2 block"
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#C8C8C9",
                  fontFamily: "DM Sans, sans-serif",
                }}
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="mb-2 block"
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#C8C8C9",
                  fontFamily: "DM Sans, sans-serif",
                }}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 border-0"
              style={{
                backgroundColor: "#8B5CF6",
                color: "#FFFFFF",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "16px",
                lineHeight: "20px",
                fontWeight: "600",
              }}
            >
              {mode === "register" ? "Registrarse" : "Iniciar Sesión"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() =>
                  onModeChange(mode === "register" ? "login" : "register")
                }
                className="transition-colors hover:opacity-80"
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#8E9196",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {mode === "register" ? (
                  <>
                    ¿Ya tienes cuenta?{" "}
                    <span style={{ color: "#8B5CF6", fontWeight: "600" }}>
                      Inicia Sesión
                    </span>
                  </>
                ) : (
                  <>
                    ¿No tienes cuenta?{" "}
                    <span style={{ color: "#8B5CF6", fontWeight: "600" }}>
                      Registrarse
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
