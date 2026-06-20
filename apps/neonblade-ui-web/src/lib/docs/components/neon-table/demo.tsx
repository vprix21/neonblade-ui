"use client";
import { useState, useEffect } from "react";
import NeonTable, { NTColumn } from "@/lib/components/ui/tables/NeonTable";

// ── Threat log data ────────────────────────────────────────────────────────────

type Threat = {
  id: string;
  source: string;
  type: string;
  severity: string;
  status: string;
  timestamp: string;
};

const threats: Threat[] = [
  {
    id: "THR-001",
    source: "192.168.4.22",
    type: "Port Scan",
    severity: "LOW",
    status: "BLOCKED",
    timestamp: "02:14:33",
  },
  {
    id: "THR-002",
    source: "10.0.0.87",
    type: "SQL Injection",
    severity: "CRITICAL",
    status: "ACTIVE",
    timestamp: "02:19:11",
  },
  {
    id: "THR-003",
    source: "203.0.113.9",
    type: "DDoS Attempt",
    severity: "HIGH",
    status: "MITIGATING",
    timestamp: "02:21:05",
  },
  {
    id: "THR-004",
    source: "172.16.0.3",
    type: "Brute Force",
    severity: "MEDIUM",
    status: "BLOCKED",
    timestamp: "02:22:48",
  },
  {
    id: "THR-005",
    source: "198.51.100.14",
    type: "XSS Payload",
    severity: "MEDIUM",
    status: "BLOCKED",
    timestamp: "02:23:17",
  },
  {
    id: "THR-006",
    source: "10.10.0.44",
    type: "Zero-Day Exploit",
    severity: "CRITICAL",
    status: "ACTIVE",
    timestamp: "02:25:01",
  },
  {
    id: "THR-007",
    source: "192.0.2.77",
    type: "Malware Drop",
    severity: "HIGH",
    status: "QUARANTINE",
    timestamp: "02:27:44",
  },
  {
    id: "THR-008",
    source: "10.0.0.12",
    type: "Token Hijack",
    severity: "HIGH",
    status: "ACTIVE",
    timestamp: "02:29:59",
  },
];

const SEV_COLOR: Record<string, string> = {
  CRITICAL: "#ff00ff",
  HIGH: "#ff4444",
  MEDIUM: "#ffb800",
  LOW: "#39ff14",
};
const STATUS_COLOR: Record<string, string> = {
  ACTIVE: "#ff4444",
  MITIGATING: "#ffb800",
  QUARANTINE: "#ff00ff",
  BLOCKED: "rgba(255,255,255,0.3)",
};

const threatCols: NTColumn<Threat>[] = [
  { key: "id", header: "ID", width: "80px", sortable: false },
  { key: "source", header: "Source IP", sortable: true },
  { key: "type", header: "Attack Type", sortable: true },
  {
    key: "severity",
    header: "Severity",
    sortable: true,
    render: (v) => (
      <span
        style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: 9,
          letterSpacing: "0.12em",
          color: SEV_COLOR[v as string] ?? "#fff",
          filter: `drop-shadow(0 0 4px ${SEV_COLOR[v as string] ?? "#fff"})`,
        }}
      >
        ■ {String(v)}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (v) => (
      <span
        style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: 9,
          letterSpacing: "0.12em",
          color: STATUS_COLOR[v as string] ?? "#fff",
        }}
      >
        ● {String(v)}
      </span>
    ),
  },
  { key: "timestamp", header: "Time", align: "right", sortable: true },
];

// ── Agent roster data ─────────────────────────────────────────────────────────

type Agent = {
  id: number;
  name: string;
  role: string;
  status: string;
  score: number;
  joined: string;
};

