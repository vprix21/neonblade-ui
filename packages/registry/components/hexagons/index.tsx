"use client";

import { useEffect, useRef } from "react";

// ─── Public API ───────────────────────────────────────────────────────────────

export interface HexagonsProps {
  /** Fill color for each hexagon cell. */
  hexColor?: string;
  /** Stroke color for hexagon borders. */
  hexBorderColor?: string;
  /** Circumradius of each hexagon in px. */
  hexSize?: number;
  /** Border stroke width in px. */
  borderWidth?: number;

  /** Enable hover effects (fill and/or border). */
  hoverEffect?: boolean;
  /** Fill color applied to the hovered hexagon cell. Set same as hexColor to disable fill change. */
  hoverColor?: string;
  /** Border stroke color applied on hover. Leave empty ("") to keep border unchanged on hover. */
  hoverBorderColor?: string;

  /** Enable a neon glow shadow rendered around hex borders. */
  borderGlowEffect?: boolean;
  /** Shadow/glow color for borders — can differ from hexBorderColor. */
  borderGlowColor?: string;
  /** Blur radius (px) of the neon border glow. */
  borderGlowRadius?: number;

  /** Enable animated beams flowing along hex edges top-to-bottom. */
  beamEffect?: boolean;
  /** Color of the beam body gradient. */
  beamColor?: string;
  /** Shadow glow color of the bright beam head. */
  beamGlowColor?: string;
  /** Maximum concurrent beams on screen. */
  maxBeams?: number;
  /** Base beam travel speed in px/frame. */
  beamSpeed?: number;
  /** Beam tail length in px. */
  beamLength?: number;
  /** Probability per frame of spawning a new beam (0–1). */
  beamSpawnProbability?: number;

  /** Add a dark radial-gradient vignette overlay. */
  overlay?: boolean;
  /** Extra CSS class name on the root container. */
  className?: string;
}

// ─── Color helpers ─────────────────────────────────────────────────────────────

/**
 * Normalise any CSS color string to rgba(r,g,b,alpha).
 * Handles #RGB, #RRGGBB, rgb(), rgba() — so hex colors work correctly
 * without per-frame regex overhead in the render loop.
 */
function toRgba(color: string, alpha: number): string {
  const t = color.trim();
  // #RGB shorthand
  const s3 = /^#([A-Fa-f0-9]{3})$/.exec(t);
  if (s3) {
    const r = parseInt(s3[1][0] + s3[1][0], 16);
    const g = parseInt(s3[1][1] + s3[1][1], 16);
    const b = parseInt(s3[1][2] + s3[1][2], 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  // #RRGGBB
  const s6 = /^#([A-Fa-f0-9]{6})$/.exec(t);
  if (s6) {
    const n = parseInt(s6[1], 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
  }
  // rgba() — replace existing alpha
  if (t.startsWith("rgba(")) {
    if (alpha === 1) return t;
    return t.replace(/,\s*[\d.]+\s*\)$/, `,${alpha})`);
  }
  // rgb() → rgba()
  if (t.startsWith("rgb(")) {
    return t.replace(/^rgb\(/, "rgba(").replace(/\)$/, `,${alpha})`);
  }
  return t;
}

// ─── Geometry helpers ─────────────────────────────────────────────────────────

/** Flat-top hexagon: vertex i at angle i*60 degrees from the center. */
function flatTopVerts(cx: number, cy: number, r: number): [number, number][] {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
  });
}

// ─── Grid / graph types ───────────────────────────────────────────────────────

interface HexCell {
  cx: number;
  cy: number;
  verts: [number, number][];
}

interface HexEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  v1: number;
  v2: number;
  dx: number;
  dy: number;
  length: number;
}

interface HexGraph {
  verts: { x: number; y: number }[];
  edges: HexEdge[];
  vertToEdges: number[][];
}

// ─── Grid builder ─────────────────────────────────────────────────────────────

