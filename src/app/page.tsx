import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, FileText, Zap, Shield, Search, UploadCloud, Layers } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans overflow-x-hidden">
      
      {/* Immersive Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="fixed inset-0 -z-10 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

      {/* Floating Pill Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full glass-dark border-white/10 px-6 py-3.5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/5 animate-in fade-in slide-in-from-top-4 duration-700">
        <Link href="/" className="flex items-center gap-2.5 font-bold group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 ring-1 ring-primary/30 group-hover:ring-primary/50 transition-all duration-300 overflow-hidden">
             <img src="/avatars/bot.png" alt="Logo" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
          </div>
          <span className="text-white tracking-tight group-hover:text-primary transition-colors duration-300">DocuMind</span>
        </Link>
        <div className="flex items-center gap-5">
          <Show when="signed-in">
            <Link href="/dashboard" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">
              Dashboard
            </Link>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 rounded-lg ring-1 ring-white/10" } }} />
          </Show>
          <Show when="signed-out">
            <Link href="/sign-in" className="text-sm font-semibold text-white/70 hover:text-white transition-colors hidden sm:block">
              Sign In
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 h-9 text-xs font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </Show>
        </div>
      </nav>

      <main className="flex-1 pt-32 md:pt-48 pb-20">
        {/* Hero Section */}
        <section className="px-6 flex flex-col items-center text-center space-y-8 relative max-w-5xl mx-auto">
          {/* Animated Glows */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark border-white/10 text-[10px] uppercase font-black tracking-[0.2em] text-primary mb-2 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap className="w-3 h-3 fill-current" />
            Protocol Online: Llama-3-70b
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tight text-white leading-[1.05] animate-reveal">
             Chat directly with your <br className="hidden md:block"/>
             <span className="text-gradient italic block mt-1">Knowledge Base.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl leading-relaxed font-medium animate-reveal [animation-delay:200ms]">
            Unlock hidden insights in massive PDF repositories. DocuMind utilizes high-performance Vector RAG to deliver accurate, cited answers in milliseconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto animate-reveal [animation-delay:400ms]">
             <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-10 h-14 text-base font-bold shadow-2xl shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98] group">
                <Link href="/dashboard">
                   Deploy Workspace
                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
             </Button>
             <Button asChild variant="outline" size="lg" className="glass border-white/10 hover:bg-white/5 text-foreground rounded-2xl px-10 h-14 text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Link href="#architecture">Explore Architecture</Link>
             </Button>
          </div>

          {/* Realistic Dashboard/Chat Mockup */}
          <div className="mt-24 w-full rounded-[32px] border border-white/10 glass-dark p-2 animate-reveal [animation-delay:600ms] shadow-2xl shadow-black/50 relative overflow-hidden group">
             {/* Window Controls */}
             <div className="h-10 flex items-center px-4 gap-2 border-b border-white/5 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <div className="mx-auto text-[10px] font-mono text-white/30 tracking-widest bg-white/5 px-4 py-1 rounded-full">documind-ui-preview</div>
             </div>
             
             {/* Mock Layout */}
             <div className="flex h-[400px] md:h-[600px] bg-background/50 rounded-b-[24px] overflow-hidden relative">
                
                {/* Mock Sidebar */}
                <div className="hidden md:flex w-64 bg-sidebar border-r border-sidebar-border flex-col p-6 space-y-8">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/15 ring-1 ring-primary/30 flex items-center justify-center p-0.5">
                         <img src="/avatars/bot.png" className="w-full h-full object-cover rounded-md" />
                      </div>
                      <div className="h-4 w-24 bg-white/10 rounded" />
                   </div>
                   <div className="space-y-4">
                      {["w-32", "w-24", "w-28"].map((w, i) => (
                         <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.02]">
                            <div className="w-4 h-4 rounded bg-white/10" />
                            <div className={`h-3 ${w} bg-white/5 rounded`} />
                         </div>
                      ))}
                   </div>
                   <div className="mt-auto p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <div className="h-2 w-16 bg-primary/40 rounded mb-2" />
                      <div className="h-2 w-full bg-primary/20 rounded" />
                   </div>
                </div>

                {/* Mock Chat Area */}
                <div className="flex-1 flex flex-col relative bg-[url('/noise.png')] bg-repeat opacity-90 p-6 space-y-6 overflow-hidden">
                   {/* User Message */}
                   <div className="flex items-start gap-4 flex-row-reverse z-10">
                      <div className="w-10 h-10 rounded-full border border-primary/50 shadow-[0_0_15px_rgba(101,99,242,0.2)] bg-primary/10 flex items-center justify-center p-0.5 shrink-0">
                         <img src="/avatars/user.png" className="w-full h-full object-cover rounded-full" />
                      </div>
                      <div className="bg-primary text-white text-sm font-medium px-5 py-3.5 rounded-[24px] rounded-tr-none shadow-lg max-w-[80%] text-left">
                         Summarize the security protocols mentioned in section 4 of the architecture document.
                      </div>
                   </div>

                   {/* Bot Message */}
                   <div className="flex items-start gap-4 z-10">
                      <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 shadow-sm p-0.5 shrink-0 flex items-center justify-center relative">
                         <div className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
                         <img src="/avatars/bot.png" className="w-full h-full object-cover rounded-full z-10" />
                      </div>
                      <div className="glass border-white/5 text-foreground/90 text-sm font-medium px-5 py-4 rounded-[24px] rounded-tl-none shadow-xl max-w-[80%] text-left space-y-3">
                         <p>Based on the provided context, the security protocols in section 4 enforce the following:</p>
                         <ul className="list-disc pl-4 text-white/70 space-y-1">
                            <li>All vector embeddings are encrypted at rest using AES-256.</li>
                            <li>Context retrieval is strictly scoped to the authenticated user's workspace ID.</li>
                            <li>The inference nodes do not retain prompt history post-generation.</li>
                         </ul>
                         <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                            <span className="text-[9px] uppercase font-black text-muted-foreground/40 tracking-[0.2em]">Citations</span>
                            <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded-md text-emerald-400">Arch_v2.pdf: pg.12</span>
                         </div>
                      </div>
                   </div>

                   {/* Input Mock */}
                   <div className="absolute bottom-6 left-6 right-6">
                      <div className="h-16 rounded-[28px] glass border-white/10 flex items-center px-4 justify-between shadow-2xl">
                         <span className="text-white/20 text-sm italic pl-2">Query the document intelligence...</span>
                         <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-white/30" />
                         </div>
                      </div>
                   </div>
                   
                   {/* Blur overlay to fade out bottom */}
                   <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                </div>
             </div>
          </div>
        </section>

        {/* Bento Box Architecture Section */}
        <section id="architecture" className="px-6 py-32 relative max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Enterprise-Grade Infrastructure</h2>
             <p className="text-muted-foreground/80 max-w-xl mx-auto text-lg font-medium">Sophisticated AI pipelines optimized for zero-latency document analysis.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Large Box */}
             <div className="md:col-span-2 group p-8 rounded-[32px] glass-dark border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition duration-700" />
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 ring-1 ring-primary/20 group-hover:scale-110 transition duration-500">
                   <Layers className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Contextual Vector RAG</h3>
                <p className="text-muted-foreground/70 leading-relaxed font-medium max-w-md">
                   We chunk your documents semantically and generate high-dimensional embeddings using `pgvector`. This ensures the AI only sees the exact paragraphs relevant to your query, eliminating hallucination.
                </p>
             </div>

             {/* Small Box 1 */}
             <div className="group p-8 rounded-[32px] glass-dark border-white/5 hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition duration-700" />
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 ring-1 ring-emerald-500/20 group-hover:rotate-12 transition duration-500">
                   <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">Verifiable Citations</h3>
                <p className="text-muted-foreground/70 text-sm leading-relaxed font-medium">
                   Every response includes a direct pointer back to the source text. Never trust, always verify.
                </p>
             </div>

             {/* Small Box 2 */}
             <div className="group p-8 rounded-[32px] glass-dark border-white/5 hover:border-amber-500/30 transition-all duration-500 relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 ring-1 ring-amber-500/20 group-hover:-translate-y-1 transition duration-500">
                   <UploadCloud className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">Zero-Fetch Pipeline</h3>
                <p className="text-muted-foreground/70 text-sm leading-relaxed font-medium">
                   Documents are processed entirely via server-side callbacks during upload, ensuring 100% ingestion reliability without client timeouts.
                </p>
             </div>
             
             {/* Bottom Large Box */}
             <div className="md:col-span-2 group p-8 rounded-[32px] glass-dark border-white/5 relative overflow-hidden flex items-center justify-between">
                 <div className="z-10">
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Ready to deploy?</h3>
                    <p className="text-muted-foreground/70 font-medium">Initialize your workspace in seconds.</p>
                 </div>
                 <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 rounded-2xl px-8 font-black z-10 transition-transform active:scale-95">
                    <Link href="/sign-up">Start Building</Link>
                 </Button>
                 <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/20 to-transparent blur-xl pointer-events-none" />
             </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-8 py-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-muted-foreground/40 text-xs font-medium gap-4">
        <div className="flex items-center gap-2 font-black text-sm text-white/50">
          <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
             <img src="/avatars/bot.png" className="w-4 h-4 object-cover rounded-sm grayscale opacity-50" />
          </div>
          DocuMind <span className="text-[9px] uppercase tracking-widest ml-2 border border-white/10 px-1.5 py-0.5 rounded">v2.0</span>
        </div>
        <p>&copy; {new Date().getFullYear()} AI Protocols. Structured securely.</p>
      </footer>
    </div>
  );
}
