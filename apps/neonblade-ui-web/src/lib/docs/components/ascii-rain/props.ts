import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "textColor",
    type: "string",
    default: '"#d43dd4ff"',
    description: "Color of the falling text.",
  },
  {
    name: "bgColor",
    type: "string",
    default: '"rgba(0, 0, 0, 0.05)"',
    description: "Background masking color for creating character trails.",
  },
  {
    name: "fontSize",
    type: "number",
    default: "14",
    description: "Width and font-size of the columns.",
  },
  {
    name: "speed",
    type: "number",
    default: "33",
    description: "Milliseconds between each rendering frame.",
  },
  {
    name: "characters",
    type: "string",
    default: '"ABC.."',
    description: "A string slice representing possible characters.",
  },
  {
    name: "opacity",
    type: "number",
    default: "60",
    description: "Base visual opacity constraint scaling to 100.",
  },
];

export default props;
