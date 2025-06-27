"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/context/auth-context";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PerfilPage() {
  const { user } = useAuth();
  const [form, setForm] = useState<any>({});
  const [passwords, setPasswords] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setForm({ ...user });
    } else {
      const stored = localStorage.getItem("user");
      if (stored) setForm(JSON.parse(stored));
    }
  }, [user]);

  const handleChange = (e: any) => {
    setForm((prev: any) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSave = () => {
    const stored = localStorage.getItem("user");
    if (!stored) return;
    const prev = JSON.parse(stored);
    const updated = {
      ...prev,
      ...form,
      id: prev.id,
      role: prev.role,
      email: prev.email,
    };
    localStorage.setItem("user", JSON.stringify(updated));
    setForm(updated);
    toast.success("¡Cambios guardados exitosamente!");
  };

  const handleLinksSave = () => {
    const stored = localStorage.getItem("user");
    if (!stored) return;
    const prev = JSON.parse(stored);
    const updated = {
      ...prev,
      ...form,
      id: prev.id,
      role: prev.role,
      email: prev.email,
      portfolio: form.portfolio,
      cv: form.cv,
      linkedin: form.linkedin,
    };
    localStorage.setItem("user", JSON.stringify(updated));
    setForm(updated);
    toast.success("¡Enlaces guardados exitosamente!");
  };

  const handlePasswordChange = (e: any) => {
    setPasswords((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleChangePassword = () => {
    const stored = localStorage.getItem("user");
    if (!stored) return;
    const prev = JSON.parse(stored);
    if (
      !passwords.password ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      toast.error("Completa todos los campos de contraseña.");
      return;
    }
    if (passwords.password !== prev.password) {
      toast.error("La contraseña actual es incorrecta.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Las contraseñas nuevas no coinciden.");
      return;
    }
    if (passwords.newPassword.length < 4) {
      toast.error("La nueva contraseña debe tener al menos 4 caracteres.");
      return;
    }
    const updated = { ...prev, password: passwords.newPassword };
    localStorage.setItem("user", JSON.stringify(updated));
    setPasswords({ password: "", newPassword: "", confirmPassword: "" });
    toast.success("¡Contraseña cambiada exitosamente!");
  };

  if (!form || !form.role) return null;

  const studentProfile = (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
          Perfil del Estudiante
        </h1>
        <p className="text-[#C8C8C9] mt-2">
          Gestiona tu información personal y preferencias
        </p>
      </div>

      <Tabs defaultValue="informacion" className="space-y-4">
        <TabsList>
          <TabsTrigger value="informacion">Información Personal</TabsTrigger>
          <TabsTrigger value="portafolio">Portafolio</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="informacion">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    value={form.firstName || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    value={form.lastName || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email || ""}
                  disabled
                />
              </div>
              <Button
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                onClick={handleSave}
              >
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portafolio">
          <Card>
            <CardHeader>
              <CardTitle>Enlaces de Portafolio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="portfolio">Enlace al Portafolio</Label>
                <Input
                  id="portfolio"
                  type="url"
                  value={form.portfolio || ""}
                  onChange={handleChange}
                  placeholder="https://tu-portafolio.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cv">Enlace al CV</Label>
                <Input
                  id="cv"
                  type="url"
                  value={form.cv || ""}
                  onChange={handleChange}
                  placeholder="https://tu-cv.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">Enlace a LinkedIn</Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={form.linkedin || ""}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/tu-perfil"
                />
              </div>
              <Button
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                onClick={handleLinksSave}
              >
                Guardar Enlaces
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña Actual</Label>
                <Input
                  id="password"
                  type="password"
                  value={passwords.password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirmar Nueva Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <Button
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                onClick={handleChangePassword}
              >
                Cambiar Contraseña
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const companyProfile = (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
          Perfil de Empresa
        </h1>
        <p className="text-[#C8C8C9] mt-2">
          Gestiona la información de tu empresa
        </p>
      </div>

      <Tabs defaultValue="informacion" className="space-y-4">
        <TabsList>
          <TabsTrigger value="informacion">
            Información de la Empresa
          </TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="informacion">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Nombre de la Empresa</Label>
                <Input
                  id="organizationName"
                  value={form.organizationName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  id="descripcion"
                  value={form.descripcion || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email || ""}
                  disabled
                />
              </div>
              <Button
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                onClick={handleSave}
              >
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña Actual</Label>
                <Input
                  id="password"
                  type="password"
                  value={passwords.password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirmar Nueva Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <Button
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                onClick={handleChangePassword}
              >
                Cambiar Contraseña
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const adminProfile = (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
          Perfil de Administrador
        </h1>
        <p className="text-[#C8C8C9] mt-2">
          Gestiona tu información de administrador
        </p>
      </div>

      <Tabs defaultValue="informacion" className="space-y-4">
        <TabsList>
          <TabsTrigger value="informacion">Información Personal</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="informacion">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    value={form.firstName || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    value={form.lastName || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email || ""}
                  disabled
                />
              </div>
              <Button
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                onClick={handleSave}
              >
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña Actual</Label>
                <Input
                  id="password"
                  type="password"
                  value={passwords.password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirmar Nueva Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <Button
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                onClick={handleChangePassword}
              >
                Cambiar Contraseña
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  if (!form || !form.role) return null;

  switch (form.role) {
    case "student":
      return studentProfile;
    case "company":
      return companyProfile;
    case "admin":
      return adminProfile;
    default:
      return null;
  }
}
