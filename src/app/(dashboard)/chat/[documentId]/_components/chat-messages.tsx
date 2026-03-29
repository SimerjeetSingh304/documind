"use client";

import { Message } from "ai";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CitationChip } from "./citation-chip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  sources?: { id: string; index: number; preview: string }[];
}

export function ChatMessages({ messages, isLoading, sources }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  return (
    <div 
      ref={scrollRef} 
      className="flex-1 overflow-y-auto px-4 py-8 space-y-6 scrollbar-hide"
    >
      <AnimatePresence initial={false}>
        {messages.length === 0 && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-12 text-center space-y-4 h-full"
          >
            <div className="w-16 h-16 rounded-full bg-[#13131A] border border-[#1E1E2E] flex items-center justify-center">
              <Bot className="w-8 h-8 text-[#6366F1]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-[#F1F5F9]">Ready to Chat?</h3>
              <p className="text-sm text-[#64748B] max-w-xs">
                Ask anything about the document. I will use the provided context to answer.
              </p>
            </div>
          </motion.div>
        )}

        {messages.map((message, i) => {
          const isUser = message.role === "user";
          const isLastMessage = i === messages.length - 1;

          return (
            <motion.div
              key={message.id || i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-start gap-4",
                isUser ? "flex-row-reverse" : "flex-row"
              )}
            >
              <Avatar className={cn(
                "h-9 w-9 border",
                isUser ? "border-[#6366F1] bg-[#6366F1]/10" : "border-[#1E1E2E] bg-[#13131A]"
              )}>
                {isUser ? (
                   <User className="w-5 h-5 text-[#6366F1]" />
                ) : (
                   <Bot className="w-5 h-5 text-white" />
                )}
              </Avatar>
              
              <div className={cn(
                "flex flex-col gap-2 max-w-[80%]",
                isUser ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                  isUser 
                    ? "bg-[#6366F1] text-white rounded-tr-none" 
                    : "bg-[#13131A] border border-[#1E1E2E] text-[#F1F5F9] rounded-tl-none"
                )}>
                  {message.content}
                </div>
                
                {!isUser && isLastMessage && sources && sources.length > 0 && (
                   <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider mt-1 mr-1">Sources used:</span>
                      {sources.map((source) => (
                        <CitationChip key={source.id} {...source} />
                      ))}
                   </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-4"
          >
            <Avatar className="h-9 w-9 border border-[#1E1E2E] bg-[#13131A]">
              <Bot className="w-5 h-5 text-white" />
            </Avatar>
            <div className="bg-[#13131A] border border-[#1E1E2E] px-4 py-3 rounded-2xl rounded-tl-none">
              <Loader2 className="w-5 h-5 text-[#6366F1] animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
