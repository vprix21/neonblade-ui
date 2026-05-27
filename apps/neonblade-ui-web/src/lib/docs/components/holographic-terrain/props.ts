import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "lineColor",
    type: "string",
    default: '"#00ffff"',
    description: "Wireframe line colour (hex).",
  },
  {
    name: "bgColor",
    type: "string",
    default: '"#020a0a"',
    description: "Renderer background colour and fog colour (hex).",
  },
  {
    name: "waveAmplitude",
    type: "number",
    default: "0.8",
    description: "Peak height of animated sine waves in world units.",
  },
  {
    name: "waveFrequency",
    type: "number",
    default: "1.5",
    description: "Spatial frequency of the terrain waves. Higher = more peaks.",
  },
  {
    name: "waveSpeed",
    type: "number",
    default: "1",
    description: "Animation speed multiplier.",
  },
  {
    name: "bumpRadius",
    type: "number",
    default: "3.5",
    description: "Radius of the cursor interaction bump in world units.",
  },
  {
    name: "bumpStrength",
    type: "number",
    default: "2.5",
    description: "Peak height of the Gaussian bump raised by cursor hover.",
  },
  {
    name: "planeWidth",
    type: "number",
    default: "24",
    description: "Terrain width along the X axis in world units.",
  },
  {
    name: "planeDepth",
    type: "number",
    default: "24",
    description: "Terrain depth/length along the Z axis in world units.",
  },
  {
    name: "cameraHeight",
    type: "number",
    default: "10",
    description:
      "Camera Y position above the terrain origin. Camera Z is auto-derived (height × 1.4) to maintain a ~35° viewing angle.",
  },
  {
    name: "gridSegments",
    type: "number",
    default: "60",
    description:
      "Subdivisions per axis of the terrain plane (higher = more detail, more GPU cost).",
  },
  {
    name: "fog",
    type: "boolean",
    default: "true",
    description: "Exponential fog that fades terrain edges into bgColor.",
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
