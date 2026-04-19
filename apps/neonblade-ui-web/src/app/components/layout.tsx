import { categories } from "@/lib/docs/data";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Badge from "@/lib/components/ui/badges/Badge";

import { MobileSidebar } from "@/components/MobileSidebar";
import { DesktopSidebar } from "@/components/DesktopSidebar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[#00f3ff] selection:text-black">
      {/* We reuse the Navbar but keep it standard on the docs */}
      <Navbar />

      <main className="flex-1 flex flex-col md:flex-row container mx-auto px-4 sm:px-6 max-w-7xl pt-32 pb-12 gap-10">
        <MobileSidebar />

        {/* Sidebar */}
        <DesktopSidebar />

        {/* Content Area */}
        <section className="flex-1 min-w-0">{children}</section>
      </main>
      <Footer />
    </div>
  );
}
