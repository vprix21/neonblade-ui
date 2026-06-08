const usage = `import NeonBarChart from "@/components/neonblade-ui/neon-bar-chart";

const data = [
  { name: "Mon", visits: 1200 },
  { name: "Tue", visits: 1900 },
  { name: "Wed", visits: 1400 },
  { name: "Thu", visits: 2300 },
];

// Vertical bars (default)
export default function App() {
  return <NeonBarChart data={data} dataKey="visits" color="cyan" height={260} />;
}

// Multi-color single series
export function MultiColor() {
  return <NeonBarChart data={data} dataKey="visits" multiColor height={260} />;
}

// Horizontal layout
export function Horizontal() {
  return (
    <NeonBarChart
      data={data}
      dataKey="visits"
      xAxisKey="name"
      layout="horizontal"
      color="green"
    />
  );
}`;

export default usage;
