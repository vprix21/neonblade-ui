"use client";

import React, { HTMLAttributes, ReactNode } from "react";
import "./badge.css";

// ---- Types -------------------------------------------------

/** Named color presets or any valid CSS color string */
export type BadgeColor = "cyan" | "pink" | "green" | (string & {});

/** Badge size */
export type BadgeSize = "xs" | "sm" | "md";

/** Visual style variant */
export type BadgeVariant = "solid" | "outline" | "ghost";

/**
 * Badge shape:
 * - `pill`        — fully rounded capsule (default)
 * - `rectangle`   — sharp rectangle, no border radius
 * - `corner-cut`  — diagonal polygon corner cut
 */
export type BadgeShape = "pill" | "rectangle" | "corner-cut";

/** Which corner receives the diagonal cut (corner-cut shape only) */
export type BadgeCorner =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "all";

/**
 * Indicator dot animation:
 * - `none`    — no dot
 * - `solid`   — static dot, no animation
 * - `pulse`   — breathing fade in/out
 * - `flicker` — neon flicker
 */
export type BadgeDot = "none" | "solid" | "pulse" | "flicker";

// ---- Maps --------------------------------------------------

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

const CORNER_CLIP: Record<BadgeCorner, string> = {
  "bottom-right": "bdg-clip-br",
  "bottom-left": "bdg-clip-bl",
  "top-right": "bdg-clip-tr",
  "top-left": "bdg-clip-tl",
  all: "bdg-clip-all",
};

// ---- Component props ---------------------------------------

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge label — text or any inline React node */
  children?: ReactNode;

  /**
   * Accent color.
   * Use a preset ("cyan" | "pink" | "green") or any CSS color value.
   * @default "cyan"
   */
  color?: BadgeColor;

  /**
   * Visual style.
   * - `solid`   — filled with the accent color, black text
   * - `outline` — transparent background with accent border
   * - `ghost`   — subtle tinted background, accent text
   * @default "outline"
   */
  variant?: BadgeVariant;

  /**
   * Badge shape.
   * - `pill`       — fully rounded capsule
   * - `rectangle`  — sharp rectangle
   * - `corner-cut` — diagonal polygon corner cut
   * @default "pill"
   */
  shape?: BadgeShape;

  /**
   * Which corner is cut (corner-cut shape only).
   * @default "bottom-right"
   */
  corner?: BadgeCorner;

  /**
   * Depth of the corner diagonal cut in pixels (corner-cut shape only).
   * @default 8
   */
  cornerSize?: number;

  /**
   * Indicator dot shown before the badge text.
   * - `none`    — no dot (default)
   * - `solid`   — static colored dot
   * - `pulse`   — breathing fade animation
   * - `flicker` — neon flicker animation
   * @default "none"
   */
  dot?: BadgeDot;

  /**
   * Add a neon glow + text-shadow using the badge color.
   * @default false
   */
  glow?: boolean;

  /**
   * Badge size.
   * @default "sm"
   */
  size?: BadgeSize;
}

// ---- Component ---------------------------------------------

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = "cyan",
  variant = "outline",
  shape = "pill",
  corner = "bottom-right",
  cornerSize = 8,
  dot = "none",
  glow = false,
  size = "sm",
  className = "",
  style,
  ...props
}) => {
  const resolvedColor = COLOR_PRESETS[color] ?? color;
  const shapeClass = shape !== "corner-cut" ? `bdg-shape-${shape}` : "";
  const clipClass = shape === "corner-cut" ? CORNER_CLIP[corner] : "";

  return (
    <span
      className={`bdg-wrapper bdg-variant-${variant} bdg-size-${size} ${shapeClass} ${className}`}
      style={
        {
          "--bdg-color": resolvedColor,
          "--bdg-corner-size": `${cornerSize}px`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Border frame — same clip-path / border-radius as inner.
          Provides the 1px border on all edges including the diagonal. */}
      <span
        className={`bdg-frame ${shapeClass} ${clipClass}`}
        aria-hidden="true"
      />

      {/* Inner badge content */}
      <span
        className={`bdg-inner ${shapeClass} ${clipClass}${glow ? " bdg-glow" : ""}`}
      >
        {dot !== "none" && (
          <span className={`bdg-dot bdg-dot-${dot}`} aria-hidden="true" />
        )}
        {children}
      </span>
    </span>
  );
};

export default Badge;
