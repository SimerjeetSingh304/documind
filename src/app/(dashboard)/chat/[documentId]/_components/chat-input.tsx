"use client";

import { Send, CornerDownLeft, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#1E1E2E] bg-[#0A0A0F]/80 backdrop-blur-md">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-end max-w-4xl mx-auto"
      >
        <Textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about this document..."
          style={{ maxHeight: "96px", overflowY: "auto" }}
          className="min-h-[52px] w-full resize-none border-[#1E1E2E] bg-[#13131A] text-[#F1F5F9] focus-visible:ring-[#6366F1] py-3 pr-12 rounded-2xl transition"
          disabled={isLoading}
        />
        
        <div className="absolute right-2 bottom-2">
           <Button
             type="submit"
             size="icon"
             disabled={isLoading || !input.trim()}
             className="h-8 w-8 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl"
           >
             {isLoading ? (
               <Loader2 className="w-4 h-4 animate-spin" />
             ) : (
               <Send className="w-4 h-4" />
             )}
           </Button>
        </div>
      </form>
      <div className="max-w-4xl mx-auto mt-2 flex justify-between px-2">
        <p className="text-[10px] text-[#64748B]">
          Press <kbd className="font-sans px-1 rounded bg-[#1E1E2E] text-[#F1F5F9]">Enter</kbd> to send, <kbd className="font-sans px-1 rounded bg-[#1E1E2E] text-[#F1F5F9]">Shift+Enter</kbd> for new line
        </p>
        <p className="text-[10px] text-[#64748B]">
           {input.length} characters
        </p>
      </div>
    </div>
  );
}
