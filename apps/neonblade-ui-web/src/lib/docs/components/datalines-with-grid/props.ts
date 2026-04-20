import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "lineColor",
    type: "string",
    default: '"#00f3ff"',
    description: "The color for the line tracers.",
  },
  {
    name: "shadowColor",
    type: "string",
    default: '"#00f3ff"',
    description: "The hex color for the trail shadow.",
  },
  {
    name: "bgGridColor",
    type: "string",
    default: '"rgba(255,255,255,0.05)"',
    description: "Color for the grid cells border.",
  },
  {
    name: "cellSize",
    type: "number",
    default: "50",
    description: "Size of the simulated grid tiles.",
  },
  {
    name: "maxLines",
    type: "number",
    default: "15",
    description: "Maximum number of simultaneous data lines.",
  },
  {
    name: "baseSpeed",
    type: "number",
    default: "2",
    description: "Flow speed multiplier.",
  },
  {
    name: "lineLength",
    type: "number",
    default: "150",
    description:
      "Visual length of each data line in pixels. Stays constant regardless of baseSpeed.",
  },
  {
    name: "spawnProbability",
    type: "number",
    default: "0.1",
    description: "Chance per frame to spawn a new line.",
  },
  {
    name: "overlay",
    type: "boolean",
    default: "false",
    description: "Whether to overlay the grid on top of existing content.",
  },
];

export default props;
