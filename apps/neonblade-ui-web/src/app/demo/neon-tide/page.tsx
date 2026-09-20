"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  NeonTide,
  type NeonTideOrigin,
} from "../../../lib/components/ui/backgrounds/NeonTide";
import { CornerCutButton } from "../../../lib/components/ui/buttons/CornerCutButton";

/* ── types ──────────────────────────────────────────────────────────────── */
interface Controls {
  label: string;
  colorA: string;
  colorB: string;
  dualColor: boolean;
  bgColor: string;
  origin: NeonTideOrigin;
  speed: number;
  amplitude: number;
  frequency: number;
  glow: number;
  gloss: number;
  gridSegments: number;
  planeWidth: number;
  planeDepth: number;
  cameraHeight: number;
  cameraTilt: number;
  fog: boolean;
  opacity: number;
  hoverEffect: boolean;
  hoverRadius: number;
  hoverStrength: number;
}

/* ── presets ─────────────────────────────────────────────────────────────── */
const PRESETS: Controls[] = [
  {
    label: "CYAN TIDE",
    colorA: "#00f3ff",
    colorB: "#0044ff",
    dualColor: false,
    bgColor: "#020408",
    origin: "top-right",
    speed: 0.5,
    amplitude: 1.2,
    frequency: 0.55,
    glow: 0.9,
    gloss: 0.6,
    gridSegments: 120,
    planeWidth: 34,
    planeDepth: 34,
    cameraHeight: 11,
    cameraTilt: 1.6,
    fog: true,
    opacity: 100,
    hoverEffect: true,
    hoverRadius: 4,
    hoverStrength: 1.4,
  },
  {
    label: "AURORA",
    colorA: "#00f3ff",
    colorB: "#ff00e6",
    dualColor: true,
    bgColor: "#03010a",
    origin: "top-left",
    speed: 0.4,
    amplitude: 1.3,
    frequency: 0.3,
    glow: 1.6,
    gloss: 1,
    gridSegments: 130,
    planeWidth: 36,
    planeDepth: 36,
    cameraHeight: 11,
    cameraTilt: 1.6,
    fog: true,
    opacity: 100,
    hoverEffect: true,
    hoverRadius: 4.5,
    hoverStrength: 1.6,
  },
  {
    label: "SUNSET DRIFT",
    colorA: "#ff8800",
    colorB: "#ff0066",
    dualColor: true,
    bgColor: "#0a0300",
    origin: "bottom-right",
    speed: 0.6,
    amplitude: 1,
    frequency: 0.4,
    glow: 1.4,
    gloss: 0.6,
    gridSegments: 110,
    planeWidth: 32,
    planeDepth: 32,
    cameraHeight: 10,
    cameraTilt: 1.5,
    fog: true,
    opacity: 100,
    hoverEffect: true,
    hoverRadius: 4,
    hoverStrength: 1.4,
  },
  {
    label: "TOXIC SWELL",
    colorA: "#39ff14",
    colorB: "#00ffaa",
    dualColor: false,
    bgColor: "#010a03",
    origin: "bottom-left",
    speed: 0.8,
    amplitude: 0.9,
    frequency: 0.5,
    glow: 1,
    gloss: 1.2,
    gridSegments: 120,
    planeWidth: 30,
    planeDepth: 30,
    cameraHeight: 9,
    cameraTilt: 1.5,
    fog: true,
    opacity: 100,
    hoverEffect: true,
    hoverRadius: 3.5,
    hoverStrength: 1.2,
  },
  {
    label: "ABYSS",
    colorA: "#1a3aff",
    colorB: "#7000ff",
    dualColor: true,
    bgColor: "#00020a",
    origin: "top-right",
    speed: 0.25,
    amplitude: 1.6,
    frequency: 0.25,
    glow: 1.8,
    gloss: 0.5,
    gridSegments: 140,
    planeWidth: 40,
    planeDepth: 44,
    cameraHeight: 13,
    cameraTilt: 1.8,
    fog: true,
    opacity: 100,
    hoverEffect: true,
    hoverRadius: 5,
    hoverStrength: 1.8,
  },
];

