"use client";

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import "./modal.css";

// ── Types ────────────────────────────────────────────────────

/** Named accent color presets or any valid CSS color string. */
export type NMColor = "cyan" | "pink" | "green" | "orange" | (string & {});

/** Predefined max-width sizes for the dialog panel. */
export type NMSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

/** Which corner receives the diagonal cut. */
export type NMCorner =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "all"
  | "none";

/** Entry / exit animation pair. */
export type NMAnimation = "slide" | "scale" | "none";

/** Intensity of the outer neon glow drop-shadow. */
export type NMGlowIntensity = "none" | "low" | "medium" | "high";

/** Horizontal alignment of footer actions. */
export type NMFooterAlign = "left" | "center" | "right" | "between";

// ── Maps ─────────────────────────────────────────────────────

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
  orange: "#ff6b00",
};

const SIZE_MAP: Record<NMSize, string> = {
  xs: "380px",
  sm: "480px",
  md: "560px",
  lg: "680px",
  xl: "820px",
  full: "calc(100vw - 2rem)",
};

const CORNER_CLASSES: Record<NMCorner, string> = {
  "bottom-right": "nm-clip-br",
  "bottom-left": "nm-clip-bl",
  "top-right": "nm-clip-tr",
  "top-left": "nm-clip-tl",
  all: "nm-clip-all",
  none: "",
};

const GLOW_CLASSES: Record<NMGlowIntensity, string> = {
  none: "",
  low: "nm-glow-low",
  medium: "nm-glow-medium",
  high: "nm-glow-high",
};

const FOOTER_ALIGN_CLASSES: Record<NMFooterAlign, string> = {
  left: "nm-footer-left",
  center: "nm-footer-center",
  right: "nm-footer-right",
  between: "nm-footer-between",
};

// ── Sub-component interfaces ──────────────────────────────────

export interface NeonModalHeaderProps {
  /** Large heading text inside the modal header. */
  title: ReactNode;
  /**
   * Optional small label rendered above the title in the accent color.
   * Great for category / status context (e.g. "Warning", "System alert").
   */
  label?: string;
}

export interface NeonModalFooterProps {
  /** Slot for action buttons / content placed in the footer. */
  children: ReactNode;
  /** Horizontal alignment of footer content. @default "right" */
  align?: NMFooterAlign;
}

// ── Main component interface ──────────────────────────────────

export interface NeonModalProps {
  /** Controls whether the modal is visible. */
  open: boolean;
  /** Called when the user requests to close (backdrop click, Escape key, close button). */
  onClose: () => void;

  /**
   * Accent / neon color for the border, header label, and scrollbar.
   * Use a preset name or any valid CSS color string.
   * @default "cyan"
   */
  color?: NMColor;

  /**
   * Max-width size of the dialog panel.
   * @default "md"
   */
  size?: NMSize;

  /**
   * Corner style.
   * @default "bottom-right"
   */
  corner?: NMCorner;

  /**
   * Size of the corner cut in pixels.
   * @default 24
   */
  cornerSize?: number;

  /**
   * Entry/exit animation for the dialog panel.
   * @default "slide"
   */
  animation?: NMAnimation;

  /**
   * Outer neon glow intensity (drop-shadow on the wrapper).
   * @default "medium"
   */
  glowIntensity?: NMGlowIntensity;

  /**
   * Background color of the modal inner surface.
   * Accepts any valid CSS color string.
   * @default "#080b0d"
   */
  bgColor?: string;

  /**
   * When true, shows horizontal divider lines between header / body / footer.
   * Set to false for a plain borderless interior ("plain" variant).
   * @default true
   */
  dividers?: boolean;

  /**
   * When true, a comet-style beam animates around the modal border.
   * @default false
   */
  borderBeam?: boolean;

  /**
   * Revolution speed of the border beam in seconds.
   * Lower = faster. Only used when borderBeam is true.
   * @default 3
   */
  beamSpeed?: number;

  /**
   * Arc length of the comet tail in degrees (0–360).
   * Larger values = longer tail. Only used when borderBeam is true.
   * @default 60
   */
  beamLength?: number;

  /**
   * When true, the backdrop is blurred.
   * @default true
   */
  backdropBlur?: boolean;

  /**
   * When true, a dark translucent overlay is added behind the dialog.
   * @default true
   */
  backdropOverlay?: boolean;

  /**
   * When true, clicking the backdrop closes the modal.
   * @default true
   */
  closeOnBackdrop?: boolean;

  /**
   * When true, pressing Escape closes the modal.
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * When true, a close (×) button is displayed in the header.
   * Only rendered when a header is present.
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * When true, the body area becomes scrollable (max-height: 55vh).
   * @default false
   */
  scrollableBody?: boolean;

  /** Optional header configuration. Omit to render a header-less modal. */
  header?: NeonModalHeaderProps;

