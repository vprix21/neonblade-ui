import { LightningButton } from "../../../components/ui/buttons/LightningButton";

export default function LightningButtonDemo() {
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Colors (move cursor near a button)
        </p>
        <div className="flex flex-wrap gap-16 items-center py-6">
          <LightningButton color="cyan">Cyan</LightningButton>
          <LightningButton color="pink">Pink</LightningButton>
          <LightningButton color="green">Green</LightningButton>
          <LightningButton color="#ff6600">Custom #ff6600</LightningButton>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Variants
        </p>
        <div className="flex flex-wrap gap-16 items-center py-6">
          <LightningButton variant="solid" color="cyan">
            Solid
          </LightningButton>
          <LightningButton variant="outline" color="pink">
            Outline
          </LightningButton>
          <LightningButton variant="ghost" color="green">
            Ghost
          </LightningButton>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Bolt count &amp; radius
        </p>
        <div className="flex flex-wrap gap-16 items-center py-6">
          <LightningButton color="cyan" boltCount={3} radius={100}>
            Subtle
          </LightningButton>
          <LightningButton color="pink" boltCount={8} radius={220}>
            Intense
          </LightningButton>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Shape
        </p>
        <div className="flex flex-wrap gap-16 items-center py-6">
          <LightningButton color="cyan" cut={false}>
            No Corner Cut
          </LightningButton>
          <LightningButton color="pink" cornerSize={28}>
            Large Corner Cut
          </LightningButton>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Press effects (click each)
        </p>
        <div className="flex flex-wrap gap-16 items-center py-6">
          <LightningButton color="cyan" pressEffect="ripple">
            Ripple
          </LightningButton>
          <LightningButton color="pink" pressEffect="shine">
            Shine
          </LightningButton>
          <LightningButton color="green" pressEffect="mechanical">
            Mechanical
          </LightningButton>
          <LightningButton color="#ff3355" pressEffect="destroy">
            Destroy
          </LightningButton>
          <LightningButton color="cyan" pressEffect="none" variant="outline">
            None
          </LightningButton>
        </div>
      </div>
    </div>
  );
}
