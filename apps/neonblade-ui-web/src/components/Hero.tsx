"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { DatalinesWithGrid } from "../lib/components/ui/backgrounds/DatalinesWithGrid";
import { AsciiRain } from "../lib/components/ui/backgrounds/AsciiRain";
import AccentFrame from "../lib/components/ui/frames/AccentFrame";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const [bgType, setBgType] = useState<"grid" | "ascii">("grid");

  const handleCopy = () => {
    const text = "npx neonblade add";
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
      document.body.prepend(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (error) {
        console.error(error);
      } finally {
        textArea.remove();
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    /*
     * KEY: section is flex-col with NO overflow-hidden.
     * overflow-hidden would break position:sticky on descendants.
     * The background gets its own absolute wrapper that clips itself.
     */
    <section className="relative min-h-screen flex flex-col pt-24">

      {/* Background — isolated clip so section stays overflow:visible for sticky */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bgType === "grid" ? <DatalinesWithGrid overlay={true} /> : <AsciiRain />}
      </div>

      {/* Hero content — flex-1 pushes the sticky toggle row to the bottom */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-12">
        <div className="container mx-auto max-w-7xl flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-orbitron tracking-widest text-[#00f3ff] mb-8 uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-flicker" />
            Futuristic Aesthetics, Now Live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-orbitron tracking-tighter mb-6 leading-tight max-w-4xl"
          >
            Build futuristic interfaces with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
              NeonBlade UI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 font-light"
          >
            Not your typical UI library. NeonBlade delivers futuristic components
            with neon aesthetics, sharp edges, and total design control.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6 mb-16"
          >
            <Link href="/components">
              <button className="corner-cut bg-[#00f3ff] text-black px-8 py-4 font-orbitron font-bold tracking-wider hover:bg-white hover:box-glow-cyan transition-all uppercase text-sm group flex items-center gap-2">
                Explore Components
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </Link>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] rounded blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative flex items-center bg-black border border-white/10 p-1 corner-cut-bottom-left group-hover:bg-[#0a0a0a] transition-colors">
                <span className="text-[#ff00ff] px-3 font-mono text-sm">$</span>
                <code className="pr-4 py-3 font-mono text-sm text-white/80">
                  npx neonblade add
                </code>
                <button
                  onClick={handleCopy}
                  className="p-3 ml-2 hover:bg-white/10 transition-colors border-l border-white/10"
                  aria-label="Copy CLI command"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[#39ff14]" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/*
       * STICKY TOGGLE — pure CSS, zero JS.
       *
       * How it works (mirrors the CSS reference .title example):
       *   - This is the last flex child of the section (flex-col).
       *   - `sticky bottom-6` makes it ride the viewport bottom while the
       *     section is taller than the viewport.
       *   - When the section's end approaches (Features scrolls into view),
       *     the element's natural flex position catches up with the sticky
       *     offset and it flows out with the section — no jump, no JS.
       *
       * `pointer-events-none` on the row + `pointer-events-auto` on the pill
       * prevents the invisible row from blocking clicks on the hero content.
       */}
      <div className="sticky bottom-6 z-30 flex justify-end px-6 pb-6 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-0.5 p-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.1)]">
          <button
            onClick={() => setBgType("grid")}
            title="Grid background"
            className={`px-3 py-1 text-[10px] font-orbitron tracking-widest rounded-full transition-all duration-300 ${
              bgType === "grid"
                ? "bg-[#00f3ff] text-black shadow-[0_0_12px_#00f3ff] font-bold"
                : "text-white/40 hover:text-white/80"
            }`}
          >
            GRID
          </button>
          <button
            onClick={() => setBgType("ascii")}
            title="Matrix background"
            className={`px-3 py-1 text-[10px] font-orbitron tracking-widest rounded-full transition-all duration-300 ${
              bgType === "ascii"
                ? "bg-[#ff14ff] text-black shadow-[0_0_12px_#ff14ff] font-bold"
                : "text-white/40 hover:text-white/80"
            }`}
          >
            MATRIX
          </button>
        </div>
      </div>

    </section>
  );
}
