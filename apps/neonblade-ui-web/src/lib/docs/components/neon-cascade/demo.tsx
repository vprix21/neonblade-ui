import { NeonCascade } from "../../../components/ui/backgrounds/NeonCascade";

export default function NeonCascadeDemo() {
  return (
    <div className="absolute inset-0 min-h-[400px]">
      <NeonCascade
        color="#00f3ff"
        tipColor="#7a5cff"
        lineCount={74}
        curveHeight={0.5}
        curveAmount={5}
        sway={0.2}
        span={40}
        glow={1.6}
        lineWidth={0.3}
      />

      {/* hero overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none select-none z-10">
        <h2
          className="font-orbitron font-black uppercase leading-none tracking-tight text-center"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            color: "#ffffff",
            textShadow:
              "0 0 20px #00f3ffcc, 0 0 50px #7a5cff66, 0 0 90px #00f3ff33",
          }}
        >
          Neon
          <br />
          Cascade
        </h2>
      </div>
    </div>
  );
}
