import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background relative selection:bg-primary/30 font-sans">
      {/* Immersive Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="fixed inset-0 -z-10 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col h-full overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 mb-6 w-full max-w-[1400px] mx-auto scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
