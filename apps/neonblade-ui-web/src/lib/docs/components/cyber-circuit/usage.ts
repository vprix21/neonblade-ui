const usage = `import { CyberCircuit } from "@/lib/components/ui/backgrounds/CyberCircuit";

export default function MyPage() {
  return (
    <div className="relative w-full h-[320px] sm:h-[500px] bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Circuit Background */}
      <CyberCircuit
        className="z-0"
        color="#00f3ff"
        opacity={0.65}
        lineThickness={2}
        dotSize={3}
        dotType="filled" // "filled" | "outline"
        glowColor="#00f3ff"
        glowIntensity="medium" // "none" | "soft" | "medium" | "strong"
      />
      
      {/* Foreground Content */}
      <div className="z-10 text-white text-4xl font-bold font-mono tracking-widest drop-shadow-md">
        ACCESS <span className="text-cyan-400">GRANTED</span>
      </div>
    </div>
  );
}`;

export default usage;
