import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description: "Primary corner accent color. Preset name or any CSS color.",
  },
  {
    name: "colorB",
    type: '"cyan" | "pink" | "green" | string',
    description:
      "Secondary accent color for the opposite-diagonal bracket pair. Defaults to the primary color.",
  },
  {
    name: "mode",
    type: '"duo" | "quad"',
    default: '"duo"',
    description:
      '"duo" renders top-left + bottom-right corners. "quad" renders all four.',
  },
  {
    name: "hoverEffect",
    type: '"expand" | "glow" | "pulse" | "flicker" | "trace" | "none"',
    default: '"expand"',
    description:
      'Hover animation on the corner brackets. "expand" grows the arms, "glow" adds a neon shadow, "pulse" breathes in glow, "flicker" neon-flickers, "trace" chases a highlight along the arm.',
  },
  {
    name: "glowIntensity",
    type: '"low" | "medium" | "high"',
    default: '"medium"',
    description: "Controls the spread radius of glow/pulse effects.",
  },
  {
    name: "animated",
    type: "boolean",
    default: "false",
    description:
      "When true the chosen hoverEffect runs continuously without requiring hover.",
  },
  {
    name: "bgVariant",
    type: '"none" | "subtle" | "solid"',
    default: '"none"',
    description:
      '"subtle" adds a faint accent-tinted fill; "solid" adds a #0a0a0a dark fill.',
  },
  {
    name: "cornerStyle",
    type: '"square" | "rounded"',
    default: '"square"',
    description: "Square or rounded bracket tip ends.",
  },
  {
    name: "cornerLength",
    type: "number",
    default: "16",
    description: "Base arm length of each bracket in px.",
  },
  {
    name: "cornerThickness",
    type: "number",
    default: "2",
    description: "Stroke thickness of the bracket in px.",
  },
  {
    name: "hoverLength",
    type: "number",
    default: "32",
    description: 'Arm length when expanded (hoverEffect="expand") in px.',
  },
  {
    name: "transitionDuration",
    type: "number",
    default: "300",
    description: "Expand / transition animation speed in ms.",
  },
];

export default props;
