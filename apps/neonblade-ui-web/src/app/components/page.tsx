import Link from "next/link";
import { categories } from "@/lib/docs/data";
import NeonGlowCornerCutCard from "@/lib/components/ui/cards/NeonGlowCornerCutCard";
import Badge from "@/lib/components/ui/badges/Badge";

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
        {categories
          .flatMap((category) =>
            category.components.map((c) => ({
              ...c,
              categorySlug: category.slug,
            })),
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((c) => (
            <Link
              href={`/components/${c.categorySlug}/${c.slug}`}
              key={`${c.categorySlug}-${c.slug}`}
            >
              <NeonGlowCornerCutCard
                title={c.name}
                description={c.description}
                colorA="cyan"
                colorB="cyan"
                hoverEffect="solid"
              >
                {/* If it's new, show a badge */}
                {c.is_new && (
                  <div className="absolute top-2 right-2 z-20">
                    <Badge color="green" size="xs" variant="solid">
                      New
                    </Badge>
                  </div>
                )}
                {c.is_updated && (
                  <div className="absolute top-2 right-2 z-20">
                    <Badge color="yellow" size="xs" variant="solid">
                      Updated
                    </Badge>
                  </div>
                )}
              </NeonGlowCornerCutCard>
            </Link>
          ))}
      </div>
    </div>
  );
}
