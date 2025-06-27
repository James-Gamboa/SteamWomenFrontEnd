"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export function GlobalToasts() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("showLogoutToast")) {
        toast.success("¡Sesión cerrada exitosamente!", {
          style: {
            backgroundColor: "#F1F0FB",
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: "500",
          },
        });
        localStorage.removeItem("showLogoutToast");
      }
      if (localStorage.getItem("showLoginToast")) {
        toast.success("¡Bienvenido de nuevo!", {
          style: {
            backgroundColor: "#F1F0FB",
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: "500",
          },
        });
        localStorage.removeItem("showLoginToast");
      }
      if (localStorage.getItem("showRegisterToast")) {
        toast.success("¡Cuenta creada exitosamente! Por favor inicia sesión.", {
          style: {
            backgroundColor: "#F1F0FB",
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: "500",
          },
        });
        localStorage.removeItem("showRegisterToast");
      }
    }
  }, []);
  return null;
}
