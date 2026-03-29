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

import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

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
          colorBackground: "#13131A",
          colorInputBackground: "#0A0A0F",
          colorInputText: "#F1F5F9",
          colorText: "#F1F5F9",
          colorTextSecondary: "#64748B",
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      >
        <body className="min-h-full flex flex-col bg-[#0A0A0F] text-[#F1F5F9]">
          <Providers>
            <header className="flex justify-end items-center p-4 gap-4 h-16 border-b border-[#1E1E2E] bg-[#0A0A0F]/50 backdrop-blur-md sticky top-0 z-[60]">
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6366F1] text-white rounded-full font-medium text-sm h-10 px-5 cursor-pointer hover:bg-[#4F46E5] transition">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </header>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
