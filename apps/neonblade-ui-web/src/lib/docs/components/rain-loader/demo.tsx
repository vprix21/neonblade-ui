"use client";

import RainLoader from "@/lib/components/ui/progress/RainLoader";

// ── Reusable card wrapper ─────────────────────────────────────
function DemoCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center gap-4 p-6 min-h-[140px]">
      {children}
      <span className="font-orbitron text-[10px] uppercase tracking-widest text-white/50">
        {label}
      </span>
    </div>
  );
}

// ── Demo ──────────────────────────────────────────────────────
export default function RainLoaderDemo() {
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
              { label: "Cyan",   color: "cyan"   },
              { label: "Pink",   color: "pink"   },
              { label: "Green",  color: "green"  },
              { label: "White",  color: "white"  },
              { label: "Orange", color: "orange" },
            ] as const
          ).map((v) => (
            <DemoCard key={v.color} label={v.label}>
              <RainLoader color={v.color} size="md" />
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
              { label: "xs",  size: "xs"  },
              { label: "sm",  size: "sm"  },
              { label: "md",  size: "md"  },
              { label: "lg",  size: "lg"  },
              { label: "xl",  size: "xl"  },
            ] as const
          ).map((v) => (
            <DemoCard key={v.label} label={v.label}>
              <RainLoader color="cyan" size={v.size} />
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
              <RainLoader color="pink" size="md" glowIntensity={g} />
            </DemoCard>
          ))}
        </div>
      </div>

      {/* ── Bar count ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Bar Count
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[2, 3, 4, 6].map((n) => (
            <DemoCard key={n} label={`${n} bars`}>
              <RainLoader color="green" size="md" barCount={n} />
            </DemoCard>
          ))}
        </div>
      </div>

      {/* ── Speed variants ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Speed (duration)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Fast — 900ms",   duration: 900  },
            { label: "Default — 1600ms", duration: 1600 },
            { label: "Slow — 2800ms",  duration: 2800 },
          ].map((v) => (
            <DemoCard key={v.duration} label={v.label}>
              <RainLoader color="cyan" size="md" duration={v.duration} />
            </DemoCard>
          ))}
        </div>
      </div>

      {/* ── Use-case: card skeletons ── */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Use-case — Card Skeleton Loader
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Loading image…",   color: "cyan",  duration: 1400 },
            { title: "Fetching data…",   color: "pink",  duration: 1700 },
            { title: "Rendering chart…", color: "green", duration: 2000 },
          ].map((v) => (
            <div
              key={v.title}
              className="bg-white/[0.02] border border-white/10 rounded flex flex-col items-center justify-center gap-3 p-8 min-h-[160px]"
            >
              <RainLoader color={v.color} size="sm" duration={v.duration} glowIntensity="medium" />
              <p
                className="font-orbitron text-[10px] uppercase tracking-widest"
                style={{
                  color:
                    v.color === "cyan"
                      ? "#00f3ff"
                      : v.color === "pink"
                        ? "#ff00ff"
                        : "#39ff14",
                }}
              >
                {v.title}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
