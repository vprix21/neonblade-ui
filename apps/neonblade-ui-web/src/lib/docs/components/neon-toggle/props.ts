import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  { name: "checked",        type: "boolean",  description: "Controlled checked state." },
  { name: "defaultChecked", type: "boolean",  default: "false", description: "Default checked state (uncontrolled)." },
  { name: "onChange",       type: "(checked: boolean) => void", description: "Change handler called with the new checked value." },
  { name: "color",          type: '"cyan" | "pink" | "green" | string', default: '"cyan"', description: "Neon accent color for the ON state." },
  { name: "size",           type: '"sm" | "md" | "lg"', default: '"md"', description: "Track size preset." },
  { name: "disabled",       type: "boolean",  default: "false", description: "Disable the toggle." },
  { name: "label",          type: "string",   description: "Label text displayed next to the toggle." },
  { name: "labelPosition",  type: '"left" | "right"', default: '"right"', description: "Label position relative to the toggle." },
  { name: "className",      type: "string",   description: "Additional className on the label wrapper." },
  { name: "id",             type: "string",   description: "id for the underlying input. Auto-generated if omitted." },
];

export default props;
