import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description:
      'Stroke color of the fox face. Use a preset name or any CSS color value (e.g. "#ff4400").',
  },
  {
    name: "size",
    type: "number",
    default: "64",
    description: "Overall pixel size of the fox face SVG (width and height).",
  },
  {
    name: "strokeWidth",
    type: "number",
    default: "2",
    description: "Stroke thickness of the fox face lines in SVG units.",
  },
  {
    name: "glowIntensity",
    type: '"none" | "low" | "medium" | "high"',
    default: '"medium"',
    description: "Neon drop-shadow glow intensity around the fox face.",
  },
  {
    name: "fillOpacity",
    type: "number",
    default: "0",
    description:
      "Opacity of the translucent fill inside the face and nose shapes (0 = outline only, 1 = full fill).",
  },
  {
    name: "hideNativeCursor",
    type: "boolean",
    default: "true",
    description:
      "When true, hides the native OS cursor while the component is mounted.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Completely disables the custom cursor and renders nothing.",
  },
  {
    name: "containerRef",
    type: "React.RefObject<HTMLElement | null>",
    default: "undefined",
    description:
      "When provided, scopes the cursor to that element (absolute positioning, hides on mouse leave). The container must have position: relative and overflow: hidden.",
  },
];

export default props;
