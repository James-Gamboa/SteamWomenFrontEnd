import { NextResponse } from "next/server";
import { storageUtils } from "@/lib/local-storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { users } = body;

    if (!users || !Array.isArray(users)) {
      return NextResponse.json(
        { error: "Datos de usuarios inválidos" },
        { status: 400 },
      );
    }

    try {
      const fs = require("fs");
      const path = require("path");
      const DB_FILE_PATH = path.join(process.cwd(), "data", "users.json");

      const dir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(users, null, 2));

      return NextResponse.json({
        success: true,
        message: "Usuarios sincronizados correctamente",
      });
    } catch (fileError) {
      console.error("Error writing to file:", fileError);
      return NextResponse.json(
        { error: "Error al escribir en el archivo" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
