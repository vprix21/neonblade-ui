import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "dropColor",
    type: "string",
    default: '"rgba(174,214,241,0.85)"',
    description:
      "Color of the falling rain streaks. Accepts any valid CSS color string — hex, rgb, rgba, hsl.",
  },
  {
    name: "dropCount",
    type: "number",
    default: "150",
    description:
      "Number of simultaneous falling rain streaks. Higher values produce heavier rainfall.",
  },
  {
    name: "speed",
    type: "number",
    default: "12",
    description:
      "Fall speed in pixels per frame. Each drop has ±25% speed variation for a natural look.",
  },
  {
    name: "angle",
    type: "number",
    default: "-15",
    description:
      "Angle of rainfall in degrees from vertical. Negative values lean left (wind from right); positive values lean right. Clamped to ±60°.",
  },
  {
    name: "dropMinLength",
    type: "number",
    default: "15",
    description: "Minimum length of a falling rain streak in pixels.",
  },
  {
    name: "dropMaxLength",
    type: "number",
    default: "40",
    description: "Maximum length of a falling rain streak in pixels.",
  },
  {
    name: "dropWidth",
    type: "number",
    default: "1",
    description:
      "Stroke width of each falling rain streak in pixels. Each drop has slight width variation.",
  },
  {
    name: "opacity",
    type: "number",
    default: "0.75",
    description: "Global opacity of the entire rain canvas layer (0–1).",
  },
  {
    name: "backgroundColor",
    type: "string",
    default: '"#0a0a0f"',
    description:
      "Background fill color of the component. The canvas redraws this every frame as the base layer beneath the rain.",
  },
];

export default props;
