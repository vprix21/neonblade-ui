"use client";
import React, { useRef, useCallback, useEffect, HTMLAttributes } from "react";

// ---- Color presets ----------------------------------------

/**
 * Named color presets or any valid CSS color string.
 * e.g. `"cyan"`, `"#00f3ff"`, `"rgb(0,243,255)"`, `"hsl(185,100%,50%)"`
 */
export type OTColor =
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

function resolveColor(color: OTColor): string {
  return COLOR_PRESETS[color as string] ?? color;
}

// ---- Glow intensity --------------------------------------

/**
 * Intensity of the letter-border glow on hover.
 * - `"none"`    — no glow
 * - `"subtle"`  — barely perceptible halo
 * - `"normal"`  — standard neon effect (default)
 * - `"strong"`  — vivid, doubled spread
 * - `"intense"` — extreme spread + fourth ring
 */
export type OTGlowIntensity =
  | "none"
  | "subtle"
  | "normal"
  | "strong"
  | "intense";

function buildGlow(color: string, intensity: OTGlowIntensity): string {
  const c = resolveColor(color as OTColor);
  switch (intensity) {
    case "none":
      return "none";
    case "subtle":
      return `0 0 5px ${c}99`;
    case "normal":
      return `0 0 6px ${c}, 0 0 14px ${c}66`;
    case "strong":
      return `0 0 8px ${c}, 0 0 20px ${c}, 0 0 40px ${c}55`;
    case "intense":
      return `0 0 10px ${c}, 0 0 20px ${c}, 0 0 40px ${c}, 0 0 80px ${c}44`;
    default:
      return "none";
  }
}

// ---- Props -----------------------------------------------

export interface OutlineTextProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "style" | "children"
> {
  /** The text string to render as outline letters. */
  children: string;

  /**
   * Color of the letter stroke/outline in the default (non-hovered) state.
   * Accepts preset names or any valid CSS color string.
   * @default "cyan"
   */
  strokeColor?: OTColor;

  /**
   * Fill color of the inner part of the letters.
   * Use `"transparent"` for a true outline-only look.
   * @default "transparent"
   */
  fillColor?: string;

  /**
   * Thickness of the letter outline stroke in pixels.
   * @default 1
   */
  strokeWidth?: number;

  /**
   * Font size — any valid CSS length value (`"2rem"`, `"48px"`, `"5vw"` …).
   * Alternatively pass a number and it will be treated as `px`.
   * @default "3rem"
   */
  fontSize?: string | number;

  /**
   * Stroke color in the hover/proximity-activated state.
   * Defaults to the same as `strokeColor` if not provided.
   */
  hoverStrokeColor?: OTColor;

  /**
   * Fill color of the inner part of the letters in the
   * hover/proximity-activated state. Defaults to `fillColor`.
   */
  hoverFillColor?: string;

  /**
   * Intensity of the neon glow applied to each letter when it is
   * hover/proximity-activated.
   * @default "normal"
   */
  hoverGlowIntensity?: OTGlowIntensity;

  /**
   * Color of the glow applied on hover/proximity activation.
   * Defaults to `hoverStrokeColor` (which in turn defaults to `strokeColor`).
   */
  hoverGlowColor?: OTColor;

  /**
   * Radius in pixels within which a letter is considered "near" the cursor
   * and transitions to the hover state individually.
   * Set `proximityEffect` to `false` to disable the per-letter behaviour and
   * fall back to whole-text hover instead.
   * @default 100
   */
  proximityRadius?: number;

  /**
   * Enable the per-letter proximity effect driven by cursor distance.
   * When `false`, hovering anywhere over the text activates all letters at once.
   * @default true
   */
  proximityEffect?: boolean;

  /**
   * Duration in milliseconds for the color/glow transition on each letter.
   * @default 200
   */
  transitionDuration?: number;
}

// ---- Component -------------------------------------------

export default function OutlineText({
  children,
  strokeColor = "cyan",
  fillColor = "transparent",
  strokeWidth = 1,
  fontSize = "3rem",
  hoverStrokeColor,
  hoverFillColor,
  hoverGlowIntensity = "normal",
  hoverGlowColor,
  proximityRadius = 100,
  proximityEffect = true,
  transitionDuration = 200,
  className = "",
  ...rest
}: OutlineTextProps) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const resolvedStroke = resolveColor(strokeColor);
  const resolvedHoverStroke = resolveColor(hoverStrokeColor ?? strokeColor);
  const resolvedFill = fillColor;
  const resolvedHoverFill = hoverFillColor ?? fillColor;
  const glowColorResolved = resolveColor(
    hoverGlowColor ?? hoverStrokeColor ?? strokeColor,
  );
  const glowValue = buildGlow(glowColorResolved, hoverGlowIntensity);

  const transition = `color ${transitionDuration}ms ease, -webkit-text-stroke-color ${transitionDuration}ms ease, text-shadow ${transitionDuration}ms ease`;

  const chars = children.split("");

  // Keep refs array in sync with char count
  useEffect(() => {
    letterRefs.current = letterRefs.current.slice(0, chars.length);
  }, [chars.length]);

  // ---- direct DOM helpers (avoid re-renders on mouse move) ----

  const applyDefault = useCallback(
    (span: HTMLSpanElement) => {
      span.style.color = resolvedFill;
      span.style.webkitTextStrokeColor = resolvedStroke;
      span.style.textShadow = "none";
    },
    [resolvedFill, resolvedStroke],
  );

  const applyActive = useCallback(
    (span: HTMLSpanElement) => {
      span.style.color = resolvedHoverFill;
      span.style.webkitTextStrokeColor = resolvedHoverStroke;
      span.style.textShadow = glowValue;
    },
    [resolvedHoverFill, resolvedHoverStroke, glowValue],
  );

  // Re-apply defaults when resolved colors change
  useEffect(() => {
    letterRefs.current.forEach((span) => {
      if (span) applyDefault(span);
    });
  }, [applyDefault]);

  // ---- Proximity mouse-move handler -----------------------

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (!proximityEffect) return;
      const { clientX, clientY } = e;
      letterRefs.current.forEach((span) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((clientX - cx) ** 2 + (clientY - cy) ** 2);
        if (dist <= proximityRadius) {
          applyActive(span);
        } else {
          applyDefault(span);
        }
      });
    },
    [proximityEffect, proximityRadius, applyActive, applyDefault],
  );

  // Whole-text hover (used when proximityEffect is false)
  const handleMouseEnter = useCallback(() => {
    if (proximityEffect) return;
    letterRefs.current.forEach((span) => {
      if (span) applyActive(span);
    });
  }, [proximityEffect, applyActive]);

  const handleMouseLeave = useCallback(() => {
    letterRefs.current.forEach((span) => {
      if (span) applyDefault(span);
    });
  }, [applyDefault]);

  // ---- Render ----------------------------------------------

  const fontSizeValue =
    typeof fontSize === "number" ? `${fontSize}px` : fontSize;

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        fontSize: fontSizeValue,
        cursor: "default",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          style={{
            display: "inline-block",
            color: resolvedFill,
            WebkitTextStroke: `${strokeWidth}px ${resolvedStroke}`,
            textShadow: "none",
            transition,
            // Preserve whitespace width
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
