const usage = `import NeonSparkline from "@/components/neonblade-ui/neon-sparkline";

const data = [
  { value: 10 }, { value: 14 }, { value: 11 }, { value: 18 },
  { value: 20 }, { value: 17 }, { value: 25 }, { value: 30 },
];

// Basic inline sparkline
export default function App() {
  return <NeonSparkline data={data} color="cyan" width={120} height={40} />;
}

// Embedded in a KPI card
export function KPICard() {
  return (
    <div className="border border-white/10 bg-black/50 px-4 pt-4 pb-0 rounded-sm">
      <p className="text-xs text-white/40 font-mono mb-1">REVENUE</p>
      <p className="text-2xl text-white font-bold mb-2">$48,290</p>
      <div className="-mx-4">
        <NeonSparkline
          data={data}
          color="cyan"
          width="100%"
          height={44}
          tooltip={false}
        />
      </div>
    </div>
  );
}`;

export default usage;
