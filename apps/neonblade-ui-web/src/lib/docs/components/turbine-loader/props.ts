import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | "white" | "orange" | string',
    default: '"cyan"',
    description:
      "Neon accent color for the blades, hub, and glow. Use a preset name or any valid CSS color value.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | number',
    default: '"md"',
    description:
      "Overall width/height in pixels, or a size preset. xs=32, sm=48, md=72, lg=96, xl=128.",
  },
  {
    name: "ringCount",
    type: "number",
    default: "2",
    description:
      "Number of concentric turbine rings (clamped to 1–4). Inner rings rotate in the opposite direction.",
  },
  {
    name: "bladeCount",
    type: "number",
    default: "8",
    description: "Number of blades per ring (clamped to 3–16).",
  },
  {
    name: "speed",
    type: "number",
    default: "1800",
    description: "Full rotation duration in milliseconds. Lower = faster spin.",
  },
  {
    name: "direction",
    type: '"clockwise" | "counter-clockwise"',
    default: '"clockwise"',
    description:
      "Rotation direction of the outer ring. Each inner ring automatically alternates direction for a mechanical turbine effect.",
  },
  {
    name: "glowIntensity",
    type: '"none" | "low" | "medium" | "high"',
    default: '"medium"',
    description: "Neon drop-shadow glow around the whole turbine.",
  },
  {
    name: "hubSize",
    type: "number",
    default: "0.16",
    description:
      "Central hub radius as a fraction of the outer turbine radius (0–1).",
  },
  {
    name: "bladeWidth",
    type: "number",
    default: "0.5",
    description: "Blade base width as a fraction of the ring thickness (0–1).",
  },
  {
    name: "bladeTaper",
    type: "number",
    default: "0.35",
    description: "Blade tip width as a fraction of the blade base width (0–1).",
  },
  {
    name: "ringGap",
    type: "number",
    default: "0.06",
    description:
      "Gap between concentric rings as a fraction of the outer turbine radius.",
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Extra class names applied to the outer wrapper div.",
  },
];

export default props;
