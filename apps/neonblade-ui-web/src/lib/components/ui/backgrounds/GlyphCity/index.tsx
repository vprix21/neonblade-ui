"use client";

import { useEffect, useRef, useCallback } from "react";

export type GlyphCityVariant = "downtown" | "megacity" | "district" | "ruins";
export type OutlineCityVariant = "sparse" | "dense" | "layered" | "horizon";
export type CityType = "solid" | "outline";
/**
 * Character set used to fill building interiors in solid mode.
 * - "blocks"  — Unicode block/box-drawing characters (default, original style)
 * - "custom"  — supply your own string via the `customChars` prop
 */
export type CharSet = "blocks" | "custom";

export interface GlyphCityProps {
  /** Render mode: "solid" = filled ASCII characters, "outline" = neon vector silhouette */
  cityType?: CityType;
  /** Variant for solid mode */
  variant?: GlyphCityVariant;
  /** Variant for outline mode */
  outlineVariant?: OutlineCityVariant;
  /** Primary neon color (CSS color string) */
  colorPrimary?: string;
  /** Secondary neon color for accents/vehicles */
  colorSecondary?: string;
  /** Tertiary neon color for tower peaks / blinking lights */
  colorTertiary?: string;
  /** Background color */
  bgColor?: string;
  /** Font size in px — solid mode only (controls column/row density) */
  fontSize?: number;
  /** Animation speed in ms per frame */
  speed?: number;
  /** Whether vehicles fly across the skyline */
  showVehicles?: boolean;
  /** Whether tower peak lights blink */
  blinkingLights?: boolean;
  /** Overall opacity 0–100 */
  opacity?: number;
  /**
   * Character set used to fill building interiors in solid mode.
   * "blocks" (default) | "custom"
   */
  charSet?: CharSet;
  /**
   * Custom character pool used when charSet="custom".
   * All unique characters in this string are used to fill buildings.
   * Falls back to "blocks" if empty or omitted.
   */
  customChars?: string;
  /** className forwarded to the wrapper div */
  className?: string;
}

// ─── ASCII Building Templates ────────────────────────────────────────────────
// Each building is described as an array of rows (bottom → top).
// Characters use a limited set for density variation.

const BUILDING_CHARS = {
  wall: ["█", "▓", "▒", "░", "┃", "│", "║", "|"],
  window_on: ["▪", "■", "□", "▫", "◼", "◻", "▮"],
  window_off: ["▫", "░", "·", " ", " ", " "],
  roof: ["▀", "▄", "▬", "▭", "─", "═", "▔"],
  antenna: ["╻", "┃", "│", "╷", "╿", "┿"],
  peak: ["▲", "△", "◬", "⋀"],
  decor: ["╬", "╫", "╪", "┼", "╋", "╂"],
};

// Neon character pools for different density effects
const NEON_CHARS = "▓▒░█▪■│║┃╬╪┼╋◼▮▬╻╷╿┿";
const SPARSE_CHARS = "░▒·│┃|║";
const STRUCTURAL_CHARS = "─═╔╗╚╝╠╣╦╩╬║│┌┐└┘├┤┬┴┼";

interface Building {
  x: number; // column start
  width: number; // columns wide
  height: number; // rows tall
  hasAntenna: boolean;
  antennaHeight: number;
  hasPeakLight: boolean;
  lightOn: boolean;
  lightTimer: number;
  lightInterval: number;
  colorIdx: number; // 0=primary,1=secondary,2=tertiary
  windowPhase: number;
  style: "dense" | "glass" | "grid" | "minimal";
}

interface Vehicle {
  x: number;
  y: number;
  speed: number;
  direction: 1 | -1;
  type: "speeder" | "transport" | "fighter";
  trail: Array<{ x: number; y: number; alpha: number }>;
  colorIdx: number;
}

