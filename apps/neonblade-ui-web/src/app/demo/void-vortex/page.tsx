"use client";

import React, { useState } from "react";
import Link from "next/link";
import { VoidVortex } from "../../../lib/components/ui/backgrounds/VoidVortex";
import { CornerCutButton } from "../../../lib/components/ui/buttons/CornerCutButton";

/* ── types ──────────────────────────────────────────────────────────────── */
interface Controls {
  label: string;
  primaryColor: string;
  coreColor: string;
  bgColor: string;
  particleCount: number;
  rotationSpeed: number;
  accretionRate: number;
  diskRadius: number;
  diskDepth: number;
  hoverIntensity: number;
  hoverGravity: boolean;
  showCore: boolean;
  fog: boolean;
  opacity: number;
}

/* ── presets ─────────────────────────────────────────────────────────────── */
const PRESETS: Controls[] = [
  {
    label: "SINGULARITY",
    primaryColor: "#00ffff",
    coreColor: "#ffffff",
    bgColor: "#000000",
    particleCount: 4000,
    rotationSpeed: 1,
    accretionRate: 1,
    diskRadius: 13,
    diskDepth: 0.35,
    hoverIntensity: 1,
    hoverGravity: true,
    showCore: true,
    fog: false,
    opacity: 100,
  },
  {
    label: "SUPERNOVA",
    primaryColor: "#ff6600",
    coreColor: "#ffffcc",
    bgColor: "#0a0300",
    particleCount: 5000,
    rotationSpeed: 1.4,
    accretionRate: 1.6,
    diskRadius: 15,
    diskDepth: 0.5,
    hoverIntensity: 1.5,
    hoverGravity: true,
    showCore: true,
    fog: true,
    opacity: 100,
  },
  {
    label: "NEBULA",
    primaryColor: "#ff00cc",
    coreColor: "#aaffff",
    bgColor: "#05000a",
    particleCount: 4500,
    rotationSpeed: 0.7,
    accretionRate: 0.6,
    diskRadius: 16,
    diskDepth: 0.8,
    hoverIntensity: 2,
    hoverGravity: true,
    showCore: true,
    fog: true,
    opacity: 100,
  },
  {
    label: "VOID",
    primaryColor: "#8800ff",
    coreColor: "#ffffff",
    bgColor: "#000000",
    particleCount: 3000,
    rotationSpeed: 0.5,
    accretionRate: 0.4,
    diskRadius: 11,
    diskDepth: 0.2,
    hoverIntensity: 0.6,
    hoverGravity: true,
    showCore: true,
    fog: false,
    opacity: 100,
  },
  {
    label: "MAELSTROM",
    primaryColor: "#00ff41",
    coreColor: "#ffffff",
    bgColor: "#000500",
    particleCount: 6000,
    rotationSpeed: 2,
    accretionRate: 2.2,
    diskRadius: 14,
    diskDepth: 0.3,
    hoverIntensity: 2.5,
    hoverGravity: true,
    showCore: false,
    fog: false,
    opacity: 100,
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

function ToggleRow({
  label,
  value,
  accentColor,
  onChange,
}: {
  label: string;
  value: boolean;
  accentColor: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] tracking-widest uppercase text-white/75">
        {label}
      </span>
      <button
        onClick={() => onChange(!value)}
        className="px-3 py-0.5 text-[9px] tracking-widest uppercase border transition-colors"
        style={
          value
            ? {
                borderColor: accentColor,
                color: accentColor,
                background: `${accentColor}18`,
              }
            : { borderColor: "#ffffff22", color: "#ffffff44" }
        }
      >
        {value ? "ON" : "OFF"}
      </button>
    </div>
  );
}

/* ── page ───────────────────────────────────────────────────────────────── */
export default function VoidVortexDemo() {
  const [ctrl, setCtrl] = useState<Controls>(PRESETS[0]);
  const [panelOpen, setPanelOpen] = useState(true);

  const set = <K extends keyof Controls>(key: K, val: Controls[K]) =>
    setCtrl((c) => ({ ...c, [key]: val }));

  const accent = ctrl.primaryColor;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-orbitron overflow-x-hidden">
      {/* ── Hero / live preview ─────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 gap-8 overflow-hidden select-none">
        <VoidVortex
          primaryColor={ctrl.primaryColor}
          coreColor={ctrl.coreColor}
          bgColor={ctrl.bgColor}
          particleCount={ctrl.particleCount}
          rotationSpeed={ctrl.rotationSpeed}
          accretionRate={ctrl.accretionRate}
          diskRadius={ctrl.diskRadius}
          diskDepth={ctrl.diskDepth}
          hoverGravity={ctrl.hoverGravity}
          hoverIntensity={ctrl.hoverIntensity}
          showCore={ctrl.showCore}
          fog={ctrl.fog}
          opacity={ctrl.opacity}
        />

        {/* back button */}
        <div className="absolute top-[100px] left-6 z-20">
          <Link href="/components/backgrounds/void-vortex">
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
        <div className="relative z-10 flex flex-col items-center gap-6 text-center pointer-events-none"></div>

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
            className="flex flex-col gap-4 p-4 backdrop-blur-md max-h-[85vh] overflow-y-auto"
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
              label="Primary Color"
              value={ctrl.primaryColor}
              onChange={(v) => set("primaryColor", v)}
            />
            <ColorRow
              label="Core Color"
              value={ctrl.coreColor}
              onChange={(v) => set("coreColor", v)}
            />
            <ColorRow
              label="Bg Color"
              value={ctrl.bgColor}
              onChange={(v) => set("bgColor", v)}
            />

            {/* sliders */}
            <SliderRow
              label="Particle Count"
              value={ctrl.particleCount}
              min={500}
              max={10000}
              step={100}
              display={String(ctrl.particleCount)}
              accentColor={accent}
              onChange={(v) => set("particleCount", v)}
            />
            <SliderRow
              label="Rotation Speed"
              value={ctrl.rotationSpeed}
              min={0}
              max={4}
              step={0.1}
              display={ctrl.rotationSpeed.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("rotationSpeed", v)}
            />
            <SliderRow
              label="Accretion Rate"
              value={ctrl.accretionRate}
              min={0}
              max={4}
              step={0.1}
              display={ctrl.accretionRate.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("accretionRate", v)}
            />
            <SliderRow
              label="Disk Radius"
              value={ctrl.diskRadius}
              min={3}
              max={30}
              step={1}
              display={String(ctrl.diskRadius)}
              accentColor={accent}
              onChange={(v) => set("diskRadius", v)}
            />
            <SliderRow
              label="Disk Depth"
              value={ctrl.diskDepth}
              min={0}
              max={2}
              step={0.05}
              display={ctrl.diskDepth.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("diskDepth", v)}
            />
            <SliderRow
              label="Hover Intensity"
              value={ctrl.hoverIntensity}
              min={0}
              max={3}
              step={0.1}
              display={ctrl.hoverIntensity.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("hoverIntensity", v)}
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

            {/* toggles */}
            <ToggleRow
              label="Hover Gravity"
              value={ctrl.hoverGravity}
              accentColor={accent}
              onChange={(v) => set("hoverGravity", v)}
            />
            <ToggleRow
              label="Show Core"
              value={ctrl.showCore}
              accentColor={accent}
              onChange={(v) => set("showCore", v)}
            />
            <ToggleRow
              label="Fog"
              value={ctrl.fog}
              accentColor={accent}
              onChange={(v) => set("fog", v)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
