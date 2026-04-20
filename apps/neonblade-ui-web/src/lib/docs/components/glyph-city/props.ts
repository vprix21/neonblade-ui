import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "cityType",
    type: '"solid" | "outline"',
    default: '"solid"',
    description:
      'Render mode. "solid" fills buildings with glyph characters and neon colors. "outline" draws clean neon vector silhouettes of the skyline.',
  },
  {
    name: "variant",
    type: '"downtown" | "megacity" | "district" | "ruins"',
    default: '"downtown"',
    description:
      "City layout variant for solid mode. downtown = tall dense towers; megacity = wall-to-wall packed high-rises; district = lower varied buildings; ruins = short crumbling structures.",
  },
  {
    name: "outlineVariant",
    type: '"sparse" | "dense" | "layered" | "horizon"',
    default: '"sparse"',
    description:
      "City layout variant for outline mode. sparse = wide spaced tall towers; dense = tightly packed high-rises; layered = buildings with setbacks and terracing; horizon = wide low silhouette.",
  },
  {
    name: "colorPrimary",
    type: "string",
    default: '"#00ffff"',
    description:
      "Primary neon color used for most building structures and ground line.",
  },
  {
    name: "colorSecondary",
    type: "string",
    default: '"#ff00ff"',
    description:
      "Secondary neon color used for accent buildings, windows, and flying vehicles.",
  },
  {
    name: "colorTertiary",
    type: "string",
    default: '"#ffff00"',
    description:
      "Tertiary color used for antennas, tower peak lights, and a third vehicle type.",
  },
  {
    name: "bgColor",
    type: "string",
    default: '"#000000"',
    description: "Canvas background fill color.",
  },
  {
    name: "fontSize",
    type: "number",
    default: "12",
    description:
      "Font size in px. Also controls column/row density — smaller values produce denser cities.",
  },
  {
    name: "speed",
    type: "number",
    default: "80",
    description:
      "Milliseconds between each animation frame. Lower = faster animation.",
  },
  {
    name: "showVehicles",
    type: "boolean",
    default: "true",
    description:
      "Render flying vehicles with motion trails across the skyline.",
  },
  {
    name: "blinkingLights",
    type: "boolean",
    default: "true",
    description: "Enable blinking peak lights on antenna towers.",
  },
  {
    name: "opacity",
    type: "number",
    default: "90",
    description: "Overall canvas opacity scaled to 100.",
  },
  {
    name: "charSet",
    type: '"blocks" | "custom"',
    default: '"blocks"',
    description:
      'Character set used to fill buildings in solid mode. "blocks" uses Unicode block/box-drawing characters (default). "custom" uses the string supplied via customChars.',
  },
  {
    name: "customChars",
    type: "string",
    default: "undefined",
    description:
      'Custom character pool used when charSet="custom". All characters in this string are cycled through to fill buildings, windows, and rooftops.',
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Additional CSS class names forwarded to the wrapper div.",
  },
];

export default props;
