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
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {bgType === "grid" ? <DatalinesWithGrid overlay={true} /> : <AsciiRain />}

      {/* Background Toggle */}
      <div className="absolute top-24 right-4 md:right-8 z-30 flex items-center gap-1 p-1 bg-black/40 backdrop-blur-md border border-white/10 corner-cut">
        <button
          onClick={() => setBgType("grid")}
          className={`px-3 py-1.5 text-xs font-orbitron transition-all ${
            bgType === "grid"
              ? "bg-[#00f3ff] text-black shadow-[0_0_10px_#00f3ff] font-bold"
              : "text-white/50 hover:text-white"
          }`}
        >
          GRID
        </button>
        <button
          onClick={() => setBgType("ascii")}
          className={`px-3 py-1.5 text-xs font-orbitron transition-all ${
            bgType === "ascii"
              ? "bg-[#ff14ff] text-black shadow-[0_0_10px_#ff14ff] font-bold"
              : "text-white/50 hover:text-white"
          }`}
        >
          MATRIX
        </button>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl flex flex-col items-center text-center">
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
    </section>
  );
}
