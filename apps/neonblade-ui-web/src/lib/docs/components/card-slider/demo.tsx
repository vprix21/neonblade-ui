"use client";

import React from "react";
import CardSlider from "../../../components/ui/sliders/CardSlider";

type DemoSlide = {
  seed: string;
  label: string;
  subLabel: string;
  metric: string;
  status: string;
};

// ── Sample image data ────────────────────────────────────────────────────────
const DEMO_IMAGES: DemoSlide[] = [
  {
    seed: "neonblade1",
    label: "SECTOR 01",
    subLabel: "Perimeter relay",
    metric: "Uplink 96%",
    status: "Stable",
  },
  {
    seed: "neonblade2",
    label: "SECTOR 02",
    subLabel: "Data harbor",
    metric: "Nodes 14",
    status: "Optimal",
  },
  {
    seed: "neonblade3",
    label: "SECTOR 03",
    subLabel: "Pulse corridor",
    metric: "Flow 2.4 Tb/s",
    status: "Active",
  },
  {
    seed: "neonblade4",
    label: "SECTOR 04",
    subLabel: "Drone lane",
    metric: "ETA 03:12",
    status: "Tracking",
  },
  {
    seed: "neonblade5",
    label: "SECTOR 05",
    subLabel: "Vault ingress",
    metric: "Heat 42C",
    status: "Guarded",
  },
  {
    seed: "neonblade6",
    label: "SECTOR 06",
    subLabel: "Skybridge",
    metric: "Latency 3ms",
    status: "Clear",
  },
];

