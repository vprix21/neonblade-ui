"use client";

import React from "react";
import "./turbine-loader.css";

// ── Color presets ───────────────────────────────────────────────
const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
  white: "#ffffff",
  orange: "#ff6a00",
};

// ── Size presets ────────────────────────────────────────────────
const SIZE_MAP: Record<string, number> = {
  xs: 32,
  sm: 48,
  md: 72,
  lg: 96,
  xl: 128,
};

const GLOW_MAP: Record<string, number> = {
  none: 0,
  low: 4,
  medium: 10,
  high: 22,
};

// ── Types ───────────────────────────────────────────────────────
export type TurbineLoaderColor =
  | "cyan"
  | "pink"
  | "green"
  | "white"
  | "orange"
  | (string & {});

export type TurbineLoaderSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

export interface TurbineLoaderProps {
  /** Neon accent color. Use a preset name or any CSS color value. */
  color?: TurbineLoaderColor;
  /** Overall size preset or explicit pixel width/height. */
  size?: TurbineLoaderSize;
  /** Number of concentric turbine rings (1–4). @default 2 */
  ringCount?: number;
  /** Number of blades per ring (3–16). @default 8 */
  bladeCount?: number;
  /** Full rotation duration in milliseconds. @default 1800 */
  speed?: number;
  /** Rotation direction of the outer ring; inner rings alternate. @default "clockwise" */
  direction?: "clockwise" | "counter-clockwise";
  /** Neon glow intensity around the turbine. @default "medium" */
  glowIntensity?: "none" | "low" | "medium" | "high";
  /** Central hub radius as a fraction of the outer radius. @default 0.16 */
  hubSize?: number;
  /** Blade base width as a fraction of the ring thickness. @default 0.5 */
  bladeWidth?: number;
  /** Blade tip width as a fraction of the blade base width. @default 0.35 */
  bladeTaper?: number;
  /** Gap between rings as a fraction of the outer radius. @default 0.06 */
  ringGap?: number;
  /** Extra className on the wrapper. */
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────
function resolveColor(c: TurbineLoaderColor): string {
  return COLOR_PRESETS[c] ?? c;
}

function resolveSize(s: TurbineLoaderSize): number {
  if (typeof s === "number") return s;
  return SIZE_MAP[s] ?? SIZE_MAP.md;
}

// ── Component ─────────────────────────────────────────────────
export function TurbineLoader({
  color = "cyan",
  size = "md",
  ringCount = 2,
  bladeCount = 8,
  speed = 1800,
  direction = "clockwise",
  glowIntensity = "medium",
  hubSize = 0.16,
  bladeWidth = 0.5,
  bladeTaper = 0.35,
  ringGap = 0.06,
  className = "",
}: TurbineLoaderProps) {
  const accent = resolveColor(color);
  const sizePx = resolveSize(size);
  const rings = Math.min(4, Math.max(1, ringCount));
  const blades = Math.min(16, Math.max(3, bladeCount));
  const glowPx = GLOW_MAP[glowIntensity] ?? GLOW_MAP.medium;

  const viewBox = 100;
  const cx = viewBox / 2;
  const cy = viewBox / 2;
  const outerR = viewBox / 2 - 4;
  const hubR = Math.max(2, outerR * hubSize);
  const gapPx = outerR * ringGap;
  const available = outerR - hubR - gapPx * (rings - 1);
  const ringThickness = available / rings;

  const baseW = Math.max(1, ringThickness * bladeWidth);
  const tipW = Math.max(0.5, baseW * bladeTaper);

  const stepAngle = 360 / blades;

  return (
    <div
      className={`turbine-loader ${className}`}
      role="status"
      aria-label="Loading"
      style={{
        width: sizePx,
        height: sizePx,
        filter:
          glowPx > 0 ? `drop-shadow(0 0 ${glowPx}px ${accent})` : undefined,
      }}
    >
      <svg
        className="tl-svg"
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        aria-hidden="true"
      >
        {Array.from({ length: rings }, (_, ringIndex) => {
          const inner = hubR + ringIndex * (ringThickness + gapPx);
          const outer = inner + ringThickness;
          const reverse =
            direction === "counter-clockwise"
              ? ringIndex % 2 === 0
              : ringIndex % 2 === 1;

          return (
            <g
              key={ringIndex}
              className={`tl-ring ${reverse ? "tl-ring--reverse" : ""}`}
              style={{ "--tl-speed": `${speed}ms` } as React.CSSProperties}
            >
              {Array.from({ length: blades }, (_, i) => (
                <g key={i} transform={`rotate(${i * stepAngle} ${cx} ${cy})`}>
                  <path
                    d={`
                      M ${cx - baseW / 2} ${cy - inner}
                      L ${cx + baseW / 2} ${cy - inner}
                      L ${cx + tipW / 2} ${cy - outer}
                      L ${cx - tipW / 2} ${cy - outer}
                      Z
                    `}
                    fill={accent}
                    fillOpacity={0.22}
                    stroke={accent}
                    strokeWidth={0.6}
                    strokeLinejoin="round"
                  />
                </g>
              ))}
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={hubR} fill={accent} fillOpacity={0.95} />
      </svg>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default TurbineLoader;