const ORIGINS: { value: NeonTideOrigin; label: string }[] = [
  { value: "top-left", label: "↖ Top Left" },
  { value: "top-right", label: "↗ Top Right" },
  { value: "bottom-left", label: "↙ Bottom Left" },
  { value: "bottom-right", label: "↘ Bottom Right" },
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
export default function NeonTideDemo() {
  const [ctrl, setCtrl] = useState<Controls>(PRESETS[0]);
  const [panelOpen, setPanelOpen] = useState(true);

  const set = <K extends keyof Controls>(key: K, val: Controls[K]) =>
    setCtrl((c) => ({ ...c, [key]: val }));

  const accent = ctrl.colorA;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-orbitron overflow-x-hidden">
      {/* ── Hero / live preview ─────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 gap-8 overflow-hidden select-none">
        <NeonTide
          colorA={ctrl.colorA}
          colorB={ctrl.dualColor ? ctrl.colorB : undefined}
          bgColor={ctrl.bgColor}
          origin={ctrl.origin}
          speed={ctrl.speed}
          amplitude={ctrl.amplitude}
          frequency={ctrl.frequency}
          glow={ctrl.glow}
          gloss={ctrl.gloss}
          gridSegments={ctrl.gridSegments}
          planeWidth={ctrl.planeWidth}
          planeDepth={ctrl.planeDepth}
          cameraHeight={ctrl.cameraHeight}
          cameraTilt={ctrl.cameraTilt}
          fog={ctrl.fog}
          opacity={ctrl.opacity}
          hoverEffect={ctrl.hoverEffect}
          hoverRadius={ctrl.hoverRadius}
          hoverStrength={ctrl.hoverStrength}
        />

        {/* back button */}
        <div className="absolute top-[100px] left-6 z-20">
          <Link href="/components/backgrounds/neon-tide">
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
            NEON
            <br />
            TIDE
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
            className="flex flex-col gap-4 p-4 backdrop-blur-md max-h-[80vh] overflow-y-auto"
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

            {/* origin (flow direction) */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] tracking-widest uppercase text-white/75">
                Flow Origin → Opposite Corner
              </span>
              <div className="grid grid-cols-2 gap-1">
                {ORIGINS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => set("origin", o.value)}
                    className="px-2 py-1 text-[9px] tracking-widest uppercase border transition-colors"
                    style={
                      ctrl.origin === o.value
                        ? {
                            borderColor: accent,
                            color: accent,
                            background: `${accent}18`,
                          }
                        : { borderColor: "#ffffff22", color: "#ffffff44" }
                    }
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* dual color toggle */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-widest uppercase text-white/75">
                Dual Color
              </span>
              <button
                onClick={() => set("dualColor", !ctrl.dualColor)}
                className="px-3 py-0.5 text-[9px] tracking-widest uppercase border transition-colors"
                style={
                  ctrl.dualColor
                    ? {
                        borderColor: accent,
                        color: accent,
                        background: `${accent}18`,
                      }
                    : { borderColor: "#ffffff22", color: "#ffffff44" }
                }
              >
                {ctrl.dualColor ? "ON" : "OFF"}
              </button>
            </div>

            {/* colors */}
            <ColorRow
              label="Color A"
              value={ctrl.colorA}
              onChange={(v) => set("colorA", v)}
            />
            {ctrl.dualColor && (
              <ColorRow
                label="Color B"
                value={ctrl.colorB}
                onChange={(v) => set("colorB", v)}
              />
            )}
            <ColorRow
              label="Bg Color"
              value={ctrl.bgColor}
              onChange={(v) => set("bgColor", v)}
            />

            {/* sliders */}
            <SliderRow
              label="Speed"
              value={ctrl.speed}
              min={0}
              max={2}
              step={0.05}
              display={ctrl.speed.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("speed", v)}
            />
            <SliderRow
              label="Amplitude"
              value={ctrl.amplitude}
              min={0}
              max={3}
              step={0.05}
              display={ctrl.amplitude.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("amplitude", v)}
            />
            <SliderRow
              label="Frequency"
              value={ctrl.frequency}
              min={0.05}
              max={1.2}
              step={0.01}
              display={ctrl.frequency.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("frequency", v)}
            />
            <SliderRow
              label="Glow"
              value={ctrl.glow}
              min={0}
              max={3}
              step={0.1}
              display={ctrl.glow.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("glow", v)}
            />
            <SliderRow
              label="Gloss"
              value={ctrl.gloss}
              min={0}
              max={2}
              step={0.1}
              display={ctrl.gloss.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("gloss", v)}
            />
            <SliderRow
              label="Grid Segments"
              value={ctrl.gridSegments}
              min={16}
              max={200}
              step={4}
              display={String(ctrl.gridSegments)}
              accentColor={accent}
              onChange={(v) => set("gridSegments", v)}
            />
            <SliderRow
              label="Plane Width"
              value={ctrl.planeWidth}
              min={10}
              max={60}
              step={1}
              display={String(ctrl.planeWidth)}
              accentColor={accent}
              onChange={(v) => set("planeWidth", v)}
            />
            <SliderRow
              label="Plane Depth"
              value={ctrl.planeDepth}
              min={10}
              max={70}
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
              label="Camera Tilt"
              value={ctrl.cameraTilt}
              min={0.8}
              max={3}
              step={0.05}
              display={ctrl.cameraTilt.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("cameraTilt", v)}
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

            {/* hover effect toggle */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-widest uppercase text-white/75">
                Hover Ripple
              </span>
              <button
                onClick={() => set("hoverEffect", !ctrl.hoverEffect)}
                className="px-3 py-0.5 text-[9px] tracking-widest uppercase border transition-colors"
                style={
                  ctrl.hoverEffect
                    ? {
                        borderColor: accent,
                        color: accent,
                        background: `${accent}18`,
                      }
                    : { borderColor: "#ffffff22", color: "#ffffff44" }
                }
              >
                {ctrl.hoverEffect ? "ON" : "OFF"}
              </button>
            </div>

            {ctrl.hoverEffect && (
              <>
                <SliderRow
                  label="Hover Radius"
                  value={ctrl.hoverRadius}
                  min={1}
                  max={10}
                  step={0.1}
                  display={ctrl.hoverRadius.toFixed(1)}
                  accentColor={accent}
                  onChange={(v) => set("hoverRadius", v)}
                />
                <SliderRow
                  label="Hover Strength"
                  value={ctrl.hoverStrength}
                  min={0}
                  max={4}
                  step={0.1}
                  display={ctrl.hoverStrength.toFixed(1)}
                  accentColor={accent}
                  onChange={(v) => set("hoverStrength", v)}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
