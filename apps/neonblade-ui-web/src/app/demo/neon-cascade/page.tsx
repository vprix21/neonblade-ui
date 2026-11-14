"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NeonCascade } from "../../../lib/components/ui/backgrounds/NeonCascade";
import { CornerCutButton } from "../../../lib/components/ui/buttons/CornerCutButton";
import { CopyPropsButton } from "../../../components/CopyPropsButton";
import { buildDemoCode } from "../../../lib/demo-code";

/* ── types ──────────────────────────────────────────────────────────────── */
interface Controls {
  label: string;
  color: string;
  tipColor: string;
  bgColor: string;
  lineCount: number;
  lineWidth: number;
  span: number;
  lineHeight: number;
  curveHeight: number;
  curveAmount: number;
  curvePower: number;
  sway: number;
  swayFrequency: number;
  swaySpeed: number;
  flow: boolean;
  flowSpeed: number;
  flowLength: number;
  flowDensity: number;
  glow: number;
  opacity: number;
  cameraDistance: number;
  cameraFov: number;
  parallax: boolean;
  parallaxStrength: number;
}

/* ── presets ─────────────────────────────────────────────────────────────── */
const PRESETS: Controls[] = [
  {
    label: "CYAN BLADE",
    color: "#00f3ff",
    tipColor: "#7a5cff",
    bgColor: "#050505",
    lineCount: 64,
    lineWidth: 0.09,
    span: 30,
    lineHeight: 20,
    curveHeight: 0.5,
    curveAmount: 5,
    curvePower: 1,
    sway: 0.25,
    swayFrequency: 0.6,
    swaySpeed: 0.35,
    flow: true,
    flowSpeed: 0.4,
    flowLength: 0.35,
    flowDensity: 1.2,
    glow: 1.6,
    opacity: 100,
    cameraDistance: 16,
    cameraFov: 50,
    parallax: true,
    parallaxStrength: 1,
  },
  {
    label: "MAGENTA FALL",
    color: "#ff00e6",
    tipColor: "#ff8800",
    bgColor: "#0a0208",
    lineCount: 72,
    lineWidth: 0.1,
    span: 32,
    lineHeight: 20,
    curveHeight: 0.45,
    curveAmount: 7,
    curvePower: 1.4,
    sway: 0.35,
    swayFrequency: 0.8,
    swaySpeed: 0.5,
    flow: true,
    flowSpeed: 0.55,
    flowLength: 0.3,
    flowDensity: 1.6,
    glow: 2,
    opacity: 100,
    cameraDistance: 15,
    cameraFov: 52,
    parallax: true,
    parallaxStrength: 1.2,
  },
  {
    label: "TOXIC RAIN",
    color: "#39ff14",
    tipColor: "#00ffaa",
    bgColor: "#010a03",
    lineCount: 80,
    lineWidth: 0.07,
    span: 34,
    lineHeight: 22,
    curveHeight: 0.58,
    curveAmount: 5.5,
    curvePower: 1,
    sway: 0.15,
    swayFrequency: 0.5,
    swaySpeed: 0.3,
    flow: true,
    flowSpeed: 0.65,
    flowLength: 0.25,
    flowDensity: 2,
    glow: 1.4,
    opacity: 100,
    cameraDistance: 17,
    cameraFov: 48,
    parallax: true,
    parallaxStrength: 0.8,
  },
  {
    label: "GLACIER",
    color: "#88ddff",
    tipColor: "#ffffff",
    bgColor: "#01050a",
    lineCount: 56,
    lineWidth: 0.08,
    span: 28,
    lineHeight: 18,
    curveHeight: 0.62,
    curveAmount: 4,
    curvePower: 0.8,
    sway: 0.45,
    swayFrequency: 1,
    swaySpeed: 0.25,
    flow: true,
    flowSpeed: 0.3,
    flowLength: 0.45,
    flowDensity: 1,
    glow: 1.8,
    opacity: 95,
    cameraDistance: 15,
    cameraFov: 46,
    parallax: true,
    parallaxStrength: 1.4,
  },
  {
    label: "STATIC BLADES",
    color: "#00f3ff",
    tipColor: "#ff00ff",
    bgColor: "#050505",
    lineCount: 96,
    lineWidth: 0.06,
    span: 34,
    lineHeight: 20,
    curveHeight: 0.55,
    curveAmount: 3.5,
    curvePower: 1.2,
    sway: 0,
    swayFrequency: 0.6,
    swaySpeed: 0,
    flow: false,
    flowSpeed: 0.4,
    flowLength: 0.35,
    flowDensity: 1.2,
    glow: 2.2,
    opacity: 100,
    cameraDistance: 16,
    cameraFov: 50,
    parallax: false,
    parallaxStrength: 1,
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
export default function NeonCascadeDemo() {
  const [ctrl, setCtrl] = useState<Controls>(PRESETS[0]);
  const [panelOpen, setPanelOpen] = useState(true);

  const set = <K extends keyof Controls>(key: K, val: Controls[K]) =>
    setCtrl((c) => ({ ...c, [key]: val }));

  const accent = ctrl.color;

  const code = buildDemoCode("NeonCascade", {
    color: ctrl.color,
    tipColor: ctrl.tipColor,
    bgColor: ctrl.bgColor,
    lineWidth: ctrl.lineWidth,
    span: ctrl.span,
    lineHeight: ctrl.lineHeight,
    sway: ctrl.sway,
    lineCount: ctrl.lineCount,
    swayFrequency: ctrl.swayFrequency,
    swaySpeed: ctrl.swaySpeed,
    curveHeight: ctrl.curveHeight,
    curveAmount: ctrl.curveAmount,
    flowLength: ctrl.flowLength,
    flowDensity: ctrl.flowDensity,
    flowSpeed: ctrl.flowSpeed,
    curvePower: ctrl.curvePower,
    flow: ctrl.flow,
    glow: ctrl.glow,
    opacity: ctrl.opacity,
    cameraDistance: ctrl.cameraDistance,
    cameraFov: ctrl.cameraFov,
    parallax: ctrl.parallax,
    parallaxStrength: ctrl.parallaxStrength,
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white font-orbitron overflow-x-hidden">
      {/* ── Hero / live preview ─────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 gap-8 overflow-hidden select-none">
        <NeonCascade
          color={ctrl.color}
          tipColor={ctrl.tipColor}
          bgColor={ctrl.bgColor}
          lineCount={ctrl.lineCount}
          lineWidth={ctrl.lineWidth}
          span={ctrl.span}
          lineHeight={ctrl.lineHeight}
          curveHeight={ctrl.curveHeight}
          curveAmount={ctrl.curveAmount}
          curvePower={ctrl.curvePower}
          sway={ctrl.sway}
          swayFrequency={ctrl.swayFrequency}
          swaySpeed={ctrl.swaySpeed}
          flow={ctrl.flow}
          flowSpeed={ctrl.flowSpeed}
          flowLength={ctrl.flowLength}
          flowDensity={ctrl.flowDensity}
          glow={ctrl.glow}
          opacity={ctrl.opacity}
          cameraDistance={ctrl.cameraDistance}
          cameraFov={ctrl.cameraFov}
          parallax={ctrl.parallax}
          parallaxStrength={ctrl.parallaxStrength}
        />

        {/* back button */}
        <div className="absolute top-[100px] left-6 z-20">
          <Link href="/components/backgrounds/neon-cascade">
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
              fontSize: "clamp(2.5rem, 9vw, 7.5rem)",
              color: "#ffffff",
              textShadow: `0 0 20px ${accent}cc, 0 0 50px ${accent}88, 0 0 90px ${accent}44`,
            }}
          >
            NEON
            <br />
            CASCADE
          </h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/50">
            Vertical light · bent into depth
          </p>
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
              className="flex items-center justify-between gap-2 flex-wrap border-b pb-2"
              style={{ borderColor: `${accent}22` }}
            >
              <span
                className="text-[10px] tracking-widest uppercase"
                style={{ color: accent }}
              >
                Live Controls
              </span>
              <CopyPropsButton code={code} color={accent} />
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
              value={ctrl.color}
              onChange={(v) => set("color", v)}
            />
            <ColorRow
              label="Tip Color"
              value={ctrl.tipColor}
              onChange={(v) => set("tipColor", v)}
            />
            <ColorRow
              label="Bg Color"
              value={ctrl.bgColor}
              onChange={(v) => set("bgColor", v)}
            />

            {/* toggles */}
            <ToggleRow
              label="Flow"
              value={ctrl.flow}
              accentColor={accent}
              onChange={(v) => set("flow", v)}
            />
            <ToggleRow
              label="Parallax"
              value={ctrl.parallax}
              accentColor={accent}
              onChange={(v) => set("parallax", v)}
            />

            {/* sliders */}
            <SliderRow
              label="Line Count"
              value={ctrl.lineCount}
              min={4}
              max={220}
              step={2}
              display={String(ctrl.lineCount)}
              accentColor={accent}
              onChange={(v) => set("lineCount", v)}
            />
            <SliderRow
              label="Line Width"
              value={ctrl.lineWidth}
              min={0.02}
              max={0.24}
              step={0.01}
              display={ctrl.lineWidth.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("lineWidth", v)}
            />
            <SliderRow
              label="Span"
              value={ctrl.span}
              min={10}
              max={60}
              step={1}
              display={String(ctrl.span)}
              accentColor={accent}
              onChange={(v) => set("span", v)}
            />
            <SliderRow
              label="Line Height"
              value={ctrl.lineHeight}
              min={8}
              max={40}
              step={1}
              display={String(ctrl.lineHeight)}
              accentColor={accent}
              onChange={(v) => set("lineHeight", v)}
            />
            <SliderRow
              label="Curve Start"
              value={ctrl.curveHeight}
              min={0.05}
              max={0.95}
              step={0.01}
              display={ctrl.curveHeight.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("curveHeight", v)}
            />
            <SliderRow
              label="Curve Amount"
              value={ctrl.curveAmount}
              min={0}
              max={14}
              step={0.25}
              display={ctrl.curveAmount.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("curveAmount", v)}
            />
            <SliderRow
              label="Curve Power"
              value={ctrl.curvePower}
              min={0.3}
              max={3}
              step={0.05}
              display={ctrl.curvePower.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("curvePower", v)}
            />
            <SliderRow
              label="Sway"
              value={ctrl.sway}
              min={0}
              max={2}
              step={0.05}
              display={ctrl.sway.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("sway", v)}
            />
            <SliderRow
              label="Sway Frequency"
              value={ctrl.swayFrequency}
              min={0}
              max={3}
              step={0.05}
              display={ctrl.swayFrequency.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("swayFrequency", v)}
            />
            <SliderRow
              label="Sway Speed"
              value={ctrl.swaySpeed}
              min={0}
              max={2}
              step={0.05}
              display={ctrl.swaySpeed.toFixed(2)}
              accentColor={accent}
              onChange={(v) => set("swaySpeed", v)}
            />
            {ctrl.flow && (
              <>
                <SliderRow
                  label="Flow Speed"
                  value={ctrl.flowSpeed}
                  min={0}
                  max={2}
                  step={0.05}
                  display={ctrl.flowSpeed.toFixed(2)}
                  accentColor={accent}
                  onChange={(v) => set("flowSpeed", v)}
                />
                <SliderRow
                  label="Flow Length"
                  value={ctrl.flowLength}
                  min={0.05}
                  max={1}
                  step={0.05}
                  display={ctrl.flowLength.toFixed(2)}
                  accentColor={accent}
                  onChange={(v) => set("flowLength", v)}
                />
                <SliderRow
                  label="Flow Density"
                  value={ctrl.flowDensity}
                  min={0.2}
                  max={4}
                  step={0.1}
                  display={ctrl.flowDensity.toFixed(1)}
                  accentColor={accent}
                  onChange={(v) => set("flowDensity", v)}
                />
              </>
            )}
            <SliderRow
              label="Glow"
              value={ctrl.glow}
              min={0}
              max={4}
              step={0.1}
              display={ctrl.glow.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("glow", v)}
            />
            <SliderRow
              label="Opacity"
              value={ctrl.opacity}
              min={5}
              max={100}
              step={1}
              display={`${ctrl.opacity}%`}
              accentColor={accent}
              onChange={(v) => set("opacity", v)}
            />
            <SliderRow
              label="Camera Distance"
              value={ctrl.cameraDistance}
              min={6}
              max={34}
              step={0.5}
              display={ctrl.cameraDistance.toFixed(1)}
              accentColor={accent}
              onChange={(v) => set("cameraDistance", v)}
            />
            <SliderRow
              label="Camera FOV"
              value={ctrl.cameraFov}
              min={25}
              max={100}
              step={1}
              display={`${ctrl.cameraFov}°`}
              accentColor={accent}
              onChange={(v) => set("cameraFov", v)}
            />
            {ctrl.parallax && (
              <SliderRow
                label="Parallax Strength"
                value={ctrl.parallaxStrength}
                min={0}
                max={4}
                step={0.1}
                display={ctrl.parallaxStrength.toFixed(1)}
                accentColor={accent}
                onChange={(v) => set("parallaxStrength", v)}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
