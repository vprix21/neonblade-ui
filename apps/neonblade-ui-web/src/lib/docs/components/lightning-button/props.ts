import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "children",
    type: "ReactNode",
    description: "Button label content.",
  },
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description:
      'Accent color — use a preset name or any valid CSS color (e.g. "#ff4400").',
  },
  {
    name: "lightningColor",
    type: '"cyan" | "pink" | "green" | string',
    default: "—",
    description: "Color of the lightning bolts. Falls back to `color`.",
  },
  {
    name: "coreColor",
    type: "string",
    default: '"#ffffff"',
    description: "Color of the bright inner core of each bolt.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Controls padding and font size.",
  },
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost"',
    default: '"solid"',
    description: "Visual style of the button.",
  },
  {
    name: "cut",
    type: "boolean",
    default: "true",
    description: "Applies a diagonal bottom-right corner cut.",
  },
  {
    name: "cornerSize",
    type: "number",
    default: "16",
    description:
      "Depth of the corner cut in pixels (ignored when `cut` is false).",
  },
  {
    name: "radius",
    type: "number",
    default: "150",
    description:
      "Distance in pixels from the button edge within which the cursor triggers the lightning tendrils.",
  },
  {
    name: "boltCount",
    type: "number",
    default: "5",
    description:
      "Number of lightning tendrils connecting the button border to the cursor.",
  },
  {
    name: "segments",
    type: "number",
    default: "7",
    description:
      "Number of segments per bolt — higher values produce a more jagged path.",
  },
  {
    name: "jitter",
    type: "number",
    default: "16",
    description:
      "Maximum perpendicular displacement of each bolt segment, in pixels.",
  },
  {
    name: "thickness",
    type: "number",
    default: "1.4",
    description: "Stroke width of each bolt's bright core, in pixels.",
  },
  {
    name: "glowIntensity",
    type: '"low" | "medium" | "high"',
    default: '"medium"',
    description: "Spread radius of the bolt glow.",
  },
  {
    name: "flickerSpeed",
    type: "number",
    default: "60",
    description:
      "Milliseconds between bolt-shape regenerations — lower values crackle faster.",
  },
  {
    name: "idleGlow",
    type: "boolean",
    default: "true",
    description: "Keeps a subtle ambient glow on the button border at rest.",
  },
  {
    name: "pressEffect",
    type: '"ripple" | "shine" | "mechanical" | "destroy" | "none"',
    default: '"ripple"',
    description:
      "Animation played when the button is pressed/clicked: ripple (expanding ring), shine (one-shot diagonal sweep), mechanical (physical squash + darken), destroy (cracks spread across the button, then it blasts into glowing shards and reforms), or none.",
  },
];

export default props;
