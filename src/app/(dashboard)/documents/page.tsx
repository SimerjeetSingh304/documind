"use client";

import { useDocuments } from "@/hooks/use-documents";
import { DocumentCard } from "./_components/document-card";
import { UploadZone } from "./_components/upload-zone";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
  const { documents, isLoading } = useDocuments();
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#F1F5F9]">My Documents</h1>
          <p className="text-[#64748B] text-sm mt-1">Manage and upload your PDFs to start chatting with them.</p>
        </div>
        <Button 
          onClick={() => setIsUploading(!isUploading)}
          className="bg-[#6366F1] hover:bg-[#4F46E5] text-white"
        >
          {isUploading ? "Close" : (
             <>
               <Plus className="w-4 h-4 mr-2" />
               Upload New
             </>
          )}
        </Button>
      </div>

      {isUploading && (
        <div className="animate-in slide-in-from-top-4 duration-300">
          <UploadZone />
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl bg-[#13131A] border-[#1E1E2E]" />
          ))}
        </div>
      ) : documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 bg-[#13131A] border border-[#1E1E2E] rounded-2xl text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#1E1E2E] flex items-center justify-center">
            <FileText className="w-10 h-10 text-[#64748B]" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-xl font-semibold text-[#F1F5F9]">No documents yet</h3>
            <p className="text-[#64748B]">
              Upload your first PDF to begin. We'll extract the text and generate embeddings for chat.
            </p>
          </div>
          <Button 
            onClick={() => setIsUploading(true)}
            variant="outline"
            className="border-[#1E1E2E]"
          >
            Get Started
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
