import Link from "next/link";
import { categories } from "@/lib/docs/data";
import AccentFrame from "@/lib/components/ui/frames/AccentFrame";

export default function ComponentsLanding() {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-orbitron tracking-tight text-white mb-2">
          Component Library
        </h1>
        <p className="text-lg text-white/60 font-light max-w-2xl leading-relaxed">
          Explore our collection of futuristic, cyberpunk-inspired React components. 
          Built with Tailwind CSS for ultimate customization without hidden magic.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        {categories.map((category) => (
          <div key={category.slug} className="space-y-4">
            <h2 className="text-xl font-bold font-orbitron text-[#00f3ff] border-b border-white/10 pb-2">
              {category.name}
            </h2>
            <div className="grid gap-4 mt-4">
              {category.components.map((c) => (
                 <Link 
                  href={`/components/${category.slug}/${c.slug}`} 
                  key={c.slug}
                  className="block group"
                 >
                   <AccentFrame 
                     color="#ff00ff" 
                     className="bg-[#0a0a0a] border border-white/5 hover:bg-[#111] transition-colors p-6 flex flex-col h-full"
                   >
                     <h3 className="font-orbitron font-semibold text-white group-hover:text-glow-pink transition-all mb-2">
                       {c.name}
                     </h3>
                     <p className="text-sm text-white/50 font-light flex-grow">
                       {c.description || "A futuristic UI element for your digital interface."}
                     </p>
                   </AccentFrame>
                 </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
