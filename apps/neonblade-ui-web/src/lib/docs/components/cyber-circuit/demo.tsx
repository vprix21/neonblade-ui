import { CyberCircuit } from "@/lib/components/ui/backgrounds/CyberCircuit";

const CyberCircuitDemo = () => {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] flex items-center justify-center bg-slate-950 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
      <CyberCircuit
        className="z-0"
        color="#1fcbce"
        opacity={0.7}
        lineThickness={2.8}
        dotSize={2.9}
        dotType="outline"
        glowColor="#1fcbce"
        glowIntensity="none"
      />
      <div className="z-10 relative space-y-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-md">
          CYBER <span className="text-[#1fcbce]">CIRCUIT</span>
        </h2>
        <p className="text-cyan-100/80 max-w-sm mx-auto px-4">
          Static, responsive circuit traces with configurable nodes and line
          weight.
        </p>
      </div>
    </div>
  );
};

export default CyberCircuitDemo;
