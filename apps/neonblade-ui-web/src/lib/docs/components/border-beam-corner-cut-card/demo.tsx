import { BorderBeamCornerCutCard } from "../../../components/ui/cards/BorderBeamCornerCutCard";

export default function BorderBeamCornerCutCardDemo() {
  return (
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
  );
}
