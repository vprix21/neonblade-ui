import NeonDonutChart from "../../../components/ui/charts/NeonDonutChart";

const trafficData = [
  { name: "Direct", value: 4200 },
  { name: "Organic", value: 3100 },
  { name: "Referral", value: 1800 },
  { name: "Social", value: 920 },
  { name: "Email", value: 560 },
];

const statusData = [
  { name: "Online", value: 87, color: "green" as const },
  { name: "Idle", value: 9, color: "cyan" as const },
  { name: "Offline", value: 4, color: "pink" as const },
];

const budgetData = [
  { name: "Engineering", value: 52, color: "#00f3ff" },
  { name: "Marketing", value: 23, color: "#ff00ff" },
  { name: "Operations", value: 15, color: "#39ff14" },
  { name: "R&D", value: 10, color: "#a855f7" },
];

export default function NeonDonutChartDemo() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Auto palette + center label */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Traffic sources — auto palette, center label
        </p>
        <NeonDonutChart data={trafficData} height={280} legend />
      </div>

      {/* Preset colors — system status */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          System status — preset colors
        </p>
        <NeonDonutChart
          data={statusData}
          color="green"
          height={240}
          glowIntensity="high"
          innerRadius="70%"
          outerRadius="90%"
          legend
        />
      </div>

      {/* Custom hex colors */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Budget allocation — custom colors, pink accent
        </p>
        <NeonDonutChart
          data={budgetData}
          color="pink"
          height={260}
          paddingAngle={3}
          cornerRadius={6}
          legend
        />
      </div>
    </div>
  );
}
