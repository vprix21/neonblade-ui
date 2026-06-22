"use client";
import { useEffect, useState } from "react";
import CircularProgress from "@/lib/components/ui/progress/CircularProgress";

function useAnimatedValue(target: number, duration = 1400): number {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCurrent(Math.round(target * p));
      if (p < 1) requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return current;
}

function usePingPong(min: number, max: number, period = 3000): number {
  const [value, setValue] = useState(min);
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = ((ts - start) % (period * 2)) / period;
      const norm = t <= 1 ? t : 2 - t;
      setValue(Math.round(min + (max - min) * norm));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [min, max, period]);
  return value;
}

const SectionLabel = ({
  text,
  color = "rgba(0,243,255,0.5)",
}: {
  text: string;
  color?: string;
}) => (
  <p
    style={{
      fontFamily: "var(--font-orbitron)",
      fontSize: 10,
      color,
      letterSpacing: "0.15em",
      marginBottom: 16,
    }}
  >
    {text}
  </p>
);

export default function CircularProgressDemo() {
  const cpu = useAnimatedValue(73, 1400);
  const mem = useAnimatedValue(58, 1700);
  const disk = useAnimatedValue(41, 1200);
  const net = useAnimatedValue(100, 1600);
  const live = usePingPong(10, 95, 2800);

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
      {/* LIVE LOADING EXAMPLE */}
      <div>
        <SectionLabel text="LIVE LOADING" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <CircularProgress
            value={live}
            color="cyan"
            size="xl"
            subLabel="SIGNAL"
            glowIntensity="high"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <p
              style={{
                fontFamily: "var(--font-orbitron)",
                fontSize: 11,
                color: "#fff",
                letterSpacing: "0.08em",
              }}
            >
              Real-time value
            </p>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Animating between 10 – 95%
            </p>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Smooth transition on every change
            </p>
          </div>
        </div>
      </div>

      {/* SYSTEM MONITOR USE CASE */}
      <div>
        <SectionLabel
          text="USE CASE — SYSTEM MONITOR"
          color="rgba(255,0,255,0.5)"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          <CircularProgress value={cpu} color="cyan" size="lg" subLabel="CPU" />
          <CircularProgress value={mem} color="pink" size="lg" subLabel="MEM" />
          <CircularProgress
            value={disk}
            color="green"
            size="lg"
            subLabel="DISK"
          />
          <CircularProgress
            value={net}
            color="#a855f7"
            size="lg"
            subLabel="NET"
          />
        </div>
      </div>

      {/* SIZES */}
      <div>
        <SectionLabel text="SIZES" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          <CircularProgress value={65} color="cyan" size="sm" subLabel="SM" />
          <CircularProgress value={65} color="cyan" size="md" subLabel="MD" />
          <CircularProgress value={65} color="cyan" size="lg" subLabel="LG" />
          <CircularProgress value={65} color="cyan" size="xl" subLabel="XL" />
        </div>
      </div>

      {/* GLOW */}
      <div>
        <SectionLabel text="GLOW INTENSITY" color="rgba(57,255,20,0.5)" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          <CircularProgress
            value={70}
            color="cyan"
            size="md"
            glowIntensity="none"
            subLabel="NONE"
          />
          <CircularProgress
            value={70}
            color="cyan"
            size="md"
            glowIntensity="low"
            subLabel="LOW"
          />
          <CircularProgress
            value={70}
            color="cyan"
            size="md"
            glowIntensity="medium"
            subLabel="MED"
          />
          <CircularProgress
            value={70}
            color="cyan"
            size="md"
            glowIntensity="high"
            subLabel="HIGH"
          />
        </div>
      </div>
    </div>
  );
}
