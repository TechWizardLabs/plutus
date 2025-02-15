import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const strategy = await prisma.strategy.delete({ where: { userId: user.id } });
    if (!strategy) {
      return NextResponse.json({ message: "Strategy not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Strategy deleted successfully", strategy }, { status: 200 });
  } catch (error) {
    console.error("Error updating strategy:", error);
    return NextResponse.json({ message: "Error updating strategy" }, { status: 500 });
  }
}