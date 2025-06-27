"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { mockDb } from "@/lib/mock-db";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminConfiguracionPage = () => {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email,
        password: "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!user) return;
    try {
      const updatedUser = { ...user, ...form };
      const users = mockDb
        .getAllUsers()
        .map((u: any) =>
          u.id === user.id
            ? { ...u, ...form, password: form.password || u.password }
            : u,
        );
      localStorage.setItem("mockUsers", JSON.stringify(users));
      toast.success("Perfil actualizado correctamente");
    } catch {
      toast.error("Error al actualizar el perfil");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">Cargando...</div>
    );
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configuración de Perfil</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Nombre</label>
          <input
            className="w-full border rounded px-3 py-2"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Apellido</label>
          <input
            className="w-full border rounded px-3 py-2"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Correo electrónico</label>
          <input
            className="w-full border rounded px-3 py-2"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
            disabled
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Nueva contraseña</label>
          <input
            className="w-full border rounded px-3 py-2"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            autoComplete="new-password"
          />
        </div>
        <Button className="w-full mt-4" onClick={handleSave}>
          Guardar cambios
        </Button>
      </div>
    </div>
  );
};

export default AdminConfiguracionPage;
