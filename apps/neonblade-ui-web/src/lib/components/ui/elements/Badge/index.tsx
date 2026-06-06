"use client";

import React, { HTMLAttributes, ReactNode } from "react";
import "./badge.css";

// ---- Types -------------------------------------------------

export type BadgeColor = "cyan" | "pink" | "green" | (string & {});
export type BadgeSize = "xs" | "sm" | "md";
export type BadgeVariant = "solid" | "outline" | "ghost";
export type BadgeShape = "pill" | "rectangle" | "corner-cut";
export type BadgeCorner =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "all";
export type BadgeDot = "none" | "solid" | "pulse" | "flicker";

// ---- Maps --------------------------------------------------

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

const CORNER_CLIP: Record<BadgeCorner, string> = {
  "bottom-right": "bdg-clip-br",
  "bottom-left": "bdg-clip-bl",
  "top-right": "bdg-clip-tr",
  "top-left": "bdg-clip-tl",
  all: "bdg-clip-all",
};

// Size: padding + font-size + gap for inner badge content
const INNER_SIZE: Record<BadgeSize, string> = {
  xs: "px-2 py-0.5 text-[9px] gap-1",
  sm: "px-2.5 py-1 text-[10px] gap-[5px]",
  md: "px-3.5 py-[5px] text-[11px] gap-[6px]",
};

// Dot dimensions per badge size
const DOT_SIZE: Record<BadgeSize, string> = {
  xs: "w-[5px] h-[5px]",
  sm: "w-[6px] h-[6px]",
  md: "w-[7px] h-[7px]",
};

// ---- Component props ---------------------------------------

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  color?: BadgeColor;
  variant?: BadgeVariant;
  shape?: BadgeShape;
  corner?: BadgeCorner;
  cornerSize?: number;
  dot?: BadgeDot;
  glow?: boolean;
  size?: BadgeSize;
}

// ---- Component ---------------------------------------------

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = "cyan",
  variant = "outline",
  shape = "pill",
  corner = "bottom-right",
  cornerSize = 8,
  dot = "none",
  glow = false,
  size = "sm",
  className = "",
  style,
  ...props
}) => {
  const resolvedColor = COLOR_PRESETS[color] ?? color;
  const clipClass = shape === "corner-cut" ? CORNER_CLIP[corner] : "";
  const roundedClass = shape === "pill" ? "rounded-full" : "";

  // Border frame: 1px ring on all edges including diagonal
  const frameClass = [
    "absolute inset-0 pointer-events-none z-0",
    roundedClass,
    clipClass,
    variant === "outline" ? "bg-[var(--bdg-color)]" : "bg-white/[0.08]",
  ]
    .filter(Boolean)
    .join(" ");

  // Inner badge content
  const innerClass = [
    "relative z-[1] inline-flex items-center font-orbitron font-bold tracking-[0.1em] uppercase whitespace-nowrap select-none leading-none",
    INNER_SIZE[size],
    roundedClass,
    clipClass,
    variant === "solid"
      ? "bg-[var(--bdg-color)] text-black"
      : variant === "outline"
        ? "bg-black text-[var(--bdg-color)]"
        : "text-[var(--bdg-color)]",
    glow ? "bdg-glow" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Ghost variant needs color-mix background (not expressible in Tailwind)
  const ghostStyle =
    variant === "ghost"
      ? {
          backgroundColor:
            "color-mix(in srgb, var(--bdg-color) 12%, #000)",
        }
      : undefined;

  const dotAnimClass =
    dot === "pulse"
      ? "bdg-dot-pulse"
      : dot === "flicker"
        ? "bdg-dot-flicker"
        : "";

  return (
    <span
      className={[
        "relative inline-flex p-px align-middle",
        roundedClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--bdg-color": resolvedColor,
          "--bdg-corner-size": `${cornerSize}px`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Border frame */}
      <span className={frameClass} aria-hidden="true" />

      {/* Inner content */}
      <span className={innerClass} style={ghostStyle}>
        {dot !== "none" && (
          <span
            className={[
              "rounded-full bg-[var(--bdg-color)] inline-block shrink-0",
              DOT_SIZE[size],
              dotAnimClass,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    </span>
  );
};

export default Badge;
