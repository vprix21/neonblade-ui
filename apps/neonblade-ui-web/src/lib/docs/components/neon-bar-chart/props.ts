import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  { name: "data", type: "NBCDataPoint[]", description: "Array of data objects keyed by xAxisKey + series dataKeys." },
  { name: "series", type: "NBCSeries[]", description: "One or more bar series. Omit and use dataKey + color for a single series." },
  { name: "dataKey", type: "string", default: '"value"', description: "Shorthand dataKey for a single series." },
  { name: "color", type: '"cyan" | "pink" | "green" | string', default: '"cyan"', description: "Shorthand neon accent color for a single series." },
  { name: "label", type: "string", description: "Shorthand legend/tooltip label for a single series." },
  { name: "xAxisKey", type: "string", default: '"name"', description: "Key in data used for category axis labels." },
  { name: "height", type: "number", default: "260", description: "Chart height in px." },
  { name: "layout", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Bar orientation. Horizontal flips X/Y axes." },
  { name: "radius", type: "number", default: "3", description: "Corner radius of each bar (top corners only, cyber style)." },
  { name: "barGap", type: "number", default: "0.35", description: "Gap between bars as a fraction of bar width (0–1)." },
  { name: "grid", type: "boolean", default: "true", description: "Show a subtle neon grid behind the chart." },
  { name: "legend", type: "boolean", default: "false", description: "Show a series legend." },
  { name: "showYAxis", type: "boolean", default: "true", description: "Show Y-axis tick labels." },
  { name: "showXAxis", type: "boolean", default: "true", description: "Show X-axis tick labels." },
  { name: "glowIntensity", type: '"none" | "low" | "medium" | "high"', default: '"medium"', description: "Neon drop-shadow glow on each bar." },
  { name: "multiColor", type: "boolean", default: "false", description: "Auto-assign sequential neon colors to each bar in a single-series chart." },
  { name: "className", type: "string", description: "Additional className on the wrapper div." },
];

export default props;
