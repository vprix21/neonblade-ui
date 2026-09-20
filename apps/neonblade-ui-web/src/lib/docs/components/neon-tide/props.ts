import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "colorA",
    type: "string",
    default: '"#00f3ff"',
    description: "Primary wave colour (hex).",
  },
  {
    name: "colorB",
    type: "string",
    default: "undefined",
    description:
      "Secondary wave colour used to gradient crests vs. troughs. Omit for a single-colour look (defaults to colorA).",
  },
  {
    name: "bgColor",
    type: "string",
    default: '"#020408"',
    description: "Renderer background colour and fog colour (hex).",
  },
  {
    name: "origin",
    type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
    default: '"top-right"',
    description:
      "Corner the waves flow from. They always travel toward the opposite corner (e.g. top-right → bottom-left), receding in 3D depth rather than a flat 2D diagonal.",
  },
  {
    name: "speed",
    type: "number",
    default: "0.5",
    description: "Animation speed multiplier for the wave flow.",
  },
  {
    name: "amplitude",
    type: "number",
    default: "1.2",
    description: "Wave height in world units.",
  },
  {
    name: "frequency",
    type: "number",
    default: "0.55",
    description:
      "Spatial frequency/density of the waves. Higher = more ripples.",
  },
  {
    name: "glow",
    type: "number",
    default: "0.9",
    description: "Fresnel rim-light glow intensity along wave edges.",
  },
  {
    name: "gloss",
    type: "number",
    default: "0.6",
    description: "Specular highlight intensity on wave crests.",
  },
  {
    name: "planeWidth",
    type: "number",
    default: "34",
    description: "Surface width along the X axis in world units.",
  },
  {
    name: "planeDepth",
    type: "number",
    default: "34",
    description:
      "Surface depth along the Z axis in world units — how far the waves recede into the screen.",
  },
  {
    name: "cameraHeight",
    type: "number",
    default: "11",
    description: "Camera Y position above the surface origin.",
  },
  {
    name: "cameraTilt",
    type: "number",
    default: "1.6",
    description:
      "Camera distance multiplier relative to cameraHeight. Higher values flatten the angle for a more cinematic, distant look.",
  },
  {
    name: "gridSegments",
    type: "number",
    default: "120",
    description:
      "Subdivisions per axis of the wave surface (higher = smoother, more GPU cost).",
  },
  {
    name: "fog",
    type: "boolean",
    default: "true",
    description: "Exponential fog that fades the surface edges into bgColor.",
  },
  {
    name: "opacity",
    type: "number",
    default: "100",
    description: "Overall scene opacity (0–100).",
  },
  {
    name: "hoverEffect",
    type: "boolean",
    default: "true",
    description:
      "Enables a cursor-reactive ripple and highlight on the wave surface.",
  },
  {
    name: "hoverRadius",
    type: "number",
    default: "4",
    description: "Radius of the cursor ripple in world units.",
  },
  {
    name: "hoverStrength",
    type: "number",
    default: "1.4",
    description: "Peak height added by the cursor ripple.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Extra class names applied to the wrapper div.",
  },
];

export default props;
