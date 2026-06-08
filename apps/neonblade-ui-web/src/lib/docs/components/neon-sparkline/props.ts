import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  { name: "data", type: "NSDataPoint[]", description: "Array of data points. Each must have a value number (or use dataKey)." },
  { name: "dataKey", type: "string", default: '"value"', description: "Key to read from each data point." },
  { name: "color", type: '"cyan" | "pink" | "green" | string', default: '"cyan"', description: "Neon color preset or any CSS hex color." },
  { name: "width", type: "number | string", default: "120", description: "Width of the sparkline in px (or '100%' for responsive)." },
  { name: "height", type: "number", default: "40", description: "Height of the sparkline in px." },
  { name: "strokeWidth", type: "number", default: "1.5", description: "Line stroke width in px." },
  { name: "glowIntensity", type: '"none" | "low" | "medium" | "high"', default: '"medium"', description: "Neon drop-shadow glow intensity on the line." },
  { name: "area", type: "boolean", default: "true", description: "Show a gradient-filled area under the line." },
  { name: "curve", type: '"monotone" | "linear" | "step"', default: '"monotone"', description: "Line interpolation type." },
  { name: "tooltip", type: "boolean", default: "true", description: "Show a minimal cyberpunk tooltip on hover." },
  { name: "className", type: "string", description: "Additional className on the outer wrapper span." },
];

export default props;
