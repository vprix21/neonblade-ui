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
      {mounted ? children : <span className="invisible">{children}</span>}
      {!mounted && <span className="absolute inset-0">{children}</span>}
    </span>
  );
};

export default GlitchText;
