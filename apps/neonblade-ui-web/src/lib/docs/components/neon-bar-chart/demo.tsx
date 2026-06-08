import NeonBarChart from "../../../components/ui/charts/NeonBarChart";

const trafficData = [
  { name: "Mon", visits: 1200 },
  { name: "Tue", visits: 1900 },
  { name: "Wed", visits: 1400 },
  { name: "Thu", visits: 2300 },
  { name: "Fri", visits: 1800 },
  { name: "Sat", visits: 3100 },
  { name: "Sun", visits: 2700 },
];

const multiData = [
  { name: "Q1", revenue: 42000, costs: 28000 },
  { name: "Q2", revenue: 55000, costs: 31000 },
  { name: "Q3", revenue: 48000, costs: 26000 },
  { name: "Q4", revenue: 71000, costs: 39000 },
];

const categoryData = [
  { name: "React", count: 840 },
  { name: "Vue", count: 420 },
  { name: "Angular", count: 310 },
  { name: "Svelte", count: 290 },
  { name: "Next.js", count: 760 },
];

export default function NeonBarChartDemo() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Default vertical bars */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Vertical bars — cyan (default)
        </p>
        <NeonBarChart
          data={trafficData}
          dataKey="visits"
          color="cyan"
          height={220}
        />
      </div>

      {/* Multi-color single series */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Multi-color — auto neon palette
        </p>
        <NeonBarChart
          data={categoryData}
          dataKey="count"
          color="pink"
          height={220}
          layout="horizontal"
        />
      </div>

      {/* Multi-series */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Multi-series — revenue vs costs
        </p>
        <NeonBarChart
          data={multiData}
          series={[
            { dataKey: "revenue", label: "Revenue", color: "cyan" },
            { dataKey: "costs", label: "Costs", color: "pink" },
          ]}
          legend
          height={220}
        />
      </div>

      {/* Horizontal bars — green */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Horizontal bars — green, high glow
        </p>
        <NeonBarChart
          data={categoryData}
          dataKey="count"
          xAxisKey="name"
          layout="horizontal"
          color="green"
          glowIntensity="high"
          height={240}
        />
      </div>
    </div>
  );
}
