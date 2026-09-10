const usage = `import { GridScene } from "@/lib/components/ui/backgrounds/GridScene";

export default function App() {
  return (
    <div className="relative w-full h-screen">

      {/* Default — cyan floor + ceiling */}
      <GridScene />

      {/* Pink synthwave scene */}
      <GridScene
        lineColor="#ff00ff"
        glowColor="#ff00ff"
        bgColor="#0a020a"
        horizon={0.5}
        speed={0.8}
      />

      {/* Floor only */}
      <GridScene
        showCeiling={false}
        horizon={0.45}
      />

      {/* Ceiling only */}
      <GridScene
        showFloor={false}
        lineColor="#a855f7"
        glowColor="#a855f7"
        bgColor="#07000f"
        horizon={0.55}
      />

      {/* Static green wireframe */}
      <GridScene
        lineColor="#39ff14"
        glowColor="#39ff14"
        bgColor="#000000"
        horizon={0.5}
        speed={0}
        rows={14}
        columns={20}
        lineWidth={1.5}
      />

    </div>
  );
}`;

export default usage;
