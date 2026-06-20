"use client";

import React from "react";
import "./progress-bar.css";

// ── Types ─────────────────────────────────────────────────────────────────────

export type PBColor = "cyan" | "pink" | "green" | (string & {});
export type PBVariant = "solid" | "segmented" | "striped" | "pulse";
export type PBSize = "xs" | "sm" | "md" | "lg";

export interface ProgressBarProps {
  /** Current value (0–max). */
  value: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Neon accent color. @default "cyan" */
  color?: PBColor;
  /** Visual variant. @default "solid" */
  variant?: PBVariant;
  /** Bar height preset. @default "md" */
  size?: PBSize;
  /** Show a percentage label. @default false */
  showLabel?: boolean;
  /** Custom label text (overrides the auto %). */
  label?: string;
  /** Show glow effect on the filled bar. @default true */
  glow?: boolean;
  /** Additional className on the outer wrapper. */
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};
function resolveColor(c: PBColor): string {
  return PRESETS[c] ?? c;
}

const SIZE_H: Record<PBSize, number> = { xs: 3, sm: 5, md: 8, lg: 12 };

// ── Component ─────────────────────────────────────────────────────────────────

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = "cyan",
  variant = "solid",
  size = "md",
  showLabel = false,
  label,
  glow = true,
  className = "",
}) => {
  const accent = resolveColor(color);
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const displayLabel = label ?? `${Math.round(pct)}%`;
  const h = SIZE_H[size];

  return (
    <div
      className={`pb-wrapper ${className}`}
      style={{ "--pb-accent": accent } as React.CSSProperties}
    >
      {showLabel && (
        <div className="pb-label-row">
          <span className="pb-label-text">{displayLabel}</span>
        </div>
      )}

      {/* Track */}
      <div
        className="pb-track"
        style={{ height: h }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={displayLabel}
      >
        {/* Filled bar */}
        <div
          className={`pb-fill pb-variant-${variant}${glow && variant !== "pulse" ? " pb-glow" : ""}`}
          style={{ width: `${pct}%` }}
        />

        {/* Segmented dividers (only for segmented variant) */}
        {variant === "segmented" && (
          <div className="pb-segments" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="pb-segment-divider"
                style={{ left: `${(i + 1) * 10}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
