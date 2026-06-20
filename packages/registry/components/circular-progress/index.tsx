"use client";

import React from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type CPColor = "cyan" | "pink" | "green" | (string & {});
export type CPSize = "sm" | "md" | "lg" | "xl";

export interface CircularProgressProps {
  /** Current value (0–max). */
  value: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Neon accent color. @default "cyan" */
  color?: CPColor;
  /** Size preset. @default "md" */
  size?: CPSize;
  /** Stroke width in px. @default auto from size */
  strokeWidth?: number;
  /** Show the percentage value in the center. @default true */
  showValue?: boolean;
  /** Custom center label (replaces the auto %). */
  centerLabel?: string;
  /** Sub-label below the value. */
  subLabel?: string;
  /** Neon glow intensity. @default "medium" */
  glowIntensity?: "none" | "low" | "medium" | "high";
  /** Additional className on the outer wrapper. */
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};
function resolveColor(c: CPColor): string {
  return PRESETS[c] ?? c;
}

const SIZE_PX: Record<CPSize, number> = { sm: 72, md: 100, lg: 140, xl: 180 };
const STROKE_PX: Record<CPSize, number> = { sm: 5, md: 7, lg: 9, xl: 11 };
const VAL_FS: Record<CPSize, number> = { sm: 14, md: 20, lg: 28, xl: 36 };
const SUB_FS: Record<CPSize, number> = { sm: 7, md: 9, lg: 11, xl: 13 };

const GLOW_FILTER: Record<string, string> = {
  none: "",
  low: "drop-shadow(0 0 3px {c})",
  medium: "drop-shadow(0 0 6px {c}) drop-shadow(0 0 12px {c}66)",
  high: "drop-shadow(0 0 10px {c}) drop-shadow(0 0 22px {c}88)",
};

// ── Component ─────────────────────────────────────────────────────────────────

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  color = "cyan",
  size = "md",
  strokeWidth,
  showValue = true,
  centerLabel,
  subLabel,
  glowIntensity = "medium",
  className = "",
}) => {
  const accent = resolveColor(color);
  const diameter = SIZE_PX[size];
  const sw = strokeWidth ?? STROKE_PX[size];
  const radius = (diameter - sw) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const offset = circumference - (pct / 100) * circumference;
  const valFs = VAL_FS[size];
  const subFs = SUB_FS[size];

  const glowFilter = GLOW_FILTER[glowIntensity]?.replace(/{c}/g, accent) ?? "";
  const displayVal = centerLabel ?? `${Math.round(pct)}%`;

  return (
    <div
      className={`cp-wrapper ${className}`}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: diameter,
        height: diameter,
      }}
    >
      <svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        overflow="visible"
        style={{ transform: "rotate(-90deg)", position: "absolute", inset: 0 }}
        aria-hidden="true"
      >
        {/* Track ring */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={`${accent}18`}
          strokeWidth={sw}
        />

        {/* Filled arc */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={accent}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: glowFilter,
          }}
        />

        {/* Tick mark at 0% start of arc */}
        <circle
          cx={diameter / 2 + radius}
          cy={diameter / 2}
          r={sw / 2.5}
          fill={accent}
          style={{ filter: glowFilter }}
        />
      </svg>

      {/* Center text */}
      {showValue && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-orbitron, monospace)",
              fontSize: valFs,
              fontWeight: 700,
              color: accent,
              filter: glowFilter,
              lineHeight: 1,
            }}
          >
            {displayVal}
          </span>
          {subLabel && (
            <span
              style={{
                fontFamily: "var(--font-orbitron, monospace)",
                fontSize: subFs,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
                marginTop: 4,
                textTransform: "uppercase",
              }}
            >
              {subLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
