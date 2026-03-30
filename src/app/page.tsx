import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, FileText, Zap, Shield, Search } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

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
          <Show when="signed-in">
            <Link href="/dashboard" className="text-sm font-medium hover:text-[#6366F1] transition">
              Dashboard
            </Link>
            <UserButton />
          </Show>
          <Show when="signed-out">
            <Link href="/sign-in" className="text-sm font-medium hover:text-[#6366F1] transition">
              Sign In
            </Link>
            <Button asChild className="bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-full px-6">
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </Show>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-32 md:py-48 flex flex-col items-center text-center space-y-10 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark border-primary/20 text-[10px] uppercase font-bold tracking-widest text-primary mb-4 animate-reveal">
            <Zap className="w-3.5 h-3.5 fill-current" />
            Next-Gen Document Intelligence
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight max-w-5xl text-gradient leading-[1.05] animate-reveal [animation-delay:200ms]">
             Chat with your <span className="text-primary italic">Knowledge</span> Base.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed animate-reveal [animation-delay:400ms]">
            Unlock the hidden insights in your PDF documents. DocuMind uses high-performance RAG to give you answers in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pt-6 animate-reveal [animation-delay:600ms]">
             <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-16 text-lg shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                <Link href="/dashboard">
                   Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
             </Button>
             <Button variant="outline" size="lg" className="glass border-white/10 hover:bg-white/5 text-foreground rounded-full px-10 h-16 text-lg transition-all hover:scale-105 active:scale-95">
                <Link href="#features">Explore Features</Link>
             </Button>
          </div>

          {/* Floating Element Mockup */}
          <div className="mt-20 w-full max-w-5xl mx-auto rounded-3xl border border-white/10 glass p-4 animate-reveal [animation-delay:800ms] shadow-2xl relative">
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full" />
             <div className="bg-background/50 rounded-2xl aspect-[16/9] flex items-center justify-center border border-white/5 overflow-hidden group">
                <div className="flex flex-col items-center gap-4 group-hover:scale-110 transition duration-1000">
                   <Bot className="w-16 h-16 text-primary/50" />
                   <p className="text-muted-foreground text-sm font-mono">Interactive Dashboard Preview</p>
                </div>
             </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-32 relative">
          <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10" />
          <div className="max-w-6xl mx-auto">
             <div className="text-center mb-24 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">Built for Accuracy and Speed</h2>
                <p className="text-muted-foreground max-w-xl mx-auto text-lg">Sophisticated AI infrastructure designed for professional document analysis.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {
                    title: "Hyper-Relevant RAG",
                    desc: "Uses vector similarity search to find the exact paragraphs needed for your answer.",
                    icon: Search,
                  },
                  {
                    title: "Instant Ingestion",
                    desc: "Upload once, query forever. Documents are chunked and embedded in real-time.",
                    icon: Zap,
                  },
                  {
                    title: "Verifiable Sources",
                    desc: "Never guess. Every assistant response comes with direct citations back to the source.",
                    icon: FileText,
                  }
                ].map((feature, i) => (
                  <div key={i} className="group p-10 rounded-3xl glass border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2">
                     <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 rotate-3 group-hover:rotate-0 transition duration-500">
                        <feature.icon className="w-8 h-8 text-primary" />
                     </div>
                     <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                     <p className="text-muted-foreground leading-relaxed italic text-sm">{feature.desc}</p>
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
