import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    const { duration, maxProfit, maxLoss, totalAmount, userId } = body;

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log(user);

    // Create a new strategy 
    const strategy = await prisma.strategy.upsert({
      where: {
        userId: user.id,
      },
      create: {
        duration: duration.toString(),
        maxProfit,
        maxLoss,
        totalAmount,
        userId: user.id,
      },
      update: {
        duration: duration.toString(),
        maxProfit,
        maxLoss,
        totalAmount,
        userId: user.id,
      }
    });

    return NextResponse.json({ message: "Strategy created successfully", strategy }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
