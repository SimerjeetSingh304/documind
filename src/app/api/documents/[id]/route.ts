import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    console.log(`[DELETE] Request for document ${id} by user ${userId}`);

    const document = await db.document.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!document) {
      console.warn(`[DELETE] Document ${id} not found`);
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    if (document.user.clerkId !== userId) {
      console.warn(`[DELETE] Unauthorized attempt for document ${id}`);
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.document.delete({
      where: { id },
    });

    console.log(`[DELETE] Document ${id} deleted successfully`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE] Error:", error);
    return NextResponse.json(
      { error: "Internal error", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