const agents: Agent[] = [
  {
    id: 1,
    name: "Kira Nakamura",
    role: "Engineer",
    status: "ONLINE",
    score: 9420,
    joined: "2023-01-14",
  },
  {
    id: 2,
    name: "Zane Holloway",
    role: "Analyst",
    status: "ONLINE",
    score: 7810,
    joined: "2023-03-22",
  },
  {
    id: 3,
    name: "Lyra Chen",
    role: "Designer",
    status: "OFFLINE",
    score: 6540,
    joined: "2022-11-08",
  },
  {
    id: 4,
    name: "Axel Reeves",
    role: "Engineer",
    status: "ONLINE",
    score: 8990,
    joined: "2023-06-01",
  },
  {
    id: 5,
    name: "Nova Castillo",
    role: "Security",
    status: "SUSPENDED",
    score: 3210,
    joined: "2021-09-15",
  },
  {
    id: 6,
    name: "Orion Walsh",
    role: "DevOps",
    status: "ONLINE",
    score: 8120,
    joined: "2022-05-30",
  },
  {
    id: 7,
    name: "Sable Torres",
    role: "Analyst",
    status: "OFFLINE",
    score: 5670,
    joined: "2023-08-19",
  },
  {
    id: 8,
    name: "Ryn Elara",
    role: "Engineer",
    status: "ONLINE",
    score: 9870,
    joined: "2021-12-01",
  },
];

const AGENT_STATUS_COLOR: Record<string, string> = {
  ONLINE: "#39ff14",
  OFFLINE: "rgba(255,255,255,0.35)",
  SUSPENDED: "#ff00ff",
};

const agentCols: NTColumn<Agent>[] = [
  { key: "id", header: "#", width: "40px", align: "center", sortable: false },
  { key: "name", header: "Agent", sortable: true },
  { key: "role", header: "Role", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (v) => (
      <span
        style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: 9,
          letterSpacing: "0.15em",
          color: AGENT_STATUS_COLOR[v as string] ?? "#fff",
          filter: `drop-shadow(0 0 4px ${AGENT_STATUS_COLOR[v as string] ?? "#fff"})`,
        }}
      >
        ● {String(v)}
      </span>
    ),
  },
  {
    key: "score",
    header: "Score",
    sortable: true,
    align: "right",
    render: (v) => (
      <span
        style={{
          color: "#00f3ff",
          fontFamily: "var(--font-orbitron)",
          fontSize: 12,
          filter: "drop-shadow(0 0 5px #00f3ff)",
        }}
      >
        {Number(v).toLocaleString()}
      </span>
    ),
  },
  { key: "joined", header: "Since", align: "right", sortable: true },
];

// ── Demo ──────────────────────────────────────────────────────────────────────

export default function NeonTableDemo() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 36,
        width: "100%",
      }}
    >
      {/* USE CASE — Threat Log */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: 10,
            color: "rgba(255,0,0,0.6)",
            letterSpacing: "0.15em",
            marginBottom: 12,
          }}
        >
          USE CASE — THREAT MONITOR
        </p>
        <NeonTable
          data={threats}
          columns={threatCols}
          title="Active Threat Log"
          color="pink"
          pageSize={5}
          corners={false}
          rowHover
        />
      </div>

      {/* USE CASE — Agent Roster */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: 10,
            color: "rgba(0,243,255,0.5)",
            letterSpacing: "0.15em",
            marginBottom: 12,
          }}
        >
          USE CASE — AGENT ROSTER
        </p>
        <NeonTable
          data={agents}
          columns={agentCols}
          title="Field Operative Registry"
          color="cyan"
          pageSize={5}
          rowHover
          striped
        />
      </div>

      {/* LOADING */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: 10,
            color: "rgba(57,255,20,0.5)",
            letterSpacing: "0.15em",
            marginBottom: 12,
          }}
        >
          LOADING STATE
        </p>
        <NeonTable
          data={agents}
          columns={agentCols}
          title="Fetching Operative Data..."
          color="green"
          loading={isLoading}
          loadingRows={5}
        />
      </div>

      {/* COMPACT */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: 10,
            color: "rgba(255,184,0,0.6)",
            letterSpacing: "0.15em",
            marginBottom: 12,
          }}
        >
          COMPACT
        </p>
        <NeonTable
          data={threats.slice(0, 4)}
          columns={threatCols}
          color="#ffb800"
          compact
          rowHover
        />
      </div>
    </div>
  );
}
