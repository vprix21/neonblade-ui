"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GridFloor } from "../../../lib/components/ui/backgrounds/GridFloor";
import { CornerCutButton } from "../../../lib/components/ui/buttons/CornerCutButton";

/* ── types ──────────────────────────────────────────────────────────────── */
interface Controls {
  label: string;
  lineColor: string;
  glowColor: string;
  bgColor: string;
  horizon: number;
  columns: number;
  rows: number;
  speed: number;
  opacity: number;
  lineWidth: number;
}

/* ── presets ─────────────────────────────────────────────────────────────── */
const PRESETS: Controls[] = [
  {
    label: "CYBER",
    lineColor: "#00f3ff",
    glowColor: "#00f3ff",
    bgColor: "#050505",
    horizon: 0.45,
    columns: 24,
    rows: 18,
    speed: 0.6,
    opacity: 0.85,
    lineWidth: 1,
  },
  {
    label: "SYNTHWAVE",
    lineColor: "#ff00ff",
    glowColor: "#ff00ff",
    bgColor: "#0a020a",
    horizon: 0.5,
    columns: 28,
    rows: 22,
    speed: 0.9,
    opacity: 0.9,
    lineWidth: 1.2,
  },
  {
    label: "MATRIX",
    lineColor: "#39ff14",
    glowColor: "#39ff14",
    bgColor: "#000000",
    horizon: 0.4,
    columns: 32,
    rows: 20,
    speed: 1.1,
    opacity: 0.8,
    lineWidth: 1,
  },
  {
    label: "AMBER",
    lineColor: "#ffaa00",
    glowColor: "#ffaa00",
    bgColor: "#0a0500",
    horizon: 0.55,
    columns: 20,
    rows: 16,
    speed: 0.4,
    opacity: 0.85,
    lineWidth: 1.5,
  },
  {
    label: "MIDNIGHT",
    lineColor: "#ffffff",
    glowColor: "#00f3ff",
    bgColor: "#000510",
    horizon: 0.42,
    columns: 26,
    rows: 18,
    speed: 0.35,
    opacity: 0.6,
    lineWidth: 1,
  },
];

/* ── sub-components ─────────────────────────────────────────────────────── */
function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  accentColor,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display?: string;
  accentColor: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] tracking-widest uppercase text-white/75">
          {label}
        </span>
        <span
          className="text-[10px] font-mono tabular-nums"
          style={{ color: accentColor }}
        >
          {display ?? value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--thumb-color)] [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--thumb-color)]"
        style={{ "--thumb-color": accentColor } as React.CSSProperties}
      />
    </div>
  );
}

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[10px] tracking-widest uppercase text-white/75">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-white/60">{value}</span>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded cursor-pointer border border-white/10 bg-transparent p-0"
        />
      </div>
    </div>
  );
}

