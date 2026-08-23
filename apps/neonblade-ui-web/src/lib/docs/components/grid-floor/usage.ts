const usage = `import { GridFloor } from "@/lib/components/ui/backgrounds/GridFloor";

export default function App() {
  return (
    <div className="relative w-full h-screen">

      {/* Default synthwave floor */}
      <GridFloor />

      {/* Pink horizon */}
      <GridFloor
        lineColor="#ff00ff"
        glowColor="#ff00ff"
        bgColor="#0a020a"
        horizon={0.5}
        speed={0.8}
      />

      {/* Static green wireframe */}
      <GridFloor
        lineColor="#39ff14"
        glowColor="#39ff14"
        bgColor="#000000"
        horizon={0.55}
        speed={0}
        rows={14}
        columns={20}
        lineWidth={1.5}
      />

    </div>
  );
}`;

export default usage;
