import { useQuery } from "@tanstack/react-query";
import { ChatMessage } from "@/types";

export function useChatHistory(documentId: string) {
  const chatQuery = useQuery<ChatMessage[]>({
    queryKey: ["chat", documentId],
    queryFn: async () => {
      const res = await fetch(`/api/chat?documentId=${documentId}`);
      if (!res.ok) throw new Error("Failed to fetch chat history");
      return res.json();
    },
    enabled: !!documentId,
  });

  return {
    messages: chatQuery.data || [],
    isLoading: chatQuery.isLoading,
    isError: chatQuery.isError,
  };
}
