"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function UploadZone() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<"uploading" | "processing" | "saving" | "complete" | "error">("uploading");
  const [error, setError] = useState<string | null>(null);

  const onUploadComplete = async (res: any) => {
    setIsProcessing(true);
    setStep("processing");
    setProgress(100);
    
    try {
      setStep("complete");
      toast.success("Document processed successfully!");
      
      await queryClient.invalidateQueries({ 
        queryKey: ["documents"],
        refetchType: 'all'
      });
      
      setTimeout(() => {
        setIsProcessing(false);
        setStep("uploading");
        setProgress(0);
      }, 3000);
    } catch (err) {
      console.error(err);
      setStep("error");
      setError("Failed to process document. Please try again.");
      toast.error("Error processing document");
    }
  };

  return (
    <Card className="bg-[#13131A] border-[#1E1E2E] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl text-[#F1F5F9] font-semibold">Upload Documents</CardTitle>
        <CardDescription className="text-[#64748B]">
          Upload a PDF to start chatting with its content. (Max 16MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {!isProcessing ? (
          <div className="px-6 pb-6 mt-4">
            <UploadDropzone
              endpoint="pdfUploader"
              onClientUploadComplete={onUploadComplete}
              onUploadError={(error: Error) => {
                toast.error(`Upload failed: ${error.message}`);
              }}
              className="ut-label:text-[#6366F1] ut-allowed-content:text-[#64748B] ut-dropzone:bg-[#0A0A0F] ut-dropzone:border-[#1E1E2E] ut-button:bg-[#6366F1] hover:ut-button:bg-[#4F46E5] border-2 border-dashed border-[#1E1E2E] rounded-xl cursor-pointer hover:bg-[#1E1E2E]/30 transition ut-upload-icon:text-[#6366F1]"
            />
          </div>
        ) : (
          <div className="p-8 space-y-6 flex flex-col items-center justify-center min-h-[250px] bg-[#0A0A0F]/50">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {step !== "complete" && step !== "error" && (
                <div className="absolute inset-0">
                  <div className="w-full h-full rounded-full border-4 border-[#6366F1]/20 border-t-[#6366F1] animate-spin"></div>
                </div>
              )}
              {step === "processing" || step === "saving" ? (
                <FileText className="w-10 h-10 text-[#6366F1] animate-pulse" />
              ) : step === "complete" ? (
                <CheckCircle className="w-12 h-12 text-[#10B981] animate-bounce-short" />
              ) : step === "error" ? (
                <AlertCircle className="w-12 h-12 text-red-500" />
              ) : (
                <Loader2 className="w-10 h-10 text-[#6366F1] animate-spin" />
              )}
            </div>
            
            <div className="text-center space-y-2 w-full max-w-xs">
              <h3 className="text-lg font-medium text-[#F1F5F9]">
                {step === "processing" && "Extracting & Chunking..."}
                {step === "saving" && "Generating Embeddings & Saving..."}
                {step === "complete" && "All set!"}
                {step === "error" && "Something went wrong"}
              </h3>
              <p className="text-sm text-[#64748B]">
                {step === "complete" ? "Refresh the list to see your new document." : step === "error" ? error : "Almost there, stay on this page."}
              </p>
              
              <div className="pt-2">
                <Progress value={progress} className="h-2 bg-[#1E1E2E] overflow-hidden">
                   <div className="h-full bg-[#6366F1] transition-all duration-500" style={{ width: `${progress}%` }} />
                </Progress>
              </div>
            </div>

            {step === "error" && (
              <button 
                onClick={() => { setIsProcessing(false); setStep("uploading"); }}
                className="text-xs text-[#6366F1] hover:underline"
              >
                Try again
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
