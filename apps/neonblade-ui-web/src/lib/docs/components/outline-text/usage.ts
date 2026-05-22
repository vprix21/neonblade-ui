const usage = `import OutlineText from "@/lib/components/ui/text/OutlineText";

export default function App() {
  return (
    <div className="flex flex-col gap-10">
      {/* Pure outline — transparent fill, cyan stroke */}
      <h2 className="font-black font-orbitron uppercase">
        <OutlineText strokeColor="cyan" fontSize="3rem">
          OUTLINE
        </OutlineText>
      </h2>

      {/* Solid dark fill + stroke */}
      <h2 className="font-black font-orbitron uppercase">
        <OutlineText
          strokeColor="pink"
          fillColor="#1a001a"
          hoverFillColor="#ff00ff22"
          hoverGlowIntensity="strong"
          fontSize="3rem"
        >
          DARK FILL
        </OutlineText>
      </h2>

      {/* Different stroke color on hover + glow */}
      <h2 className="font-black font-orbitron uppercase">
        <OutlineText
          strokeColor="purple"
          hoverStrokeColor="cyan"
          hoverGlowIntensity="normal"
          fontSize="3rem"
        >
          COLOR SHIFT
        </OutlineText>
      </h2>

      {/* Proximity radius — letters activate as cursor draws near */}
      <h2 className="font-black font-orbitron uppercase">
        <OutlineText
          strokeColor="#ffffff20"
          hoverStrokeColor="cyan"
          hoverGlowIntensity="intense"
          proximityRadius={100}
          strokeWidth={1.5}
          fontSize="3rem"
        >
          PROXIMITY
        </OutlineText>
      </h2>

      {/* Wide proximity zone */}
      <h2 className="font-black font-orbitron uppercase">
        <OutlineText
          strokeColor="#ffffff15"
          hoverStrokeColor="pink"
          hoverGlowIntensity="strong"
          proximityRadius={160}
          fontSize="3rem"
        >
          WIDE ZONE
        </OutlineText>
      </h2>

      {/* Whole-text hover (proximity disabled) */}
      <h2 className="font-black font-orbitron uppercase">
        <OutlineText
          strokeColor="#ffffff30"
          hoverStrokeColor="green"
          hoverGlowIntensity="normal"
          proximityEffect={false}
          fontSize="3rem"
        >
          FULL HOVER
        </OutlineText>
      </h2>

      {/* Custom stroke width + intense glow */}
      <h2 className="font-black font-orbitron uppercase">
        <OutlineText
          strokeColor="orange"
          hoverStrokeColor="yellow"
          hoverGlowColor="yellow"
          hoverGlowIntensity="intense"
          strokeWidth={2}
          fontSize="3rem"
        >
          THICK STROKE
        </OutlineText>
      </h2>

      {/* Responsive headline */}
      <h1 className="font-black font-orbitron uppercase">
        <OutlineText
          strokeColor="#ffffff18"
          hoverStrokeColor="cyan"
          hoverGlowColor="cyan"
          hoverGlowIntensity="intense"
          proximityRadius={120}
          strokeWidth={1.5}
          fontSize="clamp(2.5rem, 7vw, 6rem)"
          transitionDuration={150}
        >
          NEONBLADE
        </OutlineText>
      </h1>
    </div>
  );
}`;

export default usage;
