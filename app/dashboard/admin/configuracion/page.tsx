"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { mockDb } from "@/lib/mock-db";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GET_USER } from "@/backend-integration/graphql/queries";
import { UPDATE_USER } from "@/backend-integration/graphql/mutations";

const AdminConfiguracionPage = () => {
  const { user, setUser, logout } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [graphqlError, setGraphqlError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        setGraphqlError(null);
        await new Promise((resolve) => setTimeout(resolve, 600));

        const graphqlVariables = {
          userId: user?.id || "current",
          includeProfile: true,
        };
        const graphqlResult = GET_USER;

        if (user) {
          setForm({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email,
          });
        }
      } catch (error) {
        setGraphqlError("Error loading user data from GraphQL");
        if (user) {
          setForm({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email,
          });
        }
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      setIsSaving(true);
      setGraphqlError(null);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const graphqlVariables = {
        userId: user.id,
        input: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          role: user.role,
          updatedAt: new Date().toISOString(),
        },
      };
      const graphqlResult = UPDATE_USER;

      const updatedUser = {
        ...user,
        firstName: form.firstName,
        lastName: form.lastName,
      };

      const users = mockDb
        .getAllUsers()
        .map((u: any) => (u.id === user.id ? updatedUser : u));

      localStorage.setItem("mockUsers", JSON.stringify(users));

      setUser(updatedUser);

      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      setGraphqlError("Error updating user profile in GraphQL");
      toast.error("Error al actualizar el perfil");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg">Cargando configuración...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      {graphqlError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {graphqlError}
        </div>
      )}
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
            disabled={isSaving}
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
            disabled={isSaving}
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
        <Button
          className="w-full mt-4"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </div>
  );
};

export default AdminConfiguracionPage;
