const usage = `import CircularProgress from "@/components/neonblade-ui/circular-progress";

// Default (md, cyan)
export default function App() {
  return <CircularProgress value={73} color="cyan" size="md" />;
}

// Large with sub-label and high glow
export function CPU() {
  return (
    <CircularProgress
      value={73}
      color="cyan"
      size="lg"
      subLabel="CPU"
      glowIntensity="high"
    />
  );
}

// Custom center label
export function Custom() {
  return <CircularProgress value={58} centerLabel="58%" subLabel="MEM" color="pink" size="lg" />;
}`;

export default usage;
