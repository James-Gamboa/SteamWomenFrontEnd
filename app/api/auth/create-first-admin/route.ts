import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mock-db";

export async function POST() {
  try {
    mockDb.initializeDefaultUsers();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear el admin" },
      { status: 500 },
    );
  }
}
