"use client";
import { useState } from "react";
import NeonToggle from "@/lib/components/ui/inputs/NeonToggle";

function SettingsRow({ label, sublabel, color, checked, onChange }: {
  label: string; sublabel: string; color: string;
  checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 16px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 4,
    }}>
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 11, color: "#fff", letterSpacing: "0.06em", marginBottom: 2 }}>{label}</p>
        <p style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{sublabel}</p>
      </div>
      <NeonToggle checked={checked} onChange={onChange} color={color} size="md" />
    </div>
  );
}

export default function NeonToggleDemo() {
  const [neural,  setNeural]  = useState(true);
  const [shield,  setShield]  = useState(false);
  const [uplink,  setUplink]  = useState(true);
  const [stealth, setStealth] = useState(false);

  return (
    <div style={{ padding: "24px 16px", display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>

      {/* USE CASE */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(0,243,255,0.5)", letterSpacing: "0.15em", marginBottom: 12 }}>USE CASE</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SettingsRow label="Neural Interface" sublabel="Enable direct cortex link" color="#00f3ff" checked={neural} onChange={setNeural} />
          <SettingsRow label="Cyber Shield"     sublabel="Active threat deflection"  color="#ff00ff" checked={shield} onChange={setShield} />
          <SettingsRow label="Data Uplink"      sublabel="Sync to remote node"       color="#39ff14" checked={uplink} onChange={setUplink} />
          <SettingsRow label="Stealth Mode"     sublabel="Mask system signature"     color="#ffb800" checked={stealth} onChange={setStealth} />
        </div>
      </div>

      {/* COLORS */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(255,0,255,0.5)", letterSpacing: "0.15em", marginBottom: 14 }}>COLORS</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <NeonToggle label="Cyan"  color="cyan"    defaultChecked size="md" />
          <NeonToggle label="Pink"  color="pink"    defaultChecked size="md" />
          <NeonToggle label="Green" color="green"   defaultChecked size="md" />
          <NeonToggle label="Amber" color="#ffb800" defaultChecked size="md" />
        </div>
      </div>

      {/* SIZES */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(57,255,20,0.5)", letterSpacing: "0.15em", marginBottom: 14 }}>SIZES</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <NeonToggle label="Small"  size="sm" defaultChecked color="cyan" />
          <NeonToggle label="Medium" size="md" defaultChecked color="cyan" />
          <NeonToggle label="Large"  size="lg" defaultChecked color="cyan" />
        </div>
      </div>

      {/* STATES */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(0,243,255,0.5)", letterSpacing: "0.15em", marginBottom: 14 }}>STATES</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <NeonToggle label="On"           defaultChecked={true}  color="cyan" />
          <NeonToggle label="Off"          defaultChecked={false} color="cyan" />
          <NeonToggle label="Disabled on"  defaultChecked={true}  color="cyan" disabled />
          <NeonToggle label="Disabled off" defaultChecked={false} color="cyan" disabled />
        </div>
      </div>

    </div>
  );
}
