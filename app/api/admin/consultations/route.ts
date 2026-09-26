import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return authHeader === `Bearer ${password}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const consultations = await prisma.consultation.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ consultations });
  } catch (error) {
    console.error("Admin fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch consultations" }, { status: 500 });
  }
}
