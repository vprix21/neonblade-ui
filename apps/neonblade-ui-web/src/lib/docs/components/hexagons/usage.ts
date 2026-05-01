const usage = `import { Hexagons } from "@/lib/components/ui/backgrounds/Hexagons";

export default function MyPage() {
  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      {/* Hexagon Background */}
      <Hexagons
        hexColor="transparent"              // cell fill (rgba or hex)
        hexBorderColor="rgba(0,243,255,0.2)"
        hexSize={40}                        // circumradius in px
        borderWidth={1}

        hoverEffect={true}                  // hover is tracked at document level —
                                            // works even through z-stacked overlays
        hoverColor="rgba(0,243,255,0.15)"   // fill color on hover
        hoverBorderColor="#00f3ff"          // border color on hover ("" = no change)

        borderGlowEffect={true}             // neon glow shadow on ALL borders
        borderGlowColor="#00f3ff"           // glow color (independent of border color)
        borderGlowRadius={10}               // glow blur radius in px

        beamEffect={true}                   // beams flowing along hex edges
        beamColor="#00f3ff"                 // hex or rgba — both fully supported
        beamGlowColor="#00f3ff"
        maxBeams={20}
        beamSpeed={2}
        beamLength={80}
        beamSpawnProbability={0.08}

        overlay={true}                      // dark vignette overlay
      />

      {/* Foreground content — hover detection works through this */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-5xl font-bold text-white">HEX GRID</h1>
      </div>
    </div>
  );
}`;

export default usage;
