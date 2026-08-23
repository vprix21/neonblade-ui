import { GridFloor } from "../../../components/ui/backgrounds/GridFloor";

export default function GridFloorDemo() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Default */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Default grid floor
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <GridFloor />
        </div>
      </div>

      {/* Pink horizon */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Pink horizon
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <GridFloor
            lineColor="#ff00ff"
            glowColor="#ff00ff"
            bgColor="#0a020a"
            horizon={0.5}
            speed={0.8}
          />
        </div>
      </div>

      {/* Slow cyan — lower horizon */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Low horizon, slow scroll
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <GridFloor
            lineColor="#00f3ff"
            glowColor="#00f3ff"
            bgColor="#000000"
            horizon={0.35}
            speed={0.25}
            rows={24}
            columns={32}
            opacity={0.65}
          />
        </div>
      </div>

      {/* Static green wireframe */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Static green wireframe
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <GridFloor
            lineColor="#39ff14"
            glowColor="#39ff14"
            bgColor="#000000"
            horizon={0.55}
            speed={0}
            rows={14}
            columns={20}
            lineWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
}