function buildCityLayout(
  cols: number,
  rows: number,
  variant: GlyphCityVariant,
): Building[] {
  const buildings: Building[] = [];
  const rng = mulberry32(42 + variant.charCodeAt(0));

  const configs: Record<
    GlyphCityVariant,
    {
      minW: number;
      maxW: number;
      minH: number;
      maxH: number;
      density: number; // 0-1 gap probability
      antennaRate: number;
    }
  > = {
    downtown: {
      minW: 3,
      maxW: 7,
      minH: 12,
      maxH: Math.floor(rows * 0.85),
      density: 0.05,
      antennaRate: 0.5,
    },
    megacity: {
      minW: 2,
      maxW: 5,
      minH: 8,
      maxH: Math.floor(rows * 0.92),
      density: 0.02,
      antennaRate: 0.7,
    },
    district: {
      minW: 3,
      maxW: 9,
      minH: 6,
      maxH: Math.floor(rows * 0.65),
      density: 0.1,
      antennaRate: 0.3,
    },
    ruins: {
      minW: 2,
      maxW: 6,
      minH: 4,
      maxH: Math.floor(rows * 0.55),
      density: 0.15,
      antennaRate: 0.2,
    },
  };

  const cfg = configs[variant];
  let x = 0;

  while (x < cols) {
    // small gap probability
    if (rng() < cfg.density && x > 0) {
      x += 1;
      continue;
    }

    const w = Math.max(
      cfg.minW,
      Math.floor(rng() * (cfg.maxW - cfg.minW + 1)) + cfg.minW,
    );
    if (x + w > cols) break;

    const h = Math.max(
      cfg.minH,
      Math.floor(rng() * (cfg.maxH - cfg.minH + 1)) + cfg.minH,
    );
    const hasAntenna = rng() < cfg.antennaRate;
    const antennaH = hasAntenna ? Math.floor(rng() * 4) + 2 : 0;
    const hasPeakLight = hasAntenna && rng() < 0.7;

    const styles: Building["style"][] = ["dense", "glass", "grid", "minimal"];
    const style = styles[Math.floor(rng() * styles.length)];

    buildings.push({
      x,
      width: w,
      height: Math.min(h, rows - 2),
      hasAntenna,
      antennaHeight: antennaH,
      hasPeakLight,
      lightOn: rng() > 0.5,
      lightTimer: 0,
      lightInterval: Math.floor(rng() * 60) + 20,
      colorIdx: Math.floor(rng() * 3),
      windowPhase: Math.floor(rng() * 100),
      style,
    });

    x += w + (rng() < 0.3 ? 0 : 0);
  }

  return buildings;
}

// Simple deterministic RNG for consistent layout across rerenders
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function spawnVehicles(
  cols: number,
  rows: number,
  variant: GlyphCityVariant,
): Vehicle[] {
  const count =
    variant === "megacity"
      ? 5
      : variant === "downtown"
        ? 3
        : variant === "ruins"
          ? 1
          : 2;
  const vehicleRows = [
    Math.floor(rows * 0.15),
    Math.floor(rows * 0.22),
    Math.floor(rows * 0.1),
  ];
  return Array.from({ length: count }, (_, i) => ({
    x: Math.floor(Math.random() * cols),
    y: vehicleRows[i % vehicleRows.length],
    speed: 0.3 + Math.random() * 0.5,
    direction: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
    type: (["speeder", "transport", "fighter"] as const)[i % 3],
    trail: [],
    colorIdx: i % 3,
  }));
}

const VEHICLE_CHARS: Record<
  Vehicle["type"],
  { body: string; left: string; right: string }
> = {
  speeder: { body: "◈", left: "◂", right: "▸" },
  transport: { body: "▬", left: "◀", right: "▶" },
  fighter: { body: "◆", left: "◁", right: "▷" },
};

// ─── Outline City Engine ──────────────────────────────────────────────────────
// Outline mode reuses the same character-grid Building type and layout logic
// as solid mode, but renders each building as a stroked neon outline instead
// of filled ASCII characters. Proportions are therefore identical.

