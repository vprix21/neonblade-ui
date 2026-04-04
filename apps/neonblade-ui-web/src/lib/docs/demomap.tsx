import { AsciiRain } from "../components/ui/backgrounds/AsciiRain";
import { BorderBeamCornerCutCard } from "../components/ui/cards/BorderBeamCornerCutCard";
import { DatalinesWithGrid } from "../components/ui/backgrounds/DatalinesWithGrid";
import { AccentFrame } from "../components/ui/frames/AccentFrame";
import { CornerCutButton } from "../components/ui/buttons/CornerCutButton";
import { NeonGlowCornerCutCard } from "../components/ui/cards/NeonGlowCornerCutCard";
import { GlitchText } from "../components/ui/text/GlitchText";
import { Badge } from "../components/ui/badges/Badge";

const demoMap: Record<string, React.FC> = {
  "datalines-with-grid": () => (
    <div className="h-96 w-full relative">
      <DatalinesWithGrid />
    </div>
  ),
  "ascii-rain": () => (
    <div className="h-96 w-full relative">
      <AsciiRain />
    </div>
  ),
  "border-beam-corner-cut-card": () => (
    <div className="flex flex-col gap-12 w-full">
      {/* Beam Variants */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Beam Variants
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <BorderBeamCornerCutCard
            variant="single"
            beamColor="pink"
            title="Single"
            className="h-28"
          />
          <BorderBeamCornerCutCard
            variant="dual"
            beamColor="pink"
            beamColorB="cyan"
            title="Dual"
            className="h-28"
          />
          <BorderBeamCornerCutCard
            variant="gradient-sweep"
            beamColor="pink"
            beamColorB="cyan"
            title="Gradient"
            className="h-28"
          />
          <BorderBeamCornerCutCard
            variant="rainbow"
            title="Rainbow"
            className="h-28"
          />
          <BorderBeamCornerCutCard
            variant="pulse"
            beamColor="green"
            title="Pulse"
            className="h-28"
          />
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Colors
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <BorderBeamCornerCutCard
            beamColor="pink"
            title="Pink"
            description="Default preset."
            className="h-28"
          />
          <BorderBeamCornerCutCard
            beamColor="cyan"
            title="Cyan"
            description="Neon cyan."
            className="h-28"
          />
          <BorderBeamCornerCutCard
            beamColor="green"
            title="Green"
            description="Neon green."
            className="h-28"
          />
          <BorderBeamCornerCutCard
            beamColor="#ff6600"
            title="#ff6600"
            description="Any CSS color."
            className="h-28"
          />
        </div>
      </div>

      {/* Glow Intensity */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Glow Intensity
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <BorderBeamCornerCutCard
            beamColor="cyan"
            glowIntensity="none"
            title="None"
            className="h-28"
          />
          <BorderBeamCornerCutCard
            beamColor="cyan"
            glowIntensity="low"
            title="Low"
            className="h-28"
          />
          <BorderBeamCornerCutCard
            beamColor="cyan"
            glowIntensity="medium"
            title="Medium"
            className="h-28"
          />
          <BorderBeamCornerCutCard
            beamColor="cyan"
            glowIntensity="high"
            title="High"
            className="h-28"
          />
        </div>
      </div>

      {/* Corners */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Corners
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <BorderBeamCornerCutCard
            corner="bottom-right"
            beamColor="pink"
            title="BR"
            className="h-28"
          />
          <BorderBeamCornerCutCard
            corner="bottom-left"
            beamColor="pink"
            title="BL"
            className="h-28"
          />
          <BorderBeamCornerCutCard
            corner="top-right"
            beamColor="pink"
            title="TR"
            className="h-28"
          />
          <BorderBeamCornerCutCard
            corner="top-left"
            beamColor="pink"
            title="TL"
            className="h-28"
          />
          <BorderBeamCornerCutCard
            corner="all"
            beamColor="pink"
            title="All"
            className="h-28"
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Sizes
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
          <BorderBeamCornerCutCard
            size="sm"
            beamColor="cyan"
            title="Small"
            description="Compact padding."
          />
          <BorderBeamCornerCutCard
            size="md"
            beamColor="cyan"
            title="Medium"
            description="Default size."
          />
          <BorderBeamCornerCutCard
            size="lg"
            beamColor="cyan"
            title="Large"
            description="More room."
          />
          <BorderBeamCornerCutCard
            size="xl"
            beamColor="cyan"
            title="XLarge"
            description="Max padding."
          />
        </div>
      </div>

      {/* With icon / title / description */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          With Icon + Content
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BorderBeamCornerCutCard
            beamColor="pink"
            beamColorB="cyan"
            variant="dual"
            title="Dual Beam"
            description="Two beams rotating in opposite directions."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            }
          />
          <BorderBeamCornerCutCard
            beamColor="cyan"
            variant="gradient-sweep"
            beamColorB="pink"
            glowIntensity="high"
            title="Gradient Sweep"
            description="Wide blending beam with high ambient glow."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            }
          />
          <BorderBeamCornerCutCard
            variant="rainbow"
            corner="all"
            cornerSize={16}
            duration={3}
            title="Rainbow All-Cut"
            description="Continuous neon spectrum on every corner."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
                <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  ),
  "accent-frame": () => (
    <div className="flex flex-col gap-12 w-full">
      {/* Hover effects */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Hover Effects (hover each)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <AccentFrame
            color="cyan"
            hoverEffect="expand"
            className="text-white/70 font-orbitron text-sm text-center"
          >
            expand (default)
          </AccentFrame>
          <AccentFrame
            color="cyan"
            hoverEffect="glow"
            className="text-white/70 font-orbitron text-sm text-center"
          >
            glow
          </AccentFrame>
          <AccentFrame
            color="pink"
            hoverEffect="pulse"
            className="text-white/70 font-orbitron text-sm text-center"
          >
            pulse
          </AccentFrame>
          <AccentFrame
            color="green"
            hoverEffect="flicker"
            className="text-white/70 font-orbitron text-sm text-center"
          >
            flicker
          </AccentFrame>
          <AccentFrame
            color="cyan"
            hoverEffect="trace"
            className="text-white/70 font-orbitron text-sm text-center"
          >
            trace
          </AccentFrame>
          <AccentFrame
            color="pink"
            hoverEffect="none"
            className="text-white/70 font-orbitron text-sm text-center"
          >
            none
          </AccentFrame>
        </div>
      </div>

      {/* Colors + colorB dual-color */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Colors & Dual Color (quad mode)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AccentFrame
            color="cyan"
            mode="quad"
            className="text-white/70 font-orbitron text-xs text-center"
          >
            Cyan
          </AccentFrame>
          <AccentFrame
            color="pink"
            mode="quad"
            className="text-white/70 font-orbitron text-xs text-center"
          >
            Pink
          </AccentFrame>
          <AccentFrame
            color="green"
            mode="quad"
            className="text-white/70 font-orbitron text-xs text-center"
          >
            Green
          </AccentFrame>
          <AccentFrame
            color="cyan"
            colorB="pink"
            mode="quad"
            hoverEffect="glow"
            className="text-white/70 font-orbitron text-xs text-center"
          >
            Cyan + Pink
          </AccentFrame>
        </div>
      </div>

      {/* Always-animated */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Always Animated (no hover needed)
        </p>
        <div className="grid grid-cols-3 gap-6">
          <AccentFrame
            color="cyan"
            hoverEffect="glow"
            animated
            glowIntensity="high"
            className="text-white/70 font-orbitron text-xs text-center"
          >
            Glow always on
          </AccentFrame>
          <AccentFrame
            color="pink"
            colorB="cyan"
            mode="quad"
            hoverEffect="pulse"
            animated
            className="text-white/70 font-orbitron text-xs text-center"
          >
            Pulse always on
          </AccentFrame>
          <AccentFrame
            color="green"
            hoverEffect="flicker"
            animated
            className="text-white/70 font-orbitron text-xs text-center"
          >
            Flicker always on
          </AccentFrame>
        </div>
      </div>

      {/* Background variants + corner styles */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Background Variants & Corner Styles
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AccentFrame
            color="cyan"
            bgVariant="none"
            className="text-white/70 font-orbitron text-xs text-center"
          >
            bg: none
          </AccentFrame>
          <AccentFrame
            color="cyan"
            bgVariant="subtle"
            className="text-white/70 font-orbitron text-xs text-center"
          >
            bg: subtle
          </AccentFrame>
          <AccentFrame
            color="cyan"
            bgVariant="solid"
            className="text-white/70 font-orbitron text-xs text-center"
          >
            bg: solid
          </AccentFrame>
          <AccentFrame
            color="pink"
            cornerStyle="rounded"
            mode="quad"
            hoverEffect="glow"
            className="text-white/70 font-orbitron text-xs text-center"
          >
            rounded tips
          </AccentFrame>
        </div>
      </div>

      {/* Corner geometry */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Corner Geometry
        </p>
        <div className="grid grid-cols-3 gap-6">
          <AccentFrame
            color="cyan"
            cornerLength={8}
            cornerThickness={1}
            hoverLength={16}
            className="text-white/60 font-orbitron text-xs text-center"
          >
            Thin short
          </AccentFrame>
          <AccentFrame
            color="cyan"
            cornerLength={24}
            cornerThickness={3}
            hoverLength={48}
            className="text-white/60 font-orbitron text-xs text-center"
          >
            Thick long
          </AccentFrame>
          <AccentFrame
            color="pink"
            colorB="green"
            cornerLength={20}
            cornerThickness={4}
            mode="quad"
            hoverEffect="pulse"
            animated
            className="text-white/60 font-orbitron text-xs text-center"
          >
            Thick quad pulse
          </AccentFrame>
        </div>
      </div>
    </div>
  ),
  "glitch-text": () => (
    <div className="flex flex-col gap-12 w-full">
      {/* Modes */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Modes (active vs hover)
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          <div className="text-3xl font-bold font-orbitron uppercase text-white">
            <GlitchText text="Hover Me" mode="hover">
              Hover Me
            </GlitchText>
          </div>
          <div className="text-3xl font-bold font-orbitron uppercase text-white">
            <GlitchText text="Always On" mode="active">
              Always On
            </GlitchText>
          </div>
        </div>
      </div>

      {/* Intensity */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Intensity (hover each)
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          {(["subtle", "normal", "heavy", "chaos"] as const).map((i) => (
            <div
              key={i}
              className="text-2xl font-bold font-orbitron uppercase text-white"
            >
              <GlitchText text={i} mode="hover" intensity={i}>
                {i}
              </GlitchText>
            </div>
          ))}
        </div>
      </div>

      {/* Speed */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Speed — active mode
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          {(["slow", "normal", "fast", "frenzy"] as const).map((s) => (
            <div
              key={s}
              className="text-2xl font-bold font-orbitron uppercase text-white"
            >
              <GlitchText text={s} mode="active" speed={s}>
                {s}
              </GlitchText>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Custom channel colors (hover)
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          <div className="text-2xl font-bold font-orbitron uppercase text-white">
            <GlitchText text="Default" mode="hover">
              Default
            </GlitchText>
          </div>
          <div className="text-2xl font-bold font-orbitron uppercase text-white">
            <GlitchText
              text="Pink/Green"
              colorA="pink"
              colorB="green"
              mode="hover"
            >
              Pink/Green
            </GlitchText>
          </div>
          <div className="text-2xl font-bold font-orbitron uppercase text-[#ff6600]">
            <GlitchText
              text="Custom"
              colorA="#ff6600"
              colorB="#ffe000"
              offset={3}
              mode="hover"
            >
              Custom
            </GlitchText>
          </div>
        </div>
      </div>

      {/* Neon glow */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Neon Glow add-on
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          <div className="text-3xl font-bold font-orbitron uppercase text-[#00f3ff]">
            <GlitchText text="Neon Glow" mode="hover" neon glowColor="cyan">
              Neon Glow
            </GlitchText>
          </div>
          <div className="text-3xl font-bold font-orbitron uppercase text-[#ff00ff]">
            <GlitchText
              text="Neon Flicker"
              mode="active"
              neon
              neonFlicker
              glowColor="pink"
              intensity="heavy"
            >
              Neon Flicker
            </GlitchText>
          </div>
          <div className="text-3xl font-bold font-orbitron uppercase text-[#39ff14]">
            <GlitchText
              text="Chaos Neon"
              mode="active"
              neon
              glowColor="green"
              intensity="chaos"
              speed="fast"
            >
              Chaos Neon
            </GlitchText>
          </div>
        </div>
      </div>
    </div>
  ),
  "corner-cut-button": () => (
    <div className="flex flex-col gap-10 w-full">
      {/* Variants */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Variants
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <CornerCutButton variant="solid" color="cyan">
            Solid Cyan
          </CornerCutButton>
          <CornerCutButton variant="outline" color="cyan">
            Outline Cyan
          </CornerCutButton>
          <CornerCutButton variant="ghost" color="cyan">
            Ghost Cyan
          </CornerCutButton>
        </div>
      </div>
      {/* Colors */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Colors
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <CornerCutButton color="cyan">Cyan</CornerCutButton>
          <CornerCutButton color="pink">Pink</CornerCutButton>
          <CornerCutButton color="green">Green</CornerCutButton>
          <CornerCutButton color="#ff6600">Custom #ff6600</CornerCutButton>
        </div>
      </div>
      {/* Sizes */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Sizes
        </p>
        <div className="flex flex-wrap gap-4 items-end">
          <CornerCutButton size="xs" color="cyan">
            XSmall
          </CornerCutButton>
          <CornerCutButton size="sm" color="cyan">
            Small
          </CornerCutButton>
          <CornerCutButton size="md" color="cyan">
            Medium
          </CornerCutButton>
          <CornerCutButton size="lg" color="cyan">
            Large
          </CornerCutButton>
          <CornerCutButton size="xl" color="cyan">
            XLarge
          </CornerCutButton>
        </div>
      </div>
      {/* Corners */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Corners
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <CornerCutButton corner="bottom-right" color="pink">
            Bottom Right
          </CornerCutButton>
          <CornerCutButton corner="bottom-left" color="pink">
            Bottom Left
          </CornerCutButton>
          <CornerCutButton corner="top-right" color="pink">
            Top Right
          </CornerCutButton>
          <CornerCutButton corner="top-left" color="pink">
            Top Left
          </CornerCutButton>
          <CornerCutButton corner="all" color="pink">
            All Corners
          </CornerCutButton>
        </div>
      </div>
      {/* Hover effects */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Hover Effects (hover each)
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <CornerCutButton hoverEffect="glow" color="cyan">
            Glow
          </CornerCutButton>
          <CornerCutButton hoverEffect="shift" color="cyan" variant="outline">
            Shift
          </CornerCutButton>
          <CornerCutButton hoverEffect="shine" color="cyan">
            Shine
          </CornerCutButton>
          <CornerCutButton hoverEffect="pulse" color="green">
            Pulse
          </CornerCutButton>
          <CornerCutButton hoverEffect="scan" color="pink">
            Scan
          </CornerCutButton>
          <CornerCutButton hoverEffect="flicker" color="pink" variant="outline">
            Flicker
          </CornerCutButton>
        </div>
      </div>
      {/* Arrow + Hero replica */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          With Arrow / Hero style
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <CornerCutButton color="cyan" showArrow hoverEffect="glow">
            Explore Components
          </CornerCutButton>
          <CornerCutButton
            color="pink"
            variant="outline"
            showArrow
            hoverEffect="shift"
          >
            View Docs
          </CornerCutButton>
          <CornerCutButton
            color="green"
            variant="ghost"
            showArrow
            hoverEffect="scan"
            glowIntensity="high"
          >
            Get Started
          </CornerCutButton>
        </div>
      </div>
    </div>
  ),
  "neon-glow-corner-cut-card": () => (
    <div className="flex flex-col gap-12 w-full">
      {/* Hover Effects */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Hover Effects (hover each card)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <NeonGlowCornerCutCard
            title="Gradient"
            description="Dual-color gradient glow backdrop on hover."
            hoverEffect="gradient"
            colorA="cyan"
            colorB="pink"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            }
          />
          <NeonGlowCornerCutCard
            title="Solid"
            description="Single accent-color backdrop on hover."
            hoverEffect="solid"
            colorA="pink"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            }
          />
          <NeonGlowCornerCutCard
            title="Glow Only"
            description="Box-shadow glow — no backdrop layer."
            hoverEffect="glow-only"
            colorA="green"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            }
          />
          <NeonGlowCornerCutCard
            title="Pulse"
            description="Continuously pulsing glow while hovered."
            hoverEffect="pulse"
            colorA="cyan"
            glowIntensity="high"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            }
          />
          <NeonGlowCornerCutCard
            title="Trace"
            description="Gradient with animated hue rotation."
            hoverEffect="trace"
            colorA="pink"
            colorB="cyan"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            }
          />
          <NeonGlowCornerCutCard
            title="None"
            description="No glow — icon and title transitions only."
            hoverEffect="none"
            colorA="cyan"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Colors
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NeonGlowCornerCutCard
            title="Cyan / Pink"
            colorA="cyan"
            colorB="pink"
            description="Default gradient preset."
          />
          <NeonGlowCornerCutCard
            title="Pink / Cyan"
            colorA="pink"
            colorB="cyan"
            description="Reversed gradient."
          />
          <NeonGlowCornerCutCard
            title="Green / Cyan"
            colorA="green"
            colorB="cyan"
            description="Neon green accent."
          />
          <NeonGlowCornerCutCard
            title="Custom"
            colorA="#ff6600"
            colorB="#ffe000"
            description="Any CSS color value."
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Sizes
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
          <NeonGlowCornerCutCard
            size="sm"
            title="Small"
            description="Compact padding."
            colorA="cyan"
          />
          <NeonGlowCornerCutCard
            size="md"
            title="Medium"
            description="Default size."
            colorA="cyan"
          />
          <NeonGlowCornerCutCard
            size="lg"
            title="Large"
            description="More breathing room."
            colorA="cyan"
          />
          <NeonGlowCornerCutCard
            size="xl"
            title="XLarge"
            description="Maximum padding."
            colorA="cyan"
          />
        </div>
      </div>

      {/* Corners */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Corners
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <NeonGlowCornerCutCard
            corner="bottom-right"
            title="BR Cut"
            colorA="pink"
          />
          <NeonGlowCornerCutCard
            corner="bottom-left"
            title="BL Cut"
            colorA="pink"
          />
          <NeonGlowCornerCutCard
            corner="top-right"
            title="TR Cut"
            colorA="pink"
          />
          <NeonGlowCornerCutCard
            corner="top-left"
            title="TL Cut"
            colorA="pink"
          />
          <NeonGlowCornerCutCard corner="all" title="All Cut" colorA="pink" />
        </div>
      </div>

      {/* Hero replica — with icon */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Hero replica (Features grid style)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NeonGlowCornerCutCard
            title="CLI Installation"
            description="Install components directly into your project via CLI without bloated dependencies."
            colorA="cyan"
            colorB="pink"
            hoverEffect="gradient"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            }
          />
          <NeonGlowCornerCutCard
            title="Futuristic Aesthetics"
            description="High-end, dynamic UI featuring clip-paths, neon glows, and micro-animations."
            colorA="pink"
            colorB="cyan"
            hoverEffect="gradient"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  ),
  badge: () => (
    <div className="flex flex-col gap-10 w-full">
      {/* Shapes */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Shapes
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge color="cyan" shape="pill">
            Pill
          </Badge>
          <Badge color="cyan" shape="rectangle">
            Rectangle
          </Badge>
          <Badge color="cyan" shape="corner-cut">
            Corner Cut
          </Badge>
          <Badge color="cyan" shape="corner-cut" corner="bottom-left">
            Bottom Left
          </Badge>
          <Badge color="cyan" shape="corner-cut" corner="top-right">
            Top Right
          </Badge>
          <Badge color="cyan" shape="corner-cut" corner="all">
            All Corners
          </Badge>
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Variants
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge color="cyan" variant="outline">
            Outline
          </Badge>
          <Badge color="cyan" variant="solid">
            Solid
          </Badge>
          <Badge color="cyan" variant="ghost">
            Ghost
          </Badge>
          <Badge color="pink" variant="outline">
            Outline
          </Badge>
          <Badge color="pink" variant="solid">
            Solid
          </Badge>
          <Badge color="pink" variant="ghost">
            Ghost
          </Badge>
          <Badge color="green" variant="outline">
            Outline
          </Badge>
          <Badge color="green" variant="solid">
            Solid
          </Badge>
          <Badge color="green" variant="ghost">
            Ghost
          </Badge>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Dot Indicators
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge color="cyan" dot="solid">
            Static
          </Badge>
          <Badge color="cyan" dot="pulse">
            Pulse
          </Badge>
          <Badge color="cyan" dot="flicker">
            Flicker
          </Badge>
          <Badge color="pink" shape="corner-cut" dot="flicker">
            Live
          </Badge>
          <Badge color="green" shape="rectangle" dot="pulse">
            Online
          </Badge>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Sizes
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge color="cyan" size="xs">
            XSmall
          </Badge>
          <Badge color="cyan" size="sm">
            Small
          </Badge>
          <Badge color="cyan" size="md">
            Medium
          </Badge>
        </div>
      </div>

      {/* Glow */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Glow
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge color="cyan" glow dot="flicker">
            System Active
          </Badge>
          <Badge color="pink" glow shape="corner-cut" dot="pulse">
            Critical
          </Badge>
          <Badge color="green" glow variant="solid" size="md">
            Confirmed
          </Badge>
        </div>
      </div>

      {/* Custom colors */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Custom Colors
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge color="#ff6600" dot="pulse">
            Warning
          </Badge>
          <Badge color="#a855f7" shape="corner-cut" glow>
            Neural
          </Badge>
          <Badge color="#f59e0b" variant="solid" size="md">
            Alert
          </Badge>
        </div>
      </div>
    </div>
  ),
};

export default demoMap;
