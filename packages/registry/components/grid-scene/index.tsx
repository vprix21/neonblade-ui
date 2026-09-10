"use client";

import { useEffect, useRef } from "react";

export interface GridSceneProps {
  /** Horizon line as a fraction of container height (0–1). */
  horizon?: number;
  /** Gap between the floor and ceiling as a fraction of container height (0–1). */
  gap?: number;
  /** Number of vertical perspective lines. */
  columns?: number;
  /** Number of horizontal grid rows receding into the distance (per plane). */
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
  /** Whether to show the ceiling grid (mirrored above horizon). */
  showCeiling?: boolean;
  /** Whether to show the floor grid (below horizon). */
  showFloor?: boolean;
  className?: string;
}

export function GridScene({
  horizon = 0.5,
  gap = 0.08,
  columns = 24,
  rows = 18,
  lineColor = "#00f3ff",
  glowColor = "#00f3ff",
  bgColor = "#050505",
  speed = 0.6,
  opacity = 0.85,
  lineWidth = 1,
  showCeiling = true,
  showFloor = true,
  className,
}: GridSceneProps) {
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

    /**
     * Draw a single perspective plane.
     * @param edgeY   - Pixel Y where the plane's near edge starts (gap boundary)
     * @param vanishY - Pixel Y where perspective lines converge (horizon centre)
     * @param isFloor - true = lines fan downward; false = fan upward
     */
    const drawPlane = (edgeY: number, vanishY: number, isFloor: boolean) => {
      const centerX = width / 2;
      const spread = width * 2;
      const bottomStep = spread / columns;
      const topSpread = width;
      const topStep = topSpread / columns;
      const yFar = isFloor ? height : 0;
      const planeHeight = isFloor ? height - edgeY : edgeY;

      // ── Vertical lines ────────────────────────────────────────────────────
      // Each line gets a gradient stroke: transparent at edgeY (near gap),
      // opaque at the far screen edge.
      for (let i = -columns / 2; i <= columns / 2; i++) {
        const xVanish = centerX + i * topStep;
        const xEdge = centerX + i * bottomStep;

        // Clip the line to start at edgeY (not vanishY)
        const tClip = Math.abs((edgeY - vanishY) / (yFar - vanishY || 1));
        const xStart = xVanish + tClip * (xEdge - xVanish);

        // Gradient: transparent at edgeY → opaque at yFar
        const grad = ctx.createLinearGradient(0, edgeY, 0, yFar);
        grad.addColorStop(0, lineColor + "00");   // transparent at horizon edge
        grad.addColorStop(0.35, lineColor);        // fully opaque after ~35% depth
        grad.addColorStop(1, lineColor);

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = grad;
        ctx.globalAlpha = opacity;
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.moveTo(xStart, edgeY);
        ctx.lineTo(xEdge, yFar);
        ctx.stroke();
      }

      // ── Horizontal lines ──────────────────────────────────────────────────
      // Lines close to edgeY (horizon side) fade out; lines near the far edge
      // are fully opaque.
      const maxDepth = rows * 2;
      const progress = offsetRef.current % 1;

      for (let i = 0; i < maxDepth + 1; i++) {
        const rawT = i / rows + progress / rows;
        if (rawT <= 0) continue;

        const t = rawT;
        const depth = 1 - t * t; // quadratic: 1 near edgeY, 0 far away

        const y = isFloor
          ? edgeY + planeHeight * (1 - depth)
          : edgeY - planeHeight * (1 - depth);

        if (isFloor && y > height) continue;
        if (!isFloor && y < 0) continue;

        // normalised 0 = at edgeY (near gap), 1 = at far screen edge
        const distFromEdge = isFloor ? y - edgeY : edgeY - y;
        const normalised = Math.min(distFromEdge / planeHeight, 1);

        // Fade IN from horizon: transparent near gap edge → opaque further away
        const fadeIn = Math.min(normalised / 0.35, 1);
        ctx.globalAlpha = opacity * fadeIn;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = lineWidth * 3;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const draw = () => {
      const horizonY = height * horizon;
      const halfGap = (height * gap) / 2;

      // Floor starts below the gap; ceiling starts above the gap
      const floorEdgeY = horizonY + halfGap;
      const ceilEdgeY = horizonY - halfGap;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      if (showFloor) drawPlane(floorEdgeY, horizonY, true);
      if (showCeiling) drawPlane(ceilEdgeY, horizonY, false);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
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
    gap,
    columns,
    rows,
    lineColor,
    glowColor,
    bgColor,
    speed,
    opacity,
    lineWidth,
    showCeiling,
    showFloor,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full${className ? ` ${className}` : ""}`}
      style={{ background: bgColor }}
    />
  );
}
