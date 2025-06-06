"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// TODO: Reemplazar con conexión a Django

export default function AdminSetup() {
  const [isLoading, setIsLoading] = useState(false);

  const createPrimaryAdmin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/create-first-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Admin primario creado exitosamente");
        console.log("Admin creado:", data);
      } else {
        toast.error(data.error || "Error al crear el admin");
      }
    } catch (error) {
      toast.error("Error al crear el admin");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Configuración del Admin Primario
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Credenciales predefinidas:
            <br />
            Email: jjguevarag@gmail.com
            <br />
            Contraseña: admin
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Button
            onClick={createPrimaryAdmin}
            disabled={isLoading}
            className="w-full"
            style={{
              backgroundColor: "#8B5CF6",
              color: "#FFFFFF",
            }}
          >
            {isLoading ? "Creando..." : "Crear Admin Primario"}
          </Button>
        </div>
      </div>
    </div>
  );
} 