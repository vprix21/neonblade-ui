const usage = `import { useState } from "react";
import NeonSelect from "@/components/neonblade-ui/neon-select";

const options = [
  { value: "engineer", label: "Engineer" },
  { value: "analyst",  label: "Analyst"  },
  { value: "designer", label: "Designer" },
];

// Controlled
export default function App() {
  const [role, setRole] = useState("");
  return (
    <NeonSelect
      options={options}
      value={role}
      onChange={setRole}
      placeholder="SELECT ROLE..."
      color="cyan"
    />
  );
}

// Uncontrolled with default
export function Preset() {
  return (
    <NeonSelect options={options} defaultValue="analyst" color="pink" />
  );
}`;

export default usage;
