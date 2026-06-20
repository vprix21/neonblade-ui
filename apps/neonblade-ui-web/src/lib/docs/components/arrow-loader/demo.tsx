"use client";
import ArrowLoader from "@/lib/components/ui/elements/ArrowLoader";

function UseCaseCard({
  title,
  subtitle,
  status,
  color,
  height = 10,
  arrowSize = 10,
  gap = 8,
  thickness = 2.5,
  speed = 450,
}: {
  title: string;
  subtitle: string;
  status: string;
  color: string;
  height?: number;
  arrowSize?: number;
  gap?: number;
  thickness?: number;
  speed?: number;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 4,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: 11,
            color: "#fff",
            letterSpacing: "0.08em",
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: 9,
            color,
            letterSpacing: "0.15em",
            filter: `drop-shadow(0 0 4px ${color})`,
          }}
        >
          {status}
        </span>
      </div>
      <ArrowLoader
        color={color}
        height={height}
        arrowSize={arrowSize}
        gap={gap}
        thickness={thickness}
        speed={speed}
      />
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          color: "rgba(255,255,255,0.3)",
        }}
      >
        {subtitle}
      </span>
    </div>
  );
}

export default function ArrowLoaderDemo() {
  return (
    <div
      style={{
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 28,
        width: "100%",
      }}
    >
      {/* COLORS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
        }}
      >
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          COLORS
        </p>
        <ArrowLoader color="cyan" height={20} />
        <ArrowLoader color="pink" height={20} />
        <ArrowLoader color="#ffb800" height={20} />
      </div>

      {/* DENSITY */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
        }}
      >
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          DENSITY
        </p>
        <ArrowLoader color="cyan" height={10} arrowSize={6} gap={4} />
        <ArrowLoader color="cyan" height={10} arrowSize={20} gap={16} />
      </div>

      {/* THICKNESS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
        }}
      >
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          THICKNESS
        </p>
        <ArrowLoader color="pink" height={10} thickness={1.5} />
        <ArrowLoader color="pink" height={10} thickness={4} />
      </div>

      {/* SPEED */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
        }}
      >
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          SPEED
        </p>
        <ArrowLoader color="#ffb800" height={10} speed={200} />
        <ArrowLoader color="#ffb800" height={10} speed={1000} />
      </div>

      {/* USE CASE */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
        }}
      >
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          USE CASE
        </p>
        <UseCaseCard
          title="Syncing neural index..."
          subtitle="Connecting to remote cluster - node 7 of 12"
          status="SYNCING"
          color="#00f3ff"
          height={15}
          arrowSize={12}
          gap={9}
          speed={400}
        />
        <UseCaseCard
          title="Awaiting authorization"
          subtitle="Biometric handshake in progress..."
          status="PENDING"
          color="#ffb800"
          height={15}
          arrowSize={10}
          gap={14}
          thickness={3}
          speed={600}
        />
      </div>
    </div>
  );
}
