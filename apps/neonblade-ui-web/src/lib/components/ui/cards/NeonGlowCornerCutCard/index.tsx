"use client";

import React, { HTMLAttributes, ReactNode } from "react";
import "./neonglow-cornercut-card.css";

// ---- Types -------------------------------------------------

/** Named color presets or any valid CSS color string */
export type NGCCColor = "cyan" | "pink" | "green" | (string & {});

/** Card size — controls padding, icon box, and font sizes */
export type NGCCSize = "sm" | "md" | "lg" | "xl";

/** Which corner receives the diagonal cut */
export type NGCCCorner =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "all";

/**
 * Hover glow effect preset:
 * - `gradient`  — dual-color gradient backdrop (matches the Features.tsx card)
 * - `solid`     — single accent-color backdrop
 * - `glow-only` — box-shadow on the card, no backdrop layer
 * - `pulse`     — continuously pulsing box-shadow while hovered
 * - `trace`     — gradient backdrop with animated hue rotation
 * - `none`      — no hover glow (icon/title transitions still active)
 */
export type NGCCHoverEffect =
  | "gradient"
  | "solid"
  | "glow-only"
  | "pulse"
  | "trace"
  | "none";

/** Controls the spread radius of the neon glow */
export type NGCCGlowIntensity = "low" | "medium" | "high";

// ---- Maps --------------------------------------------------

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

const CORNER_CLASSES: Record<NGCCCorner, string> = {
  "bottom-right": "ngcc-clip-br",
  "bottom-left": "ngcc-clip-bl",
  "top-right": "ngcc-clip-tr",
  "top-left": "ngcc-clip-tl",
  all: "ngcc-clip-all",
};

const HOVER_CLASSES: Record<NGCCHoverEffect, string> = {
  gradient: "ngcc-hover-gradient",
  solid: "ngcc-hover-solid",
  "glow-only": "ngcc-hover-glow-only",
  pulse: "ngcc-hover-pulse",
  trace: "ngcc-hover-trace",
  none: "ngcc-hover-none",
};

const GLOW_SIZES: Record<NGCCGlowIntensity, { glow: number; blur: number }> = {
  low: { glow: 8, blur: 4 },
  medium: { glow: 15, blur: 7 },
  high: { glow: 28, blur: 14 },
};

// ---- Component props ---------------------------------------

export interface NeonGlowCornerCutCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Free-form children rendered below title/description.
   * Can be used alone to compose a fully custom card body.
   */
  children?: ReactNode;

  /**
   * Icon ReactNode rendered inside the top icon box.
   * Pass a Lucide icon element: `icon={<Terminal className="w-full h-full" />}`
   */
  icon?: ReactNode;

  /** Card heading */
  title?: string;

  /** Body copy below the title */
  description?: string;

  /**
   * Gradient start color & icon/title glow color.
   * Use a preset ("cyan" | "pink" | "green") or any CSS color value.
   * @default "cyan"
   */
  colorA?: NGCCColor;

  /**
   * Gradient end color (used when hoverEffect is "gradient" or "trace").
   * @default "pink"
   */
  colorB?: NGCCColor;

  /**
   * Card size — controls inner padding, icon box size, and font sizes.
   * @default "md"
   */
  size?: NGCCSize;

  /**
   * Which corner receives the diagonal cut.
   * @default "bottom-right"
   */
  corner?: NGCCCorner;

  /**
   * Depth of the corner diagonal cut in pixels.
   * @default 20
   */
  cornerSize?: number;

  /**
   * Hover glow effect:
   * - `gradient`  — dual gradient backdrop (default, matches Features.tsx)
   * - `solid`     — single accent-color backdrop
   * - `glow-only` — box-shadow only, no backdrop
   * - `pulse`     — pulsing box-shadow while hovered
   * - `trace`     — gradient backdrop with animated hue rotation
   * - `none`      — no hover glow
   * @default "gradient"
   */
  hoverEffect?: NGCCHoverEffect;

  /**
   * Spread radius of the neon glow effect.
   * @default "medium"
   */
  glowIntensity?: NGCCGlowIntensity;

  /**
   * Override the inner card background color.
   * @default "#0a0a0a"
   */
  bgColor?: string;
}

// ---- Component ---------------------------------------------

export const NeonGlowCornerCutCard: React.FC<NeonGlowCornerCutCardProps> = ({
  children,
  icon,
  title,
  description,
  colorA = "cyan",
  colorB = "pink",
  size = "md",
  corner = "bottom-right",
  cornerSize = 20,
  hoverEffect = "gradient",
  glowIntensity = "medium",
  bgColor,
  className = "",
  style,
  ...props
}) => {
  const resolvedA = COLOR_PRESETS[colorA] ?? colorA;
  const resolvedB = COLOR_PRESETS[colorB] ?? colorB;
  const { glow, blur } = GLOW_SIZES[glowIntensity];

  return (
    <div
      className={`ngcc-wrapper ngcc-size-${size} ${HOVER_CLASSES[hoverEffect]} ${className}`}
      style={
        {
          "--ngcc-color-a": resolvedA,
          "--ngcc-color-b": resolvedB,
          "--ngcc-corner-size": `${cornerSize}px`,
          "--ngcc-glow-size": `${glow}px`,
          "--ngcc-glow-blur": `${blur}px`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Gradient/solid glow backdrop — sits behind the clipped inner card */}
      <div className="ngcc-glow" aria-hidden="true" />

      {/* Inner card — receives the clip-path */}
      <div
        className={`ngcc-card ${CORNER_CLASSES[corner]}`}
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
        {/* Optional icon box */}
        {icon && (
          <div className="ngcc-icon-box">
            <span className="ngcc-icon">{icon}</span>
          </div>
        )}

        {/* Optional title */}
        {title && <h3 className="ngcc-title font-orbitron">{title}</h3>}

        {/* Optional description */}
        {description && <p className="ngcc-description">{description}</p>}

        {/* Custom children */}
        {children}
      </div>
    </div>
  );
};

export default NeonGlowCornerCutCard;
