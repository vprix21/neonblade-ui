"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import NeonGlowCornerCutCard from "@/lib/components/ui/cards/NeonGlowCornerCutCard";
import CornerCutButton from "@/lib/components/ui/buttons/CornerCutButton";
import Badge from "@/lib/components/ui/badges/Badge";

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1 },
  }),
};

const pillars = [
  {
    label: "Futuristic by Design",
    desc: "Every component is crafted with clip-paths, neon glows, and dark-mode-first aesthetics — built to feel like tomorrow.",
  },
  {
    label: "Copy. Paste. Own It.",
    desc: "No bloated packages. Components live in your project. You control the code, the styles, the variants. No abstraction tax.",
  },
  {
    label: "Tailwind-Native",
    desc: "Built on Tailwind CSS from the ground up. Zero custom CSS runtimes. Predictable, scannable, and fast to customise.",
  },
  {
    label: "CLI-Powered",
    desc: "NeonBlade ships its own CLI. One command fetches a component and drops it into your source. No config. No ceremony.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[#00f3ff] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Header */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-16 space-y-4"
          >
            <Badge shape="corner-cut" color="cyan" dot="flicker">
              About
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-orbitron tracking-tight text-white mb-5 leading-tight">
              What is
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
                NeonBlade UI?
              </span>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed">
              A React component library forged in the aesthetic of neon-lit
              cities, rain-soaked screens, and the relentless energy of the
              digital frontier.
            </p>
          </motion.div>

          <div className="w-full h-px bg-gradient-to-r from-[#ff00ff]/40 via-white/10 to-transparent mb-14" />

          {/* The Idea */}
          <motion.section
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-14"
          >
            <h2 className="font-orbitron font-bold text-xl text-white mb-4 tracking-wide">
              The Idea
            </h2>
            <p className="text-white/55 leading-relaxed mb-4">
              NeonBlade UI was built on a single conviction:{" "}
              <span className="text-white">the web deserves to look bold</span>.
              Most UI libraries default to neutral, safe, and forgettable.
              NeonBlade goes the other direction — glowing borders, razor-sharp
              clip-paths, flickering lights, and components that feel like they
              belong in a high-end sci-fi interface.
            </p>
            <p className="text-white/55 leading-relaxed">
              The aesthetic draws heavily from{" "}
              <span className="font-semibold">cyberpunk</span> culture — the
              genre that imagines technology as something visceral, alive, and
              electric. Neon signs cutting through digital rain. Interfaces that
              pulse with energy. That vibe is the north star of every component
              we design.
            </p>
          </motion.section>

          {/* Pillars */}
          <motion.section
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-14"
          >
            <h2 className="font-orbitron font-bold text-xl text-white mb-6 tracking-wide">
              What You Get
            </h2>
            <div className="grid gap-4">
              {pillars.map((p, i) => (
                // <motion.div
                //   key={p.label}
                //   custom={i + 3}
                //   initial="hidden"
                //   animate="visible"
                //   variants={fadeIn}
                //   className="bg-white/[0.03] border border-white/10 hover:border-[#00f3ff]/30 px-5 py-4 transition-colors group"
                // >
                //   <p className="font-orbitron font-semibold text-sm text-[#00f3ff] mb-1.5 group-hover:text-glow-cyan transition-all">
                //     {p.label}
                //   </p>
                //   <p className="text-white/50 text-sm leading-relaxed">
                //     {p.desc}
                //   </p>
                // </motion.div>
                <NeonGlowCornerCutCard
                  key={p.label}
                  title={p.label}
                  description={p.desc}
                  hoverEffect="solid"
                />
              ))}
            </div>
          </motion.section>

          {/* Cyberpunk callout */}
          {/* <motion.section
            custom={7}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-14"
          >
            <div className="border-l-2 border-[#ff00ff] pl-5 py-1">
              <p className="text-white/70 italic leading-relaxed text-sm">
                &ldquo;Cyberpunk isn&apos;t just a genre — it&apos;s a reminder
                that technology can be human, raw, and beautiful all at once.
                NeonBlade UI is our attempt to bring that energy into every
                interface.&rdquo;
              </p>
            </div>
          </motion.section> */}

          {/* Who built it */}
          <motion.section
            custom={8}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-14"
          >
            <h2 className="font-orbitron font-bold text-xl text-white mb-4 tracking-wide">
              Who Built This
            </h2>
            <p className="text-white/55 leading-relaxed">
              NeonBlade UI is developed and maintained by{" "}
              <a
                href="https://neuronrush.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00f3ff] hover:text-white transition-colors font-semibold"
              >
                NeuronRush
              </a>{" "}
            </p>
          </motion.section>

          <div className="w-full h-px bg-gradient-to-r from-[#00f3ff]/30 via-white/5 to-transparent mb-10" />

          {/* CTA */}
          <motion.div
            custom={9}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* <Link
              href="/components"
              className="inline-flex items-center gap-2 font-orbitron text-sm tracking-wide text-black bg-[#00f3ff] hover:bg-white px-5 py-3 transition-colors"
            >
              Browse Components
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 font-orbitron text-sm tracking-wide text-[#00f3ff] border border-[#00f3ff]/40 hover:border-[#00f3ff] px-5 py-3 transition-colors"
            >
              Read the Docs
              <ArrowRight size={14} />
            </Link> */}
            <Link href="/components">
              <CornerCutButton variant="solid" color="cyan" showArrow={true}>
                Browse Components
              </CornerCutButton>
            </Link>
            <Link href="/docs">
              <CornerCutButton color="pink" variant="ghost">
                Read the Docs
              </CornerCutButton>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
