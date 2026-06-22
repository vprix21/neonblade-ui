"use client";

import { useState } from "react";
import NeonModal from "../../../components/ui/elements/Modal";
import { CornerCutButton } from "../../../components/ui/buttons/CornerCutButton";

export default function NeonModalDemo() {
  const [basic, setBasic] = useState(false);
  const [colors, setColors] = useState<string | null>(null);
  const [sizes, setSizes] = useState<string | null>(null);
  const [corners, setCorners] = useState<string | null>(null);
  const [animations, setAnimations] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string | null>(null);
  const [plain, setPlain] = useState(false);
  const [beam, setBeam] = useState<{ speed: number; length: number } | null>(
    null,
  );
  const [scrollable, setScrollable] = useState(false);

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Basic */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Basic
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <CornerCutButton
            color="cyan"
            size="sm"
            hoverEffect="glow"
            onClick={() => setBasic(true)}
          >
            Open Modal
          </CornerCutButton>
          <NeonModal
            open={basic}
            onClose={() => setBasic(false)}
            header={{ label: "NeonBlade UI", title: "Basic Modal" }}
            footer={{
              children: (
                <CornerCutButton
                  size="sm"
                  color="cyan"
                  hoverEffect="shift"
                  onClick={() => setBasic(false)}
                >
                  Close
                </CornerCutButton>
              ),
            }}
          >
            A basic NeonModal with a header, body, and footer. Supports corner
            cuts, neon glow, backdrop blur, and animated entry/exit.
          </NeonModal>
        </div>
      </div>

      {/* Accent Colors */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Accent Colors
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          {(
            [
              { color: "cyan", label: "Cyan" },
              { color: "pink", label: "Pink" },
              { color: "green", label: "Green" },
              { color: "orange", label: "Orange" },
            ] as const
          ).map(({ color, label }) => (
            <CornerCutButton
              key={color}
              color={color}
              size="sm"
              variant="outline"
              hoverEffect="glow"
              onClick={() => setColors(color)}
            >
              {label}
            </CornerCutButton>
          ))}
          <NeonModal
            open={colors !== null}
            onClose={() => setColors(null)}
            color={(colors as "cyan" | "pink" | "green" | "orange") ?? "cyan"}
            header={{
              label: "Accent Color",
              title: `${colors ? colors.charAt(0).toUpperCase() + colors.slice(1) : ""} Modal`,
            }}
            footer={{
              children: (
                <CornerCutButton
                  size="sm"
                  color={colors ?? "cyan"}
                  hoverEffect="shift"
                  onClick={() => setColors(null)}
                >
                  Dismiss
                </CornerCutButton>
              ),
            }}
          >
            The accent color drives the border glow, header label, close button,
            footer separator, and scrollbar thumb — all in one prop.
          </NeonModal>
        </div>
      </div>

      {/* Background Color */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Background Color
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          {(
            [
              { bg: "#0a0014", label: "Deep Violet" },
              { bg: "#001a0a", label: "Deep Green" },
              { bg: "#0f0a00", label: "Deep Amber" },
              { bg: "#0d0d0d", label: "Near Black" },
            ] as const
          ).map(({ bg, label }) => (
            <CornerCutButton
              key={bg}
              color="cyan"
              size="sm"
              variant="outline"
              hoverEffect="glow"
              onClick={() => setBgColor(bg)}
            >
              {label}
            </CornerCutButton>
          ))}
          <NeonModal
            open={bgColor !== null}
            onClose={() => setBgColor(null)}
            bgColor={bgColor ?? "#080b0d"}
            header={{ label: "Background", title: `bgColor="${bgColor}"` }}
            footer={{
              children: (
                <CornerCutButton
                  size="sm"
                  color="cyan"
                  hoverEffect="shift"
                  onClick={() => setBgColor(null)}
                >
                  Close
                </CornerCutButton>
              ),
            }}
          >
            Control the inner surface color independently from the accent. Any
            valid CSS color string is accepted — dark tints, custom hex values,
            or hsl() colors.
          </NeonModal>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Sizes
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <CornerCutButton
              key={s}
              color="cyan"
              size="sm"
              hoverEffect="glow"
              onClick={() => setSizes(s)}
            >
              {s.toUpperCase()}
            </CornerCutButton>
          ))}
          <NeonModal
            open={sizes !== null}
            onClose={() => setSizes(null)}
            size={(sizes as "xs" | "sm" | "md" | "lg" | "xl") ?? "md"}
            header={{ label: "Size", title: `size="${sizes}"` }}
            footer={{
              children: (
                <CornerCutButton
                  size="sm"
                  color="cyan"
                  hoverEffect="shift"
                  onClick={() => setSizes(null)}
                >
                  Close
                </CornerCutButton>
              ),
            }}
          >
            Modal max-width controlled by the <code>size</code> prop. Available
            presets: xs, sm, md, lg, xl, and full.
          </NeonModal>
        </div>
      </div>

      {/* Corners */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Corners
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          {(
            [
              "bottom-right",
              "bottom-left",
              "top-right",
              "top-left",
              "all",
              "none",
            ] as const
          ).map((c) => (
            <CornerCutButton
              key={c}
              color="pink"
              size="sm"
              hoverEffect="glow"
              onClick={() => setCorners(c)}
            >
              {c}
            </CornerCutButton>
          ))}
          <NeonModal
            open={corners !== null}
            onClose={() => setCorners(null)}
            color="pink"
            corner={
              (corners as
                | "bottom-right"
                | "bottom-left"
                | "top-right"
                | "top-left"
                | "all"
                | "none") ?? "bottom-right"
            }
            header={{ label: "Corner", title: `corner="${corners}"` }}
            footer={{
              children: (
                <CornerCutButton
                  size="sm"
                  color="pink"
                  hoverEffect="shift"
                  onClick={() => setCorners(null)}
                >
                  Close
                </CornerCutButton>
              ),
            }}
          >
            Choose which corner receives the diagonal clip-path cut — or clip
            all four, or none at all.
          </NeonModal>
        </div>
      </div>

      {/* Animations */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Animations (enter/exit)
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          {(["slide", "scale", "none"] as const).map((a) => (
            <CornerCutButton
              key={a}
              color="green"
              size="sm"
              hoverEffect="glow"
              onClick={() => setAnimations(a)}
            >
              {a}
            </CornerCutButton>
          ))}
          <NeonModal
            open={animations !== null}
            onClose={() => setAnimations(null)}
            color="green"
            animation={(animations as "slide" | "scale" | "none") ?? "slide"}
            header={{ label: "Animation", title: `animation="${animations}"` }}
            footer={{
              children: (
                <CornerCutButton
                  size="sm"
                  color="green"
                  hoverEffect="shift"
                  onClick={() => setAnimations(null)}
                >
                  Close
                </CornerCutButton>
              ),
            }}
          >
            Slide moves the panel in from below; scale zooms it in from the
            center. Both animations reverse on close.
          </NeonModal>
        </div>
      </div>

      {/* Plain (no dividers) */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Plain (no dividers)
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <CornerCutButton
            color="cyan"
            size="sm"
            variant="ghost"
            hoverEffect="glow"
            onClick={() => setPlain(true)}
          >
            Open Plain Modal
          </CornerCutButton>
          <NeonModal
            open={plain}
            onClose={() => setPlain(false)}
            dividers={false}
            header={{ label: "Variant", title: "Plain Modal" }}
            footer={{
              children: (
                <CornerCutButton
                  size="sm"
                  color="cyan"
                  hoverEffect="shift"
                  onClick={() => setPlain(false)}
                >
                  Close
                </CornerCutButton>
              ),
            }}
          >
            Setting <code>dividers={"{false}"}</code> removes the border lines
            between header, body, and footer — giving a clean, minimal look
            without internal chrome.
          </NeonModal>
        </div>
      </div>

      {/* Border Beam */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Border Beam
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <CornerCutButton
            color="cyan"
            size="sm"
            hoverEffect="glow"
            onClick={() => setBeam({ speed: 3, length: 60 })}
          >
            Default (3s / 60°)
          </CornerCutButton>
          <CornerCutButton
            color="pink"
            size="sm"
            hoverEffect="glow"
            onClick={() => setBeam({ speed: 1.5, length: 30 })}
          >
            Fast + Short (1.5s / 30°)
          </CornerCutButton>
          <CornerCutButton
            color="orange"
            size="sm"
            hoverEffect="glow"
            onClick={() => setBeam({ speed: 6, length: 120 })}
          >
            Slow + Long (6s / 120°)
          </CornerCutButton>
          <NeonModal
            open={beam !== null}
            onClose={() => setBeam(null)}
            color={
              beam?.length === 30
                ? "pink"
                : beam?.length === 120
                  ? "orange"
                  : "cyan"
            }
            borderBeam={true}
            beamSpeed={beam?.speed ?? 3}
            beamLength={beam?.length ?? 60}
            corner="bottom-right"
            header={{
              label: "Border Beam",
              title: `${beam?.speed}s · ${beam?.length}° tail`,
            }}
            footer={{
              children: (
                <CornerCutButton
                  size="sm"
                  color={
                    beam?.length === 30
                      ? "pink"
                      : beam?.length === 120
                        ? "orange"
                        : "cyan"
                  }
                  hoverEffect="shift"
                  onClick={() => setBeam(null)}
                >
                  Close
                </CornerCutButton>
              ),
            }}
          >
            A comet-style beam travels around the modal border. The bright head
            fades into a glowing tail. Control the revolution speed with{" "}
            <code>beamSpeed</code> (seconds) and the tail arc with{" "}
            <code>beamLength</code> (degrees).
          </NeonModal>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/65 uppercase tracking-widest">
          Scrollable Body
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <CornerCutButton
            color="cyan"
            size="sm"
            variant="outline"
            hoverEffect="glow"
            onClick={() => setScrollable(true)}
          >
            Long Content Modal
          </CornerCutButton>
          <NeonModal
            open={scrollable}
            onClose={() => setScrollable(false)}
            scrollableBody={true}
            header={{ label: "Overflow", title: "Scrollable Body" }}
            footer={{
              children: (
                <CornerCutButton
                  size="sm"
                  color="cyan"
                  hoverEffect="shift"
                  onClick={() => setScrollable(false)}
                >
                  Close
                </CornerCutButton>
              ),
            }}
          >
            <div className="space-y-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <p key={i} className="text-white/60 text-sm leading-relaxed">
                  Section {i + 1} — NeonBlade UI components are designed for
                  futuristic interfaces. This content block demonstrates the
                  scrollable body mode where the body height is capped and a
                  styled scrollbar appears.
                </p>
              ))}
            </div>
          </NeonModal>
        </div>
      </div>
    </div>
  );
}
