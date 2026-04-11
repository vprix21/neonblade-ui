import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "text",
    type: "string",
    description:
      "String passed to data-text — must match the children text for the CSS pseudo-element channels to line up.",
  },
  {
    name: "mode",
    type: '"hover" | "active"',
    default: '"hover"',
    description:
      '"hover" plays the glitch only while hovered. "active" plays continuously.',
  },
  {
    name: "intensity",
    type: '"subtle" | "normal" | "heavy" | "chaos"',
    default: '"normal"',
    description:
      'Displacement amount of the RGB-split channels. "chaos" uses a full-cycle keyframe with skew.',
  },
  {
    name: "speed",
    type: '"slow" | "normal" | "fast" | "frenzy"',
    default: '"normal"',
    description: "Animation loop speed shorthand (2 s / 1 s / 0.45 s / 0.2 s).",
  },
  {
    name: "customSpeed",
    type: "string",
    description:
      'Explicit CSS duration string (e.g. "1.5s") — overrides speed.',
  },
  {
    name: "colorA",
    type: '"cyan" | "pink" | "green" | string',
    default: '"pink"',
    description:
      "Color of the ::before channel text-shadow (preset or CSS color).",
  },
  {
    name: "colorB",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description:
      "Color of the ::after channel text-shadow (preset or CSS color).",
  },
  {
    name: "offset",
    type: "number",
    default: "2",
    description: "Horizontal split offset of the RGB channels in px.",
  },
  {
    name: "neon",
    type: "boolean",
    default: "false",
    description: "Adds a neon text-shadow glow around the text.",
  },
  {
    name: "neonFlicker",
    type: "boolean",
    default: "false",
    description: "When neon is true, also animates a neon-flicker on the glow.",
  },
  {
    name: "glowColor",
    type: '"cyan" | "pink" | "green" | string',
    description: "Color of the neon glow (defaults to colorB).",
  },
  {
    name: "glitchDuration",
    type: "number",
    description:
      "(Deprecated) Legacy loop duration in seconds. Use speed or customSpeed instead.",
  },
];

export default props;
