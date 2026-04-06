"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CornerCutButton from "@/lib/components/ui/buttons/CornerCutButton";
import Badge from "@/lib/components/ui/badges/Badge";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden flex justify-center border-t border-white/5 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00f3ff]/10 via-black to-black opacity-60"></div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Badge color="green" size="md" dot="flicker" className="mb-4">
            System ready
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold font-orbitron tracking-tighter mb-6 relative leading-tight">
            Ready to upgrade your interface?
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
              interface?
            </span> */}
          </h2>

          {/* <p className="text-lg text-white/50 mb-10 max-w-2xl font-light">
            Skip the boilerplate. Build beyond the conventional UI. Drop in highly customizable cyberpunk components that instantly transform your digital presence.
          </p>
           */}
          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
            <Link href="/components" className="w-full sm:w-auto">
              {/* <button className="w-full sm:w-64 corner-cut-bottom-right bg-[#00f3ff] text-black px-8 py-4 font-orbitron font-bold tracking-wider hover:bg-white hover:box-glow-cyan transition-all uppercase text-sm group flex items-center justify-center gap-2">
                Browse Components
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button> */}
              <CornerCutButton color="cyan" showArrow>
                Explore Components
              </CornerCutButton>
            </Link>

            {/* <Link href="/docs" className="w-full sm:w-auto">
              <button className="w-full sm:w-64 corner-cut-top-left bg-black border border-white/20 text-white px-8 py-4 font-orbitron font-bold tracking-wider hover:border-[#ff00ff] hover:text-[#ff00ff] transition-all uppercase text-sm flex items-center justify-center gap-2 hover:shadow-[inset_0_0_15px_rgba(255,0,255,0.2)]">
                Read the Docs
              </button>
            </Link> */}
            <Link href="/docs" className="w-full sm:w-auto">
              <CornerCutButton color="pink" showArrow variant="outline">
                Read the Docs
              </CornerCutButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
