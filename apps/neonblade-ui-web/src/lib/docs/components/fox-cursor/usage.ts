const usage = `import { FoxCursor } from "@/lib/components/ui/cursors/FoxCursor";

export default function App() {
  return (
    <>
      {/* Drop anywhere — fixed positioning handles the rest */}
      <FoxCursor color="cyan" />

      {/* Pink, larger, with subtle fill */}
      <FoxCursor
        color="pink"
        size={80}
        strokeWidth={2.5}
        glowIntensity="high"
        fillOpacity={0.4}
      />

      {/* Scoped to a container */}
      <FoxCursor
        color="green"
        size={56}
        glowIntensity="low"
        containerRef={containerRef}
      />
    </>
  );
}`;

export default usage;
