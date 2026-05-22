import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "children",
    type: "string",
    description:
      "The text string to render as outlined letters. Each character is wrapped individually to support per-letter proximity activation.",
  },
  {
    name: "strokeColor",
    type: '"cyan" | "pink" | "green" | "purple" | "orange" | "yellow" | string',
    default: '"cyan"',
    description:
      "Color of the letter outline/stroke in the default (non-hovered) state. Accepts preset names or any valid CSS color string — hex, rgb, hsl, etc.",
  },
  {
    name: "fillColor",
    type: "string",
    default: '"transparent"',
    description:
      'Fill color of the inner part of the letters. Use "transparent" for a pure outline-only look, or any CSS color string for a solid or semi-transparent fill.',
  },
  {
    name: "strokeWidth",
    type: "number",
    default: "1",
    description: "Thickness of the letter outline stroke in pixels.",
  },
  {
    name: "fontSize",
    type: "string | number",
    default: '"3rem"',
    description:
      'Font size of the text. Accepts any valid CSS length value ("2rem", "48px", "clamp(2rem, 5vw, 5rem)") or a number treated as px.',
  },
  {
    name: "hoverStrokeColor",
    type: '"cyan" | "pink" | "green" | "purple" | "orange" | "yellow" | string',
    description:
      "Stroke color in the hover / proximity-activated state. Defaults to strokeColor when not provided.",
  },
  {
    name: "hoverFillColor",
    type: "string",
    description:
      "Fill color of the inner part of the letters in the hover / proximity-activated state. Defaults to fillColor.",
  },
  {
    name: "hoverGlowIntensity",
    type: '"none" | "subtle" | "normal" | "strong" | "intense"',
    default: '"normal"',
    description:
      "Intensity of the neon text-shadow glow applied to each letter when it is hover / proximity-activated.",
  },
  {
    name: "hoverGlowColor",
    type: '"cyan" | "pink" | "green" | "purple" | "orange" | "yellow" | string',
    description:
      "Color of the glow effect on hover / proximity activation. Defaults to hoverStrokeColor, which in turn defaults to strokeColor.",
  },
  {
    name: "proximityRadius",
    type: "number",
    default: "100",
    description:
      "Radius in pixels within which a letter transitions to its hover state individually as the cursor draws near. Increase for a wider activation zone.",
  },
  {
    name: "proximityEffect",
    type: "boolean",
    default: "true",
    description:
      "Enable the per-letter proximity effect driven by cursor distance. When false, hovering anywhere over the text activates all letters at once (whole-text hover).",
  },
  {
    name: "transitionDuration",
    type: "number",
    default: "200",
    description:
      "Duration in milliseconds for the stroke color, fill color, and glow transitions on each letter.",
  },
  {
    name: "className",
    type: "string",
    description:
      "Additional Tailwind or custom CSS classes applied to the outer wrapper. Use this for font weight, font family, letter spacing, line height, etc.",
  },
];

export default props;
