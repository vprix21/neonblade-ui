import Link from "next/link";
import { DatalinesWithGrid } from "../lib/components/ui/backgrounds/DatalinesWithGrid";
import CornerCutButton from "@/lib/components/ui/buttons/CornerCutButton";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col pt-20 sm:pt-24">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <DatalinesWithGrid overlay={true} />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl flex flex-col items-center text-center">
          <h1 className="hero-title font-bold font-orbitron tracking-tighter mb-4 sm:mb-6 max-w-4xl text-balance">
            Build futuristic interfaces with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
              NeonBlade UI
            </span>
          </h1>

          <p className="text-base sm:text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mb-8 sm:mb-12 font-light">
            Not your typical UI library. NeonBlade delivers{" "}
            <span className="font-semibold">free & open-source</span> futuristic
            React components with neon aesthetics, sharp edges, and total design
            control.
          </p>

          <div className="flex items-center">
            <Link href="/components">
              <CornerCutButton color="cyan" hoverEffect="shift" showArrow>
                Explore Components
              </CornerCutButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
