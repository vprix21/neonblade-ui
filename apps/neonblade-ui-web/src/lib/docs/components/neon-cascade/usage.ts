const usage = `import { NeonCascade } from "@/lib/components/ui/backgrounds/NeonCascade";

export default function App() {
  return (
    <div className="relative w-screen h-screen">
      <NeonCascade
        color="#00f3ff"
        tipColor="#7a5cff"
        lineCount={64}
        curveHeight={0.5}
        curveAmount={5}
        flow
        glow={1.6}
      />
      {/* your content on top */}
    </div>
  );
}`;

export default usage;
