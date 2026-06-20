"use client";

import React, { useCallback, useId } from "react";
import "./neon-checkbox.css";

// ── Types ─────────────────────────────────────────────────────────────────────

export type NCBColor = "cyan" | "pink" | "green" | (string & {});
export type NCBSize = "sm" | "md" | "lg";
export type NCBVariant = "square" | "corner-cut";

export interface NeonCheckboxProps {
  /** Controlled checked state. */
  checked?: boolean;
  /** Default checked state (uncontrolled). @default false */
  defaultChecked?: boolean;
  /** Indeterminate state (partial check). */
  indeterminate?: boolean;
  /** Change handler. */
  onChange?: (checked: boolean) => void;
  /** Neon accent color. @default "cyan" */
  color?: NCBColor;
  /** Size preset. @default "md" */
  size?: NCBSize;
  /** Box style. @default "square" */
  variant?: NCBVariant;
  /** Disable the checkbox. @default false */
  disabled?: boolean;
  /** Label text. */
  label?: string;
  /** Additional className on the wrapper. */
  className?: string;
  /** id for the input. Auto-generated if omitted. */
  id?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};
function resolveColor(c: NCBColor): string {
  return PRESETS[c] ?? c;
}

const BOX_SIZE: Record<NCBSize, number> = { sm: 14, md: 18, lg: 22 };
const CUT_SIZE: Record<NCBSize, number> = { sm: 4, md: 5, lg: 6 };

// ── Icons ─────────────────────────────────────────────────────────────────────

function CheckIcon({ size }: { size: number }) {
  return (
    <svg
      width={size * 0.62}
      height={size * 0.62}
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className="ncb-check-icon"
    >
      <polyline
        points="1.5,5 4,7.5 8.5,2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IndeterminateIcon({ size }: { size: number }) {
  return (
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="2"
        y1="5"
        x2="8"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export const NeonCheckbox: React.FC<NeonCheckboxProps> = ({
  checked,
  defaultChecked = false,
  indeterminate = false,
  onChange,
  color = "cyan",
  size = "md",
  variant = "square",
  disabled = false,
  label,
  className = "",
  id,
}) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const accent = resolveColor(color);
  const boxSize = BOX_SIZE[size];
  const cut = CUT_SIZE[size];

  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = checked !== undefined ? checked : internalChecked;
  const isActive = isChecked || indeterminate;

  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const next = e.target.checked;
      setInternalChecked(next);
      onChange?.(next);
    },
    [disabled, onChange],
  );

  // Clip-path polygon for corner-cut (bottom-right)
  const clipPath = `polygon(0 0, 100% 0, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, 0 100%)`;

  const icon =
    isChecked && !indeterminate ? (
      <CheckIcon size={boxSize} />
    ) : indeterminate ? (
      <IndeterminateIcon size={boxSize} />
    ) : null;

  return (
    <label
      htmlFor={inputId}
      className={["ncb-label", disabled ? "ncb-disabled" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={{ "--ncb-accent": accent } as React.CSSProperties}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="checkbox"
        className="ncb-input"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : isChecked}
      />

      {variant === "corner-cut" ? (
        /*
         * Two-layer corner-cut box:
         *   outer = full size, accent/border color background (no clip)
         *   inner = inset 1px, clip-path applied — dark fill
         *   The 1px strip of outer visible along all edges (incl. the diagonal) = the border
         */
        <span
          className={`ncb-cc-outer${isActive ? " ncb-checked" : ""}`}
          aria-hidden="true"
          style={{ width: boxSize + 2, height: boxSize + 2, clipPath }}
        >
          <span className="ncb-cc-inner" style={{ clipPath }} />
          <span className="ncb-icon-layer">{icon}</span>
        </span>
      ) : (
        /* Square (default) */
        <span
          className={`ncb-box${isActive ? " ncb-checked" : ""}`}
          aria-hidden="true"
          style={{ width: boxSize, height: boxSize }}
        >
          {icon}
        </span>
      )}

      {label && <span className="ncb-text">{label}</span>}
    </label>
  );
};

export default NeonCheckbox;
