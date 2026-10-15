import { VoidVortex } from "../../../components/ui/backgrounds/VoidVortex";

export default function VoidVortexDemo() {
  return (
    <div className="absolute inset-0 min-h-[400px]">
      <VoidVortex
        primaryColor="#00ffff"
        coreColor="#ffffff"
        bgColor="#000000"
        particleCount={4000}
        diskRadius={13}
      />

      {/* hero overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none select-none z-10">
        <h2
          className="font-orbitron font-black uppercase leading-none tracking-tight text-center"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            color: "#ffffff",
            textShadow:
              "0 0 20px #00ffffcc, 0 0 50px #00ffff66, 0 0 90px #00ffff33",
          }}
        >
          Void
          <br />
          Vortex
        </h2>
      </div>
    </div>
  );
}
