"use client";

import { FileText, Trash2, MessageSquare, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDocuments } from "@/hooks/use-documents";
import { Document } from "@/types";

interface DocumentCardProps {
  document: Document & { _count?: { chunks: number } };
}

export function DocumentCard({ document }: DocumentCardProps) {
  const router = useRouter();
  const { deleteDocument, isDeleting } = useDocuments();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const formattedDate = format(new Date(document.createdAt), "MMM d, yyyy");
  const fileSizeMB = (document.fileSize / (1024 * 1024)).toFixed(2);

  const handleDelete = () => {
    deleteDocument(document.id);
  };

  return (
    <Card className="group relative hover:border-[#6366F1]/50 transition bg-[#13131A] border-[#1E1E2E] overflow-hidden">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full"
          onClick={() => setShowConfirmDelete(true)}
          disabled={isDeleting}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <CardHeader className="flex flex-row items-center justify-between pb-2 pr-10">
        <CardTitle className="text-sm font-medium text-[#F1F5F9] truncate">
          {document.name}
        </CardTitle>
        <FileText className="w-4 h-4 text-[#6366F1] flex-shrink-0" />
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center text-xs text-[#64748B]">
            <Calendar className="w-3 h-3 mr-1" />
            {formattedDate}
          </div>
          <div className="flex items-center text-xs text-[#64748B] flex-wrap gap-2 mt-2">
            <Badge variant="secondary" className="bg-[#1E1E2E] text-[#F1F5F9] border-[#1E1E2E]/50">
              {fileSizeMB} MB
            </Badge>
            <Badge variant="secondary" className="bg-[#1E1E2E] text-[#F1F5F9] border-[#1E1E2E]/50">
              {document._count?.chunks || 0} Chunks
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-[#1E1E2E] pt-4 mt-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-[#F1F5F9] border-[#1E1E2E] hover:bg-[#6366F1] hover:border-[#6366F1] hover:text-white transition-all"
          onClick={() => router.push(`/chat/${document.id}`)}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Open Chat
        </Button>
      </CardFooter>

      {showConfirmDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <Card className="max-w-md w-full border-[#1E1E2E] bg-[#13131A]">
            <CardHeader>
              <CardTitle className="text-[#F1F5F9]">Delete Document?</CardTitle>
              <p className="text-sm text-[#64748B]">
                This will permanently delete this document and all its chat history. This action cannot be undone.
              </p>
            </CardHeader>
            <CardFooter className="flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDelete(false)}
                className="border-[#1E1E2E] hover:bg-[#1E1E2E]"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </Card>
  );
}
