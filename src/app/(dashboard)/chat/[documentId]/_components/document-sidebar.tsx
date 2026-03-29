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
    <div className="w-[280px] h-full bg-[#13131A] border-r border-[#1E1E2E] flex flex-col overflow-y-auto">
      <div className="p-4">
        <Button 
          variant="ghost" 
          onClick={() => router.push("/documents")}
          className="text-[#64748B] hover:text-[#F1F5F9] hover:bg-[#1E1E2E] px-2 mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to list
        </Button>
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#6366F1]" />
          </div>
          <div className="flex-1 overflow-hidden">
            <h2 className="text-[#F1F5F9] font-semibold text-sm truncate">{document.name}</h2>
            <p className="text-[10px] text-[#64748B]">Document Information</p>
          </div>
        </div>

        <Separator className="bg-[#1E1E2E] mb-6" />

        <div className="space-y-6">
          <div className="space-y-3">
             <div className="flex items-center text-xs text-[#64748B]">
                <Info className="w-3.5 h-3.5 mr-2 text-[#6366F1]" />
                <span className="font-medium">Details</span>
             </div>
             <div className="grid grid-cols-2 gap-y-3 px-1 text-[11px]">
                <span className="text-[#64748B]">Size</span>
                <span className="text-[#F1F5F9] text-right">{(document.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                <span className="text-[#64748B]">Uploaded</span>
                <span className="text-[#F1F5F9] text-right">{format(new Date(document.createdAt), "MMM d, yyyy")}</span>
             </div>
          </div>

          <div className="space-y-3">
             <div className="flex items-center text-xs text-[#64748B]">
                <Layers className="w-3.5 h-3.5 mr-2 text-[#6366F1]" />
                <span className="font-medium">Vector Storage</span>
             </div>
             <div className="flex items-center justify-between px-1">
                <span className="text-[11px] text-[#64748B]">Chunk count</span>
                <Badge variant="secondary" className="bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/20 text-[10px] py-0">
                   {document._count?.chunks || 0} chunks
                </Badge>
             </div>
          </div>
          
          <div className="pt-4">
             <Button 
               asChild
               variant="outline"
               className="w-full text-xs border-[#1E1E2E] bg-[#0A0A0F] text-[#F1F5F9] hover:bg-[#1E1E2E] h-9"
             >
                <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
                   View Original PDF
                   <ExternalLink className="w-3 h-3 ml-2" />
                </a>
             </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-4">
         <div className="rounded-xl bg-[#6366F1]/5 border border-[#6366F1]/10 p-4 space-y-2">
            <h4 className="text-[11px] font-bold text-[#6366F1] uppercase tracking-wider">Note</h4>
            <p className="text-[10px] text-[#64748B] leading-relaxed">
               I answer questions based solely on the extracted text from this document. I'll cite sections for accuracy.
            </p>
         </div>
      </div>
    </div>
  );
}
