"use client";

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface CitationChipProps {
  id: string;
  index: number;
  preview: string;
}

export function CitationChip({ id, index, preview }: CitationChipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className="cursor-help bg-[#1E1E2E] border-[#1E1E2E] text-[#6366F1] hover:bg-[#6366F1]/10 px-2 py-0.5"
          >
            Chunk {index + 1}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="bg-[#13131A] border-[#1E1E2E] text-[#F1F5F9] max-w-xs p-3 shadow-xl">
          <p className="text-xs leading-relaxed italic">
            "...{preview}..."
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
