"use client";

import { useRef, useState } from "react";
import {
  FoxCursor,
  FoxCursorSVG,
} from "../../../components/ui/cursors/FoxCursor";

export default function FoxCursorDemo() {
  const [activeColor, setActiveColor] = useState<string>("cyan");
  const containerRef = useRef<HTMLDivElement>(null);

  const variants = [
    { label: "Cyan", color: "cyan", hex: "#00f3ff" },
    { label: "Pink", color: "pink", hex: "#ff00ff" },
    { label: "Green", color: "green", hex: "#39ff14" },
  ];

  const accentHex =
    activeColor === "cyan"
      ? "#00f3ff"
      : activeColor === "pink"
        ? "#ff00ff"
        : "#39ff14";

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* ── Interactive preview ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Interactive Preview — move mouse inside the box
        </p>
        <div
          ref={containerRef}
          className="relative w-full h-72 overflow-hidden bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center gap-4"
          style={{ cursor: "none" }}
        >
          {/* Grid backdrop */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,243,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <p className="font-orbitron text-white/60 text-xs uppercase tracking-widest relative z-10 select-none">
            Move cursor here
          </p>
          {/* Color selector */}
          <div className="flex gap-3 relative z-10">
            {variants.map((v) => (
              <button
                key={v.color}
                onClick={() => setActiveColor(v.color)}
                className="px-3 py-1 text-[10px] font-orbitron uppercase tracking-widest border transition-all duration-200"
                style={{
                  cursor: "none",
                  borderColor:
                    activeColor === v.color ? v.hex : "rgba(255,255,255,0.15)",
                  color:
                    activeColor === v.color ? v.hex : "rgba(255,255,255,0.4)",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
          <p
            className="font-orbitron text-[10px] uppercase tracking-widest relative z-10 select-none"
            style={{ color: accentHex }}
          >
            {activeColor}
          </p>
          <FoxCursor
            color={activeColor}
            containerRef={containerRef}
            size={24}
          />
        </div>
      </div>

      {/* ── Color variants ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Color Variants
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {variants.map((v) => (
            <div
              key={v.color}
              className="h-40 bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center gap-3"
            >
              <FoxCursorSVG color={v.color} size={40} />
              <span
                className="font-orbitron text-[10px] uppercase tracking-widest"
                style={{ color: v.hex }}
              >
                {v.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Size variants ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Size Variants
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Small", size: 36 },
            { label: "Default", size: 64 },
            { label: "Large", size: 96 },
          ].map((v) => (
            <div
              key={v.label}
              className="h-40 bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center gap-3"
            >
              <FoxCursorSVG color="cyan" size={v.size} />
              <span className="font-orbitron text-white/60 text-[10px] uppercase tracking-widest">
                {v.label} ({v.size}px)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Glow intensity ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Glow Intensity
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(["none", "low", "medium", "high"] as const).map((g) => (
            <div
              key={g}
              className="h-40 bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center gap-3"
            >
              <FoxCursorSVG color="pink" size={40} glowIntensity={g} />
              <span className="font-orbitron text-white/60 text-[10px] uppercase tracking-widest">
                {g}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fill opacity ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Fill Opacity
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "No fill", fillOpacity: 0 },
            { label: "Subtle fill", fillOpacity: 0.5 },
            { label: "Full fill", fillOpacity: 1 },
          ].map((v) => (
            <div
              key={v.label}
              className="h-40 bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center gap-3"
            >
              <FoxCursorSVG
                color="green"
                size={44}
                fillOpacity={v.fillOpacity}
              />
              <span className="font-orbitron text-white/60 text-[10px] uppercase tracking-widest text-center px-2">
                {v.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
