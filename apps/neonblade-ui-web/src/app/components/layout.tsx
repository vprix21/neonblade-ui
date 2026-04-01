import { categories } from "@/lib/docs/data";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { MobileSidebar } from "@/components/MobileSidebar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[#00f3ff] selection:text-black">
      {/* We reuse the Navbar but keep it standard on the docs */}
      <Navbar />

      <main className="flex-1 flex flex-col md:flex-row container mx-auto px-6 max-w-7xl pt-32 pb-12 gap-10">
        <MobileSidebar />
        
        {/* Sidebar */}
        <aside className="w-64 hidden md:block shrink-0">
          <div className="sticky top-32">
            <h3 className="font-orbitron font-bold text-xl mb-6 text-white border-b border-white/10 pb-4">
              Components
            </h3>
            <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-200px)] pr-4 custom-scrollbar">
              {categories.map((category) => (
                <div key={category.slug} className="space-y-3">
                  <h4 className="font-orbitron font-semibold text-sm text-[#00f3ff] uppercase tracking-wider">
                    {category.name}
                  </h4>
                  <ul className="space-y-2 border-l border-white/10 ml-2 pl-4">
                    {category.components.map((component) => (
                      <li key={component.slug}>
                        <Link
                          href={`/components/${category.slug}/${component.slug}`}
                          className="block text-white/60 hover:text-white hover:translate-x-1 transition-all text-sm font-light"
                        >
                          {component.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1 min-w-0">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  );
}
