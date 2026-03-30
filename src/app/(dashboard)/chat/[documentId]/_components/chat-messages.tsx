"use client";

import { Message } from "ai";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { CitationChip } from "./citation-chip";

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
      className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 space-y-8 scrollbar-hide pb-40 relative z-10"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <AnimatePresence initial={false}>

          {/* Empty state */}
          {messages.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                <div className="relative flex items-center justify-center w-16 h-16 rounded-[20px] glass border-white/10 shadow-2xl">
                   <img src="/avatars/bot.png" className="w-10 h-10 object-cover rounded-lg" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white tracking-tight">Intelligence Active</h3>
                <p className="text-sm text-white/40 max-w-sm leading-relaxed font-medium">
                  Enter your query. The RAG pipeline will retrieve and cite the exact context you need.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                {["Contextually Aware", "Zero-Hallucination"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/30 px-3 py-1 rounded-lg glass border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages */}
          {messages.map((message, i) => {
            const isUser = message.role === "user";
            const isLast = i === messages.length - 1;

            return (
              <motion.div
                key={message.id || i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-start gap-5 z-10 w-full"
              >
                {/* Avatar */}
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center p-0.5 shrink-0 relative mt-0.5",
                  isUser ? "bg-white/5 border border-white/10" : "bg-primary/10 border border-primary/30"
                )}>
                  {!isUser && <div className="absolute inset-0 bg-primary/20 blur-md rounded-xl" />}
                  <img 
                     src={isUser ? "/avatars/user.png" : "/avatars/bot.png"} 
                     className="w-full h-full object-cover rounded-lg z-10" 
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 flex-1 min-w-0">
                  {/* Sender Name */}
                  <div className="text-xs font-bold uppercase tracking-widest text-white/40">
                    {isUser ? "You" : "DocuMind"}
                  </div>
                  
                  {/* Bubble / Text Content */}
                  <div
                    className={cn(
                      "text-[15px] leading-relaxed font-medium max-w-full text-left break-words",
                      isUser
                        ? "text-white/90"
                        : "text-white/80"
                    )}
                  >
                    {message.content}

                    {/* Inline Citations for Assistant */}
                    {!isUser && isLast && sources && sources.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="flex items-center gap-2 mt-5 pt-4 border-t border-white/5 w-full"
                      >
                        <span className="text-[9px] uppercase font-black text-white/30 tracking-[0.2em] shrink-0">Citations</span>
                        <div className="flex flex-wrap gap-1.5 overflow-hidden">
                          {sources.map((source) => (
                            <CitationChip key={source.id} {...source} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Typing indicator */}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-5 z-10 w-full"
            >
              <div className="w-10 h-10 rounded-xl border border-primary/30 bg-primary/10 p-0.5 shrink-0 flex items-center justify-center relative mt-0.5">
                 <div className="absolute inset-0 bg-primary/20 blur-md rounded-xl" />
                 <img src="/avatars/bot.png" className="w-full h-full object-cover rounded-lg z-10" />
              </div>
              
              <div className="flex flex-col gap-3 flex-1">
                <div className="text-xs font-bold uppercase tracking-widest text-white/40">
                  DocuMind
                </div>
                
                <div className="text-[15px] py-1 text-white/80">
                  <div className="flex gap-1.5 items-center">
                     <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce [animation-delay:-0.3s]" />
                     <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce [animation-delay:-0.15s]" />
                     <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}