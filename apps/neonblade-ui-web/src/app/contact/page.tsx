"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Badge from "@/lib/components/ui/badges/Badge";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[#00f3ff] selection:text-black">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-6">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Badge shape="corner-cut" color="cyan" dot="flicker">
              Contact
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold font-orbitron tracking-tight text-white mb-4 leading-tight">
              Get in Touch
            </h1>
            <p className="text-white/50 leading-relaxed mb-12">
              Questions, feedback, or ideas? We&apos;d love to hear from you.
            </p>

            <div className="w-full h-px bg-gradient-to-r from-[#fb29ff]/40 via-white/10 to-transparent mb-10" />

            <motion.a
              href="mailto:contact@neuronrush.com"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="group flex items-center justify-between bg-white/[0.03] border border-white/10 hover:border-[#00f3ff]/50 px-6 py-5 transition-all hover:bg-[#00f3ff]/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[#00f3ff]/30 bg-[#00f3ff]/5">
                  <Mail size={18} className="text-[#00f3ff]" />
                </div>
                <div>
                  <p className="text-xs font-orbitron text-white/35 uppercase tracking-widest mb-0.5">
                    Email
                  </p>
                  <p className="font-mono text-white/80 group-hover:text-white transition-colors text-sm">
                    contact@neuronrush.com
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-white/20 group-hover:text-[#00f3ff] transition-colors"
              />
            </motion.a>

            <div className="w-full h-px bg-gradient-to-r from-[#00f3ff]/20 via-white/5 to-transparent mt-10 mb-8" />

            <p className="text-white/25 text-sm font-orbitron tracking-wide">
              Built by{" "}
              <a
                href="https://neuronrush.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00f3ff] hover:text-white transition-colors"
              >
                NeuronRush
              </a>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
