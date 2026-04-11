import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "items",
    type: "TimelineItemData[]",
    description:
      "Array of timeline items to render. Each item has: title (required), date, description, badge, icon, active.",
  },
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description: "Accent color. Use a preset name or any CSS color value.",
  },
  {
    name: "variant",
    type: '"default" | "glow" | "minimal" | "stepped"',
    default: '"default"',
    description:
      '"default" — bare line + dots. "glow" — neon-glow card wrapper per item. "minimal" — understated small dots. "stepped" — left-bordered blocks, no dot.',
  },
  {
    name: "lineStyle",
    type: '"solid" | "dashed" | "glow" | "none"',
    default: '"solid"',
    description: "Style of the vertical connector line.",
  },
  {
    name: "dotStyle",
    type: '"circle" | "square" | "diamond"',
    default: '"circle"',
    description: "Shape of the connector node dot.",
  },
  {
    name: "dotAnim",
    type: '"none" | "pulse" | "ping"',
    default: '"none"',
    description:
      '"pulse" — breathing glow on the dot. "ping" — expanding ring ping animation.',
  },
  {
    name: "align",
    type: '"left" | "right" | "alternate"',
    default: '"left"',
    description:
      '"left" — line on far left, content right. "right" — line on far right. "alternate" — content alternates sides with a centered line.',
  },
  {
    name: "animate",
    type: "boolean",
    default: "false",
    description:
      "When true, items animate in with a staggered fade-slide effect on mount.",
  },
  {
    name: "className",
    type: "string",
    description: "Extra CSS class names applied to the root element.",
  },
];

export default props;
