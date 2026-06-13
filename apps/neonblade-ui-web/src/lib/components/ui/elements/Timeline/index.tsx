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
    "relative flex flex-col",
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
          "border-2 text-[var(--tl-color)] border-[var(--tl-color)] bg-[#0a0a0a] flex items-center justify-center transition-[box-shadow] duration-300",
          "w-[var(--tl-dot-size)] h-[var(--tl-dot-size)] text-[11px]",
          dotStyle === "circle"
            ? "rounded-full"
            : dotStyle === "square"
              ? "rounded-[2px]"
              : "rounded-[2px] rotate-45",
          item.active ? "tl-dot-active" : "",
        ]
          .filter(Boolean)
          .join(" ");

        const dotWrapClasses = [
          dotAnim === "pulse" ? "tl-dot-pulse" : "",
          "shrink-0 flex items-center justify-center relative z-[1]",
          align === "alternate"
            ? "absolute left-1/2 -translate-x-1/2 mt-0.5"
            : "mt-0.5",
        ]
          .filter(Boolean)
          .join(" ");

        const itemClasses = [
          "relative flex items-start gap-4 pb-8 last:pb-0",
          align === "right" ? "flex-row-reverse" : "",
        ]
          .filter(Boolean)
          .join(" ");

        const isAlternate = align === "alternate";
        const contentClasses = [
          "flex-1 flex flex-col gap-1 min-w-0 pt-px",
          isAlternate && idx % 2 === 0 ? "pr-[calc(50%+24px)]" : "",
          isAlternate && idx % 2 !== 0
            ? "pl-[calc(50%+24px)] text-right items-end"
            : "",
        ]
          .filter(Boolean)
          .join(" ");

        const titleClasses = [
          "font-semibold text-white leading-[1.3] font-orbitron tracking-[0.04em]",
          variant === "minimal" ? "text-[0.8rem]" : "text-sm",
        ].join(" ");

        const descClasses = [
          "text-white/45 leading-[1.55]",
          variant === "minimal" ? "text-[0.73rem]" : "text-[0.8rem]",
        ].join(" ");

        return (
          <div key={idx} className={itemClasses}>
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
            <div className={contentClasses}>
              <div
                className={
                  variant === "glow" || variant === "stepped" ? "tl-card" : ""
                }
              >
                {item.date && (
                  <p className="tl-date font-orbitron text-[0.65rem] tracking-[0.1em] uppercase text-[var(--tl-color)] opacity-70 mb-0.5">
                    {item.date}
                  </p>
                )}
                <p className={titleClasses}>{item.title}</p>
                {item.description && (
                  <p className={descClasses}>{item.description}</p>
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
