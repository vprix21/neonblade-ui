"use client";

import React, { HTMLAttributes, ReactNode } from "react";
import "./notch-card.css";

// ---- Types -------------------------------------------------

export type NCNotchSide = "top" | "bottom" | "left" | "right";
export type NCColor = "cyan" | "pink" | "green" | (string & {});
export type NCSize = "sm" | "md" | "lg" | "xl";

/**
 * Beam animation variant:
 * - `none`            — no beam, static border color (default)
 * - `single`          — one conic-gradient beam spinning clockwise
 * - `dual`            — two beams rotating in opposite directions
 * - `gradient-sweep`  — wide blending beam from beamColor → beamColorB
 * - `rainbow`         — multi-color neon beam with hue rotation
 * - `pulse`           — single beam that breathes in opacity while spinning
 */
export type NCBeamVariant =
  | "none"
  | "single"
  | "dual"
  | "gradient-sweep"
  | "rainbow"
  | "pulse";

/**
 * Hover effect preset:
 * - `glow`  — intensified box-shadow glow on hover (default)
 * - `scan`  — animated scan line sweeping across the card
 * - `pulse` — continuously pulsing glow while hovered
 * - `lift`  — subtle translateY + scale with glow
 * - `none`  — no hover effect (title/icon transitions still active)
 */
export type NCHoverEffect = "glow" | "scan" | "pulse" | "lift" | "none";

export type NCGlowIntensity = "none" | "low" | "medium" | "high";

// ---- Color presets -----------------------------------------

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

function resolveColor(c: NCColor): string {
  return COLOR_PRESETS[c] ?? c;
}

// ---- Clip-path builder -------------------------------------

/**
 * Builds a CSS polygon() clip-path string with chamfered (angled) notch
 * indentations on the specified sides. Each notch looks like:
 *
 *   ────\              /────   ← edge (y=0 for top)
 *        \____________/        ← notch floor (y=notchSize)
 *    ←sk→      ←w→      ←sk→
 *
 * IMPORTANT — clockwise polygon winding rules:
 *   top edge    : left  → right  (L→R)
 *   right edge  : top   → bottom (T→B)
 *   bottom edge : right → left   (R→L  ← reversed vs top!)
 *   left edge   : bottom→ top    (B→T  ← reversed vs right!)
 */
function buildClipPath(
  notchSides: NCNotchSide[],
  notchSize: number,
  notchWidth: number,
  notchWidthV: number,
  notchSkew: number,
): string {
  const hasTop = notchSides.includes("top");
  const hasRight = notchSides.includes("right");
  const hasBottom = notchSides.includes("bottom");
  const hasLeft = notchSides.includes("left");

  const d = notchSize;
  const wH = notchWidth; // horizontal edges (top / bottom)
  const wV = notchWidthV; // vertical edges (left / right)
  const sk = notchSkew;
  const halfH = wH / 2 + sk;
  const halfV = wV / 2 + sk;

  const pts: string[] = [];
  const pt = (x: string, y: string) => pts.push(`${x} ${y}`);

  // Top notch — left → right
  const topNotch = () => {
    pt(`calc(50% - ${halfH}px)`, "0");
    pt(`calc(50% - ${wH / 2}px)`, `${d}px`);
    pt(`calc(50% + ${wH / 2}px)`, `${d}px`);
    pt(`calc(50% + ${halfH}px)`, "0");
  };

  // Right notch — top → bottom
  const rightNotch = () => {
    pt("100%", `calc(50% - ${halfV}px)`);
    pt(`calc(100% - ${d}px)`, `calc(50% - ${wV / 2}px)`);
    pt(`calc(100% - ${d}px)`, `calc(50% + ${wV / 2}px)`);
    pt("100%", `calc(50% + ${halfV}px)`);
  };

  // Bottom notch — right → left (reversed vs top)
  const bottomNotch = () => {
    pt(`calc(50% + ${halfH}px)`, "100%");
    pt(`calc(50% + ${wH / 2}px)`, `calc(100% - ${d}px)`);
    pt(`calc(50% - ${wH / 2}px)`, `calc(100% - ${d}px)`);
    pt(`calc(50% - ${halfH}px)`, "100%");
  };

  // Left notch — bottom → top (reversed vs right)
  const leftNotch = () => {
    pt("0", `calc(50% + ${halfV}px)`);
    pt(`${d}px`, `calc(50% + ${wV / 2}px)`);
    pt(`${d}px`, `calc(50% - ${wV / 2}px)`);
    pt("0", `calc(50% - ${halfV}px)`);
  };

  pt("0", "0");

  if (hasTop) topNotch();
  pt("100%", "0");

  if (hasRight) rightNotch();
  pt("100%", "100%");

  if (hasBottom) bottomNotch();
  pt("0", "100%");

  if (hasLeft) leftNotch();

  return `polygon(${pts.join(", ")})`;
}

