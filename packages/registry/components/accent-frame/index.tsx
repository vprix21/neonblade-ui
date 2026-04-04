"use client";

import React, { HTMLAttributes } from "react";
import "./accent-frame.css";

// ---- Types -------------------------------------------------

/** Named color presets or any valid CSS color string */
export type AFColor = "cyan" | "pink" | "green" | (string & {});

/**
 * Hover animation applied to the corner brackets:
 * - `expand`  — arms grow to hoverLength on hover (default)
 * - `glow`    — neon box-shadow appears on hover
 * - `pulse`   — continuously pulsing glow while hovered
 * - `flicker` — neon flicker while hovered
 * - `trace`   — highlight chases along the bracket arm
 * - `none`    — static, no hover animation
 */
export type AFHoverEffect =
  | "expand"
  | "glow"
  | "pulse"
  | "flicker"
  | "trace"
  | "none";

/** Glow spread radius for glow/pulse effects */
export type AFGlowIntensity = "low" | "medium" | "high";

/** Background fill inside the frame */
export type AFBgVariant = "none" | "subtle" | "solid";

/** Corner bracket tip shape */
export type AFCornerStyle = "square" | "rounded";

// ---- Maps --------------------------------------------------

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

// ---- Props -------------------------------------------------

export interface AccentFrameProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** @deprecated use children */
  text?: React.ReactNode;

  /**
   * Primary corner accent color. Preset name or any CSS color.
   * @default "cyan"
   */
  color?: AFColor;

  /**
   * Secondary accent color used for the opposite-diagonal bracket pair
   * (bottom-right + top-right in duo, top-right + bottom-left in quad).
   * Defaults to the primary color when unset.
   */
  colorB?: AFColor;

  /** Base arm length of each corner bracket in px. @default 16 */
  cornerLength?: number;

  /** Stroke thickness of the corner bracket in px. @default 2 */
  cornerThickness?: number;

  /** Arm length when expanded (hoverEffect="expand") in px. @default 32 */
  hoverLength?: number;

  /** Transition/animation speed in ms. @default 300 */
  transitionDuration?: number;

  /** Rounded or square bracket tips. @default "square" */
  cornerStyle?: AFCornerStyle;

  /**
   * "duo" renders top-left + bottom-right corners.
   * "quad" renders all four corners.
   * @default "duo"
   */
  mode?: "duo" | "quad";

  /**
   * Hover animation preset.
   * @default "expand"
   */
  hoverEffect?: AFHoverEffect;

  /**
   * Glow spread radius for glow/pulse effects.
   * @default "medium"
   */
  glowIntensity?: AFGlowIntensity;

  /**
   * When true, the chosen hoverEffect runs continuously without hover.
   * @default false
   */
  animated?: boolean;

  /**
   * Background fill inside the frame.
   * @default "none"
   */
  bgVariant?: AFBgVariant;
}

// ---- Component ---------------------------------------------

export const AccentFrame: React.FC<AccentFrameProps> = ({
  children,
  text,
  className = "",
  color = "cyan",
  colorB,
  cornerLength = 16,
  cornerThickness = 2,
  hoverLength = 32,
  transitionDuration = 300,
  cornerStyle = "square",
  mode = "duo",
  hoverEffect = "expand",
  glowIntensity = "medium",
  animated = false,
  bgVariant = "none",
  style,
  ...props
}) => {
  const resolvedA = COLOR_PRESETS[color] ?? color;
  const resolvedB = colorB ? (COLOR_PRESETS[colorB] ?? colorB) : resolvedA;

  const wrapperClasses = [
    "px-6 py-4 relative group",
    cornerStyle === "rounded" ? "af-rounded" : "",
    hoverEffect !== "expand" && hoverEffect !== "none"
      ? `af-hover-${hoverEffect}`
      : "",
    `af-glow-${glowIntensity}`,
    animated ? "af-animated" : "",
    bgVariant !== "none" ? `af-bg-${bgVariant}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const shouldExpand = hoverEffect === "expand";
  const off = `-${cornerThickness / 2}px`;

  // Horizontal bracket piece (controls width axis)
  const H = (pos: string, isB = false) =>
    `af-corner ${isB ? "af-corner-b" : ""} ${pos} h-[var(--af-thickness)] w-[var(--af-corner-length)] ${shouldExpand ? "group-hover:w-[var(--af-hover-length)]" : ""}`.trim();

  // Vertical bracket piece (controls height axis)
  const V = (pos: string, isB = false) =>
    `af-corner ${isB ? "af-corner-b" : ""} ${pos} w-[var(--af-thickness)] h-[var(--af-corner-length)] ${shouldExpand ? "group-hover:h-[var(--af-hover-length)]" : ""}`.trim();

  return (
    <div
      className={wrapperClasses}
      style={
        {
          "--af-color-a": resolvedA,
          "--af-color-b": resolvedB,
          "--af-corner-length": `${cornerLength}px`,
          "--af-hover-length": `${hoverLength}px`,
          "--af-thickness": `${cornerThickness}px`,
          "--af-duration": `${transitionDuration}ms`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Top-left — primary color */}
      <div
        className={H("top-0 left-0")}
        style={{ marginTop: off, marginLeft: off }}
      />
      <div
        className={V("top-0 left-0")}
        style={{ marginTop: off, marginLeft: off }}
      />

      {/* Bottom-right — secondary color */}
      <div
        className={H("bottom-0 right-0", true)}
        style={{ marginBottom: off, marginRight: off }}
      />
      <div
        className={V("bottom-0 right-0", true)}
        style={{ marginBottom: off, marginRight: off }}
      />

      {mode === "quad" && (
        <>
          {/* Top-right — secondary color */}
          <div
            className={H("top-0 right-0", true)}
            style={{ marginTop: off, marginRight: off }}
          />
          <div
            className={V("top-0 right-0", true)}
            style={{ marginTop: off, marginRight: off }}
          />

          {/* Bottom-left — primary color */}
          <div
            className={H("bottom-0 left-0")}
            style={{ marginBottom: off, marginLeft: off }}
          />
          <div
            className={V("bottom-0 left-0")}
            style={{ marginBottom: off, marginLeft: off }}
          />
        </>
      )}

      <div className="relative z-10">{text ?? children}</div>
    </div>
  );
};

export default AccentFrame;
