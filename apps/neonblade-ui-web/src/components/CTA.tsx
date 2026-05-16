"use client";

import Link from "next/link";
import CornerCutButton from "@/lib/components/ui/buttons/CornerCutButton";
import Badge from "@/lib/components/ui/badges/Badge";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden flex justify-center border-t border-white/5 bg-black">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-10">
        {/* Cyan Orb */}
        <div
          className="absolute rounded-full bg-[#00f3ff]"
          style={{
            width: "17vmax",
            height: "17vmax",
            top: "1vmax",
            left: "1vmax",
            filter: "blur(8vmax)",
          }}
        />
        {/* Magenta Orb */}
        <div
          className="absolute rounded-full bg-[#ff00ff]"
          style={{
            width: "17vmax",
            height: "17vmax",
            bottom: "1vmax",
            right: "1vmax",
            filter: "blur(8vmax)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl flex flex-col items-center text-center">
        <div className="flex flex-col items-center">
          <Badge color="green" size="md" dot="flicker" className="mb-4">
            System ready
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold font-orbitron tracking-tighter mb-8 relative leading-tight min-h-[1.2em]">
            Ready to upgrade your interface?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center items-center">
            <Link href="/components">
              <CornerCutButton color="cyan" showArrow hoverEffect="shift">
                Explore Components
              </CornerCutButton>
            </Link>

            <Link href="/docs">
              <CornerCutButton color="pink" showArrow variant="outline">
                Read the Docs
              </CornerCutButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
