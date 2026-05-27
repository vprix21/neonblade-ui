import { HolographicTerrain } from "../../../components/ui/backgrounds/HolographicTerrain";

export default function HolographicTerrainDemo() {
  return (
    <div className="absolute inset-0 min-h-[400px]">
      <HolographicTerrain
        gridSegments={30}
        waveAmplitude={0.6}
        planeWidth={28}
        planeDepth={28}
        cameraHeight={9}
        fog={true}
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
          Holographic
          <br />
          Terrain
        </h2>
      </div>
    </div>
  );
}
