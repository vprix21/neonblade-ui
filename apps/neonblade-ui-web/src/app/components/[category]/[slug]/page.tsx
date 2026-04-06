import React from "react";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { categories } from "@/lib/docs/data";
import { DatalinesWithGrid } from "@/lib/components/ui/backgrounds/DatalinesWithGrid";
import { AsciiRain } from "@/lib/components/ui/backgrounds/AsciiRain";
import BorderBeamCornerCutCard from "@/lib/components/ui/cards/BorderBeamCornerCutCard";
import AccentFrame from "@/lib/components/ui/frames/AccentFrame";
import GlitchText from "@/lib/components/ui/text/GlitchText";
import CornerCutButton from "@/lib/components/ui/buttons/CornerCutButton";
import NeonGlowCornerCutCard from "@/lib/components/ui/cards/NeonGlowCornerCutCard";
import ComponentTabs from "@/components/DocTabs"; // We will create this
import { Terminal } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import usageMap from "@/lib/docs/usagemap";
import folderMap from "@/lib/docs/foldermap";
import propsMap from "@/lib/docs/propsmap";
import demoMap from "@/lib/docs/demomap";

async function getComponentFiles(category: string, folderName: string) {
  try {
    const basePath = path.join(
      process.cwd(),
      "src/lib/components/ui",
      category,
      folderName,
    );

    // Attempt to read main file (index.tsx or .tsx with same name)
    let sourcePath = path.join(basePath, "index.tsx");
    let source = "";
    try {
      source = await fs.readFile(sourcePath, "utf-8");
    } catch {
      // try .tsx
      sourcePath = path.join(basePath, `${folderName}.tsx`);
      source = await fs.readFile(sourcePath, "utf-8");
    }

    let cssSource = "";
    try {
      const files = await fs.readdir(basePath);
      const cssFile = files.find(f => f.endsWith('.css'));
      if (cssFile) {
        cssSource = await fs.readFile(path.join(basePath, cssFile), "utf-8");
      }
    } catch {
       // Ignore if not found
    }

    // Read meta
    let meta: { dependencies?: string[]; [key: string]: unknown } = { dependencies: [] };
    try {
      const metaPath = path.join(basePath, "meta.json");
      meta = JSON.parse(await fs.readFile(metaPath, "utf-8"));
    } catch {
      // Ignore if not found
    }

    return { source, cssSource, meta };
  } catch (error) {
    return { source: "", cssSource: "", meta: { dependencies: [] } };
  }
}

// Map slugs to folder names

// const folderMap: Record<string, string> = {
//   "datalines-with-grid": "DatalinesWithGrid",
//   "ascii-rain": "AsciiRain",
//   "border-beam-corner-cut-card": "BorderBeamCornerCutCard",
//   "accent-frame": "AccentFrame",
//   "glitch-text": "GlitchText",
//   "corner-cut-button": "CornerCutButton",
//   "neon-glow-corner-cut-card": "NeonGlowCornerCutCard",
// };

// const demoMap: Record<string, React.FC> = {
//   "datalines-with-grid": () => (
//     <div className="h-96 w-full relative">
//       <DatalinesWithGrid />
//     </div>
//   ),
//   "ascii-rain": () => (
//     <div className="h-96 w-full relative">
//       <AsciiRain />
//     </div>
//   ),
//   "border-beam-corner-cut-card": () => (
//     <div className="flex flex-col gap-12 w-full">
//       {/* Beam Variants */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Beam Variants
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           <BorderBeamCornerCutCard
//             variant="single"
//             beamColor="pink"
//             title="Single"
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             variant="dual"
//             beamColor="pink"
//             beamColorB="cyan"
//             title="Dual"
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             variant="gradient-sweep"
//             beamColor="pink"
//             beamColorB="cyan"
//             title="Gradient"
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             variant="rainbow"
//             title="Rainbow"
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             variant="pulse"
//             beamColor="green"
//             title="Pulse"
//             className="h-28"
//           />
//         </div>
//       </div>

//       {/* Colors */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Colors
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <BorderBeamCornerCutCard
//             beamColor="pink"
//             title="Pink"
//             description="Default preset."
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             beamColor="cyan"
//             title="Cyan"
//             description="Neon cyan."
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             beamColor="green"
//             title="Green"
//             description="Neon green."
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             beamColor="#ff6600"
//             title="#ff6600"
//             description="Any CSS color."
//             className="h-28"
//           />
//         </div>
//       </div>

//       {/* Glow Intensity */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Glow Intensity
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <BorderBeamCornerCutCard
//             beamColor="cyan"
//             glowIntensity="none"
//             title="None"
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             beamColor="cyan"
//             glowIntensity="low"
//             title="Low"
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             beamColor="cyan"
//             glowIntensity="medium"
//             title="Medium"
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             beamColor="cyan"
//             glowIntensity="high"
//             title="High"
//             className="h-28"
//           />
//         </div>
//       </div>

//       {/* Corners */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Corners
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           <BorderBeamCornerCutCard
//             corner="bottom-right"
//             beamColor="pink"
//             title="BR"
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             corner="bottom-left"
//             beamColor="pink"
//             title="BL"
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             corner="top-right"
//             beamColor="pink"
//             title="TR"
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             corner="top-left"
//             beamColor="pink"
//             title="TL"
//             className="h-28"
//           />
//           <BorderBeamCornerCutCard
//             corner="all"
//             beamColor="pink"
//             title="All"
//             className="h-28"
//           />
//         </div>
//       </div>

//       {/* Sizes */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Sizes
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
//           <BorderBeamCornerCutCard
//             size="sm"
//             beamColor="cyan"
//             title="Small"
//             description="Compact padding."
//           />
//           <BorderBeamCornerCutCard
//             size="md"
//             beamColor="cyan"
//             title="Medium"
//             description="Default size."
//           />
//           <BorderBeamCornerCutCard
//             size="lg"
//             beamColor="cyan"
//             title="Large"
//             description="More room."
//           />
//           <BorderBeamCornerCutCard
//             size="xl"
//             beamColor="cyan"
//             title="XLarge"
//             description="Max padding."
//           />
//         </div>
//       </div>

