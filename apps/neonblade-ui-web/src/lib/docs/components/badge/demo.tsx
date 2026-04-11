import { Badge } from "../../../components/ui/badges/Badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Shapes */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Shapes
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge color="cyan" shape="pill">
            Pill
          </Badge>
          <Badge color="cyan" shape="rectangle">
            Rectangle
          </Badge>
          <Badge color="cyan" shape="corner-cut">
            Corner Cut
          </Badge>
          <Badge color="cyan" shape="corner-cut" corner="bottom-left">
            Bottom Left
          </Badge>
          <Badge color="cyan" shape="corner-cut" corner="top-right">
            Top Right
          </Badge>
          <Badge color="cyan" shape="corner-cut" corner="all">
            All Corners
          </Badge>
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Variants
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge color="cyan" variant="outline">
            Outline
          </Badge>
          <Badge color="cyan" variant="solid">
            Solid
          </Badge>
          <Badge color="cyan" variant="ghost">
            Ghost
          </Badge>
          <Badge color="pink" variant="outline">
            Outline
          </Badge>
          <Badge color="pink" variant="solid">
            Solid
          </Badge>
          <Badge color="pink" variant="ghost">
            Ghost
          </Badge>
          <Badge color="green" variant="outline">
            Outline
          </Badge>
          <Badge color="green" variant="solid">
            Solid
          </Badge>
          <Badge color="green" variant="ghost">
            Ghost
          </Badge>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Dot Indicators
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge color="cyan" dot="solid">
            Static
          </Badge>
          <Badge color="cyan" dot="pulse">
            Pulse
          </Badge>
          <Badge color="cyan" dot="flicker">
            Flicker
          </Badge>
          <Badge color="pink" shape="corner-cut" dot="flicker">
            Live
          </Badge>
          <Badge color="green" shape="rectangle" dot="pulse">
            Online
          </Badge>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Sizes
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge color="cyan" size="xs">
            XSmall
          </Badge>
          <Badge color="cyan" size="sm">
            Small
          </Badge>
          <Badge color="cyan" size="md">
            Medium
          </Badge>
        </div>
      </div>

      {/* Glow */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Glow
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge color="cyan" glow dot="flicker">
            System Active
          </Badge>
          <Badge color="pink" glow shape="corner-cut" dot="pulse">
            Critical
          </Badge>
          <Badge color="green" glow variant="solid" size="md">
            Confirmed
          </Badge>
        </div>
      </div>

      {/* Custom colors */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Custom Colors
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge color="#ff6600" dot="pulse">
            Warning
          </Badge>
          <Badge color="#a855f7" shape="corner-cut" glow>
            Neural
          </Badge>
          <Badge color="#f59e0b" variant="solid" size="md">
            Alert
          </Badge>
        </div>
      </div>
    </div>
  );
}
