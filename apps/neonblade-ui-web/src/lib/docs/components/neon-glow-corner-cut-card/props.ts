import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "children",
    type: "ReactNode",
    description:
      "Free-form slot rendered below title/description. Use alone for a fully custom card body.",
  },
  {
    name: "icon",
    type: "ReactNode",
    description:
      "Element rendered inside the top icon box (e.g. a Lucide icon).",
  },
  { name: "title", type: "string", description: "Card heading text." },
  {
    name: "description",
    type: "string",
    description: "Body copy rendered below the title.",
  },
  {
    name: "colorA",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description:
      "Gradient start color and icon/title glow color. Accept preset names or any CSS color.",
  },
  {
    name: "colorB",
    type: '"cyan" | "pink" | "green" | string',
    default: '"pink"',
    description:
      'Gradient end color used in "gradient" and "trace" hover effects.',
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Controls inner card padding, icon box, and font sizes.",
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
    description: "Depth of the diagonal corner cut in pixels.",
  },
  {
    name: "hoverEffect",
    type: '"gradient" | "solid" | "glow-only" | "pulse" | "trace" | "none"',
    default: '"gradient"',
    description:
      'Hover glow style. "gradient" matches the Features.tsx card exactly.',
  },
  {
    name: "glowIntensity",
    type: '"low" | "medium" | "high"',
    default: '"medium"',
    description: "Spread radius of the neon glow effects.",
  },
  {
    name: "bgColor",
    type: "string",
    description: "Override the inner card background color (default: #0a0a0a).",
  },
];

export default props;
