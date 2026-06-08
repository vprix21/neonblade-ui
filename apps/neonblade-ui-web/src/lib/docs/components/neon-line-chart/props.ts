import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  { name: "data", type: "NLCDataPoint[]", description: "Array of data objects keyed by xAxisKey + series dataKeys." },
  { name: "series", type: "NLCSeries[]", description: "One or more line series. Omit and use dataKey + color for a single series." },
  { name: "dataKey", type: "string", default: '"value"', description: "Shorthand dataKey when using a single series." },
  { name: "color", type: '"cyan" | "pink" | "green" | string', default: '"cyan"', description: "Shorthand neon accent color for a single series." },
  { name: "label", type: "string", description: "Shorthand legend/tooltip label for a single series." },
  { name: "xAxisKey", type: "string", default: '"name"', description: "Key in data used for X axis labels." },
  { name: "height", type: "number", default: "260", description: "Chart height in px." },
  { name: "area", type: "boolean", default: "true", description: "Show a gradient-filled area under each line." },
  { name: "dots", type: "boolean", default: "false", description: "Render dot markers on each data point." },
  { name: "grid", type: "boolean", default: "true", description: "Show a subtle neon grid behind the chart." },
  { name: "legend", type: "boolean", default: "false", description: "Show a series legend below the chart." },
  { name: "strokeWidth", type: "number", default: "2", description: "Line stroke width in px." },
  { name: "glowIntensity", type: '"none" | "low" | "medium" | "high"', default: '"medium"', description: "Neon drop-shadow glow on the line stroke." },
  { name: "curve", type: '"monotone" | "linear" | "step" | "stepAfter" | "stepBefore" | "basis"', default: '"monotone"', description: "Recharts curve interpolation type." },
  { name: "showYAxis", type: "boolean", default: "true", description: "Show Y-axis tick labels." },
  { name: "showXAxis", type: "boolean", default: "true", description: "Show X-axis tick labels." },
  { name: "className", type: "string", description: "Additional className on the wrapper div." },
];

export default props;
