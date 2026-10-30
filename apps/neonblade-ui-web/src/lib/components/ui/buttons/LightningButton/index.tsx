"use client";

import React, {
  ButtonHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import "./lightning-button.css";

// ---- Types -------------------------------------------------

/** Named color presets or any valid CSS color string (e.g. "#ff4400", "hsl(180,100%,50%)") */
export type LBColor = "cyan" | "pink" | "green" | (string & {});

/** Button size */
export type LBSize = "xs" | "sm" | "md" | "lg" | "xl";

/** Visual style variant */
export type LBVariant = "solid" | "outline" | "ghost";

/** Controls the spread radius of the bolt glow */
export type LBGlowIntensity = "low" | "medium" | "high";

/**
 * Press/click animation:
 * - `ripple`     — expanding ring from the press point
 * - `shine`      — a one-shot diagonal light sweep
 * - `mechanical` — physical squash + darken, like a real switch
 * - `destroy`    — cracks spread across the button, then it blasts into glowing shards and reforms
 * - `none`       — no press animation
 */
export type LBPressEffect =
  | "ripple"
  | "shine"
  | "mechanical"
  | "destroy"
  | "none";

// ---- Maps --------------------------------------------------

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

const SIZE_CLASSES: Record<LBSize, string> = {
  xs: "px-4 py-2 text-xs",
  sm: "px-6 py-3 text-xs",
  md: "px-8 py-4 text-sm",
  lg: "px-10 py-5 text-base",
  xl: "px-12 py-6 text-lg",
};

const GLOW_PX: Record<LBGlowIntensity, number> = {
  low: 6,
  medium: 12,
  high: 22,
};

// ---- Component props ---------------------------------------

export interface LightningButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  /**
   * Button accent color. Use a preset name ("cyan" | "pink" | "green") or any CSS color value.
   * @default "cyan"
   */
  color?: LBColor;

  /**
   * Color of the lightning bolts. Falls back to `color` when not set.
   */
  lightningColor?: LBColor;

  /**
   * Color of the bright inner core of each bolt.
   * @default "#ffffff"
   */
  coreColor?: string;

  /**
   * Button size controlling padding and font size.
   * @default "md"
   */
  size?: LBSize;

  /**
   * Visual style variant.
   * @default "solid"
   */
  variant?: LBVariant;

  /**
   * Apply a diagonal bottom-right corner cut.
   * @default true
   */
  cut?: boolean;

  /**
   * Depth of the corner cut in pixels (ignored when `cut` is false).
   * @default 16
   */
  cornerSize?: number;

  /**
   * Radius (in px, measured from the button edge) within which the cursor
   * triggers the lightning tendrils.
   * @default 150
   */
  radius?: number;

  /**
   * Number of lightning tendrils connecting the button border to the cursor.
   * @default 5
   */
  boltCount?: number;

  /**
   * Number of segments per bolt — higher values produce a more jagged path.
   * @default 7
   */
  segments?: number;

  /**
   * Maximum perpendicular displacement of each bolt segment, in pixels.
   * @default 16
   */
  jitter?: number;

  /**
   * Stroke width of each bolt's bright core, in pixels.
   * @default 1.4
   */
  thickness?: number;

  /**
   * Spread radius of the bolt glow.
   * @default "medium"
   */
  glowIntensity?: LBGlowIntensity;

  /**
   * Milliseconds between bolt-shape regenerations — lower values crackle faster.
   * @default 60
   */
  flickerSpeed?: number;

  /**
   * When true, the button border keeps a subtle ambient glow at rest.
   * @default true
   */
  idleGlow?: boolean;

  /**
   * Animation played when the button is pressed/clicked.
   * @default "ripple"
   */
  pressEffect?: LBPressEffect;
}

// ---- Helpers -------------------------------------------------

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/** Point where a ray from the rect center at `angle` exits the rect border. */
function rectAnchor(angle: number, w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const tx = dx !== 0 ? w / 2 / Math.abs(dx) : Infinity;
  const ty = dy !== 0 ? h / 2 / Math.abs(dy) : Infinity;
  const t = Math.min(tx, ty);
  return { x: cx + dx * t, y: cy + dy * t };
}

function strokePath(ctx: CanvasRenderingContext2D, pts: [number, number][]) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke();
}