// ── Image slide ──────────────────────────────────────────────────────────────
function ImageSlide({
  src,
  label,
  subLabel,
  metric,
  status,
  accent = "#00f3ff",
}: {
  src: string;
  label: string;
  subLabel: string;
  metric: string;
  status: string;
  accent?: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden group cursor-pointer"
      style={{ aspectRatio: "16/9" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      {/* Hover: neon edge glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${accent} 70%, transparent), inset 0 0 28px color-mix(in srgb, ${accent} 12%, transparent)`,
        }}
      />
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${accent} 80%, transparent) 35%, color-mix(in srgb, ${accent} 80%, transparent) 65%, transparent)`,
        }}
      />
      <div
        className="absolute top-3 right-3 px-2 py-1 border text-[10px] font-orbitron uppercase tracking-widest"
        style={{
          borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
          color: `color-mix(in srgb, ${accent} 85%, white)`,
          background: `color-mix(in srgb, ${accent} 8%, rgba(0,0,0,0.6))`,
        }}
      >
        {status}
      </div>
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-3">
        <div>
          <p
            className="font-orbitron text-xs font-bold tracking-[0.2em] uppercase"
            style={{
              color: `color-mix(in srgb, ${accent} 88%, white)`,
              textShadow: `0 0 12px color-mix(in srgb, ${accent} 65%, transparent)`,
            }}
          >
            {label}
          </p>
          <p
            className="mt-1 text-[11px] tracking-wide"
            style={{ color: "rgba(245,245,245,0.72)" }}
          >
            {subLabel}
          </p>
        </div>
        <p
          className="font-orbitron text-[11px] uppercase tracking-wider whitespace-nowrap"
          style={{ color: `color-mix(in srgb, ${accent} 78%, white)` }}
        >
          {metric}
        </p>
      </div>
    </div>
  );
}

// ── Main demo export ─────────────────────────────────────────────────────────
export default function CardSliderDemo() {
  const imageSlides = DEMO_IMAGES.map((img, i) => (
    <ImageSlide
      key={i}
      src={`https://picsum.photos/seed/${img.seed}/1080/600`}
      label={img.label}
      subLabel={img.subLabel}
      metric={img.metric}
      status={img.status}
      accent="#00f3ff"
    />
  ));

  const cyanCards = DEMO_IMAGES.map((img, i) => (
    <ImageSlide
      key={i}
      src={`https://picsum.photos/seed/${img.seed}-cyan/1080/720`}
      label={img.label}
      subLabel={img.subLabel}
      metric={img.metric}
      status={img.status}
      accent="#00f3ff"
    />
  ));

  const pinkCards = [
    {
      seed: "nexus-pink",
      label: "NEXUS",
      subLabel: "Quantum lane",
      metric: "Ping 12ms",
      status: "Synced",
    },
    {
      seed: "void-pink",
      label: "VOID",
      subLabel: "Shadow channel",
      metric: "Load 68%",
      status: "Live",
    },
    {
      seed: "pulse-pink",
      label: "PULSE",
      subLabel: "Signal tower",
      metric: "Burst x14",
      status: "Burst",
    },
    {
      seed: "flux-pink",
      label: "FLUX",
      subLabel: "Transit vault",
      metric: "ETA 01:08",
      status: "Queued",
    },
  ].map((item, i) => (
    <ImageSlide
      key={i}
      src={`https://picsum.photos/seed/${item.seed}/1080/720`}
      label={item.label}
      subLabel={item.subLabel}
      metric={item.metric}
      status={item.status}
      accent="#ff00ff"
    />
  ));

  const greenCards = [
    {
      seed: "node-a",
      label: "NODE A",
      subLabel: "Eco reactor",
      metric: "Yield 94%",
      status: "Online",
    },
    {
      seed: "node-b",
      label: "NODE B",
      subLabel: "Grid uplink",
      metric: "Load 31%",
      status: "Stable",
    },
    {
      seed: "node-c",
      label: "NODE C",
      subLabel: "Storage bay",
      metric: "Vault 72%",
      status: "Secured",
    },
    {
      seed: "node-d",
      label: "NODE D",
      subLabel: "Drone dock",
      metric: "ETA 00:42",
      status: "Inbound",
    },
    {
      seed: "node-e",
      label: "NODE E",
      subLabel: "Relay gate",
      metric: "Jitter 1.9ms",
      status: "Clean",
    },
  ].map((item, i) => (
    <ImageSlide
      key={i}
      src={`https://picsum.photos/seed/${item.seed}/1080/720`}
      label={item.label}
      subLabel={item.subLabel}
      metric={item.metric}
      status={item.status}
      accent="#39ff14"
    />
  ));

  return (
    <div className="flex flex-col gap-14 w-full">
      {/* ── Single visible, bar progress ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Single item · Bar progress · Sides buttons
        </p>
        <CardSlider
          visibleCount={1}
          gap={10}
          accentColor="#00f3ff"
          progressStyle="bar"
          buttonPosition="sides"
          cornerAccentStyle="frame"
          showCornerAccents
          loop
        >
          {imageSlides}
        </CardSlider>
      </div>

      {/* ── Multi-item responsive ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Responsive · 1→2→3 visible · Dot progress · Bottom buttons · Frame
          corners
        </p>
        <CardSlider
          visibleCount={{ sm: 1, md: 2, lg: 3 }}
          gap={12}
          accentColor="#00f3ff"
          progressStyle="dots"
          buttonPosition="bottom"
          showCornerAccents
          cornerAccentStyle="frame"
        >
          {cyanCards}
        </CardSlider>
      </div>

      {/* ── Counter progress · Plus corner accents ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          2 visible · Counter progress · Hover buttons · Plus corners · Pink
        </p>
        <CardSlider
          visibleCount={2}
          gap={16}
          accentColor="#ff00ff"
          progressStyle="counter"
          buttonPosition="sides"
          buttonVisibility="hover"
          showCornerAccents
          cornerAccentStyle="plus"
          loop
        >
          {pinkCards}
        </CardSlider>
      </div>

      {/* ── Scan-lines · Auto-play · Plus corner accents ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Auto-play · Scan lines · Green
        </p>
        <CardSlider
          visibleCount={{ sm: 1, md: 2 }}
          gap={12}
          accentColor="#39ff14"
          progressStyle="bar"
          buttonPosition="bottom"
          scanLines
          autoPlay
          autoPlayInterval={2000}
          loop
          showCornerAccents={false}
        >
          {greenCards}
        </CardSlider>
      </div>
    </div>
  );
}
