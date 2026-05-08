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
    name: "notchSides",
    type: '("top" | "bottom" | "left" | "right")[]',
    default: '["top", "bottom"]',
    description:
      "Sides that receive notch indentations. At least one side must be provided.",
  },
  {
    name: "notchSize",
    type: "number",
    default: "12",
    description: "Depth of each notch indentation in pixels.",
  },
  {
    name: "notchWidth",
    type: "number",
    default: "50",
    description:
      "Width of the flat notch floor on top & bottom edges in pixels.",
  },
  {
    name: "notchWidthV",
    type: "number",
    default: "notchWidth",
    description:
      "Width of the flat notch floor on left & right edges in pixels. Falls back to notchWidth when omitted.",
  },
  {
    name: "notchSkew",
    type: "number",
    default: "12",
    description:
      "Horizontal run of the angled entry/exit walls in pixels. Larger = shallower / more gradual angle.",
  },
  {
    name: "borderWidth",
    type: "number | string",
    default: '"2px"',
    description:
      "Border thickness — becomes the padding between outer and inner card.",
  },
  {
    name: "borderColor",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description: "Primary border color. Preset name or any CSS color.",
  },
  {
    name: "borderColorB",
    type: '"cyan" | "pink" | "green" | string',
    default: '"pink"',
    description: "Secondary border color used when borderGradient is true.",
  },
  {
    name: "borderGradient",
    type: "boolean",
    default: "false",
    description:
      "Use a linear gradient as the static border instead of a solid color.",
  },
  {
    name: "beamVariant",
    type: '"none" | "single" | "dual" | "gradient-sweep" | "rainbow" | "pulse"',
    default: '"none"',
    description:
      'Animated beam on the border. "none" uses a static border color.',
  },
  {
    name: "beamColor",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description: "Primary beam color.",
  },
  {
    name: "beamColorB",
    type: '"cyan" | "pink" | "green" | string',
    default: '"pink"',
    description:
      'Secondary beam color — used in "dual" and "gradient-sweep" variants.',
  },
  {
    name: "beamDuration",
    type: "number",
    default: "4",
    description: "Primary beam rotation speed in seconds.",
  },
  {
    name: "beamDurationB",
    type: "number",
    default: "6",
    description:
      "Secondary beam rotation speed in seconds (dual variant only).",
  },
  {
    name: "cardColor",
    type: "string",
    description:
      "Override the inner card background color (default: var(--background)).",
  },
  {
    name: "textColor",
    type: "string",
    description: "Text color applied to the inner content wrapper.",
  },
  {
    name: "accentColor",
    type: '"cyan" | "pink" | "green" | string',
    description:
      "Accent color for glow and hover highlights. Defaults to borderColor.",
  },
  {
    name: "glowIntensity",
    type: '"none" | "low" | "medium" | "high"',
    default: '"medium"',
    description: "Ambient neon glow spread on the inner card surface.",
  },
  {
    name: "hoverEffect",
    type: '"glow" | "scan" | "pulse" | "lift" | "none"',
    default: '"glow"',
    description:
      'Hover animation style. "scan" sweeps a light stripe; "lift" raises the card; "pulse" pulses the glow.',
  },
  {
    name: "align",
    type: '"start" | "center"',
    default: '"start"',
    description:
      "Horizontal alignment of card content (icon, title, description, children).",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Controls inner padding and font sizes.",
  },
  {
    name: "innerClassName",
    type: "string",
    default: '""',
    description: "Extra className applied to the inner content div.",
  },
];

export default props;
