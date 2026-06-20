"use client";

import React from "react";
import "./arrow-loader.css";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ALColor = "cyan" | "pink" | "green" | (string & {});

export interface ArrowLoaderProps {
  /** Neon accent color. @default "cyan" */
  color?: ALColor;
  /** Bar height in pixels. @default 8 */
  height?: number;
  /** Pixel width of each individual ">" arrow. @default 10 */
  arrowSize?: number;
  /** Pixel gap between arrows. @default 8 */
  gap?: number;
  /** SVG stroke width (arrow thickness). @default 2.5 */
  thickness?: number;
  /** Animation cycle duration in ms — lower = faster. @default 450 */
  speed?: number;
  /** Background color of the track strip. @default "rgba(255,255,255,0.06)" */
  trackColor?: string;
  /** Additional className on the wrapper. */
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};
function resolveColor(c: ALColor): string {
  return COLOR_PRESETS[c] ?? c;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const ArrowLoader: React.FC<ArrowLoaderProps> = ({
  color = "cyan",
  height = 8,
  arrowSize = 10,
  gap = 8,
  thickness = 2.5,
  speed = 450,
  trackColor = "rgba(255,255,255,0.06)",
  className = "",
}) => {
  const accent = resolveColor(color);
  const h = height;
  const tileSize = arrowSize + gap;

  // Build an SVG ">" chevron data URL using the resolved accent color.
  // The viewBox is tileSize × 20; background-size scales height to 100% of the bar.
  const halfGap = gap / 2;
  // Square viewBox keeps the ">" aspect ratio consistent regardless of arrowSize.
  const py0 = tileSize * 0.1;
  const pyMid = tileSize * 0.5;
  const py1 = tileSize * 0.9;
  const svgPath = `M${halfGap} ${py0} L${tileSize - halfGap} ${pyMid} L${halfGap} ${py1}`;
  const svgUrl = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${tileSize}' height='${tileSize}' viewBox='0 0 ${tileSize} ${tileSize}'><path d='${svgPath}' stroke='${accent}' stroke-width='${thickness}' fill='none' stroke-linecap='butt' stroke-linejoin='miter'/></svg>`,
  )}")`;

  return (
    <div
      className={`al-wrapper ${className}`}
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      style={
        {
          "--al-tile": `${tileSize}px`,
          "--al-speed": `${speed}ms`,
        } as React.CSSProperties
      }
    >
      <div className="al-track" style={{ height: h, background: trackColor }}>
        <div
          className="al-fill"
          style={{
            backgroundImage: svgUrl,
            backgroundSize: `${tileSize}px 100%`,
          }}
        />
      </div>
    </div>
  );
};

export default ArrowLoader;
