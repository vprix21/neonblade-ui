"use client";

import { motion } from "framer-motion";
import { Terminal, Zap, PackageOpen, Layers } from "lucide-react";
import AccentFrame from "../lib/components/ui/frames/AccentFrame";
import GlitchText from "../lib/components/ui/text/GlitchText";

const features = [
  {
    icon: Terminal,
    title: "CLI Installation",
    description: "Install components directly into your project via CLI without bloated dependencies.",
  },
  {
    icon: Layers,
    title: "Futuristic Aesthetics",
    description: "High-end, dynamic UI featuring clip-paths, neon glows, and micro-animations.",
  },
  {
    icon: PackageOpen,
    title: "Highly Customizable",
    description: "Built on Tailwind CSS. Full control over styles, variants, and colors. No hidden magic.",
  },
  {
    icon: Zap,
    title: "Fast Setup",
    description: "Copy, paste, or command-line it. Getting a futuristic UI has never been faster.",
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
             Forged in the <span> <AccentFrame 
            edgeColor="bg-neon-cyan" 
            mode="duo"
            className="inline-flex items-center gap-2 text-3xl md:text-5xl font-orbitron tracking-widest text-neon-cyan uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-flicker" />
            <GlitchText text="Future" glitchDuration={20} mode="hover">
              Future
            </GlitchText>
          </AccentFrame></span> 
          </h2>
          <p className="text-white/50 max-w-2xl text-lg">
            NeonBlade provides primitive, high-quality components engineered for absolute aesthetic dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative group h-full"
            >
              {/* Glow backdrop on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00f3ff] to-[#ff00ff] rounded opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
              
              <div className="relative h-full bg-[#0a0a0a] border border-white/10 p-8 corner-cut flex flex-col group-hover:border-transparent transition-colors z-10">
                <div className="w-12 h-12 rounded border border-white/10 flex items-center justify-center bg-black mb-6 group-hover:border-[#00f3ff] transition-colors group-hover:box-glow-cyan">
                  <feature.icon className="w-6 h-6 text-white group-hover:text-[#00f3ff] transition-colors" />
                </div>
                <h3 className="text-xl font-orbitron font-bold mb-3 text-white group-hover:text-glow-cyan transition-shadow">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
