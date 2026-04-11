import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "variant",
    type: '"minimal" | "columns" | "centered" | "mega"',
    default: '"columns"',
    description:
      '"minimal" — single-row with brand, nav links, socials. "columns" — multi-column link groups + bottom bar. "centered" — all content centered. "mega" — full layout with logo, description, columns, optional newsletter.',
  },
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description:
      "Accent color applied to link hovers, social icon borders, newsletter button, group titles, and the top border glow. Preset name or any CSS color.",
  },
  {
    name: "logo",
    type: "string | ReactNode",
    description:
      "Logo: an image URL string (rendered as <img>) or any ReactNode (e.g. a custom SVG component).",
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
    name: "description",
    type: "string",
    description:
      "Short brand description shown below the logo. Used in columns and mega variants.",
  },
  {
    name: "linkGroups",
    type: "FooterLinkGroup[]",
    default: "[]",
    description:
      "Columns of links. Each group has a title and a links array. Used in columns and mega variants.",
  },
  {
    name: "navLinks",
    type: "FooterLink[]",
    default: "[]",
    description:
      "Flat navigation links. Shown inline in minimal and centered variants, and in the bottom bar of columns/mega.",
  },
  {
    name: "socialLinks",
    type: "FooterSocialLink[]",
    default: "[]",
    description:
      "Social icon links. Each entry has label, href, and an icon ReactNode. Built-in icons: GithubIcon, TwitterIcon, DiscordIcon, LinkedInIcon.",
  },
  {
    name: "copyright",
    type: "string",
    default: '"© {year} All rights reserved."',
    description:
      "Copyright text. Use {year} as a placeholder — it is automatically replaced with the current year.",
  },
  {
    name: "showNewsletter",
    type: "boolean",
    default: "false",
    description:
      "Show an email newsletter subscription form. Available in the mega variant.",
  },
  {
    name: "newsletterPlaceholder",
    type: "string",
    default: '"Enter your email"',
    description: "Placeholder text for the newsletter email input.",
  },
  {
    name: "newsletterButtonLabel",
    type: "string",
    default: '"Subscribe"',
    description: "Label for the newsletter submit button.",
  },
  {
    name: "onNewsletterSubmit",
    type: "(email: string) => void",
    description:
      "Callback fired when the newsletter form is submitted. Receives the trimmed email string.",
  },
  {
    name: "background",
    type: '"transparent" | "glass" | "solid"',
    default: '"solid"',
    description:
      'Background style. "solid" uses an opaque dark surface. "glass" adds a frosted blur. "transparent" removes the background entirely.',
  },
  {
    name: "topBorder",
    type: "boolean",
    default: "true",
    description:
      "Show a top accent-colored glow border line at the top of the footer.",
  },
  {
    name: "className",
    type: "string",
    description: "Extra CSS class names applied to the <footer> element.",
  },
];

export default props;