  /** Optional footer configuration. Omit to render a footer-less modal. */
  footer?: NeonModalFooterProps;

  /** Content rendered in the modal body. */
  children?: ReactNode;

  /** Extra class names applied to the outer dialog wrapper. */
  className?: string;

  /** Accessible label for the modal dialog (used as aria-label when no title exists). */
  ariaLabel?: string;
}

// ── Close icon ────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────

export const NeonModal: React.FC<NeonModalProps> = ({
  open,
  onClose,
  color = "cyan",
  size = "md",
  corner = "bottom-right",
  cornerSize = 24,
  animation = "slide",
  glowIntensity = "medium",
  bgColor = "#080b0d",
  dividers = true,
  borderBeam = false,
  beamSpeed = 3,
  beamLength = 60,
  backdropBlur = true,
  backdropOverlay = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  scrollableBody = false,
  header,
  footer,
  children,
  className = "",
  ariaLabel,
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const resolvedColor = COLOR_PRESETS[color] ?? color;
  const clipClass = CORNER_CLASSES[corner];
  const glowClass = GLOW_CLASSES[glowIntensity];

  const dialogEnterClass =
    animation === "slide" ? "nm-dialog-enter-slide"
    : animation === "scale" ? "nm-dialog-enter-scale"
    : "";

  const dialogExitClass =
    animation === "slide" ? "nm-dialog-exit-slide"
    : animation === "scale" ? "nm-dialog-exit-scale"
    : "";

  // Mount on client only (portal requires document)
  useEffect(() => { setMounted(true); }, []);

  // Open / close lifecycle with exit-animation delay
  useEffect(() => {
    if (open) {
      setAnimatingOut(false);
      setVisible(true);
    } else if (visible) {
      setAnimatingOut(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setAnimatingOut(false);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll-lock while open
  useEffect(() => {
    if (visible) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [visible]);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (closeOnEscape && e.key === "Escape") onClose(); },
    [closeOnEscape, onClose],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [visible, handleKeyDown]);

  // Focus trap: focus dialog on open
  useEffect(() => {
    if (visible && !animatingOut) dialogRef.current?.focus();
  }, [visible, animatingOut]);

  if (!mounted || !visible) return null;

  const backdropClasses = [
    "nm-backdrop",
    animatingOut ? "nm-exit" : "nm-enter",
    backdropBlur ? "nm-backdrop-blur" : "",
    backdropOverlay ? "nm-backdrop-overlay" : "",
  ].filter(Boolean).join(" ");

  const wrapperClasses = [
    "nm-wrapper",
    glowClass,
    animatingOut ? dialogExitClass : dialogEnterClass,
    className,
  ].filter(Boolean).join(" ");

  // Border frame: beam overrides static background when active
  const borderFrameClasses = [
    "nm-border-frame",
    clipClass,
    borderBeam ? "nm-beam" : "",
  ].filter(Boolean).join(" ");

  const titleId = ariaLabel ? undefined : "nm-title";

  const modal = (
    <div
      className={backdropClasses}
      onClick={(e) => { if (closeOnBackdrop && e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={wrapperClasses}
        style={{
          "--nm-color": resolvedColor,
          "--nm-corner": `${cornerSize}px`,
          "--nm-beam-speed": `${beamSpeed}s`,
          "--nm-beam-length": `${beamLength}deg`,
          width: "100%",
          maxWidth: SIZE_MAP[size],
        } as React.CSSProperties}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-label={ariaLabel}
        ref={dialogRef}
        tabIndex={-1}
      >
        {/* Border frame — same clip-path as nm-card; fills the 1px p-px gap uniformly */}
        <div className={borderFrameClasses} aria-hidden="true" />

        {/* Card surface — clipped, sits above border-frame */}
        <div
          className={["nm-card", clipClass].filter(Boolean).join(" ")}
          style={{ backgroundColor: bgColor }}
        >
          {/* Header */}
          {header && (
            <div className={["nm-header", dividers ? "nm-divider-header" : ""].filter(Boolean).join(" ")}>
              <div>
                {header.label && (
                  <p className="nm-header-label">{header.label}</p>
                )}
                <h2 id={titleId} className="nm-title text-lg">
                  {header.title}
                </h2>
              </div>
              {showCloseButton && (
                <button
                  className="nm-close-btn"
                  onClick={onClose}
                  aria-label="Close modal"
                  type="button"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          {children !== undefined && (
            <div
              className={[
                "nm-body",
                scrollableBody ? "nm-body-scrollable" : "",
              ].filter(Boolean).join(" ")}
            >
              {children}
            </div>
          )}

          {/* Footer */}
          {footer && (
            <div
              className={[
                "nm-footer",
                dividers ? "nm-divider-footer" : "",
                FOOTER_ALIGN_CLASSES[footer.align ?? "right"],
              ].filter(Boolean).join(" ")}
            >
              {footer.children}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default NeonModal;