// ---- Size maps ---------------------------------------------

const INNER_PADDING: Record<NCSize, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

const TITLE_SIZE: Record<NCSize, string> = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
};

const DESC_SIZE: Record<NCSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const ICON_BOX_SIZE: Record<NCSize, string> = {
  sm: "w-9 h-9",
  md: "w-12 h-12",
  lg: "w-14 h-14",
  xl: "w-16 h-16",
};

const ICON_SIZE: Record<NCSize, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-9 h-9",
};

// ---- Component props ---------------------------------------

export interface NotchCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Free-form content rendered below optional title/description. */
  children?: ReactNode;

  /** Icon element rendered inside the icon box at the top. */
  icon?: ReactNode;

  /** Card heading. */
  title?: string;

  /** Body copy rendered below the title. */
  description?: string;

  /**
   * Sides that receive notch indentations. At least one side required.
   * @default ["top", "bottom"]
   */
  notchSides?: NCNotchSide[];

  /**
   * Depth of each notch indentation in pixels.
   * @default 12
   */
  notchSize?: number;

  /**
   * Width of the flat notch floor on top & bottom edges in pixels.
   * @default 50
   */
  notchWidth?: number;

  /**
   * Width of the flat notch floor on left & right edges in pixels.
   * Defaults to `notchWidth` when omitted.
   */
  notchWidthV?: number;

  /**
   * Horizontal run of the angled entry/exit walls in pixels.
   * Larger = shallower / more gradual angle.
   * @default 12
   */
  notchSkew?: number;

  /**
   * Border thickness (padding between outer and inner card).
   * @default "2px"
   */
  borderWidth?: number | string;

  /**
   * Primary border / accent color. Preset name or any CSS color.
   * @default "cyan"
   */
  borderColor?: NCColor;

  /**
   * Secondary border color used when borderGradient is true.
   * @default "pink"
   */
  borderColorB?: NCColor;

  /**
   * Use a linear gradient as the static border instead of a solid color.
   * @default false
   */
  borderGradient?: boolean;

  /**
   * Animated beam on the border.
   * @default "none"
   */
  beamVariant?: NCBeamVariant;

  /**
   * Primary beam color. Preset name or any CSS color.
   * @default "cyan"
   */
  beamColor?: NCColor;

  /**
   * Secondary beam color — used in "dual" and "gradient-sweep" variants.
   * @default "pink"
   */
  beamColorB?: NCColor;

  /**
   * Primary beam rotation speed in seconds.
   * @default 4
   */
  beamDuration?: number;

  /**
   * Secondary beam rotation speed in seconds (dual variant only).
   * @default 6
   */
  beamDurationB?: number;

  /**
   * Card background color. Defaults to var(--background, #050505).
   */
  cardColor?: string;

  /**
   * Text color applied to the inner content wrapper.
   */
  textColor?: string;

  /**
   * Accent color for glow effects and hover highlights.
   * Defaults to the resolved borderColor.
   */
  accentColor?: NCColor;

  /**
   * Ambient neon glow intensity on the inner card surface.
   * @default "medium"
   */
  glowIntensity?: NCGlowIntensity;

  /**
   * Hover effect style.
   * @default "glow"
   */
  hoverEffect?: NCHoverEffect;

  /**
   * Card content size — controls padding and font sizes.
   * @default "md"
   */
  size?: NCSize;

  /**
   * Horizontal alignment of card content.
   * @default "start"
   */
  align?: "start" | "center";

  /** Extra className applied to the inner content div. */
  innerClassName?: string;
}

// ---- Component ---------------------------------------------

