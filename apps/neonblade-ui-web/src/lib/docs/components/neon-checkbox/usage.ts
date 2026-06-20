const usage = `import { useState } from "react";
import NeonCheckbox from "@/components/neonblade-ui/neon-checkbox";

// Controlled
export default function App() {
  const [agreed, setAgreed] = useState(false);
  return (
    <NeonCheckbox
      label="Accept Terms of Service"
      checked={agreed}
      onChange={setAgreed}
      color="cyan"
    />
  );
}

// Indeterminate
export function Partial() {
  return <NeonCheckbox label="Select All" indeterminate color="pink" />;
}`;

export default usage;
