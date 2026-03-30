"use client";

import { Send, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const hasInput = input.trim().length > 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-6 pt-8 z-30 bg-gradient-to-t from-[#0F0F14] via-[#0F0F14]/90 to-transparent">
      <div className="max-w-3xl mx-auto space-y-2">

        <form
          onSubmit={handleSubmit}
          className={cn(
            "flex items-end gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] ring-1 transition-all duration-200",
            hasInput ? "ring-violet-500/25" : "ring-white/[0.07]"
          )}
        >
          <Textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about this document…"
            style={{ maxHeight: "160px", overflowY: "auto" }}
            className="flex-1 min-h-[36px] resize-none border-none bg-transparent text-white/80 focus-visible:ring-0 py-1.5 px-1 text-sm placeholder:text-white/20 leading-relaxed font-normal"
            disabled={isLoading}
          />

          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !hasInput}
            className={cn(
              "flex-shrink-0 h-8 w-8 rounded-xl transition-all duration-150",
              hasInput
                ? "bg-violet-500/25 hover:bg-violet-500/35 text-violet-400 ring-1 ring-violet-500/30"
                : "bg-white/[0.04] text-white/15 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </Button>
        </form>

        {/* Footer hints */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/15 font-medium">
              <kbd className="font-sans">Enter</kbd> to send · <kbd className="font-sans">Shift+Enter</kbd> for newline
            </span>
          </div>
          {hasInput && (
            <span className="text-[10px] text-white/20 tabular-nums">
              {input.length}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}