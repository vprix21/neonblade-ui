import { Code2, Download, GitFork, Heart, LayoutTemplate } from "lucide-react";
import NeonGlowCornerCutCard from "@/lib/components/ui/cards/NeonGlowCornerCutCard";

interface RegistryStats {
  totalComponents: number;
  totalTemplates: number;
}

interface NpmDownloadDay {
  downloads: number;
  day: string;
}

interface NpmDownloadResponse {
  start: string;
  end: string;
  package: string;
  downloads: NpmDownloadDay[];
}

/** Format download count: subtract 5, then compact above 1000. */
function formatDownloads(raw: number): string {
  const count = Math.max(0, raw - 5);
  if (count >= 1000) {
    // Floor to nearest 100 for display (e.g. 1250 → "1.2k+")
    const floored = Math.floor(count / 100) / 10;
    return `${floored}k+`;
  }
  return `${count}+`;
}

/** Fetch registry stats. Returns null on any failure. */
async function fetchRegistryStats(): Promise<RegistryStats | null> {
  try {
    const res = await fetch(
      "https://neonbladeui-registry.vercel.app/registry.json",
      { next: { revalidate: 3600 } }, // cache 1 hour
    );
    if (!res.ok) return null;
    const data = await res.json();
    const stats = data?.stats;
    if (
      typeof stats?.totalComponents !== "number" ||
      typeof stats?.totalTemplates !== "number"
    ) {
      return null;
    }
    return stats as RegistryStats;
  } catch {
    return null;
  }
}

async function fetchNpmDownloads(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.npmjs.org/downloads/range/2026-03-01:2030-01-01/neonblade",
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data: NpmDownloadResponse = await res.json();
    if (!Array.isArray(data?.downloads)) return null;
    const total = data.downloads.reduce(
      (sum, d) => sum + (d.downloads ?? 0),
      0,
    );
    return total;
  } catch {
    return null;
  }
}

interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
  glowColor: string; // css accent color
}

export async function StatsSection() {
  const [registryStats, npmTotal] = await Promise.all([
    fetchRegistryStats(),
    fetchNpmDownloads(),
  ]);

  const componentCount =
    registryStats !== null
      ? `${Math.max(0, registryStats.totalComponents - 1)}+`
      : "15+";

  const templateCount =
    registryStats !== null ? `${registryStats.totalTemplates}` : "1";

  const downloadCount = npmTotal !== null ? formatDownloads(npmTotal) : "—";

  const stats: StatItem[] = [
    {
      icon: Code2,
      value: componentCount,
      label: "Components",
      glowColor: "#00f3ff",
    },
    {
      icon: LayoutTemplate,
      value: templateCount,
      label: "Templates",
      glowColor: "#ff00ff",
    },
    {
      icon: Download,
      value: downloadCount,
      label: "npm Downloads",
      glowColor: "#39ff14",
    },
    {
      icon: GitFork,
      value: "Free",
      label: "& Open Source",
      glowColor: "#00f3ff",
    },
    {
      icon: Heart,
      value: "Loved",
      label: "by React devs",
      glowColor: "#ff00ff",
    },
  ];

  return (
    <section className="relative border-t border-white/5 bg-black overflow-hidden">
      {/* Subtle radial backdrop */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: StatItem }) {
  const Icon = stat.icon;
  return (
    <NeonGlowCornerCutCard
      colorA={stat.glowColor}
      colorB={stat.glowColor}
      size="sm"
      corner="bottom-right"
      hoverEffect="pulse"
      glowIntensity="high"
      className="h-full"
    >
      <div className="flex flex-col items-center justify-center gap-3 py-4 text-center">
        {/* Icon */}
        <div
          className="w-9 h-9 flex items-center justify-center border border-white/10 bg-white/[0.04]"
          style={{ boxShadow: `0 0 10px ${stat.glowColor}33` }}
        >
          <Icon
            className="w-4 h-4"
            style={{
              color: stat.glowColor,
              filter: `drop-shadow(0 0 4px ${stat.glowColor}99)`,
            }}
          />
        </div>

        {/* Value */}
        <span
          className="font-orbitron font-bold text-2xl sm:text-3xl tracking-tight"
          style={{
            color: stat.glowColor,
            textShadow: `0 0 18px ${stat.glowColor}66`,
          }}
        >
          {stat.value}
        </span>

        {/* Label */}
        <span className="text-white/65 text-[10px] font-orbitron uppercase tracking-widest leading-tight">
          {stat.label}
        </span>
      </div>
    </NeonGlowCornerCutCard>
  );
}
