"use client";
import React, { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import "./glitch-text.css";

// ---- Types -------------------------------------------------

/** Named color presets or any valid CSS color string */
export type GTColor = "cyan" | "pink" | "green" | (string & {});

/**
 * Glitch displacement intensity:
 * - `subtle`  — 1 px offsets, barely perceptible
 * - `normal`  — 2 px offsets (default)
 * - `heavy`   — 4 px offsets, highly visible
 * - `chaos`   — 6 px offsets + skew, full-cycle, non-stop
 */
export type GTIntensity = "subtle" | "normal" | "heavy" | "chaos";

/**
 * Animation speed shorthand:
 * - `slow`    — 2 s per loop
 * - `normal`  — 1 s (default)
 * - `fast`    — 0.45 s
 * - `frenzy`  — 0.2 s
 */
export type GTSpeed = "slow" | "normal" | "fast" | "frenzy";

/** One extra colour channel: a colour plus its resting X/Y offset (px, or any
 *  CSS length / custom-property string so it can be theme-swapped). */
export type GTLayer = {
  color: GTColor;
  /** Resting horizontal offset. Number → px. @default 0 */
  x?: number | string;
  /** Resting vertical offset. Number → px (negative = up). @default 0 */
  y?: number | string;
};

/** Curated multi-colour channel stacks. Each expands into `layers`, its spread
 *  scaled by `offset`:
 *  - `anaglyph`  cyan + red on opposite diagonals (the stereoscopic 3-D split)
 *  - `tiktok`    cyan + red split horizontally (the logo)
 *  - `cmyk`      cyan / magenta / yellow — where the channels overlap they
 *                generate blue / red / green
 *  - `spectrum`  six hues in spectral order, warm one way / cool the other */
export type GTPalette = "anaglyph" | "tiktok" | "cmyk" | "spectrum";

// ---- Maps --------------------------------------------------

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

const SPEED_MAP: Record<GTSpeed, string> = {
  slow: "2s",
  normal: "1s",
  fast: "0.45s",
  frenzy: "0.2s",
};

// For chaos the default speed is tighter; override if user doesn't set one.
const CHAOS_DEFAULT_SPEED = "0.8s";

// Each preset is a function of the base `offset` (px) — so `offset` is the
// spread control. Channels are listed back → front (first paints farthest back).
const PALETTES: Record<GTPalette, (o: number) => GTLayer[]> = {
  anaglyph: (o) => [
    { color: "#00f0ff", x: -o, y: -o },
    { color: "#ff003c", x: o, y: o },
  ],
  tiktok: (o) => [
    { color: "#00f2ea", x: -1.5 * o, y: 0 },
    { color: "#ff0050", x: 1.5 * o, y: 0 },
  ],
  cmyk: (o) => [
    { color: "#00aeef", x: -1.5 * o, y: 0 },
    { color: "#ec008c", x: 0, y: 1.5 * o },
    { color: "#fff200", x: 1.5 * o, y: 0 },
  ],
  spectrum: (o) => [
    { color: "#ff00e5", x: -3 * o, y: o },
    { color: "#2b4bff", x: -2 * o, y: 0.6 * o },
    { color: "#00f0ff", x: -o, y: 0 },
    { color: "#00ff66", x: o, y: 0 },
    { color: "#ffe600", x: 2 * o, y: -0.6 * o },
    { color: "#ff003c", x: 3 * o, y: -o },
  ],
};

const len = (v: number | string | undefined): string =>
  v === undefined ? "0" : typeof v === "number" ? `${v}px` : v;

// ---- Props -------------------------------------------------

export interface GlitchTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;

  /**
   * The string to render in `data-text` for the CSS pseudo-elements.
   * Defaults to `children` when `children` is a plain string — so you only
   * need this when `children` contains JSX rather than a bare string.
   */
  text?: string;

  /**
   * Activation mode.
   * - `hover`  — glitch plays only while the element is hovered (default)
   * - `active` — glitch plays continuously
   */
  mode?: "active" | "hover";

  /**
   * Color of the `::before` (channel A) pseudo-element text-shadow.
   * Preset name or any CSS color.
   * @default "pink"
   */
  colorA?: GTColor;

  /**
   * Color of the `::after` (channel B) pseudo-element text-shadow.
   * Preset name or any CSS color.
   * @default "cyan"
   */
  colorB?: GTColor;

  /**
   * Displacement intensity — controls the translate/skew magnitudes.
   * @default "normal"
   */
  intensity?: GTIntensity;

  /**
   * Animation speed shorthand.
   * @default "normal"
   */
  speed?: GTSpeed;

  /**
   * Explicit override for the loop duration, e.g. `"1.5s"`.
   * Overrides `speed` when provided.
   */
  customSpeed?: string;

  /**
   * Horizontal offset of the RGB-split channels in px.
   * @default 2
   */
  offset?: number;

  /**
   * When true, wraps the text in a neon `text-shadow` glow.
   * @default false
   */
  neon?: boolean;

  /**
   * When true (requires `neon`), adds a neon-flicker animation to the glow.
   * @default false
   */
  neonFlicker?: boolean;

  /**
   * Color of the neon text-shadow glow. Preset or CSS color.
   * Defaults to `colorB` when unset.
   */
  glowColor?: GTColor;

  /** @deprecated use glitchDuration or speed instead */
  glitchDuration?: number;

  /**
   * Whether the split is visible at rest.
   * - `clean` — channels hide until the glitch plays (default)
   * - `split` — channels stay shown as a frozen split that jitters in place
   * @default "clean"
   */
  rest?: "clean" | "split";

  /**
   * Extra colour channels rendered as stacked clones, each with its own X/Y
   * rest offset. When provided, REPLACES the `colorA` / `colorB` split — the way
   * multi-colour wordmarks (3+ channels) are built.
   */
  layers?: GTLayer[];

  /**
   * A curated multi-colour preset (`anaglyph` / `tiktok` / `cmyk` / `spectrum`)
   * whose spread scales with `offset`. Shorthand for `layers` — an explicit
   * `layers` prop overrides it.
   */
  palette?: GTPalette;
}

