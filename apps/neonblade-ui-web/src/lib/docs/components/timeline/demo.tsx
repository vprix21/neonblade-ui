import { Timeline } from "../../../components/ui/timelines/Timeline";

const ITEMS_BASE = [
  {
    date: "Jan 2024",
    title: "Project Kickoff",
    description:
      "Repository created, toolchain configured, and initial component scaffolding complete.",
    badge: "v0.1",
  },
  {
    date: "Mar 2024",
    title: "Core Components",
    description:
      "Cards, buttons, badges, and frame components shipped with full prop APIs.",
    badge: "v0.5",
    active: true,
  },
  {
    date: "Jun 2024",
    title: "CLI Tool Released",
    description:
      "npx neonblade-ui add <component> — copy components directly into your project.",
    badge: "v1.0",
  },
  {
    date: "Q1 2025",
    title: "Navigation Suite",
    description:
      "Standard, floating, dock navbar variants plus mega footer shipped.",
  },
];

const ITEMS_PING = ITEMS_BASE.map((item, i) => ({
  ...item,
  active: i === 1,
}));

export default function TimelineDemo() {
  return (
    <div className="flex flex-col gap-14 w-full">
      {/* Variants */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Variants
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Default
            </p>
            <Timeline
              items={ITEMS_BASE}
              color="cyan"
              variant="default"
              animate
            />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Glow
            </p>
            <Timeline items={ITEMS_BASE} color="pink" variant="glow" animate />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Minimal
            </p>
            <Timeline
              items={ITEMS_BASE}
              color="green"
              variant="minimal"
              animate
            />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Stepped
            </p>
            <Timeline
              items={ITEMS_BASE}
              color="cyan"
              variant="stepped"
              animate
            />
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Colors
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Cyan
            </p>
            <Timeline items={ITEMS_BASE.slice(0, 3)} color="cyan" />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Pink
            </p>
            <Timeline items={ITEMS_BASE.slice(0, 3)} color="pink" />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Custom #ff6600
            </p>
            <Timeline items={ITEMS_BASE.slice(0, 3)} color="#ff6600" />
          </div>
        </div>
      </div>

      {/* Dot Styles */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Dot Shapes
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Circle
            </p>
            <Timeline
              items={ITEMS_BASE.slice(0, 3)}
              color="cyan"
              dotStyle="circle"
            />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Square
            </p>
            <Timeline
              items={ITEMS_BASE.slice(0, 3)}
              color="pink"
              dotStyle="square"
            />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Diamond
            </p>
            <Timeline
              items={ITEMS_BASE.slice(0, 3)}
              color="green"
              dotStyle="diamond"
            />
          </div>
        </div>
      </div>

      {/* Dot Animations */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Dot Animations
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Pulse
            </p>
            <Timeline
              items={ITEMS_PING.slice(0, 3)}
              color="cyan"
              dotAnim="pulse"
            />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Ping
            </p>
            <Timeline
              items={ITEMS_PING.slice(0, 3)}
              color="pink"
              dotAnim="ping"
            />
          </div>
        </div>
      </div>

      {/* Line Styles */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Line Styles
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Solid
            </p>
            <Timeline
              items={ITEMS_BASE.slice(0, 3)}
              color="cyan"
              lineStyle="solid"
            />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Dashed
            </p>
            <Timeline
              items={ITEMS_BASE.slice(0, 3)}
              color="pink"
              lineStyle="dashed"
            />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Glow
            </p>
            <Timeline
              items={ITEMS_BASE.slice(0, 3)}
              color="green"
              lineStyle="glow"
            />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              None
            </p>
            <Timeline
              items={ITEMS_BASE.slice(0, 3)}
              color="cyan"
              lineStyle="none"
            />
          </div>
        </div>
      </div>

      {/* Alignment */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Alignment
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Left
            </p>
            <Timeline
              items={ITEMS_BASE.slice(0, 3)}
              color="cyan"
              align="left"
            />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Right
            </p>
            <Timeline
              items={ITEMS_BASE.slice(0, 3)}
              color="pink"
              align="right"
            />
          </div>
          <div>
            <p className="text-[10px] font-orbitron text-white/30 uppercase mb-4">
              Alternate
            </p>
            <Timeline
              items={ITEMS_BASE.slice(0, 4)}
              color="green"
              align="alternate"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
