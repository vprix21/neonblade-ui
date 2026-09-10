import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "horizon",
    type: "number",
    default: "0.5",
    description:
      "Horizon line as a fraction of container height (0–1). 0.5 = vertical center.",
  },
  {
    name: "gap",
    type: "number",
    default: "0.08",
    description:
      "Empty space between floor and ceiling as a fraction of container height (0–1). Increase for a wider gap around the horizon.",
  },
  {
    name: "columns",
    type: "number",
    default: "24",
    description: "Number of vertical perspective lines on each plane.",
  },
  {
    name: "rows",
    type: "number",
    default: "18",
    description:
      "Number of horizontal grid rows receding into the distance per plane.",
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
    description:
      "Speed of the forward scrolling animation. Set to 0 to disable motion.",
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
    name: "showFloor",
    type: "boolean",
    default: "true",
    description: "Whether to render the floor grid (below the horizon).",
  },
  {
    name: "showCeiling",
    type: "boolean",
    default: "true",
    description:
      "Whether to render the ceiling grid (mirrored above the horizon).",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Additional CSS classes for the canvas element.",
  },
];

export default props;
