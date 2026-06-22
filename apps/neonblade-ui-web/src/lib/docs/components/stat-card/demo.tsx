import { Activity, Cpu, DollarSign, TrendingUp, Wifi, Zap } from "lucide-react";
import StatCard from "../../../components/ui/charts/StatCard";

const revenueData = [
  { value: 28 },
  { value: 35 },
  { value: 30 },
  { value: 42 },
  { value: 38 },
  { value: 50 },
  { value: 48 },
];
const usersData = [
  { value: 120 },
  { value: 180 },
  { value: 160 },
  { value: 220 },
  { value: 200 },
  { value: 270 },
  { value: 310 },
];
const bounceData = [
  { value: 40 },
  { value: 38 },
  { value: 35 },
  { value: 30 },
  { value: 28 },
  { value: 24 },
  { value: 22 },
];
const cpuData = [
  { value: 55 },
  { value: 72 },
  { value: 61 },
  { value: 85 },
  { value: 78 },
  { value: 91 },
  { value: 68 },
];

export default function StatCardDemo() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Grid of KPI cards */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          KPI grid — all colors + trends
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            label="Total Revenue"
            value="$48,290"
            trend="up"
            change="+12.4%"
            changeLabel="vs last month"
            color="cyan"
            sparkData={revenueData}
            icon={<DollarSign size={16} />}
          />
          <StatCard
            label="Active Users"
            value="12,834"
            trend="up"
            change="+8.7%"
            changeLabel="vs last week"
            color="green"
            sparkData={usersData}
            icon={<Activity size={16} />}
          />
          <StatCard
            label="Bounce Rate"
            value="24.7%"
            trend="down"
            change="-3.1%"
            changeLabel="vs yesterday"
            color="pink"
            sparkData={bounceData}
            icon={<TrendingUp size={16} />}
          />
          <StatCard
            label="CPU Load"
            value="68%"
            unit="avg"
            trend="neutral"
            change="stable"
            color="cyan"
            sparkData={cpuData}
            icon={<Cpu size={16} />}
          />
        </div>
      </div>

      {/* Without sparklines */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Without sparklines
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Uptime"
            value="99.98%"
            trend="up"
            change="+0.02%"
            color="green"
            icon={<Wifi size={16} />}
          />
          <StatCard
            label="Latency"
            value="14ms"
            trend="down"
            change="-6ms"
            color="cyan"
            icon={<Zap size={16} />}
          />
          <StatCard
            label="Errors"
            value="0.03%"
            trend="up"
            change="+0.01%"
            color="pink"
          />
        </div>
      </div>

      {/* Glow intensities */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Glow intensity
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {(["none", "low", "medium", "high"] as const).map((g) => (
            <StatCard
              key={g}
              label={g}
              value="99.9%"
              trend="up"
              change="+2.1%"
              color="cyan"
              glowIntensity={g}
              sparkData={revenueData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
