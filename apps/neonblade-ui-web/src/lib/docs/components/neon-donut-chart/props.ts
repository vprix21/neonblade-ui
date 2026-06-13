import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  { name: "data", type: "NDCSegment[]", description: "Array of segments. Each segment has name, value, and optional color." },
  { name: "height", type: "number", default: "260", description: "Chart height in px." },
  { name: "innerRadius", type: "string | number", default: '"62%"', description: "Inner hole radius. Use percentage string (e.g. '60%') or absolute px number." },
  { name: "outerRadius", type: "string | number", default: '"88%"', description: "Outer ring radius. Use percentage string or absolute px number." },
  { name: "glowIntensity", type: '"none" | "low" | "medium" | "high"', default: '"medium"', description: "Neon glow spread on each segment." },
  { name: "paddingAngle", type: "number", default: "2", description: "Gap between segments in degrees." },
  { name: "cornerRadius", type: "number", default: "4", description: "Corner radius on each segment arc end in px." },
  { name: "centerLabel", type: "boolean", default: "true", description: "Show a center label with the hovered segment name + value (or total when nothing is hovered)." },
  { name: "color", type: '"cyan" | "pink" | "green" | string', default: '"cyan"', description: "Primary accent color — used for the total label and fallback tooltip." },
  { name: "legend", type: "boolean", default: "false", description: "Show a custom inline legend below the chart." },
  { name: "className", type: "string", description: "Additional className on the wrapper div." },
];

export default props;