//       {/* With icon / title / description */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           With Icon + Content
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <BorderBeamCornerCutCard
//             beamColor="pink"
//             beamColorB="cyan"
//             variant="dual"
//             title="Dual Beam"
//             description="Two beams rotating in opposite directions."
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-full h-full"
//               >
//                 <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//               </svg>
//             }
//           />
//           <BorderBeamCornerCutCard
//             beamColor="cyan"
//             variant="gradient-sweep"
//             beamColorB="pink"
//             glowIntensity="high"
//             title="Gradient Sweep"
//             description="Wide blending beam with high ambient glow."
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-full h-full"
//               >
//                 <path d="M12 2L2 7l10 5 10-5-10-5z" />
//                 <path d="M2 17l10 5 10-5" />
//                 <path d="M2 12l10 5 10-5" />
//               </svg>
//             }
//           />
//           <BorderBeamCornerCutCard
//             variant="rainbow"
//             corner="all"
//             cornerSize={16}
//             duration={3}
//             title="Rainbow All-Cut"
//             description="Continuous neon spectrum on every corner."
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-full h-full"
//               >
//                 <circle cx="12" cy="12" r="10" />
//                 <circle cx="12" cy="12" r="4" />
//                 <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
//                 <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
//                 <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
//                 <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
//                 <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
//               </svg>
//             }
//           />
//         </div>
//       </div>
//     </div>
//   ),
//   "accent-frame": () => (
//     <div className="flex flex-col gap-12 w-full">
//       {/* Hover effects */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Hover Effects (hover each)
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//           <AccentFrame
//             color="cyan"
//             hoverEffect="expand"
//             className="text-white/70 font-orbitron text-sm text-center"
//           >
//             expand (default)
//           </AccentFrame>
//           <AccentFrame
//             color="cyan"
//             hoverEffect="glow"
//             className="text-white/70 font-orbitron text-sm text-center"
//           >
//             glow
//           </AccentFrame>
//           <AccentFrame
//             color="pink"
//             hoverEffect="pulse"
//             className="text-white/70 font-orbitron text-sm text-center"
//           >
//             pulse
//           </AccentFrame>
//           <AccentFrame
//             color="green"
//             hoverEffect="flicker"
//             className="text-white/70 font-orbitron text-sm text-center"
//           >
//             flicker
//           </AccentFrame>
//           <AccentFrame
//             color="cyan"
//             hoverEffect="trace"
//             className="text-white/70 font-orbitron text-sm text-center"
//           >
//             trace
//           </AccentFrame>
//           <AccentFrame
//             color="pink"
//             hoverEffect="none"
//             className="text-white/70 font-orbitron text-sm text-center"
//           >
//             none
//           </AccentFrame>
//         </div>
//       </div>

//       {/* Colors + colorB dual-color */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Colors & Dual Color (quad mode)
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           <AccentFrame
//             color="cyan"
//             mode="quad"
//             className="text-white/70 font-orbitron text-xs text-center"
//           >
//             Cyan
//           </AccentFrame>
//           <AccentFrame
//             color="pink"
//             mode="quad"
//             className="text-white/70 font-orbitron text-xs text-center"
//           >
//             Pink
//           </AccentFrame>
//           <AccentFrame
//             color="green"
//             mode="quad"
//             className="text-white/70 font-orbitron text-xs text-center"
//           >
//             Green
//           </AccentFrame>
//           <AccentFrame
//             color="cyan"
//             colorB="pink"
//             mode="quad"
//             hoverEffect="glow"
//             className="text-white/70 font-orbitron text-xs text-center"
//           >
//             Cyan + Pink
//           </AccentFrame>
//         </div>
//       </div>

//       {/* Always-animated */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Always Animated (no hover needed)
//         </p>
//         <div className="grid grid-cols-3 gap-6">
//           <AccentFrame
//             color="cyan"
//             hoverEffect="glow"
//             animated
//             glowIntensity="high"
//             className="text-white/70 font-orbitron text-xs text-center"
//           >
//             Glow always on
//           </AccentFrame>
//           <AccentFrame
//             color="pink"
//             colorB="cyan"
//             mode="quad"
//             hoverEffect="pulse"
//             animated
//             className="text-white/70 font-orbitron text-xs text-center"
//           >
//             Pulse always on
//           </AccentFrame>
//           <AccentFrame
//             color="green"
//             hoverEffect="flicker"
//             animated
//             className="text-white/70 font-orbitron text-xs text-center"
//           >
//             Flicker always on
//           </AccentFrame>
//         </div>
//       </div>

//       {/* Background variants + corner styles */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Background Variants & Corner Styles
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           <AccentFrame
//             color="cyan"
//             bgVariant="none"
//             className="text-white/70 font-orbitron text-xs text-center"
//           >
//             bg: none
//           </AccentFrame>
//           <AccentFrame
//             color="cyan"
//             bgVariant="subtle"
//             className="text-white/70 font-orbitron text-xs text-center"
//           >
//             bg: subtle
//           </AccentFrame>
//           <AccentFrame
//             color="cyan"
//             bgVariant="solid"
//             className="text-white/70 font-orbitron text-xs text-center"
//           >
//             bg: solid
//           </AccentFrame>
//           <AccentFrame
//             color="pink"
//             cornerStyle="rounded"
//             mode="quad"
//             hoverEffect="glow"
//             className="text-white/70 font-orbitron text-xs text-center"
//           >
//             rounded tips
//           </AccentFrame>
//         </div>
//       </div>

