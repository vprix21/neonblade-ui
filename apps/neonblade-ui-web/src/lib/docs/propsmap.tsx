type PropDefinition = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

const propsMap: Record<string, PropDefinition[]> = {
  "datalines-with-grid": [
    {
      name: "lineColor",
      type: "string",
      default: '"#00f3ff"',
      description: "The color for the line tracers.",
    },
    {
      name: "shadowColor",
      type: "string",
      default: '"#00f3ff"',
      description: "The hex color for the trail shadow.",
    },
    {
      name: "bgGridColor",
      type: "string",
      default: '"rgba(255,255,255,0.05)"',
      description: "Color for the grid cells border.",
    },
    {
      name: "cellSize",
      type: "number",
      default: "50",
      description: "Size of the simulated grid tiles.",
    },
    {
      name: "maxLines",
      type: "number",
      default: "15",
      description: "Maximum number of simultaneous data lines.",
    },
    {
      name: "baseSpeed",
      type: "number",
      default: "2",
      description: "Flow speed multiplier.",
    },
    {
      name: "spawnProbability",
      type: "number",
      default: "0.1",
      description: "Chance per frame to spawn a new line.",
    },
    {
      name: "overlay",
      type: "boolean",
      default: "false",
      description: "Whether to overlay the grid on top of existing content.",
    },
  ],
  "ascii-rain": [
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
  ],
  "accent-frame": [
    {
      name: "color",
      type: '"cyan" | "pink" | "green" | string',
      default: '"cyan"',
      description: "Primary corner accent color. Preset name or any CSS color.",
    },
    {
      name: "colorB",
      type: '"cyan" | "pink" | "green" | string',
      description:
        "Secondary accent color for the opposite-diagonal bracket pair. Defaults to the primary color.",
    },
    {
      name: "mode",
      type: '"duo" | "quad"',
      default: '"duo"',
      description:
        '"duo" renders top-left + bottom-right corners. "quad" renders all four.',
    },
    {
      name: "hoverEffect",
      type: '"expand" | "glow" | "pulse" | "flicker" | "trace" | "none"',
      default: '"expand"',
      description:
        'Hover animation on the corner brackets. "expand" grows the arms, "glow" adds a neon shadow, "pulse" breathes in glow, "flicker" neon-flickers, "trace" chases a highlight along the arm.',
    },
    {
      name: "glowIntensity",
      type: '"low" | "medium" | "high"',
      default: '"medium"',
      description: "Controls the spread radius of glow/pulse effects.",
    },
    {
      name: "animated",
      type: "boolean",
      default: "false",
      description:
        "When true the chosen hoverEffect runs continuously without requiring hover.",
    },
    {
      name: "bgVariant",
      type: '"none" | "subtle" | "solid"',
      default: '"none"',
      description:
        '"subtle" adds a faint accent-tinted fill; "solid" adds a #0a0a0a dark fill.',
    },
    {
      name: "cornerStyle",
      type: '"square" | "rounded"',
      default: '"square"',
      description: "Square or rounded bracket tip ends.",
    },
    {
      name: "cornerLength",
      type: "number",
      default: "16",
      description: "Base arm length of each bracket in px.",
    },
    {
      name: "cornerThickness",
      type: "number",
      default: "2",
      description: "Stroke thickness of the bracket in px.",
    },
    {
      name: "hoverLength",
      type: "number",
      default: "32",
      description: 'Arm length when expanded (hoverEffect="expand") in px.',
    },
    {
      name: "transitionDuration",
      type: "number",
      default: "300",
      description: "Expand / transition animation speed in ms.",
    },
  ],
  "border-beam-corner-cut-card": [
    {
      name: "children",
      type: "ReactNode",
      description:
        "Free-form slot rendered below the optional title/description.",
    },
    {
      name: "icon",
      type: "ReactNode",
      description:
        "Element rendered inside the top icon box (e.g. a Lucide icon).",
    },
    { name: "title", type: "string", description: "Card heading text." },
    {
      name: "description",
      type: "string",
      description: "Body copy rendered below the title.",
    },
    {
      name: "beamColor",
      type: '"cyan" | "pink" | "green" | string',
      default: '"pink"',
      description: "Primary beam color. Preset name or any CSS color.",
    },
    {
      name: "beamColorB",
      type: '"cyan" | "pink" | "green" | string',
      default: '"cyan"',
      description:
        'Secondary beam color used in "dual" and "gradient-sweep" variants.',
    },
    {
      name: "variant",
      type: '"single" | "dual" | "gradient-sweep" | "rainbow" | "pulse"',
      default: '"single"',
      description:
        'Beam animation style. "dual" spins two beams in opposite directions; "gradient-sweep" blends colorA→colorB; "rainbow" cycles all neon hues; "pulse" breathes in opacity.',
    },
    {
      name: "duration",
      type: "number",
      default: "4",
      description: "Primary beam rotation speed in seconds.",
    },
    {
      name: "durationB",
      type: "number",
      default: "6",
      description:
        "Secondary beam rotation speed in seconds (dual variant only).",
    },
    {
      name: "borderWidth",
      type: "number | string",
      default: '"2px"',
      description:
        "Visible beam border width — becomes the padding between outer and inner card.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "Controls inner padding, icon box size and font sizes.",
    },
    {
      name: "corner",
      type: '"bottom-right" | "bottom-left" | "top-right" | "top-left" | "all"',
      default: '"bottom-right"',
      description: "Which corner(s) receive the diagonal cut.",
    },
    {
      name: "cornerSize",
      type: "number",
      default: "20",
      description: "Depth of the diagonal corner cut in pixels.",
    },
    {
      name: "glowIntensity",
      type: '"none" | "low" | "medium" | "high"',
      default: '"medium"',
      description: "Ambient neon glow spread on the inner card surface.",
    },
    {
      name: "bgColor",
      type: "string",
      description:
        "Override the inner card background color (default: var(--background)).",
    },
    {
      name: "innerClassName",
      type: "string",
      default: '""',
      description: "Extra className applied to the inner content div.",
    },
  ],
  "glitch-text": [
    {
      name: "text",
      type: "string",
      description:
        "String passed to data-text — must match the children text for the CSS pseudo-element channels to line up.",
    },
    {
      name: "mode",
      type: '"hover" | "active"',
      default: '"hover"',
      description:
        '"hover" plays the glitch only while hovered. "active" plays continuously.',
    },
    {
      name: "intensity",
      type: '"subtle" | "normal" | "heavy" | "chaos"',
      default: '"normal"',
      description:
        'Displacement amount of the RGB-split channels. "chaos" uses a full-cycle keyframe with skew.',
    },
    {
      name: "speed",
      type: '"slow" | "normal" | "fast" | "frenzy"',
      default: '"normal"',
      description:
        "Animation loop speed shorthand (2 s / 1 s / 0.45 s / 0.2 s).",
    },
    {
      name: "customSpeed",
      type: "string",
      description:
        'Explicit CSS duration string (e.g. "1.5s") — overrides speed.',
    },
    {
      name: "colorA",
      type: '"cyan" | "pink" | "green" | string',
      default: '"pink"',
      description:
        "Color of the ::before channel text-shadow (preset or CSS color).",
    },
    {
      name: "colorB",
      type: '"cyan" | "pink" | "green" | string',
      default: '"cyan"',
      description:
        "Color of the ::after channel text-shadow (preset or CSS color).",
    },
    {
      name: "offset",
      type: "number",
      default: "2",
      description: "Horizontal split offset of the RGB channels in px.",
    },
    {
      name: "neon",
      type: "boolean",
      default: "false",
      description: "Adds a neon text-shadow glow around the text.",
    },
    {
      name: "neonFlicker",
      type: "boolean",
      default: "false",
      description:
        "When neon is true, also animates a neon-flicker on the glow.",
    },
    {
      name: "glowColor",
      type: '"cyan" | "pink" | "green" | string',
      description: "Color of the neon glow (defaults to colorB).",
    },
    {
      name: "glitchDuration",
      type: "number",
      description:
        "(Deprecated) Legacy loop duration in seconds. Use speed or customSpeed instead.",
    },
  ],
  "corner-cut-button": [
    {
      name: "children",
      type: "ReactNode",
      description: "Button label content.",
    },
    {
      name: "color",
      type: '"cyan" | "pink" | "green" | string',
      default: '"cyan"',
      description:
        'Accent color — use a preset name or any valid CSS color (e.g. "#ff4400").',
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "Controls padding and font size.",
    },
    {
      name: "variant",
      type: '"solid" | "outline" | "ghost"',
      default: '"solid"',
      description:
        "Visual style. solid fills with the accent color (matches the Hero button), outline adds a border, ghost is subtly tinted.",
    },
    {
      name: "corner",
      type: '"bottom-right" | "bottom-left" | "top-right" | "top-left" | "all"',
      default: '"bottom-right"',
      description: "Which corner(s) receive the diagonal cut.",
    },
    {
      name: "cornerSize",
      type: "number",
      default: "20",
      description: "Depth of the corner diagonal cut in pixels.",
    },
    {
      name: "hoverEffect",
      type: '"glow" | "shift" | "shine" | "pulse" | "scan" | "flicker" | "none"',
      default: '"glow"',
      description: "Hover animation preset applied to the button.",
    },
    {
      name: "glowIntensity",
      type: '"low" | "medium" | "high"',
      default: '"medium"',
      description: "Spread radius of neon glow effects.",
    },
    {
      name: "showArrow",
      type: "boolean",
      default: "false",
      description: "Appends a → arrow that slides right on hover.",
    },
  ],
  "neon-glow-corner-cut-card": [
    {
      name: "children",
      type: "ReactNode",
      description:
        "Free-form slot rendered below title/description. Use alone for a fully custom card body.",
    },
    {
      name: "icon",
      type: "ReactNode",
      description:
        "Element rendered inside the top icon box (e.g. a Lucide icon).",
    },
    { name: "title", type: "string", description: "Card heading text." },
    {
      name: "description",
      type: "string",
      description: "Body copy rendered below the title.",
    },
    {
      name: "colorA",
      type: '"cyan" | "pink" | "green" | string',
      default: '"cyan"',
      description:
        "Gradient start color and icon/title glow color. Accept preset names or any CSS color.",
    },
    {
      name: "colorB",
      type: '"cyan" | "pink" | "green" | string',
      default: '"pink"',
      description:
        'Gradient end color used in "gradient" and "trace" hover effects.',
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "Controls inner card padding, icon box, and font sizes.",
    },
    {
      name: "corner",
      type: '"bottom-right" | "bottom-left" | "top-right" | "top-left" | "all"',
      default: '"bottom-right"',
      description: "Which corner(s) receive the diagonal cut.",
    },
    {
      name: "cornerSize",
      type: "number",
      default: "20",
      description: "Depth of the diagonal corner cut in pixels.",
    },
    {
      name: "hoverEffect",
      type: '"gradient" | "solid" | "glow-only" | "pulse" | "trace" | "none"',
      default: '"gradient"',
      description:
        'Hover glow style. "gradient" matches the Features.tsx card exactly.',
    },
    {
      name: "glowIntensity",
      type: '"low" | "medium" | "high"',
      default: '"medium"',
      description: "Spread radius of the neon glow effects.",
    },
    {
      name: "bgColor",
      type: "string",
      description:
        "Override the inner card background color (default: #0a0a0a).",
    },
  ],
};

export default propsMap;
