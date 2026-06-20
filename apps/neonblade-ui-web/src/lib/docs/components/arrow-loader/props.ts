import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description: "Neon accent color for the arrows.",
  },
  {
    name: "height",
    type: "number",
    default: "8",
    description: "Bar height in pixels.",
  },
  {
    name: "arrowSize",
    type: "number",
    default: "10",
    description: "Pixel width of each individual › arrow shape.",
  },
  {
    name: "gap",
    type: "number",
    default: "8",
    description: "Pixel gap between arrows.",
  },
  {
    name: "thickness",
    type: "number",
    default: "2.5",
    description: "SVG stroke width — controls arrow line thickness.",
  },
  {
    name: "speed",
    type: "number",
    default: "450",
    description: "Animation cycle duration in ms. Lower = faster.",
  },
  {
    name: "trackColor",
    type: "string",
    default: '"rgba(255,255,255,0.06)"',
    description:
      "Background color of the track strip behind the arrows. Accepts any valid CSS color.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional className on the wrapper element.",
  },
];

export default props;
