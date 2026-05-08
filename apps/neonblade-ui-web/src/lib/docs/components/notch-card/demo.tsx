import { NotchCard } from "../../../components/ui/cards/NotchCard";
import { Cpu, Zap, Shield, Radio, Database } from "lucide-react";

export default function NotchCardDemo() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Default — top + bottom notches */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Default (top + bottom notches)
        </p>
        <div className="grid grid-cols-1 gap-6">
          <NotchCard
            title="Cyber Unit"
            description="Default top & bottom notches with cyan border."
            notchWidth={500}
            notchSize={5}
            size="lg"
            innerClassName="py-10"
            icon={<Cpu className="w-full h-full" />}
          />
          <NotchCard
            title="Power Core"
            description="Pink accent with high glow intensity."
            borderColor="pink"
            accentColor="pink"
            size="lg"
            glowIntensity="high"
            innerClassName="py-10"
            icon={<Zap className="w-full h-full" />}
          />
          <NotchCard
            title="Defense Grid"
            description="Green accent with gradient border."
            borderColor="green"
            borderColorB="cyan"
            borderGradient
            size="lg"
            notchWidth={200}
            notchSize={5}
            align="center"
            accentColor="green"
            innerClassName="py-10"
            icon={<Shield className="w-full h-full" />}
          />
        </div>
      </div>

      {/* Notch sides */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Notch Sides
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NotchCard
            notchSides={["top"]}
            title="Top Only"
            borderColor="cyan"
            className="h-32"
          />
          <NotchCard
            notchSides={["bottom"]}
            title="Bottom Only"
            borderColor="pink"
            accentColor="pink"
            className="h-32"
          />
          <NotchCard
            notchSides={["left", "right"]}
            title="Left + Right"
            borderColor="green"
            accentColor="green"
            className="h-32"
          />
          <NotchCard
            notchSides={["top", "bottom", "left", "right"]}
            title="All Sides"
            borderColor="#ff6600"
            accentColor="#ff6600"
            className="h-32"
          />
        </div>
      </div>

      {/* Beam variants */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Beam Variants
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NotchCard
            beamVariant="single"
            beamColor="cyan"
            title="Single"
            className="h-32"
          />
          <NotchCard
            beamVariant="dual"
            beamColor="cyan"
            beamColorB="pink"
            title="Dual"
            className="h-32"
          />
          <NotchCard
            beamVariant="gradient-sweep"
            beamColor="pink"
            beamColorB="cyan"
            title="Gradient Sweep"
            className="h-32"
          />
          <NotchCard beamVariant="rainbow" title="Rainbow" className="h-32" />
          <NotchCard
            beamVariant="pulse"
            beamColor="green"
            accentColor="green"
            title="Pulse"
            className="h-32"
          />
        </div>
      </div>

      {/* Hover effects */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Hover Effects
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NotchCard
            hoverEffect="glow"
            borderColor="cyan"
            title="Glow"
            description="Hover me."
            className="h-36"
          />
          <NotchCard
            hoverEffect="scan"
            borderColor="pink"
            accentColor="pink"
            title="Scan"
            description="Hover me."
            className="h-36"
          />
          <NotchCard
            hoverEffect="pulse"
            borderColor="green"
            accentColor="green"
            title="Pulse"
            description="Hover me."
            className="h-36"
          />
          <NotchCard
            hoverEffect="lift"
            borderColor="#ff6600"
            accentColor="#ff6600"
            title="Lift"
            description="Hover me."
            className="h-36"
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Sizes
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(["sm", "md", "lg", "xl"] as const).map((s) => (
            <NotchCard
              key={s}
              size={s}
              notchWidth={100}
              notchSize={5}
              borderColor="cyan"
              title={s.toUpperCase()}
              description="Size demo."
              icon={<Radio className="w-full h-full" />}
            />
          ))}
        </div>
      </div>

      {/* Custom colors */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Custom Colors
        </p>
        <div className="grid grid-cols-1 gap-6">
          <NotchCard
            borderColor="#a855f7"
            accentColor="#a855f7"
            glowIntensity="high"
            title="Neural Link"
            notchSides={["top", "bottom", "left", "right"]}
            notchWidth={300}
            notchWidthV={50}
            notchSize={5}
            innerClassName="py-10"
            description="Custom violet accent with beam and high glow."
            icon={<Database className="w-full h-full" />}
          />
        </div>
      </div>

      {/* Notch shape customization */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Notch Shape
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NotchCard
            title="Narrow & deep"
            description="notchWidth=30 · notchSize=18"
            notchWidth={30}
            notchSize={18}
            borderColor="cyan"
            className="h-full"
            innerClassName="py-10"
          />
          <NotchCard
            title="Wide & shallow"
            description="notchWidth=120 · notchSize=6"
            notchWidth={120}
            notchSize={6}
            borderColor="pink"
            accentColor="pink"
            className="h-full"
            innerClassName="py-10"
          />
          <NotchCard
            title="Steep walls"
            description="notchSkew=4 · tight diagonal entry"
            notchWidth={60}
            notchSkew={4}
            notchSize={14}
            borderColor="green"
            accentColor="green"
            className="h-full"
            innerClassName="py-10"
          />
          <NotchCard
            title="Gradual walls"
            description="notchSkew=28 · shallow diagonal entry"
            notchWidth={60}
            notchSkew={28}
            notchSize={14}
            borderColor="#ff6600"
            accentColor="#ff6600"
            className="h-full"
            innerClassName="py-10"
          />
          <NotchCard
            notchSides={["top", "bottom", "left", "right"]}
            title="H wider than V"
            description="notchWidth=100 · notchWidthV=30"
            notchWidth={100}
            notchWidthV={30}
            notchSize={12}
            borderColor="cyan"
            className="h-full"
            innerClassName="py-10"
          />
          <NotchCard
            notchSides={["top", "bottom", "left", "right"]}
            title="V wider than H"
            description="notchWidth=30 · notchWidthV=100"
            notchWidth={30}
            notchWidthV={100}
            notchSize={12}
            borderColor="#a855f7"
            accentColor="#a855f7"
            className="h-full"
            innerClassName="py-10"
          />
        </div>
      </div>
    </div>
  );
}
