import { DatalinesWithGrid } from "@/lib/components/ui/backgrounds/DatalinesWithGrid";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white selection:bg-[#00f3ff] selection:text-black">
      <img src="/neonblade_ui_logo.png" alt="NeonBlade UI Logo" className="w-20 h-20 absolute inset-0 m-auto object-contain drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] animate-spin" />
      <DatalinesWithGrid />
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none z-0" /> */}
    </main>
  );
}