function buildGrid(
  width: number,
  height: number,
  r: number,
): { cells: HexCell[]; graph: HexGraph } {
  const h = Math.sqrt(3) * r;
  const horizSpacing = r * 1.5;
  const vertSpacing = h;
  const cols = Math.ceil(width / horizSpacing) + 3;
  const rows = Math.ceil(height / vertSpacing) + 3;

  const cells: HexCell[] = [];
  const vertMap = new Map<string, number>();
  const gVerts: { x: number; y: number }[] = [];

  const vKey = (x: number, y: number) =>
    `${Math.round(x * 10)},${Math.round(y * 10)}`;

  const getVert = (x: number, y: number): number => {
    const k = vKey(x, y);
    if (!vertMap.has(k)) {
      vertMap.set(k, gVerts.length);
      gVerts.push({ x, y });
    }
    return vertMap.get(k)!;
  };

  for (let col = -1; col < cols; col++) {
    for (let row = -1; row < rows; row++) {
      const cx = col * horizSpacing + r;
      const cy =
        row * vertSpacing + (col % 2 !== 0 ? vertSpacing / 2 : 0) + h / 2;
      const verts = flatTopVerts(cx, cy, r);
      cells.push({ cx, cy, verts });
      verts.forEach(([x, y]) => getVert(x, y));
    }
  }

  const edgeMap = new Map<string, number>();
  const gEdges: HexEdge[] = [];
  const vteMap = new Map<number, Set<number>>();

  for (const cell of cells) {
    const vIdxs = cell.verts.map(([x, y]) => vertMap.get(vKey(x, y))!);
    for (let i = 0; i < 6; i++) {
      const vi = vIdxs[i];
      const vj = vIdxs[(i + 1) % 6];
      const edgeKey = vi < vj ? `${vi}-${vj}` : `${vj}-${vi}`;
      if (edgeMap.has(edgeKey)) continue;

      const [x1, y1] = cell.verts[i];
      const [x2, y2] = cell.verts[(i + 1) % 6];
      const len = Math.hypot(x2 - x1, y2 - y1);
      const eIdx = gEdges.length;
      gEdges.push({
        x1,
        y1,
        x2,
        y2,
        v1: vi,
        v2: vj,
        dx: (x2 - x1) / len,
        dy: (y2 - y1) / len,
        length: len,
      });
      edgeMap.set(edgeKey, eIdx);

      if (!vteMap.has(vi)) vteMap.set(vi, new Set());
      if (!vteMap.has(vj)) vteMap.set(vj, new Set());
      vteMap.get(vi)!.add(eIdx);
      vteMap.get(vj)!.add(eIdx);
    }
  }

  const vertToEdges: number[][] = gVerts.map((_, i) => [
    ...(vteMap.get(i) ?? []),
  ]);
  return { cells, graph: { verts: gVerts, edges: gEdges, vertToEdges } };
}

// ─── Beam types & helpers ─────────────────────────────────────────────────────

interface Beam {
  edgeIdx: number;
  forward: boolean;
  t: number;
  speed: number;
  tailPx: number;
  trailLen: number;
  trail: [number, number][];
}

function beamHeadPos(beam: Beam, edges: HexEdge[]): [number, number] {
  const e = edges[beam.edgeIdx];
  return beam.forward
    ? [e.x1 + e.dx * beam.t, e.y1 + e.dy * beam.t]
    : [e.x2 - e.dx * beam.t, e.y2 - e.dy * beam.t];
}

