import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, FileText, Zap, Shield, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0F] text-[#F1F5F9] selection:bg-[#6366F1]/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E] backdrop-blur-md sticky top-0 z-50 bg-[#0A0A0F]/80">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Bot className="w-8 h-8 text-[#6366F1]" />
          DocuMind
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium hover:text-[#6366F1] transition">
            Dashboard
          </Link>
          <Button asChild className="bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-full px-6">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-24 md:py-32 flex flex-col items-center text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6366F1]/10 rounded-full blur-[120px] -z-10" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1E2E] border border-[#6366F1]/20 text-[10px] uppercase font-bold tracking-widest text-[#6366F1] mb-4">
            <Zap className="w-3 h-3 fill-current" />
            AI-Powered Document Analysis
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl bg-gradient-to-b from-[#F1F5F9] to-[#64748B] bg-clip-text text-transparent leading-[1.1]">
             Chat with your <span className="text-[#6366F1]">PDFs</span> like never before.
          </h1>
          
          <p className="text-lg md:text-xl text-[#64748B] max-w-2xl leading-relaxed">
            Upload your documents and let DocuMind extract insights instantly. Powered by Llama 3 and pgvector for high-performance RAG.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <Button asChild size="lg" className="bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-full px-8 h-14 text-lg">
                <Link href="/dashboard">
                   Start Chatting <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
             </Button>
             <Button variant="outline" size="lg" className="border-[#1E1E2E] hover:bg-[#1E1E2E] text-[#F1F5F9] rounded-full px-8 h-14 text-lg">
                <Link href="#features">Learn More</Link>
             </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-24 bg-[#0D0D14] border-y border-[#1E1E2E]">
          <div className="max-w-6xl mx-auto">
             <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-[#F1F5F9]">Intelligent Document Discovery</h2>
                <p className="text-[#64748B] max-w-xl mx-auto text-sm">Everything you need to analyze complex PDF documents with pinpoint accuracy.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Advanced RAG",
                    desc: "Using similarity search with pgvector to find the most relevant context for every query.",
                    icon: Search,
                  },
                  {
                    title: "Instant Streaming",
                    desc: "Real-time responses powered by Groq's high-speed inference engine.",
                    icon: Zap,
                  },
                  {
                    title: "Source Citations",
                    desc: "Every answer includes direct citations to the document chunks used.",
                    icon: FileText,
                  }
                ].map((feature, i) => (
                  <div key={i} className="p-8 rounded-2xl bg-[#13131A] border border-[#1E1E2E] hover:border-[#6366F1]/30 transition group">
                     <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                        <feature.icon className="w-6 h-6 text-[#6366F1]" />
                     </div>
                     <h3 className="text-xl font-bold text-[#F1F5F9] mb-3">{feature.title}</h3>
                     <p className="text-[#64748B] text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[#1E1E2E] flex flex-col md:flex-row items-center justify-between text-[#64748B] text-xs gap-6">
        <div className="flex items-center gap-2 font-bold text-sm text-[#F1F5F9]">
          <Bot className="w-6 h-6 text-[#6366F1]" />
          DocuMind
        </div>
        <p>&copy; 2024 DocuMind AI. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
