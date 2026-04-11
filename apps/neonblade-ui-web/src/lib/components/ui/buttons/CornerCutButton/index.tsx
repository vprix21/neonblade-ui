"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import "./corner-cut-button.css";

// ---- Types -------------------------------------------------

/** Named color presets or any valid CSS color string (e.g. "#ff4400", "hsl(180,100%,50%)") */
export type CCBColor = "cyan" | "pink" | "green" | (string & {});

/** Button size */
export type CCBSize = "xs" | "sm" | "md" | "lg" | "xl";

/** Visual style variant */
export type CCBVariant = "solid" | "outline" | "ghost";

/** Which corner is cut */
export type CCBCorner =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "all";

/**
 * Hover animation preset:
 * - `glow`    — neon glow + white background flash (default for solid)
 * - `shift`   — bg color shift on hover (solid→white, outline→filled)
 * - `shine`   — diagonal shine sweep across the button
 * - `pulse`   — continuously pulsing glow while hovered
 * - `scan`    — a scan line travels top→bottom while hovered
 * - `flicker` — neon flicker effect while hovered
 * - `none`    — no hover animation
 */
export type CCBHoverEffect =
  | "glow"
  | "shift"
  | "shine"
  | "pulse"
  | "scan"
  | "flicker"
  | "none";

/** Controls the spread radius of the neon glow */
export type CCBGlowIntensity = "low" | "medium" | "high";

// ---- Maps --------------------------------------------------

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

const SIZE_CLASSES: Record<CCBSize, string> = {
  xs: "px-4 py-2 text-xs",
  sm: "px-6 py-3 text-xs",
  md: "px-8 py-4 text-sm",
  lg: "px-10 py-5 text-base",
  xl: "px-12 py-6 text-lg",
};

const CORNER_CLASSES: Record<CCBCorner, string> = {
  "bottom-right": "ccb-clip-br",
  "bottom-left": "ccb-clip-bl",
  "top-right": "ccb-clip-tr",
  "top-left": "ccb-clip-tl",
  all: "ccb-clip-all",
};

const HOVER_CLASSES: Record<CCBHoverEffect, string> = {
  glow: "ccb-hover-glow",
  shift: "ccb-hover-shift",
  shine: "ccb-hover-shine",
  pulse: "ccb-hover-pulse",
  scan: "ccb-hover-scan",
  flicker: "ccb-hover-flicker",
  none: "",
};

const GLOW_SIZES: Record<CCBGlowIntensity, number> = {
  low: 8,
  medium: 15,
  high: 28,
};

// ---- Component props ---------------------------------------

export interface CornerCutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  /**
   * Button accent color.
   * Use a preset name ("cyan" | "pink" | "green") or any CSS color value.
   * @default "cyan"
   */
  color?: CCBColor;

  /**
   * Button size controlling padding and font size.
   * @default "md"
   */
  size?: CCBSize;

  /**
   * Visual variant.
   * - `solid`   — filled with the accent color (matches the Hero "Explore Components" button)
   * - `outline` — transparent background with a 1.5 px accent border
   * - `ghost`   — subtle tinted background with accent text
   * @default "solid"
   */
  variant?: CCBVariant;

  /**
   * Which corner receives the diagonal cut.
   * @default "bottom-right"
   */
  corner?: CCBCorner;

  /**
   * Size of the corner cut in pixels.
   * @default 20
   */
  cornerSize?: number;

  /**
   * Hover animation/effect.
   * @default "glow"
   */
  hoverEffect?: CCBHoverEffect;

  /**
   * Glow spread intensity for effects that use a neon glow.
   * @default "medium"
   */
  glowIntensity?: CCBGlowIntensity;

  /**
   * When true an → arrow is appended that slides right on hover.
   * @default false
   */
  showArrow?: boolean;
}

// ---- Component ---------------------------------------------

export const CornerCutButton: React.FC<CornerCutButtonProps> = ({
  children,
  color = "cyan",
  size = "md",
  variant = "solid",
  corner = "bottom-right",
  cornerSize = 20,
  hoverEffect = "glow",
  glowIntensity = "medium",
  showArrow = false,
  className = "",
  style,
  ...props
}) => {
  const resolvedColor = COLOR_PRESETS[color] ?? color;
  const glowSize = GLOW_SIZES[glowIntensity];

  // Ghost variant needs color-mix background — not expressible in Tailwind
  const ghostStyle =
    variant === "ghost"
      ? {
          backgroundColor: "color-mix(in srgb, var(--ccb-color) 12%, #000)",
          color: "var(--ccb-color)",
        }
      : undefined;

  return (
    <div
      className={[
        "relative inline-flex p-px",
        // ccb-wrapper class retained ONLY for the flicker :has() selector in CSS
        hoverEffect === "flicker" ? "ccb-wrapper" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--ccb-color": resolvedColor,
          "--ccb-corner-size": `${cornerSize}px`,
          "--ccb-glow-size": `${glowSize}px`,
          ...style,
        } as React.CSSProperties
      }
    >
      {/* Border frame: 1px ring on all edges including the diagonal */}
      <div
        className={[
          "absolute inset-0 pointer-events-none z-0 transition-[background,opacity] duration-300",
          CORNER_CLASSES[corner],
          variant === "outline" ? "bg-[var(--ccb-color)]" : "bg-white/[0.08]",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      />

      <button
        className={[
          "flex-1 relative group font-orbitron font-bold tracking-wider uppercase transition-all overflow-hidden cursor-pointer",
          SIZE_CLASSES[size],
          CORNER_CLASSES[corner],
          HOVER_CLASSES[hoverEffect],
          // Class kept for compound hover-state CSS selectors (.ccb-solid.ccb-hover-glow:hover etc.)
          `ccb-${variant}`,
          variant === "solid" ? "bg-[var(--ccb-color)] text-black" : "",
          variant === "outline" ? "bg-black text-[var(--ccb-color)]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={ghostStyle}
        {...props}
      >
        {/* Shine sweep layer — only rendered when needed */}
        {hoverEffect === "shine" && (
          <span className="ccb-shine-layer" aria-hidden="true" />
        )}

        {/* Scan line layer — only rendered when needed */}
        {hoverEffect === "scan" && (
          <span className="ccb-scan-layer" aria-hidden="true" />
        )}

        {/* Content sits above decorative layers */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {showArrow && (
            <span
              className="group-hover:translate-x-1 transition-transform inline-block"
              aria-hidden="true"
            >
              →
            </span>
          )}
        </span>
      </button>
    </div>
  );
};

export default CornerCutButton;
