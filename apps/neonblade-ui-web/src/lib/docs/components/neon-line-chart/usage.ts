const usage = `import NeonLineChart from "@/components/neonblade-ui/neon-line-chart";

const data = [
  { name: "Mon", value: 820 },
  { name: "Tue", value: 1340 },
  { name: "Wed", value: 980 },
  { name: "Thu", value: 1620 },
  { name: "Fri", value: 1190 },
  { name: "Sat", value: 2040 },
  { name: "Sun", value: 1760 },
];

// Single series
export default function App() {
  return <NeonLineChart data={data} dataKey="value" color="cyan" height={260} />;
}

// Multi-series
const multiData = [
  { name: "Jan", requests: 4200, errors: 140 },
  { name: "Feb", requests: 3800, errors: 90 },
];

export function MultiLine() {
  return (
    <NeonLineChart
      data={multiData}
      series={[
        { dataKey: "requests", label: "Requests", color: "cyan" },
        { dataKey: "errors",   label: "Errors",   color: "pink" },
      ]}
      legend
    />
  );
}`;

export default usage;
