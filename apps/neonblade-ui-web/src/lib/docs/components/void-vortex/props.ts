import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "primaryColor",
    type: "string",
    default: '"#00ffff"',
    description: "Outer ring particle colour (hex).",
  },
  {
    name: "coreColor",
    type: "string",
    default: '"#ffffff"',
    description: "Inner accretion core colour (hex).",
  },
  {
    name: "bgColor",
    type: "string",
    default: '"#000000"',
    description: "Renderer background colour (hex).",
  },
  {
    name: "particleCount",
    type: "number",
    default: "4000",
    description: "Total number of particles (clamped 500–10000).",
  },
  {
    name: "rotationSpeed",
    type: "number",
    default: "1",
    description: "Orbital rotation speed multiplier.",
  },
  {
    name: "accretionRate",
    type: "number",
    default: "1",
    description: "Inward spiral (accretion) speed multiplier.",
  },
  {
    name: "diskRadius",
    type: "number",
    default: "13",
    description: "Outer radius of the accretion disk in world units.",
  },
  {
    name: "diskDepth",
    type: "number",
    default: "0.35",
    description: "Vertical thickness of the disk — 0 is perfectly flat.",
  },
  {
    name: "diskY",
    type: "number",
    default: "0",
    description: "Y-axis offset of the entire disk in the scene.",
  },
  {
    name: "hoverGravity",
    type: "boolean",
    default: "true",
    description:
      "Mouse hover creates a gravitational well that pulls nearby particles.",
  },
  {
    name: "hoverIntensity",
    type: "number",
    default: "1",
    description: "Strength of the hover gravity well (0 = off, 3 = strong).",
  },
  {
    name: "showCore",
    type: "boolean",
    default: "true",
    description: "Show the glowing orb sprite at the singularity centre.",
  },
  {
    name: "fog",
    type: "boolean",
    default: "false",
    description: "Exponential fog that fades the scene into bgColor.",
  },
  {
    name: "opacity",
    type: "number",
    default: "100",
    description: "Overall scene opacity (0–100).",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Extra class names applied to the wrapper div.",
  },
];

export default props;
