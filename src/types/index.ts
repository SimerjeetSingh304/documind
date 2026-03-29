export interface User {
  id: String;
  clerkId: String;
  email: String;
  createdAt: Date;
}

export interface Document {
  id: string;
  name: string;
  fileUrl: string;
  fileSize: number;
  userId: string;
  createdAt: Date;
}

export interface DocumentChunk {
  id: string;
  content: string;
  chunkIndex: number;
  documentId: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  documentId: string;
  createdAt: Date;
}
