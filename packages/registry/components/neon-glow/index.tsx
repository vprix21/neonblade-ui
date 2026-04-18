"use client";
import React, { CSSProperties, HTMLAttributes, ReactNode } from "react";
import "./neon-glow-text.css";

// ---- Color presets ----------------------------------------

/**
 * Named color presets or any valid CSS color string (hex, rgb, hsl …).
 * e.g. `"cyan"`, `"#00f3ff"`, `"rgb(0,243,255)"`, `"hsl(185,100%,50%)"`
 */
export type NGColor =
  | "cyan"
  | "pink"
  | "green"
  | "purple"
  | "orange"
  | "yellow"
  | (string & {});

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
  purple: "#bf00ff",
  orange: "#ff6600",
  yellow: "#ffe000",
};

function resolveColor(color: NGColor): string {
  return COLOR_PRESETS[color as string] ?? color;
}

// ---- Gradient direction -----------------------------------

/**
 * Direction of the gradient when multiple colors are supplied.
 * - `left-right`     → 90 ° linear
 * - `right-left`     → 270 ° linear
 * - `top-bottom`     → 180 ° linear
 * - `bottom-top`     → 0 ° linear
 * - `diagonal-tl-br` → 135 ° linear
 * - `diagonal-tr-bl` → 45 ° linear
 * - `radial`         → radial gradient (ellipse at center)
 * - `conic`          → conic gradient (360 ° color wheel)
 */
export type NGGradientDirection =
  | "left-right"
  | "right-left"
  | "top-bottom"
  | "bottom-top"
  | "diagonal-tl-br"
  | "diagonal-tr-bl"
  | "radial"
  | "conic";

const LINEAR_ANGLES: Record<string, string> = {
  "left-right": "90deg",
  "right-left": "270deg",
  "top-bottom": "180deg",
  "bottom-top": "0deg",
  "diagonal-tl-br": "135deg",
  "diagonal-tr-bl": "45deg",
};

// ---- Glow intensity --------------------------------------

/**
 * Neon glow intensity.
 * - `none`    — no glow
 * - `subtle`  — barely perceptible halo
 * - `normal`  — standard neon effect (default)
 * - `strong`  — vivid, doubled spread
 * - `intense` — extreme spread + fourth ring
 */
export type NGGlowIntensity =
  | "none"
  | "subtle"
  | "normal"
  | "strong"
  | "intense";

/** Build a CSS text-shadow / drop-shadow value string for a single color. */
function buildSingleGlow(color: string, intensity: NGGlowIntensity): string {
  switch (intensity) {
    case "none":
      return "";
    case "subtle":
      return `0 0 5px ${color}99`;
    case "normal":
      return `0 0 6px ${color}, 0 0 14px ${color}66`;
    case "strong":
      return `0 0 8px ${color}, 0 0 20px ${color}, 0 0 40px ${color}55`;
    case "intense":
      return `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}44`;
    default:
      return "";
  }
}

/**
 * Build a `filter` string of `drop-shadow()` layers — one layer per gradient
 * color. Produces a multi-hued glow that matches the text gradient colors.
 */
function buildGradientGlowFilter(
  colors: string[],
  intensity: NGGlowIntensity,
): string {
  if (intensity === "none") return "";
  const perColor: Record<NGGlowIntensity, (c: string) => string> = {
    none: () => "",
    subtle: (c) => `drop-shadow(0 0 4px ${c}88)`,
    normal: (c) => `drop-shadow(0 0 6px ${c}99) drop-shadow(0 0 14px ${c}44)`,
    strong: (c) => `drop-shadow(0 0 8px ${c}) drop-shadow(0 0 20px ${c}66)`,
    intense: (c) =>
      `drop-shadow(0 0 12px ${c}) drop-shadow(0 0 28px ${c}77) drop-shadow(0 0 48px ${c}33)`,
  };
  return colors.map(perColor[intensity]).join(" ");
}

// ---- Animation type + speed ------------------------------

/**
 * Controls which CSS animation plays when `animate` is `true`.
 * - `"auto"`  — chooses automatically: linear gradients → `"shift"`, all others → `"pulse"` (default)
 * - `"shift"` — continuously moves the gradient's background-position (great for linear gradients)
 * - `"pulse"` — fades the element opacity in and out (great for single-color or radial/conic)
 */
export type NGAnimationType = "auto" | "shift" | "pulse";

/**
 * - `slow`   — 6 s / 4 s cycle
 * - `normal` — 3 s / 2 s cycle (default)
 * - `fast`   — 1.5 s / 1 s cycle
 */
export type NGAnimationSpeed = "slow" | "normal" | "fast";

// ---- Props ----------------------------------------------

