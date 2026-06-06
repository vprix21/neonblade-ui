import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "open",
    type: "boolean",
    description: "Controls whether the modal is visible.",
  },
  {
    name: "onClose",
    type: "() => void",
    description:
      "Called when the user requests a close via backdrop click, Escape key, or the close button.",
  },
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | "orange" | string',
    default: '"cyan"',
    description:
      'Accent color driving the border glow, header label, close button, and scrollbar. Use a preset name or any valid CSS color (e.g. "#a855f7").',
  },
  {
    name: "bgColor",
    type: "string",
    default: '"#080b0d"',
    description:
      "Background color of the modal inner surface. Accepts any valid CSS color string.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | "full"',
    default: '"md"',
    description:
      "Max-width preset for the dialog panel. xs=380px, sm=480px, md=560px, lg=680px, xl=820px, full=viewport width.",
  },
  {
    name: "corner",
    type: '"bottom-right" | "bottom-left" | "top-right" | "top-left" | "all" | "none"',
    default: '"bottom-right"',
    description:
      "Which corner(s) of the dialog panel receive the diagonal clip-path cut.",
  },
  {
    name: "cornerSize",
    type: "number",
    default: "24",
    description: "Depth of the corner cut in pixels.",
  },
  {
    name: "animation",
    type: '"slide" | "scale" | "none"',
    default: '"slide"',
    description:
      "Entry and exit animation for the dialog panel. slide moves from below; scale zooms from center.",
  },
  {
    name: "glowIntensity",
    type: '"none" | "low" | "medium" | "high"',
    default: '"medium"',
    description:
      "Intensity of the neon drop-shadow radiating from the dialog edges.",
  },
  {
    name: "backdropBlur",
    type: "boolean",
    default: "true",
    description: "When true, a blur filter is applied to the backdrop.",
  },
  {
    name: "backdropOverlay",
    type: "boolean",
    default: "true",
    description:
      "When true, a dark translucent overlay sits behind the dialog.",
  },
  {
    name: "closeOnBackdrop",
    type: "boolean",
    default: "true",
    description: "When true, clicking the backdrop calls onClose.",
  },
  {
    name: "closeOnEscape",
    type: "boolean",
    default: "true",
    description: "When true, pressing the Escape key calls onClose.",
  },
  {
    name: "showCloseButton",
    type: "boolean",
    default: "true",
    description:
      "When true, an × close button is rendered in the header (only when a header is provided).",
  },
  {
    name: "dividers",
    type: "boolean",
    default: "true",
    description:
      "When true, shows a border line between header/body and body/footer. Set to false for a plain, borderless interior.",
  },
  {
    name: "borderBeam",
    type: "boolean",
    default: "false",
    description:
      "When true, a comet-style beam animates around the modal border, traveling along the full clip-path shape.",
  },
  {
    name: "beamSpeed",
    type: "number",
    default: "3",
    description:
      "Revolution speed of the border beam in seconds. Lower values are faster. Only applies when borderBeam is true.",
  },
  {
    name: "beamLength",
    type: "number",
    default: "60",
    description:
      "Arc length of the comet tail in degrees (0–360). Larger values produce a longer glowing trail. Only applies when borderBeam is true.",
  },
  {
    name: "scrollableBody",
    type: "boolean",
    default: "false",
    description:
      "When true, the body area scrolls independently (max-height: 55vh) with a styled accent scrollbar.",
  },
  {
    name: "header",
    type: "{ title: ReactNode; label?: string }",
    default: "—",
    description:
      "Optional header config. title is the main heading; label is a small accent-colored category text rendered above the title. Omit for a header-less modal.",
  },
  {
    name: "footer",
    type: '{ children: ReactNode; align?: "left" | "center" | "right" | "between" }',
    default: "—",
    description:
      "Optional footer config. children holds action buttons; align controls their horizontal placement. Omit for a footer-less modal.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "Content rendered inside the modal body.",
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Additional class names applied to the dialog panel wrapper.",
  },
  {
    name: "ariaLabel",
    type: "string",
    default: "—",
    description:
      "Accessible label for the dialog (aria-label). Use when no header title is present.",
  },
];

export default props;
