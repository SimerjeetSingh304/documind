import { embed } from "ai";
import { google } from "./gemini";
import { db } from "./db";

// Use gemini-embedding-001 - Match Supabase dimension requirement (1536)
const embeddingModel = google.textEmbeddingModel("gemini-embedding-001", {
  outputDimensionality: 1536,
});

export async function embedText(text: string) {
  try {
    const { embedding } = await embed({
      model: embeddingModel,
      value: text,
    });
    return embedding;
  } catch (error) {
    console.error("Error embedding text", error);
    throw new Error("Failed to generate embedding");
  }
}

export function chunkText(text: string, chunkSize = 1000, overlap = 200): string[] {
  const chunks: string[] = []
  let start = 0
  while (start < text.length) {
    chunks.push(text.slice(start, start + chunkSize))
    start += chunkSize - overlap
  }
  return chunks
}

export async function similaritySearch(
  embedding: number[],
  documentId: string,
  limit: number = 5
) {
  try {
    const embeddingStr = `[${embedding.join(",")}]`;

    // We use Prisma's $queryRaw to perform the similarity search
    const chunks = await db.$queryRaw`
      SELECT id, content, "chunkIndex"
      FROM "DocumentChunk"
      WHERE "documentId" = ${documentId}
      ORDER BY embedding <=> ${embeddingStr}::vector
      LIMIT ${limit}
    `;
    return chunks as { id: string; content: string; chunkIndex: number }[];
  } catch (error) {
    console.error("Error performing similarity search", error);
    throw new Error("Failed to search chunks");
  }
}
