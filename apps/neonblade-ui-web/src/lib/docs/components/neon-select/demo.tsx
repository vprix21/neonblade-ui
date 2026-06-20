"use client";
import { useState } from "react";
import NeonSelect from "@/lib/components/ui/inputs/NeonSelect";

const WEAPON_SYSTEMS = [
  { value: "railgun",    label: "Railgun Mk-IV" },
  { value: "plasma",     label: "Plasma Cannon" },
  { value: "laser",      label: "Laser Array" },
  { value: "missile",    label: "Missile Salvo" },
  { value: "emp",        label: "EMP Burst", disabled: true },
];

const NETWORK_NODES = [
  { value: "node-alpha", label: "Node ALPHA — Online" },
  { value: "node-beta",  label: "Node BETA — Online" },
  { value: "node-gamma", label: "Node GAMMA — Degraded" },
  { value: "node-delta", label: "Node DELTA — Offline", disabled: true },
];

const CLEARANCE = [
  { value: "lvl1", label: "Level 1 — Restricted" },
  { value: "lvl2", label: "Level 2 — Classified" },
  { value: "lvl3", label: "Level 3 — Top Secret" },
  { value: "lvl4", label: "Level 4 — Black Ops" },
];

export default function NeonSelectDemo() {
  const [weapon,  setWeapon]  = useState("");
  const [node,    setNode]    = useState("node-alpha");
  const [lvl,     setLvl]     = useState("lvl2");

  return (
    <div style={{ padding: "24px 16px", display: "flex", flexDirection: "column", gap: 32, width: "100%", maxWidth: 420 }}>

      {/* USE CASE */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(0,243,255,0.5)", letterSpacing: "0.15em", marginBottom: 16 }}>USE CASE — SYSTEM CONFIG</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <NeonSelect
            label="Primary Weapon System"
            options={WEAPON_SYSTEMS}
            value={weapon}
            onChange={setWeapon}
            placeholder="SELECT WEAPON..."
            color="cyan"
          />
          <NeonSelect
            label="Network Node"
            options={NETWORK_NODES}
            value={node}
            onChange={setNode}
            color="pink"
          />
          <NeonSelect
            label="Clearance Level"
            options={CLEARANCE}
            value={lvl}
            onChange={setLvl}
            color="#39ff14"
          />
        </div>
      </div>

      {/* VARIANTS */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(255,0,255,0.5)", letterSpacing: "0.15em", marginBottom: 14 }}>VARIANTS</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <NeonSelect options={CLEARANCE} defaultValue="lvl1" variant="square"     color="cyan" label="Square (default)" />
          <NeonSelect options={CLEARANCE} defaultValue="lvl1" variant="corner-cut" color="cyan" label="Corner Cut" />
        </div>
      </div>

      {/* COLORS */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(57,255,20,0.5)", letterSpacing: "0.15em", marginBottom: 14 }}>COLORS</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <NeonSelect options={WEAPON_SYSTEMS} defaultValue="railgun" color="cyan"    />
          <NeonSelect options={WEAPON_SYSTEMS} defaultValue="plasma"  color="pink"    />
          <NeonSelect options={WEAPON_SYSTEMS} defaultValue="laser"   color="green"   />
          <NeonSelect options={WEAPON_SYSTEMS} defaultValue="missile" color="#ffb800" />
        </div>
      </div>

      {/* SIZES */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(0,243,255,0.5)", letterSpacing: "0.15em", marginBottom: 14 }}>SIZES</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <NeonSelect options={WEAPON_SYSTEMS} defaultValue="railgun" size="sm" color="cyan" label="Small" />
          <NeonSelect options={WEAPON_SYSTEMS} defaultValue="railgun" size="md" color="cyan" label="Medium" />
          <NeonSelect options={WEAPON_SYSTEMS} defaultValue="railgun" size="lg" color="cyan" label="Large" />
        </div>
      </div>

      {/* DISABLED */}
      <div>
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", marginBottom: 14 }}>DISABLED</p>
        <NeonSelect options={WEAPON_SYSTEMS} defaultValue="railgun" disabled color="cyan" label="System Locked" />
      </div>

    </div>
  );
}
