import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "value",
    type: "number",
    description: "Current fill value (0 to max).",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Maximum value.",
  },
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description: "Neon accent color.",
  },
  {
    name: "variant",
    type: '"solid" | "segmented" | "striped" | "pulse"',
    default: '"solid"',
    description:
      "Visual style of the filled bar. For an indeterminate arrow loader, use the ArrowLoader component.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg"',
    default: '"md"',
    description: "Bar height preset.",
  },
  {
    name: "showLabel",
    type: "boolean",
    default: "false",
    description: "Show a percentage label above the bar.",
  },
  {
    name: "label",
    type: "string",
    description: "Custom label text (overrides the auto %).",
  },
  {
    name: "glow",
    type: "boolean",
    default: "true",
    description: "Neon glow on the filled bar.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional className on the wrapper.",
  },
];

export default props;
