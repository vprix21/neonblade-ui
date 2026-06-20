const usage = `import ArrowLoader from "@/components/neonblade-ui/arrow-loader";

// Default cyan loader (8px tall)
export default function App() {
  return <ArrowLoader color="cyan" height={8} />;
}

// Dense fast arrows
export function FastDense() {
  return <ArrowLoader color="pink" height={12} arrowSize={6} gap={4} speed={200} />;
}

// Thick slow arrows
export function ThickSlow() {
  return <ArrowLoader color="#ffb800" height={12} arrowSize={18} gap={14} thickness={4} speed={1200} />;
}`;

export default usage;
