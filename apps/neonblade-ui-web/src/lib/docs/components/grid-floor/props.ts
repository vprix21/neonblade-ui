import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "horizon",
    type: "number",
    default: "0.45",
    description: "Horizon line as a fraction of container height (0–1).",
  },
  {
    name: "columns",
    type: "number",
    default: "24",
    description: "Number of vertical perspective lines.",
  },
  {
    name: "rows",
    type: "number",
    default: "18",
    description: "Number of horizontal grid rows receding into the distance.",
  },
  {
    name: "lineColor",
    type: "string",
    default: '"#00f3ff"',
    description: "Color of the grid lines.",
  },
  {
    name: "glowColor",
    type: "string",
    default: '"#00f3ff"',
    description: "Glow color applied as a drop-shadow to the lines.",
  },
  {
    name: "bgColor",
    type: "string",
    default: '"#050505"',
    description: "Background fill color behind the grid.",
  },
  {
    name: "speed",
    type: "number",
    default: "0.6",
    description: "Speed of the forward scrolling animation. Set to 0 to disable motion.",
  },
  {
    name: "opacity",
    type: "number",
    default: "0.85",
    description: "Maximum opacity of the grid lines (0–1).",
  },
  {
    name: "lineWidth",
    type: "number",
    default: "1",
    description: "Grid line width in pixels.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Additional CSS classes for the canvas element.",
  },
];

export default props;
