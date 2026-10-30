"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LightningButton } from "../../../lib/components/ui/buttons/LightningButton";
import { CornerCutButton } from "../../../lib/components/ui/buttons/CornerCutButton";
import type {
  LBSize,
  LBVariant,
  LBGlowIntensity,
  LBPressEffect,
} from "../../../lib/components/ui/buttons/LightningButton";

/* ── types ──────────────────────────────────────────────────────────────── */
interface Controls {
  label: string;
  text: string;
  color: string;
  lightningColor: string;
  coreColor: string;
  size: LBSize;
  variant: LBVariant;
  cut: boolean;
  cornerSize: number;
  radius: number;
  boltCount: number;
  segments: number;
  jitter: number;
  thickness: number;
  glowIntensity: LBGlowIntensity;
  flickerSpeed: number;
  idleGlow: boolean;
  pressEffect: LBPressEffect;
}

/* ── presets ─────────────────────────────────────────────────────────────── */
const PRESETS: Controls[] = [
  {
    label: "CYAN STRIKE",
    text: "Hover Me",
    color: "#00f3ff",
    lightningColor: "#00f3ff",
    coreColor: "#ffffff",
    size: "md",
    variant: "solid",
    cut: true,
    cornerSize: 16,
    radius: 150,
    boltCount: 5,
    segments: 7,
    jitter: 16,
    thickness: 1.4,
    glowIntensity: "medium",
    flickerSpeed: 60,
    idleGlow: true,
    pressEffect: "ripple",
  },
  {
    label: "VENOM PINK",
    text: "Venom Strike",
    color: "#ff00ff",
    lightningColor: "#ff00ff",
    coreColor: "#ffffff",
    size: "lg",
    variant: "outline",
    cut: true,
    cornerSize: 14,
    radius: 180,
    boltCount: 6,
    segments: 8,
    jitter: 20,
    thickness: 1.6,
    glowIntensity: "high",
    flickerSpeed: 45,
    idleGlow: true,
    pressEffect: "shine",
  },
  {
    label: "TOXIC GREEN",
    text: "Get Started",
    color: "#39ff14",
    lightningColor: "#39ff14",
    coreColor: "#eaffe0",
    size: "sm",
    variant: "ghost",
    cut: true,
    cornerSize: 10,
    radius: 110,
    boltCount: 4,
    segments: 6,
    jitter: 10,
    thickness: 1,
    glowIntensity: "low",
    flickerSpeed: 90,
    idleGlow: false,
    pressEffect: "mechanical",
  },
  {
    label: "INFERNO",
    text: "Charge Up",
    color: "#ff6600",
    lightningColor: "#ffaa00",
    coreColor: "#fff5e0",
    size: "xl",
    variant: "solid",
    cut: true,
    cornerSize: 22,
    radius: 230,
    boltCount: 8,
    segments: 9,
    jitter: 24,
    thickness: 2,
    glowIntensity: "high",
    flickerSpeed: 40,
    idleGlow: true,
    pressEffect: "destroy",
  },
  {
    label: "VOLTAGE",
    text: "Overclock",
    color: "#e5e5ff",
    lightningColor: "#8800ff",
    coreColor: "#ffffff",
    size: "md",
    variant: "outline",
    cut: false,
    cornerSize: 16,
    radius: 160,
    boltCount: 5,
    segments: 7,
    jitter: 18,
    thickness: 1.4,
    glowIntensity: "medium",
    flickerSpeed: 55,
    idleGlow: true,
    pressEffect: "ripple",
  },
];

