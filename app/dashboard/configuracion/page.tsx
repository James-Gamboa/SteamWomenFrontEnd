"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ConfiguracionPage() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
          Configuración
        </h1>
        <p className="text-[#C8C8C9] mt-2">
          Configura los parámetros del sistema
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo Mantenimiento</Label>
                <p className="text-sm text-[#C8C8C9]">
                  Activa el modo mantenimiento para realizar actualizaciones
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Registro de Usuarios</Label>
                <p className="text-sm text-[#C8C8C9]">
                  Permite el registro de nuevos usuarios
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones por Email</Label>
                <p className="text-sm text-[#C8C8C9]">
                  Habilita el envío de notificaciones por correo
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuración de Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-server">Servidor SMTP</Label>
              <Input id="smtp-server" placeholder="smtp.example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">Puerto SMTP</Label>
              <Input id="smtp-port" placeholder="587" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-user">Usuario SMTP</Label>
              <Input id="smtp-user" placeholder="user@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-password">Contraseña SMTP</Label>
              <Input id="smtp-password" type="password" />
            </div>
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
              Guardar Configuración
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
