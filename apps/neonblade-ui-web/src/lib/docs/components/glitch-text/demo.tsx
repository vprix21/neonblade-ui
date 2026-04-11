import { GlitchText } from "../../../components/ui/text/GlitchText";

export default function GlitchTextDemo() {
  return (
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
  );
}
