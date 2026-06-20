"use client";

import React, { useCallback, useId } from "react";
import "./neon-toggle.css";

// -- Types --------------------------------------------------------------------

export type NTGColor = "cyan" | "pink" | "green" | (string & {});
export type NTGSize  = "sm" | "md" | "lg";

export interface NeonToggleProps {
  /** Controlled checked state. */
  checked?: boolean;
  /** Default checked state (uncontrolled). @default false */
  defaultChecked?: boolean;
  /** Change handler. */
  onChange?: (checked: boolean) => void;
  /** Neon accent color when on. @default "cyan" */
  color?: NTGColor;
  /** Size preset. @default "md" */
  size?: NTGSize;
  /** Disable the toggle. @default false */
  disabled?: boolean;
  /** Label text displayed next to the toggle. */
  label?: string;
  /** Label position. @default "right" */
  labelPosition?: "left" | "right";
  /** Additional className on the label wrapper. */
  className?: string;
  /** id for the underlying input. Auto-generated if omitted. */
  id?: string;
}

// -- Helpers ------------------------------------------------------------------

const PRESETS: Record<string, string> = {
  cyan:  "#00f3ff",
  pink:  "#ff00ff",
  green: "#39ff14",
};
function resolveColor(c: NTGColor): string {
  return PRESETS[c] ?? c;
}

// Track dimensions
const TRACK_W: Record<NTGSize, number> = { sm: 38, md: 48, lg: 60 };
const TRACK_H: Record<NTGSize, number> = { sm: 22, md: 28, lg: 34 };
// Thumb diameter — always leaves a uniform 3-4 px gap on all sides
const THUMB_D: Record<NTGSize, number> = { sm: 14, md: 18, lg: 24 };
// Uniform gap between thumb and track edge
const THUMB_GAP: Record<NTGSize, number> = { sm: 4, md: 5, lg: 5 };

// -- Component ----------------------------------------------------------------

export const NeonToggle: React.FC<NeonToggleProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  color   = "cyan",
  size    = "md",
  disabled = false,
  label,
  labelPosition = "right",
  className = "",
  id,
}) => {
  const autoId    = useId();
  const inputId   = id ?? autoId;
  const accent    = resolveColor(color);

  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const next = e.target.checked;
      if (checked === undefined) setInternalChecked(next);
      onChange?.(next);
    },
    [disabled, checked, onChange],
  );

  const tw  = TRACK_W[size];
  const th  = TRACK_H[size];
  const td  = THUMB_D[size];
  const gap = THUMB_GAP[size];
  // Horizontal travel distance for the thumb
  const travel = tw - td - gap * 2;

  return (
    <label
      htmlFor={inputId}
      className={`ntg-label ntg-label-${labelPosition}${disabled ? " ntg-disabled" : ""} ${className}`}
      style={{ "--ntg-accent": accent } as React.CSSProperties}
    >
      {label && labelPosition === "left" && (
        <span className="ntg-text">{label}</span>
      )}

      {/* Hidden native checkbox — accessibility */}
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        className="ntg-input"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        aria-checked={isChecked}
      />

      {/* Visual track */}
      <span
        className={`ntg-track${isChecked ? " ntg-on" : ""}`}
        aria-hidden="true"
        style={{ width: tw, height: th, borderRadius: th / 2 }}
      >
        {/* Thumb — centered via top:50% + translateY(-50%) so border never affects it */}
        <span
          className="ntg-thumb"
          style={{
            width:  td,
            height: td,
            left:   gap,
            transform: isChecked
              ? `translate(${travel}px, -50%)`
              : `translate(0px, -50%)`,
          }}
        />

        {/* Spark burst on activation */}
        {isChecked && (
          <>
            <span className="ntg-spark ntg-spark-1" aria-hidden="true" />
            <span className="ntg-spark ntg-spark-2" aria-hidden="true" />
            <span className="ntg-spark ntg-spark-3" aria-hidden="true" />
          </>
        )}
      </span>

      {label && labelPosition === "right" && (
        <span className="ntg-text">{label}</span>
      )}
    </label>
  );
};

export default NeonToggle;
