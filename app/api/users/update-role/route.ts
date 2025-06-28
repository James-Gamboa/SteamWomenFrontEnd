import { NextResponse } from "next/server";

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

    const fs = require("fs");
    const path = require("path");
    const DB_FILE_PATH = path.join(process.cwd(), "data", "users.json");

    if (!fs.existsSync(DB_FILE_PATH)) {
      return NextResponse.json(
        { error: "Archivo de usuarios no encontrado" },
        { status: 404 },
      );
    }

    const data = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const users = JSON.parse(data);

    const userIndex = users.findIndex((u: any) => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    if (users[userIndex].isPrimaryAdmin) {
      return NextResponse.json(
        { error: "No se puede cambiar el rol del administrador principal" },
        { status: 400 },
      );
    }

    users[userIndex].role = newRole;

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(users, null, 2));

    return NextResponse.json({
      success: true,
      message: "Rol actualizado correctamente",
      user: users[userIndex],
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
