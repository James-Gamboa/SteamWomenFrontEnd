import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mockDb } from "@/lib/mock-db";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const user = mockDb.findUserById(token);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { password, ...userData } = user;
    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Error verifying token" },
      { status: 500 },
    );
  }
}
