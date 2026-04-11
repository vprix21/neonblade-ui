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

// ---- Size maps (move padding/sizing out of CSS) -----------

const CARD_PADDING: Record<NGCCSize, string> = {
  sm: "p-5",
  md: "p-8",
  lg: "p-10",
  xl: "p-12",
};
const ICON_BOX_SIZE: Record<NGCCSize, string> = {
  sm: "w-9 h-9",
  md: "w-12 h-12",
  lg: "w-14 h-14",
  xl: "w-16 h-16",
};
const ICON_SIZE: Record<NGCCSize, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-9 h-9",
};
const TITLE_SIZE: Record<NGCCSize, string> = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-[1.375rem]",
  xl: "text-[1.625rem]",
};
const DESC_SIZE: Record<NGCCSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

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
      className={["relative h-full p-px", HOVER_CLASSES[hoverEffect], className]
        .filter(Boolean)
        .join(" ")}
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
      <div
        className="ngcc-glow absolute -inset-0.5 rounded-[3px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Border frame — same clip-path as the card, 1px visible ring on all
          edges including the diagonal (CSS border can't reach there) */}
      <div
        className={[
          "ngcc-border-frame",
          "absolute inset-0 bg-white/10 z-[5] pointer-events-none transition-[background,opacity] duration-300",
          CORNER_CLASSES[corner],
        ].join(" ")}
        aria-hidden="true"
      />

      {/* Inner card — receives the clip-path */}
      <div
        className={[
          "ngcc-card",
          "relative h-full flex flex-col overflow-hidden z-10 transition-[box-shadow] duration-300",
          CORNER_CLASSES[corner],
          CARD_PADDING[size],
        ].join(" ")}
        style={{ backgroundColor: bgColor ?? "#0a0a0a" }}
      >
        {/* Optional icon box */}
        {icon && (
          <div
            className={[
              "ngcc-icon-box",
              "border border-white/10 bg-black rounded-[4px] flex items-center justify-center shrink-0 mb-6 transition-[border-color,box-shadow] duration-300",
              ICON_BOX_SIZE[size],
            ].join(" ")}
          >
            <span
              className={[
                "ngcc-icon",
                "text-white/70 flex items-center justify-center transition-colors duration-300",
                ICON_SIZE[size],
              ].join(" ")}
            >
              {icon}
            </span>
          </div>
        )}

        {/* Optional title */}
        {title && (
          <h3
            className={[
              "ngcc-title",
              "font-orbitron font-bold text-white mb-3 leading-[1.3] transition-[text-shadow] duration-300",
              TITLE_SIZE[size],
            ].join(" ")}
          >
            {title}
          </h3>
        )}

        {/* Optional description */}
        {description && (
          <p
            className={[
              "text-white/60 leading-[1.65] flex-grow",
              DESC_SIZE[size],
            ].join(" ")}
          >
            {description}
          </p>
        )}

        {/* Custom children */}
        {children}
      </div>
    </div>
  );
};

export default NeonGlowCornerCutCard;
