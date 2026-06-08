import NeonSparkline from "../../../components/ui/charts/NeonSparkline";

const upData = [
  { value: 10 }, { value: 14 }, { value: 11 }, { value: 18 },
  { value: 20 }, { value: 17 }, { value: 25 }, { value: 30 },
];
const downData = [
  { value: 30 }, { value: 26 }, { value: 24 }, { value: 20 },
  { value: 15 }, { value: 18 }, { value: 12 }, { value: 8 },
];
const volatileData = [
  { value: 40 }, { value: 12 }, { value: 38 }, { value: 5 },
  { value: 45 }, { value: 22 }, { value: 50 }, { value: 18 },
];

export default function NeonSparklineDemo() {
  return (
    <div className="flex flex-col gap-10 w-full">

      {/* Color variants */}
      <div className="space-y-4">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Color variants
        </p>
        <div className="flex flex-wrap items-end gap-8">
          {(["cyan", "pink", "green"] as const).map((c) => (
            <div key={c} className="flex flex-col gap-2 items-center">
              <NeonSparkline data={upData} color={c} width={120} height={44} />
              <span className="text-xs font-orbitron text-white/30 uppercase">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Sizes
        </p>
        <div className="flex flex-wrap items-end gap-8">
          {([60, 100, 160, 220] as const).map((w) => (
            <div key={w} className="flex flex-col gap-2 items-center">
              <NeonSparkline data={upData} color="cyan" width={w} height={36} />
              <span className="text-xs font-orbitron text-white/30">{w}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Glow intensities */}
      <div className="space-y-4">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Glow intensity
        </p>
        <div className="flex flex-wrap items-end gap-8">
          {(["none", "low", "medium", "high"] as const).map((g) => (
            <div key={g} className="flex flex-col gap-2 items-center">
              <NeonSparkline data={upData} color="pink" width={100} height={44} glowIntensity={g} />
              <span className="text-xs font-orbitron text-white/30 uppercase">{g}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Curves */}
      <div className="space-y-4">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Curve types
        </p>
        <div className="flex flex-wrap items-end gap-8">
          {(["monotone", "linear", "step"] as const).map((c) => (
            <div key={c} className="flex flex-col gap-2 items-center">
              <NeonSparkline data={volatileData} color="green" width={120} height={44} curve={c} />
              <span className="text-xs font-orbitron text-white/30">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* In-context — inside a KPI-style card */}
      <div className="space-y-4">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          In-context — KPI card usage
        </p>
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Revenue", value: "$48,290", trend: "▲ 12.4%", color: "cyan" as const, data: upData },
            { label: "Bounce Rate", value: "24.7%", trend: "▼ 3.1%", color: "pink" as const, data: downData },
            { label: "Throughput", value: "9.2k/s", trend: "▲ 8.6%", color: "green" as const, data: volatileData },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-sm border border-white/10 bg-white/[0.03] px-4 pt-4 pb-0 min-w-[160px] flex-1"
            >
              <p className="font-orbitron text-[10px] text-white/40 uppercase tracking-widest mb-1">{item.label}</p>
              <p className="font-orbitron text-xl text-white font-bold mb-1">{item.value}</p>
              <p className={`text-xs font-mono mb-3 ${item.color === "green" ? "text-neon-green" : item.color === "pink" ? "text-neon-pink" : "text-neon-cyan"}`}>
                {item.trend}
              </p>
              <div className="-mx-4">
                <NeonSparkline data={item.data} color={item.color} width="100%" height={40} tooltip={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