const SIZE_OPTIONS: LBSize[] = ["xs", "sm", "md", "lg", "xl"];
const VARIANT_OPTIONS: LBVariant[] = ["solid", "outline", "ghost"];
const GLOW_OPTIONS: LBGlowIntensity[] = ["low", "medium", "high"];
const PRESS_EFFECT_OPTIONS: LBPressEffect[] = [
  "ripple",
  "shine",
  "mechanical",
  "destroy",
  "none",
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

function OptionRow<T extends string>({
  label,
  value,
  options,
  accentColor,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  accentColor: string;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] tracking-widest uppercase text-white/75">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className="px-2 py-0.5 text-[9px] tracking-widest uppercase border transition-colors"
            style={
              value === opt
                ? {
                    borderColor: accentColor,
                    color: accentColor,
                    background: `${accentColor}18`,
                  }
                : { borderColor: "#ffffff22", color: "#ffffff44" }
            }
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── page ───────────────────────────────────────────────────────────────── */
export default function LightningButtonDemo() {
  const [ctrl, setCtrl] = useState<Controls>(PRESETS[0]);
  const [panelOpen, setPanelOpen] = useState(true);

  const set = <K extends keyof Controls>(key: K, val: Controls[K]) =>
    setCtrl((c) => ({ ...c, [key]: val }));

  const accent = ctrl.color;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-orbitron overflow-x-hidden">
      {/* ── Hero / live preview ─────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 gap-8 overflow-hidden select-none">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 60%)",
          }}
        />

        {/* back button */}
        <div className="absolute top-[100px] left-6 z-20">
          <Link href="/components/buttons/lightning-button">
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

        {/* interactive stage */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <p className="text-[11px] tracking-widest uppercase text-white/50">
            Move your cursor near the button, then click it
          </p>
          <LightningButton
            key={ctrl.label}
            color={ctrl.color}
            lightningColor={ctrl.lightningColor}
            coreColor={ctrl.coreColor}
            size={ctrl.size}
            variant={ctrl.variant}
            cut={ctrl.cut}
            cornerSize={ctrl.cornerSize}
            radius={ctrl.radius}
            boltCount={ctrl.boltCount}
            segments={ctrl.segments}
            jitter={ctrl.jitter}
            thickness={ctrl.thickness}
            glowIntensity={ctrl.glowIntensity}
            flickerSpeed={ctrl.flickerSpeed}
            idleGlow={ctrl.idleGlow}
            pressEffect={ctrl.pressEffect}
          >
            {ctrl.text}
          </LightningButton>

          {/* quick-try row — every press effect side by side, click any */}
          <div className="flex flex-col items-center gap-3 mt-10">
            <p className="text-[10px] tracking-widest uppercase text-white/35">
              Or try every press effect
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {PRESS_EFFECT_OPTIONS.map((effect) => (
                <LightningButton
                  key={effect}
                  color={accent}
                  size="sm"
                  variant="outline"
                  pressEffect={effect}
                  radius={100}
                >
                  {effect}
                </LightningButton>
              ))}
            </div>
          </div>
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
              label="Button Color"
              value={ctrl.color}
              onChange={(v) => set("color", v)}
            />
            <ColorRow
              label="Lightning Color"
              value={ctrl.lightningColor}
              onChange={(v) => set("lightningColor", v)}
            />
            <ColorRow
              label="Core Color"
              value={ctrl.coreColor}
              onChange={(v) => set("coreColor", v)}
            />

            {/* shape / style */}
            <OptionRow
              label="Size"
              value={ctrl.size}
              options={SIZE_OPTIONS}
              accentColor={accent}
              onChange={(v) => set("size", v)}
            />
            <OptionRow
              label="Variant"
              value={ctrl.variant}
              options={VARIANT_OPTIONS}
              accentColor={accent}
              onChange={(v) => set("variant", v)}
            />
            <OptionRow
              label="Glow Intensity"
              value={ctrl.glowIntensity}
              options={GLOW_OPTIONS}
              accentColor={accent}
              onChange={(v) => set("glowIntensity", v)}
            />
            <OptionRow
              label="Press Effect"
              value={ctrl.pressEffect}
              options={PRESS_EFFECT_OPTIONS}
              accentColor={accent}
              onChange={(v) => set("pressEffect", v)}
            />

            {/* sliders */}
            <SliderRow
              label="Activation Radius"
              value={ctrl.radius}
              min={60}
              max={300}
              step={5}
              display={`${ctrl.radius}px`}
              accentColor={accent}
              onChange={(v) => set("radius", v)}
            />
            <SliderRow
              label="Bolt Count"
              value={ctrl.boltCount}
              min={1}
              max={12}
              step={1}
              display={String(ctrl.boltCount)}
              accentColor={accent}
              onChange={(v) => set("boltCount", v)}
            />
            <SliderRow
              label="Segments"
              value={ctrl.segments}
              min={2}
              max={14}
              step={1}
              display={String(ctrl.segments)}
              accentColor={accent}
              onChange={(v) => set("segments", v)}
            />
            <SliderRow
              label="Jitter"
              value={ctrl.jitter}
              min={0}
              max={40}
              step={1}
              display={`${ctrl.jitter}px`}
              accentColor={accent}
              onChange={(v) => set("jitter", v)}
            />
            <SliderRow
              label="Thickness"
              value={ctrl.thickness}
              min={0.5}
              max={4}
              step={0.1}
              display={ctrl.thickness.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("thickness", v)}
            />
            <SliderRow
              label="Flicker Speed"
              value={ctrl.flickerSpeed}
              min={20}
              max={200}
              step={5}
              display={`${ctrl.flickerSpeed}ms`}
              accentColor={accent}
              onChange={(v) => set("flickerSpeed", v)}
            />
            <SliderRow
              label="Corner Size"
              value={ctrl.cornerSize}
              min={0}
              max={32}
              step={1}
              display={`${ctrl.cornerSize}px`}
              accentColor={accent}
              onChange={(v) => set("cornerSize", v)}
            />

            {/* toggles */}
            <ToggleRow
              label="Corner Cut"
              value={ctrl.cut}
              accentColor={accent}
              onChange={(v) => set("cut", v)}
            />
            <ToggleRow
              label="Idle Glow"
              value={ctrl.idleGlow}
              accentColor={accent}
              onChange={(v) => set("idleGlow", v)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
