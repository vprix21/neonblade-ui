"use client";

import { motion } from "framer-motion";
import { Terminal, Zap, PackageOpen, Layers } from "lucide-react";
import AccentFrame from "../lib/components/ui/frames/AccentFrame";
import GlitchText from "../lib/components/ui/text/GlitchText";
import NeonGlowCornerCutCard from "@/lib/components/ui/cards/NeonGlowCornerCutCard";

const features = [
  {
    icon: Terminal,
    title: "CLI Installation",
    description:
      "Install components directly into your project via CLI without bloated dependencies.",
  },
  {
    icon: Layers,
    title: "Futuristic Aesthetics",
    description:
      "High-end, dynamic UI featuring clip-paths, neon glows, and micro-animations.",
  },
  {
    icon: PackageOpen,
    title: "Highly Customizable",
    description:
      "Built on Tailwind CSS. Full control over styles, variants, and colors. No hidden magic.",
  },
  {
    icon: Zap,
    title: "Fast Setup",
    description:
      "Copy, paste, or command-line it. Getting a futuristic UI has never been faster.",
  },
];

export function Features() {
  return (
    <section className="py-24 relative bg-black">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-4">
            {/* Forged in the <span className="text-[#00f3ff]">Future</span>
             */}
            Forged in the{" "}
            <span>
              {" "}
              <AccentFrame
                edgeColor="bg-neon-cyan"
                mode="duo"
                className="inline-flex items-center gap-2 text-3xl md:text-5xl font-orbitron tracking-widest text-neon-cyan uppercase"
              >
                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-flicker" />
                <GlitchText text="Future" mode="active">
                  Future
                </GlitchText>
              </AccentFrame>
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl text-lg">
            NeonBlade provides primitive, high-quality components engineered for
            absolute aesthetic dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <NeonGlowCornerCutCard
              key={i}
              color="cyan"
              size="md"
              corner="bottom-right"
              hoverEffect="gradient"
              glowIntensity="medium"
              className="h-full"
              title={feature.title}
              description={feature.description}
              icon={<feature.icon className="w-6 h-6 text-white" />}
            ></NeonGlowCornerCutCard>
          ))}
        </div>
      </div>
    </section>
  );
}
