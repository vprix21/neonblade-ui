const usage = `import StatCard from "@/components/neonblade-ui/stat-card";
import { Activity, DollarSign } from "lucide-react";

const spark = [
  { value: 28 }, { value: 35 }, { value: 30 },
  { value: 42 }, { value: 38 }, { value: 50 },
];

// Full KPI card with sparkline
export default function App() {
  return (
    <StatCard
      label="Total Revenue"
      value="$48,290"
      trend="up"
      change="+12.4%"
      changeLabel="vs last month"
      color="cyan"
      sparkData={spark}
      icon={<DollarSign size={16} />}
    />
  );
}

// Simple — no sparkline
export function SimpleMetric() {
  return (
    <StatCard
      label="Active Users"
      value={12834}
      trend="up"
      change="+8.7%"
      color="green"
      icon={<Activity size={16} />}
    />
  );
}`;

export default usage;
