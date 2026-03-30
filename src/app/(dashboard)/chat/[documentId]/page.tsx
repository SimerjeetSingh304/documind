"use client";

import React, { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { useChatHistory } from "@/hooks/use-chat-history";
import { ChatMessages } from "./_components/chat-messages";
import { ChatInput } from "./_components/chat-input";
import { DocumentSidebar } from "./_components/document-sidebar";

interface ChatPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { documentId } = React.use(params);
  const { messages: historyMessages, isLoading: historyLoading } = useChatHistory(documentId);
  const [sources, setSources] = useState<{ id: string; index: number; preview: string }[]>([]);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/chat",
    body: {
      documentId,
    },
    onResponse: (response: Response) => {
      // Extract sources from the custom x-sources header (Base64 encoded)
      const encodedSources = response.headers.get("x-sources");
      if (encodedSources) {
        try {
          // Use atob() for browser-safe base64 decoding
          const decodedSources = atob(encodedSources);
          setSources(JSON.parse(decodedSources));
        } catch (e) {
          console.error("Failed to parse sources", e);
        }
      }
    },
  });

  // Sync historical messages
  useEffect(() => {
    if (historyMessages.length > 0 && messages.length === 0) {
      setMessages(historyMessages.map(m => ({
        id: m.id,
        role: m.role as "user" | "assistant",
        content: m.content,
        createdAt: new Date(m.createdAt),
        parts: [{ type: "text" as const, text: m.content }],
      })));
    }
  }, [historyMessages, setMessages, messages.length]);

  return (
    <div className="fixed inset-0 top-16 left-[240px] flex h-[calc(100vh-64px)] overflow-hidden bg-transparent">
      <DocumentSidebar documentId={documentId} />

      <main className="flex-1 flex flex-col relative bg-[url('/noise.png')] opacity-[0.98] mix-blend-overlay overflow-hidden z-10">
        <ChatMessages
          messages={messages}
          isLoading={isLoading || historyLoading}
          sources={sources}
        />
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