//       {/* Corner geometry */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Corner Geometry
//         </p>
//         <div className="grid grid-cols-3 gap-6">
//           <AccentFrame
//             color="cyan"
//             cornerLength={8}
//             cornerThickness={1}
//             hoverLength={16}
//             className="text-white/60 font-orbitron text-xs text-center"
//           >
//             Thin short
//           </AccentFrame>
//           <AccentFrame
//             color="cyan"
//             cornerLength={24}
//             cornerThickness={3}
//             hoverLength={48}
//             className="text-white/60 font-orbitron text-xs text-center"
//           >
//             Thick long
//           </AccentFrame>
//           <AccentFrame
//             color="pink"
//             colorB="green"
//             cornerLength={20}
//             cornerThickness={4}
//             mode="quad"
//             hoverEffect="pulse"
//             animated
//             className="text-white/60 font-orbitron text-xs text-center"
//           >
//             Thick quad pulse
//           </AccentFrame>
//         </div>
//       </div>
//     </div>
//   ),
//   "glitch-text": () => (
//     <div className="flex flex-col gap-12 w-full">
//       {/* Modes */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Modes (active vs hover)
//         </p>
//         <div className="flex flex-wrap gap-10 items-center">
//           <div className="text-3xl font-bold font-orbitron uppercase text-white">
//             <GlitchText text="Hover Me" mode="hover">
//               Hover Me
//             </GlitchText>
//           </div>
//           <div className="text-3xl font-bold font-orbitron uppercase text-white">
//             <GlitchText text="Always On" mode="active">
//               Always On
//             </GlitchText>
//           </div>
//         </div>
//       </div>

//       {/* Intensity */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Intensity (hover each)
//         </p>
//         <div className="flex flex-wrap gap-10 items-center">
//           {(["subtle", "normal", "heavy", "chaos"] as const).map((i) => (
//             <div
//               key={i}
//               className="text-2xl font-bold font-orbitron uppercase text-white"
//             >
//               <GlitchText text={i} mode="hover" intensity={i}>
//                 {i}
//               </GlitchText>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Speed */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Speed — active mode
//         </p>
//         <div className="flex flex-wrap gap-10 items-center">
//           {(["slow", "normal", "fast", "frenzy"] as const).map((s) => (
//             <div
//               key={s}
//               className="text-2xl font-bold font-orbitron uppercase text-white"
//             >
//               <GlitchText text={s} mode="active" speed={s}>
//                 {s}
//               </GlitchText>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Colors */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Custom channel colors (hover)
//         </p>
//         <div className="flex flex-wrap gap-10 items-center">
//           <div className="text-2xl font-bold font-orbitron uppercase text-white">
//             <GlitchText text="Default" mode="hover">
//               Default
//             </GlitchText>
//           </div>
//           <div className="text-2xl font-bold font-orbitron uppercase text-white">
//             <GlitchText
//               text="Pink/Green"
//               colorA="pink"
//               colorB="green"
//               mode="hover"
//             >
//               Pink/Green
//             </GlitchText>
//           </div>
//           <div className="text-2xl font-bold font-orbitron uppercase text-[#ff6600]">
//             <GlitchText
//               text="Custom"
//               colorA="#ff6600"
//               colorB="#ffe000"
//               offset={3}
//               mode="hover"
//             >
//               Custom
//             </GlitchText>
//           </div>
//         </div>
//       </div>

