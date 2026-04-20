"use client";

import { useState } from "react";
import {
  GlyphCity,
  type GlyphCityVariant,
  type OutlineCityVariant,
  type CityType,
} from "../../../components/ui/backgrounds/GlyphCity";

const SOLID_VARIANTS: GlyphCityVariant[] = [
  "downtown",
  "megacity",
  "district",
  "ruins",
];
const OUTLINE_VARIANTS: OutlineCityVariant[] = [
  "sparse",
  "dense",
  "layered",
  "horizon",
];

export default function GlyphCityDemo() {
  const [cityType, setCityType] = useState<CityType>("solid");
  const [solidVariant, setSolidVariant] =
    useState<GlyphCityVariant>("downtown");
  const [outlineVariant, setOutlineVariant] =
    useState<OutlineCityVariant>("sparse");

  return (
    <div className="space-y-4 w-full">
      {/* Type switcher */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-white/40 font-mono uppercase tracking-widest mr-1">
          Type:
        </span>
        {(["solid", "outline"] as CityType[]).map((t) => (
          <button
            key={t}
            onClick={() => setCityType(t)}
            className={`px-3 py-1 text-xs font-mono uppercase tracking-widest border transition-colors ${
              cityType === t
                ? "border-cyan-400 text-cyan-400 bg-cyan-400/10"
                : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/70"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Variant switcher */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-white/40 font-mono uppercase tracking-widest mr-1">
          Variant:
        </span>
        {cityType === "solid"
          ? SOLID_VARIANTS.map((v) => (
              <button
                key={v}
                onClick={() => setSolidVariant(v)}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-widest border transition-colors ${
                  solidVariant === v
                    ? "border-fuchsia-400 text-fuchsia-400 bg-fuchsia-400/10"
                    : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/70"
                }`}
              >
                {v}
              </button>
            ))
          : OUTLINE_VARIANTS.map((v) => (
              <button
                key={v}
                onClick={() => setOutlineVariant(v)}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-widest border transition-colors ${
                  outlineVariant === v
                    ? "border-fuchsia-400 text-fuchsia-400 bg-fuchsia-400/10"
                    : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/70"
                }`}
              >
                {v}
              </button>
            ))}
      </div>

      {/* Preview */}
      <div className="h-96 w-full relative overflow-hidden rounded border border-white/10">
        <GlyphCity
          cityType={cityType}
          variant={solidVariant}
          outlineVariant={outlineVariant}
          colorPrimary="#00ffff"
          colorSecondary="#ff00ff"
          colorTertiary="#ffff00"
          bgColor="#020208"
          fontSize={12}
          speed={80}
          showVehicles
          blinkingLights
          opacity={92}
        />
      </div>
    </div>
  );
}
