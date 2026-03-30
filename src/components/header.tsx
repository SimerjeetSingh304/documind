"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <div className="flex items-center h-16 px-8 border-b border-white/5 bg-background/20 backdrop-blur-3xl sticky top-0 z-40 justify-between">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2">
        <Home className="w-4 h-4 text-white/30" />
        {pathnames.map((path, idx) => {
          const isLast = idx === pathnames.length - 1;
          const label = path.charAt(0).toUpperCase() + path.slice(1);

          return (
            <span key={path} className="flex items-center gap-2">
              <span className="text-white/20 text-xs font-medium">/</span>
              <span
                className={
                  isLast
                    ? "text-xs font-black text-white bg-white/5 px-2.5 py-1 rounded-md ring-1 ring-white/10 shadow-sm"
                    : "text-xs font-semibold text-white/40 hover:text-white/80 transition-colors cursor-pointer"
                }
              >
                {label}
              </span>
            </span>
          );
        })}
        {pathnames.length === 0 && (
          <span className="text-xs font-black text-white bg-white/5 px-2.5 py-1 rounded-md ring-1 ring-white/10 shadow-sm">
            Overview
          </span>
        )}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Status pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
          <span className="flex h-1.5 w-1.5 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Systems Online</span>
        </div>

        <div className="w-px h-5 bg-white/10" />

        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox:
                "w-8 h-8 rounded-lg ring-1 ring-white/20 hover:ring-primary/50 transition-all duration-300 shadow-sm",
            },
          }}
        />
      </div>
    </div>
  );
}