/** Jagged SVG path string radiating from (ox, oy) toward `angle`, for the pre-blast crack effect. */
function buildCrackPath(
  ox: number,
  oy: number,
  angle: number,
  length: number,
  segments: number,
) {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const nx = -dy;
  const ny = dx;
  let d = `M ${ox.toFixed(1)} ${oy.toFixed(1)}`;
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const baseX = ox + dx * length * t;
    const baseY = oy + dy * length * t;
    const jitter = (Math.random() - 0.5) * length * 0.22 * (1 - t * 0.5);
    d += ` L ${(baseX + nx * jitter).toFixed(1)} ${(baseY + ny * jitter).toFixed(1)}`;
  }
  return d;
}

function drawBolt(
  ctx: CanvasRenderingContext2D,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  seeds: number[],
  segments: number,
  jitterPx: number,
  glowColor: string,
  coreColor: string,
  thickness: number,
  glowPx: number,
  alpha: number,
) {
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;

  const pts: [number, number][] = [[ax, ay]];
  for (let k = 1; k < segments; k++) {
    const t = k / segments;
    const baseX = ax + dx * t;
    const baseY = ay + dy * t;
    const taper = Math.sin(Math.PI * t);
    const disp = seeds[k - 1] * jitterPx * taper;
    pts.push([baseX + nx * disp, baseY + ny * disp]);
  }
  pts.push([bx, by]);

  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.globalAlpha = alpha * 0.55;
  ctx.shadowBlur = glowPx;
  ctx.shadowColor = glowColor;
  ctx.strokeStyle = glowColor;
  ctx.lineWidth = thickness * 2.5;
  strokePath(ctx, pts);

  ctx.globalAlpha = alpha;
  ctx.shadowBlur = glowPx * 0.5;
  ctx.strokeStyle = coreColor;
  ctx.lineWidth = thickness;
  strokePath(ctx, pts);

  ctx.restore();
}

// ---- Component ---------------------------------------------

