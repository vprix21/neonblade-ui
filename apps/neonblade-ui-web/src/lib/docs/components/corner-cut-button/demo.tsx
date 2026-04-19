import { CornerCutButton } from "../../../components/ui/buttons/CornerCutButton";

export default function CornerCutButtonDemo() {
  return (
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
          <CornerCutButton hoverEffect="shine" color="pink">
            Shine
          </CornerCutButton>
          <CornerCutButton hoverEffect="pulse" color="green" variant="outline">
            Pulse
          </CornerCutButton>
          <CornerCutButton hoverEffect="scan" color="pink">
            Scan
          </CornerCutButton>
          <CornerCutButton hoverEffect="flicker" color="pink" variant="outline">
            Flicker
          </CornerCutButton>
          <CornerCutButton hoverEffect="shift" hoverOutlined color="green">
            Shift to Outline
          </CornerCutButton>
          <CornerCutButton hoverEffect="shift" hoverColor="pink" color="cyan">
            Custom Hover Color
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
  );
}
