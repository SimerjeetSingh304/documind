"use client";

import { useDocuments } from "@/hooks/use-documents";
import {
  FileText,
  MessageSquare,
  Database,
  ArrowRight,
  Plus,
  Clock,
  TrendingUp,
  Files,
  Zap,
  Bot,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const router = useRouter();
  const { documents, isLoading } = useDocuments();

  const totalDocs = documents.length;
  const totalChunks = documents.reduce(
    (acc, doc) => acc + ((doc as any)._count?.chunks || 0),
    0
  );
  const totalStorage = (
    documents.reduce((acc, doc) => acc + doc.fileSize, 0) /
    1024 /
    1024
  ).toFixed(2);

  const recentDocs = documents.slice(0, 3);

  const stats = [
    {
      label: "Documents",
      value: totalDocs,
      icon: FileText,
      accent: "text-violet-400",
      bg: "bg-violet-500/10",
      ring: "ring-violet-500/15",
      sub: "total uploaded",
    },
    {
      label: "Indexed Chunks",
      value: totalChunks,
      icon: TrendingUp,
      accent: "text-emerald-400",
      bg: "bg-emerald-500/10",
      ring: "ring-emerald-500/15",
      sub: "vector embeddings",
    },
    {
      label: "Storage Used",
      value: `${totalStorage} MB`,
      icon: Database,
      accent: "text-amber-400",
      bg: "bg-amber-500/10",
      ring: "ring-amber-500/15",
      sub: "cloud optimized",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 pb-20 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white/90 tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-[11px] text-white/30 font-medium">Real-time insights active</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="relative rounded-xl bg-white/[0.03] border border-white/[0.06] px-5 py-4 overflow-hidden group hover:border-white/10 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
                  {stat.label}
                </p>
                {isLoading ? (
                  <Skeleton className="h-8 w-20 bg-white/5 rounded-lg" />
                ) : (
                  <p className="text-3xl font-bold text-white/90 tracking-tight">
                    {stat.value}
                  </p>
                )}
                <p className="text-[10px] text-white/20 font-medium">{stat.sub}</p>
              </div>
              <div className={cn("p-2 rounded-lg ring-1", stat.bg, stat.ring)}>
                <stat.icon className={cn("w-4 h-4", stat.accent)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Recent Documents */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-white/25" />
              <h2 className="text-sm font-semibold text-white/60">Recent Documents</h2>
            </div>
            <button
              onClick={() => router.push("/documents")}
              className="flex items-center gap-1 text-[11px] font-medium text-violet-400/70 hover:text-violet-400 transition-colors"
            >
              View all
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full bg-white/[0.03] rounded-xl" />
              ))
            ) : recentDocs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-white/[0.06] space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                  <Files className="w-5 h-5 text-white/15" />
                </div>
                <p className="text-xs text-white/20 font-medium">No documents yet. Upload a PDF to get started.</p>
                <Button
                  size="sm"
                  onClick={() => router.push("/documents")}
                  className="h-7 text-[11px] bg-violet-500/15 hover:bg-violet-500/25 text-violet-400 border border-violet-500/20 rounded-lg font-medium"
                >
                  Upload PDF
                </Button>
              </div>
            ) : (
              recentDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => router.push(`/chat/${doc.id}`)}
                  className="group flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/10 ring-1 ring-violet-500/15">
                      <FileText className="w-3.5 h-3.5 text-violet-400" />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-sm font-medium text-white/75 truncate max-w-[240px]">
                        {doc.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/25 font-medium">
                          {format(new Date(doc.createdAt), "MMM d, yyyy")}
                        </span>
                        <span className="text-white/10">·</span>
                        <span className="text-[10px] font-semibold text-white/20 uppercase tracking-wider">
                          PDF
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/15 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Upload CTA */}
          <div
            onClick={() => router.push("/documents")}
            className="relative rounded-xl bg-violet-500/10 border border-violet-500/15 p-5 cursor-pointer hover:bg-violet-500/15 transition-all duration-150 overflow-hidden group"
          >
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-violet-500/20 blur-2xl rounded-full group-hover:bg-violet-500/30 transition-colors" />
            <div className="relative space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-violet-500/20 ring-1 ring-violet-500/25">
                  <Plus className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <h3 className="text-sm font-semibold text-white/80">Upload Document</h3>
              </div>
              <p className="text-[11px] text-white/35 leading-relaxed">
                Add a new PDF to your library and start chatting with it instantly.
              </p>
              <Button
                size="sm"
                className="mt-3 h-7 text-[11px] bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/20 rounded-lg font-semibold transition-all duration-150"
              >
                Quick Upload
              </Button>
            </div>
          </div>

          {/* Model Info */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-white/20" />
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
                Active Model
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-500/10 ring-1 ring-violet-500/15">
                <Bot className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/70">Llama 3 · 70B</p>
                <p className="text-[10px] text-white/25 font-medium">via Groq Inference</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/15">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-semibold text-emerald-400/80">Live</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/[0.04]">
              {["Streaming", "RAG Pipeline", "pgvector"].map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-semibold uppercase tracking-wider text-white/25 px-2 py-0.5 rounded-md bg-white/[0.04] ring-1 ring-white/[0.06]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}