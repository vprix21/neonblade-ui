"use client";
import React, { useEffect, useRef, HTMLAttributes, CSSProperties } from "react";

// ─── Internal types ───────────────────────────────────────────────────────────

interface FallingDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  width: number;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface PluviophileProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "style"
> {
  /**
   * Color of the falling rain streaks.
   * Accepts any valid CSS color string — hex, rgb, rgba, hsl.
   * @default "rgba(174,214,241,0.85)"
   */
  dropColor?: string;

  /**
   * Number of simultaneous falling rain streaks.
   * Higher values produce heavier rain.
   * @default 150
   */
  dropCount?: number;

  /**
   * Fall speed in pixels per frame.
   * Scales with the built-in per-drop speed randomisation (± 20 %).
   * @default 12
   */
  speed?: number;

  /**
   * Angle of rainfall in degrees measured from vertical.
   * Negative values lean the rain to the left (wind from right);
   * positive values lean to the right (wind from left).
   * Clamped to ±60°.
   * @default -15
   */
  angle?: number;

  /**
   * Minimum length of a falling rain streak in pixels.
   * @default 15
   */
  dropMinLength?: number;

  /**
   * Maximum length of a falling rain streak in pixels.
   * @default 40
   */
  dropMaxLength?: number;

  /**
   * Stroke width of each falling rain streak in pixels.
   * @default 1
   */
  dropWidth?: number;

  /**
   * Global opacity of the rain canvas layer (0–1).
   * @default 0.75
   */
  opacity?: number;

  /**
   * Background fill color of the component container.
   * The canvas redraws this every frame as the base layer beneath the rain.
   * @default "#0a0a0f"
   */
  backgroundColor?: string;

  /** Extra inline styles passed to the outer container div. */
  style?: CSSProperties;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Pluviophile({
  dropColor = "rgba(174,214,241,0.85)",
  dropCount = 150,
  speed = 12,
  angle = -15,
  dropMinLength = 15,
  dropMaxLength = 40,
  dropWidth = 1,
  opacity = 0.75,
  backgroundColor = "#0a0a0f",
  className = "",
  style,
  ...rest
}: PluviophileProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clamp angle to ±60°
    const clampedAngle = Math.max(-60, Math.min(60, angle));
    const angleRad = (clampedAngle * Math.PI) / 180;
    const sinA = Math.sin(angleRad);
    const cosA = Math.cos(angleRad);

    let drops: FallingDrop[] = [];

    // ── Helpers ──────────────────────────────────────────────────────────────

    function rand(min: number, max: number): number {
      return min + Math.random() * (max - min);
    }

    function makeDrop(w: number, h: number, scatterY = false): FallingDrop {
      const len = rand(dropMinLength, dropMaxLength);
      return {
        x: rand(-150, w + 150),
        y: scatterY ? rand(-len, h) : rand(-len - 300, -len),
        length: len,
        speed: speed * rand(0.55, 1.25),
        width: dropWidth * rand(0.45, 1.05),
      };
    }

    function initDrops(w: number, h: number): void {
      drops = Array.from({ length: dropCount }, () => makeDrop(w, h, true));
    }

    // ── Resize via ResizeObserver ─────────────────────────────────────────────

    function resize(): void {
      const container = canvas.parentElement;
      const w = (container?.offsetWidth ?? canvas.offsetWidth) || 1;
      const h = (container?.offsetHeight ?? canvas.offsetHeight) || 1;
      canvas.width = w;
      canvas.height = h;
      initDrops(w, h);
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);

    // ── Draw loop ─────────────────────────────────────────────────────────────

    function draw(): void {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.lineCap = "round";

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.x += sinA * d.speed;
        d.y += cosA * d.speed;

        if (d.y - d.length > h || d.x > w + 200 || d.x < -200) {
          drops[i] = makeDrop(w, h, false);
          continue;
        }

        // Tail point (behind the head in direction of travel)
        const tx = d.x - sinA * d.length;
        const ty = d.y - cosA * d.length;

        const grad = ctx.createLinearGradient(tx, ty, d.x, d.y);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, dropColor);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(d.x, d.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = d.width;
        ctx.stroke();
      }

      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [
    dropColor,
    dropCount,
    speed,
    angle,
    dropMinLength,
    dropMaxLength,
    dropWidth,
    opacity,
    backgroundColor,
  ]);

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden ${className}`}
      style={{ background: backgroundColor, ...style }}
      {...rest}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
