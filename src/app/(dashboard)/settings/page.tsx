import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Shield, Zap, Mail, Bot } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

export default async function SettingsPage() {
  const user = await currentUser();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#F1F5F9]">Settings</h1>
        <p className="text-[#64748B] text-sm mt-1">Manage your account and app preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-[#13131A] border-[#1E1E2E]">
          <CardHeader>
            <CardTitle className="text-lg text-[#F1F5F9] flex items-center">
              <User className="w-5 h-5 mr-2 text-[#6366F1]" />
              Account Information
            </CardTitle>
            <CardDescription className="text-[#64748B]">Your personal details from Clerk.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between p-3 rounded-lg bg-[#0A0A0F] border border-[#1E1E2E]">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-[#13131A] border border-[#1E1E2E] flex items-center justify-center">
                      <Bot className="w-6 h-6 text-[#6366F1]" />
                   </div>
                   <div>
                      <p className="text-sm font-medium text-[#F1F5F9]">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-[#64748B]">{user?.emailAddresses[0].emailAddress}</p>
                   </div>
                </div>
                <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20">Active</Badge>
             </div>
             
             <div className="space-y-2">
                <div className="flex items-center text-xs text-[#64748B]">
                   <Shield className="w-3.5 h-3.5 mr-2 text-[#6366F1]" />
                   Authentication Provider: Clerk
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="bg-[#13131A] border-[#1E1E2E]">
          <CardHeader>
            <CardTitle className="text-lg text-[#F1F5F9] flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              API Usage
            </CardTitle>
            <CardDescription className="text-[#64748B]">Overview of AI models and limits.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-3">
                <div className="flex justify-between text-sm">
                   <span className="text-[#64748B]">Embedding Model</span>
                   <span className="text-[#F1F5F9]">text-embedding-004</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-[#64748B]">Inference Model</span>
                   <span className="text-[#F1F5F9]">llama3-70b-8192</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-[#64748B]">Max File Size</span>
                   <span className="text-[#F1F5F9]">16 MB</span>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
