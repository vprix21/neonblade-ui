import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "children",
    type: "ReactNode",
    description:
      "Free-form slot rendered below the optional title/description.",
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
    name: "beamColor",
    type: '"cyan" | "pink" | "green" | string',
    default: '"pink"',
    description: "Primary beam color. Preset name or any CSS color.",
  },
  {
    name: "beamColorB",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description:
      'Secondary beam color used in "dual" and "gradient-sweep" variants.',
  },
  {
    name: "variant",
    type: '"single" | "dual" | "gradient-sweep" | "rainbow" | "pulse"',
    default: '"single"',
    description:
      'Beam animation style. "dual" spins two beams in opposite directions; "gradient-sweep" blends colorA→colorB; "rainbow" cycles all neon hues; "pulse" breathes in opacity.',
  },
  {
    name: "duration",
    type: "number",
    default: "4",
    description: "Primary beam rotation speed in seconds.",
  },
  {
    name: "durationB",
    type: "number",
    default: "6",
    description:
      "Secondary beam rotation speed in seconds (dual variant only).",
  },
  {
    name: "borderWidth",
    type: "number | string",
    default: '"2px"',
    description:
      "Visible beam border width — becomes the padding between outer and inner card.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Controls inner padding, icon box size and font sizes.",
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
    name: "glowIntensity",
    type: '"none" | "low" | "medium" | "high"',
    default: '"medium"',
    description: "Ambient neon glow spread on the inner card surface.",
  },
  {
    name: "bgColor",
    type: "string",
    description:
      "Override the inner card background color (default: var(--background)).",
  },
  {
    name: "innerClassName",
    type: "string",
    default: '""',
    description: "Extra className applied to the inner content div.",
  },
];

export default props;
