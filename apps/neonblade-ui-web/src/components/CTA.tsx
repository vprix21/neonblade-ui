"use client";

import Link from "next/link";
import CornerCutButton from "@/lib/components/ui/buttons/CornerCutButton";
import Badge from "@/lib/components/ui/badges/Badge";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden flex justify-center border-t border-white/5 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00f3ff]/10 via-black to-black opacity-60"></div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
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
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center items-center">
            <Link href="/components">
              <CornerCutButton color="cyan" showArrow className="text-xs sm:text-sm">
                Explore Components
              </CornerCutButton>
            </Link>

            <Link href="/docs">
              <CornerCutButton color="pink" showArrow variant="outline" className="text-xs sm:text-sm">
                Read the Docs
              </CornerCutButton>
            </Link>
          </div>
          </div>
      </div>
    </section>
  );
}
