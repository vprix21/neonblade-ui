"use client";

import React from "react";

// ── Color presets ─────────────────────────────────────────────
const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
  white: "#ffffff",
  orange: "#ff6a00",
};

// ── Types ─────────────────────────────────────────────────────
export type RainLoaderColor =
  | "cyan"
  | "pink"
  | "green"
  | "white"
  | "orange"
  | string;
export type RainLoaderSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

export interface RainLoaderProps {
  /** Accent color. Use a preset name or any CSS color value. */
  color?: RainLoaderColor;
  /** Overall size preset or explicit pixel height for the bars. */
  size?: RainLoaderSize;
  /** Full animation cycle duration in milliseconds. */
  duration?: number;
  /** Number of bars (2–8). */
  barCount?: number;
  /** Bar width as a fraction of bar height (0.04–0.25). */
  barWidthRatio?: number;
  /** Gap between bars in px. */
  gap?: number;
  /** Corner radius of each bar. */
  borderRadius?: number;
  /** Neon glow intensity (0 = none). */
  glowIntensity?: "none" | "low" | "medium" | "high";
  /** Extra className on the wrapper. */
  className?: string;
}

// ── Size lookup ───────────────────────────────────────────────
const SIZE_MAP: Record<string, number> = {
  xs: 24,
  sm: 36,
  md: 52,
  lg: 72,
  xl: 96,
};

function resolveSize(size: RainLoaderSize): number {
  if (typeof size === "number") return size;
  return SIZE_MAP[size] ?? SIZE_MAP.md;
}

const GLOW_MAP: Record<string, number> = {
  none: 0,
  low: 3,
  medium: 7,
  high: 16,
};

// ── Keyframe injection ────────────────────────────────────────
// We inject a global <style> once per session so we don't
// couple this component to any CSS file.

const STYLE_ID = "rain-loader-keyframes";

function ensureKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
@keyframes rain-bar-drop {
  /* 1. Start above, invisible */
  0% {
    transform: translateY(-120%);
    opacity: 0;
  }
  /* 2. Fade in while falling */
  8% {
    opacity: 1;
  }
  /* 3. Land at base */
  20% {
    transform: translateY(0%);
    opacity: 1;
  }
  /* 4. Hold at base (all bars visible together) */
  55% {
    transform: translateY(0%);
    opacity: 1;
  }
  /* 5. Fade out while falling away */
  62% {
    opacity: 0.6;
  }
  /* 6. Fallen below */
  72% {
    transform: translateY(130%);
    opacity: 0;
  }
  /* 7. Invisible until next cycle */
  100% {
    transform: translateY(130%);
    opacity: 0;
  }
}
`;
  document.head.appendChild(style);
}

// ── Component ─────────────────────────────────────────────────

export function RainLoader({
  color = "cyan",
  size = "md",
  duration = 1600,
  barCount = 4,
  barWidthRatio = 0.115,
  gap,
  borderRadius,
  glowIntensity = "medium",
  className = "",
}: RainLoaderProps) {
  const resolvedColor = COLOR_PRESETS[color] ?? color;
  const barHeight = resolveSize(size);
  const barWidth = Math.max(2, Math.round(barHeight * barWidthRatio));
  const resolvedGap = gap ?? Math.max(2, Math.round(barWidth * 0.7));
  const resolvedRadius =
    borderRadius ?? Math.max(1, Math.round(barWidth * 0.35));
  const clampedCount = Math.min(8, Math.max(2, barCount));
  const glowPx = GLOW_MAP[glowIntensity] ?? GLOW_MAP.medium;

  // Stagger: each bar delays by this many ms. Keep total stagger
  // comfortably inside the "enter" phase (first ~20% of cycle).
  const stagger = Math.round((duration * 0.17) / Math.max(1, clampedCount - 1));

  const containerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "flex-end",
    height: barHeight,
    gap: resolvedGap,
    overflow: "hidden",
    // Extra vertical padding so bars can travel above/below
    // without clipping on their parent.
    padding: `${barHeight * 0.2}px 2px`,
    boxSizing: "content-box",
  };

  const filter =
    glowPx > 0 ? `drop-shadow(0 0 ${glowPx}px ${resolvedColor})` : undefined;

  // Inject keyframes on first render
  if (typeof window !== "undefined") ensureKeyframes();

  return (
    <div
      className={`rain-loader ${className}`}
      style={containerStyle}
      role="status"
      aria-label="Loading"
    >
      {Array.from({ length: clampedCount }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "block",
            width: barWidth,
            height: barHeight,
            borderRadius: resolvedRadius,
            backgroundColor: resolvedColor,
            filter,
            flexShrink: 0,
            // Animation
            animation: `rain-bar-drop ${duration}ms ease-in-out ${i * stagger}ms infinite`,
            // Start above so bars don't flash at their base on mount
            transform: "translateY(-120%)",
            opacity: 0,
          }}
        />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default RainLoader;
