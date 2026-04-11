import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "children",
    type: "ReactNode",
    description: "Button label content.",
  },
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description:
      'Accent color — use a preset name or any valid CSS color (e.g. "#ff4400").',
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Controls padding and font size.",
  },
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost"',
    default: '"solid"',
    description:
      "Visual style. solid fills with the accent color (matches the Hero button), outline adds a border, ghost is subtly tinted.",
  },
  {
    name: "corner",
    type: '"bottom-right" | "bottom-left" | "top-right" | "top-left" | "all"',
    default: '"bottom-right"',
    description: "Which corner(s) receive the diagonal cut.",
  },
  {
    name: "cornerSize",
    type: "number",
    default: "20",
    description: "Depth of the corner diagonal cut in pixels.",
  },
  {
    name: "hoverEffect",
    type: '"glow" | "shift" | "shine" | "pulse" | "scan" | "flicker" | "none"',
    default: '"glow"',
    description: "Hover animation preset applied to the button.",
  },
  {
    name: "glowIntensity",
    type: '"low" | "medium" | "high"',
    default: '"medium"',
    description: "Spread radius of neon glow effects.",
  },
  {
    name: "showArrow",
    type: "boolean",
    default: "false",
    description: "Appends a → arrow that slides right on hover.",
  },
];

export default props;
