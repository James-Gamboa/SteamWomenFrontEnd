"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Building, User } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { toast } from "sonner";

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
  const { login, register } = useAuth();
  const [accountType, setAccountType] = useState<"student" | "company">(
    "student",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await login(formData.email, formData.password, accountType);
        toast.success("¡Bienvenido de nuevo!");
        onClose();
      } else {
        if (!formData.email || !formData.password) {
          setError("Por favor complete todos los campos requeridos");
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError("Por favor ingrese un correo electrónico válido");
          return;
        }

        if (formData.password.length < 6) {
          setError("La contraseña debe tener al menos 6 caracteres");
          return;
        }

        if (accountType === "company" && !formData.organizationName) {
          setError("Por favor ingrese el nombre de la empresa");
          return;
        }

        if (
          accountType === "student" &&
          (!formData.firstName || !formData.lastName)
        ) {
          setError("Por favor ingrese su nombre y apellido");
          return;
        }

        await register({
          ...formData,
          role: accountType,
        });

        toast.success("¡Cuenta creada exitosamente! Por favor inicia sesión.");
        setFormData({
          organizationName: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        onModeChange("login");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al procesar la solicitud";

      if (mode === "register") {
        if (
          errorMessage.toLowerCase().includes("email") ||
          errorMessage.toLowerCase().includes("correo")
        ) {
          setError("Este correo electrónico ya está registrado");
        } else if (errorMessage.toLowerCase().includes("guardar")) {
          setError(
            "Error al guardar los datos. Por favor, intente nuevamente.",
          );
        } else {
          setError(errorMessage || "Error al crear la cuenta");
        }
      } else {
        if (
          errorMessage.toLowerCase().includes("email") ||
          errorMessage.toLowerCase().includes("correo")
        ) {
          setError("El correo electrónico no está registrado");
        } else if (
          errorMessage.toLowerCase().includes("password") ||
          errorMessage.toLowerCase().includes("contraseña")
        ) {
          setError("La contraseña es incorrecta");
        } else {
          setError("El correo electrónico o la contraseña son incorrectos");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-[6px] transition-all" />
      )}
      <DialogContent
        className="max-w-md mx-auto p-0 border-0 z-[110]"
        style={{
          backgroundColor: "#F1F0FB",
          borderRadius: "12px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "700",
            }}
          >
            {mode === "register" ? "Crear cuenta" : "Iniciar sesión"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <div className="mb-6">
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

          {error && (
            <div
              className="mb-4 p-3 rounded-md"
              style={{
                backgroundColor: "#FEE2E2",
                color: "#DC2626",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "14px",
                lineHeight: "18px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  Nombre de la empresa
                </Label>
                <Input
                  id="organizationName"
                  type="text"
                  placeholder="Ingrese el nombre de su empresa"
                  value={formData.organizationName}
                  onChange={(e) =>
                    handleInputChange("organizationName", e.target.value)
                  }
                  required
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                />
              </div>
            )}

            {mode === "register" && accountType === "student" && (
              <>
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
                    type="text"
                    placeholder="Ingrese su nombre"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
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
                    type="text"
                    placeholder="Ingrese su apellido"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#C8C8C9",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  />
                </div>
              </>
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
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
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
                required
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
              disabled={isLoading}
              style={{
                backgroundColor: "#8B5CF6",
                color: "#FFFFFF",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "16px",
                lineHeight: "20px",
                fontWeight: "600",
              }}
            >
              {isLoading
                ? "Cargando..."
                : mode === "register"
                  ? "Registrarse"
                  : "Iniciar Sesión"}
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
