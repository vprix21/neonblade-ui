import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  { name: "value",         type: "number",  description: "Current fill value (0 to max)." },
  { name: "max",           type: "number",  default: "100",      description: "Maximum value." },
  { name: "color",         type: '"cyan" | "pink" | "green" | string', default: '"cyan"', description: "Neon accent color for the arc stroke." },
  { name: "size",          type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Overall diameter preset." },
  { name: "strokeWidth",   type: "number",  description: "Arc stroke width in px. Auto-derived from size if omitted." },
  { name: "showValue",     type: "boolean", default: "true",  description: "Show the percentage value in the center." },
  { name: "centerLabel",   type: "string",  description: "Custom center label (replaces the auto %)." },
  { name: "subLabel",      type: "string",  description: "Smaller sub-label below the value." },
  { name: "glowIntensity", type: '"none" | "low" | "medium" | "high"', default: '"medium"', description: "Neon drop-shadow glow on the arc." },
  { name: "className",     type: "string",  description: "Additional className on the wrapper." },
];

export default props;
