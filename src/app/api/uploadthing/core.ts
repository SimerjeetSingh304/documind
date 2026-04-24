import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { embedText, chunkText } from "@/lib/rag";
import pdf from "pdf-parse";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(async ({ req }) => {
      const { userId } = await auth();
      if (!userId) throw new Error("Unauthorized");
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      
      try {
        // 1. Sync User (just in case they aren't in our DB yet)
        const dbUser = await db.user.upsert({
          where: { clerkId: metadata.userId },
          update: {},
          create: {
            clerkId: metadata.userId,
            email: `${metadata.userId}@example.com`, // Fallback email
          },
        });

        // 2. Fetch the file buffer using ufsUrl and a User-Agent to avoid fetch failures
        const fileUrl = file.ufsUrl || file.url;
        console.log("Processing file from URL:", fileUrl);
        
        const response = await fetch(fileUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        });
        
        if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);
        const buffer = Buffer.from(await response.arrayBuffer());

        // 3. Extract text from PDF
        const pdfData = await pdf(buffer);
        const text = pdfData.text;

        // 4. Create Document in DB
        const document = await db.document.create({
          data: {
            name: file.name,
            fileUrl: file.ufsUrl || file.url,
            fileSize: file.size,
            userId: dbUser.id,
          },
        });

        // 5. Chunk and Embed
        const chunks = chunkText(text, 1000, 200);
        console.log(`Processing ${chunks.length} chunks for document: ${document.id}`);

        for (let i = 0; i < chunks.length; i++) {
          const content = chunks[i];
          const embedding = await embedText(content);
          const embeddingStr = `[${embedding.join(",")}]`;
          
          await db.$executeRaw`
            INSERT INTO "DocumentChunk" (id, content, embedding, "chunkIndex", "documentId")
            VALUES (
                ${crypto.randomUUID()}, 
                ${content}, 
                ${embeddingStr}::vector, 
                ${i}, 
                ${document.id}
            )
          `;
        }

        console.log("Document processing complete!");
        return { uploadedBy: metadata.userId, documentId: document.id };
      } catch (error) {
        console.error("Error in onUploadComplete:", error);
        throw error;
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
