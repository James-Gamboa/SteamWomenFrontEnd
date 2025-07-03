import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mock-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, newRole } = body;

    if (!userId || !newRole) {
      return NextResponse.json(
        { error: "ID de usuario y nuevo rol son requeridos" },
        { status: 400 },
      );
    }

    const user = mockDb.findUserById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }
    if (user.isPrimaryAdmin) {
      return NextResponse.json(
        { error: "No se puede cambiar el rol del administrador principal" },
        { status: 400 },
      );
    }

    const result = mockDb.updateUserRole(user.email, newRole);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Error al actualizar el rol" },
        { status: 500 },
      );
    }

    const updatedUser = mockDb.findUserById(userId);
    return NextResponse.json({
      success: true,
      message: "Rol actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
