"use client";

import React from "react";
import { NeonSparkline, type NSDataPoint } from "../NeonSparkline";
import "./stat-card.css";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SCColor = "cyan" | "pink" | "green" | (string & {});

export type SCTrend = "up" | "down" | "neutral";

export interface StatCardProps {
  /** The primary metric value displayed in large text. */
  value: string | number;
  /** Short label describing the metric. */
  label: string;
  /** Optional sub-label or unit appended after the value. */
  unit?: string;
  /**
   * Trend direction. Renders an arrow and colors the change text.
   * - "up"      → green arrow ▲
   * - "down"    → pink arrow ▼
   * - "neutral" → dash —
   */
  trend?: SCTrend;
  /** Text shown alongside the trend arrow (e.g. "+12.4%"). */
  change?: string;
  /** Secondary label next to the change text (e.g. "vs last week"). */
  changeLabel?: string;
  /**
   * Sparkline data. Each item needs at least a `value` number.
   * When provided, a mini sparkline is rendered at the bottom.
   */
  sparkData?: NSDataPoint[];
  /** Neon accent color. @default "cyan" */
  color?: SCColor;
  /** Icon element shown at the top-right of the card. */
  icon?: React.ReactNode;
  /** Background color override. @default "rgba(5,5,5,0.85)" */
  background?: string;
  /**
   * Neon glow intensity of the border and corner accents.
   * @default "medium"
   */
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
function resolveColor(c: SCColor): string {
  return PRESETS[c] ?? c;
}

const GLOW_SHADOW: Record<string, string> = {
  none: "none",
  low: "0 0 8px {c}33, inset 0 0 8px {c}0a",
  medium: "0 0 14px {c}44, inset 0 0 12px {c}10",
  high: "0 0 24px {c}66, inset 0 0 20px {c}1a",
};

function buildShadow(intensity: string, hex: string): string {
  if (intensity === "none") return "none";
  return GLOW_SHADOW[intensity]?.replace(/{c}/g, hex) ?? "none";
}

// ── Trend Icon ────────────────────────────────────────────────────────────────

function TrendArrow({ trend }: { trend: SCTrend }) {
  if (trend === "up") return <span className="sc-trend-up text-xs">▲</span>;
  if (trend === "down") return <span className="sc-trend-down text-xs">▼</span>;
  return <span className="sc-trend-neutral text-xs">—</span>;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  unit,
  trend,
  change,
  changeLabel,
  sparkData,
  color = "cyan",
  icon,
  background = "rgba(5,5,5,0.85)",
  glowIntensity = "medium",
  className = "",
}) => {
  const accent = resolveColor(color);
  const sparkColor = color as SCColor;

  const trendTextClass =
    trend === "up"
      ? "sc-trend-up"
      : trend === "down"
        ? "sc-trend-down"
        : "sc-trend-neutral";

  return (
    <div
      className={`sc-card ${className}`}
      style={
        {
          "--sc-accent": accent,
          background,
          border: `1px solid ${accent}33`,
          boxShadow: buildShadow(glowIntensity, accent),
          padding: "16px 18px 0 18px",
          borderRadius: 2,
          minWidth: 180,
        } as React.CSSProperties
      }
    >
      {/* Corner accents */}
      <div className="sc-corner" aria-hidden="true" />
      <div className="sc-corner-br" aria-hidden="true" />

      {/* Top row: label + icon */}
      <div className="relative z-10 flex items-start justify-between gap-2 mb-3">
        <span className="sc-label text-white/65" style={{ fontSize: 10 }}>
          {label}
        </span>
        {icon && (
          <span
            style={{
              color: accent,
              filter: `drop-shadow(0 0 5px ${accent})`,
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
        )}
      </div>

      {/* Value row */}
      <div className="relative z-10 flex items-end gap-1.5 mb-2">
        <span
          className="sc-value text-white"
          style={{
            fontSize: 28,
            fontWeight: 700,
            filter: `drop-shadow(0 0 8px ${accent}66)`,
          }}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {unit && (
          <span
            className="sc-label mb-1"
            style={{ fontSize: 12, color: accent, opacity: 0.7 }}
          >
            {unit}
          </span>
        )}
      </div>

      {/* Trend / change row */}
      {(trend || change) && (
        <div className="relative z-10 flex items-center gap-1.5 mb-3">
          {trend && <TrendArrow trend={trend} />}
          {change && (
            <span
              className={`${trendTextClass} text-xs font-mono font-semibold`}
            >
              {change}
            </span>
          )}
          {changeLabel && (
            <span className="text-white/60 text-xs">{changeLabel}</span>
          )}
        </div>
      )}

      {/* Sparkline — flush to bottom */}
      {sparkData && sparkData.length > 0 && (
        <div className="relative z-10 -mx-[18px] mt-1">
          <NeonSparkline
            data={sparkData}
            color={sparkColor}
            width="100%"
            height={52}
            strokeWidth={1.5}
            glowIntensity={glowIntensity}
            area
            tooltip={false}
          />
        </div>
      )}

      {/* Spacer when no sparkline */}
      {(!sparkData || sparkData.length === 0) && <div className="pb-4" />}
    </div>
  );
};

export default StatCard;
