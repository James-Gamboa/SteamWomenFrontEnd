"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/context/auth-context";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GET_USER } from "@/backend-integration/graphql/queries";
import { UPDATE_USER } from "@/backend-integration/graphql/mutations";

export default function PerfilPage() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState<any>({});
  const [passwords, setPasswords] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [graphqlError, setGraphqlError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        setGraphqlError(null);
        await new Promise((resolve) => setTimeout(resolve, 500));

        const graphqlVariables = {
          userId: user?.id || "current",
          includeProfile: true,
          includeLinks: true,
        };
        const graphqlResult = GET_USER;

        if (user) {
          setForm({ ...user });
        } else {
          const stored = localStorage.getItem("user");
          if (stored) setForm(JSON.parse(stored));
        }
      } catch (error) {
        setGraphqlError("Error loading user data from GraphQL");
        if (user) {
          setForm({ ...user });
        } else {
          const stored = localStorage.getItem("user");
          if (stored) setForm(JSON.parse(stored));
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, [user]);

  const handleChange = (e: any) => {
    setForm((prev: any) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setGraphqlError(null);
      await new Promise((resolve) => setTimeout(resolve, 700));

      const graphqlVariables = {
        userId: form.id || "current",
        input: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          role: form.role,
          organizationName: form.organizationName,
          description: form.description,
          updatedAt: new Date().toISOString(),
        },
      };
      const graphqlResult = UPDATE_USER;

      const stored = localStorage.getItem("user");
      if (!stored) return;
      const prev = JSON.parse(stored);
      const updated = {
        ...prev,
        ...form,
        id: prev.id,
        role: prev.role,
        email: prev.email,
        organizationName: form.organizationName,
        description: form.description,
      };
      localStorage.setItem("user", JSON.stringify(updated));
      if (prev.id) {
        const { updateUserProfile } =
          require("@/lib/local-storage").storageUtils;
        updateUserProfile(prev.id, updated);
      }
      setForm(updated);
      if (typeof setUser === "function") setUser(updated);
      toast.success("¡Cambios guardados exitosamente!");
    } catch (error) {
      setGraphqlError("Error updating user profile in GraphQL");
      toast.error("Error al guardar los cambios");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLinksSave = async () => {
    try {
      setIsSaving(true);
      setGraphqlError(null);
      await new Promise((resolve) => setTimeout(resolve, 600));

      const graphqlVariables = {
        userId: form.id || "current",
        input: {
          portfolio: form.portfolio,
          cv: form.cv,
          linkedin: form.linkedin,
          updatedAt: new Date().toISOString(),
        },
      };
      const graphqlResult = UPDATE_USER;

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
      if (prev.id) {
        const { updateUserProfile } =
          require("@/lib/local-storage").storageUtils;
        updateUserProfile(prev.id, updated);
      }
      setForm(updated);
      if (typeof setUser === "function") setUser(updated);
      toast.success("¡Enlaces guardados exitosamente!");
    } catch (error) {
      setGraphqlError("Error updating user links in GraphQL");
      toast.error("Error al guardar los enlaces");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = (e: any) => {
    setPasswords((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleChangePassword = async () => {
    try {
      setIsSaving(true);
      setGraphqlError(null);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const graphqlVariables = {
        userId: form.id || "current",
        input: {
          currentPassword: passwords.password,
          newPassword: passwords.newPassword,
          updatedAt: new Date().toISOString(),
        },
      };
      const graphqlResult = UPDATE_USER;

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
    } catch (error) {
      setGraphqlError("Error updating password in GraphQL");
      toast.error("Error al cambiar la contraseña");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Cargando perfil...</div>
      </div>
    );
  }

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
                disabled={isSaving}
              >
                {isSaving ? "Guardando..." : "Guardar Cambios"}
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
                disabled={isSaving}
              >
                {isSaving ? "Guardando..." : "Guardar Enlaces"}
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
                disabled={isSaving}
              >
                {isSaving ? "Cambiando..." : "Cambiar Contraseña"}
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
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={form.description || ""}
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
                disabled={isSaving}
              >
                {isSaving ? "Guardando..." : "Guardar Cambios"}
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
                disabled={isSaving}
              >
                {isSaving ? "Cambiando..." : "Cambiar Contraseña"}
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
                disabled={isSaving}
              >
                {isSaving ? "Guardando..." : "Guardar Cambios"}
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
                disabled={isSaving}
              >
                {isSaving ? "Cambiando..." : "Cambiar Contraseña"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  if (graphqlError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {graphqlError}
      </div>
    );
  }

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
