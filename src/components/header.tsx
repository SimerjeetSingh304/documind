"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <div className="flex items-center h-14 px-6 border-b border-white/[0.06] bg-[#0F0F14]/80 backdrop-blur-xl sticky top-0 z-40 justify-between">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5">
        <Home className="w-3.5 h-3.5 text-white/20" />
        {pathnames.map((path, idx) => {
          const isLast = idx === pathnames.length - 1;
          const label = path.charAt(0).toUpperCase() + path.slice(1);

          return (
            <span key={path} className="flex items-center gap-1.5">
              <span className="text-white/20 text-xs">/</span>
              <span
                className={
                  isLast
                    ? "text-[11px] font-semibold text-white/80 bg-white/[0.06] px-2 py-0.5 rounded-md"
                    : "text-[11px] text-white/30 hover:text-white/50 transition-colors cursor-pointer"
                }
              >
                {label}
              </span>
            </span>
          );
        })}
        {pathnames.length === 0 && (
          <span className="text-[11px] font-semibold text-white/80 bg-white/[0.06] px-2 py-0.5 rounded-md">
            Overview
          </span>
        )}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Status pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/15">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-medium text-emerald-400/80">All systems normal</span>
        </div>

        <div className="w-px h-4 bg-white/[0.06]" />

        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox:
                "w-7 h-7 rounded-lg ring-1 ring-white/10 hover:ring-white/20 transition-all duration-150",
            },
          }}
        />
      </div>
    </div>
  );
}