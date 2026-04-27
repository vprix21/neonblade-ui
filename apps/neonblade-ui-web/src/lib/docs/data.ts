export interface ComponentData {
  name: string;
  slug: string;
  description: string;
  is_new?: boolean;
  is_updated?: boolean;
}

export interface CategoryData {
  name: string;
  slug: string;
  components: ComponentData[];
}

export const categories: CategoryData[] = [
  {
    name: "Backgrounds",
    slug: "backgrounds",
    components: [
      {
        name: "Datalines With Grid",
        slug: "datalines-with-grid",
        description: "A grid with random data line tracers.",
        is_updated: false,
      },
      {
        name: "Ascii Rain",
        slug: "ascii-rain",
        description: "A futuristic falling ASCII matrix effect.",
      },
      {
        name: "Glyph City",
        slug: "glyph-city",
        description:
          "Animated glyph cityscape with neon buildings, antennas, blinking peak lights, and flying vehicles.",
        is_new: false,
      },
      // {
      //   name: "Neon Triangle",
      //   slug: "neon-triangle",
      //   description:
      //     "Glowing neon inverted triangle with prism wireframe, layered, and fractured variants. Full control over colors, glow intensity, and animations.",
      //   is_new: true,
      // },
      // {
      //   name: "Data Buses",
      //   slug: "databuses",
      //   description:
      //     "Static neon circuit-board bus lines with circular terminal nodes. PCB-trace aesthetic with full control over colors, density, glow, and node style.",
      //   is_new: true,
      // },
      {
        name: "Cyber Circuit",
        slug: "cyber-circuit",
        description:
          "Static SVG circuit traces entering from the corners with glowing terminal nodes. Configurable colors, line weight, dot style, and glow intensity.",
        is_new: false,
      },
      {
        name: "Hexagons",
        slug: "hexagons",
        description:
          "Flat-top hexagon grid with customizable fill, border colors, hover highlight, ambient glow, and animated beam lines flowing along hex edges.",
        is_new: true,
      },
    ],
  },
  {
    name: "Cards",
    slug: "cards",
    components: [
      {
        name: "Border Beam Corner Cut",
        slug: "border-beam-corner-cut-card",
        description: "A corner cut card with a spinning border beam.",
      },
      {
        name: "Neon Glow Corner Cut Card",
        slug: "neon-glow-corner-cut-card",
        description:
          "A corner cut card with a neon gradient glow backdrop, icon box, and fully customizable colors, sizes and hover effects.",
      },
    ],
  },
  {
    name: "Frames",
    slug: "frames",
    components: [
      {
        name: "Accent Frame",
        slug: "accent-frame",
        description: "A dynamic frame with animated corner accents.",
      },
    ],
  },
  {
    name: "Text",
    slug: "text",
    components: [
      {
        name: "Glitch Text",
        slug: "glitch-text",
        description: "Animated RGB split, CSS-only glitch effect.",
      },
      {
        name: "Neon Glow",
        slug: "neon-glow",
        description:
          "Highly customizable neon glow text with single color, multi-color gradients (linear, radial, conic), and animated effects.",
        is_new: false,
      },
    ],
  },
  {
    name: "Buttons",
    slug: "buttons",
    components: [
      {
        name: "Corner Cut Button",
        slug: "corner-cut-button",
        description:
          "A button with a diagonal corner cut, multiple variants, colors, sizes and hover effects.",
        is_updated: false,
      },
    ],
  },
  {
    name: "Badges",
    slug: "badges",
    components: [
      {
        name: "Badge",
        slug: "badge",
        description:
          "Futuristic label badge with pill, rectangle, and corner-cut shapes, dot indicators, and glow.",
      },
    ],
  },
  {
    name: "Navbars",
    slug: "navbars",
    components: [
      {
        name: "NavBar",
        slug: "navbar",
        description:
          "All-in-one navbar: standard or dock variant, submenus, profile menu, transparent/glass/solid, fixed/floating/sticky positioning.",
      },
    ],
  },
  {
    name: "Footers",
    slug: "footers",
    components: [
      {
        name: "Footer",
        slug: "footer",
        description:
          "Fully customizable footer: minimal, columns, centered, and mega variants with link groups, social links, newsletter, and accent color system.",
      },
    ],
  },
  {
    name: "Timelines",
    slug: "timelines",
    components: [
      {
        name: "Timeline",
        slug: "timeline",
        description:
          "Futuristic neon timeline with multiple variants, dot shapes, line styles, alignment modes, and staggered animate-in.",
      },
    ],
  },
  {
    name: "Inputs",
    slug: "inputs",
    components: [
      {
        name: "Neon Input",
        slug: "neon-input",
        description:
          "A fully-featured text input with the iconic NeonBlade corner-cut shape, neon focus glow, full color customization, label, hint, error state, prefix/suffix slots, border styles, background opacity, and all standard HTML input types.",
        is_new: true,
      },
    ],
  },
];
