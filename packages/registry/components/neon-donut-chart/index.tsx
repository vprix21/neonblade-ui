"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// ── Types ────────────────────────────────────────────────────────────────────

export type NDCColor = "cyan" | "pink" | "green" | (string & {});

export type NDCSegment = {
  /** Display label for this segment. */
  name: string;
  /** Numeric value. */
  value: number;
  /** Neon color preset or any CSS hex. Falls back to auto palette. */
  color?: NDCColor;
};

export interface NeonDonutChartProps {
  /** Segments to render. */
  data: NDCSegment[];
  /** Chart height in px. @default 260 */
  height?: number;
  /** Inner hole radius as a percentage string. @default "62%" */
  innerRadius?: string | number;
  /** Outer ring radius as a percentage string. @default "88%" */
  outerRadius?: string | number;
  /** Neon glow intensity on the ring. @default "medium" */
  glowIntensity?: "none" | "low" | "medium" | "high";
  /** Gap between segments in degrees. @default 2 */
  paddingAngle?: number;
  /** Corner radius of each segment in px. @default 4 */
  cornerRadius?: number;
  /** Show a center label with name + value of the hovered segment (or total). */
  centerLabel?: boolean;
  /** Primary color — used as fallback and center label accent. @default "cyan" */
  color?: NDCColor;
  /** Show legend below the chart. @default false */
  legend?: boolean;
  /** Additional className on the wrapper div. */
  className?: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};
const AUTO_PALETTE = [
  "#00f3ff",
  "#ff00ff",
  "#39ff14",
  "#ff6600",
  "#a855f7",
  "#ffd700",
  "#ff2d78",
];

function resolveColor(c?: NDCColor, fallback?: string): string {
  if (!c) return fallback ?? "#00f3ff";
  return PRESETS[c] ?? c;
}

const GLOW_MAP: Record<string, number> = {
  none: 0,
  low: 4,
  medium: 8,
  high: 14,
};

// ── Custom Tooltip — two-layer corner-cut (ngcc pattern) ──────────────────────

type NDCTooltipProps = {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
    payload?: { fill?: string };
  }>;
  primaryColor: string;
};

function NeonTooltip(props: NDCTooltipProps) {
  const { active, payload, primaryColor } = props;
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0]!;
  const fill = entry.payload?.fill ?? primaryColor;

  return (
    <div
      style={{
        position: "relative",
        padding: "1px",
        background: fill,
        clipPath:
          "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
        boxShadow: `0 0 14px ${fill}66, 0 0 28px ${fill}30`,
        minWidth: 110,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(5,5,5,0.95)",
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%)",
          padding: "8px 12px",
          fontFamily: "var(--font-orbitron, monospace)",
          fontSize: 11,
          color: "#fff",
        }}
      >
        <div
          style={{
            color: fill,
            fontSize: 10,
            opacity: 0.65,
            marginBottom: 5,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {entry.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: fill,
              boxShadow: `0 0 5px ${fill}`,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontWeight: 700,
              color: fill,
              fontSize: 13,
              filter: `drop-shadow(0 0 4px ${fill})`,
            }}
          >
            {typeof entry.value === "number"
              ? entry.value.toLocaleString()
              : entry.value}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Center Overlay — HTML positioned absolutely over the chart ───────────────
// This avoids SVG clipping and gives full CSS layout control.

function CenterOverlay({
  activeIndex,
  data,
  primaryColor,
  total,
}: {
  activeIndex: number | null;
  data: NDCSegment[];
  primaryColor: string;
  total: number;
}) {
  const active = activeIndex !== null ? data[activeIndex] : null;
  const displayName = active?.name ?? "TOTAL";
  const displayValue = active?.value ?? total;
  const displayColor = active
    ? resolveColor(active.color, AUTO_PALETTE[0])
    : primaryColor;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        /* Sit in the center of the SVG canvas (chart fills 100% of the wrapper) */
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        /* Ensure the text is centred inside the donut hole, not over the ring */
        paddingBottom: 0,
      }}
    >
      {/* Name / label row */}
      <div
        style={{
          fontFamily: "var(--font-orbitron, monospace)",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          marginBottom: 4,
          maxWidth: "60%",
          textAlign: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {displayName}
      </div>

      {/* Value row */}
      <div
        style={{
          fontFamily: "var(--font-orbitron, monospace)",
          fontSize: 22,
          fontWeight: 700,
          color: displayColor,
          filter: `drop-shadow(0 0 8px ${displayColor})`,
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        {displayValue.toLocaleString()}
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export const NeonDonutChart: React.FC<NeonDonutChartProps> = ({
  data,
  height = 260,
  innerRadius = "62%",
  outerRadius = "88%",
  glowIntensity = "medium",
  paddingAngle = 2,
  cornerRadius = 4,
  centerLabel = true,
  color = "cyan",
  legend = false,
  className = "",
}) => {
  const primaryColor = resolveColor(color);
  const glowPx = GLOW_MAP[glowIntensity];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  // Assign colors
  const enriched = data.map((seg, i) => ({
    ...seg,
    fill: resolveColor(seg.color, AUTO_PALETTE[i % AUTO_PALETTE.length]),
  }));

  return (
    <div
      className={`ndc-wrapper ${className}`}
      style={{
        position:
          "relative" /* Required for the CenterOverlay absolute positioning */,
        width: "100%",
        height,
      }}
    >
      <style>{`
        .ndc-wrapper .recharts-tooltip-wrapper {
          transition: none !important;
          outline: none;
        }
      `}</style>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={enriched}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={paddingAngle}
            cornerRadius={cornerRadius}
            dataKey="value"
            stroke="none"
            /* Disable default labels (they render at 0,0 until first render) */
            label={false}
            labelLine={false}
            /* Disable entry animation — prevents tooltip appearing at wrong position */
            isAnimationActive={false}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {enriched.map((seg, i) => (
              <Cell
                key={i}
                fill={seg.fill}
                opacity={activeIndex !== null && activeIndex !== i ? 0.45 : 1}
                style={{
                  filter:
                    glowPx > 0
                      ? `drop-shadow(0 0 ${activeIndex === i ? glowPx * 1.6 : glowPx}px ${seg.fill})`
                      : undefined,
                  transition: "opacity 0.2s ease, filter 0.2s ease",
                  cursor: "pointer",
                }}
              />
            ))}
          </Pie>

          <Tooltip
            content={<NeonTooltip primaryColor={primaryColor} />}
            /* isAnimationActive must be false to prevent flying-tooltip bug */
            isAnimationActive={false}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* ── Center label — HTML overlay, no SVG clipping issues ── */}
      {centerLabel && (
        <CenterOverlay
          activeIndex={activeIndex}
          data={enriched}
          primaryColor={primaryColor}
          total={total}
        />
      )}

      {legend && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 16px",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {enriched.map((seg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-orbitron, monospace)",
                fontSize: 10,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: seg.fill,
                  display: "inline-block",
                  boxShadow: `0 0 6px ${seg.fill}`,
                  flexShrink: 0,
                }}
              />
              {seg.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NeonDonutChart;
