import { NeonGlowCornerCutCard } from "../../../components/ui/cards/NeonGlowCornerCutCard";

export default function NeonGlowCornerCutCardDemo() {
  return (
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
  );
}
