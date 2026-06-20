"use client";
import { useEffect, useState } from "react";
import ProgressBar from "@/lib/components/ui/elements/ProgressBar";

function useAnimatedValue(target: number, duration = 1200): number {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const from = 0;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCurrent(Math.round(from + (target - from) * progress));
      if (progress < 1) requestAnimationFrame(raf);
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
      const t = ((ts - start) % (period * 2)) / period; // 0–2
      const norm = t <= 1 ? t : 2 - t; // triangle wave 0–1–0
      setValue(Math.round(min + (max - min) * norm));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [min, max, period]);
  return value;
}

export default function ProgressBarDemo() {
  const solid1 = useAnimatedValue(73, 1400);
  const solid2 = useAnimatedValue(45, 1700);
  const solid3 = useAnimatedValue(88, 1100);
  const seg1 = useAnimatedValue(60, 1500);
  const seg2 = useAnimatedValue(80, 1300);
  const striped = usePingPong(10, 95, 2800);
  const pulse = usePingPong(20, 90, 3400);
  const sizes = useAnimatedValue(65, 1600);

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: 10,
            color: "rgba(0,243,255,0.5)",
            letterSpacing: "0.15em",
            marginBottom: 4,
          }}
        >
          SOLID
        </p>
        <ProgressBar value={solid1} color="cyan" size="md" showLabel glow />
        <ProgressBar value={solid2} color="pink" size="md" showLabel glow />
        <ProgressBar value={solid3} color="green" size="md" showLabel glow />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: 10,
            color: "rgba(255,0,255,0.5)",
            letterSpacing: "0.15em",
            marginBottom: 4,
          }}
        >
          SEGMENTED
        </p>
        <ProgressBar
          value={seg1}
          color="cyan"
          size="lg"
          variant="segmented"
          showLabel
          glow
        />
        <ProgressBar
          value={seg2}
          color="pink"
          size="lg"
          variant="segmented"
          showLabel
          glow
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: 10,
            color: "rgba(57,255,20,0.5)",
            letterSpacing: "0.15em",
            marginBottom: 4,
          }}
        >
          STRIPED + PULSE
        </p>
        <ProgressBar
          value={striped}
          color="cyan"
          size="md"
          variant="striped"
          showLabel
          glow
        />
        <ProgressBar
          value={pulse}
          color="pink"
          size="md"
          variant="pulse"
          showLabel
          glow
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: "100%",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: 10,
            color: "rgba(0,243,255,0.5)",
            letterSpacing: "0.15em",
            marginBottom: 4,
          }}
        >
          SIZES
        </p>
        <ProgressBar value={sizes} color="cyan" size="xs" />
        <ProgressBar value={sizes} color="cyan" size="sm" />
        <ProgressBar value={sizes} color="cyan" size="md" />
        <ProgressBar value={sizes} color="cyan" size="lg" />
      </div>
    </div>
  );
}
