import NeonLineChart from "../../../components/ui/charts/NeonLineChart";

// ── Sample data ────────────────────────────────────────────────────────────

const weekData = [
  { name: "Mon", value: 820 },
  { name: "Tue", value: 1340 },
  { name: "Wed", value: 980 },
  { name: "Thu", value: 1620 },
  { name: "Fri", value: 1190 },
  { name: "Sat", value: 2040 },
  { name: "Sun", value: 1760 },
];

const multiData = [
  { name: "Jan", requests: 4200, errors: 140 },
  { name: "Feb", requests: 3800, errors: 90 },
  { name: "Mar", requests: 5100, errors: 210 },
  { name: "Apr", requests: 4700, errors: 60 },
  { name: "May", requests: 6200, errors: 175 },
  { name: "Jun", requests: 5800, errors: 130 },
];

const stepData = [
  { name: "00:00", cpu: 18 },
  { name: "04:00", cpu: 12 },
  { name: "08:00", cpu: 54 },
  { name: "12:00", cpu: 78 },
  { name: "16:00", cpu: 91 },
  { name: "20:00", cpu: 63 },
  { name: "24:00", cpu: 35 },
];

// ── Demo ───────────────────────────────────────────────────────────────────

export default function NeonLineChartDemo() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Single series — cyan area */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Single series — area (default)
        </p>
        <NeonLineChart
          data={weekData}
          dataKey="value"
          color="cyan"
          height={220}
        />
      </div>

      {/* Multi series */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Multi-series — cyan + pink
        </p>
        <NeonLineChart
          data={multiData}
          series={[
            { dataKey: "requests", label: "Requests", color: "cyan" },
            { dataKey: "errors", label: "Errors", color: "pink" },
          ]}
          legend
          height={220}
        />
      </div>

      {/* Step / no area / green */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Step curve — line only, high glow
        </p>
        <NeonLineChart
          data={stepData}
          dataKey="cpu"
          color="green"
          area={false}
          curve="step"
          glowIntensity="high"
          strokeWidth={2}
          dots
          height={200}
        />
      </div>

      {/* Minimal — no axes */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Minimal — no axes, pink
        </p>
        <NeonLineChart
          data={weekData}
          dataKey="value"
          color="pink"
          showXAxis={false}
          showYAxis={false}
          grid={false}
          glowIntensity="high"
          height={120}
        />
      </div>
    </div>
  );
}