function spawnBeam(
  graph: HexGraph,
  hexSize: number,
  speed: number,
  tailLengthPx: number,
): Beam | null {
  const { verts, edges, vertToEdges } = graph;

  const topVIdxs: number[] = [];
  verts.forEach((v, i) => {
    if (v.y < hexSize * 2.5) topVIdxs.push(i);
  });
  if (!topVIdxs.length) return null;

  for (let i = topVIdxs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [topVIdxs[i], topVIdxs[j]] = [topVIdxs[j], topVIdxs[i]];
  }

  for (const vIdx of topVIdxs) {
    const downEdges = (vertToEdges[vIdx] ?? []).filter((eIdx) => {
      const e = edges[eIdx];
      const edy = e.v1 === vIdx ? e.dy : -e.dy;
      return edy > 0.1;
    });
    if (!downEdges.length) continue;

    const eIdx = downEdges[Math.floor(Math.random() * downEdges.length)];
    const forward = edges[eIdx].v1 === vIdx;
    return {
      edgeIdx: eIdx,
      forward,
      t: 0,
      speed: speed * (0.75 + Math.random() * 0.5),
      tailPx: tailLengthPx * (0.7 + Math.random() * 0.6),
      trailLen: 0,
      trail: [],
    };
  }
  return null;
}

function stepBeam(beam: Beam, graph: HexGraph, canvasH: number): boolean {
  const { verts, edges, vertToEdges } = graph;
  const e = edges[beam.edgeIdx];

  const head = beamHeadPos(beam, edges);
  if (beam.trail.length > 0) {
    const last = beam.trail[beam.trail.length - 1];
    beam.trailLen += Math.hypot(head[0] - last[0], head[1] - last[1]);
  }
  beam.trail.push(head);

  while (beam.trailLen > beam.tailPx && beam.trail.length > 2) {
    const a = beam.trail[0];
    const b = beam.trail[1];
    beam.trailLen -= Math.hypot(b[0] - a[0], b[1] - a[1]);
    beam.trail.shift();
  }

  beam.t += beam.speed;
  if (beam.t < e.length) return true;

  const overflow = beam.t - e.length;
  const arrV = beam.forward ? e.v2 : e.v1;

  if (verts[arrV].y > canvasH * 1.1) return false;

  const candidates = (vertToEdges[arrV] ?? [])
    .filter((ei) => ei !== beam.edgeIdx)
    .map((ei) => {
      const ce = edges[ei];
      const fwd = ce.v1 === arrV;
      const edy = fwd ? ce.dy : -ce.dy;
      return { ei, fwd, edy };
    })
    .filter((c) => c.edy >= -0.01);

  if (!candidates.length) return false;

  // Classify candidates by direction:
  //   downward  — dy > 0.1   (diagonal-down edges)
  //   horizontal — |dy| ≤ 0.1 (flat top/bottom edges of flat-top hexagons)
  // Strategy: always include horizontal edges alongside downward ones so the
  // beam can take left/right detours along cell roofs/floors while still
  // drifting toward the bottom.  Slightly upward edges are only used as a
  // last resort (when no downward or horizontal option exists).
  const downward = candidates.filter((c) => c.edy > 0.1);
  const horizontal = candidates.filter((c) => Math.abs(c.edy) <= 0.1);
  const lateral = [...downward, ...horizontal]; // prefer these

  // 55 % chance to pick a horizontal edge when one exists alongside downward
  // edges — this creates organic zig-zag paths that use every edge type.
  let pool: typeof candidates;
  if (lateral.length === 0) {
    pool = candidates; // only slightly-upward edges left — take them
  } else if (downward.length > 0 && horizontal.length > 0) {
    pool = Math.random() < 0.55 ? horizontal : downward;
  } else {
    pool = lateral;
  }

  const chosen = pool[Math.floor(Math.random() * pool.length)];

  beam.edgeIdx = chosen.ei;
  beam.forward = chosen.fwd;
  beam.t = overflow;
  return true;
}

// ─── Canvas renderer ──────────────────────────────────────────────────────────

interface HexCanvasProps {
  hexColor: string;
  hexBorderColor: string;
  hexSize: number;
  borderWidth: number;
  hoverEffect: boolean;
  hoverColor: string;
  hoverBorderColor: string;
  borderGlowEffect: boolean;
  borderGlowColor: string;
  borderGlowRadius: number;
  beamEffect: boolean;
  beamColor: string;
  beamGlowColor: string;
  maxBeams: number;
  beamSpeed: number;
  beamLength: number;
  beamSpawnProbability: number;
}

