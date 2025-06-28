"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/lib/context/auth-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { User } from "@/lib/mock-db";
import { storageUtils } from "@/lib/local-storage";
import { useRouter } from "next/navigation";

// TODO: Reemplazar con conexión a Django

type ConfirmModalProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({ open, onConfirm, onCancel }: ConfirmModalProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <Card className="w-11/12 max-w-md">
        <CardHeader>
          <CardTitle>¿Seguro que deseas eliminar este usuario?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Eliminar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

type UserDetailModalProps = {
  user: User | null;
  open: boolean;
  onClose: () => void;
};

const UserDetailModal = ({ user, open, onClose }: UserDetailModalProps) => {
  if (!open || !user) return null;

  const getRoleLabel = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "company":
        return "Empresa";
      case "student":
        return "Estudiante";
      default:
        return role;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Fecha no disponible";
      }
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      return "Fecha no disponible";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <Card className="w-11/12 max-w-lg">
        <CardHeader>
          <CardTitle>Detalles del Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Nombre:</span>{" "}
              {user.firstName
                ? `${user.firstName} ${user.lastName || ""}`.trim()
                : user.organizationName || "-"}
            </div>
            <div>
              <span className="font-semibold">Correo electrónico:</span>{" "}
              {user.email}
            </div>
            <div>
              <span className="font-semibold">Rol:</span>
              <span
                className={
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold"
                    : user.role === "company"
                      ? "bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold"
                      : "bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold"
                }
              >
                {getRoleLabel(user.role)}
              </span>
            </div>
            <div>
              <span className="font-semibold">Fecha de registro:</span>{" "}
              {formatDate(user.createdAt)}
            </div>
            {user.isPrimaryAdmin && (
              <div className="text-xs text-purple-700 font-bold">
                Administrador principal
              </div>
            )}
          </div>
          <Button
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={onClose}
          >
            Cerrar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

type EditedRoles = Record<string, User["role"]>;

const AdminUsuariosPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();
  const [editedRoles, setEditedRoles] = useState<EditedRoles>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const router = useRouter();

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Fecha no disponible";
      }
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      return "Fecha no disponible";
    }
  };

  const getRoleLabel = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "company":
        return "Empresa";
      case "student":
        return "Estudiante";
      default:
        return role;
    }
  };

  const getRoleStyle = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold";
      case "company":
        return "bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold";
      case "student":
        return "bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      toast.error("Acceso denegado");
      router.push("/dashboard");
      return;
    }

    try {
      const cleanResult = storageUtils.cleanDuplicateUsers();
      if (cleanResult.success && cleanResult.removedCount > 0) {
        toast.success(
          `${cleanResult.removedCount} usuarios duplicados eliminados automáticamente`,
        );
      }

      const storedUsers = storageUtils.getUsers();
      setUsers(storedUsers);
    } catch (error) {
      toast.error(
        "Error al cargar los usuarios. Por favor, revise los datos en localStorage.",
      );
    } finally {
      setLoading(false);
    }
  }, [currentUser, router]);

  const handleRoleChange = (userId: string, newRole: User["role"]) => {
    setEditedRoles((prev) => ({ ...prev, [userId]: newRole }));
  };

  const handleSaveRole = async (userId: string) => {
    if (!currentUser) {
      console.log("No current user found");
      return;
    }

    const newRole = editedRoles[userId];
    console.log("Attempting to save role:", { userId, newRole, editedRoles });

    if (!newRole) {
      console.log("No new role found for user:", userId);
      toast.error("No se encontró el nuevo rol");
      return;
    }

    try {
      const response = await fetch("/api/users/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newRole }),
      });

      const result = await response.json();

      if (result.success) {
        const updatedUsers = storageUtils.getUsers();
        setUsers(updatedUsers);
        setEditedRoles((prev) => {
          const copy = { ...prev };
          delete copy[userId];
          return copy;
        });
        toast.success("Rol actualizado correctamente en el archivo");
      } else {
        console.error("Error updating role:", result.error);
        toast.error(result.error || "Error al actualizar el rol");
      }
    } catch (error) {
      console.error("Error calling update role API:", error);
      toast.error("Error al comunicarse con el servidor");
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (!currentUser) return;
    const userToDelete = users.find((u) => u.id === userId);
    if (!userToDelete) return;
    setUserToDelete(userToDelete);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!userToDelete || !currentUser) return;
    const result = storageUtils.deleteUser(userToDelete.id);

    if (result.success) {
      setUsers(storageUtils.getUsers());
      setConfirmOpen(false);
      toast.success("Usuario eliminado correctamente");
    } else {
      toast.error(result.error || "Error al eliminar el usuario");
      setConfirmOpen(false);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleSyncWithFile = async () => {
    try {
      const result = await storageUtils.syncWithFileSystem();
      if (result.success) {
        toast.success("Datos sincronizados con el archivo correctamente");
      } else {
        toast.error(result.error || "Error al sincronizar");
      }
    } catch (error) {
      toast.error("Error al sincronizar con el archivo");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Cargando usuarios...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center">
            Gestión de Usuarios
          </h1>
          <Button
            onClick={handleSyncWithFile}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Sincronizar
          </Button>
        </div>
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">
              No se encontraron usuarios registrados.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Gestión de Usuarios</h1>
        <Button
          onClick={handleSyncWithFile}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Sincronizar con Archivo
        </Button>
      </div>
      <div className="hidden custom1123:block">
        <Card>
          <CardContent>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full text-sm md:text-base divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Correo electrónico
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">Rol</th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Fecha de registro
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => {
                    const isSelf = currentUser && user.id === currentUser.id;
                    const isPrimary = user.isPrimaryAdmin;
                    const editedRole = editedRoles[user.id] ?? user.role;

                    return (
                      <tr key={user.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 break-words max-w-xs">
                          {user.firstName
                            ? `${user.firstName} ${user.lastName || ""}`.trim()
                            : user.organizationName || "-"}
                        </td>
                        <td className="px-6 py-4 break-words max-w-xs">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <span className={getRoleStyle(editedRole)}>
                            {getRoleLabel(editedRole)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 flex flex-wrap gap-2">
                          <Select
                            value={editedRole}
                            onValueChange={(value: User["role"]) =>
                              handleRoleChange(user.id, value)
                            }
                            disabled={!!isPrimary || !!isSelf}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">
                                Estudiante
                              </SelectItem>
                              <SelectItem value="company">Empresa</SelectItem>
                              <SelectItem value="admin">
                                Administrador
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-400"
                            disabled={
                              !!isPrimary ||
                              !!isSelf ||
                              editedRole === user.role
                            }
                            onClick={() => handleSaveRole(user.id)}
                          >
                            Guardar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="disabled:bg-gray-200 disabled:text-gray-400"
                            disabled={!!isPrimary || !!isSelf}
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Eliminar
                          </Button>
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={() => handleViewUser(user)}
                          >
                            Ver
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="block custom1123:hidden space-y-6">
        {users.map((user) => {
          const isSelf = currentUser && user.id === currentUser.id;
          const isPrimary = user.isPrimaryAdmin;
          const editedRole = editedRoles[user.id] ?? user.role;

          return (
            <Card key={user.id} className="max-w-xl mx-auto p-6">
              <div className="mb-2">
                <span className="font-semibold">Nombre: </span>
                {user.firstName
                  ? `${user.firstName} ${user.lastName || ""}`.trim()
                  : user.organizationName || "-"}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Correo: </span>
                {user.email}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Rol: </span>
                <span className={getRoleStyle(editedRole)}>
                  {getRoleLabel(editedRole)}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Fecha: </span>
                {formatDate(user.createdAt)}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Select
                  value={editedRole}
                  onValueChange={(value: User["role"]) =>
                    handleRoleChange(user.id, value)
                  }
                  disabled={!!isPrimary || !!isSelf}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Estudiante</SelectItem>
                    <SelectItem value="company">Empresa</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-400"
                  disabled={!!isPrimary || !!isSelf || editedRole === user.role}
                  onClick={() => handleSaveRole(user.id)}
                >
                  Guardar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="disabled:bg-gray-200 disabled:text-gray-400"
                  disabled={!!isPrimary || !!isSelf}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Eliminar
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleViewUser(user)}
                >
                  Ver
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      <UserDetailModal
        user={selectedUser}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <ConfirmModal
        open={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
      <style jsx>{`
        @media (min-width: 1123px) {
          .custom1123\\:block {
            display: block !important;
          }
          .custom1123\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminUsuariosPage;