export const LightningButton: React.FC<LightningButtonProps> = ({
  children,
  color = "cyan",
  lightningColor,
  coreColor = "#ffffff",
  size = "md",
  variant = "solid",
  cut = true,
  cornerSize = 16,
  radius = 150,
  boltCount = 5,
  segments = 7,
  jitter = 16,
  thickness = 1.4,
  glowIntensity = "medium",
  flickerSpeed = 60,
  idleGlow = true,
  pressEffect = "ripple",
  className = "",
  style,
  disabled,
  onClick,
  onPointerDown,
  ...props
}) => {
  const resolvedColor = COLOR_PRESETS[color] ?? color;
  const resolvedLightningColor = lightningColor
    ? (COLOR_PRESETS[lightningColor] ?? lightningColor)
    : resolvedColor;
  const glowPx = GLOW_PX[glowIntensity];

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const mouseRef = useRef({ x: 0, y: 0, hasMoved: false });
  const angleOffsetsRef = useRef<number[]>([]);
  const seedsRef = useRef<number[][]>([]);
  const lastRegenRef = useRef(0);
  const activeRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const destroyActiveRef = useRef(false);

  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);
  const [shineKey, setShineKey] = useState(0);
  const [cracking, setCracking] = useState(false);
  const [cracks, setCracks] = useState<
    { id: number; d: string; delay: number }[]
  >([]);
  const [crackBox, setCrackBox] = useState({ w: 0, h: 0 });
  const [destroying, setDestroying] = useState(false);
  const [shards, setShards] = useState<
    {
      id: number;
      tx: number;
      ty: number;
      rot: number;
      delay: number;
      w: number;
      h: number;
    }[]
  >([]);
  const crackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const destroyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerRipple = (x: number, y: number) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x, y, size }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
  };

  const blastApart = (span: number) => {
    const count = 22;
    setShards(
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.9;
        const dist = span * (0.8 + Math.random() * 1.6);
        return {
          id: Date.now() + i,
          tx: Math.cos(angle) * dist,
          // bias downward so shrapnel feels pulled by gravity after the blast
          ty: Math.sin(angle) * dist + 40 + Math.random() * 90,
          rot: (Math.random() - 0.5) * 1080,
          delay: Math.random() * 40,
          w: 3 + Math.random() * 12,
          h: 3 + Math.random() * 12,
        };
      }),
    );
    setCracking(false);
    setDestroying(true);
    if (destroyTimeoutRef.current) clearTimeout(destroyTimeoutRef.current);
    destroyTimeoutRef.current = setTimeout(() => {
      setDestroying(false);
      setShards([]);
      setCracks([]);
      // lightning can track the cursor again once the button has reformed
      destroyActiveRef.current = false;
    }, 900);
  };

  const triggerDestroy = (ox: number, oy: number, w: number, h: number) => {
    if (crackTimeoutRef.current) clearTimeout(crackTimeoutRef.current);
    if (destroyTimeoutRef.current) clearTimeout(destroyTimeoutRef.current);

    // suppress the lightning overlay for the whole crack + blast sequence
    destroyActiveRef.current = true;
    activeRef.current = false;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    buttonRef.current?.removeAttribute("data-lightning-active");

    const span = Math.max(w, h);
    const maxLen = Math.hypot(w, h);
    const crackCount = 6 + Math.floor(Math.random() * 3);
    setCrackBox({ w, h });
    setCracks(
      Array.from({ length: crackCount }, (_, i) => {
        const angle =
          (i / crackCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        const length = maxLen * (0.45 + Math.random() * 0.55);
        return {
          id: Date.now() + i,
          d: buildCrackPath(ox, oy, angle, length, 4),
          delay: Math.random() * 70,
        };
      }),
    );
    setDestroying(false);
    setCracking(true);

    // let the cracks spread for a beat before the button blasts apart
    crackTimeoutRef.current = setTimeout(() => blastApart(span), 260);
  };

  useEffect(() => {
    return () => {
      if (crackTimeoutRef.current) clearTimeout(crackTimeoutRef.current);
      if (destroyTimeoutRef.current) clearTimeout(destroyTimeoutRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      if (pressEffect === "ripple")
        triggerRipple(e.clientX - rect.left, e.clientY - rect.top);
      if (pressEffect === "shine") setShineKey((k) => k + 1);
    }
    onPointerDown?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && pressEffect === "destroy") {
      const rect = e.currentTarget.getBoundingClientRect();
      triggerDestroy(
        e.clientX - rect.left,
        e.clientY - rect.top,
        rect.width,
        rect.height,
      );
    }
    onClick?.(e);
  };

  // Regenerate per-bolt angle offsets and crackle seeds whenever bolt/segment counts change
  useEffect(() => {
    angleOffsetsRef.current = Array.from(
      { length: boltCount },
      () => (Math.random() - 0.5) * 0.6,
    );
    seedsRef.current = Array.from({ length: boltCount }, () =>
      Array.from(
        { length: Math.max(1, segments - 1) },
        () => Math.random() * 2 - 1,
      ),
    );
  }, [boltCount, segments]);

  // Size the canvas to the button bounds expanded by `radius` on every side
  useEffect(() => {
    const btn = buttonRef.current;
    const canvas = canvasRef.current;
    if (!btn || !canvas) return;

    const resize = () => {
      const rect = btn.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const cssW = rect.width + radius * 2;
      const cssH = rect.height + radius * 2;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctxRef.current = ctx;
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(btn);
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [radius]);

  // Track cursor position + drive the bolt animation loop
  useEffect(() => {
    const btnAtMount = buttonRef.current;
    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.hasMoved = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);

      const btn = buttonRef.current;
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!btn || !canvas || !ctx) return;

      if (destroyActiveRef.current) {
        if (activeRef.current) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          btn.removeAttribute("data-lightning-active");
          activeRef.current = false;
        }
        return;
      }

      if (disabled || !mouseRef.current.hasMoved) {
        if (activeRef.current) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          btn.removeAttribute("data-lightning-active");
          activeRef.current = false;
        }
        return;
      }

      const rect = btn.getBoundingClientRect();
      const mx = mouseRef.current.x - rect.left;
      const my = mouseRef.current.y - rect.top;
      const w = rect.width;
      const h = rect.height;
      const cx = clamp(mx, 0, w);
      const cy = clamp(my, 0, h);
      const dist = Math.hypot(mx - cx, my - cy);
      const active = dist <= radius;

      if (!active) {
        if (activeRef.current) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          btn.removeAttribute("data-lightning-active");
          activeRef.current = false;
        }
        return;
      }

      activeRef.current = true;
      btn.setAttribute("data-lightning-active", "true");

      const now = performance.now();
      if (now - lastRegenRef.current >= flickerSpeed) {
        seedsRef.current = seedsRef.current.map(() =>
          Array.from(
            { length: Math.max(1, segments - 1) },
            () => Math.random() * 2 - 1,
          ),
        );
        lastRegenRef.current = now;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const originX = radius;
      const originY = radius;
      const cursorX = originX + mx;
      const cursorY = originY + my;
      const proximity = 1 - dist / radius;
      const alpha = 0.45 + proximity * 0.55;

      for (let i = 0; i < boltCount; i++) {
        const angle =
          (i / boltCount) * Math.PI * 2 + (angleOffsetsRef.current[i] ?? 0);
        const anchor = rectAnchor(angle, w, h);
        drawBolt(
          ctx,
          originX + anchor.x,
          originY + anchor.y,
          cursorX,
          cursorY,
          seedsRef.current[i] ?? [],
          segments,
          jitter,
          resolvedLightningColor,
          coreColor,
          thickness,
          glowPx,
          alpha,
        );
      }

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = glowPx;
      ctx.shadowColor = resolvedLightningColor;
      ctx.fillStyle = coreColor;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, thickness * 1.8 + 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      btnAtMount?.removeAttribute("data-lightning-active");
    };
  }, [
    radius,
    boltCount,
    segments,
    jitter,
    thickness,
    glowPx,
    flickerSpeed,
    resolvedLightningColor,
    coreColor,
    disabled,
  ]);

  return (
    <div
      ref={wrapperRef}
      className={["relative inline-flex p-px", className]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--lb-color": resolvedColor,
          "--lb-corner-size": `${cornerSize}px`,
          ...style,
        } as React.CSSProperties
      }
    >
      {/* Border frame: follows the clip-path, including the diagonal cut */}
      <div
        className={[
          "absolute inset-0 pointer-events-none z-0",
          cut ? "lb-clip-br" : "rounded-md",
          variant === "outline" ? "bg-[var(--lb-color)]" : "bg-white/[0.08]",
          pressEffect === "destroy" && destroying ? "lb-frame-destroying" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      />

      <button
        ref={buttonRef}
        disabled={disabled}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        className={[
          "lb-btn flex-1 relative font-orbitron font-bold tracking-wider uppercase cursor-pointer overflow-hidden",
          SIZE_CLASSES[size],
          cut ? "lb-clip-br" : "rounded-md",
          idleGlow ? "lb-idle-glow" : "",
          pressEffect === "mechanical" ? "lb-mechanical" : "",
          pressEffect === "destroy" && cracking ? "lb-cracking" : "",
          pressEffect === "destroy" && destroying ? "lb-destroying" : "",
          variant === "solid"
            ? "text-black bg-[var(--lb-color)]"
            : variant === "outline"
              ? "bg-black text-[var(--lb-color)]"
              : "text-[var(--lb-color)]",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={
          variant === "ghost"
            ? {
                backgroundColor:
                  "color-mix(in srgb, var(--lb-color) 12%, #000)",
              }
            : undefined
        }
        {...props}
      >
        {/* Ripple burst — click/tap feedback expanding from the press point */}
        {pressEffect === "ripple" &&
          ripples.map((r) => (
            <span
              key={r.id}
              className="lb-ripple"
              style={{
                left: r.x,
                top: r.y,
                width: r.size,
                height: r.size,
              }}
              aria-hidden="true"
            />
          ))}

        {/* Shine burst — one-shot diagonal sweep on press */}
        {pressEffect === "shine" && shineKey > 0 && (
          <span key={shineKey} className="lb-shine-burst" aria-hidden="true" />
        )}

        {/* Cracks — pressEffect="destroy", the fracture phase before the blast */}
        {pressEffect === "destroy" && cracking && crackBox.w > 0 && (
          <svg
            className="lb-cracks"
            viewBox={`0 0 ${crackBox.w} ${crackBox.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {cracks.map((c) => (
              <path
                key={c.id}
                d={c.d}
                style={{ animationDelay: `${c.delay}ms` }}
              />
            ))}
          </svg>
        )}

        <span className="relative z-10">{children}</span>
      </button>

      {/* Shatter shards — pressEffect="destroy" */}
      {pressEffect === "destroy" && destroying && (
        <>
          <span className="lb-flash" aria-hidden="true" />
          <span className="lb-shockwave" aria-hidden="true" />
          <div
            className="absolute inset-0 pointer-events-none z-30"
            aria-hidden="true"
          >
            {shards.map((s) => (
              <span
                key={s.id}
                className="lb-shard"
                style={
                  {
                    width: `${s.w}px`,
                    height: `${s.h}px`,
                    "--lb-shard-tx": `${s.tx}px`,
                    "--lb-shard-ty": `${s.ty}px`,
                    "--lb-shard-rot": `${s.rot}deg`,
                    "--lb-shard-delay": `${s.delay}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </>
      )}

      {/* Lightning overlay — expands beyond the button by `radius` on every side */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          left: -radius,
          top: -radius,
          zIndex: 20,
        }}
      />
    </div>
  );
};

export default LightningButton;
