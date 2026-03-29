"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  
  // Create a simple breadcrumb from the pathname
  const pathnames = pathname.split("/").filter((x) => x);
  const breadcrumbs = pathnames.map((path, idx) => {
    const isLast = idx === pathnames.length - 1;
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    
    return (
      <span key={path} className="flex items-center text-sm capitalize">
        <span className={isLast ? "text-white font-medium" : "text-[#64748B]"}>
          {label}
        </span>
        {!isLast && <span className="mx-2 text-[#334155]">/</span>}
      </span>
    );
  });

  return (
    <div className="flex items-center h-16 px-6 border-b border-[#1E1E2E] bg-[#13131A] justify-between">
      <div className="flex items-center">
        {breadcrumbs.length > 0 ? breadcrumbs : <span className="text-white font-medium">Dashboard</span>}
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}
