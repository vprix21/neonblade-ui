"use client";

import React, { forwardRef, InputHTMLAttributes, useId } from "react";
import "./neon-input.css";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Input shape — corner-cut gives the iconic NeonBlade diagonal cut */
export type NIShape = "rectangle" | "corner-cut" | "rounded";

/** Which corner(s) receive the diagonal cut (only for shape="corner-cut") */
export type NICorner =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "tl-br"
  | "bl-tr"
  | "all";

/** Input field size */
export type NISize = "sm" | "md" | "lg";

/** Visual style variant — controls background treatment */
export type NIVariant = "outline" | "filled";

/**
 * Border rendering style:
 * - `"full"`   — border on all sides, including the diagonal cut edge (default)
 * - `"bottom"` — only a bottom underline; shape/corner props are ignored
 * - `"none"`   — borderless; background fill only
 */
export type NIBorderStyle = "full" | "bottom" | "none";

/** Neon glow spread on focus */
export type NIGlowIntensity = "none" | "subtle" | "normal" | "strong";

// ─── Color presets ────────────────────────────────────────────────────────────

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
  orange: "#ff9900",
  purple: "#bf00ff",
  red: "#ff3333",
};

function resolveColor(c: string | undefined, fallback: string): string {
  if (!c) return fallback;
  return COLOR_PRESETS[c] ?? c;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const CLIP_CLASSES: Record<NICorner, string> = {
  "bottom-right": "ni-clip-br",
  "bottom-left": "ni-clip-bl",
  "top-right": "ni-clip-tr",
  "top-left": "ni-clip-tl",
  "tl-br": "ni-clip-tl-br",
  "bl-tr": "ni-clip-bl-tr",
  all: "ni-clip-all",
};

const SIZE_CLASSES: Record<
  NISize,
  { pad: string; inputH: string; text: string; label: string; hint: string }
> = {
  sm: {
    pad: "px-3 py-1.5",
    inputH: "h-8",
    text: "text-xs",
    label: "text-[10px]",
    hint: "text-[9px]",
  },
  md: {
    pad: "px-4 py-2",
    inputH: "h-10",
    text: "text-sm",
    label: "text-xs",
    hint: "text-[10px]",
  },
  lg: {
    pad: "px-5 py-3",
    inputH: "h-12",
    text: "text-base",
    label: "text-sm",
    hint: "text-xs",
  },
};

const GLOW_SIZE: Record<NIGlowIntensity, string> = {
  none: "0px",
  subtle: "4px",
  normal: "10px",
  strong: "20px",
};

// ─── Props interface ──────────────────────────────────────────────────────────

export interface NeonInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> {
  // ── Shape ───────────────────────────────────────────────────────────────
  /**
   * Input field shape.
   * - `"corner-cut"` — iconic NeonBlade diagonal corner (default)
   * - `"rectangle"`  — sharp rectangular border
   * - `"rounded"`    — softly rounded corners
   * @default "corner-cut"
   */
  shape?: NIShape;

  /**
   * Which corner(s) are cut. Only applies when shape="corner-cut".
   * - Single: `"bottom-right"` | `"bottom-left"` | `"top-right"` | `"top-left"`
   * - Diagonal pair: `"tl-br"` (top-left + bottom-right) | `"bl-tr"` (bottom-left + top-right)
   * - `"all"` — all four corners
   * @default "bottom-right"
   */
  corner?: NICorner;

  /**
   * Depth of the diagonal corner cut in pixels.
   * @default 12
   */
  cornerSize?: number;

  /**
   * Border rendering style.
   * - `"full"`   — full border on all sides, including the diagonal cut edge (default)
   * - `"bottom"` — only a bottom underline border; shape/corner are ignored
   * - `"none"`   — no border at all; background fill only (borderless)
   * @default "full"
   */
  borderStyle?: NIBorderStyle;

  // ── Colors ──────────────────────────────────────────────────────────────
  /**
   * Main accent color — drives border, glow, caret, prefix/suffix icons.
   * Use a preset name ("cyan" | "pink" | "green" | "orange" | "purple" | "red")
   * or any valid CSS color value.
   * @default "cyan"
   */
  color?: string;

  /** Override the border color. Defaults to `color`. */
  borderColor?: string;

  /** Border color on hover. Defaults to `color`. */
  hoverColor?: string;

  /** Border color and glow color when the input is focused. Defaults to `color`. */
  focusColor?: string;

  /**
   * Background color of the input field.
   * @default "#0a0f14"
   */
  bgColor?: string;

  /**
   * Background opacity as a percentage (0–100).
   * 100 = fully opaque (default), 0 = fully transparent.
   * Combines with `bgColor` — e.g. bgColor="cyan" bgOpacity={20} gives a
   * subtle cyan tint. Works with all variant values.
   * @default 100
   */
  bgOpacity?: number;

  /**
   * Text color of the typed value.
   * @default "#e0f8ff"
   */
  textColor?: string;

  /**
   * Color of the placeholder text.
   * Defaults to the accent color at 35% opacity.
   */
  placeholderColor?: string;

  // ── Label & hint ────────────────────────────────────────────────────────
  /** Optional label displayed above the input (font-orbitron uppercase). */
  label?: string;

  /** Color of the label text. Defaults to accent color at 65% opacity. */
  labelColor?: string;

  /** Helper text shown below the input. */
  hint?: string;

  /** Color of the hint text. Defaults to rgba(255,255,255,0.35). */
  hintColor?: string;

  /**
   * Error message. When set the border turns red and this message is shown
   * below the input instead of `hint`.
   */
  error?: string;

  // ── Visual ──────────────────────────────────────────────────────────────
  /**
   * Visual style variant — controls background treatment.
   * - `"outline"` — uses bgColor, full border (default)
   * - `"filled"`  — subtle accent-tinted background
   * @default "outline"
   */
  variant?: NIVariant;

  /**
   * Controls padding, height, and font size of the input.
   * @default "md"
   */
  size?: NISize;

  /**
   * Spread of the neon drop-shadow emitted when the input is focused.
   * @default "normal"
   */
  glowIntensity?: NIGlowIntensity;

  // ── Prefix / suffix ─────────────────────────────────────────────────────
  /** Node rendered before the input — ideal for icons or short strings. */
  prefix?: React.ReactNode;

  /** Node rendered after the input — ideal for icons, action buttons, or units. */
  suffix?: React.ReactNode;

  // ── Extra classes ────────────────────────────────────────────────────────
  /** Extra class names applied to the outermost wrapper. */
  className?: string;
  /** Extra class names applied directly to the `<input>` element. */
  inputClassName?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const NeonInput = forwardRef<HTMLInputElement, NeonInputProps>(
  function NeonInput(
    {
      // Shape
      shape = "corner-cut",
      corner = "bottom-right",
      cornerSize = 12,
      borderStyle = "full",

      // Colors
      color = "cyan",
      borderColor,
      hoverColor,
      focusColor,
      bgColor = "#0a0f14",
      bgOpacity = 100,
      textColor,
      placeholderColor,

      // Label & hint
      label,
      labelColor,
      hint,
      hintColor,
      error,

      // Visual
      variant = "outline",
      size = "md",
      glowIntensity = "normal",

      // Slots
      prefix,
      suffix,

      // Class names
      className = "",
      inputClassName = "",

      // Native
      disabled,
      id: idProp,
      ...inputProps
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;

    // ── Resolve colors ────────────────────────────────────────────────────────
    const accent = resolveColor(color, "#00f3ff");
    const resolvedBorder = resolveColor(borderColor, accent);
    const resolvedHover = resolveColor(hoverColor, accent);
    const resolvedFocus = resolveColor(focusColor, accent);
    const resolvedText = resolveColor(textColor, "#e0f8ff");
    const resolvedPh = resolveColor(placeholderColor, `${accent}59`); // ~35% opacity
    const resolvedLabel = resolveColor(labelColor, `${accent}a6`); // ~65% opacity
    const resolvedHint = resolveColor(hintColor, "rgba(255,255,255,0.35)");

    // ── Error state overrides ────────────────────────────────────────────────
    const hasError = Boolean(error);
    const activeBorder = hasError ? "#ff4444" : resolvedBorder;
    const activeFocus = hasError ? "#ff4444" : resolvedFocus;

    // ── Background with opacity ───────────────────────────────────────────────
    //
    // bgOpacity fades toward the page background (#020208) rather than CSS
    // `transparent`. This keeps the inner element opaque so the double-layer
    // clip border technique always works — identical to how CornerCutButton's
    // ghost variant uses color-mix(accent 12%, #000) to stay opaque.
    let innerBg = bgColor ?? "#0a0f14";
    if (variant === "filled")
      innerBg = `color-mix(in srgb, ${accent} 10%, ${innerBg})`;
    if (bgOpacity < 100)
      innerBg = `color-mix(in srgb, ${innerBg} ${bgOpacity}%, #020208)`;

    // ── Shape helpers ─────────────────────────────────────────────────────────
    const clipClass = shape === "corner-cut" ? CLIP_CLASSES[corner] : "";
    const radiusClass = shape === "rounded" ? "rounded-md" : "";

    // ── Glow / size ───────────────────────────────────────────────────────────
    const glow = GLOW_SIZE[glowIntensity];
    const sc = SIZE_CLASSES[size];

    // ── Content row (shared across all border styles) ────────────────────────
    const contentRow = (
      <>
        {prefix && (
          <span className="ni-prefix" style={{ color: accent }}>
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`ni-input font-mono ${sc.inputH} ${sc.text} ${inputClassName}`}
          style={
            {
              color: resolvedText,
              "--ni-ph-color": resolvedPh,
            } as React.CSSProperties
          }
          disabled={disabled}
          {...inputProps}
        />
        {suffix && (
          <span className="ni-suffix" style={{ color: accent }}>
            {suffix}
          </span>
        )}
      </>
    );

    // ── Shell — border + shape ────────────────────────────────────────────────
    //
    // "full" border uses the double-layer clip technique (same as NeonGlowCornerCutCard):
    //   • ni-outer        — p-[1px] wrapper; creates the 1px gap around the inner
    //   • ni-border-frame — absolute inset-0, same clip-path as inner;
    //                       background = CSS var (--ni-border) → transitions on
    //                       hover/focus via CSS rules below
    //   • ni-inner        — relative z-10, same clip-path, background = content bg
    //
    // Because clip-path clips CSS borders away at the diagonal, this approach
    // renders the full border color — including the cut corner edges — correctly.

    let shell: React.ReactNode;

    if (borderStyle === "full") {
      // Double-layer clip technique — border-frame bg shows the 1px ring
      // including at the diagonal corner edge. Inner bg blends toward page bg
      // (#020208) rather than CSS transparent, keeping it opaque so the
      // border-frame never bleeds through.
      shell = (
        <div className={`ni-outer relative p-px ${radiusClass}`}>
          {/* Border frame — clip-path + bg = accent → becomes the 1px visible border */}
          <div
            className={`ni-border-frame absolute inset-0 ${clipClass} ${radiusClass} pointer-events-none`}
            aria-hidden="true"
          />
          {/* Inner — sits on top; its bg reveals only the 1px border-frame edge */}
          <div
            className={`ni-inner relative z-10 flex items-center gap-2 ${clipClass} ${radiusClass} ${sc.pad}`}
            style={{ background: innerBg }}
          >
            {contentRow}
          </div>
        </div>
      );
    } else if (borderStyle === "bottom") {
      // Underline only — no clip-path (shape irrelevant for this style)
      shell = (
        <div
          className={`ni-bottom-shell flex items-center gap-2 ${sc.pad}`}
          style={{ background: innerBg }}
        >
          {contentRow}
        </div>
      );
    } else {
      // borderStyle === "none" — borderless; clip-path still applies for shape
      shell = (
        <div
          className={`ni-borderless-shell flex items-center gap-2 ${clipClass} ${radiusClass} ${sc.pad}`}
          style={{ background: innerBg }}
        >
          {contentRow}
        </div>
      );
    }

    return (
      <div
        className={`ni-field-root${disabled ? " ni-disabled" : ""}${
          className ? ` ${className}` : ""
        }`}
        style={
          {
            "--ni-accent": accent,
            "--ni-border": activeBorder,
            "--ni-hover": resolvedHover,
            "--ni-focus": activeFocus,
            "--ni-glow": glow,
            "--ni-corner": `${cornerSize}px`,
          } as React.CSSProperties
        }
      >
        {/* ── Label ───────────────────────────────────────────────────── */}
        {label && (
          <label
            htmlFor={inputId}
            className={`ni-label font-orbitron tracking-widest uppercase ${sc.label}`}
            style={{ color: resolvedLabel }}
          >
            {label}
          </label>
        )}

        {/* ── Glow wrapper — drop-shadow lives here, outside clip-path ── */}
        <div className="ni-glow-wrapper">{shell}</div>

        {/* ── Hint / Error ────────────────────────────────────────────── */}
        {(hint || error) && (
          <span
            className={`ni-hint font-mono ${sc.hint}`}
            style={{ color: hasError ? "#ff4444" : resolvedHint }}
          >
            {error ?? hint}
          </span>
        )}
      </div>
    );
  },
);

NeonInput.displayName = "NeonInput";

export default NeonInput;
