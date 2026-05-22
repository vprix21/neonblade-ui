import OutlineText from "../../../components/ui/text/OutlineText";

export default function OutlineTextDemo() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Color presets */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Stroke color presets — transparent fill
        </p>
        <div className="flex flex-wrap gap-8 items-center">
          {(
            ["cyan", "pink", "green", "purple", "orange", "yellow"] as const
          ).map((c) => (
            <OutlineText
              key={c}
              strokeColor={c}
              fontSize="2.25rem"
              className="font-bold font-orbitron uppercase"
            >
              {c}
            </OutlineText>
          ))}
        </div>
      </div>

      {/* Solid fill variants */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Custom fill color
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          <OutlineText
            strokeColor="cyan"
            fillColor="#001a1a"
            hoverFillColor="#00f3ff22"
            fontSize="2.25rem"
            className="font-bold font-orbitron uppercase"
          >
            Dark fill
          </OutlineText>
          <OutlineText
            strokeColor="pink"
            fillColor="#1a001a"
            hoverFillColor="#ff00ff22"
            fontSize="2.25rem"
            className="font-bold font-orbitron uppercase"
          >
            Tinted fill
          </OutlineText>
          <OutlineText
            strokeColor="yellow"
            fillColor="rgba(255,224,0,0.08)"
            hoverFillColor="rgba(255,224,0,0.22)"
            fontSize="2.25rem"
            className="font-bold font-orbitron uppercase"
          >
            Alpha fill
          </OutlineText>
        </div>
      </div>

      {/* Glow intensities */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Hover glow intensity (hover to see)
        </p>
        <div className="flex flex-wrap gap-8 items-center">
          {(["none", "subtle", "normal", "strong", "intense"] as const).map(
            (g) => (
              <OutlineText
                key={g}
                strokeColor="cyan"
                hoverStrokeColor="cyan"
                hoverGlowIntensity={g}
                fontSize="2.25rem"
                className="font-bold font-orbitron uppercase"
              >
                {g}
              </OutlineText>
            ),
          )}
        </div>
      </div>

      {/* Stroke width */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Stroke width
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          {[0.5, 1, 1.5, 2, 3].map((w) => (
            <OutlineText
              key={w}
              strokeColor="cyan"
              hoverStrokeColor="pink"
              strokeWidth={w}
              hoverGlowIntensity="normal"
              fontSize="2.25rem"
              className="font-bold font-orbitron uppercase"
            >
              {`${w}px`}
            </OutlineText>
          ))}
        </div>
      </div>

      {/* Hover color change */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Stroke color change on hover
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          <OutlineText
            strokeColor="cyan"
            hoverStrokeColor="pink"
            hoverGlowIntensity="none"
            fontSize="2.75rem"
            className="font-bold font-orbitron uppercase"
          >
            Cyan → Pink
          </OutlineText>
          <OutlineText
            strokeColor="purple"
            hoverStrokeColor="yellow"
            hoverGlowIntensity="none"
            fontSize="2.75rem"
            className="font-bold font-orbitron uppercase"
          >
            Purple → Yellow
          </OutlineText>
        </div>
      </div>

      {/* Proximity radius effect */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Proximity radius effect — move cursor near letters
        </p>
        <div className="flex flex-wrap gap-12 items-center">
          <OutlineText
            strokeColor="#ffffff33"
            hoverStrokeColor="cyan"
            hoverGlowIntensity="strong"
            proximityRadius={80}
            fontSize="3rem"
            className="font-bold font-orbitron uppercase"
          >
            PROXIMITY
          </OutlineText>
        </div>
        <div className="flex flex-wrap gap-12 items-center">
          <OutlineText
            strokeColor="#ffffff22"
            hoverStrokeColor="pink"
            hoverGlowIntensity="intense"
            proximityRadius={120}
            fontSize="3rem"
            className="font-bold font-orbitron uppercase"
          >
            WIDE RADIUS
          </OutlineText>
        </div>
      </div>

      {/* Whole-text hover (no proximity) */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Whole-text hover (proximityEffect disabled)
        </p>
        <OutlineText
          strokeColor="#ffffff30"
          hoverStrokeColor="green"
          hoverGlowIntensity="strong"
          proximityEffect={false}
          fontSize="2.75rem"
          className="font-bold font-orbitron uppercase"
        >
          Hover me
        </OutlineText>
      </div>

      {/* Large headline showcase */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Headline showcase
        </p>
        <OutlineText
          strokeColor="#ffffff20"
          hoverStrokeColor="cyan"
          hoverGlowColor="cyan"
          hoverGlowIntensity="intense"
          proximityRadius={100}
          strokeWidth={1.5}
          fontSize="clamp(2rem, 6vw, 5rem)"
          className="font-black font-orbitron uppercase leading-none"
        >
          NEONBLADE
        </OutlineText>
      </div>
    </div>
  );
}
