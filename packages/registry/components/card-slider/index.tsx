"use client";

import React, {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./card-slider.css";

// ─── Types ──────────────────────────────────────────────────────────────────────

/** Visual style of the progress indicator. */
export type CardSliderProgressStyle = "bar" | "dots" | "counter";

/**
 * Visual style of the per-card corner accent decorations.
 * - `"frame"` — L-shaped targeting reticle lines on each card corner (default).
 * - `"plus"` — SVG plus/cross icon centered on each card corner.
 */
export type CardSliderCornerAccentStyle = "frame" | "plus";

// Internal SVG icon for plus-style corner accents
function CsPlusIcon({
  className = "",
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      style={{ color }}
      className={`absolute h-6 w-6 pointer-events-none z-20 ${className}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
}

/**
 * Navigation button placement:
 * - `"sides"` — buttons float over the left/right edges of the viewport (default).
 * - `"bottom"` — buttons are placed in the footer row beside the progress indicator.
 */
export type CardSliderButtonPosition = "sides" | "bottom";

/**
 * When navigation buttons are visible:
 * - `"always"` — always visible (default).
 * - `"hover"` — fade in only when the slider is hovered (clean look, mobile-unfriendly).
 */
export type CardSliderButtonVisibility = "always" | "hover";

/**
 * Which corner of a navigation button receives the diagonal cut.
 * - `"bottom-left"` — default for the previous (left) button.
 * - `"bottom-right"` — default for the next (right) button.
 */
export type CardSliderButtonCorner =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

/**
 * How many items to show at once. Accepts either:
 * - A plain `number` (same count at all breakpoints).
 * - A responsive object `{ sm?, md?, lg?, xl? }` for different counts per breakpoint.
 *
 * Breakpoints: sm ≥ 640 px · md ≥ 768 px · lg ≥ 1024 px · xl ≥ 1280 px
 */
export type CardSliderVisibleCount =
  | number
  | { sm?: number; md?: number; lg?: number; xl?: number };

export interface CardSliderProps {
  /** Slides — pass any ReactNode: `<img>`, `<video>`, custom cards, etc. */
  children: ReactNode;

  // ── Layout ─────────────────────────────────────────────────────────────────
  /** Items visible simultaneously. Accepts a number or responsive breakpoint object. */
  visibleCount?: CardSliderVisibleCount;
  /** Gap between slides in px. */
  gap?: number;

  // ── Navigation buttons ─────────────────────────────────────────────────────
  /** Show previous / next arrow buttons. */
  showButtons?: boolean;
  /** Where to render navigation buttons. */
  buttonPosition?: CardSliderButtonPosition;
  /** When to show navigation buttons. */
  buttonVisibility?: CardSliderButtonVisibility;
  /** Diagonal corner-cut size on navigation buttons (px). */
  buttonCornerSize?: number;
  /** Which corner is cut on the previous (left) navigation button. @default "bottom-left" */
  prevButtonCorner?: CardSliderButtonCorner;
  /** Which corner is cut on the next (right) navigation button. @default "bottom-right" */
  nextButtonCorner?: CardSliderButtonCorner;

  // ── Swipe / drag ───────────────────────────────────────────────────────────
  /** Enable touch-swipe and mouse-drag navigation. */
  enableSwipe?: boolean;
  /** Minimum drag distance (px) required to trigger a slide change. */
  swipeThreshold?: number;

  // ── Progress indicator ─────────────────────────────────────────────────────
  /** Show a progress indicator below the viewport. */
  showProgress?: boolean;
  /** Visual style of the progress indicator. */
  progressStyle?: CardSliderProgressStyle;

  // ── Behaviour ──────────────────────────────────────────────────────────────
  /** Loop back to start when reaching the last slide. */
  loop?: boolean;
  /** Auto-advance slides. Pauses on hover. */
  autoPlay?: boolean;
  /** Interval between auto-advance steps in ms. */
  autoPlayInterval?: number;

  // ── Visual / Colors ────────────────────────────────────────────────────────
  /** Primary accent / neon glow color. */
  accentColor?: string;
  /**
   * Gradient edge-fade color — set this to your page background color.
   * Only visible when `showEdgeFades` is true.
   */
  edgeFadeColor?: string;
  /** Show gradient fades on the left and right edges of the viewport. */
  showEdgeFades?: boolean;
  /** Show small targeting-reticle corner accents on each card item. */
  showCornerAccents?: boolean;
  /** Visual style of the corner accent decorations when `showCornerAccents` is true. */
  cornerAccentStyle?: CardSliderCornerAccentStyle;
  /** Overlay subtle CRT horizontal scan-lines on the viewport. */
  scanLines?: boolean;

  // ── CSS overrides ──────────────────────────────────────────────────────────
  /** Extra class on the root wrapper. */
  className?: string;
  /** Extra class on the overflow-hidden viewport element. */
  viewportClassName?: string;
  /** Extra class applied to each item slot. */
  itemClassName?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────────
const BUTTON_CORNER_CLASSES: Record<CardSliderButtonCorner, string> = {
  "top-right": "cs-btn-clip-tr",
  "top-left": "cs-btn-clip-tl",
  "bottom-right": "cs-btn-clip-br",
  "bottom-left": "cs-btn-clip-bl",
};
function getVisible(
  containerWidth: number,
  vc: CardSliderVisibleCount,
): number {
  if (typeof vc === "number") return Math.max(1, vc);
  const { sm = 1, md, lg, xl } = vc;
  if (xl !== undefined && containerWidth >= 1280) return Math.max(1, xl);
  if (lg !== undefined && containerWidth >= 1024) return Math.max(1, lg);
  if (md !== undefined && containerWidth >= 768) return Math.max(1, md);
  return Math.max(1, sm);
}

function zeroPad(n: number): string {
  return String(n).padStart(2, "0");
}

// ─── Component ──────────────────────────────────────────────────────────────────

export function CardSlider({
  children,
  visibleCount = 1,
  gap = 16,
  showButtons = true,
  buttonPosition = "sides",
  buttonVisibility = "always",
  buttonCornerSize = 10,
  prevButtonCorner = "bottom-left",
  nextButtonCorner = "bottom-right",
  enableSwipe = true,
  swipeThreshold = 50,
  showProgress = true,
  progressStyle = "bar",
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  accentColor = "#00f3ff",
  edgeFadeColor = "#000000",
  showEdgeFades = false,
  showCornerAccents = true,
  cornerAccentStyle = "frame",
  scanLines = false,
  className = "",
  viewportClassName = "",
  itemClassName = "",
}: CardSliderProps) {
  const items = Children.toArray(children);
  const totalCount = items.length;

  const viewportRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartXRef = useRef(0);
  const dragCurrentXRef = useRef(0);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Derived values ───────────────────────────────────────────────────────────
  const visible = useMemo(
    () => getVisible(containerWidth, visibleCount),
    [containerWidth, visibleCount],
  );

  const maxIndex = Math.max(0, totalCount - visible);
  const totalPages = visible > 0 ? Math.ceil(totalCount / visible) : 1;
  const currentPage = visible > 0 ? Math.floor(currentIndex / visible) : 0;
  const progressPercent = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 100;
  const isPrevDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex >= maxIndex;

  // Item pixel width (falls back to CSS calc when not yet measured)
  const itemWidth =
    containerWidth > 0 ? (containerWidth - gap * (visible - 1)) / visible : 0;

  // Track translation offset in logical CSS pixels
  const trackOffset = -(currentIndex * (itemWidth + gap));

  // ── ResizeObserver ───────────────────────────────────────────────────────────
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setContainerWidth(entry.contentRect.width),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Clamp index when visible count changes (e.g. on window resize)
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  // ── Navigation ───────────────────────────────────────────────────────────────
  const goTo = useCallback(
    (index: number) => {
      if (totalCount <= visible) return;
      let next: number;
      if (loop) {
        const range = maxIndex + 1;
        next = ((index % range) + range) % range;
      } else {
        next = Math.max(0, Math.min(index, maxIndex));
      }
      setCurrentIndex(next);
    },
    [loop, maxIndex, totalCount, visible],
  );

  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  // ── Auto-play ────────────────────────────────────────────────────────────────
  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    // Ensure only one timer exists; stacked intervals can cause skipped/reversed jumps.
    stopAutoPlay();
    if (!autoPlay || maxIndex <= 0) return;
    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) return loop ? 0 : prev;
        return prev + 1;
      });
    }, autoPlayInterval);
  }, [autoPlay, autoPlayInterval, maxIndex, loop, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  // Pause on hover
  useEffect(() => {
    if (autoPlay) {
      if (isHovered) stopAutoPlay();
      else startAutoPlay();
    }
  }, [isHovered, autoPlay, startAutoPlay, stopAutoPlay]);

  // ── Keyboard navigation ──────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isHovered) return;
      if (e.key === "ArrowLeft") {
        stopAutoPlay();
        prev();
        startAutoPlay();
      }
      if (e.key === "ArrowRight") {
        stopAutoPlay();
        next();
        startAutoPlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, isHovered, startAutoPlay, stopAutoPlay]);

  // ── Touch / mouse drag ───────────────────────────────────────────────────────
  const handleDragStart = (x: number) => {
    if (!enableSwipe) return;
    dragStartXRef.current = x;
    dragCurrentXRef.current = x;
    setIsDragging(true);
    stopAutoPlay();
  };

  const handleDragMove = (x: number) => {
    if (!enableSwipe || !isDragging) return;
    dragCurrentXRef.current = x;
  };

  const handleDragEnd = () => {
    if (!enableSwipe || !isDragging) return;
    const diff = dragStartXRef.current - dragCurrentXRef.current;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) next();
      else prev();
    }
    setIsDragging(false);
    startAutoPlay();
  };

  // ── CSS custom properties ────────────────────────────────────────────────────
  const cssVars = {
    "--cs-accent": accentColor,
    "--cs-corner-size": `${buttonCornerSize}px`,
    "--cs-edge-color": edgeFadeColor,
  } as React.CSSProperties;

  // ── Shared button styles ─────────────────────────────────────────────────────
  const navBtnInlineStyle: React.CSSProperties = {
    background: `color-mix(in srgb, ${accentColor} 10%, rgba(5,5,5,0.8))`,
    color: accentColor,
    backdropFilter: "blur(6px)",
  };

  const buttonsVisible =
    buttonVisibility === "always" ||
    (buttonVisibility === "hover" && isHovered);

  // ── Render helpers ───────────────────────────────────────────────────────────
  const NavBtn = ({
    direction,
    size = "md",
  }: {
    direction: "prev" | "next";
    size?: "sm" | "md";
  }) => {
    const disabled = direction === "prev" ? isPrevDisabled : isNextDisabled;
    const wh = size === "sm" ? "w-9 h-8" : "w-10 h-10";
    const iconClass = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
    const corner = direction === "prev" ? prevButtonCorner : nextButtonCorner;
    const clipClass = BUTTON_CORNER_CLASSES[corner];

    return (
      <div className={`cs-btn-wrapper${disabled ? " cs-btn-disabled" : ""}`}>
        {/* 1 px border frame — same clip-path as the button, accent-coloured */}
        <div
          className={`p-px ${clipClass}`}
          style={{
            background: `color-mix(in srgb, ${accentColor} 45%, transparent)`,
          }}
        >
          <button
            className={`cs-btn ${clipClass} ${wh} flex items-center justify-center
              active:scale-95 transition-all duration-200
              ${disabled ? "opacity-20 cursor-not-allowed" : "cursor-pointer"}`}
            style={navBtnInlineStyle}
            onClick={() => {
              stopAutoPlay();
              if (direction === "prev") prev();
              else next();
              startAutoPlay();
            }}
            disabled={disabled}
            aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
          >
            {direction === "prev" ? (
              <ChevronLeft className={iconClass} />
            ) : (
              <ChevronRight className={iconClass} />
            )}
          </button>
        </div>
      </div>
    );
  };

  const ProgressIndicator = () => {
    if (!showProgress) return null;

    if (progressStyle === "bar") {
      return (
        <div
          className="cs-progress-track flex-1 h-[3px]"
          style={{
            background: `color-mix(in srgb, ${accentColor} 10%, rgba(255,255,255,0.04))`,
          }}
        >
          <div
            className="cs-progress-fill"
            style={{
              width: `${progressPercent}%`,
              background: accentColor,
              boxShadow: `0 0 7px color-mix(in srgb, ${accentColor} 70%, transparent)`,
            }}
          />
        </div>
      );
    }

    if (progressStyle === "dots") {
      return (
        <div className="flex-1 flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const active = i === currentPage;
            return (
              <div
                key={i}
                className="flex p-px cs-dot-clip"
                style={{
                  background: `color-mix(in srgb, ${accentColor} ${active ? 100 : 35}%, transparent)`,
                }}
              >
                <button
                  onClick={() => {
                    stopAutoPlay();
                    goTo(i * visible);
                    startAutoPlay();
                  }}
                  className={`cs-dot cs-dot-clip w-2.5 h-2.5${active ? " cs-dot-active" : ""}`}
                  style={{
                    background: active
                      ? accentColor
                      : `color-mix(in srgb, ${accentColor} 8%, transparent)`,
                  }}
                  aria-label={`Go to slide ${i * visible + 1}`}
                />
              </div>
            );
          })}
        </div>
      );
    }

    if (progressStyle === "counter") {
      return (
        <div className="flex-1 flex justify-center items-center">
          <span
            className="font-orbitron text-xs tracking-[0.25em] select-none"
            style={{
              color: `color-mix(in srgb, ${accentColor} 50%, rgba(255,255,255,0.5))`,
            }}
          >
            <span className="cs-counter-current" style={{ color: accentColor }}>
              {zeroPad(currentIndex + 1)}
            </span>
            <span className="mx-2 opacity-30">/</span>
            <span>{zeroPad(totalCount)}</span>
          </span>
        </div>
      );
    }

    return null;
  };

  const showSideButtons = showButtons && buttonPosition === "sides";
  const showBottomButtons = showButtons && buttonPosition === "bottom";
  const showFooter = showProgress || showBottomButtons;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div
      className={`relative select-none ${className}`}
      style={cssVars}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Slider area: viewport + overlaid elements ─────────────────────── */}
      <div className="relative">
        {/* Side navigation buttons */}
        {showSideButtons && (
          <>
            <div
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20
                transition-opacity duration-300
                ${buttonsVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <NavBtn direction="prev" size="md" />
            </div>
            <div
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20
                transition-opacity duration-300
                ${buttonsVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <NavBtn direction="next" size="md" />
            </div>
          </>
        )}

        {/* Viewport (scroll container) */}
        <div
          ref={viewportRef}
          className={`overflow-hidden relative py-3 -my-3 p-2 ${viewportClassName}`}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          style={{
            cursor: enableSwipe
              ? isDragging
                ? "grabbing"
                : "grab"
              : "default",
          }}
        >
          {/* Edge fades */}
          {showEdgeFades && (
            <>
              <div className="cs-edge-fade-left absolute inset-y-0 left-0 w-16 z-10" />
              <div className="cs-edge-fade-right absolute inset-y-0 right-0 w-16 z-10" />
            </>
          )}

          {/* CRT scan-line overlay */}
          {scanLines && <div className="cs-scanlines z-10" />}

          {/* Sliding track */}
          <div
            className={`cs-track flex${isDragging ? " cs-dragging" : ""}`}
            style={{
              transform: `translateX(${trackOffset}px)`,
              gap: `${gap}px`,
            }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                className={`relative flex-shrink-0 ${itemClassName}`}
                style={{
                  // Use CSS calc as fallback before first ResizeObserver measurement
                  width:
                    itemWidth > 0
                      ? `${itemWidth}px`
                      : `calc(${100 / visible}% - ${(gap * (visible - 1)) / visible}px)`,
                }}
              >
                {showCornerAccents && cornerAccentStyle === "frame" && (
                  <>
                    <div className="cs-corner-tl" />
                    <div className="cs-corner-tr" />
                    <div className="cs-corner-bl" />
                    <div className="cs-corner-br" />
                  </>
                )}
                {showCornerAccents && cornerAccentStyle === "plus" && (
                  <>
                    <CsPlusIcon
                      color={accentColor}
                      className="-top-3 -left-3"
                    />
                    <CsPlusIcon
                      color={accentColor}
                      className="-bottom-3 -left-3"
                    />
                    <CsPlusIcon
                      color={accentColor}
                      className="-top-3 -right-3"
                    />
                    <CsPlusIcon
                      color={accentColor}
                      className="-bottom-3 -right-3"
                    />
                  </>
                )}
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer: progress + optional bottom buttons ────────────────────── */}
      {showFooter && (
        <div className="flex items-center gap-3 mt-3.5 px-0.5">
          {showBottomButtons && (
            <div
              className={`flex-shrink-0 transition-opacity duration-300
                ${buttonsVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <NavBtn direction="prev" size="sm" />
            </div>
          )}

          <ProgressIndicator />

          {showBottomButtons && (
            <div
              className={`flex-shrink-0 transition-opacity duration-300
                ${buttonsVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <NavBtn direction="next" size="sm" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CardSlider;
