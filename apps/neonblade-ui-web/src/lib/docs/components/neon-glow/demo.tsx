import NeonGlow from "../../../components/ui/text/NeonGlow";

export default function NeonGlowDemo() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Single color presets */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Single color presets
        </p>
        <div className="flex flex-wrap gap-8 items-center">
          {(
            ["cyan", "pink", "green", "purple", "orange", "yellow"] as const
          ).map((c) => (
            <span
              key={c}
              className="text-2xl font-bold font-orbitron uppercase"
            >
              <NeonGlow colors={c}>{c}</NeonGlow>
            </span>
          ))}
        </div>
      </div>

      {/* Glow intensities */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Glow intensity
        </p>
        <div className="flex flex-wrap gap-8 items-center">
          {(["none", "subtle", "normal", "strong", "intense"] as const).map(
            (g) => (
              <span
                key={g}
                className="text-2xl font-bold font-orbitron uppercase"
              >
                <NeonGlow colors="cyan" glowIntensity={g}>
                  {g}
                </NeonGlow>
              </span>
            ),
          )}
        </div>
      </div>

      {/* Multi-color gradient — linear directions */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Multi-color gradient — linear directions
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          {(
            [
              "left-right",
              "right-left",
              "top-bottom",
              "bottom-top",
              "diagonal-tl-br",
              "diagonal-tr-bl",
            ] as const
          ).map((dir) => (
            <span
              key={dir}
              className="text-2xl font-bold font-orbitron uppercase"
            >
              <NeonGlow
                colors={["cyan", "pink"]}
                gradientDirection={dir}
                glowIntensity="none"
              >
                {dir}
              </NeonGlow>
            </span>
          ))}
        </div>
      </div>

      {/* Radial & conic */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Radial &amp; conic gradients
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          {/* Radial: bright center fading out — cyan core, purple edge */}
          <span className="text-3xl font-bold font-orbitron uppercase">
            <NeonGlow
              colors={["cyan", "purple"]}
              gradientDirection="radial"
              glowColor="cyan"
              glowIntensity="normal"
            >
              Radial
            </NeonGlow>
          </span>
          {/* Conic: smooth hue wheel — only 3 harmonious stops */}
          <span className="text-3xl font-bold font-orbitron uppercase">
            <NeonGlow
              colors={["cyan", "purple", "pink"]}
              gradientDirection="conic"
              glowColor="pink"
              glowIntensity="normal"
            >
              Conic
            </NeonGlow>
          </span>
        </div>
      </div>

      {/* Four-color gradient */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Up to four colors
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          <span className="text-3xl font-bold font-orbitron uppercase">
            <NeonGlow
              colors={["cyan", "green", "yellow", "pink"]}
              gradientDirection="left-right"
              glowIntensity="strong"
            >
              Four Colors
            </NeonGlow>
          </span>
          <span className="text-3xl font-bold font-orbitron uppercase">
            <NeonGlow
              colors={["#ff6600", "#ffe000"]}
              gradientDirection="diagonal-tl-br"
              glowColor="orange"
              glowIntensity="strong"
            >
              Custom Hex
            </NeonGlow>
          </span>
        </div>
      </div>

      {/* Animated */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Animated — animationType=&quot;shift&quot; (linear gradient scrolls)
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          <span className="text-3xl font-bold font-orbitron uppercase">
            <NeonGlow
              colors={["cyan", "pink"]}
              gradientDirection="left-right"
              animate
              animationType="shift"
              animationSpeed="normal"
            >
              Shift · Normal
            </NeonGlow>
          </span>
          <span className="text-3xl font-bold font-orbitron uppercase">
            <NeonGlow
              colors={["cyan", "pink"]}
              gradientDirection="left-right"
              animate
              animationType="shift"
              animationSpeed="fast"
            >
              Shift · Fast
            </NeonGlow>
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Animated — animationType=&quot;pulse&quot; (opacity fades in/out)
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          <span className="text-3xl font-bold font-orbitron uppercase">
            <NeonGlow
              colors="green"
              glowIntensity="intense"
              animate
              animationType="pulse"
              animationSpeed="slow"
            >
              Pulse · Slow
            </NeonGlow>
          </span>
          <span className="text-3xl font-bold font-orbitron uppercase">
            <NeonGlow
              colors={["purple", "pink", "cyan"]}
              gradientDirection="conic"
              glowColor="purple"
              glowIntensity="normal"
              animate
              animationType="pulse"
              animationSpeed="normal"
            >
              Conic Pulse
            </NeonGlow>
          </span>
        </div>
      </div>

      {/* Gradient glow */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Gradient glow — halo matches the text gradient colors
        </p>
        <div className="flex flex-wrap gap-10 items-center">
          <span className="text-3xl font-bold font-orbitron uppercase">
            <NeonGlow
              colors={["#a159ff", "#d4ff00"]}
              gradientDirection="left-right"
              glowIntensity="normal"
              gradientGlow
            >
              Violet-Acid
            </NeonGlow>
          </span>
        </div>
      </div>
    </div>
  );
}
