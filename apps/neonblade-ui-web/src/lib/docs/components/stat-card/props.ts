import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  { name: "value", type: "string | number", description: "Primary metric value displayed in large text." },
  { name: "label", type: "string", description: "Short label describing the metric (shown above the value)." },
  { name: "unit", type: "string", description: "Unit or suffix appended after the value (e.g. '%', 'ms', 'GB')." },
  { name: "trend", type: '"up" | "down" | "neutral"', description: "Trend direction. Renders a colored arrow: green ▲ for up, pink ▼ for down, grey — for neutral." },
  { name: "change", type: "string", description: "Trend change text shown alongside the arrow (e.g. '+12.4%', '-6ms')." },
  { name: "changeLabel", type: "string", description: "Secondary label next to the change text (e.g. 'vs last week')." },
  { name: "sparkData", type: "NSDataPoint[]", description: "Optional sparkline data array. When provided, a NeonSparkline is rendered flush to the card bottom." },
  { name: "color", type: '"cyan" | "pink" | "green" | string', default: '"cyan"', description: "Neon accent color — applied to border glow, corner accents, value glow, and sparkline." },
  { name: "icon", type: "ReactNode", description: "Icon element displayed in the top-right corner (e.g. a Lucide icon)." },
  { name: "background", type: "string", default: '"rgba(5,5,5,0.85)"', description: "Background color of the card." },
  { name: "glowIntensity", type: '"none" | "low" | "medium" | "high"', default: '"medium"', description: "Neon glow intensity of the border shadow and corner accents." },
  { name: "className", type: "string", description: "Additional className on the outer card div." },
];

export default props;