function buildOutlineCityLayout(
  cols: number,
  rows: number,
  variant: OutlineCityVariant,
): Building[] {
  const rng = mulberry32(99 + variant.charCodeAt(0));

  const configs: Record<
    OutlineCityVariant,
    {
      minW: number;
      maxW: number;
      minH: number;
      maxH: number;
      density: number;
      antennaRate: number;
    }
  > = {
    sparse: {
      minW: 3,
      maxW: 9,
      minH: 10,
      maxH: Math.floor(rows * 0.88),
      density: 0.08,
      antennaRate: 0.55,
    },
    dense: {
      minW: 2,
      maxW: 5,
      minH: 8,
      maxH: Math.floor(rows * 0.93),
      density: 0.01,
      antennaRate: 0.65,
    },
    layered: {
      minW: 3,
      maxW: 8,
      minH: 7,
      maxH: Math.floor(rows * 0.8),
      density: 0.05,
      antennaRate: 0.45,
    },
    horizon: {
      minW: 4,
      maxW: 12,
      minH: 5,
      maxH: Math.floor(rows * 0.6),
      density: 0.1,
      antennaRate: 0.3,
    },
  };

  const cfg = configs[variant];
  const buildings: Building[] = [];
  let x = 0;

  while (x < cols) {
    if (rng() < cfg.density && x > 0) {
      x += 1;
      continue;
    }
    const w = Math.max(
      cfg.minW,
      Math.floor(rng() * (cfg.maxW - cfg.minW + 1)) + cfg.minW,
    );
    if (x + w > cols) break;
    const h = Math.max(
      cfg.minH,
      Math.floor(rng() * (cfg.maxH - cfg.minH + 1)) + cfg.minH,
    );
    const hasAntenna = rng() < cfg.antennaRate;
    const antennaH = hasAntenna ? Math.floor(rng() * 5) + 2 : 0;
    const hasPeakLight = hasAntenna && rng() < 0.7;

    buildings.push({
      x,
      width: w,
      height: Math.min(h, rows - 2),
      hasAntenna,
      antennaHeight: antennaH,
      hasPeakLight,
      lightOn: rng() > 0.5,
      lightTimer: 0,
      lightInterval: Math.floor(rng() * 60) + 20,
      colorIdx: Math.floor(rng() * 3),
      windowPhase: 0,
      style: "dense",
    });
    x += w;
  }

  return buildings;
}

function drawOutlineCity(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  buildings: Building[],
  vehicles: Vehicle[],
  cols: number,
  rows: number,
  cw: number,
  ch: number,
  palette: string[],
  bgColor: string,
  blinkingLights: boolean,
  showVehicles: boolean,
  frame: number,
) {
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, W, H);

  // Ground line
  ctx.save();
  ctx.strokeStyle = palette[0];
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, H - 1);
  ctx.lineTo(W, H - 1);
  ctx.stroke();
  ctx.restore();

  for (const b of buildings) {
    const color = palette[b.colorIdx];

    // Blink logic
    if (blinkingLights && b.hasPeakLight) {
      b.lightTimer++;
      if (b.lightTimer >= b.lightInterval) {
        b.lightOn = !b.lightOn;
        b.lightTimer = 0;
      }
    }

    const pxLeft = b.x * cw;
    const pxRight = (b.x + b.width) * cw;
    // Pin ground to the actual canvas bottom so large font sizes don't leave
    // a gap at the bottom (canvas.height % ch remainder).
    const pxGround = H - 1;
    const pxTop = pxGround - b.height * ch;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.globalAlpha = 0.9;

    // Building silhouette: left wall → roof → right wall (open at ground)
    ctx.beginPath();
    ctx.moveTo(pxLeft, pxGround);
    ctx.lineTo(pxLeft, pxTop);
    ctx.lineTo(pxRight, pxTop);
    ctx.lineTo(pxRight, pxGround);
    ctx.stroke();

    // Antenna mast
    if (b.hasAntenna) {
      const antennaX = pxLeft + (b.width * cw) / 2;
      const antennaTopY = pxTop - b.antennaHeight * ch;
      ctx.strokeStyle = palette[2];
      ctx.shadowColor = palette[2];
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(antennaX, pxTop);
      ctx.lineTo(antennaX, antennaTopY);
      ctx.stroke();

      // Blinking dot
      if (b.hasPeakLight) {
        ctx.beginPath();
        ctx.arc(antennaX, antennaTopY - 2, 2, 0, Math.PI * 2);
        ctx.fillStyle = palette[2];
        ctx.shadowBlur = b.lightOn ? 12 : 2;
        ctx.globalAlpha = b.lightOn ? 1 : 0.25;
        ctx.fill();
      }
    }

    ctx.restore();
  }

  // Vehicles (grid coords → pixels)
  if (showVehicles) {
    for (const v of vehicles) {
      v.x += v.speed * v.direction;
      if (v.x > cols + 5) v.x = -5;
      if (v.x < -5) v.x = cols + 5;

      const vColor = palette[v.colorIdx];
      const vPxX = v.x * cw;
      const vPxY = v.y * ch + (H - rows * ch);

      // Trail
      v.trail.push({ x: v.x, y: v.y, alpha: 0.4 });
      if (v.trail.length > 8) v.trail.shift();

      ctx.save();
      ctx.strokeStyle = vColor;
      ctx.shadowColor = vColor;
      ctx.shadowBlur = 8;

      for (let ti = 0; ti < v.trail.length - 1; ti++) {
        const tx = v.trail[ti].x * cw;
        const ty = v.trail[ti].y * ch;
        ctx.globalAlpha = (ti / v.trail.length) * 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx + v.direction * cw * 0.5, ty);
        ctx.stroke();
      }

      // Wing-shape vehicle silhouette
      ctx.globalAlpha = 0.88;
      ctx.lineWidth = 1.5;
      const dir = v.direction;
      ctx.beginPath();
      ctx.moveTo(vPxX, vPxY);
      ctx.lineTo(vPxX + dir * cw * 0.8, vPxY - ch * 0.25);
      ctx.lineTo(vPxX + dir * cw * 1.4, vPxY);
      ctx.lineTo(vPxX + dir * cw * 0.8, vPxY + ch * 0.25);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    }
  }

  // Atmospheric scanline noise
  if (frame % 4 === 0) {
    const noiseY = Math.floor(Math.random() * H * 0.55);
    ctx.save();
    ctx.strokeStyle = palette[Math.floor(Math.random() * 3)];
    ctx.globalAlpha = 0.04;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, noiseY);
    ctx.lineTo(W, noiseY);
    ctx.stroke();
    ctx.restore();
  }
}

