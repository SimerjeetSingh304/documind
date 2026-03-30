"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Settings, Bot, Zap, ChevronRight } from "lucide-react";
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
    <div className="fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col bg-[#0F0F14] border-r border-white/[0.06] text-foreground">
      
      {/* Logo */}
      <div className="flex items-center gap-3 h-16 px-6 border-b border-white/[0.06]">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/15 ring-1 ring-violet-500/30">
          <Bot className="w-4 h-4 text-violet-400" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-[#0F0F14]" />
        </div>
        <span className="text-sm font-bold tracking-tight text-white">DocuMind</span>
      </div>

      {/* Nav */}
      <div className="flex-1 px-3 py-5 space-y-0.5">
        <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/20">
          Navigation
        </p>
        {routes.map((route) => {
          const isActive =
            pathname.startsWith(route.href) ||
            (pathname === "/" && route.href === "/dashboard");

          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-white/[0.07] text-white"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-150",
                  isActive ? "bg-violet-500/15" : "bg-white/[0.04] group-hover:bg-white/[0.07]"
                )}
              >
                <route.icon
                  className={cn(
                    "h-3.5 w-3.5 transition-colors duration-150",
                    isActive ? "text-violet-400" : "text-white/30 group-hover:text-white/50"
                  )}
                />
              </div>
              <span className="flex-1">{route.label}</span>
              {isActive && (
                <ChevronRight className="w-3 h-3 text-violet-400/60" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Usage meter */}
      <div className="px-3 py-2">
        <div className="px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-white/40">Storage</span>
            <span className="text-[11px] font-semibold text-white/60">3 / 5 docs</span>
          </div>
          <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-gradient-to-r from-violet-500 to-violet-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="p-3 border-t border-white/[0.06]">
        <div className="relative rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-900/10 border border-violet-500/10 p-4 overflow-hidden">
          {/* Soft glow */}
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex items-center justify-center w-5 h-5 rounded-md bg-violet-500/20">
              <Zap className="w-3 h-3 text-violet-400" />
            </div>
            <p className="text-xs font-semibold text-white/80">Upgrade to Pro</p>
          </div>
          <p className="text-[10px] text-white/30 mb-3 leading-relaxed">
            Unlimited docs, faster processing, priority support.
          </p>
          <Button
            size="sm"
            className="w-full h-7 text-[11px] font-semibold bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/20 hover:border-violet-500/30 rounded-lg transition-all duration-150"
          >
            Upgrade Plan
          </Button>
        </div>
      </div>
    </div>
  );
}