export const NotchCard: React.FC<NotchCardProps> = ({
  children,
  icon,
  title,
  description,
  notchSides = ["top", "bottom"],
  notchSize = 12,
  notchWidth = 50,
  notchWidthV,
  notchSkew = 12,
  borderWidth = "2px",
  borderColor = "cyan",
  borderColorB = "pink",
  borderGradient = false,
  beamVariant = "none",
  beamColor = "cyan",
  beamColorB = "pink",
  beamDuration = 4,
  beamDurationB = 6,
  cardColor,
  textColor,
  accentColor,
  glowIntensity = "medium",
  hoverEffect = "glow",
  size = "md",
  align = "start",
  className = "",
  innerClassName = "",
  style,
  ...props
}) => {
  // Ensure at least one notch side is active
  const validSides: NCNotchSide[] =
    notchSides.length > 0 ? notchSides : ["top", "bottom"];

  const resolvedBorderColor = resolveColor(borderColor);
  const resolvedBorderColorB = resolveColor(borderColorB);
  const resolvedBeamColor = resolveColor(beamColor);
  const resolvedBeamColorB = resolveColor(beamColorB);
  const resolvedAccent = resolveColor(
    accentColor ?? (beamVariant !== "none" ? beamColor : borderColor),
  );

  const bwValue =
    typeof borderWidth === "number" ? `${borderWidth}px` : borderWidth;

  const clipPath = buildClipPath(
    validSides,
    notchSize,
    notchWidth,
    notchWidthV ?? notchWidth,
    notchSkew,
  );

  const hasBeam = beamVariant !== "none";

  // Outer wrapper background
  let outerBg: string;
  if (hasBeam) {
    outerBg = "transparent"; // beam layer handles the visible color
  } else if (borderGradient) {
    outerBg = `linear-gradient(135deg, ${resolvedBorderColor}, ${resolvedBorderColorB})`;
  } else {
    outerBg = resolvedBorderColor;
  }

  const outerClasses = [
    "nc-wrapper",
    "relative overflow-hidden",
    hasBeam ? `nc-beam-${beamVariant}` : "",
    glowIntensity !== "none" ? `nc-glow-${glowIntensity}` : "",
    `nc-hover-${hoverEffect}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const innerClasses = [
    "nc-inner",
    "relative z-10 w-full h-full flex flex-col",
    align === "center" ? "items-center text-center" : "",
    INNER_PADDING[size],
    innerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={outerClasses}
      style={
        {
          "--nc-accent": resolvedAccent,
          "--nc-border-color": resolvedBorderColor,
          "--nc-border-color-b": resolvedBorderColorB,
          "--nc-beam-color": resolvedBeamColor,
          "--nc-beam-color-b": resolvedBeamColorB,
          "--nc-duration": `${beamDuration}s`,
          "--nc-duration-b": `${beamDurationB}s`,
          background: outerBg,
          padding: bwValue,
          clipPath,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Primary beam */}
      {hasBeam && <div className="nc-beam" aria-hidden="true" />}

      {/* Secondary beam — dual variant only */}
      {beamVariant === "dual" && (
        <div className="nc-beam-b" aria-hidden="true" />
      )}

      {/* Inner content card — same clip-path creates clean border effect */}
      <div
        className={innerClasses}
        style={{
          backgroundColor: cardColor ?? "var(--background, #050505)",
          color: textColor ?? undefined,
          clipPath,
        }}
      >
        {icon && (
          <div
            className={[
              "nc-icon-box",
              ICON_BOX_SIZE[size],
              align === "center" ? "self-center" : "",
              "mb-4 flex shrink-0 items-center justify-center border border-white/20 bg-white/[0.04]",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div
              className={["nc-icon", ICON_SIZE[size], "text-white/60"].join(
                " ",
              )}
            >
              {icon}
            </div>
          </div>
        )}

        {title && (
          <h3
            className={[
              "nc-title",
              "font-orbitron font-semibold text-white",
              TITLE_SIZE[size],
              icon || children ? "mb-1" : "",
            ].join(" ")}
          >
            {title}
          </h3>
        )}

        {description && (
          <p
            className={[
              "nc-desc",
              "text-white/55 leading-relaxed",
              DESC_SIZE[size],
              children ? "mb-3" : "",
            ].join(" ")}
          >
            {description}
          </p>
        )}

        {children}
      </div>

      {/* Scan-line hover overlay */}
      {hoverEffect === "scan" && (
        <div className="nc-scan-line" aria-hidden="true" />
      )}
    </div>
  );
};

export default NotchCard;
