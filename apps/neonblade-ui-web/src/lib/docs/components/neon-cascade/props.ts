import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "color",
    type: "string",
    default: '"#00f3ff"',
    description: "Primary line colour (hex, rgb or hsl).",
  },
  {
    name: "tipColor",
    type: "string",
    default: "undefined",
    description:
      "Colour the lines blend into as they bend toward the camera. Omit for a single-colour look (defaults to color).",
  },
  {
    name: "bgColor",
    type: "string",
    default: '"#050505"',
    description: "Scene background colour (hex, rgb or hsl).",
  },
  {
    name: "lineCount",
    type: "number",
    default: "64",
    description: "Number of vertical lines (1–220).",
  },
  {
    name: "lineWidth",
    type: "number",
    default: "0.09",
    description: "Ribbon width of each line in world units.",
  },
  {
    name: "span",
    type: "number",
    default: "30",
    description: "Horizontal spread of the line field in world units.",
  },
  {
    name: "lineHeight",
    type: "number",
    default: "20",
    description: "Length of the straight vertical fall in world units.",
  },
  {
    name: "curveHeight",
    type: "number",
    default: "0.5",
    description:
      "Fraction of the fall (0–1) where the forward bend begins. Higher values keep the lines straight for longer.",
  },
  {
    name: "curveAmount",
    type: "number",
    default: "5",
    description:
      "Bend radius and forward depth in world units — how far the line tips reach toward the camera.",
  },
  {
    name: "curvePower",
    type: "number",
    default: "1",
    description:
      "Bend easing. 1 is a circular quarter-arc; higher values make the bend start later and sharper.",
  },
  {
    name: "sway",
    type: "number",
    default: "0.25",
    description: "Lateral sine sway amplitude in world units.",
  },
  {
    name: "swayFrequency",
    type: "number",
    default: "0.6",
    description: "Number of sway cycles along each line.",
  },
  {
    name: "swaySpeed",
    type: "number",
    default: "0.35",
    description: "Speed of the sway animation.",
  },
  {
    name: "flow",
    type: "boolean",
    default: "true",
    description:
      "Animates bright pulses travelling down each line. Disable for static blades.",
  },
  {
    name: "flowSpeed",
    type: "number",
    default: "0.4",
    description: "Travel speed of the flowing pulses.",
  },
  {
    name: "flowLength",
    type: "number",
    default: "0.35",
    description: "Pulse length as a fraction of one flow cycle (0–1).",
  },
  {
    name: "flowDensity",
    type: "number",
    default: "1.2",
    description: "Number of pulses per line.",
  },
  {
    name: "glow",
    type: "number",
    default: "1.6",
    description: "Halo / glow intensity around each line.",
  },
  {
    name: "opacity",
    type: "number",
    default: "100",
    description: "Overall scene opacity (0–100).",
  },
  {
    name: "cameraDistance",
    type: "number",
    default: "16",
    description: "Camera distance from the scene in world units.",
  },
  {
    name: "cameraFov",
    type: "number",
    default: "50",
    description: "Camera field of view in degrees (20–110).",
  },
  {
    name: "parallax",
    type: "boolean",
    default: "true",
    description: "Subtle pointer-driven camera parallax.",
  },
  {
    name: "parallaxStrength",
    type: "number",
    default: "1",
    description: "Parallax travel in world units.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Extra class names applied to the wrapper div.",
  },
];

export default props;
