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
  Files
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const router = useRouter();
  const { documents, isLoading } = useDocuments();

  const totalDocs = documents.length;
  const totalChunks = documents.reduce((acc, doc) => acc + (doc as any)._count?.chunks || 0, 0);
  const totalStorage = (documents.reduce((acc, doc) => acc + doc.fileSize, 0) / 1024 / 1024).toFixed(2);
  
  const recentDocs = documents.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#F1F5F9]">Welcome back</h1>
        <p className="text-[#64748B] text-sm italic">Analyze your documents with AI, find insights instantly.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#13131A] border-[#1E1E2E] hover:border-[#6366F1]/40 transition group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Total Documents</CardTitle>
            <FileText className="w-4 h-4 text-[#6366F1]" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16 bg-[#1E1E2E]" /> : (
              <div className="flex items-baseline gap-2">
                 <div className="text-2xl font-bold text-[#F1F5F9]">{totalDocs}</div>
                 <div className="text-[10px] text-[#10B981] font-medium">+100% vs last month</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#13131A] border-[#1E1E2E] hover:border-[#6366F1]/40 transition group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Total Chunks</CardTitle>
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16 bg-[#1E1E2E]" /> : (
              <div className="text-2xl font-bold text-[#F1F5F9]">{totalChunks}</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#13131A] border-[#1E1E2E] hover:border-[#6366F1]/40 transition group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Storage Used</CardTitle>
            <Database className="w-4 h-4 text-[#64748B]" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16 bg-[#1E1E2E]" /> : (
              <div className="flex items-center gap-2">
                 <div className="text-2xl font-bold text-[#F1F5F9]">{totalStorage}</div>
                 <div className="text-sm font-medium text-[#64748B]">MB</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Documents */}
        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#F1F5F9] flex items-center">
                 <Clock className="w-4 h-4 mr-2 text-[#6366F1]" />
                 Recent Documents
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push("/documents")}
                className="text-[#6366F1] hover:text-[#6366F1] hover:bg-[#6366F1]/10 text-xs"
              >
                 View all
              </Button>
           </div>
           
           <div className="space-y-3">
              {isLoading ? (
                [...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full bg-[#13131A] rounded-xl border border-[#1E1E2E]" />)
              ) : recentDocs.length === 0 ? (
                <div className="p-10 border border-dashed border-[#1E1E2E] rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
                   <Files className="w-8 h-8 text-[#1E1E2E]" />
                   <p className="text-xs text-[#64748B]">No documents found. Upload one to see it here.</p>
                </div>
              ) : (
                recentDocs.map((doc) => (
                   <div 
                     key={doc.id}
                     onClick={() => router.push(`/chat/${doc.id}`)}
                     className="group p-4 bg-[#13131A] border border-[#1E1E2E] rounded-xl flex items-center justify-between hover:border-[#6366F1]/40 transition cursor-pointer"
                   >
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-[#1E1E2E] flex items-center justify-center group-hover:bg-[#6366F1]/10 transition">
                            <FileText className="w-4 h-4 text-[#64748B] group-hover:text-[#6366F1]" />
                         </div>
                         <div>
                            <p className="text-sm font-medium text-[#F1F5F9] truncate max-w-[150px]">{doc.name}</p>
                            <p className="text-[10px] text-[#64748B]">{format(new Date(doc.createdAt), "MMM d, yyyy")}</p>
                         </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#1E1E2E] group-hover:text-[#6366F1] transform group-hover:translate-x-1 transition" />
                   </div>
                ))
              )}
           </div>
        </div>

        {/* Quick Actions & Placeholder for Chat Hist */}
        <div className="space-y-4">
           <h3 className="text-lg font-semibold text-[#F1F5F9] flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-[#6366F1]" />
              Quick Actions
           </h3>
           <div className="grid grid-cols-1 gap-4">
              <Card 
                onClick={() => router.push("/documents")}
                className="bg-[#6366F1] border-none text-white cursor-pointer hover:bg-[#4F46E5] transition-colors relative overflow-hidden group"
              >
                 <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition duration-500">
                    <Plus className="w-32 h-32" />
                 </div>
                 <CardContent className="pt-6">
                    <h4 className="font-bold text-lg mb-1">New Document</h4>
                    <p className="text-white/80 text-sm">Upload a new PDF and start a conversation.</p>
                 </CardContent>
              </Card>

              <Card className="bg-[#13131A] border-[#1E1E2E] p-6 flex flex-col items-center justify-center text-center space-y-4">
                 <div className="w-12 h-12 rounded-full bg-[#1E1E2E] flex items-center justify-center">
                    <Bot className="w-6 h-6 text-[#6366F1]" />
                 </div>
                 <div className="space-y-1">
                    <h4 className="font-semibold text-[#F1F5F9]">AI Model: Llama-3-70b</h4>
                    <p className="text-xs text-[#64748B]">Powered by Groq Inference</p>
                 </div>
                 <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-[#1E1E2E] text-[#6366F1] border-none text-[10px]">Streaming</Badge>
                    <Badge variant="secondary" className="bg-[#1E1E2E] text-[#10B981] border-none text-[10px]">pgvector</Badge>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}

function Bot({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
