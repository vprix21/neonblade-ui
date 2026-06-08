"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./neon-line-chart.css";

// ── Types ───────────────────────────────────────────────────────────────────

export type NLCColor = "cyan" | "pink" | "green" | (string & {});

export type NLCSeries = {
  /** Key in each data object to read the value from. */
  dataKey: string;
  /** Display label shown in legend / tooltip. */
  label?: string;
  /** Neon color preset or any CSS hex color. */
  color?: NLCColor;
};

export type NLCDataPoint = Record<string, string | number>;

export interface NeonLineChartProps {
  /** Array of data objects keyed by xAxisKey + series dataKeys. */
  data: NLCDataPoint[];
  /**
   * One or more series to render.
   * Single series shorthand: omit `series` and use `dataKey` + `color` directly.
   */
  series?: NLCSeries[];
  /** Shorthand dataKey when using a single series. @default "value" */
  dataKey?: string;
  /** Shorthand color when using a single series. @default "cyan" */
  color?: NLCColor;
  /** Shorthand label when using a single series. */
  label?: string;
  /** Key in data used for the X axis labels. @default "name" */
  xAxisKey?: string;
  /** Chart height in px. @default 260 */
  height?: number;
  /** Show filled area under each line. @default true */
  area?: boolean;
  /** Show dot markers on each data point. @default false */
  dots?: boolean;
  /** Show a subtle grid. @default true */
  grid?: boolean;
  /** Show the legend. @default false */
  legend?: boolean;
  /** Line stroke width in px. @default 2 */
  strokeWidth?: number;
  /** Glow intensity of the line. @default "medium" */
  glowIntensity?: "none" | "low" | "medium" | "high";
  /** Curve interpolation type. @default "monotone" */
  curve?: "monotone" | "linear" | "step" | "stepAfter" | "stepBefore" | "basis";
  /** Show Y-axis labels. @default true */
  showYAxis?: boolean;
  /** Show X-axis labels. @default true */
  showXAxis?: boolean;
  /** Additional className on the wrapper div. */
  className?: string;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

const PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

function resolveColor(c: NLCColor): string {
  return PRESETS[c] ?? c;
}

const GLOW_MAP: Record<string, number> = {
  none: 0,
  low: 4,
  medium: 8,
  high: 16,
};

// ── Custom Tooltip ───────────────────────────────────────────────────────────

type TooltipPayloadEntry = {
  color?: string;
  name?: string;
  value?: number | string;
};
type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
  primaryColor: string;
};

function NeonTooltip(props: CustomTooltipProps) {
  const { active, payload, label, primaryColor } = props;
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="nlc-tooltip-outer"
      style={{ "--nlc-color": primaryColor } as React.CSSProperties}
    >
      <div className="nlc-tooltip-inner">
        <div className="nlc-tooltip-label">{label as string}</div>
        {payload.map(
          (
            entry: { color?: string; name?: string; value?: number | string },
            i: number,
          ) => (
            <div key={i} className="nlc-tooltip-row">
              <span
                className="nlc-tooltip-dot"
                style={{ background: entry.color as string }}
              />
              {payload.length > 1 && (
                <span className="nlc-tooltip-name">{entry.name}</span>
              )}
              <span className="nlc-tooltip-value">
                {typeof entry.value === "number"
                  ? entry.value.toLocaleString()
                  : entry.value}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export const NeonLineChart: React.FC<NeonLineChartProps> = ({
  data,
  series,
  dataKey = "value",
  color = "cyan",
  label,
  xAxisKey = "name",
  height = 260,
  area = true,
  dots = false,
  grid = true,
  legend = false,
  strokeWidth = 2,
  glowIntensity = "medium",
  curve = "monotone",
  showYAxis = true,
  showXAxis = true,
  className = "",
}) => {
  // Normalize to series array
  const resolvedSeries: NLCSeries[] = series ?? [
    { dataKey, color, label: label ?? dataKey },
  ];

  const primaryColor = resolveColor(resolvedSeries[0]?.color ?? "cyan");
  const glowPx = GLOW_MAP[glowIntensity];

  // Unique gradient IDs per series
  const [uid] = useState(() => Math.random().toString(36).slice(2, 8));

  const ChartComponent = area ? AreaChart : LineChart;

  const axisStyle = {
    fill: "rgba(255,255,255,0.35)",
    fontSize: 11,
    fontFamily: "var(--font-orbitron, monospace)",
  };

  return (
    <div
      className={`nlc-wrapper ${className}`}
      style={{ width: "100%", height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent
          data={data}
          margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
        >
          {/* SVG defs — gradient fills per series */}
          <defs>
            {resolvedSeries.map((s, i) => {
              const c = resolveColor(s.color ?? "cyan");
              return (
                <linearGradient
                  key={i}
                  id={`nlc-grad-${uid}-${i}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={c} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={c} stopOpacity={0.02} />
                </linearGradient>
              );
            })}
          </defs>

          {grid && (
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(0,243,255,0.07)"
              vertical={false}
            />
          )}

          {showXAxis && (
            <XAxis
              dataKey={xAxisKey}
              tick={axisStyle}
              axisLine={{ stroke: "rgba(0,243,255,0.15)" }}
              tickLine={false}
            />
          )}

          {showYAxis && (
            <YAxis
              tick={axisStyle}
              axisLine={{ stroke: "rgba(0,243,255,0.12)" }}
              tickLine={false}
              width={36}
            />
          )}

          <Tooltip
            content={<NeonTooltip primaryColor={primaryColor} />}
            cursor={{
              stroke: "rgba(0,243,255,0.15)",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
            isAnimationActive={false}
          />

          {legend && (
            <Legend
              wrapperStyle={{
                fontFamily: "var(--font-orbitron, monospace)",
                fontSize: 10,
                color: "rgba(255,255,255,0.5)",
              }}
            />
          )}

          {resolvedSeries.map((s, i) => {
            const c = resolveColor(s.color ?? "cyan");
            const glowFilter =
              glowPx > 0 ? `drop-shadow(0 0 ${glowPx}px ${c})` : undefined;

            if (area) {
              return (
                <Area
                  key={i}
                  type={curve}
                  dataKey={s.dataKey}
                  name={s.label ?? s.dataKey}
                  stroke={c}
                  strokeWidth={strokeWidth}
                  fill={`url(#nlc-grad-${uid}-${i})`}
                  dot={dots ? { r: 3, fill: c, strokeWidth: 0 } : false}
                  activeDot={{
                    r: 5,
                    fill: c,
                    strokeWidth: 0,
                    style: { filter: `drop-shadow(0 0 6px ${c})` },
                  }}
                  style={{ filter: glowFilter }}
                />
              );
            }
            return (
              <Line
                key={i}
                type={curve}
                dataKey={s.dataKey}
                name={s.label ?? s.dataKey}
                stroke={c}
                strokeWidth={strokeWidth}
                dot={dots ? { r: 3, fill: c, strokeWidth: 0 } : false}
                activeDot={{
                  r: 5,
                  fill: c,
                  strokeWidth: 0,
                  style: { filter: `drop-shadow(0 0 6px ${c})` },
                }}
                style={{ filter: glowFilter }}
              />
            );
          })}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default NeonLineChart;
