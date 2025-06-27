import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mock-db";

// TODO: Reemplazar con conexión a Django

export async function POST() {
  try {
    mockDb.initializeDefaultUsers();
    return NextResponse.json({
      message: "Usuarios inicializados correctamente",
    });
  } catch (error) {
    console.error("Error initializing users:", error);
    return NextResponse.json(
      { error: "Error al inicializar usuarios" },
      { status: 500 },
    );
  }
}
