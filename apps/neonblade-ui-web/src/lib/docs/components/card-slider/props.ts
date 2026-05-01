import type { PropDefinition } from "../../types";

const cardSliderProps: PropDefinition[] = [
  // ── Layout ────────────────────────────────────────────────────────────────
  {
    name: "children",
    type: "ReactNode",
    description:
      "Slides to render. Pass any ReactNode: <img>, <video>, custom cards, etc. Each child occupies one slide slot.",
    default: "—",
  },
  {
    name: "visibleCount",
    type: "number | { sm?: number; md?: number; lg?: number; xl?: number }",
    description:
      "Number of items visible simultaneously. Accepts a plain number (same at all breakpoints) or a responsive object (sm ≥ 640 px, md ≥ 768 px, lg ≥ 1024 px, xl ≥ 1280 px).",
    default: "1",
  },
  {
    name: "gap",
    type: "number",
    description: "Gap between slide items in pixels.",
    default: "16",
  },

  // ── Navigation buttons ────────────────────────────────────────────────────
  {
    name: "showButtons",
    type: "boolean",
    description: "Show previous / next arrow navigation buttons.",
    default: "true",
  },
  {
    name: "buttonPosition",
    type: '"sides" | "bottom"',
    description:
      'Where to render navigation buttons. "sides" floats them over the left/right edges of the viewport; "bottom" places them in the footer row beside the progress indicator.',
    default: '"sides"',
  },
  {
    name: "buttonVisibility",
    type: '"always" | "hover"',
    description:
      'Controls when navigation buttons are visible. "always" keeps them visible at all times; "hover" fades them in only when the slider is hovered.',
    default: '"always"',
  },
  {
    name: "buttonCornerSize",
    type: "number",
    description:
      "Size of the diagonal corner cut on navigation buttons in pixels.",
    default: "10",
  },
  {
    name: "prevButtonCorner",
    type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"',
    description:
      "Which corner is cut on the previous (left) navigation button.",
    default: '"bottom-left"',
  },
  {
    name: "nextButtonCorner",
    type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"',
    description: "Which corner is cut on the next (right) navigation button.",
    default: '"bottom-right"',
  },

  // ── Swipe / drag ──────────────────────────────────────────────────────────
  {
    name: "enableSwipe",
    type: "boolean",
    description: "Enable touch-swipe and mouse-drag navigation.",
    default: "true",
  },
  {
    name: "swipeThreshold",
    type: "number",
    description:
      "Minimum drag distance in pixels required to trigger a slide change.",
    default: "50",
  },

  // ── Progress indicator ────────────────────────────────────────────────────
  {
    name: "showProgress",
    type: "boolean",
    description: "Show a progress indicator below the viewport.",
    default: "true",
  },
  {
    name: "progressStyle",
    type: '"bar" | "dots" | "counter"',
    description:
      'Visual style of the progress indicator. "bar" renders a neon fill bar; "dots" renders corner-cut dot buttons; "counter" shows a "03 / 10" numeric readout.',
    default: '"bar"',
  },

  // ── Behaviour ─────────────────────────────────────────────────────────────
  {
    name: "loop",
    type: "boolean",
    description: "Loop back to the first slide after the last one.",
    default: "false",
  },
  {
    name: "autoPlay",
    type: "boolean",
    description:
      "Auto-advance slides at the interval set by autoPlayInterval. Pauses on hover.",
    default: "false",
  },
  {
    name: "autoPlayInterval",
    type: "number",
    description: "Interval between auto-advance steps in milliseconds.",
    default: "3000",
  },

  // ── Visual / Colors ───────────────────────────────────────────────────────
  {
    name: "accentColor",
    type: "string",
    description:
      "Primary accent / neon glow color. Used for buttons, progress, corner accents, and all glow effects.",
    default: '"#00f3ff"',
  },
  {
    name: "edgeFadeColor",
    type: "string",
    description:
      "Color for the gradient edge-fades. Set this to your page background color for a natural blend.",
    default: '"#000000"',
  },
  {
    name: "showEdgeFades",
    type: "boolean",
    description:
      "Overlay gradient fades on the left and right edges of the viewport.",
    default: "false",
  },
  {
    name: "showCornerAccents",
    type: "boolean",
    description: "Display corner accent decorations on each slide/card item.",
    default: "true",
  },
  {
    name: "cornerAccentStyle",
    type: '"frame" | "plus"',
    description:
      'Visual style of the corner accent decorations. "frame" renders L-shaped targeting reticle lines on each corner; "plus" renders an SVG plus/cross icon centered on each corner.',
    default: '"frame"',
  },
  {
    name: "scanLines",
    type: "boolean",
    description:
      "Overlay subtle CRT horizontal scan-lines on the viewport for a retro cyberpunk effect.",
    default: "false",
  },

  // ── CSS overrides ─────────────────────────────────────────────────────────
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes applied to the root wrapper element.",
    default: '""',
  },
  {
    name: "viewportClassName",
    type: "string",
    description:
      "Additional CSS classes applied to the overflow-hidden viewport element.",
    default: '""',
  },
  {
    name: "itemClassName",
    type: "string",
    description: "Additional CSS classes applied to each slide item slot.",
    default: '""',
  },
];

export default cardSliderProps;
