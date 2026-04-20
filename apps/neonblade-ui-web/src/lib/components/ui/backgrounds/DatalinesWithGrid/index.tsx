"use client";

import { useEffect, useState, useRef } from "react";

export interface DatalinesWithGridProps {
  lineColor?: string;
  shadowColor?: string;
  bgGridColor?: string;
  cellSize?: number;
  maxLines?: number;
  baseSpeed?: number;
  lineLength?: number;
  spawnProbability?: number;
  overlay?: boolean;
}

function hexToRgbA(hex: string, alpha: number): string {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      alpha +
      ")"
    );
  }
  // Try mapping rgba replacement just in case user passed rgb or string
  if (hex.startsWith("rgb")) {
    return hex
      .replace("rgb", "rgba")
      .replace(")", `, ${alpha})`)
      .replace(",,", ",");
  }
  return hex; // if it's already a valid rgba or color name
}

function DatalinesCanvas({
  lineColor = "#00f3ff",
  shadowColor = "#00f3ff",
  cellSize = 50,
  maxLines = 15,
  baseSpeed = 2,
  lineLength = 150,
  spawnProbability = 0.1,
}: Omit<DatalinesWithGridProps, "bgGridColor">) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    interface DataLine {
      x: number;
      y: number;
      history: { x: number; y: number }[];
      dx: number;
      dy: number;
      speed: number;
      // Pixel-based length so visual tail stays constant regardless of speed.
      lineLengthPx: number;
    }

    let lines: DataLine[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < spawnProbability && lines.length < maxLines) {
        lines.push({
          x: Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize,
          y: -cellSize,
          history: [],
          dx: 0,
          dy: 1,
          speed: baseSpeed,
          // Randomise ±25 % around the configured lineLength.
          lineLengthPx: Math.floor(
            Math.random() * lineLength * 0.5 + lineLength * 0.75,
          ),
        });
      }

      lines.forEach((line) => {
        line.history.push({ x: line.x, y: line.y });

        // History limit derived from pixel length, not entry count.
        // This keeps the visual tail the same physical size at any speed.
        const historyLimit = Math.max(
          2,
          Math.ceil(line.lineLengthPx / line.speed),
        );
        if (line.history.length > historyLimit) {
          line.history.shift();
        }

        line.x += line.dx * line.speed;
        line.y += line.dy * line.speed;

        // Original modulo-based intersection check: fires only when the line
        // lands on a grid intersection, preserving the same turn frequency as
        // the original code at any integer speed.
        if (line.x % cellSize === 0 && line.y % cellSize === 0) {
          const max_x = Math.floor(canvas.width / cellSize) * cellSize;
          if (line.x <= 0 && line.dx === -1) {
            line.dx = 0;
            line.dy = 1;
          } else if (line.x >= max_x && line.dx === 1) {
            line.dx = 0;
            line.dy = 1;
          } else {
            if (line.dy === 1) {
              if (Math.random() < 0.3) {
                line.dy = 0;
                line.dx = Math.random() < 0.5 ? 1 : -1;
              }
            } else {
              if (Math.random() < 0.6) {
                line.dy = 1;
                line.dx = 0;
              }
            }
          }
        }

        if (line.history.length < 2) return;

        const h = line.history;
        const tail = h[0];
        const head = h[h.length - 1];

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 1.5;

        // Build a gradient from the tail pixel position to the head pixel
        // position. This gives the classic dim-tail → bright-head fade as a
        // single unbroken polyline — no per-segment strokes, so no gaps or
        // dots appear regardless of speed.
        const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        grad.addColorStop(0, hexToRgbA(lineColor, 0));
        grad.addColorStop(0.6, hexToRgbA(lineColor, 0.35));
        grad.addColorStop(1, hexToRgbA(lineColor, 0.9));

        ctx.beginPath();
        ctx.moveTo(h[0].x, h[0].y);
        for (let i = 1; i < h.length; i++) ctx.lineTo(h[i].x, h[i].y);
        ctx.strokeStyle = grad;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // Bright glowing cap at the head — one tiny continuous path.
        const headCount = Math.max(2, Math.ceil(20 / Math.max(1, line.speed)));
        const headIdx = Math.max(0, h.length - 1 - headCount);
        ctx.beginPath();
        ctx.moveTo(h[headIdx].x, h[headIdx].y);
        for (let i = headIdx + 1; i < h.length; i++) ctx.lineTo(h[i].x, h[i].y);
        ctx.strokeStyle = hexToRgbA(lineColor, 0.95);
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      lines = lines.filter((line) => {
        if (line.history.length === 0) return true;
        const tail = line.history[0];
        return tail.y < canvas.height + cellSize * 2;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    lineColor,
    shadowColor,
    cellSize,
    maxLines,
    baseSpeed,
    lineLength,
    spawnProbability,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}

export function DatalinesWithGrid({
  lineColor = "#00f3ff",
  shadowColor = "#00f3ff",
  cellSize = 50,
  maxLines = 10,
  baseSpeed = 2,
  lineLength = 150,
  spawnProbability = 0.1,
  bgGridColor = "rgba(255,255,255,0.05)",
  overlay = false,
}: DatalinesWithGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tiles, setTiles] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateTiles = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const columns = Math.ceil(clientWidth / cellSize);
        // Add a few extra rows/cols to handle scrolling/resizing edges gracefully
        const rows = Math.ceil(clientHeight / cellSize) + 1;
        setTiles(columns * rows);
      }
    };

    updateTiles();

    window.addEventListener("resize", updateTiles);
    return () => window.removeEventListener("resize", updateTiles);
  }, [cellSize]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden flex flex-wrap"
    >
      <DatalinesCanvas
        lineColor={lineColor}
        shadowColor={shadowColor}
        cellSize={cellSize}
        maxLines={maxLines}
        baseSpeed={baseSpeed}
        lineLength={lineLength}
        spawnProbability={spawnProbability}
      />
      {Array.from({ length: tiles }).map((_, i) => (
        <div
          key={i}
          className="transition-none box-border"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            border: `0.5px solid ${bgGridColor}`,
          }}
        />
      ))}
      {/* Add a radial gradient overlay */}
      {overlay && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none z-0" />
        </>
      )}
    </div>
  );
}
