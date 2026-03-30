"use client";

import { Send, Loader2, Zap } from "lucide-react";
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
    <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
      {/* Bottom Blur Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none" />
      
      <div className="relative z-10 px-6 pb-8 pt-10 pointer-events-auto">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          <form
            onSubmit={handleSubmit}
            className={cn(
              "w-full flex items-end gap-3 px-5 py-3.5 rounded-[32px] bg-background/50 backdrop-blur-3xl ring-1 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300",
              hasInput ? "ring-primary/40 shadow-primary/10" : "ring-white/10"
            )}
          >
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 pb-1">
               <Zap className="w-4 h-4 text-white/30" />
            </div>

            <Textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Query the document intelligence..."
              style={{ maxHeight: "160px", overflowY: "auto" }}
              className="flex-1 min-h-[32px] resize-none border-none bg-transparent text-white focus-visible:ring-0 py-1.5 px-0 text-[15px] placeholder:text-white/20 placeholder:italic leading-relaxed font-medium"
              disabled={isLoading}
            />

            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !hasInput}
              className={cn(
                "flex-shrink-0 h-10 w-10 rounded-2xl transition-all duration-300",
                hasInput
                  ? "bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(101,99,242,0.4)]"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5 ml-0.5" />
              )}
            </Button>
          </form>

          {/* Footer hints */}
          <div className="flex items-center justify-between w-full px-4 mt-3 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-white/50 font-medium tracking-wide">
              DocuMind uses advanced inference. Citing sources automatically.
            </span>
            <span className="text-[10px] text-white/30 font-medium">
              <kbd className="font-sans bg-white/5 px-1.5 py-0.5 rounded mr-1">Enter</kbd> to send
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
}