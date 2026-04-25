import type { PropDefinition } from "../../types";

const cyberCircuitProps: PropDefinition[] = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the container.",
    default: "undefined",
  },
  {
    name: "color",
    type: "string",
    description: "The CSS color string for the circuit traces and nodes.",
    default: "#00f3ff",
  },
  {
    name: "opacity",
    type: "number",
    description: "The opacity of the circuit background (0.0 to 1.0).",
    default: "0.6",
  },
  {
    name: "lineThickness",
    type: "number",
    description: "Base thickness of the circuit traces.",
    default: "2",
  },
  {
    name: "dotSize",
    type: "number",
    description: "Base radius used for terminal node circles.",
    default: "3",
  },
  {
    name: "dotType",
    type: '"filled" | "outline"',
    description: "Node style variant for circuit endpoints.",
    default: '"filled"',
  },
  {
    name: "glowColor",
    type: "string",
    description: "Glow color applied to lines and terminal nodes.",
    default: "#00f3ff",
  },
  {
    name: "glowIntensity",
    type: '"none" | "soft" | "medium" | "strong"',
    description:
      'Controls glow strength. Use "none" for a fully flat, non-glowing style.',
    default: '"medium"',
  },
];

export default cyberCircuitProps;
