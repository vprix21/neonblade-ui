import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "shape",
    type: '"corner-cut" | "rectangle" | "rounded"',
    default: '"corner-cut"',
    description:
      'Input field shape. "corner-cut" applies the iconic NeonBlade diagonal clip. "rectangle" uses sharp square corners. "rounded" applies a soft border-radius.',
  },
  {
    name: "corner",
    type: '"bottom-right" | "bottom-left" | "top-right" | "top-left" | "tl-br" | "bl-tr" | "all"',
    default: '"bottom-right"',
    description:
      'Which corner(s) receive the diagonal cut. Single: "bottom-right", "bottom-left", "top-right", "top-left". Diagonal pairs: "tl-br" (top-left + bottom-right), "bl-tr" (bottom-left + top-right). "all" cuts all four corners. Only applies when shape is corner-cut.',
  },
  {
    name: "cornerSize",
    type: "number",
    default: "12",
    description:
      "Depth of the diagonal corner cut in pixels. Only applies when shape is corner-cut.",
  },
  {
    name: "borderStyle",
    type: '"full" | "bottom" | "none"',
    default: '"full"',
    description:
      '"full" draws a border on all sides including the diagonal cut edge. "bottom" shows only a bottom underline (shape/corner are ignored). "none" renders the input without any border.',
  },
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | "orange" | "purple" | "red" | string',
    default: '"cyan"',
    description:
      "Main accent color — drives the border, focus glow, caret, and prefix/suffix icon tint. Accepts a preset name or any CSS color value.",
  },
  {
    name: "borderColor",
    type: "string",
    default: "—",
    description:
      "Override the default border color. Falls back to `color` when not set.",
  },
  {
    name: "hoverColor",
    type: "string",
    default: "—",
    description: "Border color on hover. Falls back to `color` when not set.",
  },
  {
    name: "focusColor",
    type: "string",
    default: "—",
    description:
      "Border and glow color when the input is focused. Falls back to `color` when not set.",
  },
  {
    name: "bgColor",
    type: "string",
    default: '"#0a0f14"',
    description: "Background color of the input field.",
  },
  {
    name: "bgOpacity",
    type: "number",
    default: "100",
    description:
      'Background opacity as a percentage (0–100). 100 = fully opaque, 0 = fully transparent. Combines with bgColor — e.g. bgColor="cyan" bgOpacity={20} gives a subtle tinted transparent background.',
  },
  {
    name: "textColor",
    type: "string",
    default: '"#e0f8ff"',
    description: "Color of the typed value text.",
  },
  {
    name: "placeholderColor",
    type: "string",
    default: "—",
    description:
      "Color of the placeholder text. Defaults to the accent color at 35% opacity.",
  },
  {
    name: "label",
    type: "string",
    default: "—",
    description:
      "Optional label rendered above the input in font-orbitron uppercase.",
  },
  {
    name: "labelColor",
    type: "string",
    default: "—",
    description:
      "Color of the label. Defaults to the accent color at 65% opacity.",
  },
  {
    name: "hint",
    type: "string",
    default: "—",
    description: "Helper text shown below the input in a muted color.",
  },
  {
    name: "hintColor",
    type: "string",
    default: "—",
    description: "Color of the hint text.",
  },
  {
    name: "error",
    type: "string",
    default: "—",
    description:
      "Error message. When set the border turns red and this message is shown below the input instead of hint.",
  },
  {
    name: "variant",
    type: '"outline" | "filled"',
    default: '"outline"',
    description:
      '"outline" uses the bgColor background with a full border. "filled" adds a subtle accent-tinted background on top of bgColor.',
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Controls padding, height, and font size of the input.",
  },
  {
    name: "glowIntensity",
    type: '"none" | "subtle" | "normal" | "strong"',
    default: '"normal"',
    description:
      "Spread of the neon drop-shadow emitted when the input is focused.",
  },
  {
    name: "prefix",
    type: "ReactNode",
    default: "—",
    description:
      "Node rendered before the input text — ideal for icons or short strings.",
  },
  {
    name: "suffix",
    type: "ReactNode",
    default: "—",
    description:
      "Node rendered after the input text — ideal for icons, action buttons, or unit labels.",
  },
  {
    name: "type",
    type: '"text" | "password" | "email" | "number" | "search" | "tel" | "url" | string',
    default: '"text"',
    description:
      "Native HTML input type. All standard values are supported — passwords render as dots, number shows spinners, etc.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the input and reduces opacity.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Extra class names applied to the outermost wrapper div.",
  },
  {
    name: "inputClassName",
    type: "string",
    default: "—",
    description:
      "Extra class names applied directly to the native <input> element.",
  },
];

export default props;
