import Link from "next/link";
import { NeonGlowCornerCutCard } from "../../lib/components/ui/cards/NeonGlowCornerCutCard";
import { Badge } from "../../lib/components/ui/badges/Badge";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

const templates = [
  {
    slug: "software-developer",
    title: "Software Developer Portfolio",
    description:
      "A sleek, dark-themed portfolio for developers. Showcases skills, projects, experience, and contact info using NeonBlade components.",
    tags: ["Portfolio", "Developer", "Dark"],
    color: "cyan" as const,
    status: "free" as const,
  },
];

export default function TemplatesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      <section className="flex-1 pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-16">
            <p className="text-xs font-orbitron tracking-widest text-[#00f3ff] uppercase mb-4">
              Templates
            </p>
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron tracking-tight mb-4">
              Ready-to-use{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
                templates
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Free, open-source templates built entirely with NeonBlade UI
              components. Copy, customise, deploy.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t) => (
              <Link key={t.slug} href={`/templates/${t.slug}`}>
                <NeonGlowCornerCutCard
                  title={t.title}
                  description={t.description}
                  colorA="cyan"
                  colorB="pink"
                  hoverEffect="gradient"
                  className="h-full cursor-pointer"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-full h-full"
                    >
                      <polyline points="4 17 10 11 4 5" />
                      <line x1="12" y1="19" x2="20" y2="19" />
                    </svg>
                  }
                >
                  <div className="flex flex-wrap gap-2 mt-4">
                    {t.tags.map((tag) => (
                      <Badge key={tag} color="cyan" variant="ghost" size="xs">
                        {tag}
                      </Badge>
                    ))}
                    <Badge
                      color="green"
                      variant="solid"
                      size="xs"
                      dot="pulse"
                      className="ml-auto"
                    >
                      Free
                    </Badge>
                  </div>
                </NeonGlowCornerCutCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
