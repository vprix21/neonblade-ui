const usage = `import { Crosshair } from "@/lib/components/ui/cursors/Crosshair";

export default function App() {
  return (
    <>
      {/* Drop anywhere — fixed positioning handles the rest */}
      <Crosshair color="cyan" />

      {/* Pink with larger rings */}
      <Crosshair
        color="pink"
        outerSize={56}
        innerSize={34}
        outerThickness={2.5}
        innerThickness={1.5}
        glowIntensity="high"
      />

      {/* Green, faster spin, narrow arc gap */}
      <Crosshair
        color="green"
        arcGap={0.15}
        outerSpeed={1.5}
        innerSpeed={1}
        crosshairSize={10}
        glowIntensity="low"
      />
    </>
  );
}`;

export default usage;
