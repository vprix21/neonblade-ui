const usage = `import { RainLoader } from "@/lib/components/ui/progress/RainLoader";

export default function App() {
  return (
    <>
      {/* Drop-in anywhere — works great as an inline card loader */}
      <RainLoader />

      {/* Custom color and size */}
      <RainLoader color="pink" size="lg" />

      {/* Slow, relaxed loop for ambient UI */}
      <RainLoader color="green" size="xl" duration={2800} glowIntensity="high" />

      {/* Compact inline use — e.g. inside an image card */}
      <RainLoader color="cyan" size="sm" barCount={3} duration={1200} />

      {/* Exact pixel size */}
      <RainLoader color="#ff6a00" size={40} barWidthRatio={0.1} gap={4} />
    </>
  );
}`;

export default usage;
