"use client";

import { useDocuments } from "@/hooks/use-documents";
import {
  FileText,
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

  const recentDocs = documents.slice(0, 4);

  const stats = [
    {
      label: "Documents",
      value: totalDocs,
      icon: FileText,
      accent: "text-violet-400",
      bg: "bg-violet-500/10",
      glow: "group-hover:bg-violet-500/20",
      ring: "ring-violet-500/15",
      sub: "total indexed",
    },
    {
      label: "Vector Chunks",
      value: totalChunks,
      icon: TrendingUp,
      accent: "text-emerald-400",
      bg: "bg-emerald-500/10",
      glow: "group-hover:bg-emerald-500/20",
      ring: "ring-emerald-500/15",
      sub: "embeddings active",
    },
    {
      label: "Storage Used",
      value: `${totalStorage} MB`,
      icon: Database,
      accent: "text-amber-400",
      bg: "bg-amber-500/10",
      glow: "group-hover:bg-amber-500/20",
      ring: "ring-amber-500/15",
      sub: "optimized tier",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-black text-white tracking-tight">System Status</h1>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="text-xs text-white/40 font-semibold tracking-wider uppercase">All pipelines active</p>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group relative rounded-[24px] glass border-white/5 px-6 py-6 overflow-hidden hover:border-white/10 hover:-translate-y-1 transition-all duration-300"
          >
            {/* Animated Glow Overlay */}
            <div className={cn("absolute -right-8 -top-8 w-32 h-32 blur-[50px] transition-all duration-500 pointer-events-none opacity-50", stat.bg, stat.glow)} />
            
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                  {stat.label}
                </p>
                {isLoading ? (
                  <Skeleton className="h-10 w-24 bg-white/5 rounded-xl" />
                ) : (
                  <p className="text-4xl font-black text-white tracking-tight">
                    {stat.value}
                  </p>
                )}
                <p className="text-[11px] text-white/40 font-medium">{stat.sub}</p>
              </div>
              <div className={cn("p-3 rounded-2xl ring-1 transition-transform duration-500 group-hover:scale-110", stat.bg, stat.ring)}>
                <stat.icon className={cn("w-5 h-5", stat.accent)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Recent Documents */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white/30" />
              <h2 className="text-sm font-bold text-white/70">Recent Indexes</h2>
            </div>
            <button
              onClick={() => router.push("/documents")}
              className="flex items-center gap-1 text-xs font-semibold text-primary/70 hover:text-primary transition-colors group"
            >
              View all
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-[76px] w-full bg-white/[0.02] rounded-[20px]" />
              ))
            ) : recentDocs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 rounded-[24px] border border-dashed border-white/10 bg-white/[0.01] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] ring-1 ring-white/10 flex items-center justify-center">
                  <Files className="w-6 h-6 text-white/20" />
                </div>
                <p className="text-sm text-white/30 font-medium">Repository empty. Initialize a new document.</p>
                <Button
                  onClick={() => router.push("/documents")}
                  className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl font-bold h-10 px-6"
                >
                  Upload First Document
                </Button>
              </div>
            ) : (
              recentDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => router.push(`/chat/${doc.id}`)}
                  className="group flex items-center justify-between px-5 py-4 rounded-[20px] glass border-white/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] ring-1 ring-white/10 group-hover:bg-primary/10 group-hover:ring-primary/20 transition-all duration-300">
                      <FileText className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <p className="text-sm font-bold text-white/90 truncate max-w-[280px]">
                        {doc.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/30 font-medium uppercase tracking-wider">
                          {format(new Date(doc.createdAt), "MMM d, yyyy")}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="text-[10px] font-black text-emerald-400/80 uppercase tracking-widest bg-emerald-500/10 px-1.5 py-0.5 rounded pl-1">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.02] group-hover:bg-primary group-hover:text-white text-white/20 transition-all duration-300 transform group-hover:-rotate-45">
                     <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column / Action Bento */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Upload CTA Card */}
          <div
            onClick={() => router.push("/documents")}
            className="flex-1 min-h-[160px] relative rounded-[24px] glass-dark border-white/5 p-6 cursor-pointer hover:border-primary/30 transition-all duration-500 overflow-hidden group flex flex-col justify-end"
          >
            {/* Immersive Blur */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] group-hover:bg-primary/30 transition-colors duration-700 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col min-h-full">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-auto ring-1 ring-primary/20 group-hover:scale-110 group-hover:-rotate-3 transition duration-500">
                 <Plus className="w-6 h-6 text-primary" />
              </div>
              <div className="mt-8">
                 <h3 className="text-xl font-black text-white mb-2 tracking-tight">Deploy Document</h3>
                 <p className="text-xs text-white/40 leading-relaxed font-medium">
                   Initialize a new vector search index.
                 </p>
              </div>
            </div>
          </div>

          {/* Infrastructure Info */}
          <div className="relative rounded-[24px] glass border-white/5 p-6 space-y-5 overflow-hidden group hover:border-white/10 transition-all duration-300">
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-indigo-500/10 blur-[50px] pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-white/30" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                  Infrastructure
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 ring-1 ring-emerald-500/20">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                 <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Healthy</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/[0.02] p-3 rounded-[16px]">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/15 ring-1 ring-primary/30 p-0.5">
                <img src="/avatars/bot.png" alt="Bot" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div>
                <p className="text-sm font-black text-white tracking-tight">Llama 3 · 70B</p>
                <p className="text-[10px] text-white/30 font-medium">Inference Node active</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {["Flash Attention", "pgvector", "Streaming API"].map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-black uppercase tracking-wider text-white/30 px-2 py-1 rounded-md bg-background/50 ring-1 ring-white/10"
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