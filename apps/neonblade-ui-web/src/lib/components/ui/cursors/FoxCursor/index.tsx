"use client";

import React, { useEffect, useRef } from "react";

// ---- Color presets ----------------------------------------

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

// ---- Glow sizes -------------------------------------------

const GLOW_PX: Record<string, number> = {
  none: 0,
  low: 3,
  medium: 6,
  high: 14,
};

// ---- Props interfaces -------------------------------------

export interface FoxCursorSVGProps {
  color?: string;
  size?: number;
  strokeWidth?: number;
  glowIntensity?: "none" | "low" | "medium" | "high";
  fillOpacity?: number;
}

export interface FoxCursorProps extends FoxCursorSVGProps {
  hideNativeCursor?: boolean;
  disabled?: boolean;
  containerRef?: React.RefObject<HTMLElement | null>;
}

// ---- FoxCursorSVG ----------------------------------------
// User's geometric fox face — exact original sketch coordinates.

export function FoxCursorSVG({
  color = "cyan",
  size = 64,
  strokeWidth = 2,
  glowIntensity = "medium",
  fillOpacity = 0,
}: FoxCursorSVGProps) {
  const resolvedColor = COLOR_PRESETS[color] ?? color;
  const glowPx = GLOW_PX[glowIntensity] ?? 6;

  // The user's original SVG spans x: 393.40–476.40, y: 167.80–250.80
  // Width ≈ 83, Height ≈ 83. We normalize to viewBox="0 0 100 100"
  // by offsetting: x -= 393.40, y -= 167.80, then scale / 83 * 100.
  // Key points after normalization (rounded):
  //
  // Coordinates are the user's original — preserved exactly.
  // viewBox maps to the bounding box of the original sketch.

  const svgStyle: React.CSSProperties =
    glowPx > 0
      ? { filter: `drop-shadow(0 0 ${glowPx}px ${resolvedColor})` }
      : {};

  const stroke = resolvedColor;
  const sw = strokeWidth;
  const fill = fillOpacity > 0 ? resolvedColor : "none";
  const fo = fillOpacity;

  return (
    <svg
      width={size}
      height={size}
      viewBox="394.00 168.00 83.00 82.80"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={svgStyle}
      aria-hidden="true"
    >
      {/* Optional translucent face fill */}
      {fillOpacity > 0 && (
        <polygon
          points="416.40,188.80 454.40,188.80 473.40,208.80 436.40,246.80 435.40,246.80 397.40,207.80"
          fill={fill}
          fillOpacity={fo * 0.25}
          stroke="none"
        />
      )}

      {/* Top bar */}
      <line
        x1="416.40"
        y1="188.80"
        x2="454.40"
        y2="188.80"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Left side: top-left → left jaw */}
      <line
        x1="416.40"
        y1="188.80"
        x2="398.40"
        y2="207.80"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Right side: top-right → right jaw */}
      <line
        x1="454.40"
        y1="188.80"
        x2="473.40"
        y2="208.80"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Left chin diagonal */}
      <line
        x1="397.40"
        y1="207.80"
        x2="435.40"
        y2="247.80"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Right chin diagonal */}
      <line
        x1="473.40"
        y1="208.80"
        x2="436.40"
        y2="246.80"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Vertical centre line */}
      <line
        x1="435.40"
        y1="246.80"
        x2="435.40"
        y2="188.80"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Right ear outer */}
      <line
        x1="474.00"
        y1="208.00"
        x2="462.00"
        y2="171.00"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Right ear inner */}
      <line
        x1="455.00"
        y1="188.00"
        x2="462.00"
        y2="171.00"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Left ear outer */}
      <line
        x1="397.00"
        y1="207.00"
        x2="410.00"
        y2="172.00"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Left ear inner */}
      <line
        x1="416.00"
        y1="188.00"
        x2="410.00"
        y2="172.00"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---- FoxCursor (cursor wrapper) ---------------------------

export function FoxCursor({
  color = "cyan",
  size = 64,
  strokeWidth = 2,
  glowIntensity = "medium",
  fillOpacity = 0,
  hideNativeCursor = true,
  disabled = false,
  containerRef,
}: FoxCursorProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contained = !!containerRef;

  useEffect(() => {
    if (disabled) return;

    if (contained && containerRef.current) {
      const el = containerRef.current;
      const onMove = (e: MouseEvent) => {
        if (!wrapperRef.current) return;
        const rect = el.getBoundingClientRect();
        wrapperRef.current.style.left = `${e.clientX - rect.left}px`;
        wrapperRef.current.style.top = `${e.clientY - rect.top}px`;
        wrapperRef.current.style.display = "";
      };
      const onLeave = () => {
        if (wrapperRef.current) wrapperRef.current.style.display = "none";
      };
      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    }

    const onMove = (e: MouseEvent) => {
      if (wrapperRef.current) {
        wrapperRef.current.style.left = `${e.clientX}px`;
        wrapperRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [disabled, contained, containerRef]);

  useEffect(() => {
    if (!hideNativeCursor || disabled) return;

    if (contained && containerRef?.current) {
      const attr = "data-fox-cursor-scope";
      const container = containerRef.current;
      container.setAttribute(attr, "");
      const style = document.createElement("style");
      style.textContent = `[${attr}], [${attr}] * { cursor: none !important }`;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
        container.removeAttribute(attr);
      };
    }

    const style = document.createElement("style");
    style.textContent = `*, *::before, *::after { cursor: none !important }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [hideNativeCursor, disabled, contained, containerRef]);

  if (disabled) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: contained ? "absolute" : "fixed",
        left: contained ? "-9999px" : "-100px",
        top: contained ? "-9999px" : "-100px",
        display: contained ? "none" : undefined,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 99999,
      }}
    >
      <FoxCursorSVG
        color={color}
        size={size}
        strokeWidth={strokeWidth}
        glowIntensity={glowIntensity}
        fillOpacity={fillOpacity}
      />
    </div>
  );
}

export default FoxCursor;
