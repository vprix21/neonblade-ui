const usage = `import NeonTable, { NTColumn } from "@/components/neonblade-ui/neon-table";

type Row = { id: number; name: string; role: string; score: number };

const data: Row[] = [
  { id: 1, name: "Kira Nakamura", role: "Engineer", score: 9420 },
  { id: 2, name: "Zane Holloway", role: "Analyst",  score: 7810 },
  { id: 3, name: "Lyra Chen",     role: "Designer", score: 6540 },
];

const columns: NTColumn<Row>[] = [
  { key: "id",    header: "#",     width: "48px", align: "center" },
  { key: "name",  header: "Agent", sortable: true },
  { key: "role",  header: "Role",  sortable: true },
  { key: "score", header: "Score", sortable: true, align: "right",
    render: (v) => <span style={{ color: "#00f3ff" }}>{Number(v).toLocaleString()}</span> },
];

export default function App() {
  return <NeonTable data={data} columns={columns} color="cyan" pageSize={5} rowHover striped />;
}`;

export default usage;