export interface NeonGlowProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "style"
> {
  children: ReactNode;

  /**
   * Single color **or** an array of up to four colors.
   *
   * Accepts preset names (`"cyan"`, `"pink"`, `"green"`, `"purple"`,
   * `"orange"`, `"yellow"`) **or** any valid CSS color string —
   * hex (`"#00f3ff"`), rgb (`"rgb(0,243,255)"`), hsl, etc.
   *
   * - One color  → plain neon text with a matching glow.
   * - 2–4 colors → gradient text; glow is suppressed unless `glowColor`
   *   or `gradientGlow` is set.
   * @default "cyan"
   */
  colors?: NGColor | NGColor[];

  /**
   * Gradient direction — only used when `colors` contains more than one entry.
   * @default "left-right"
   */
  gradientDirection?: NGGradientDirection;

  /**
   * Intensity of the neon glow.
   * For single-color text it drives `text-shadow`.
   * For gradient text it drives `filter: drop-shadow()`.
   * @default "normal"
   */
  glowIntensity?: NGGlowIntensity;

  /**
   * Pin the glow to a single explicit color (preset name or CSS color string).
   * When omitted, single-color text glows with its own color; gradient text
   * has no glow unless `gradientGlow` is also `true`.
   */
  glowColor?: NGColor;

  /**
   * When `true` and `colors` is multi-color, applies a layered
   * `filter: drop-shadow()` using **each** of the gradient colors.
   * The result is a multi-hued halo that mirrors the text gradient.
   * Takes precedence over `glowColor` for gradient text.
   * @default false
   */
  gradientGlow?: boolean;

  /**
   * Enable the animation.
   * @default false
   */
  animate?: boolean;

  /**
   * Which animation to play when `animate` is `true`.
   * - `"auto"`  — linear gradients use `"shift"`, everything else uses `"pulse"`.
   * - `"shift"` — scrolls the gradient background-position (best for linear gradients).
   * - `"pulse"` — fades opacity in/out (best for single-color, radial, or conic).
   * @default "auto"
   */
  animationType?: NGAnimationType;

  /**
   * Speed of the animation cycle.
   * - `"slow"`   — 6 s (shift) / 4 s (pulse)
   * - `"normal"` — 3 s / 2 s
   * - `"fast"`   — 1.5 s / 1 s
   * @default "normal"
   */
  animationSpeed?: NGAnimationSpeed;

  /** Additional Tailwind or custom CSS classes. */
  className?: string;
}

// ---- Component ------------------------------------------

export default function NeonGlow({
  children,
  colors = "cyan",
  gradientDirection = "left-right",
  glowIntensity = "normal",
  glowColor,
  gradientGlow = false,
  animate = false,
  animationType = "auto",
  animationSpeed = "normal",
  className,
  ...rest
}: NeonGlowProps) {
  const colorArray = (Array.isArray(colors) ? colors : [colors]).slice(0, 4);
  const resolvedColors = colorArray.map(resolveColor);
  const isMultiColor = resolvedColors.length > 1;
  const primaryColor = resolvedColors[0];
  const isLinearGradient =
    isMultiColor && !["radial", "conic"].includes(gradientDirection);

  // Resolve animation type
  const resolvedAnimType: "shift" | "pulse" =
    animationType === "auto"
      ? isLinearGradient
        ? "shift"
        : "pulse"
      : animationType;

  // ---- Build inline styles --------------------------------
  const computedStyle: CSSProperties = {};

  if (isMultiColor) {
    // Gradient background
    if (gradientDirection === "radial") {
      computedStyle.backgroundImage = `radial-gradient(ellipse at center, ${resolvedColors.join(", ")})`;
    } else if (gradientDirection === "conic") {
      computedStyle.backgroundImage = `conic-gradient(from 0deg, ${resolvedColors.join(", ")}, ${resolvedColors[0]})`;
    } else {
      const angle = LINEAR_ANGLES[gradientDirection] ?? "90deg";
      if (animate && resolvedAnimType === "shift") {
        // Expand the stop-list so the loop transition is seamless
        const extended = [
          ...resolvedColors,
          ...resolvedColors.slice().reverse(),
          resolvedColors[0],
        ];
        computedStyle.backgroundImage = `linear-gradient(${angle}, ${extended.join(", ")})`;
        computedStyle.backgroundSize = "300% 300%";
      } else {
        computedStyle.backgroundImage = `linear-gradient(${angle}, ${resolvedColors.join(", ")})`;
      }
    }

    // Clip gradient to text
    computedStyle.WebkitBackgroundClip = "text";
    computedStyle.backgroundClip = "text";
    computedStyle.WebkitTextFillColor = "transparent";
    computedStyle.color = "transparent";

    // Glow — gradient glow takes precedence over single glowColor
    if (gradientGlow && glowIntensity !== "none") {
      computedStyle.filter = buildGradientGlowFilter(
        resolvedColors,
        glowIntensity,
      );
    } else if (glowColor) {
      const singleGlow = buildSingleGlow(
        resolveColor(glowColor),
        glowIntensity,
      );
      if (singleGlow) {
        computedStyle.filter = singleGlow
          .split(", ")
          .map((s) => `drop-shadow(${s})`)
          .join(" ");
      }
    }
    // No glowColor and no gradientGlow → no glow applied (intentional)
  } else {
    // Single color
    computedStyle.color = primaryColor;
    const glow = buildSingleGlow(
      glowColor ? resolveColor(glowColor) : primaryColor,
      glowIntensity,
    );
    if (glow) computedStyle.textShadow = glow;
  }

  // ---- Build animation classes ----------------------------
  const animClasses: string[] = [];
  if (animate) {
    if (resolvedAnimType === "shift") {
      animClasses.push("ng-shift", `ng-shift--${animationSpeed}`);
    } else {
      animClasses.push("ng-pulse", `ng-pulse--${animationSpeed}`);
    }
  }

  const allClasses =
    [...animClasses, className].filter(Boolean).join(" ") || undefined;

  return (
    <span className={allClasses} style={computedStyle} {...rest}>
      {children}
    </span>
  );
}
