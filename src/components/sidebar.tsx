"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Settings, Bot } from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-[#6366F1]",
  },
  {
    label: "Documents",
    icon: FileText,
    href: "/documents",
    color: "text-[#10B981]",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-[#64748B]",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 z-50 flex w-[220px] flex-col bg-[#13131A] border-r border-[#1E1E2E] text-white">
      <div className="flex items-center gap-2 h-16 px-6 font-bold text-lg border-b border-[#1E1E2E]">
        <Bot className="w-8 h-8 text-[#6366F1]" />
        DocuMind
      </div>
      <div className="flex-1 px-3 py-6 space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm group flex py-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-[#1E1E2E] rounded-lg transition",
              pathname.startsWith(route.href) || (pathname === "/" && route.href === "/dashboard")
                ? "bg-[#1E1E2E]/80 text-white border-l-4 border-[#6366F1] pl-2"
                : "text-[#64748B] pl-3"
            )}
          >
            <div className="flex items-center flex-1">
              <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
              {route.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
