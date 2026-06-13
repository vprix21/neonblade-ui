"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// ── Types ─────────────────────────────────────────────────────────────────────

export type NSColor = "cyan" | "pink" | "green" | (string & {});

export type NSDataPoint = { value: number; [key: string]: unknown };

export interface NeonSparklineProps {
  /** Array of data points. Each must have a `value` number (or use `dataKey`). */
  data: NSDataPoint[];
  /** Key to read from each data point. @default "value" */
  dataKey?: string;
  /** Neon color preset or CSS hex. @default "cyan" */
  color?: NSColor;
  /** Width of the sparkline in px or '100%' for responsive. @default 120 */
  width?: number | string;
  /** Height of the sparkline in px. @default 40 */
  height?: number;
  /** Stroke width in px. @default 1.5 */
  strokeWidth?: number;
  /** Neon glow intensity. @default "medium" */
  glowIntensity?: "none" | "low" | "medium" | "high";
  /** Show filled gradient area. @default true */
  area?: boolean;
  /** Curve interpolation. @default "monotone" */
  curve?: "monotone" | "linear" | "step";
  /** Show a minimal dot tooltip on hover. @default true */
  tooltip?: boolean;
  /** Additional className on the wrapper span. */
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};
function resolveColor(c: NSColor): string {
  return PRESETS[c] ?? c;
}
const GLOW_MAP: Record<string, number> = { none: 0, low: 3, medium: 6, high: 12 };

// ── Minimal Tooltip ───────────────────────────────────────────────────────────

type SparkTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number | string }>;
  color: string;
};

function SparkTooltip(props: SparkTooltipProps) {
  const { active, payload, color } = props;
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  return (
    <div
      style={{
        position: "relative",
        padding: "1px",
        background: color,
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%)",
        boxShadow: `0 0 10px ${color}55`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(5,5,5,0.95)",
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
          padding: "3px 8px",
          fontSize: 10,
          fontFamily: "var(--font-orbitron, monospace)",
          color,
          fontWeight: 600,
          whiteSpace: "nowrap",
          filter: `drop-shadow(0 0 3px ${color})`,
        }}
      >
        {typeof val === "number" ? val.toLocaleString() : val}
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export const NeonSparkline: React.FC<NeonSparklineProps> = ({
  data,
  dataKey = "value",
  color = "cyan",
  width = 120,
  height = 40,
  strokeWidth = 1.5,
  glowIntensity = "medium",
  area = true,
  curve = "monotone",
  tooltip = true,
  className = "",
}) => {
  const resolvedColor = resolveColor(color);
  const glowPx = GLOW_MAP[glowIntensity];
  const [uid] = useState(() => Math.random().toString(36).slice(2, 8));

  return (
    <span
      className={className}
      style={{ display: "inline-block", width, height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <defs>
            <linearGradient id={`ns-grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={resolvedColor} stopOpacity={0.4} />
              <stop offset="95%" stopColor={resolvedColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>

          {tooltip && (
            <Tooltip
              content={<SparkTooltip color={resolvedColor} />}
              cursor={{ stroke: "rgba(255,255,255,0.12)", strokeWidth: 1 }}
              isAnimationActive={false}
            />
          )}

          <Area
            type={curve}
            dataKey={dataKey}
            stroke={resolvedColor}
            strokeWidth={strokeWidth}
            fill={area ? `url(#ns-grad-${uid})` : "transparent"}
            dot={false}
            activeDot={{
              r: 3,
              fill: resolvedColor,
              strokeWidth: 0,
              style: { filter: `drop-shadow(0 0 5px ${resolvedColor})` },
            }}
            style={{
              filter: glowPx > 0 ? `drop-shadow(0 0 ${glowPx}px ${resolvedColor})` : undefined,
            }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </span>
  );
};

export default NeonSparkline;
