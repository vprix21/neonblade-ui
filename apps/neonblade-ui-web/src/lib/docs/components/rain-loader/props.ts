import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | "white" | "orange" | string',
    default: '"cyan"',
    description:
      'Bar accent color. Use a preset name for a NeonBlade color or any valid CSS color value (e.g. "#ff4400").',
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | number',
    default: '"md"',
    description:
      "Height of each bar in pixels, or a size preset. xs=24, sm=36, md=52, lg=72, xl=96. Pass a number for exact pixel control.",
  },
  {
    name: "duration",
    type: "number",
    default: "1600",
    description:
      "Full animation cycle duration in milliseconds. Lower values = faster rain, higher values = slower and more relaxed.",
  },
  {
    name: "barCount",
    type: "number",
    default: "4",
    description: "Number of bars (clamped to 2–8). Stagger delay adjusts automatically.",
  },
  {
    name: "barWidthRatio",
    type: "number",
    default: "0.115",
    description:
      "Bar width as a fraction of the bar height (e.g. 0.1 = 10% of height). Controls how thick or thin the bars appear.",
  },
  {
    name: "gap",
    type: "number",
    default: "auto",
    description:
      "Pixel gap between bars. Defaults to ~70% of bar width if not specified.",
  },
  {
    name: "borderRadius",
    type: "number",
    default: "auto",
    description:
      "Corner radius of each bar in pixels. Defaults to ~35% of bar width for a slightly rounded look.",
  },
  {
    name: "glowIntensity",
    type: '"none" | "low" | "medium" | "high"',
    default: '"medium"',
    description: "Neon drop-shadow glow around the bars. Set to none to disable.",
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Extra class names applied to the outer wrapper div.",
  },
];

export default props;
