"use client";

import TurbineLoader from "@/lib/components/ui/progress/TurbineLoader";

// ── Reusable card wrapper ───────────────────────────────────────
function DemoCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center gap-4 p-6 min-h-[160px]">
      {children}
      <span className="font-orbitron text-[10px] uppercase tracking-widest text-white/50">
        {label}
      </span>
    </div>
  );
}

// ── Demo ──────────────────────────────────────────────────────
export default function TurbineLoaderDemo() {
  return (
    <div className="flex flex-col gap-10 w-full">
      {/* ── Color variants ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Color Variants
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {(
            [
              { label: "Cyan", color: "cyan" },
              { label: "Pink", color: "pink" },
              { label: "Green", color: "green" },
              { label: "White", color: "white" },
              { label: "Orange", color: "orange" },
            ] as const
          ).map((v) => (
            <DemoCard key={v.color} label={v.label}>
              <TurbineLoader color={v.color} size="md" />
            </DemoCard>
          ))}
        </div>
      </div>

      {/* ── Size variants ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Size Variants
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {(
            [
              { label: "xs", size: "xs" },
              { label: "sm", size: "sm" },
              { label: "md", size: "md" },
              { label: "lg", size: "lg" },
              { label: "xl", size: "xl" },
            ] as const
          ).map((v) => (
            <DemoCard key={v.label} label={v.label}>
              <TurbineLoader color="cyan" size={v.size} />
            </DemoCard>
          ))}
        </div>
      </div>

      {/* ── Ring count ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Ring Count
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <DemoCard key={n} label={`${n} ring${n === 1 ? "" : "s"}`}>
              <TurbineLoader color="pink" size="md" ringCount={n} />
            </DemoCard>
          ))}
        </div>
      </div>

      {/* ── Blade count ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Blade Count
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[4, 6, 8, 12].map((n) => (
            <DemoCard key={n} label={`${n} blades`}>
              <TurbineLoader color="green" size="md" bladeCount={n} />
            </DemoCard>
          ))}
        </div>
      </div>

      {/* ── Speed ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Speed (duration)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Fast — 700ms", speed: 700 },
            { label: "Default — 1800ms", speed: 1800 },
            { label: "Slow — 3200ms", speed: 3200 },
          ].map((v) => (
            <DemoCard key={v.speed} label={v.label}>
              <TurbineLoader color="cyan" size="md" speed={v.speed} />
            </DemoCard>
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
            <DemoCard key={g} label={g}>
              <TurbineLoader color="pink" size="md" glowIntensity={g} />
            </DemoCard>
          ))}
        </div>
      </div>

      {/* ── Direction ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Direction
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DemoCard label="Clockwise">
            <TurbineLoader color="green" size="md" direction="clockwise" />
          </DemoCard>
          <DemoCard label="Counter-clockwise">
            <TurbineLoader
              color="green"
              size="md"
              direction="counter-clockwise"
            />
          </DemoCard>
        </div>
      </div>

      {/* ── Use-case: power-up / boot sequence ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Use-case — Boot Sequence
        </p>
        <div className="bg-white/[0.02] border border-white/10 rounded flex flex-col items-center justify-center gap-4 p-10 min-h-[220px]">
          <TurbineLoader
            color="#00f3ff"
            size={96}
            ringCount={3}
            bladeCount={10}
            speed={2400}
            glowIntensity="high"
          />
          <p
            className="font-orbitron text-[10px] uppercase tracking-widest"
            style={{ color: "#00f3ff" }}
          >
            Spinning up turbines…
          </p>
        </div>
      </div>
    </div>
  );
}
