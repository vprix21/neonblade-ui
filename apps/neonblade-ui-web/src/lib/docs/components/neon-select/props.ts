import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  { name: "options",      type: "NeonSelectOption[]", description: "Options list. Each item: { value, label?, disabled? }." },
  { name: "value",        type: "string",  description: "Controlled selected value." },
  { name: "defaultValue", type: "string",  description: "Default value (uncontrolled)." },
  { name: "onChange",     type: "(value: string) => void", description: "Change handler called with the selected option value." },
  { name: "placeholder",  type: "string",  default: '"SELECT..."', description: "Placeholder text when nothing is selected." },
  { name: "color",        type: '"cyan" | "pink" | "green" | string', default: '"cyan"', description: "Neon accent color." },
  { name: "size",         type: '"sm" | "md" | "lg"', default: '"md"', description: "Size preset controlling padding and font size." },
  { name: "variant",      type: '"square" | "corner-cut"', default: '"square"', description: "square is a standard bordered box; corner-cut clips the bottom-right corner with a properly bordered diagonal using the two-layer frame technique." },
  { name: "label",        type: "string",  description: "Optional field label rendered above the trigger in accent colour." },
  { name: "disabled",     type: "boolean", default: "false", description: "Disable the entire select." },
  { name: "className",    type: "string",  description: "Additional className on the wrapper." },
  { name: "id",           type: "string",  description: "id for the trigger button." },
  { name: "ariaLabel",    type: "string",  description: "aria-label for the trigger and dropdown list." },
];

export default props;