function HexCanvas({
  hexColor,
  hexBorderColor,
  hexSize,
  borderWidth,
  hoverEffect,
  hoverColor,
  hoverBorderColor,
  borderGlowEffect,
  borderGlowColor,
  borderGlowRadius,
  beamEffect,
  beamColor,
  beamGlowColor,
  maxBeams,
  beamSpeed,
  beamLength,
  beamSpawnProbability,
}: HexCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Current hovered cell index (-1 = none)
  const hoveredRef = useRef(-1);
  // Previous frame's hovered index — used to detect changes
  const prevHoveredRef = useRef(-1);

  const cellsRef = useRef<HexCell[]>([]);
  const graphRef = useRef<HexGraph>({ verts: [], edges: [], vertToEdges: [] });
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef(0);

  // Offscreen canvas caches the static hex grid layer
  const bgRef = useRef<HTMLCanvasElement | OffscreenCanvas | null>(null);
  // Flag: bg needs a full redraw (rebuild or prop change)
  const needsBgRedrawRef = useRef(true);

  // Logical (CSS-pixel) canvas dimensions
  const logicalRef = useRef({ w: 0, h: 0 });

  // ── Hover detection ──────────────────────────────────────────────────────────
  // Listen at document level so hover works even when foreground content
  // (e.g. text with z-index) sits on top of the canvas.
  useEffect(() => {
    if (!hoverEffect) {
      hoveredRef.current = -1;
      return;
    }

    // Inscribed-circle radius — any point closer than this to a cell centre
    // is inside that hexagon.
    const inscribed = (hexSize * Math.sqrt(3)) / 2;

    const onMove = (ev: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mx = ev.clientX - rect.left;
      const my = ev.clientY - rect.top;

      // If the cursor is outside the canvas bounds, clear hover and return
      if (mx < 0 || my < 0 || mx > rect.width || my > rect.height) {
        hoveredRef.current = -1;
        return;
      }

      let best = -1;
      let bestD = inscribed;
      const cells = cellsRef.current;
      for (let i = 0; i < cells.length; i++) {
        const d = Math.hypot(cells[i].cx - mx, cells[i].cy - my);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      hoveredRef.current = best;
    };

    // passive: true → browser won't block scroll for this listener
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, [hoverEffect, hexSize]);

  // ── Render loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pre-parse beam color stops once per prop change — avoids per-frame
    // hex-string → rgba conversion which was causing noticeable lag with
    // hex colour values like #0a61ed.
    const bc0 = toRgba(beamColor, 0);
    const bc28 = toRgba(beamColor, 0.28);
    const bc92 = toRgba(beamColor, 0.92);
    const bc95 = toRgba(beamColor, 0.95);

    // ── Draw static hex grid to offscreen canvas ─────────────────────────────
    // By building one compound path for all cells and issuing a single
    // fill() + stroke(), we reduce O(N) draw calls to O(1) — a major
    // performance win, especially with borderGlowEffect (shadowBlur).
    const drawBackground = (
      bgCtx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
      W: number,
      H: number,
    ) => {
      bgCtx.clearRect(0, 0, W, H);
      const cells = cellsRef.current;
      const hov = hoverEffect ? hoveredRef.current : -1;

      // ── Batch: all non-hovered cells ──
      bgCtx.beginPath();
      for (let i = 0; i < cells.length; i++) {
        if (i === hov) continue;
        const { verts } = cells[i];
        bgCtx.moveTo(verts[0][0], verts[0][1]);
        for (let v = 1; v < 6; v++) bgCtx.lineTo(verts[v][0], verts[v][1]);
        bgCtx.closePath();
      }
      // Fill first (no shadow), then stroke (optionally with glow shadow)
      if (hexColor !== "transparent") {
        bgCtx.fillStyle = hexColor;
        bgCtx.fill();
      }
      if (borderGlowEffect) {
        bgCtx.shadowColor = borderGlowColor;
        bgCtx.shadowBlur = borderGlowRadius;
      }
      bgCtx.strokeStyle = hexBorderColor;
      bgCtx.lineWidth = borderWidth;
      bgCtx.stroke();
      bgCtx.shadowBlur = 0;

      // ── Hovered cell (drawn separately so it can have a different style) ──
      if (hov >= 0) {
        const { verts } = cells[hov];
        bgCtx.beginPath();
        bgCtx.moveTo(verts[0][0], verts[0][1]);
        for (let v = 1; v < 6; v++) bgCtx.lineTo(verts[v][0], verts[v][1]);
        bgCtx.closePath();
        bgCtx.fillStyle = hoverColor;
        bgCtx.fill();
        const hBorder = hoverBorderColor || hexBorderColor;
        if (borderGlowEffect) {
          bgCtx.shadowColor = hBorder;
          bgCtx.shadowBlur = borderGlowRadius;
        }
        bgCtx.strokeStyle = hBorder;
        bgCtx.lineWidth = borderWidth;
        bgCtx.stroke();
        bgCtx.shadowBlur = 0;
      }
    };

    // ── Rebuild grid + canvases ───────────────────────────────────────────────
    const rebuild = () => {
      // Use devicePixelRatio to render crisp edges at every zoom level and
      // on high-DPI / Retina screens.
      const dpr = Math.max(window.devicePixelRatio ?? 1, 1);
      const logW = canvas.offsetWidth;
      const logH = canvas.offsetHeight;
      if (logW === 0 || logH === 0) return;

      // Resize main canvas to device pixels; scale ctx so all coordinates
      // remain in CSS pixels (no changes needed to geometry math).
      canvas.width = Math.round(logW * dpr);
      canvas.height = Math.round(logH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      logicalRef.current = { w: logW, h: logH };

      // Build grid using logical (CSS-pixel) dimensions
      const { cells, graph } = buildGrid(logW, logH, hexSize);
      cellsRef.current = cells;
      graphRef.current = graph;
      beamsRef.current = [];

      // Create (or recreate) offscreen canvas at device-pixel resolution
      const bgW = Math.round(logW * dpr);
      const bgH = Math.round(logH * dpr);
      try {
        bgRef.current = new OffscreenCanvas(bgW, bgH);
      } catch {
        // Fallback for environments that don't support OffscreenCanvas
        const el = document.createElement("canvas");
        el.width = bgW;
        el.height = bgH;
        bgRef.current = el;
      }

      // Apply the same DPR scale to the offscreen context
      const bgCtx = bgRef.current.getContext("2d") as
        | CanvasRenderingContext2D
        | OffscreenCanvasRenderingContext2D
        | null;
      if (bgCtx) bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      needsBgRedrawRef.current = true;
    };

    rebuild();
    const ro = new ResizeObserver(rebuild);
    ro.observe(canvas);

    // ── Render loop ───────────────────────────────────────────────────────────
    const render = () => {
      const bg = bgRef.current;
      if (!bg) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const bgCtx = bg.getContext("2d") as
        | CanvasRenderingContext2D
        | OffscreenCanvasRenderingContext2D
        | null;
      if (!bgCtx) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const { w: W, h: H } = logicalRef.current;
      if (W === 0 || H === 0) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const hov = hoverEffect ? hoveredRef.current : -1;
      const hovChanged = hov !== prevHoveredRef.current;

      // Redraw the static bg layer only when hover changes or after rebuild.
      // For most frames this is skipped — a significant CPU saving.
      if (hovChanged || needsBgRedrawRef.current) {
        drawBackground(bgCtx, W, H);
        prevHoveredRef.current = hov;
        needsBgRedrawRef.current = false;
      }

      // Composite bg onto main canvas (GPU blit — very cheap)
      ctx.clearRect(0, 0, W, H);
      // Draw bg at logical dimensions; the DPR scaling on both contexts
      // ensures device-pixel-perfect output.
      ctx.drawImage(bg as CanvasImageSource, 0, 0, W, H);

      // ── Beams ──
      if (beamEffect && graphRef.current.edges.length > 0) {
        if (
          Math.random() < beamSpawnProbability &&
          beamsRef.current.length < maxBeams
        ) {
          const b = spawnBeam(graphRef.current, hexSize, beamSpeed, beamLength);
          if (b) beamsRef.current.push(b);
        }

        const surviving: Beam[] = [];
        for (const beam of beamsRef.current) {
          const alive = stepBeam(beam, graphRef.current, H);
          if (!alive) continue;

          if (beam.trail.length >= 2) {
            const tail = beam.trail[0];
            const head = beam.trail[beam.trail.length - 1];

            // Pre-parsed color strings (bc0/bc28/bc92/bc95) are used here
            // instead of calling toRgba() on every frame.
            const grad = ctx.createLinearGradient(
              tail[0],
              tail[1],
              head[0],
              head[1],
            );
            grad.addColorStop(0, bc0);
            grad.addColorStop(0.55, bc28);
            grad.addColorStop(1, bc92);

            ctx.beginPath();
            ctx.moveTo(beam.trail[0][0], beam.trail[0][1]);
            for (let j = 1; j < beam.trail.length; j++) {
              ctx.lineTo(beam.trail[j][0], beam.trail[j][1]);
            }
            ctx.strokeStyle = grad;
            ctx.lineWidth = borderWidth + 0.8;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.shadowBlur = 0;
            ctx.stroke();

            // Flat thick head — redrawn as a short segment with butt caps
            const prev = beam.trail[beam.trail.length - 2];
            ctx.beginPath();
            ctx.moveTo(prev[0], prev[1]);
            ctx.lineTo(head[0], head[1]);
            ctx.strokeStyle = bc95;
            ctx.lineWidth = borderWidth + 2.5;
            ctx.lineCap = "butt";
            ctx.lineJoin = "miter";
            ctx.shadowColor = beamGlowColor;
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }

          surviving.push(beam);
        }
        beamsRef.current = surviving;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [
    hexColor,
    hexBorderColor,
    hexSize,
    borderWidth,
    hoverEffect,
    hoverColor,
    hoverBorderColor,
    borderGlowEffect,
    borderGlowColor,
    borderGlowRadius,
    beamEffect,
    beamColor,
    beamGlowColor,
    maxBeams,
    beamSpeed,
    beamLength,
    beamSpawnProbability,
  ]);

  // Canvas itself never needs pointer-events — hover is tracked at
  // document level so it works through any z-index stack.
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

export function Hexagons({
  hexColor = "transparent",
  hexBorderColor = "rgba(0,243,255,0.25)",
  hexSize = 40,
  borderWidth = 1,
  hoverEffect = true,
  hoverColor = "rgba(0,243,255,0.15)",
  hoverBorderColor = "#00f3ff",
  borderGlowEffect = false,
  borderGlowColor = "#00f3ff",
  borderGlowRadius = 10,
  beamEffect = false,
  beamColor = "#00f3ff",
  beamGlowColor = "#00f3ff",
  maxBeams = 20,
  beamSpeed = 2,
  beamLength = 80,
  beamSpawnProbability = 0.08,
  overlay = false,
  className = "",
}: HexagonsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <HexCanvas
        hexColor={hexColor}
        hexBorderColor={hexBorderColor}
        hexSize={hexSize}
        borderWidth={borderWidth}
        hoverEffect={hoverEffect}
        hoverColor={hoverColor}
        hoverBorderColor={hoverBorderColor}
        borderGlowEffect={borderGlowEffect}
        borderGlowColor={borderGlowColor}
        borderGlowRadius={borderGlowRadius}
        beamEffect={beamEffect}
        beamColor={beamColor}
        beamGlowColor={beamGlowColor}
        maxBeams={maxBeams}
        beamSpeed={beamSpeed}
        beamLength={beamLength}
        beamSpawnProbability={beamSpawnProbability}
      />
      {overlay && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none z-10" />
        </>
      )}
    </div>
  );
}

export default Hexagons;
