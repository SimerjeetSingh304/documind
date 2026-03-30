"use client";

import { useDocuments } from "@/hooks/use-documents";
import { Document } from "@/types";
import { ChevronLeft, FileText, Info, Layers, Calendar, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface DocumentSidebarProps {
  documentId: string;
}

export function DocumentSidebar({ documentId }: DocumentSidebarProps) {
  const router = useRouter();
  const { documents, isLoading } = useDocuments();
  
  const document = documents.find((doc) => doc.id === documentId) as Document & { _count?: { chunks: number } };

  if (isLoading) {
    return (
      <div className="w-[280px] h-full bg-[#13131A] border-r border-[#1E1E2E] p-6 space-y-6">
        <div className="h-8 w-24 bg-[#1E1E2E] animate-pulse rounded-lg" />
        <div className="space-y-4 pt-4">
           <div className="h-4 w-full bg-[#1E1E2E] animate-pulse rounded" />
           <div className="h-4 w-3/4 bg-[#1E1E2E] animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!document) return null;

  return (
    <div className="w-[300px] h-full bg-sidebar border-r border-sidebar-border flex flex-col overflow-y-auto">
      <div className="p-8 space-y-8">
        <Button 
          variant="ghost" 
          onClick={() => router.push("/documents")}
          className="text-muted-foreground/60 hover:text-foreground hover:bg-white/5 px-3 mb-2 rounded-full transition-all active:scale-95 text-xs font-bold"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Catalog
        </Button>
        
        <div className="flex flex-col gap-6">
          <div className="p-1 rounded-3xl glass-dark border-white/5 relative group overflow-hidden">
             <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="p-6 space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition duration-500">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-foreground font-black text-lg leading-tight tracking-tight break-words">{document.name}</h2>
                  <p className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-widest">Document Intelligence</p>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-8 pt-4">
          <div className="space-y-4">
             <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30">
                <Info className="w-3.5 h-3.5 mr-2 text-primary/50" />
                Metadata
             </div>
             <div className="space-y-3 px-1">
                <div className="flex justify-between items-center text-xs">
                   <span className="text-muted-foreground/60 font-medium italic">Size</span>
                   <span className="text-foreground font-bold font-mono">{(document.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                   <span className="text-muted-foreground/60 font-medium italic">Ingested</span>
                   <span className="text-foreground font-bold font-mono">{format(new Date(document.createdAt), "MMM d, yyyy")}</span>
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30">
                <Layers className="w-3.5 h-3.5 mr-2 text-primary/50" />
                Architecture
             </div>
             <div className="flex items-center justify-between px-1">
                <span className="text-xs text-muted-foreground/60 font-medium italic">Segments</span>
                <Badge variant="secondary" className="glass bg-white/5 text-primary border-none text-[10px] font-black uppercase tracking-widest py-0">
                   {document._count?.chunks || 0} Chunks
                </Badge>
             </div>
          </div>
          
          <div className="pt-4">
             <Button 
               asChild
               variant="outline"
               className="w-full text-xs border-white/5 bg-white/[0.02] text-foreground hover:bg-white/5 h-12 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
             >
                <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
                   Browse Architecture
                   <ExternalLink className="w-3.5 h-3.5 ml-2" />
                </a>
             </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-8">
         <div className="rounded-3xl glass-dark border-white/5 p-6 space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition duration-500" />
            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Operational Note</h4>
            <p className="text-[10px] text-muted-foreground/60 leading-relaxed font-medium italic">
               Verification through contextual anchors ensures 100% fidelity to the source document.
            </p>
         </div>
      </div>
    </div>
  );
}
