import { google } from "@/lib/gemini";
import { db } from "@/lib/db";
import { embedText, similaritySearch } from "@/lib/rag";
import { streamText } from "ai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Increase max duration for Vercel
export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { messages, documentId } = await req.json();

    // Ensure user exists in our DB to prevent relation filter issues
    await db.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        email: "sync@example.com", // Fallback
      },
    });

    // Verify ownership
    const doc = await db.document.findUnique({
      where: { id: documentId },
      include: { user: true },
    });
    if (!doc || doc.user.clerkId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const lastMessage = messages[messages.length - 1].content;

    // 1. Generate embedding for user query
    const queryEmbedding = await embedText(lastMessage);

    // 2. Run similarity search (768-dim vectors)
    const contextChunks = await similaritySearch(queryEmbedding, documentId, 5);
    const context = contextChunks.map((chunk) => chunk.content).join("\n\n");

    // 3. Prepare system prompt for Gemini 2.5 Flash
    const systemPrompt = `You are a helpful assistant. Answer questions based ONLY on the provided context. If the answer is not in the context, say 'I couldn't find that in the document.' Always cite which part of the document you used. 
    
    Context:
    ${context}`;

    // 4. Stream response using Gemini 2.5 Flash
    const result = await streamText({
      model: google("gemini-2.5-flash"),
      system: systemPrompt,
      messages,
      onFinish: async (completion) => {
        // 5. Save message + response to ChatMessage table
        // Save user message
        await db.chatMessage.create({
          data: {
            role: "user",
            content: lastMessage,
            documentId,
          },
        });
        
        // Save assistant response
        await db.chatMessage.create({
          data: {
            role: "assistant",
            content: completion.text,
            documentId,
          },
        });
      },
    });

    // Return the stream + sources as a custom base64-encoded header to handle special characters
    const response = result.toTextStreamResponse();
    const sourcesData = JSON.stringify(contextChunks.map((c) => ({ 
      id: c.id, 
      index: c.chunkIndex, 
      preview: c.content.slice(0, 150) 
    })));
    
    response.headers.set(
      "x-sources",
      Buffer.from(sourcesData).toString("base64")
    );
    return response;
  } catch (error) {
    console.error("Chat error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");

    if (!documentId) return new NextResponse("Missing documentId", { status: 400 });

    // Ensure user exists in our DB to prevent relation filter issues
    await db.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        email: "sync@example.com", // Fallback
      },
    });

    // Verify ownership
    const doc = await db.document.findUnique({
      where: { id: documentId },
      include: { user: true },
    });
    if (!doc || doc.user.clerkId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const messages = await db.chatMessage.findMany({
      where: { documentId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
