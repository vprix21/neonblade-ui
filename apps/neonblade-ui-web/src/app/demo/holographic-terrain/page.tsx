"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HolographicTerrain } from "../../../lib/components/ui/backgrounds/HolographicTerrain";
import { CornerCutButton } from "../../../lib/components/ui/buttons/CornerCutButton";

/* ── types ──────────────────────────────────────────────────────────────── */
interface Controls {
  label: string;
  lineColor: string;
  bgColor: string;
  waveAmplitude: number;
  waveFrequency: number;
  waveSpeed: number;
  bumpRadius: number;
  bumpStrength: number;
  gridSegments: number;
  planeWidth: number;
  planeDepth: number;
  cameraHeight: number;
  fog: boolean;
  opacity: number;
}

/* ── presets ─────────────────────────────────────────────────────────────── */
const PRESETS: Controls[] = [
  {
    label: "CYBER",
    lineColor: "#00ffff",
    bgColor: "#020a0a",
    waveAmplitude: 0.8,
    waveFrequency: 1.5,
    waveSpeed: 1,
    bumpRadius: 3.5,
    bumpStrength: 2.5,
    gridSegments: 60,
    planeWidth: 24,
    planeDepth: 24,
    cameraHeight: 10,
    fog: true,
    opacity: 100,
  },
  {
    label: "SYNTHWAVE",
    lineColor: "#ff00cc",
    bgColor: "#0a0010",
    waveAmplitude: 1.1,
    waveFrequency: 1.2,
    waveSpeed: 0.8,
    bumpRadius: 4,
    bumpStrength: 3,
    gridSegments: 60,
    planeWidth: 24,
    planeDepth: 24,
    cameraHeight: 10,
    fog: true,
    opacity: 100,
  },
  {
    label: "WASTELAND",
    lineColor: "#ff8800",
    bgColor: "#0a0500",
    waveAmplitude: 1.4,
    waveFrequency: 1.8,
    waveSpeed: 1.3,
    bumpRadius: 3,
    bumpStrength: 3.5,
    gridSegments: 60,
    planeWidth: 32,
    planeDepth: 32,
    cameraHeight: 12,
    fog: true,
    opacity: 100,
  },
  {
    label: "MATRIX",
    lineColor: "#00ff41",
    bgColor: "#010a01",
    waveAmplitude: 0.6,
    waveFrequency: 2,
    waveSpeed: 1.5,
    bumpRadius: 2.5,
    bumpStrength: 2,
    gridSegments: 80,
    planeWidth: 20,
    planeDepth: 40,
    cameraHeight: 8,
    fog: true,
    opacity: 100,
  },
  {
    label: "ARCTIC",
    lineColor: "#88ddff",
    bgColor: "#01050a",
    waveAmplitude: 0.5,
    waveFrequency: 1,
    waveSpeed: 0.6,
    bumpRadius: 5,
    bumpStrength: 2,
    gridSegments: 60,
    planeWidth: 24,
    planeDepth: 24,
    cameraHeight: 10,
    fog: true,
    opacity: 90,
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
export default function HolographicTerrainDemo() {
  const [ctrl, setCtrl] = useState<Controls>(PRESETS[0]);
  const [panelOpen, setPanelOpen] = useState(true);

  const set = <K extends keyof Controls>(key: K, val: Controls[K]) =>
    setCtrl((c) => ({ ...c, [key]: val }));

  const accent = ctrl.lineColor;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-orbitron overflow-x-hidden">
      {/* ── Hero / live preview ─────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 gap-8 overflow-hidden select-none">
        <HolographicTerrain
          lineColor={ctrl.lineColor}
          bgColor={ctrl.bgColor}
          waveAmplitude={ctrl.waveAmplitude}
          waveFrequency={ctrl.waveFrequency}
          waveSpeed={ctrl.waveSpeed}
          bumpRadius={ctrl.bumpRadius}
          bumpStrength={ctrl.bumpStrength}
          gridSegments={ctrl.gridSegments}
          planeWidth={ctrl.planeWidth}
          planeDepth={ctrl.planeDepth}
          cameraHeight={ctrl.cameraHeight}
          fog={ctrl.fog}
          opacity={ctrl.opacity}
        />

        {/* back button */}
        <div className="absolute top-[100px] left-6 z-20">
          <Link href="/components/backgrounds/holographic-terrain">
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
            HOLO
            <br />
            TERRAIN
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
              label="Bg Color"
              value={ctrl.bgColor}
              onChange={(v) => set("bgColor", v)}
            />

            {/* sliders */}
            <SliderRow
              label="Wave Amplitude"
              value={ctrl.waveAmplitude}
              min={0}
              max={3}
              step={0.05}
              display={ctrl.waveAmplitude.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("waveAmplitude", v)}
            />
            <SliderRow
              label="Wave Frequency"
              value={ctrl.waveFrequency}
              min={0.2}
              max={4}
              step={0.1}
              display={ctrl.waveFrequency.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("waveFrequency", v)}
            />
            <SliderRow
              label="Wave Speed"
              value={ctrl.waveSpeed}
              min={0}
              max={4}
              step={0.1}
              display={ctrl.waveSpeed.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("waveSpeed", v)}
            />
            <SliderRow
              label="Bump Radius"
              value={ctrl.bumpRadius}
              min={1}
              max={8}
              step={0.1}
              display={ctrl.bumpRadius.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("bumpRadius", v)}
            />
            <SliderRow
              label="Bump Strength"
              value={ctrl.bumpStrength}
              min={0}
              max={6}
              step={0.1}
              display={ctrl.bumpStrength.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("bumpStrength", v)}
            />
            <SliderRow
              label="Grid Segments"
              value={ctrl.gridSegments}
              min={16}
              max={120}
              step={4}
              display={String(ctrl.gridSegments)}
              accentColor={accent}
              onChange={(v) => set("gridSegments", v)}
            />
            <SliderRow
              label="Plane Width"
              value={ctrl.planeWidth}
              min={8}
              max={60}
              step={1}
              display={String(ctrl.planeWidth)}
              accentColor={accent}
              onChange={(v) => set("planeWidth", v)}
            />
            <SliderRow
              label="Plane Depth"
              value={ctrl.planeDepth}
              min={8}
              max={60}
              step={1}
              display={String(ctrl.planeDepth)}
              accentColor={accent}
              onChange={(v) => set("planeDepth", v)}
            />
            <SliderRow
              label="Camera Height"
              value={ctrl.cameraHeight}
              min={3}
              max={30}
              step={0.5}
              display={ctrl.cameraHeight.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("cameraHeight", v)}
            />
            <SliderRow
              label="Opacity"
              value={ctrl.opacity}
              min={10}
              max={100}
              step={1}
              display={`${ctrl.opacity}%`}
              accentColor={accent}
              onChange={(v) => set("opacity", v)}
            />

            {/* fog toggle */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-widest uppercase text-white/75">
                Fog
              </span>
              <button
                onClick={() => set("fog", !ctrl.fog)}
                className="px-3 py-0.5 text-[9px] tracking-widest uppercase border transition-colors"
                style={
                  ctrl.fog
                    ? {
                        borderColor: accent,
                        color: accent,
                        background: `${accent}18`,
                      }
                    : { borderColor: "#ffffff22", color: "#ffffff44" }
                }
              >
                {ctrl.fog ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
