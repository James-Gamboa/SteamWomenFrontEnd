"use client";
import { useEffect, useState } from "react";
import { mockDb } from "@/lib/mock-db";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/lib/context/auth-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { User } from "@/lib/mock-db";

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
            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button variant="destructive" onClick={onConfirm}>Eliminar</Button>
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <Card className="w-11/12 max-w-lg">
        <CardHeader>
          <CardTitle>Detalles del Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Nombre:</span> {user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : user.organizationName || "-"}
            </div>
            <div>
              <span className="font-semibold">Correo electrónico:</span> {user.email}
            </div>
            <div>
              <span className="font-semibold">Rol:</span>
              <span className={
                user.role === "admin"
                  ? "bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold"
                  : user.role === "company"
                  ? "bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold"
                  : "bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold"
              }>{user.role}</span>
            </div>
            <div>
              <span className="font-semibold">Fecha de registro:</span> {user.id ? new Date(Number(user.id)).toLocaleDateString() : "-"}
            </div>
            {user.isPrimaryAdmin && <div className="text-xs text-purple-700 font-bold">Admin principal</div>}
          </div>
          <Button className="mt-6 w-full" onClick={onClose}>Cerrar</Button>
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

  useEffect(() => {
    setUsers(mockDb.getAllUsers());
    setLoading(false);
  }, []);

  const handleRoleChange = (userId: string, newRole: User["role"]) => {
    setEditedRoles((prev) => ({ ...prev, [userId]: newRole }));
  };

  const handleSaveRole = (userId: string) => {
    if (!currentUser) return;
    const userToUpdate = users.find((u) => u.id === userId);
    if (!userToUpdate) return;
    try {
      mockDb.assignAdminRole(userToUpdate.email, currentUser.email);
      const updatedUsers = users.map((u) =>
        u.id === userId ? { ...u, role: editedRoles[userId] } : u
      );
      setUsers(updatedUsers);
      setEditedRoles((prev) => {
        const copy = { ...prev };
        delete copy[userId];
        return copy;
      });
      toast.success("Rol actualizado correctamente");
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar el rol");
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
    if (userToDelete.isPrimaryAdmin || userToDelete.id === currentUser.id) {
      toast.error("No puedes eliminar este usuario");
      setConfirmOpen(false);
      return;
    }
    mockDb.deleteUser(userToDelete.email);
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setConfirmOpen(false);
    toast.success("Usuario eliminado correctamente");
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96">Cargando usuarios...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Usuarios</h1>
      <div className="hidden custom1123:block">
        <Card>
          <CardContent>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full text-sm md:text-base divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Nombre</th>
                    <th className="px-6 py-3 text-left font-semibold">Correo electrónico</th>
                    <th className="px-6 py-3 text-left font-semibold">Rol</th>
                    <th className="px-6 py-3 text-left font-semibold">Fecha de registro</th>
                    <th className="px-6 py-3 text-left font-semibold">Acciones</th>
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
                          {user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : user.organizationName || "-"}
                        </td>
                        <td className="px-6 py-4 break-words max-w-xs">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={
                            editedRole === "admin"
                              ? "bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold"
                              : editedRole === "company"
                              ? "bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold"
                              : "bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold"
                          }>
                            {editedRole}
                          </span>
                        </td>
                        <td className="px-6 py-4">{user.id ? new Date(Number(user.id)).toLocaleDateString() : "-"}</td>
                        <td className="px-6 py-4 flex flex-wrap gap-2">
                          <Select
                            value={editedRole}
                            onValueChange={(value: User["role"]) => handleRoleChange(user.id, value)}
                            disabled={!!isPrimary || !!isSelf}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Estudiante</SelectItem>
                              <SelectItem value="company">Empresa</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
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
                          <Button size="sm" variant="secondary" onClick={() => handleViewUser(user)}>
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
                {user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : user.organizationName || "-"}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Correo: </span>{user.email}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Rol: </span>
                <span className={
                  editedRole === "admin"
                    ? "bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold"
                    : editedRole === "company"
                    ? "bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold"
                    : "bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold"
                }>
                  {editedRole}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Fecha: </span>{user.id ? new Date(Number(user.id)).toLocaleDateString() : "-"}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Select
                  value={editedRole}
                  onValueChange={(value: User["role"]) => handleRoleChange(user.id, value)}
                  disabled={!!isPrimary || !!isSelf}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Estudiante</SelectItem>
                    <SelectItem value="company">Empresa</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
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
                <Button size="sm" variant="secondary" onClick={() => handleViewUser(user)}>
                  Ver
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      <UserDetailModal user={selectedUser} open={modalOpen} onClose={() => setModalOpen(false)} />
      <ConfirmModal open={confirmOpen} onConfirm={confirmDelete} onCancel={() => setConfirmOpen(false)} />
      <style jsx>{`
        @media (min-width: 1123px) {
          .custom1123\\:block { display: block !important; }
          .custom1123\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminUsuariosPage;
