"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Settings, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-violet-400",
  },
  {
    label: "Documents",
    icon: FileText,
    href: "/documents",
    color: "text-emerald-400",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-slate-400",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col bg-background/40 backdrop-blur-3xl border-r border-white/5 text-foreground selection:bg-primary/30">
      
      {/* Brand Logo */}
      <Link 
        href="/" 
        className="flex items-center gap-3 h-16 px-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer group"
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden ring-1 ring-primary/30 group-hover:ring-primary/50 bg-primary/10 transition-all duration-300">
          <img 
            src="/avatars/bot.png" 
            alt="Logo" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          {/* Subtle online indicator glowing */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
        </div>
        <span className="text-sm font-black tracking-tight text-white group-hover:text-primary transition-colors duration-300">DocuMind</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex-1 px-4 py-6 space-y-1">
        <p className="px-2 mb-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
          Navigation
        </p>
        
        <div className="space-y-1.5">
          {routes.map((route) => {
            const isActive =
              pathname.startsWith(route.href) ||
              (pathname === "/" && route.href === "/dashboard");

            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ease-out",
                  isActive
                    ? "bg-primary/10 text-white ring-1 ring-primary/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                    : "text-white/40 hover:text-white/80 hover:bg-white/[0.04] hover:translate-x-1"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                    isActive 
                      ? "bg-primary/20 ring-1 ring-primary/30 shadow-[0_0_15px_rgba(101,99,242,0.3)]" 
                      : "bg-white/5 group-hover:bg-white/10"
                  )}
                >
                  <route.icon
                    className={cn(
                      "h-4 w-4 transition-colors duration-300",
                      isActive ? "text-primary" : "text-white/30 group-hover:text-white/60"
                    )}
                  />
                </div>
                <span className="flex-1">{route.label}</span>
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 text-primary/60" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Environment Stats (Bento Style) */}
      <div className="px-4 py-3">
        <div className="glass-dark border-white/5 p-3 rounded-[16px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 blur-xl pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 z-10">Vector Index</span>
            <span className="text-[10px] font-black text-white/60 z-10">60%</span>
          </div>
          <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden shrink-0 z-10 relative ring-1 ring-white/5">
            <div className="h-full w-[60%] bg-primary rounded-full shadow-[0_0_10px_rgba(101,99,242,0.8)] relative">
               <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/40 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade CTA Bento */}
      <div className="p-4 pt-2">
        <div className="relative rounded-[20px] glass-dark border-white/5 p-5 overflow-hidden group hover:border-primary/30 transition-all duration-500 cursor-pointer">
          {/* Intense Glow Backdrop */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none group-hover:bg-primary/30 transition-colors duration-700" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/20 ring-1 ring-primary/30 shadow-[0_0_15px_rgba(101,99,242,0.4)] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                <Zap className="w-3.5 h-3.5 text-white animate-pulse" />
              </div>
              <p className="text-sm font-black tracking-tight text-white group-hover:text-primary transition-colors">Upgrade to Pro</p>
            </div>
            
            <p className="text-[10px] font-medium text-white/40 mb-4 leading-relaxed pr-2">
              Unlock unbounded inference limits and priority GPU access.
            </p>
            
            <Button
              size="sm"
              className="w-full h-8 text-[11px] font-black bg-white group-hover:bg-primary text-black group-hover:text-white rounded-[10px] transition-all duration-300 active:scale-95"
            >
              Initialize Pro
            </Button>
          </div>
        </div>
      </div>
      
    </div>
  );
}