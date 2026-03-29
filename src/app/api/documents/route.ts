import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// Increase max duration for Vercel
export const maxDuration = 300;

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    // Ensure user exists in our DB to prevent relation filter issues
    await db.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        email: "sync@example.com", // Fallback
      },
    });

    const documents = await db.document.findMany({
      where: { user: { clerkId: userId } },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { chunks: true }
        }
      }
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