//       {/* Neon glow */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Neon Glow add-on
//         </p>
//         <div className="flex flex-wrap gap-10 items-center">
//           <div className="text-3xl font-bold font-orbitron uppercase text-[#00f3ff]">
//             <GlitchText text="Neon Glow" mode="hover" neon glowColor="cyan">
//               Neon Glow
//             </GlitchText>
//           </div>
//           <div className="text-3xl font-bold font-orbitron uppercase text-[#ff00ff]">
//             <GlitchText
//               text="Neon Flicker"
//               mode="active"
//               neon
//               neonFlicker
//               glowColor="pink"
//               intensity="heavy"
//             >
//               Neon Flicker
//             </GlitchText>
//           </div>
//           <div className="text-3xl font-bold font-orbitron uppercase text-[#39ff14]">
//             <GlitchText
//               text="Chaos Neon"
//               mode="active"
//               neon
//               glowColor="green"
//               intensity="chaos"
//               speed="fast"
//             >
//               Chaos Neon
//             </GlitchText>
//           </div>
//         </div>
//       </div>
//     </div>
//   ),
//   "corner-cut-button": () => (
//     <div className="flex flex-col gap-10 w-full">
//       {/* Variants */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Variants
//         </p>
//         <div className="flex flex-wrap gap-4 items-center">
//           <CornerCutButton variant="solid" color="cyan">
//             Solid Cyan
//           </CornerCutButton>
//           <CornerCutButton variant="outline" color="cyan">
//             Outline Cyan
//           </CornerCutButton>
//           <CornerCutButton variant="ghost" color="cyan">
//             Ghost Cyan
//           </CornerCutButton>
//         </div>
//       </div>
//       {/* Colors */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Colors
//         </p>
//         <div className="flex flex-wrap gap-4 items-center">
//           <CornerCutButton color="cyan">Cyan</CornerCutButton>
//           <CornerCutButton color="pink">Pink</CornerCutButton>
//           <CornerCutButton color="green">Green</CornerCutButton>
//           <CornerCutButton color="#ff6600">Custom #ff6600</CornerCutButton>
//         </div>
//       </div>
//       {/* Sizes */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Sizes
//         </p>
//         <div className="flex flex-wrap gap-4 items-end">
//           <CornerCutButton size="xs" color="cyan">
//             XSmall
//           </CornerCutButton>
//           <CornerCutButton size="sm" color="cyan">
//             Small
//           </CornerCutButton>
//           <CornerCutButton size="md" color="cyan">
//             Medium
//           </CornerCutButton>
//           <CornerCutButton size="lg" color="cyan">
//             Large
//           </CornerCutButton>
//           <CornerCutButton size="xl" color="cyan">
//             XLarge
//           </CornerCutButton>
//         </div>
//       </div>
//       {/* Corners */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Corners
//         </p>
//         <div className="flex flex-wrap gap-4 items-center">
//           <CornerCutButton corner="bottom-right" color="pink">
//             Bottom Right
//           </CornerCutButton>
//           <CornerCutButton corner="bottom-left" color="pink">
//             Bottom Left
//           </CornerCutButton>
//           <CornerCutButton corner="top-right" color="pink">
//             Top Right
//           </CornerCutButton>
//           <CornerCutButton corner="top-left" color="pink">
//             Top Left
//           </CornerCutButton>
//           <CornerCutButton corner="all" color="pink">
//             All Corners
//           </CornerCutButton>
//         </div>
//       </div>
//       {/* Hover effects */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Hover Effects (hover each)
//         </p>
//         <div className="flex flex-wrap gap-4 items-center">
//           <CornerCutButton hoverEffect="glow" color="cyan">
//             Glow
//           </CornerCutButton>
//           <CornerCutButton hoverEffect="shift" color="cyan" variant="outline">
//             Shift
//           </CornerCutButton>
//           <CornerCutButton hoverEffect="shine" color="cyan">
//             Shine
//           </CornerCutButton>
//           <CornerCutButton hoverEffect="pulse" color="green">
//             Pulse
//           </CornerCutButton>
//           <CornerCutButton hoverEffect="scan" color="pink">
//             Scan
//           </CornerCutButton>
//           <CornerCutButton hoverEffect="flicker" color="pink" variant="outline">
//             Flicker
//           </CornerCutButton>
//         </div>
//       </div>
//       {/* Arrow + Hero replica */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           With Arrow / Hero style
//         </p>
//         <div className="flex flex-wrap gap-4 items-center">
//           <CornerCutButton color="cyan" showArrow hoverEffect="glow">
//             Explore Components
//           </CornerCutButton>
//           <CornerCutButton
//             color="pink"
//             variant="outline"
//             showArrow
//             hoverEffect="shift"
//           >
//             View Docs
//           </CornerCutButton>
//           <CornerCutButton
//             color="green"
//             variant="ghost"
//             showArrow
//             hoverEffect="scan"
//             glowIntensity="high"
//           >
//             Get Started
//           </CornerCutButton>
//         </div>
//       </div>
//     </div>
//   ),
//   "neon-glow-corner-cut-card": () => (
//     <div className="flex flex-col gap-12 w-full">
//       {/* Hover Effects */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Hover Effects (hover each card)
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           <NeonGlowCornerCutCard
//             title="Gradient"
//             description="Dual-color gradient glow backdrop on hover."
//             hoverEffect="gradient"
//             colorA="cyan"
//             colorB="pink"
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-full h-full"
//               >
//                 <rect x="2" y="3" width="20" height="14" rx="2" />
//                 <line x1="8" y1="21" x2="16" y2="21" />
//                 <line x1="12" y1="17" x2="12" y2="21" />
//               </svg>
//             }
//           />
//           <NeonGlowCornerCutCard
//             title="Solid"
//             description="Single accent-color backdrop on hover."
//             hoverEffect="solid"
//             colorA="pink"
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-full h-full"
//               >
//                 <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//               </svg>
//             }
//           />
//           <NeonGlowCornerCutCard
//             title="Glow Only"
//             description="Box-shadow glow — no backdrop layer."
//             hoverEffect="glow-only"
//             colorA="green"
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-full h-full"
//               >
//                 <circle cx="12" cy="12" r="10" />
//                 <line x1="12" y1="8" x2="12" y2="12" />
//                 <line x1="12" y1="16" x2="12.01" y2="16" />
//               </svg>
//             }
//           />
//           <NeonGlowCornerCutCard
//             title="Pulse"
//             description="Continuously pulsing glow while hovered."
//             hoverEffect="pulse"
//             colorA="cyan"
//             glowIntensity="high"
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-full h-full"
//               >
//                 <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
//               </svg>
//             }
//           />
//           <NeonGlowCornerCutCard
//             title="Trace"
//             description="Gradient with animated hue rotation."
//             hoverEffect="trace"
//             colorA="pink"
//             colorB="cyan"
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-full h-full"
//               >
//                 <path d="M12 2L2 7l10 5 10-5-10-5z" />
//                 <path d="M2 17l10 5 10-5" />
//                 <path d="M2 12l10 5 10-5" />
//               </svg>
//             }
//           />
//           <NeonGlowCornerCutCard
//             title="None"
//             description="No glow — icon and title transitions only."
//             hoverEffect="none"
//             colorA="cyan"
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-full h-full"
//               >
//                 <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
//               </svg>
//             }
//           />
//         </div>
//       </div>

//       {/* Colors */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Colors
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <NeonGlowCornerCutCard
//             title="Cyan / Pink"
//             colorA="cyan"
//             colorB="pink"
//             description="Default gradient preset."
//           />
//           <NeonGlowCornerCutCard
//             title="Pink / Cyan"
//             colorA="pink"
//             colorB="cyan"
//             description="Reversed gradient."
//           />
//           <NeonGlowCornerCutCard
//             title="Green / Cyan"
//             colorA="green"
//             colorB="cyan"
//             description="Neon green accent."
//           />
//           <NeonGlowCornerCutCard
//             title="Custom"
//             colorA="#ff6600"
//             colorB="#ffe000"
//             description="Any CSS color value."
//           />
//         </div>
//       </div>

//       {/* Sizes */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Sizes
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
//           <NeonGlowCornerCutCard
//             size="sm"
//             title="Small"
//             description="Compact padding."
//             colorA="cyan"
//           />
//           <NeonGlowCornerCutCard
//             size="md"
//             title="Medium"
//             description="Default size."
//             colorA="cyan"
//           />
//           <NeonGlowCornerCutCard
//             size="lg"
//             title="Large"
//             description="More breathing room."
//             colorA="cyan"
//           />
//           <NeonGlowCornerCutCard
//             size="xl"
//             title="XLarge"
//             description="Maximum padding."
//             colorA="cyan"
//           />
//         </div>
//       </div>

//       {/* Corners */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Corners
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           <NeonGlowCornerCutCard
//             corner="bottom-right"
//             title="BR Cut"
//             colorA="pink"
//           />
//           <NeonGlowCornerCutCard
//             corner="bottom-left"
//             title="BL Cut"
//             colorA="pink"
//           />
//           <NeonGlowCornerCutCard
//             corner="top-right"
//             title="TR Cut"
//             colorA="pink"
//           />
//           <NeonGlowCornerCutCard
//             corner="top-left"
//             title="TL Cut"
//             colorA="pink"
//           />
//           <NeonGlowCornerCutCard corner="all" title="All Cut" colorA="pink" />
//         </div>
//       </div>

