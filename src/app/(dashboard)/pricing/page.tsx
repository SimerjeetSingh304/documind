"use client";

import { Database, Layers, Zap, Shield, UploadCloud, Bot, GitBranch, Server } from "lucide-react";

const stack = [
  {
    category: "Frontend",
    color: "indigo",
    icon: Layers,
    items: [
      { name: "Next.js 16", detail: "App Router · React Server Components" },
      { name: "TypeScript 5", detail: "End-to-end type safety" },
      { name: "Tailwind CSS v4", detail: "Utility-first styling" },
      { name: "Framer Motion", detail: "Micro-animations & transitions" },
      { name: "TanStack Query v5", detail: "Client-side caching & mutations" },
      { name: "Vercel AI SDK", detail: "useChat hook · streaming" },
    ],
  },
  {
    category: "Backend & API",
    color: "violet",
    icon: Server,
    items: [
      { name: "Next.js API Routes", detail: "POST /api/chat · GET /api/documents" },
      { name: "Prisma ORM 5", detail: "Type-safe DB access · $queryRaw for vectors" },
      { name: "UploadThing", detail: "Managed S3 file storage · 16MB PDF limit" },
      { name: "pdf-parse", detail: "Server-side text extraction from PDF buffers" },
    ],
  },
  {
    category: "AI Pipeline (RAG)",
    color: "emerald",
    icon: Bot,
    items: [
      { name: "Gemini 2.5 Flash", detail: "LLM · streaming · system prompt injection" },
      { name: "Gemini Embedding-001", detail: "1536-dim text embeddings" },
      { name: "pgvector", detail: "Cosine similarity · <=> operator" },
      { name: "Chunking", detail: "1000 chars · 200-char overlap" },
    ],
  },
  {
    category: "Database & Auth",
    color: "amber",
    icon: Database,
    items: [
      { name: "PostgreSQL (Supabase)", detail: "Relational + vector in one DB" },
      { name: "pgvector extension", detail: "vector(1536) column · no separate vector DB" },
      { name: "Clerk v7", detail: "Auth · JWT · OAuth (Google / GitHub)" },
      { name: "PgBouncer", detail: "Connection pooling via Supabase" },
    ],
  },
];

const pipeline = [
  { step: "01", label: "Upload", detail: "PDF → UploadThing S3", icon: UploadCloud, color: "text-amber-400 bg-amber-500/10 ring-amber-500/20" },
  { step: "02", label: "Parse", detail: "pdf-parse extracts text buffer", icon: GitBranch, color: "text-violet-400 bg-violet-500/10 ring-violet-500/20" },
  { step: "03", label: "Chunk", detail: "1000 chars, 200 overlap", icon: Layers, color: "text-indigo-400 bg-indigo-500/10 ring-indigo-500/20" },
  { step: "04", label: "Embed", detail: "Gemini → float[1536]", icon: Bot, color: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20" },
  { step: "05", label: "Store", detail: "INSERT … ::vector into pgvector", icon: Database, color: "text-rose-400 bg-rose-500/10 ring-rose-500/20" },
  { step: "06", label: "Query", detail: "embed question → cosine similarity top-5", icon: Zap, color: "text-sky-400 bg-sky-500/10 ring-sky-500/20" },
  { step: "07", label: "Generate", detail: "Gemini 2.5 Flash streams grounded answer", icon: Shield, color: "text-primary bg-primary/10 ring-primary/20" },
];

const colorMap: Record<string, string> = {
  indigo: "text-indigo-400 bg-indigo-500/10 ring-indigo-500/20 border-indigo-500/20",
  violet: "text-violet-400 bg-violet-500/10 ring-violet-500/20 border-violet-500/20",
  emerald: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20 border-emerald-500/20",
  amber: "text-amber-400 bg-amber-500/10 ring-amber-500/20 border-amber-500/20",
};

export default function ArchitecturePage() {
  return (
    <div className="max-w-[1100px] mx-auto space-y-14 animate-in fade-in slide-in-from-bottom-6 duration-700 py-4">

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
          <Zap className="w-3 h-3 fill-current" />
          System Architecture
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          How DocuMind Works
        </h1>
        <p className="text-white/40 text-sm font-medium max-w-xl leading-relaxed">
          End-to-end RAG pipeline — from PDF upload to streamed, citation-grounded AI responses using pgvector and Gemini.
        </p>
      </div>

      {/* RAG Pipeline Steps */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">RAG Pipeline</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {pipeline.map((p, i) => (
            <div key={p.step} className="relative flex flex-col gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 group">
              {/* Connector line */}
              {i < pipeline.length - 1 && (
                <div className="hidden lg:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-px bg-white/10 z-10" />
              )}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ring-1 shrink-0 ${p.color}`}>
                <p.icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[9px] font-black text-white/20 tracking-widest mb-0.5">{p.step}</div>
                <div className="text-sm font-black text-white">{p.label}</div>
                <div className="text-[10px] text-white/40 font-medium leading-snug mt-0.5">{p.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Technical Decision */}
      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          <span className="text-sm font-black text-white">Key Design Decision: pgvector over a dedicated vector DB</span>
        </div>
        <p className="text-sm text-white/50 leading-relaxed">
          Instead of adding Pinecone or Weaviate, I used PostgreSQL's <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs font-mono">pgvector</code> extension directly on Supabase.
          One database handles relational data (users, documents, messages) <em>and</em> vector similarity search via the <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs font-mono">&lt;=&gt;</code> cosine distance operator.
          Trade-off: pgvector doesn't scale to billions of vectors as well as dedicated DBs — but for this scope it eliminates an entire service dependency.
        </p>
      </div>

      {/* Stack Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Full Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {stack.map((section) => (
            <div
              key={section.category}
              className={`rounded-2xl bg-white/[0.02] border p-6 space-y-4 hover:bg-white/[0.035] transition-all duration-300 ${colorMap[section.color].split(" ").slice(3).join(" ")}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ring-1 shrink-0 ${colorMap[section.color]}`}>
                  <section.icon className="w-4 h-4" />
                </div>
                <h3 className="font-black text-white text-sm">{section.category}</h3>
              </div>
              <div className="space-y-2.5">
                {section.items.map((item) => (
                  <div key={item.name} className="flex items-start justify-between gap-4">
                    <span className="text-sm font-bold text-white/80">{item.name}</span>
                    <span className="text-[11px] text-white/30 font-medium text-right leading-snug">{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Models */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Database Schema</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { model: "User", fields: ["id: cuid", "clerkId: String (unique)", "email: String", "documents[]"], color: "text-indigo-400" },
            { model: "Document", fields: ["id: cuid", "name, fileUrl, fileSize", "userId → User", "chunks[], messages[]"], color: "text-violet-400" },
            { model: "DocumentChunk", fields: ["id: cuid", "content: String", "embedding: vector(1536)", "chunkIndex: Int"], color: "text-emerald-400" },
            { model: "ChatMessage", fields: ["id: cuid", "role: user | assistant", "content: String", "documentId → Document"], color: "text-amber-400" },
          ].map((m) => (
            <div key={m.model} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className={`text-xs font-black uppercase tracking-widest mb-3 ${m.color}`}>{m.model}</div>
              <div className="space-y-1.5">
                {m.fields.map((f) => (
                  <div key={f} className="text-[11px] font-mono text-white/40">{f}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