/* ── page ───────────────────────────────────────────────────────────────── */
export default function GridFloorDemo() {
  const [ctrl, setCtrl] = useState<Controls>(PRESETS[0]);
  const [panelOpen, setPanelOpen] = useState(true);

  const set = <K extends keyof Controls>(key: K, val: Controls[K]) =>
    setCtrl((c) => ({ ...c, [key]: val }));

  const accent = ctrl.lineColor;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-orbitron overflow-x-hidden">
      {/* ── Hero / live preview ─────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 gap-8 overflow-hidden select-none">
        <GridFloor
          lineColor={ctrl.lineColor}
          glowColor={ctrl.glowColor}
          bgColor={ctrl.bgColor}
          horizon={ctrl.horizon}
          columns={ctrl.columns}
          rows={ctrl.rows}
          speed={ctrl.speed}
          opacity={ctrl.opacity}
          lineWidth={ctrl.lineWidth}
        />

        {/* back button */}
        <div className="absolute top-[100px] left-6 z-20">
          <Link href="/components/backgrounds/grid-floor">
            <CornerCutButton
              size="xs"
              variant="outline"
              color={accent}
              corner="bottom-left"
              cornerSize={10}
              hoverEffect="shift"
              glowIntensity="low"
            >
              ← Back
            </CornerCutButton>
          </Link>
        </div>

        {/* heading */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center pointer-events-none">
          <h1
            className="font-black uppercase leading-none tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 8rem)",
              color: "#ffffff",
              textShadow: `0 0 20px ${accent}cc, 0 0 50px ${accent}88, 0 0 90px ${accent}44`,
            }}
          >
            GRID
            <br />
            FLOOR
          </h1>
        </div>

        {/* ── Live Controls Panel ─────────────────────────────────────────── */}
        <div
          className="absolute top-[100px] right-6 z-20 w-64 transition-all duration-300"
          style={{
            transform: panelOpen
              ? "translateX(0)"
              : "translateX(calc(100% + 1.5rem))",
          }}
        >
          {/* toggle tab */}
          <button
            onClick={() => setPanelOpen((v) => !v)}
            className="absolute -left-10 top-0 flex items-center justify-center w-9 h-9 border text-base transition-colors"
            style={{
              borderColor: `${accent}44`,
              color: accent,
              background: "#050505cc",
            }}
            title={panelOpen ? "Hide controls" : "Show controls"}
          >
            {panelOpen ? "›" : "‹"}
          </button>

          {/* panel body */}
          <div
            className="flex flex-col gap-4 p-4 backdrop-blur-md"
            style={{
              background: "rgba(5,5,5,0.88)",
              border: `1px solid ${accent}33`,
              boxShadow: `0 0 24px ${accent}18`,
            }}
          >
            {/* header */}
            <div
              className="flex items-center justify-between border-b pb-2"
              style={{ borderColor: `${accent}22` }}
            >
              <span
                className="text-[10px] tracking-widest uppercase"
                style={{ color: accent }}
              >
                Live Controls
              </span>
            </div>

            {/* presets */}
            <div className="flex flex-wrap gap-1">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setCtrl(p)}
                  className="px-2 py-0.5 text-[9px] tracking-widest uppercase border transition-colors"
                  style={
                    ctrl.label === p.label
                      ? {
                          borderColor: accent,
                          color: accent,
                          background: `${accent}18`,
                        }
                      : { borderColor: "#ffffff22", color: "#ffffff44" }
                  }
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* colors */}
            <ColorRow
              label="Line Color"
              value={ctrl.lineColor}
              onChange={(v) => set("lineColor", v)}
            />
            <ColorRow
              label="Glow Color"
              value={ctrl.glowColor}
              onChange={(v) => set("glowColor", v)}
            />
            <ColorRow
              label="Bg Color"
              value={ctrl.bgColor}
              onChange={(v) => set("bgColor", v)}
            />

            {/* sliders */}
            <SliderRow
              label="Horizon"
              value={ctrl.horizon}
              min={0.1}
              max={0.9}
              step={0.01}
              display={ctrl.horizon.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("horizon", v)}
            />
            <SliderRow
              label="Columns"
              value={ctrl.columns}
              min={8}
              max={64}
              step={2}
              display={String(ctrl.columns)}
              accentColor={accent}
              onChange={(v) => set("columns", v)}
            />
            <SliderRow
              label="Rows"
              value={ctrl.rows}
              min={6}
              max={48}
              step={1}
              display={String(ctrl.rows)}
              accentColor={accent}
              onChange={(v) => set("rows", v)}
            />
            <SliderRow
              label="Speed"
              value={ctrl.speed}
              min={0}
              max={3}
              step={0.05}
              display={ctrl.speed.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("speed", v)}
            />
            <SliderRow
              label="Opacity"
              value={ctrl.opacity}
              min={0.1}
              max={1}
              step={0.01}
              display={`${Math.round(ctrl.opacity * 100)}%`}
              accentColor={accent}
              onChange={(v) => set("opacity", v)}
            />
            <SliderRow
              label="Line Width"
              value={ctrl.lineWidth}
              min={0.5}
              max={4}
              step={0.1}
              display={ctrl.lineWidth.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("lineWidth", v)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
