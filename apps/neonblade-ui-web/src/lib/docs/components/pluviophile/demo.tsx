import Pluviophile from "../../../components/ui/backgrounds/Pluviophile";

export default function PluviophileDemo() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Default */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Default rain
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <Pluviophile />
        </div>
      </div>

      {/* Straight falling, slow — calm drizzle */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Straight falling — slow drizzle
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <Pluviophile
            angle={0}
            speed={5}
            dropCount={80}
            dropMinLength={10}
            dropMaxLength={22}
            opacity={0.55}
          />
        </div>
      </div>

      {/* Heavy downpour */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Heavy downpour
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <Pluviophile
            dropCount={280}
            speed={18}
            dropMinLength={22}
            dropMaxLength={55}
            dropWidth={1.2}
            opacity={0.85}
          />
        </div>
      </div>

      {/* Wind-driven — steep angle */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Wind-driven — steep angle
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <Pluviophile
            angle={38}
            dropCount={200}
            speed={16}
            dropMinLength={25}
            dropMaxLength={60}
            opacity={0.8}
          />
        </div>
      </div>

      {/* Neon cyan */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Neon cyan rain
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <Pluviophile
            dropColor="rgba(0,243,255,0.7)"
            dropCount={160}
            dropMinLength={18}
            dropMaxLength={42}
            backgroundColor="#000d0f"
          />
        </div>
      </div>

      {/* Neon pink */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Neon pink rain
        </p>
        <div className="h-72 w-full relative rounded-lg overflow-hidden">
          <Pluviophile
            dropColor="rgba(203, 39, 167, 0.86)"
            dropCount={170}
            backgroundColor="transparent"
          />
        </div>
      </div>
    </div>
  );
}
