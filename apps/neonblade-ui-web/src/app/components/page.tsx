import Link from "next/link";
import { categories } from "@/lib/docs/data";
import AccentFrame from "@/lib/components/ui/frames/AccentFrame";
import NeonGlowCornerCutCard from "@/lib/components/ui/cards/NeonGlowCornerCutCard";

export default function ComponentsLanding() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-orbitron tracking-tight text-white mb-2">
          Component Library
        </h1>
        <p className="text-lg text-white/70 font-light max-w-2xl leading-relaxed">
          Explore our collection of modern and futuristic React components.
          Built with Tailwind CSS for ultimate customization without hidden
          magic.
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
                //            <NeonGlowCornerCutCard
                //   title="CLI Installation"
                //   description="Install components directly into your project via CLI."
                //   colorA="cyan"
                //   colorB="pink"
                //   hoverEffect="gradient"
                //   icon={<Terminal className="w-full h-full" />}
                // />
                <Link
                  href={`/components/${category.slug}/${c.slug}`}
                  key={c.slug}
                  className=""
                >
                  <NeonGlowCornerCutCard
                    title={c.name}
                    description={c.description}
                    colorA="cyan"
                    colorB="cyan"
                    hoverEffect="solid"
                  />
                  {/* <h3 className="font-orbitron font-semibold text-white group-hover:text-glow-pink transition-all mb-2">
                    {c.name}
                  </h3>
                  <p className="text-sm text-white/50 font-light flex-grow">
                    {c.description ||
                      "A futuristic UI element for your digital interface."}
                  </p> */}
                  {/* </AccentFrame> */}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