export function GlyphCity({
  cityType = "solid",
  variant = "downtown",
  outlineVariant = "sparse",
  colorPrimary = "#00ffff",
  colorSecondary = "#ff00ff",
  colorTertiary = "#ffff00",
  bgColor = "#000000",
  fontSize = 12,
  speed = 80,
  showVehicles = true,
  blinkingLights = true,
  opacity = 90,
  charSet = "blocks",
  customChars,
  className,
}: GlyphCityProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    buildings: Building[];
    vehicles: Vehicle[];
    frame: number;
    cols: number;
    rows: number;
  } | null>(null);
  const outlineStateRef = useRef<{
    buildings: Building[];
    vehicles: Vehicle[];
    frame: number;
    cols: number;
    rows: number;
  } | null>(null);

  const colors = useCallback(
    () => [colorPrimary, colorSecondary, colorTertiary],
    [colorPrimary, colorSecondary, colorTertiary],
  );

  // ── Outline mode effect ────────────────────────────────────────────────────
  useEffect(() => {
    if (cityType !== "outline") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = colors();

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / (fontSize * 0.6));
      const rows = Math.floor(canvas.height / fontSize);
      outlineStateRef.current = {
        buildings: buildOutlineCityLayout(cols, rows, outlineVariant),
        vehicles: showVehicles ? spawnVehicles(cols, rows, "downtown") : [],
        frame: 0,
        cols,
        rows,
      };
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const state = outlineStateRef.current;
      if (!state) return;
      state.frame++;
      const cw = canvas.width / state.cols;
      const ch = fontSize;
      drawOutlineCity(
        ctx,
        canvas.width,
        canvas.height,
        state.buildings,
        state.vehicles,
        state.cols,
        state.rows,
        cw,
        ch,
        palette,
        bgColor,
        blinkingLights,
        showVehicles,
        state.frame,
      );
    };

    const interval = setInterval(draw, speed);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, [
    cityType,
    outlineVariant,
    colorPrimary,
    colorSecondary,
    colorTertiary,
    bgColor,
    fontSize,
    speed,
    showVehicles,
    blinkingLights,
    colors,
  ]);

  // ── Solid ASCII mode effect ────────────────────────────────────────────────
  useEffect(() => {
    if (cityType !== "solid") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / (fontSize * 0.6));
      const rows = Math.floor(canvas.height / fontSize);
      stateRef.current = {
        buildings: buildCityLayout(cols, rows, variant),
        vehicles: showVehicles ? spawnVehicles(cols, rows, variant) : [],
        frame: 0,
        cols,
        rows,
      };
    };

    resize();
    window.addEventListener("resize", resize);

    const palette = colors();

    // ── Resolve character pools based on charSet prop ────────────────────────
    // Each preset defines 4 pools:
    //   neon       → dense interior fill (style="dense")
    //   sparse     → light interior fill (style="glass")
    //   structural → ground line + grid fill
    //   window/wall → lit/unlit windows and wall chars
    const CHAR_POOLS: Record<
      "neon" | "sparse" | "structural" | "windowOn" | "windowOff" | "wall",
      string
    > = (() => {
      const resolved =
        charSet === "custom" && customChars && customChars.length > 0
          ? customChars
          : null; // null = use module-level block defaults

      if (resolved === null) {
        // blocks (default)
        return {
          neon: "\u2593\u2592\u2591\u2588\u25aa\u25a0\u2502\u2551\u2503\u256c\u256a\u253c\u254b\u25fc\u25ae\u25ac\u257b\u2577\u257f\u253f",
          sparse: "\u2591\u2592\u00b7\u2502\u2503|\u2551",
          structural:
            "\u2500\u2550\u2554\u2557\u255a\u255d\u2560\u2563\u2566\u2569\u256c\u2551\u2502\u250c\u2510\u2514\u2518\u251c\u2524\u252c\u2534\u253c",
          windowOn: "\u25aa\u25a0\u25a1\u25ab\u25fc\u25fb\u25ae",
          windowOff: "\u25ab\u2591\u00b7  ",
          wall: "\u2588\u2503\u2551\u2502|",
        };
      }

      // For custom use the same string for all pools
      return {
        neon: resolved,
        sparse: resolved,
        structural: resolved,
        windowOn: resolved,
        windowOff: resolved.slice(
          0,
          Math.max(1, Math.floor(resolved.length / 3)),
        ),
        wall: resolved,
      };
    })();

    const charAt = (pool: string, idx: number) =>
      pool[Math.abs(idx) % pool.length];

    const draw = () => {
      const state = stateRef.current;
      if (!state) return;
      const { buildings, vehicles, cols, rows } = state;
      state.frame++;

      const cw = canvas.width / cols;
      const ch = fontSize;
      // Shift everything down so the last row aligns with the canvas bottom,
      // preventing the gap that appears when canvas.height % fontSize !== 0.
      const yOffset = canvas.height - rows * ch;

      // Clear
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      const drawChar = (
        col: number,
        row: number,
        char: string,
        color: string,
        alpha = 1,
      ) => {
        if (col < 0 || col >= cols || row < 0 || row >= rows) return;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillText(char, col * cw, row * ch + yOffset);
        ctx.globalAlpha = 1;
      };

      // ── Draw ground line ──────────────────────────────────────────────────
      for (let c = 0; c < cols; c++) {
        const gc = charAt(CHAR_POOLS.structural, c);
        drawChar(c, rows - 1, gc, palette[0], 0.4);
      }

      // ── Draw buildings ────────────────────────────────────────────────────
      for (const b of buildings) {
        const color = palette[b.colorIdx];
        const dimColor = palette[(b.colorIdx + 1) % 3];

        // Blink light
        if (blinkingLights && b.hasPeakLight) {
          b.lightTimer++;
          if (b.lightTimer >= b.lightInterval) {
            b.lightOn = !b.lightOn;
            b.lightTimer = 0;
          }
        }

        const topRow = rows - 1 - b.height;

        for (let row = rows - 1; row >= topRow; row--) {
          const relRow = rows - 1 - row; // 0 = ground level

          for (let col = b.x; col < b.x + b.width; col++) {
            const relCol = col - b.x;
            let char = "│";
            let charColor = color;

            // Roof row
            if (row === topRow) {
              if (relCol === 0)
                char =
                  charSet === "blocks"
                    ? "\u2554"
                    : charAt(CHAR_POOLS.structural, 0);
              else if (relCol === b.width - 1)
                char =
                  charSet === "blocks"
                    ? "\u2557"
                    : charAt(CHAR_POOLS.structural, 1);
              else
                char =
                  charSet === "blocks"
                    ? "\u2550"
                    : charAt(CHAR_POOLS.structural, 2);
              charColor = color;
            }
            // Ground row
            else if (row === rows - 1) {
              char =
                relCol === 0
                  ? charSet === "blocks"
                    ? "\u255a"
                    : charAt(CHAR_POOLS.structural, 3)
                  : relCol === b.width - 1
                    ? charSet === "blocks"
                      ? "\u255d"
                      : charAt(CHAR_POOLS.structural, 4)
                    : charSet === "blocks"
                      ? "\u2550"
                      : charAt(CHAR_POOLS.structural, 2);
              charColor = color;
            }
            // Body
            else {
              // Edge columns = wall
              if (relCol === 0 || relCol === b.width - 1) {
                char =
                  b.style === "glass" ? "║" : b.style === "minimal" ? "│" : "█";
                charColor = color;
              } else {
                // Interior: windows
                const windowRow =
                  Math.floor((relRow + b.windowPhase) / 2) % 2 === 0;
                const windowCol = relCol % 2 === 1;
                if (windowRow && windowCol) {
                  const flickerSeed =
                    (col * 7 + row * 13 + state.frame * 0) % 97;
                  const isOn = flickerSeed > 20;
                  char = isOn
                    ? BUILDING_CHARS.window_on[
                        relCol % BUILDING_CHARS.window_on.length
                      ]
                    : BUILDING_CHARS.window_off[
                        relCol % BUILDING_CHARS.window_off.length
                      ];
                  charColor = isOn ? dimColor : color;
                  if (char === " ") {
                    continue;
                  }
                } else {
                  // Structural fill
                  switch (b.style) {
                    case "dense":
                      char = NEON_CHARS[relCol % NEON_CHARS.length];
                      break;
                    case "glass":
                      char = SPARSE_CHARS[relCol % SPARSE_CHARS.length];
                      charColor = color;
                      break;
                    case "grid":
                      char = STRUCTURAL_CHARS[relRow % STRUCTURAL_CHARS.length];
                      break;
                    case "minimal":
                      char = relCol % 3 === 0 ? "│" : " ";
                      break;
                  }
                  if (char === " ") continue;
                }
              }
            }

            drawChar(
              col,
              row,
              char,
              charColor,
              0.85 + (relRow / b.height) * 0.15,
            );
          }
        }

        // Antenna
        if (b.hasAntenna) {
          const antennaCol = b.x + Math.floor(b.width / 2);
          for (let ar = 0; ar < b.antennaHeight; ar++) {
            const antennaChar =
              ar === b.antennaHeight - 1
                ? charSet === "blocks"
                  ? BUILDING_CHARS.peak[0]
                  : charAt(CHAR_POOLS.neon, ar)
                : charSet === "blocks"
                  ? BUILDING_CHARS.antenna[ar % BUILDING_CHARS.antenna.length]
                  : charAt(CHAR_POOLS.neon, ar + 1);
            drawChar(antennaCol, topRow - 1 - ar, antennaChar, palette[2], 0.9);
          }
          // Peak light
          if (b.hasPeakLight) {
            const lightChar = b.lightOn ? "●" : "○";
            drawChar(
              antennaCol,
              topRow - b.antennaHeight - 1,
              lightChar,
              palette[2],
              b.lightOn ? 1 : 0.3,
            );
          }
        }
      }

      // ── Draw vehicles ─────────────────────────────────────────────────────
      if (showVehicles) {
        for (const v of vehicles) {
          v.x += v.speed * v.direction;
          if (v.x > cols + 5) v.x = -5;
          if (v.x < -5) v.x = cols + 5;

          const vColor = palette[v.colorIdx];
          const vcDef = VEHICLE_CHARS[v.type];
          const col = Math.round(v.x);

          // Trail
          v.trail.push({ x: col, y: v.y, alpha: 0.5 });
          if (v.trail.length > 6) v.trail.shift();
          for (let ti = 0; ti < v.trail.length; ti++) {
            const t = v.trail[ti];
            drawChar(
              t.x - v.direction,
              t.y,
              "·",
              vColor,
              t.alpha * (ti / v.trail.length) * 0.4,
            );
          }

          // Vehicle body
          if (v.direction === 1) {
            drawChar(col, v.y, vcDef.left, vColor);
            drawChar(col + 1, v.y, vcDef.body, vColor);
            drawChar(col + 2, v.y, vcDef.right, vColor);
          } else {
            drawChar(col, v.y, vcDef.right, vColor);
            drawChar(col + 1, v.y, vcDef.body, vColor);
            drawChar(col + 2, v.y, vcDef.left, vColor);
          }
        }
      }

      // ── Atmospheric scanlines / noise ─────────────────────────────────────
      if (state.frame % 3 === 0) {
        const noiseRow = Math.floor(Math.random() * rows);
        for (let c = 0; c < cols; c++) {
          if (Math.random() < 0.03) {
            const nc = charAt(
              CHAR_POOLS.neon,
              Math.floor(Math.random() * CHAR_POOLS.neon.length),
            );
            drawChar(
              c,
              noiseRow,
              nc,
              palette[Math.floor(Math.random() * 3)],
              0.12,
            );
          }
        }
      }
    };

    const interval = setInterval(draw, speed);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, [
    cityType,
    variant,
    colorPrimary,
    colorSecondary,
    colorTertiary,
    bgColor,
    fontSize,
    speed,
    showVehicles,
    blinkingLights,
    charSet,
    customChars,
    colors,
  ]);

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden ${className ?? ""}`}
      style={{ background: bgColor }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{ opacity: opacity / 100 }}
      />
    </div>
  );
}
