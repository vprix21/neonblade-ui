import { AccentFrame } from "../../../components/ui/frames/AccentFrame";

export default function AccentFrameDemo() {
  return (
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
  );
}
