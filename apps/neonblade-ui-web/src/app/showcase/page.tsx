import Link from "next/link";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import type { Metadata } from "next";

import { Badge } from "../../lib/components/ui/badges/Badge";
import { CornerCutButton } from "../../lib/components/ui/buttons/CornerCutButton";
import AccentFrame from "../../lib/components/ui/frames/AccentFrame";
import Hexagons from "../../lib/components/ui/backgrounds/Hexagons";

export const metadata: Metadata = {
  title: "Showcase — NeonBlade UI",
  description:
    "Explore projects built with NeonBlade UI components and submit your own creation for a chance to be featured.",
};

export default function ShowcasePage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white selection:bg-[#00f3ff] selection:text-black">
      <Navbar />

      <section className="relative z-10 flex flex-1 flex-col px-6 pb-24 pt-32 min-h-screen items-center justify-center text-center">
        <Hexagons
          overlay
          hoverEffect={false}
          hexBorderColor="#171717"
          hexColor="transparent"
          beamEffect
          beamColor="#782076"
          beamSpeed={1}
        />

        {/* Hero */}
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center z-10">
          <Badge shape="corner-cut" color="cyan" dot="flicker">
            Coming Soon
          </Badge>

          <h1 className="mt-5 font-orbitron text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <AccentFrame
              color="cyan"
              colorB="pink"
              mode="duo"
              hoverEffect="glow"
              bgVariant="none"
              className="text-white text-center"
            >
              Showcase
            </AccentFrame>
          </h1>

          {/* Main highlight */}
          <p className="mt-10 max-w-2xl text-white/95 font-orbitron font-semibold text-xl leading-snug tracking-tight sm:text-2xl">
            Built something using{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
              NeonBlade UI
            </span>{" "}
            ?{" "}
            <span className="text-white/95 font-semibold">
              Submit your project for a chance to be featured.
            </span>
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 z-10">
            <Link href="/showcase/submit">
              <CornerCutButton
                variant="solid"
                color="cyan"
                showArrow={true}
                hoverEffect="shift"
              >
                Submit Project
              </CornerCutButton>
            </Link>
          </div>

          {/* Expectation setter */}
          <p className="mt-8 font-rajdhani text-sm text-white/65">
            Selected projects will appear here once the showcase goes live.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
