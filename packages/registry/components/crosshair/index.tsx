"use client";

import React, { useEffect, useRef } from "react";
import "./crosshair.css";

// ---- Color presets -----------------------------------------

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

// ---- Glow sizes --------------------------------------------

const GLOW_PX: Record<string, number> = {
  none: 0,
  low: 3,
  medium: 6,
  high: 14,
};

// ---- Shared visual props -----------------------------------

export interface CrosshairVisualProps {
  color?: string;
  outerSize?: number;
  innerSize?: number;
  outerThickness?: number;
  innerThickness?: number;
  arcGap?: number;
  outerSpeed?: number;
  innerSpeed?: number;
  crosshairSize?: number;
  crosshairGap?: number;
  crosshairThickness?: number;
  glowIntensity?: "none" | "low" | "medium" | "high";
}

// ---- CrosshairSVG -----------------------------------------
// Pure SVG render — no mouse tracking, no fixed positioning.
// Useful for previews and documentation.

export interface CrosshairSVGProps extends CrosshairVisualProps {
  /**
   * When true, rings spin via CSS keyframe animation.
   * When false, rings are frozen at outerAngle / innerAngle.
   * @default false
   */
  animated?: boolean;
  /** Outer ring rotation in degrees when not animated. @default 30 */
  outerAngle?: number;
  /** Inner ring rotation in degrees when not animated. @default -45 */
  innerAngle?: number;
}

export function CrosshairSVG({
  color = "cyan",
  outerSize = 44,
  innerSize = 26,
  outerThickness = 2,
  innerThickness = 1.5,
  arcGap = 0.3,
  outerSpeed = 3,
  innerSpeed = 2,
  crosshairSize = 7,
  crosshairGap = 3,
  crosshairThickness = 1,
  glowIntensity = "medium",
  animated = false,
  outerAngle = 30,
  innerAngle = -45,
}: CrosshairSVGProps) {
  const resolvedColor = COLOR_PRESETS[color] ?? color;
  const glowPx = GLOW_PX[glowIntensity] ?? 6;

  const pad = Math.ceil(outerThickness) + 4;
  const svgSize = outerSize + pad * 2;
  const cx = svgSize / 2;
  const cy = svgSize / 2;

  const outerR = outerSize / 2;
  const innerR = innerSize / 2;

  const outerCirc = 2 * Math.PI * outerR;
  const innerCirc = 2 * Math.PI * innerR;
  const outerVisible = (1 - arcGap) * outerCirc;
  const innerVisible = (1 - arcGap) * innerCirc;

  const outerStyle: React.CSSProperties = animated
    ? {
        transformOrigin: `${cx}px ${cy}px`,
        animation: `crosshair-cw ${outerSpeed}s linear infinite`,
      }
    : {
        transformOrigin: `${cx}px ${cy}px`,
        transform: `rotate(${outerAngle}deg)`,
      };

  const innerStyle: React.CSSProperties = animated
    ? {
        transformOrigin: `${cx}px ${cy}px`,
        animation: `crosshair-ccw ${innerSpeed}s linear infinite`,
      }
    : {
        transformOrigin: `${cx}px ${cy}px`,
        transform: `rotate(${innerAngle}deg)`,
      };

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      style={
        glowPx > 0
          ? { filter: `drop-shadow(0 0 ${glowPx}px ${resolvedColor})` }
          : undefined
      }
    >
      <g style={outerStyle}>
        <circle
          cx={cx}
          cy={cy}
          r={outerR}
          stroke={resolvedColor}
          strokeWidth={outerThickness}
          strokeDasharray={`${outerVisible} ${outerCirc}`}
          strokeLinecap="round"
        />
      </g>
      <g style={innerStyle}>
        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          stroke={resolvedColor}
          strokeWidth={innerThickness}
          strokeDasharray={`${innerVisible} ${innerCirc}`}
          strokeLinecap="round"
        />
      </g>
      <line
        x1={cx}
        y1={cy - crosshairGap}
        x2={cx}
        y2={cy - crosshairGap - crosshairSize}
        stroke={resolvedColor}
        strokeWidth={crosshairThickness}
        strokeLinecap="round"
      />
      <line
        x1={cx}
        y1={cy + crosshairGap}
        x2={cx}
        y2={cy + crosshairGap + crosshairSize}
        stroke={resolvedColor}
        strokeWidth={crosshairThickness}
        strokeLinecap="round"
      />
      <line
        x1={cx - crosshairGap}
        y1={cy}
        x2={cx - crosshairGap - crosshairSize}
        y2={cy}
        stroke={resolvedColor}
        strokeWidth={crosshairThickness}
        strokeLinecap="round"
      />
      <line
        x1={cx + crosshairGap}
        y1={cy}
        x2={cx + crosshairGap + crosshairSize}
        y2={cy}
        stroke={resolvedColor}
        strokeWidth={crosshairThickness}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={1.2} fill={resolvedColor} />
    </svg>
  );
}

// ---- Crosshair props -------------------------------------

export interface CrosshairProps extends CrosshairVisualProps {
  /**
   * When true, hides the native OS cursor while the component is mounted.
   * Ignored when containerRef is provided.
   * @default true
   */
  hideNativeCursor?: boolean;

  /**
   * Completely disables the custom cursor.
   * @default false
   */
  disabled?: boolean;

  /**
   * When provided, the cursor is contained within this element:
   * it uses `position: absolute`, tracks mouse relative to the container,
   * and hides when the mouse leaves.
   * The container must have `position: relative` and `overflow: hidden`.
   */
  containerRef?: React.RefObject<HTMLElement | null>;
}

// ---- Crosshair component ----------------------------------

export function Crosshair({
  color = "cyan",
  outerSize = 44,
  innerSize = 26,
  outerThickness = 2,
  innerThickness = 1.5,
  arcGap = 0.3,
  outerSpeed = 3,
  innerSpeed = 2,
  crosshairSize = 7,
  crosshairGap = 3,
  crosshairThickness = 1,
  glowIntensity = "medium",
  hideNativeCursor = true,
  disabled = false,
  containerRef,
}: CrosshairProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contained = !!containerRef;

  // Track mouse position — bypass React state for smooth perf
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

  // Inject a style tag that suppresses the native cursor on ALL elements
  // (higher specificity than the browser's built-in cursor: pointer on <a>/<button>)
  useEffect(() => {
    if (!hideNativeCursor || disabled) return;

    if (contained && containerRef?.current) {
      // Scoped to container — assign a unique attribute for the selector
      const attr = "data-crosshair-scope";
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

  const pad = Math.ceil(outerThickness) + 4;
  const svgSize = outerSize + pad * 2;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: contained ? "absolute" : "fixed",
        left: contained ? "-9999px" : "-100px",
        top: contained ? "-9999px" : "-100px",
        display: contained ? "none" : undefined,
        width: svgSize,
        height: svgSize,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 99999,
      }}
    >
      <CrosshairSVG
        color={color}
        outerSize={outerSize}
        innerSize={innerSize}
        outerThickness={outerThickness}
        innerThickness={innerThickness}
        arcGap={arcGap}
        outerSpeed={outerSpeed}
        innerSpeed={innerSpeed}
        crosshairSize={crosshairSize}
        crosshairGap={crosshairGap}
        crosshairThickness={crosshairThickness}
        glowIntensity={glowIntensity}
        animated
      />
    </div>
  );
}

export default Crosshair;
