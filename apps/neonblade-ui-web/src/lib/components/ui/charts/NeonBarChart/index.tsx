"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./neon-bar-chart.css";

// ── Types ────────────────────────────────────────────────────────────────────

export type NBCColor = "cyan" | "pink" | "green" | (string & {});

export type NBCSeries = {
  dataKey: string;
  label?: string;
  color?: NBCColor;
};

export type NBCDataPoint = Record<string, string | number>;

export interface NeonBarChartProps {
  /** Array of data objects. */
  data: NBCDataPoint[];
  /**
   * One or more bar series. Omit and use `dataKey` + `color` for a single series.
   */
  series?: NBCSeries[];
  /** Shorthand dataKey for a single series. @default "value" */
  dataKey?: string;
  /** Shorthand color for a single series. @default "cyan" */
  color?: NBCColor;
  /** Shorthand label for a single series. */
  label?: string;
  /** Key used for the category axis labels. @default "name" */
  xAxisKey?: string;
  /** Chart height in px. @default 260 */
  height?: number;
  /** Bar orientation. @default "vertical" */
  layout?: "vertical" | "horizontal";
  /** Corner radius of each bar in px. @default 3 */
  radius?: number;
  /** Gap between bar groups (0–1 as fraction of category width). @default 0.35 */
  barGap?: number;
  /** Show a subtle grid. @default true */
  grid?: boolean;
  /** Show the legend. @default false */
  legend?: boolean;
  /** Show Y-axis labels. @default true */
  showYAxis?: boolean;
  /** Show X-axis labels. @default true */
  showXAxis?: boolean;
  /** Neon glow intensity on each bar. @default "medium" */
  glowIntensity?: "none" | "low" | "medium" | "high";
  /** When true each bar in a single-series chart gets its own sequential neon color. */
  multiColor?: boolean;
  /** Additional className on the wrapper div. */
  className?: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};
const MULTI_COLORS = [
  "#00f3ff",
  "#ff00ff",
  "#39ff14",
  "#ff6600",
  "#a855f7",
  "#ffd700",
];

function resolveColor(c: NBCColor): string {
  return PRESETS[c] ?? c;
}

const GLOW_MAP: Record<string, number> = {
  none: 0,
  low: 4,
  medium: 8,
  high: 16,
};

// ── Custom Tooltip ────────────────────────────────────────────────────────────

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
      className="nbc-tooltip-outer"
      style={{ "--nbc-color": primaryColor } as React.CSSProperties}
    >
      <div className="nbc-tooltip-inner">
        <div className="nbc-tooltip-label">{label as string}</div>
        {payload.map(
          (
            entry: { color?: string; name?: string; value?: number | string },
            i: number,
          ) => (
            <div key={i} className="nbc-tooltip-row">
              <span
                className="nbc-tooltip-dot"
                style={{ background: entry.color as string }}
              />
              {payload.length > 1 && (
                <span className="nbc-tooltip-name">{entry.name}</span>
              )}
              <span className="nbc-tooltip-value">
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

// ── Custom Bar Shape — flat-top with neon glow ────────────────────────────────

function NeonBarShape(props: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  radius?: number;
  glowPx?: number;
}) {
  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    fill = "#00f3ff",
    radius = 3,
    glowPx = 8,
  } = props;
  if (height <= 0) return null;
  const r = Math.min(radius, width / 2, height / 2);
  // Top-only rounded corners (cyber look)
  const d = `
    M ${x + r} ${y}
    L ${x + width - r} ${y}
    Q ${x + width} ${y} ${x + width} ${y + r}
    L ${x + width} ${y + height}
    L ${x} ${y + height}
    L ${x} ${y + r}
    Q ${x} ${y} ${x + r} ${y}
    Z
  `;
  return (
    <path
      d={d}
      fill={fill}
      fillOpacity={0.85}
      style={{
        filter: glowPx > 0 ? `drop-shadow(0 0 ${glowPx}px ${fill})` : undefined,
      }}
    />
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export const NeonBarChart: React.FC<NeonBarChartProps> = ({
  data,
  series,
  dataKey = "value",
  color = "cyan",
  label,
  xAxisKey = "name",
  height = 260,
  layout = "vertical",
  radius = 3,
  barGap = 0.35,
  grid = true,
  legend = false,
  showYAxis = true,
  showXAxis = true,
  glowIntensity = "medium",
  multiColor = false,
  className = "",
}) => {
  const resolvedSeries: NBCSeries[] = series ?? [
    { dataKey, color, label: label ?? dataKey },
  ];
  const primaryColor = resolveColor(resolvedSeries[0]?.color ?? "cyan");
  const glowPx = GLOW_MAP[glowIntensity];

  const isHorizontal = layout === "horizontal";

  const axisStyle = {
    fill: "rgba(255,255,255,0.35)",
    fontSize: 11,
    fontFamily: "var(--font-orbitron, monospace)",
  };

  return (
    <div
      className={`nbc-wrapper ${className}`}
      style={{ width: "100%", height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={isHorizontal ? "horizontal" : "vertical"}
          margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
          barCategoryGap={`${barGap * 100}%`}
        >
          <defs>
            {resolvedSeries.map((s, i) => {
              const c = resolveColor(s.color ?? "cyan");
              return (
                <linearGradient
                  key={i}
                  id={`nbc-grad-${i}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={c} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={c} stopOpacity={0.45} />
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
              dataKey={isHorizontal ? xAxisKey : undefined}
              type={isHorizontal ? "category" : "number"}
              tick={axisStyle}
              axisLine={{ stroke: "rgba(0,243,255,0.15)" }}
              tickLine={false}
            />
          )}

          {showYAxis && (
            <YAxis
              dataKey={isHorizontal ? undefined : xAxisKey}
              type={isHorizontal ? "number" : "category"}
              tick={axisStyle}
              axisLine={{ stroke: "rgba(0,243,255,0.12)" }}
              tickLine={false}
              width={isHorizontal ? 36 : 72}
            />
          )}

          <Tooltip
            content={<NeonTooltip primaryColor={primaryColor} />}
            cursor={{ fill: "rgba(0,243,255,0.04)" }}
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

          {resolvedSeries.map((s, si) => {
            const c = resolveColor(s.color ?? "cyan");
            return (
              <Bar
                key={si}
                dataKey={s.dataKey}
                name={s.label ?? s.dataKey}
                fill={`url(#nbc-grad-${si})`}
                shape={(shapeProps: unknown) => (
                  <NeonBarShape
                    {...(shapeProps as {
                      x?: number;
                      y?: number;
                      width?: number;
                      height?: number;
                    })}
                    fill={
                      multiColor && si === 0
                        ? (MULTI_COLORS[
                            data.indexOf(
                              shapeProps as {
                                value?: number;
                                name?: string;
                              } as NBCDataPoint,
                            ) % MULTI_COLORS.length
                          ] ?? c)
                        : c
                    }
                    radius={radius}
                    glowPx={glowPx}
                  />
                )}
              >
                {multiColor &&
                  resolvedSeries.length === 1 &&
                  data.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={MULTI_COLORS[idx % MULTI_COLORS.length]}
                    />
                  ))}
              </Bar>
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NeonBarChart;
