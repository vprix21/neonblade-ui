import { GridScene } from "../../../components/ui/backgrounds/GridScene";

export default function GridSceneDemo() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Default — cyan scene */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Default grid scene
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <GridScene />
        </div>
      </div>

      {/* Wide gap */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Wide gap
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <GridScene gap={0.2} />
        </div>
      </div>

      {/* Pink synthwave */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Pink synthwave
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <GridScene
            lineColor="#ff00ff"
            glowColor="#ff00ff"
            bgColor="#0a020a"
            horizon={0.5}
            gap={0.1}
            speed={0.8}
          />
        </div>
      </div>

      {/* Floor only */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Floor only (no ceiling)
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <GridScene
            lineColor="#00f3ff"
            glowColor="#00f3ff"
            bgColor="#000000"
            horizon={0.45}
            showCeiling={false}
            speed={0.6}
          />
        </div>
      </div>

      {/* Ceiling only */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Ceiling only (no floor)
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <GridScene
            lineColor="#a855f7"
            glowColor="#a855f7"
            bgColor="#07000f"
            horizon={0.55}
            showFloor={false}
            speed={0.5}
          />
        </div>
      </div>

      {/* Static green wireframe scene */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Static green wireframe
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <GridScene
            lineColor="#39ff14"
            glowColor="#39ff14"
            bgColor="#000000"
            horizon={0.5}
            gap={0.12}
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
