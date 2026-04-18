import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "children",
    type: "ReactNode",
    description: "The text content to display with the neon glow effect.",
  },
  {
    name: "colors",
    type: '"cyan" | "pink" | "green" | "purple" | "orange" | "yellow" | string | NGColor[]',
    default: '"cyan"',
    description:
      'Single color or an array of up to four colors. Accepts preset names or any valid CSS color string — hex ("#00f3ff"), rgb, hsl, etc. One color renders plain neon text; 2–4 colors produce a gradient.',
  },
  {
    name: "gradientDirection",
    type: '"left-right" | "right-left" | "top-bottom" | "bottom-top" | "diagonal-tl-br" | "diagonal-tr-bl" | "radial" | "conic"',
    default: '"left-right"',
    description:
      "Direction of the gradient. Only relevant when colors contains more than one entry.",
  },
  {
    name: "glowIntensity",
    type: '"none" | "subtle" | "normal" | "strong" | "intense"',
    default: '"normal"',
    description:
      "Intensity of the neon glow. Drives text-shadow for single-color text and filter: drop-shadow() for gradient text.",
  },
  {
    name: "glowColor",
    type: '"cyan" | "pink" | "green" | "purple" | "orange" | "yellow" | string',
    description:
      "Pin the glow to a specific color (preset name or any CSS color). For single-color text this defaults to the text color. For gradient text no glow is applied unless glowColor or gradientGlow is set.",
  },
  {
    name: "gradientGlow",
    type: "boolean",
    default: "false",
    description:
      "When true and colors is multi-color, applies layered drop-shadow filters using each gradient color, producing a multi-hued halo that mirrors the text gradient. Takes precedence over glowColor for gradient text.",
  },
  {
    name: "animate",
    type: "boolean",
    default: "false",
    description:
      'Enable animation. The animation type is controlled by animationType. Defaults to "shift" for linear gradients and "pulse" for everything else.',
  },
  {
    name: "animationType",
    type: '"auto" | "shift" | "pulse"',
    default: '"auto"',
    description:
      '"auto" picks automatically: linear gradients use "shift" (scrolls background-position), all other cases use "pulse" (fades opacity). Set explicitly to force a specific animation regardless of gradient type.',
  },
  {
    name: "animationSpeed",
    type: '"slow" | "normal" | "fast"',
    default: '"normal"',
    description:
      'Speed of the animation. "slow" = 6 s / 4 s, "normal" = 3 s / 2 s, "fast" = 1.5 s / 1 s (shift / pulse respectively).',
  },
  {
    name: "className",
    type: "string",
    description:
      "Additional Tailwind or custom CSS classes — use this for font size, weight, family, spacing, etc.",
  },
];

export default props;
