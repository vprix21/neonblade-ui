"use client";

import { useEffect, useRef } from "react";

export interface GridFloorProps {
  /** Horizon line as a fraction of container height (0–1). */
  horizon?: number;
  /** Number of vertical perspective lines. */
  columns?: number;
  /** Number of horizontal grid rows receding into the distance. */
  rows?: number;
  /** Color of the grid lines (hex/rgb/hsl). */
  lineColor?: string;
  /** Glow color applied as a drop-shadow to the lines. */
  glowColor?: string;
  /** Background fill color. */
  bgColor?: string;
  /** Speed of the forward scrolling animation. 0 disables motion. */
  speed?: number;
  /** Maximum opacity of the grid lines (0–1). */
  opacity?: number;
  /** Line width in pixels. */
  lineWidth?: number;
  className?: string;
}

export function GridFloor({
  horizon = 0.45,
  columns = 24,
  rows = 18,
  lineColor = "#00f3ff",
  glowColor = "#00f3ff",
  bgColor = "#050505",
  speed = 0.6,
  opacity = 0.85,
  lineWidth = 1,
  className,
}: GridFloorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = (w: number, h: number) => {
      width = w;
      height = h;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width: w, height: h } = entry.contentRect;
      resize(w, h);
    });
    ro.observe(canvas);

    const draw = () => {
      const horizonY = height * horizon;
      const centerX = width / 2;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      ctx.shadowBlur = 0;
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = opacity;

      // Vertical perspective lines — spread at horizon, fan to 2× width at bottom
      const spread = width * 2;
      const bottomStep = spread / columns;
      const topSpread = width;
      const topStep = topSpread / columns;
      for (let i = -columns / 2; i <= columns / 2; i++) {
        const xBottom = centerX + i * bottomStep;
        const xTop = centerX + i * topStep;
        ctx.beginPath();
        ctx.moveTo(xTop, horizonY);
        ctx.lineTo(xBottom, height);
        ctx.stroke();
      }

      // Horizontal receding lines — full width, canvas clips the excess
      const maxDepth = rows * 2;
      const progress = offsetRef.current % 1;
      for (let i = 0; i < maxDepth + 1; i++) {
        const rawT = i / rows + progress / rows;
        if (rawT <= 0) continue;

        // Perspective mapping: t=0 at horizon, t=1 at bottom
        const t = rawT;
        const y = horizonY + (height - horizonY) * (t * t); // quadratic easing for depth
        if (y > height) continue;

        const lineOpacity = Math.max(0, 1 - (t - 0.5) * 1.2);
        ctx.globalAlpha = opacity * lineOpacity;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = lineWidth * 3;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // Horizon glow line
      const grad = ctx.createLinearGradient(0, horizonY - 2, 0, horizonY + 40);
      grad.addColorStop(0, lineColor);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.globalAlpha = opacity * 0.6;
      ctx.fillRect(0, horizonY - 2, width, 42);
      ctx.globalAlpha = 1;
    };

    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (speed !== 0) {
        offsetRef.current += speed * dt * 1.5;
      }
      draw();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [
    horizon,
    columns,
    rows,
    lineColor,
    glowColor,
    bgColor,
    speed,
    opacity,
    lineWidth,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full${className ? ` ${className}` : ""}`}
      style={{ background: bgColor }}
    />
  );
}
