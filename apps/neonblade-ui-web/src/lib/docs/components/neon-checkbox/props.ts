import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "checked",
    type: "boolean",
    description: "Controlled checked state.",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "Default checked state (uncontrolled).",
  },
  {
    name: "indeterminate",
    type: "boolean",
    default: "false",
    description: "Renders a dash instead of a checkmark (partial selection).",
  },
  {
    name: "onChange",
    type: "(checked: boolean) => void",
    description: "Change handler called with the new checked value.",
  },
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description: "Neon accent color for the checked box.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Box size preset.",
  },
  {
    name: "variant",
    type: '"square" | "corner-cut"',
    default: '"square"',
    description:
      "Box style. square is a standard bordered box; corner-cut clips the bottom-right corner with a proper bordered diagonal.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the checkbox.",
  },
  {
    name: "label",
    type: "string",
    description: "Label text displayed next to the box.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional className on the wrapper.",
  },
  {
    name: "id",
    type: "string",
    description: "id for the input. Auto-generated if omitted.",
  },
];

export default props;