//       {/* Hero replica — with icon */}
//       <div className="space-y-3">
//         <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
//           Hero replica (Features grid style)
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <NeonGlowCornerCutCard
//             title="CLI Installation"
//             description="Install components directly into your project via CLI without bloated dependencies."
//             colorA="cyan"
//             colorB="pink"
//             hoverEffect="gradient"
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-full h-full"
//               >
//                 <polyline points="4 17 10 11 4 5" />
//                 <line x1="12" y1="19" x2="20" y2="19" />
//               </svg>
//             }
//           />
//           <NeonGlowCornerCutCard
//             title="Futuristic Aesthetics"
//             description="High-end, dynamic UI featuring clip-paths, neon glows, and micro-animations."
//             colorA="pink"
//             colorB="cyan"
//             hoverEffect="gradient"
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-full h-full"
//               >
//                 <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//               </svg>
//             }
//           />
//         </div>
//       </div>
//     </div>
//   ),
// };

// const usageMap: Record<string, string> = {
//   "datalines-with-grid": `import { DatalinesWithGrid } from "@/lib/components/ui/backgrounds/DatalinesWithGrid";\n\nexport default function App() {\n  return (\n    <div className="relative w-screen h-screen">\n      <DatalinesWithGrid />\n    </div>\n  );\n}`,
//   "ascii-rain": `import { AsciiRain } from "@/lib/components/ui/backgrounds/AsciiRain";\n\nexport default function App() {\n  return (\n    <div className="relative w-screen h-screen">\n      <AsciiRain />\n    </div>\n  );\n}`,
//   "border-beam-corner-cut-card": `import BorderBeamCornerCutCard from "@/lib/components/ui/cards/BorderBeamCornerCutCard";\nimport { Terminal, Zap } from "lucide-react";\n\nexport default function App() {\n  return (\n    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">\n      {/* Default single beam with icon/title/description */}\n      <BorderBeamCornerCutCard\n        beamColor="pink"\n        title="CLI Installation"\n        description="Install components directly into your project via CLI."\n        icon={<Terminal className="w-full h-full" />}\n      />\n\n      {/* Dual counter-rotating beams */}\n      <BorderBeamCornerCutCard\n        variant="dual"\n        beamColor="cyan"\n        beamColorB="pink"\n        title="Fast Setup"\n        description="Two beams rotating in opposite directions."\n        icon={<Zap className="w-full h-full" />}\n      />\n\n      {/* Gradient-sweep with high glow */}\n      <BorderBeamCornerCutCard\n        variant="gradient-sweep"\n        beamColor="pink"\n        beamColorB="cyan"\n        glowIntensity="high"\n        corner="all"\n        title="Gradient Sweep"\n        description="Wide blending beam, all corners cut, high glow."\n      />\n\n      {/* Rainbow + custom border width + custom corner depth */}\n      <BorderBeamCornerCutCard\n        variant="rainbow"\n        borderWidth="3px"\n        cornerSize={28}\n        duration={3}\n        title="Rainbow"\n        description="Full neon spectrum with hue rotation."\n      >\n        <p className="text-white/40 text-xs mt-2">Children slot.</p>\n      </BorderBeamCornerCutCard>\n    </div>\n  );\n}`,
//   "accent-frame": `import AccentFrame from "@/lib/components/ui/frames/AccentFrame";\n\nexport default function App() {\n  return (\n    <div className="flex flex-col gap-8">\n      {/* Default: expand on hover, duo corners */}\n      <AccentFrame color="cyan" className="text-white text-center">\n        Hover to expand\n      </AccentFrame>\n\n      {/* Quad corners + dual color + glow */}\n      <AccentFrame\n        color="cyan"\n        colorB="pink"\n        mode="quad"\n        hoverEffect="glow"\n        glowIntensity="high"\n        className="text-white text-center"\n      >\n        Quad dual-color glow\n      </AccentFrame>\n\n      {/* Always-animated pulse */}\n      <AccentFrame\n        color="pink"\n        mode="quad"\n        hoverEffect="pulse"\n        animated\n        bgVariant="subtle"\n        className="text-white text-center"\n      >\n        Always pulsing\n      </AccentFrame>\n\n      {/* Rounded corner tips, trace effect */}\n      <AccentFrame\n        color="green"\n        cornerStyle="rounded"\n        hoverEffect="trace"\n        cornerLength={24}\n        cornerThickness={3}\n        className="text-white text-center"\n      >\n        Rounded trace\n      </AccentFrame>\n    </div>\n  );\n}`,
//   "glitch-text": `import GlitchText from "@/lib/components/ui/text/GlitchText";\n\nexport default function App() {\n  return (\n    <div className="flex flex-col gap-8">\n      {/* hover mode, normal intensity (default) */}\n      <h2 className="text-4xl font-bold font-orbitron uppercase text-white">\n        <GlitchText text="Hover Glitch" mode="hover">\n          Hover Glitch\n        </GlitchText>\n      </h2>\n\n      {/* active + heavy + fast */}\n      <h2 className="text-4xl font-bold font-orbitron uppercase text-white">\n        <GlitchText text="Heavy Fast" mode="active" intensity="heavy" speed="fast">\n          Heavy Fast\n        </GlitchText>\n      </h2>\n\n      {/* chaos + custom colors */}\n      <h2 className="text-4xl font-bold font-orbitron uppercase text-[#ff6600]">\n        <GlitchText\n          text="Chaos"\n          mode="active"\n          intensity="chaos"\n          colorA="#ff6600"\n          colorB="#ffe000"\n          offset={4}\n        >\n          Chaos\n        </GlitchText>\n      </h2>\n\n      {/* neon glow + flicker */}\n      <h2 className="text-4xl font-bold font-orbitron uppercase text-[#00f3ff]">\n        <GlitchText\n          text="Neon"\n          mode="active"\n          neon\n          neonFlicker\n          glowColor="cyan"\n          intensity="heavy"\n        >\n          Neon\n        </GlitchText>\n      </h2>\n    </div>\n  );\n}`,
//   "corner-cut-button": `import CornerCutButton from "@/lib/components/ui/buttons/CornerCutButton";\n\nexport default function App() {\n  return (\n    <div className="flex gap-4 flex-wrap">\n      {/* Solid — matches the Hero "Explore Components" button */}\n      <CornerCutButton color="cyan" showArrow>\n        Explore Components\n      </CornerCutButton>\n\n      {/* Outline variant */}\n      <CornerCutButton color="pink" variant="outline" hoverEffect="shift">\n        View Docs\n      </CornerCutButton>\n\n      {/* Ghost with pulse glow */}\n      <CornerCutButton color="green" variant="ghost" hoverEffect="pulse" glowIntensity="high">\n        Get Started\n      </CornerCutButton>\n\n      {/* Custom color + all-corner cut */}\n      <CornerCutButton color="#ff6600" corner="all" size="lg" hoverEffect="shine">\n        Custom\n      </CornerCutButton>\n    </div>\n  );\n}`,
//   "neon-glow-corner-cut-card": `import NeonGlowCornerCutCard from "@/lib/components/ui/cards/NeonGlowCornerCutCard";\nimport { Terminal, Zap } from "lucide-react";\n\nexport default function App() {\n  return (\n    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">\n      <NeonGlowCornerCutCard\n        title="CLI Installation"\n        description="Install components directly into your project via CLI."\n        colorA="cyan"\n        colorB="pink"\n        hoverEffect="gradient"\n        icon={<Terminal className="w-full h-full" />}\n      />\n\n      {/* Solid hover, green accent */}\n      <NeonGlowCornerCutCard\n        title="Fast Setup"\n        description="Getting a futuristic UI has never been faster."\n        colorA="green"\n        hoverEffect="solid"\n        icon={<Zap className="w-full h-full" />}\n      />\n\n      {/* Pulse hover, high intensity */}\n      <NeonGlowCornerCutCard\n        title="Neon Pulse"\n        description="Continuously pulsing glow on hover, high intensity."\n        colorA="pink"\n        hoverEffect="pulse"\n        glowIntensity="high"\n        corner="all"\n      />\n\n      {/* Custom color, glow-only, children slot */}\n      <NeonGlowCornerCutCard\n        title="Custom"\n        colorA="#ff6600"\n        colorB="#ffe000"\n        hoverEffect="glow-only"\n        size="lg"\n      >\n        <p className="text-white/50 text-sm">Children slot content.</p>\n      </NeonGlowCornerCutCard>\n    </div>\n  );\n}`,
// };

