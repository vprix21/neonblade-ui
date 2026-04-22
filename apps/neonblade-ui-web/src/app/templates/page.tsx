"use client";
import { NeonGlowCornerCutCard } from "../../lib/components/ui/cards/NeonGlowCornerCutCard";
import { Badge } from "../../lib/components/ui/badges/Badge";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import CornerCutButton from "@/lib/components/ui/buttons/CornerCutButton";

const templates = [
  {
    slug: "software-developer-portfolio",
    title: "Software Developer Portfolio",
    description:
      "A sleek, dark-themed portfolio for developers. Showcases skills, projects, experience, and contact info using NeonBlade components.",
    tags: ["Portfolio", "Developer", "Dark", "open-source"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    color: "cyan" as const,
    status: "free" as const,
    github: "https://github.com/neonblade-ui/neonbladeui-sd-portfolio-template",
    preview: "https://neonbladeui-sd-portfolio-template.vercel.app/",
  },
];

export default function TemplatesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white selection:bg-[#00f3ff] selection:text-black">
      <Navbar />

      <section className="flex-1 pt-32 pb-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-16 space-y-4">
            <Badge shape="corner-cut" color="cyan" dot="flicker">
              Templates
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron tracking-tight mb-4">
              Ready-to-use templates
            </h1>
            <p className="text-white/65 text-lg max-w-2xl">
              Free, open-source templates built entirely with NeonBlade UI
              components. Copy, customise, deploy.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t) => (
              <div
                key={t.slug}
                onClick={() =>
                  window.open(t.preview, "_blank", "noopener,noreferrer")
                }
                className="cursor-pointer"
              >
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
                  {/* Tech stack */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-4">
                    {t.tech.map((tech) => (
                      <Badge key={tech} color="pink" variant="ghost" size="xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Tags + status */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {t.tags.map((tag) => (
                      <Badge key={tag} color="cyan" variant="ghost" size="xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Badge
                    color="green"
                    variant="solid"
                    size="xs"
                    className="w-fit mt-5"
                  >
                    Free
                  </Badge>

                  {/* GitHub link */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-3">
                    <a
                      href={t.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      View Source on GitHub
                    </a>
                    <a
                      href={t.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
                    >
                      Preview
                    </a>
                  </div>
                </NeonGlowCornerCutCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
