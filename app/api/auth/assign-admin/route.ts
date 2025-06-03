import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mock-db";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const token = (await cookies()).get("token")?.value;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const currentUser = mockDb.findUserByEmail(token.split("-")[0]);
    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = mockDb.assignAdminRole(email, currentUser.email);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: "Admin role assigned successfully" });
  } catch (error) {
    console.error("Error assigning admin role:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 