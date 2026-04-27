import type { PropDefinition } from "../../types";

const hexagonsProps: PropDefinition[] = [
  {
    name: "hexColor",
    type: "string",
    description: "Fill color of each hexagon cell.",
    default: '"transparent"',
  },
  {
    name: "hexBorderColor",
    type: "string",
    description: "Stroke color for hexagon borders.",
    default: '"rgba(0,243,255,0.25)"',
  },
  {
    name: "hexSize",
    type: "number",
    description: "Circumradius of each hexagon in pixels.",
    default: "40",
  },
  {
    name: "borderWidth",
    type: "number",
    description: "Stroke width of hexagon borders in pixels.",
    default: "1",
  },
  {
    name: "hoverEffect",
    type: "boolean",
    description: "Enable hover effects. Controls both fill and border hover reactivity.",
    default: "true",
  },
  {
    name: "hoverColor",
    type: "string",
    description: "Fill color applied to the hovered hexagon. Set same as hexColor to disable fill change.",
    default: '"rgba(0,243,255,0.15)"',
  },
  {
    name: "hoverBorderColor",
    type: "string",
    description: 'Border stroke color on the hovered hexagon. Set to "" to keep border unchanged on hover.',
    default: '"#00f3ff"',
  },
  {
    name: "borderGlowEffect",
    type: "boolean",
    description: "Enable a neon shadow glow rendered around every hex border. Color can differ from hexBorderColor.",
    default: "false",
  },
  {
    name: "borderGlowColor",
    type: "string",
    description: "Shadow/glow color for hex borders. Independent of the border stroke color.",
    default: '"#00f3ff"',
  },
  {
    name: "borderGlowRadius",
    type: "number",
    description: "Blur radius (px) of the neon border glow.",
    default: "10",
  },
  {
    name: "beamEffect",
    type: "boolean",
    description: "Enable animated beams that travel along hex edges from top to bottom.",
    default: "false",
  },
  {
    name: "beamColor",
    type: "string",
    description: "Color of the beam gradient body.",
    default: '"#00f3ff"',
  },
  {
    name: "beamGlowColor",
    type: "string",
    description: "Shadow glow color of the bright beam head.",
    default: '"#00f3ff"',
  },
  {
    name: "maxBeams",
    type: "number",
    description: "Maximum number of concurrent beams on screen.",
    default: "20",
  },
  {
    name: "beamSpeed",
    type: "number",
    description: "Base travel speed of beams in px per frame.",
    default: "2",
  },
  {
    name: "beamLength",
    type: "number",
    description: "Tail length of each beam in pixels.",
    default: "80",
  },
  {
    name: "beamSpawnProbability",
    type: "number",
    description: "Probability per frame of spawning a new beam (0–1).",
    default: "0.08",
  },
  {
    name: "overlay",
    type: "boolean",
    description: "Add a radial-gradient dark vignette overlay on top of the grid.",
    default: "false",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS class names for the root container.",
    default: '""',
  },
];

export default hexagonsProps;
