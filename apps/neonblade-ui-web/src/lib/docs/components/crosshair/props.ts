import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description:
      'Ring and crosshair accent color. Use a preset name or any CSS color value (e.g. "#ff4400").',
  },
  {
    name: "outerSize",
    type: "number",
    default: "44",
    description: "Outer ring diameter in pixels.",
  },
  {
    name: "innerSize",
    type: "number",
    default: "26",
    description: "Inner ring diameter in pixels.",
  },
  {
    name: "outerThickness",
    type: "number",
    default: "2",
    description: "Outer ring stroke thickness in pixels.",
  },
  {
    name: "innerThickness",
    type: "number",
    default: "1.5",
    description: "Inner ring stroke thickness in pixels.",
  },
  {
    name: "arcGap",
    type: "number",
    default: "0.3",
    description:
      "Fraction of each ring that is invisible (the gap). 0 = full circle, 0.3 = 70% arc, 0.5 = semicircle.",
  },
  {
    name: "outerSpeed",
    type: "number",
    default: "3",
    description:
      "Outer ring rotation period in seconds per full revolution. Smaller = faster.",
  },
  {
    name: "innerSpeed",
    type: "number",
    default: "2",
    description:
      "Inner ring rotation period in seconds per full revolution. Smaller = faster.",
  },
  {
    name: "crosshairSize",
    type: "number",
    default: "7",
    description: "Length of each crosshair arm in pixels.",
  },
  {
    name: "crosshairGap",
    type: "number",
    default: "3",
    description:
      "Gap between the crosshair center and the start of each arm in pixels.",
  },
  {
    name: "crosshairThickness",
    type: "number",
    default: "1",
    description: "Crosshair line stroke thickness in pixels.",
  },
  {
    name: "glowIntensity",
    type: '"none" | "low" | "medium" | "high"',
    default: '"medium"',
    description:
      "Neon glow intensity (drop-shadow) around the rings and crosshair.",
  },
  {
    name: "hideNativeCursor",
    type: "boolean",
    default: "true",
    description:
      "When true, hides the native OS cursor while the component is mounted (sets body cursor: none).",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Completely disables the custom cursor and renders nothing.",
  },
];

export default props;