// type PropDefinition = {
//   name: string;
//   type: string;
//   default?: string;
//   description: string;
// };

// const propsMap: Record<string, PropDefinition[]> = {
//   "datalines-with-grid": [
//     {
//       name: "lineColor",
//       type: "string",
//       default: '"#00f3ff"',
//       description: "The color for the line tracers.",
//     },
//     {
//       name: "shadowColor",
//       type: "string",
//       default: '"#00f3ff"',
//       description: "The hex color for the trail shadow.",
//     },
//     {
//       name: "bgGridColor",
//       type: "string",
//       default: '"rgba(255,255,255,0.05)"',
//       description: "Color for the grid cells border.",
//     },
//     {
//       name: "cellSize",
//       type: "number",
//       default: "50",
//       description: "Size of the simulated grid tiles.",
//     },
//     {
//       name: "maxLines",
//       type: "number",
//       default: "15",
//       description: "Maximum number of simultaneous data lines.",
//     },
//     {
//       name: "baseSpeed",
//       type: "number",
//       default: "2",
//       description: "Flow speed multiplier.",
//     },
//     {
//       name: "spawnProbability",
//       type: "number",
//       default: "0.1",
//       description: "Chance per frame to spawn a new line.",
//     },
//     {
//       name: "overlay",
//       type: "boolean",
//       default: "false",
//       description: "Whether to overlay the grid on top of existing content.",
//     },
//   ],
//   "ascii-rain": [
//     {
//       name: "textColor",
//       type: "string",
//       default: '"#d43dd4ff"',
//       description: "Color of the falling text.",
//     },
//     {
//       name: "bgColor",
//       type: "string",
//       default: '"rgba(0, 0, 0, 0.05)"',
//       description: "Background masking color for creating character trails.",
//     },
//     {
//       name: "fontSize",
//       type: "number",
//       default: "14",
//       description: "Width and font-size of the columns.",
//     },
//     {
//       name: "speed",
//       type: "number",
//       default: "33",
//       description: "Milliseconds between each rendering frame.",
//     },
//     {
//       name: "characters",
//       type: "string",
//       default: '"ABC.."',
//       description: "A string slice representing possible characters.",
//     },
//     {
//       name: "opacity",
//       type: "number",
//       default: "60",
//       description: "Base visual opacity constraint scaling to 100.",
//     },
//   ],
//   "accent-frame": [
//     {
//       name: "color",
//       type: '"cyan" | "pink" | "green" | string',
//       default: '"cyan"',
//       description: "Primary corner accent color. Preset name or any CSS color.",
//     },
//     {
//       name: "colorB",
//       type: '"cyan" | "pink" | "green" | string',
//       description:
//         "Secondary accent color for the opposite-diagonal bracket pair. Defaults to the primary color.",
//     },
//     {
//       name: "mode",
//       type: '"duo" | "quad"',
//       default: '"duo"',
//       description:
//         '"duo" renders top-left + bottom-right corners. "quad" renders all four.',
//     },
//     {
//       name: "hoverEffect",
//       type: '"expand" | "glow" | "pulse" | "flicker" | "trace" | "none"',
//       default: '"expand"',
//       description:
//         'Hover animation on the corner brackets. "expand" grows the arms, "glow" adds a neon shadow, "pulse" breathes in glow, "flicker" neon-flickers, "trace" chases a highlight along the arm.',
//     },
//     {
//       name: "glowIntensity",
//       type: '"low" | "medium" | "high"',
//       default: '"medium"',
//       description: "Controls the spread radius of glow/pulse effects.",
//     },
//     {
//       name: "animated",
//       type: "boolean",
//       default: "false",
//       description:
//         "When true the chosen hoverEffect runs continuously without requiring hover.",
//     },
//     {
//       name: "bgVariant",
//       type: '"none" | "subtle" | "solid"',
//       default: '"none"',
//       description:
//         '"subtle" adds a faint accent-tinted fill; "solid" adds a #0a0a0a dark fill.',
//     },
//     {
//       name: "cornerStyle",
//       type: '"square" | "rounded"',
//       default: '"square"',
//       description: "Square or rounded bracket tip ends.",
//     },
//     {
//       name: "cornerLength",
//       type: "number",
//       default: "16",
//       description: "Base arm length of each bracket in px.",
//     },
//     {
//       name: "cornerThickness",
//       type: "number",
//       default: "2",
//       description: "Stroke thickness of the bracket in px.",
//     },
//     {
//       name: "hoverLength",
//       type: "number",
//       default: "32",
//       description: 'Arm length when expanded (hoverEffect="expand") in px.',
//     },
//     {
//       name: "transitionDuration",
//       type: "number",
//       default: "300",
//       description: "Expand / transition animation speed in ms.",
//     },
//   ],
//   "border-beam-corner-cut-card": [
//     {
//       name: "children",
//       type: "ReactNode",
//       description:
//         "Free-form slot rendered below the optional title/description.",
//     },
//     {
//       name: "icon",
//       type: "ReactNode",
//       description:
//         "Element rendered inside the top icon box (e.g. a Lucide icon).",
//     },
//     { name: "title", type: "string", description: "Card heading text." },
//     {
//       name: "description",
//       type: "string",
//       description: "Body copy rendered below the title.",
//     },
//     {
//       name: "beamColor",
//       type: '"cyan" | "pink" | "green" | string',
//       default: '"pink"',
//       description: "Primary beam color. Preset name or any CSS color.",
//     },
//     {
//       name: "beamColorB",
//       type: '"cyan" | "pink" | "green" | string',
//       default: '"cyan"',
//       description:
//         'Secondary beam color used in "dual" and "gradient-sweep" variants.',
//     },
//     {
//       name: "variant",
//       type: '"single" | "dual" | "gradient-sweep" | "rainbow" | "pulse"',
//       default: '"single"',
//       description:
//         'Beam animation style. "dual" spins two beams in opposite directions; "gradient-sweep" blends colorA→colorB; "rainbow" cycles all neon hues; "pulse" breathes in opacity.',
//     },
//     {
//       name: "duration",
//       type: "number",
//       default: "4",
//       description: "Primary beam rotation speed in seconds.",
//     },
//     {
//       name: "durationB",
//       type: "number",
//       default: "6",
//       description:
//         "Secondary beam rotation speed in seconds (dual variant only).",
//     },
//     {
//       name: "borderWidth",
//       type: "number | string",
//       default: '"2px"',
//       description:
//         "Visible beam border width — becomes the padding between outer and inner card.",
//     },
//     {
//       name: "size",
//       type: '"sm" | "md" | "lg" | "xl"',
//       default: '"md"',
//       description: "Controls inner padding, icon box size and font sizes.",
//     },
//     {
//       name: "corner",
//       type: '"bottom-right" | "bottom-left" | "top-right" | "top-left" | "all"',
//       default: '"bottom-right"',
//       description: "Which corner(s) receive the diagonal cut.",
//     },
//     {
//       name: "cornerSize",
//       type: "number",
//       default: "20",
//       description: "Depth of the diagonal corner cut in pixels.",
//     },
//     {
//       name: "glowIntensity",
//       type: '"none" | "low" | "medium" | "high"',
//       default: '"medium"',
//       description: "Ambient neon glow spread on the inner card surface.",
//     },
//     {
//       name: "bgColor",
//       type: "string",
//       description:
//         "Override the inner card background color (default: var(--background)).",
//     },
//     {
//       name: "innerClassName",
//       type: "string",
//       default: '""',
//       description: "Extra className applied to the inner content div.",
//     },
//   ],
//   "glitch-text": [
//     {
//       name: "text",
//       type: "string",
//       description:
//         "String passed to data-text — must match the children text for the CSS pseudo-element channels to line up.",
//     },
//     {
//       name: "mode",
//       type: '"hover" | "active"',
//       default: '"hover"',
//       description:
//         '"hover" plays the glitch only while hovered. "active" plays continuously.',
//     },
//     {
//       name: "intensity",
//       type: '"subtle" | "normal" | "heavy" | "chaos"',
//       default: '"normal"',
//       description:
//         'Displacement amount of the RGB-split channels. "chaos" uses a full-cycle keyframe with skew.',
//     },
//     {
//       name: "speed",
//       type: '"slow" | "normal" | "fast" | "frenzy"',
//       default: '"normal"',
//       description:
//         "Animation loop speed shorthand (2 s / 1 s / 0.45 s / 0.2 s).",
//     },
//     {
//       name: "customSpeed",
//       type: "string",
//       description:
//         'Explicit CSS duration string (e.g. "1.5s") — overrides speed.',
//     },
//     {
//       name: "colorA",
//       type: '"cyan" | "pink" | "green" | string',
//       default: '"pink"',
//       description:
//         "Color of the ::before channel text-shadow (preset or CSS color).",
//     },
//     {
//       name: "colorB",
//       type: '"cyan" | "pink" | "green" | string',
//       default: '"cyan"',
//       description:
//         "Color of the ::after channel text-shadow (preset or CSS color).",
//     },
//     {
//       name: "offset",
//       type: "number",
//       default: "2",
//       description: "Horizontal split offset of the RGB channels in px.",
//     },
//     {
//       name: "neon",
//       type: "boolean",
//       default: "false",
//       description: "Adds a neon text-shadow glow around the text.",
//     },
//     {
//       name: "neonFlicker",
//       type: "boolean",
//       default: "false",
//       description:
//         "When neon is true, also animates a neon-flicker on the glow.",
//     },
//     {
//       name: "glowColor",
//       type: '"cyan" | "pink" | "green" | string',
//       description: "Color of the neon glow (defaults to colorB).",
//     },
//     {
//       name: "glitchDuration",
//       type: "number",
//       description:
//         "(Deprecated) Legacy loop duration in seconds. Use speed or customSpeed instead.",
//     },
//   ],
//   "corner-cut-button": [
//     {
//       name: "children",
//       type: "ReactNode",
//       description: "Button label content.",
//     },
//     {
//       name: "color",
//       type: '"cyan" | "pink" | "green" | string',
//       default: '"cyan"',
//       description:
//         'Accent color — use a preset name or any valid CSS color (e.g. "#ff4400").',
//     },
//     {
//       name: "size",
//       type: '"xs" | "sm" | "md" | "lg" | "xl"',
//       default: '"md"',
//       description: "Controls padding and font size.",
//     },
//     {
//       name: "variant",
//       type: '"solid" | "outline" | "ghost"',
//       default: '"solid"',
//       description:
//         "Visual style. solid fills with the accent color (matches the Hero button), outline adds a border, ghost is subtly tinted.",
//     },
//     {
//       name: "corner",
//       type: '"bottom-right" | "bottom-left" | "top-right" | "top-left" | "all"',
//       default: '"bottom-right"',
//       description: "Which corner(s) receive the diagonal cut.",
//     },
//     {
//       name: "cornerSize",
//       type: "number",
//       default: "20",
//       description: "Depth of the corner diagonal cut in pixels.",
//     },
//     {
//       name: "hoverEffect",
//       type: '"glow" | "shift" | "shine" | "pulse" | "scan" | "flicker" | "none"',
//       default: '"glow"',
//       description: "Hover animation preset applied to the button.",
//     },
//     {
//       name: "glowIntensity",
//       type: '"low" | "medium" | "high"',
//       default: '"medium"',
//       description: "Spread radius of neon glow effects.",
//     },
//     {
//       name: "showArrow",
//       type: "boolean",
//       default: "false",
//       description: "Appends a → arrow that slides right on hover.",
//     },
//   ],
//   "neon-glow-corner-cut-card": [
//     {
//       name: "children",
//       type: "ReactNode",
//       description:
//         "Free-form slot rendered below title/description. Use alone for a fully custom card body.",
//     },
//     {
//       name: "icon",
//       type: "ReactNode",
//       description:
//         "Element rendered inside the top icon box (e.g. a Lucide icon).",
//     },
//     { name: "title", type: "string", description: "Card heading text." },
//     {
//       name: "description",
//       type: "string",
//       description: "Body copy rendered below the title.",
//     },
//     {
//       name: "colorA",
//       type: '"cyan" | "pink" | "green" | string',
//       default: '"cyan"',
//       description:
//         "Gradient start color and icon/title glow color. Accept preset names or any CSS color.",
//     },
//     {
//       name: "colorB",
//       type: '"cyan" | "pink" | "green" | string',
//       default: '"pink"',
//       description:
//         'Gradient end color used in "gradient" and "trace" hover effects.',
//     },
//     {
//       name: "size",
//       type: '"sm" | "md" | "lg" | "xl"',
//       default: '"md"',
//       description: "Controls inner card padding, icon box, and font sizes.",
//     },
//     {
//       name: "corner",
//       type: '"bottom-right" | "bottom-left" | "top-right" | "top-left" | "all"',
//       default: '"bottom-right"',
//       description: "Which corner(s) receive the diagonal cut.",
//     },
//     {
//       name: "cornerSize",
//       type: "number",
//       default: "20",
//       description: "Depth of the diagonal corner cut in pixels.",
//     },
//     {
//       name: "hoverEffect",
//       type: '"gradient" | "solid" | "glow-only" | "pulse" | "trace" | "none"',
//       default: '"gradient"',
//       description:
//         'Hover glow style. "gradient" matches the Features.tsx card exactly.',
//     },
//     {
//       name: "glowIntensity",
//       type: '"low" | "medium" | "high"',
//       default: '"medium"',
//       description: "Spread radius of the neon glow effects.",
//     },
//     {
//       name: "bgColor",
//       type: "string",
//       description:
//         "Override the inner card background color (default: #0a0a0a).",
//     },
//   ],
// };

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  // Validate path
  const c = categories
    .find((cat) => cat.slug === category)
    ?.components.find((comp) => comp.slug === slug);
  if (!c) return notFound();

  const folderName = folderMap[slug];
  const { source, cssSource, meta } = await getComponentFiles(category, folderName);
  const DemoComponent = demoMap[slug];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24 animate-in fade-in duration-500 min-h-screen">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold font-orbitron text-white tracking-wide">
          {c.name}
        </h1>
        <p className="text-lg text-white/50">{c.description}</p>
      </div>

      {/* CLI Installation */}
      <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded corner-cut-bottom-left flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Terminal className="text-[#00f3ff] w-5 h-5" />
          <code className="text-sm font-mono text-white">
            npx neonblade add {slug}
          </code>
        </div>
        <CopyButton text={`npx neonblade add ${slug}`} />
      </div>

      <ComponentTabs
        source={source}
        cssSource={cssSource}
        usage={usageMap[slug]}
        dependencies={meta.dependencies || []}
      >
        <div className="w-full flex items-center justify-center p-8 bg-[#050505] min-h-[400px] border border-white/10 relative overflow-hidden">
          {DemoComponent && <DemoComponent />}
        </div>
      </ComponentTabs>

      {propsMap[slug] && (
        <div className="space-y-4 pt-8">
          <h2 className="text-2xl font-bold font-orbitron text-white mt-12 mb-6 border-b border-white/10 pb-2">
            Props Configuration
          </h2>
          <div className="overflow-x-auto border border-white/10 rounded corner-cut-top-right bg-[#050505]">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-4 text-[#00f3ff] font-orbitron font-semibold">
                    Prop
                  </th>
                  <th className="p-4 text-white/70 font-orbitron">Type</th>
                  <th className="p-4 text-white/70 font-orbitron">Default</th>
                  <th className="p-4 text-white/70 font-orbitron">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {propsMap[slug].map((prop) => (
                  <tr
                    key={prop.name}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <code className="text-white font-mono bg-white/5 px-2 py-1 rounded text-xs border border-white/10">
                        {prop.name}
                      </code>
                    </td>
                    <td className="p-4">
                      <code className="text-[#ff00ff] font-mono text-xs">
                        {prop.type}
                      </code>
                    </td>
                    <td className="p-4">
                      {prop.default ? (
                        <code className="text-[#00f3ff] font-mono text-xs bg-[#00f3ff]/10 px-1.5 py-0.5 rounded">
                          {prop.default}
                        </code>
                      ) : (
                        <span className="text-white/30 italic">-</span>
                      )}
                    </td>
                    <td className="p-4 text-white/60 font-light">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
