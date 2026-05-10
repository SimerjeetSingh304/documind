import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocuMind - AI RAG Chat Assistant",
  description: "Chat with your documents using AI.",
};

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6366F1",
          colorBackground: "#1C1C27",       
          colorInputBackground: "#13131A",  
          colorInputText: "#F1F5F9",
          colorText: "#F1F5F9",
          colorTextSecondary: "#94A3B8",
          colorNeutral: "#F1F5F9",
          borderRadius: "12px",
        },
        elements: {
          card: "bg-[#1C1C27] border border-white/10 shadow-2xl shadow-black/60",
          headerTitle: "text-white font-black tracking-tight",
          headerSubtitle: "text-slate-400",
          socialButtonsBlockButton: "bg-[#13131A] border border-white/10 text-white hover:bg-white/5 transition-colors",
          socialButtonsBlockButtonText: "text-white font-semibold",
          dividerLine: "bg-white/10",
          dividerText: "text-slate-500",
          formFieldLabel: "text-slate-300 font-medium",
          formFieldInput: "bg-[#13131A] border border-white/10 text-white placeholder:text-slate-600 focus:border-indigo-500",
          formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors",
          footerActionText: "text-slate-400",
          footerActionLink: "text-indigo-400 hover:text-indigo-300 font-semibold",
          identityPreviewText: "text-white",
          identityPreviewEditButtonIcon: "text-slate-400",
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      >
        <body className="min-h-full flex flex-col bg-[#0A0A0F] text-[#F1F5F9]">
          <Providers>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
