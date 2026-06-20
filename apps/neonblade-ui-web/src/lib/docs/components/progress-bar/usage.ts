const usage = `import ProgressBar from "@/components/neonblade-ui/progress-bar";

// Solid bar with label
export default function App() {
  return <ProgressBar value={73} color="cyan" size="md" showLabel glow />;
}

// Segmented variant (pink)
export function Segmented() {
  return <ProgressBar value={60} color="pink" size="lg" variant="segmented" showLabel glow />;
}

// Pulse variant
export function Pulse() {
  return <ProgressBar value={30} color="green" size="md" variant="pulse" />;
}`;

export default usage;
