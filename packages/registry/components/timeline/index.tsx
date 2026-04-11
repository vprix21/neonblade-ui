"use client";

import React, { HTMLAttributes, ReactNode } from "react";
import "./timeline.css";

// ── Types ──────────────────────────────────────────────────────────────────────

/** Named color presets or any valid CSS color string */
export type TimelineColor = "cyan" | "pink" | "green" | (string & {});

/**
 * Visual style variant of the timeline:
 * - `default`  — bare line + dots, no card wrapper
 * - `glow`     — each item wrapped in a subtle neon-glow card
 * - `minimal`  — smaller dots/text, understated look
 * - `stepped`  — left-bordered block layout, hides the dot
 */
export type TimelineVariant = "default" | "glow" | "minimal" | "stepped";

/**
 * Connector line style:
 * - `solid`   — faint solid line
 * - `dashed`  — dashed/segmented line
 * - `glow`    — brightly glowing neon line
 * - `none`    — no line
 */
export type TimelineLineStyle = "solid" | "dashed" | "glow" | "none";

/**
 * Dot / node shape:
 * - `circle`   — circular node (default)
 * - `square`   — square node
 * - `diamond`  — 45° rotated square
 */
export type TimelineDotStyle = "circle" | "square" | "diamond";

/**
 * Dot animation overlay:
 * - `none`   — no extra animation
 * - `pulse`  — breathing glow
 * - `ping`   — expanding ring ping
 */
export type TimelineDotAnim = "none" | "pulse" | "ping";

/**
 * Content alignment relative to the connector line:
 * - `left`      — line on the far left, all content right of it
 * - `right`     — line on the far right, all content left of it
 * - `alternate` — content alternates left/right on each item (centered line)
 */
export type TimelineAlign = "left" | "right" | "alternate";

// ── Item shape ─────────────────────────────────────────────────────────────────

export interface TimelineItemData {
  /** Short date / time label shown above the title */
  date?: string;

  /** Main item heading */
  title: string;

  /** Supporting description */
  description?: string;

  /** Small corner-cut badge chip (e.g. "New", "v2.0") */
  badge?: string;

  /** Optional icon rendered inside the dot node */
  icon?: ReactNode;

  /**
   * Mark this item as the currently active/highlighted step.
   * Active dots are filled with the accent color.
   */
  active?: boolean;
}

// ── Component props ────────────────────────────────────────────────────────────

export interface TimelineProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Array of timeline items to render */
  items: TimelineItemData[];

  /**
   * Accent color — preset name or any CSS color value.
   * @default "cyan"
   */
  color?: TimelineColor;

  /**
   * Visual style variant.
   * @default "default"
   */
  variant?: TimelineVariant;

  /**
   * Connector line style.
   * @default "solid"
   */
  lineStyle?: TimelineLineStyle;

  /**
   * Node dot shape.
   * @default "circle"
   */
  dotStyle?: TimelineDotStyle;

  /**
   * Dot animation.
   * @default "none"
   */
  dotAnim?: TimelineDotAnim;

  /**
   * Content alignment.
   * @default "left"
   */
  align?: TimelineAlign;

  /**
   * Animate items in on mount with a staggered fade-slide.
   * @default false
   */
  animate?: boolean;
}

// ── Color presets ──────────────────────────────────────────────────────────────

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

function resolveColor(color: TimelineColor): string {
  return COLOR_PRESETS[color as string] ?? color;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Timeline({
  items,
  color = "cyan",
  variant = "default",
  lineStyle = "solid",
  dotStyle = "circle",
  dotAnim = "none",
  align = "left",
  animate = false,
  className = "",
  style,
  ...rest
}: TimelineProps) {
  const resolvedColor = resolveColor(color);

  const rootClasses = [
    "tl-root",
    `tl-variant-${variant}`,
    animate ? "tl-animate" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const lineClasses = ["tl-line", `tl-line-${lineStyle}`].join(" ");

  return (
    <div
      {...rest}
      className={rootClasses}
      data-align={align}
      style={{ "--tl-color": resolvedColor, ...style } as React.CSSProperties}
    >
      {/* Connector line */}
      {lineStyle !== "none" && <div className={lineClasses} />}

      {items.map((item, idx) => {
        const dotClasses = [
          "tl-dot",
          `tl-dot-${dotStyle}`,
          item.active ? "tl-dot-active" : "",
        ]
          .filter(Boolean)
          .join(" ");

        const dotWrapClasses = [
          "tl-dot-wrap",
          dotAnim === "pulse" ? "tl-dot-pulse" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div key={idx} className="tl-item">
            {/* Dot node */}
            <div className={dotWrapClasses}>
              <div className={dotClasses}>
                {item.icon && (
                  <span
                    style={{
                      transform:
                        dotStyle === "diamond" ? "rotate(-45deg)" : undefined,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </span>
                )}
                {dotAnim === "ping" && (
                  <span
                    className="tl-dot-ping-ring"
                    style={{
                      borderRadius:
                        dotStyle === "circle"
                          ? "50%"
                          : dotStyle === "square"
                            ? "2px"
                            : "2px",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="tl-content">
              <div
                className={
                  variant === "glow" || variant === "stepped" ? "tl-card" : ""
                }
              >
                {item.date && <p className="tl-date">{item.date}</p>}
                <p className="tl-title">{item.title}</p>
                {item.description && (
                  <p className="tl-desc">{item.description}</p>
                )}
                {item.badge && <span className="tl-badge">{item.badge}</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Timeline;
