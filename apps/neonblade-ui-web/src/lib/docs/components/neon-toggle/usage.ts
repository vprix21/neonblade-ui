const usage = `import { useState } from "react";
import NeonToggle from "@/components/neonblade-ui/neon-toggle";

// Controlled
export default function App() {
  const [on, setOn] = useState(false);
  return (
    <NeonToggle
      label="Enable Auto-Scan"
      checked={on}
      onChange={setOn}
      color="cyan"
    />
  );
}

// Uncontrolled
export function Uncontrolled() {
  return <NeonToggle label="Dark Mode" defaultChecked color="pink" size="lg" />;
}`;

export default usage;
