"use client";

import React, { useCallback, useId, useRef, useState } from "react";
import "./neon-select.css";

// ── Types ─────────────────────────────────────────────────────────────────────

export type NSLColor = "cyan" | "pink" | "green" | (string & {});
export type NSLSize = "sm" | "md" | "lg";
export type NSLVariant = "square" | "corner-cut";

export interface NeonSelectOption {
  value: string;
  label?: string;
  disabled?: boolean;
}

export interface NeonSelectProps {
  /** Options list. */
  options: NeonSelectOption[];
  /** Controlled value. */
  value?: string;
  /** Default value (uncontrolled). */
  defaultValue?: string;
  /** Change handler. */
  onChange?: (value: string) => void;
  /** Placeholder shown when nothing is selected. */
  placeholder?: string;
  /** Neon accent color. @default "cyan" */
  color?: NSLColor;
  /** Size preset. @default "md" */
  size?: NSLSize;
  /** Box style variant. @default "square" */
  variant?: NSLVariant;
  /** Optional field label rendered above the trigger. */
  label?: string;
  /** Disable the entire select. @default false */
  disabled?: boolean;
  /** Additional className on the wrapper. */
  className?: string;
  /** id for the trigger button (for aria-labelledby). */
  id?: string;
  /** aria-label for the trigger and list. */
  ariaLabel?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};
function resolveColor(c: NSLColor): string {
  return PRESETS[c] ?? c;
}

const PADDING: Record<NSLSize, string> = {
  sm: "6px 10px",
  md: "9px 14px",
  lg: "12px 18px",
};
const FONT: Record<NSLSize, number> = { sm: 11, md: 13, lg: 15 };
const CUT: Record<NSLSize, number> = { sm: 6, md: 8, lg: 10 };
const LIST_CUT: Record<NSLSize, number> = { sm: 8, md: 10, lg: 12 };

// ── Component ─────────────────────────────────────────────────────────────────

export const NeonSelect: React.FC<NeonSelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "SELECT...",
  color = "cyan",
  size = "md",
  variant = "square",
  label,
  disabled = false,
  className = "",
  id,
  ariaLabel,
}) => {
  const autoId = useId();
  const listId = `${id ?? autoId}-list`;
  const accent = resolveColor(color);
  const cut = CUT[size];
  const listCut = LIST_CUT[size];
  const cc = variant === "corner-cut";

  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = value !== undefined ? value : internalValue;

  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((o) => o.value === currentValue);
  const enabledOpts = options.filter((o) => !o.disabled);

  const selectOption = useCallback(
    (opt: NeonSelectOption) => {
      if (opt.disabled) return;
      if (value === undefined) setInternalValue(opt.value);
      onChange?.(opt.value);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [value, onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (open && focusedIdx >= 0) selectOption(enabledOpts[focusedIdx]);
          else setOpen((o) => !o);
          break;
        case "Escape":
          setOpen(false);
          triggerRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            setOpen(true);
            setFocusedIdx(0);
          } else setFocusedIdx((i) => Math.min(i + 1, enabledOpts.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIdx((i) => Math.max(i - 1, 0));
          break;
        case "Tab":
          setOpen(false);
          break;
      }
    },
    [disabled, open, focusedIdx, enabledOpts, selectOption],
  );

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Clip-path strings
  const triggerClip = `polygon(0 0, 100% 0, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, 0 100%)`;
  const listClip = `polygon(0 0, 100% 0, 100% calc(100% - ${listCut}px), calc(100% - ${listCut}px) 100%, 0 100%)`;

  /* ── Trigger element ── */
  const triggerBtn = (
    <button
      ref={triggerRef}
      id={id}
      type="button"
      className={`nsl-trigger${open ? " nsl-trigger-open" : ""}${cc ? " nsl-trigger-cc" : ""}`}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listId}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && setOpen((o) => !o)}
      onKeyDown={handleKeyDown}
      style={{
        padding: PADDING[size],
        fontSize: FONT[size],
        ...(cc ? { clipPath: triggerClip } : {}),
      }}
    >
      <span
        className={`nsl-value${!selectedOption ? " nsl-placeholder" : ""}`}
        style={{ fontSize: FONT[size] }}
      >
        {selectedOption?.label ?? selectedOption?.value ?? placeholder}
      </span>
      <span className="nsl-arrow" aria-hidden="true">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );

  return (
    <div
      ref={wrapperRef}
      className={`nsl-wrapper${disabled ? " nsl-disabled" : ""}${open ? " nsl-open" : ""} ${className}`}
      style={{ "--nsl-accent": accent } as React.CSSProperties}
    >
      {label && (
        <span className="nsl-label" style={{ fontSize: FONT[size] - 2 }}>
          {label}
        </span>
      )}

      {cc ? (
        /*
         * Corner-cut — two-layer frame technique (same as NeonCheckbox corner-cut):
         *   nsl-frame  : border-color background, clip-path applied, no own border
         *   nsl-trigger: fills frame with 1px inset, dark bg, no clip-path
         * Result: the 1px frame rim is visible on all edges incl. the diagonal.
         */
        <div
          className={`nsl-frame${open ? " nsl-frame-open" : ""}`}
          style={{ clipPath: triggerClip }}
        >
          {triggerBtn}
        </div>
      ) : (
        triggerBtn
      )}

      {/* Dropdown */}
      {open &&
        (cc ? (
          <div className="nsl-list-frame" style={{ clipPath: listClip }}>
            <ul
              id={listId}
              role="listbox"
              className="nsl-list nsl-list-cc"
              style={{ clipPath: listClip }}
              aria-label={ariaLabel}
              onKeyDown={handleKeyDown}
            >
              {options.map((opt) => {
                const enabledIdx = enabledOpts.indexOf(opt);
                const isFocused = enabledIdx === focusedIdx;
                const isSelected = opt.value === currentValue;
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled}
                    className={`nsl-option${isSelected ? " nsl-selected" : ""}${isFocused ? " nsl-focused" : ""}${opt.disabled ? " nsl-option-disabled" : ""}`}
                    style={{ fontSize: FONT[size], padding: PADDING[size] }}
                    onClick={() => selectOption(opt)}
                    onMouseEnter={() => setFocusedIdx(enabledIdx)}
                  >
                    {isSelected && (
                      <span className="nsl-check" aria-hidden="true">
                        ✓
                      </span>
                    )}
                    <span>{opt.label ?? opt.value}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <ul
            id={listId}
            role="listbox"
            className="nsl-list"
            aria-label={ariaLabel}
            onKeyDown={handleKeyDown}
          >
            {options.map((opt) => {
              const enabledIdx = enabledOpts.indexOf(opt);
              const isFocused = enabledIdx === focusedIdx;
              const isSelected = opt.value === currentValue;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  className={`nsl-option${isSelected ? " nsl-selected" : ""}${isFocused ? " nsl-focused" : ""}${opt.disabled ? " nsl-option-disabled" : ""}`}
                  style={{ fontSize: FONT[size], padding: PADDING[size] }}
                  onClick={() => selectOption(opt)}
                  onMouseEnter={() => setFocusedIdx(enabledIdx)}
                >
                  {isSelected && (
                    <span className="nsl-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                  <span>{opt.label ?? opt.value}</span>
                </li>
              );
            })}
          </ul>
        ))}
    </div>
  );
};

export default NeonSelect;
