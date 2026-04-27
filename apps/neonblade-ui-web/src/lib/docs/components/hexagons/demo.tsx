import { Hexagons } from "@/lib/components/ui/backgrounds/Hexagons";

const HexagonsDemo = () => {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] flex items-center justify-center bg-black overflow-hidden rounded-xl border border-white/10 shadow-2xl">
      <Hexagons
        hexColor="transparent"
        hexBorderColor="rgba(50, 50, 50, 0.73)"
        hexSize={42}
        borderWidth={1}
        hoverEffect={true}
        hoverColor="rgba(0,243,255,0.15)"
        hoverBorderColor="#00f3ff"
        borderGlowEffect={false}
        borderGlowColor="#00f3ff"
        borderGlowRadius={10}
        beamEffect={true}
        beamColor="#00f3ff"
        beamGlowColor="#00f3ff"
        maxBeams={18}
        beamSpeed={1.5}
        beamLength={90}
        beamSpawnProbability={0.1}
        overlay={false}
      />
      <div className="z-10 relative space-y-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-md">
          HEX <span className="text-[#00f3ff]">GRID</span>
        </h2>
        <p className="text-cyan-100/80 max-w-sm mx-auto px-4">
          Hover a cell. Watch the beams flow along the edges.
        </p>
      </div>
    </div>
  );
};

export default HexagonsDemo;
