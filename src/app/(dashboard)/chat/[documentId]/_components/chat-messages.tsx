"use client";

import { Message } from "ai";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User } from "lucide-react";
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
      className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 space-y-6 scrollbar-hide"
    >
      <AnimatePresence initial={false}>

        {/* Empty state */}
        {messages.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center h-full min-h-[40vh] text-center space-y-4"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-500/10 ring-1 ring-violet-500/20">
              <Bot className="w-5 h-5 text-violet-400" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-white/70">Ready to answer</h3>
              <p className="text-[12px] text-white/30 max-w-xs leading-relaxed">
                Ask anything about this document. I'll find relevant context and cite my sources.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              {["RAG Pipeline", "Streaming", "Citations"].map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-semibold uppercase tracking-wider text-white/20 px-2 py-0.5 rounded-md bg-white/[0.04] ring-1 ring-white/[0.06]"
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
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={cn(
                "flex items-start gap-3",
                isUser ? "flex-row-reverse" : "flex-row"
              )}
            >
              {/* Avatar */}
              <Avatar className={cn(
                "h-10 w-10 border transition-all duration-500",
                isUser ? "border-primary/50 shadow-[0_0_15px_rgba(101,99,242,0.2)] bg-primary/10" : "border-white/10 bg-white/5 shadow-sm"
              )}>
                {isUser ? (
                   <>
                     <AvatarImage src="/avatars/user.png" className="object-cover" />
                     <AvatarFallback><User className="w-5 h-5 text-primary" /></AvatarFallback>
                   </>
                ) : (
                   <>
                     <AvatarImage src="/avatars/bot.png" className="object-cover shadow-glow" />
                     <AvatarFallback><Bot className="w-5 h-5 text-white shadow-glow" /></AvatarFallback>
                   </>
                )}
              </Avatar>

              {/* Bubble + citations */}
              <div
                className={cn(
                  "flex flex-col gap-2 max-w-[80%] sm:max-w-[70%]",
                  isUser ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "px-4 py-3 rounded-2xl text-sm leading-relaxed font-normal transition-colors duration-150",
                    isUser
                      ? "bg-violet-500/20 text-white/85 rounded-tr-sm ring-1 ring-violet-500/20"
                      : "bg-white/[0.04] text-white/70 rounded-tl-sm ring-1 ring-white/[0.06] hover:bg-white/[0.06]"
                  )}
                >
                  {message.content}
                </div>

                {/* Citations */}
                {!isUser && isLast && sources && sources.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col gap-2"
                  >
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-white/20 px-1">
                      Sources
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sources.map((source) => (
                        <CitationChip key={source.id} {...source} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4 animate-reveal"
          >
            <Avatar className="h-10 w-10 border border-white/10 bg-white/5 shadow-sm">
              <AvatarImage src="/avatars/bot.png" className="object-cover shadow-glow" />
              <AvatarFallback><Bot className="w-5 h-5 text-white shadow-glow" /></AvatarFallback>
            </Avatar>
            <div className="glass border-white/5 px-6 py-4 rounded-[28px] rounded-tl-none shadow-xl">
              <div className="flex gap-1.5 items-center">
                 <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                 <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                 <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}