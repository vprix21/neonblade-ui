const usage = `import NeonDonutChart from "@/components/neonblade-ui/neon-donut-chart";

const data = [
  { name: "Direct",  value: 4200 },
  { name: "Organic", value: 3100 },
  { name: "Referral",value: 1800 },
  { name: "Social",  value: 920  },
];

// With center label + legend (default colors)
export default function App() {
  return <NeonDonutChart data={data} centerLabel legend height={280} />;
}

// Named color per segment
const statusData = [
  { name: "Online",  value: 87, color: "green" },
  { name: "Idle",    value: 9,  color: "cyan"  },
  { name: "Offline", value: 4,  color: "pink"  },
];

export function Status() {
  return (
    <NeonDonutChart
      data={statusData}
      color="green"
      glowIntensity="high"
      innerRadius="70%"
      outerRadius="90%"
      legend
    />
  );
}`;

export default usage;
