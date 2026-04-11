import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "variant",
    type: '"standard" | "dock"',
    default: '"standard"',
    description:
      '"standard" renders a full-width top bar. "dock" renders a compact floating pill anchored to the top or bottom of the viewport.',
  },
  {
    name: "position",
    type: '"fixed" | "sticky" | "floating" | "static"',
    default: '"fixed"',
    description:
      'Positioning mode. "fixed" sticks to the viewport; "floating" renders a centered hovering bar; "sticky" sticks on scroll; "static" flows with the document.',
  },
  {
    name: "transparency",
    type: '"transparent" | "glass" | "solid"',
    default: '"glass"',
    description:
      'Background style. Pair "transparent" with scrollEffect for a cinematic hero-to-navbar transition.',
  },
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description:
      "Accent color applied to hover states, submenu borders, profile avatar ring, and dock indicator. Preset name or any CSS color.",
  },
  {
    name: "logo",
    type: "string | ReactNode",
    description:
      "Logo: an image URL string (rendered as <img>) or any ReactNode (e.g. a custom SVG).",
  },
  {
    name: "logoText",
    type: "string",
    description: "Brand text displayed beside the logo.",
  },
  {
    name: "logoHref",
    type: "string",
    default: '"/"',
    description: "href the logo links to.",
  },
  {
    name: "items",
    type: "NavItem[]",
    default: "[]",
    description:
      "Navigation links. Each item may include label, href, icon, onClick, and a children array for submenus.",
  },
  {
    name: "showProfile",
    type: "boolean",
    default: "false",
    description: "Show a user avatar button that opens a profile dropdown.",
  },
  {
    name: "profileAvatar",
    type: "string | ReactNode",
    description:
      "Avatar: an image URL or any ReactNode. Falls back to the first letter of profileName.",
  },
  {
    name: "profileName",
    type: "string",
    description: "User display name shown at the top of the profile dropdown.",
  },
  {
    name: "profileItems",
    type: "ProfileMenuItem[]",
    default: "PRESET_PROFILE_ITEMS",
    description:
      "Profile dropdown items. Each entry has key, label, icon, onClick, and divider. Use the exported PRESET_PROFILE_ITEMS or build your own.",
  },
  {
    name: "onProfileAction",
    type: "(key: string) => void",
    description:
      "Callback fired when any profile menu item is clicked. Receives the item key.",
  },
  {
    name: "scrollEffect",
    type: "boolean",
    default: "true",
    description:
      'When true the navbar transitions from the current transparency to glass on scroll. Best paired with transparency="transparent".',
  },
  {
    name: "scrollThreshold",
    type: "number",
    default: "20",
    description: "Scroll distance in px before the scroll effect triggers.",
  },
  {
    name: "dockPosition",
    type: '"top" | "bottom"',
    default: '"bottom"',
    description: "Pin position for the dock variant.",
  },
  {
    name: "dockShowLabels",
    type: "boolean",
    default: "true",
    description: "Show text labels beneath icons in the dock variant.",
  },
  {
    name: "navAlign",
    type: '"left" | "center" | "right"',
    default: '"center"',
    description:
      'Horizontal alignment of desktop nav items. "left" places items after the logo, "center" distributes them in the middle of the bar, "right" pushes all items to the far right (logo stays left).',
  },
  {
    name: "dropdownAlign",
    type: '"left" | "center" | "right"',
    default: '"center"',
    description:
      'Alignment of submenu dropdowns relative to their trigger button. "left" aligns the dropdown\'s left edge with the trigger, "center" centers it below, "right" aligns the dropdown\'s right edge with the trigger.',
  },
  {
    name: "className",
    type: "string",
    description: "Extra CSS class names applied to the <nav> element.",
  },
];

export default props;
