const usage = `import NeonGlow from "@/lib/components/ui/text/NeonGlow";

export default function App() {
  return (
    <div className="flex flex-col gap-8">
      {/* Single color preset — glow auto-matches text color */}
      <h2 className="text-4xl font-bold font-orbitron uppercase">
        <NeonGlow colors="cyan">Neon Cyan</NeonGlow>
      </h2>

      {/* Single color — custom hex (any valid CSS color works) */}
      <h2 className="text-4xl font-bold font-orbitron uppercase">
        <NeonGlow colors="#ff6600" glowIntensity="strong">Custom Hex</NeonGlow>
      </h2>

      {/* Two-color gradient — glow suppressed by default; set glowColor to add one */}
      <h2 className="text-4xl font-bold font-orbitron uppercase">
        <NeonGlow
          colors={["cyan", "pink"]}
          gradientDirection="left-right"
        >
          Dual Gradient
        </NeonGlow>
      </h2>

      {/* Gradient glow — halo mirrors the text gradient colors */}
      <h2 className="text-4xl font-bold font-orbitron uppercase">
        <NeonGlow
          colors={["cyan", "pink"]}
          gradientDirection="left-right"
          gradientGlow
          glowIntensity="strong"
        >
          Gradient Glow
        </NeonGlow>
      </h2>

      {/* Four-color diagonal gradient */}
      <h2 className="text-4xl font-bold font-orbitron uppercase">
        <NeonGlow
          colors={["cyan", "green", "yellow", "pink"]}
          gradientDirection="diagonal-tl-br"
          gradientGlow
          glowIntensity="normal"
        >
          Four Colors
        </NeonGlow>
      </h2>

      {/* Radial gradient — single glowColor pin */}
      <h2 className="text-4xl font-bold font-orbitron uppercase">
        <NeonGlow
          colors={["cyan", "purple"]}
          gradientDirection="radial"
          glowColor="cyan"
          glowIntensity="normal"
        >
          Radial
        </NeonGlow>
      </h2>

      {/* Conic gradient */}
      <h2 className="text-4xl font-bold font-orbitron uppercase">
        <NeonGlow
          colors={["cyan", "purple", "pink"]}
          gradientDirection="conic"
          glowColor="pink"
          glowIntensity="normal"
        >
          Conic
        </NeonGlow>
      </h2>

      {/* animate + animationType="shift" — scrolls background-position (linear gradients) */}
      <h2 className="text-4xl font-bold font-orbitron uppercase">
        <NeonGlow
          colors={["cyan", "pink"]}
          gradientDirection="left-right"
          animate
          animationType="shift"
          animationSpeed="normal"
        >
          Gradient Shift
        </NeonGlow>
      </h2>

      {/* animate + animationType="pulse" — fades opacity (single color, radial, conic) */}
      <h2 className="text-4xl font-bold font-orbitron uppercase">
        <NeonGlow
          colors="green"
          glowIntensity="intense"
          animate
          animationType="pulse"
          animationSpeed="slow"
        >
          Glow Pulse
        </NeonGlow>
      </h2>

      {/* animate + gradientGlow — shifting gradient with gradient-matched halo */}
      <h2 className="text-4xl font-bold font-orbitron uppercase">
        <NeonGlow
          colors={["cyan", "purple", "pink"]}
          gradientDirection="left-right"
          gradientGlow
          glowIntensity="strong"
          animate
          animationType="shift"
        >
          Animated + Gradient Glow
        </NeonGlow>
      </h2>
    </div>
  );
}`;

export default usage;
