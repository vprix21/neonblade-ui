"use client";
import { useState } from "react";
import NeonCheckbox from "@/lib/components/ui/inputs/NeonCheckbox";

function TaskRow({ label, sublabel, color, checked, onChange }: {
  label: string; sublabel: string; color: string;
  checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 14px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 4,
      gap: 12,
    }}>
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: "var(--font-orbitron)", fontSize: 10, letterSpacing: "0.06em",
          color: checked ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
          textDecoration: checked ? "line-through" : "none",
          marginBottom: 2,
          transition: "color 0.2s, text-decoration 0.2s",
        }}>{label}</p>
        <p style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{sublabel}</p>
      </div>
      <NeonCheckbox checked={checked} onChange={onChange} color={color} size="md" />
    </div>
  );
}

export default function NeonCheckboxDemo() {
  const [t1, setT1] = useState(true);
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(true);
  const [t4, setT4] = useState(false);

  return (
    <div style={{ padding: "24px 16px", display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>

      {/* USE CASE */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(0,243,255,0.5)", letterSpacing: "0.15em", marginBottom: 12 }}>USE CASE — TASK LIST</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <TaskRow label="CALIBRATE TARGETING ARRAY"   sublabel="Subsystem: WEAPONS"   color="#00f3ff" checked={t1} onChange={setT1} />
          <TaskRow label="SYNC NEURAL HANDSHAKE"       sublabel="Subsystem: INTERFACE" color="#ff00ff" checked={t2} onChange={setT2} />
          <TaskRow label="DEPLOY FIREWALL PATCH v4.7"  sublabel="Subsystem: SECURITY"  color="#39ff14" checked={t3} onChange={setT3} />
          <TaskRow label="INITIATE CORE DIAGNOSTICS"   sublabel="Subsystem: POWER"     color="#ffb800" checked={t4} onChange={setT4} />
        </div>
      </div>

      {/* VARIANTS */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(255,0,255,0.5)", letterSpacing: "0.15em", marginBottom: 14 }}>VARIANTS</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <NeonCheckbox label="Square (default)"  variant="square"      defaultChecked color="cyan" />
          <NeonCheckbox label="Corner Cut"        variant="corner-cut"  defaultChecked color="cyan" />
        </div>
      </div>

      {/* COLORS */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(57,255,20,0.5)", letterSpacing: "0.15em", marginBottom: 14 }}>COLORS</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <NeonCheckbox label="Cyan"    color="cyan"    defaultChecked />
            <NeonCheckbox label="Pink"    color="pink"    defaultChecked />
            <NeonCheckbox label="Green"   color="green"   defaultChecked />
            <NeonCheckbox label="Amber"   color="#ffb800" defaultChecked />
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <NeonCheckbox label="Cyan"    color="cyan"    defaultChecked variant="corner-cut" />
            <NeonCheckbox label="Pink"    color="pink"    defaultChecked variant="corner-cut" />
            <NeonCheckbox label="Green"   color="green"   defaultChecked variant="corner-cut" />
            <NeonCheckbox label="Amber"   color="#ffb800" defaultChecked variant="corner-cut" />
          </div>
        </div>
      </div>

      {/* SIZES */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(0,243,255,0.5)", letterSpacing: "0.15em", marginBottom: 14 }}>SIZES</p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <NeonCheckbox label="Small"  size="sm" defaultChecked color="cyan" />
          <NeonCheckbox label="Medium" size="md" defaultChecked color="cyan" />
          <NeonCheckbox label="Large"  size="lg" defaultChecked color="cyan" />
        </div>
      </div>

      {/* STATES */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(255,0,255,0.5)", letterSpacing: "0.15em", marginBottom: 14 }}>STATES</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          <NeonCheckbox label="Checked"       defaultChecked color="cyan" />
          <NeonCheckbox label="Unchecked"     color="cyan" />
          <NeonCheckbox label="Indeterminate" indeterminate color="cyan" />
          <NeonCheckbox label="Disabled on"   defaultChecked disabled color="cyan" />
          <NeonCheckbox label="Disabled off"  disabled color="cyan" />
        </div>
      </div>

    </div>
  );
}
