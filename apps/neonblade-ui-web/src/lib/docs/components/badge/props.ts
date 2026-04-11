import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "children",
    type: "ReactNode",
    description: "Badge label — text or any inline React node.",
  },
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description: "Accent color. Use a preset name or any CSS color value.",
  },
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost"',
    default: '"outline"',
    description:
      '"solid" fills with accent color, "outline" shows a border with transparent background, "ghost" uses a subtle tinted background.',
  },
  {
    name: "shape",
    type: '"pill" | "rectangle" | "corner-cut"',
    default: '"pill"',
    description:
      '"pill" is a fully rounded capsule, "rectangle" has sharp corners, "corner-cut" applies a diagonal polygon cut.',
  },
  {
    name: "corner",
    type: '"bottom-right" | "bottom-left" | "top-right" | "top-left" | "all"',
    default: '"bottom-right"',
    description: "Which corner is cut. Only applies when shape is corner-cut.",
  },
  {
    name: "cornerSize",
    type: "number",
    default: "8",
    description:
      "Depth of the diagonal corner cut in pixels. Only applies when shape is corner-cut.",
  },
  {
    name: "dot",
    type: '"none" | "solid" | "pulse" | "flicker"',
    default: '"none"',
    description:
      'Indicator dot shown before the label. "solid" is static, "pulse" breathes in/out, "flicker" neon-flickers.',
  },
  {
    name: "glow",
    type: "boolean",
    default: "false",
    description:
      "Adds a neon box-shadow and text-shadow glow using the badge color.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md"',
    default: '"sm"',
    description: "Controls badge padding and font size.",
  },
];

export default props;