// ---- Component ---------------------------------------------

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  text,
  mode = "hover",
  colorA = "pink",
  colorB = "cyan",
  intensity = "normal",
  speed = "normal",
  customSpeed,
  offset = 2,
  neon = false,
  neonFlicker = false,
  glowColor,
  glitchDuration, // legacy
  rest = "clean",
  layers,
  palette,
  className = "",
  style,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedText = text ?? (typeof children === "string" ? children : "");

  const resolvedA = COLOR_PRESETS[colorA] ?? colorA;
  const resolvedB = COLOR_PRESETS[colorB] ?? colorB;
  const resolvedGlow = glowColor
    ? (COLOR_PRESETS[glowColor] ?? glowColor)
    : resolvedB;

  // explicit layers win; otherwise expand a palette preset (scaled by offset)
  const resolvedLayers =
    layers && layers.length > 0
      ? layers
      : palette
        ? PALETTES[palette](offset)
        : undefined;
  const hasLayers = !!resolvedLayers && resolvedLayers.length > 0;

  // Speed resolution: customSpeed > legacy glitchDuration > speed preset
  let resolvedSpeed: string;
  if (customSpeed) {
    resolvedSpeed = customSpeed;
  } else if (glitchDuration !== undefined) {
    resolvedSpeed = `${glitchDuration}s`;
  } else if (intensity === "chaos" && speed === "normal") {
    // chaos has its own tighter default
    resolvedSpeed = CHAOS_DEFAULT_SPEED;
  } else {
    resolvedSpeed = SPEED_MAP[speed];
  }

  const classes = [
    "glitch-wrapper",
    "relative inline-block",
    mode === "active" ? "activeglitch" : "hoverglitch",
    intensity !== "normal" ? `gt-${intensity}` : "",
    rest === "split" ? "gt-rest-split" : "",
    hasLayers ? "gt-layered" : "",
    neon ? "gt-neon" : "",
    neon && neonFlicker ? "gt-neon-flicker" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      data-text={resolvedText}
      style={
        {
          "--gt-color-a": resolvedA,
          "--gt-color-b": resolvedB,
          "--gt-offset": `${offset}px`,
          "--gt-speed": resolvedSpeed,
          "--gt-glow-color": resolvedGlow,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {hasLayers ? (
        <>
          {resolvedLayers!.map((l, i) => (
            <span
              key={i}
              aria-hidden
              className="glitch-wrapper__layer"
              data-text={resolvedText}
              style={
                {
                  "--gt-lcolor": COLOR_PRESETS[l.color] ?? l.color,
                  "--gt-lx": len(l.x),
                  "--gt-ly": len(l.y),
                } as React.CSSProperties
              }
            >
              {children}
            </span>
          ))}
          <span className="glitch-wrapper__base">
            {mounted ? children : <span className="invisible">{children}</span>}
          </span>
        </>
      ) : (
        <>
          {mounted ? children : <span className="invisible">{children}</span>}
          {!mounted && <span className="absolute inset-0">{children}</span>}
        </>
      )}
    </span>
  );
};

export default GlitchText;
