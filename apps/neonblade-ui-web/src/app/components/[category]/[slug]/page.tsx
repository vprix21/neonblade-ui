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
import ComponentTabs from "@/components/DocTabs"; // We will create this
import { Terminal } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";

async function getComponentFiles(category: string, folderName: string) {
  try {
    const basePath = path.join(process.cwd(), "src/lib/components/ui", category, folderName);
    
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

    // Read meta
    const metaPath = path.join(basePath, "meta.json");
    const meta = JSON.parse(await fs.readFile(metaPath, "utf-8"));

    return { source, meta };
  } catch (error) {
    return { source: "", meta: {} };
  }
}

// Map slugs to folder names
const folderMap: Record<string, string> = {
  "datalines-with-grid": "DatalinesWithGrid",
  "ascii-rain": "AsciiRain",
  "border-beam-corner-cut-card": "BorderBeamCornerCutCard",
  "accent-frame": "AccentFrame",
  "glitch-text": "GlitchText"
};

const demoMap: Record<string, React.FC> = {
  "datalines-with-grid": () => <div className="h-96 w-full relative"><DatalinesWithGrid /></div>,
  "ascii-rain": () => <div className="h-96 w-full relative"><AsciiRain /></div>,
  "border-beam-corner-cut-card": () => (
    <div className="max-w-md w-full mx-auto">
      <BorderBeamCornerCutCard className="h-64" duration={3}>
        <div className="flex items-center justify-center h-full text-white/50">
          Content goes here
        </div>
      </BorderBeamCornerCutCard>
    </div>
  ),
  "accent-frame": () => (
    <AccentFrame color="#00f3ff" className="text-white">
      Wrapped with Accent Frame
    </AccentFrame>
  ),
  "glitch-text": () => (
    <div className="text-4xl font-bold text-white uppercase font-orbitron">
      <GlitchText text="Cyber Glitch" glitchDuration={4} mode="hover">
        Cyber Glitch
      </GlitchText>
    </div>
  ),
};

const usageMap: Record<string, string> = {
  "datalines-with-grid": `import { DatalinesWithGrid } from "@/lib/components/ui/backgrounds/DatalinesWithGrid";\n\nexport default function App() {\n  return (\n    <div className="relative w-screen h-screen">\n      <DatalinesWithGrid />\n    </div>\n  );\n}`,
  "ascii-rain": `import { AsciiRain } from "@/lib/components/ui/backgrounds/AsciiRain";\n\nexport default function App() {\n  return (\n    <div className="relative w-screen h-screen">\n      <AsciiRain />\n    </div>\n  );\n}`,
  "border-beam-corner-cut-card": `import BorderBeamCornerCutCard from "@/lib/components/ui/cards/BorderBeamCornerCutCard";\n\nexport default function App() {\n  return (\n    <BorderBeamCornerCutCard duration={4} beamColor="#00f3ff">\n      <p>Cyberpunk content</p>\n    </BorderBeamCornerCutCard>\n  );\n}`,
  "accent-frame": `import AccentFrame from "@/lib/components/ui/frames/AccentFrame";\n\nexport default function App() {\n  return (\n    <AccentFrame color="#ff00ff">\n      <div>Framed block</div>\n    </AccentFrame>\n  );\n}`,
  "glitch-text": `import GlitchText from "@/lib/components/ui/text/GlitchText";\n\nexport default function App() {\n  return (\n    <h1 className="text-4xl">\n      <GlitchText text="Glitch!" mode="hover">Glitch!</GlitchText>\n    </h1>\n  );\n}`
};

type PropDefinition = { name: string; type: string; default?: string; description: string; };

const propsMap: Record<string, PropDefinition[]> = {
  "datalines-with-grid": [
    { name: "lineColor", type: "string", default: '"#00f3ff"', description: "The color for the line tracers." },
    { name: "shadowColor", type: "string", default: '"#00f3ff"', description: "The hex color for the trail shadow." },
    { name: "bgGridColor", type: "string", default: '"rgba(255,255,255,0.05)"', description: "Color for the grid cells border." },
    { name: "cellSize", type: "number", default: "50", description: "Size of the simulated grid tiles." },
    { name: "maxLines", type: "number", default: "15", description: "Maximum number of simultaneous data lines." },
    { name: "baseSpeed", type: "number", default: "2", description: "Flow speed multiplier." },
    { name: "spawnProbability", type: "number", default: "0.1", description: "Chance per frame to spawn a new line." }
  ],
  "ascii-rain": [
    { name: "textColor", type: "string", default: '"#d43dd4ff"', description: "Color of the falling text." },
    { name: "bgColor", type: "string", default: '"rgba(0, 0, 0, 0.05)"', description: "Background masking color for creating character trails." },
    { name: "fontSize", type: "number", default: "14", description: "Width and font-size of the columns." },
    { name: "speed", type: "number", default: "33", description: "Milliseconds between each rendering frame." },
    { name: "characters", type: "string", default: '"ABC.."', description: "A string slice representing possible characters." },
    { name: "opacity", type: "number", default: "60", description: "Base visual opacity constraint scaling to 100." }
  ],
  "accent-frame": [
    { name: "color", type: "string", default: '"#00f3ff"', description: "The hex value for the corner frame accents." },
    { name: "cornerLength", type: "number", default: "16", description: "Base length of the corner brackets." },
    { name: "cornerThickness", type: "number", default: "2", description: "Thickness dimension of the accent stroke." },
    { name: "hoverLength", type: "number", default: "32", description: "Length of the accent block when hovered." },
    { name: "transitionDuration", type: "number", default: "300", description: "Hover animation transition speed limit in ms." },
    { name: "mode", type: '"duo" | "quad"', default: '"duo"', description: "Number of corner brackets rendered." }
  ],
  "border-beam-corner-cut-card": [
    { name: "beamColor", type: "string", default: '"var(--neon-pink)"', description: "Color of the spinning border array." },
    { name: "duration", type: "number", default: "4", description: "In-seconds rotation frequency." },
    { name: "borderWidth", type: "number | string", default: '"2px"', description: "Space allocating the size of the animated border." },
    { name: "innerBgColor", type: "string", default: "undefined", description: "Explicit solid fill color for the inset space overriding defaults." },
    { name: "innerClassName", type: "string", default: '""', description: "Additional custom class names to inject to the core content node container." }
  ],
  "glitch-text": [
    { name: "text", type: "string", description: "The string text content to glitch." },
    { name: "glitchDuration", type: "number", default: "3", description: "Animation segment speed for keyframes." },
    { name: "mode", type: '"always" | "hover"', default: '"always"', description: "When the glitch sequence activates." },
    { name: "children", type: "ReactNode", description: "Children nodes for fallback overlay matching." }
  ]
};

export default async function ComponentPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  
  // Validate path
  const c = categories.find(cat => cat.slug === category)?.components.find(comp => comp.slug === slug);
  if (!c) return notFound();

  const folderName = folderMap[slug];
  const { source, meta } = await getComponentFiles(category, folderName);
  const DemoComponent = demoMap[slug];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24 animate-in fade-in duration-500 min-h-screen">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold font-orbitron text-white tracking-wide">
          {c.name}
        </h1>
        <p className="text-lg text-white/50">
          {c.description}
        </p>
      </div>
      
      {/* CLI Installation */}
      <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded corner-cut-bottom-left flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Terminal className="text-[#00f3ff] w-5 h-5" />
          <code className="text-sm font-mono text-white">npx neonblade add {slug}</code>
        </div>
        <CopyButton text={`npx neonblade add ${slug}`} />
      </div>

      <ComponentTabs 
        source={source} 
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
                  <th className="p-4 text-[#00f3ff] font-orbitron font-semibold">Prop</th>
                  <th className="p-4 text-white/70 font-orbitron">Type</th>
                  <th className="p-4 text-white/70 font-orbitron">Default</th>
                  <th className="p-4 text-white/70 font-orbitron">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {propsMap[slug].map((prop) => (
                  <tr key={prop.name} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <code className="text-white font-mono bg-white/5 px-2 py-1 rounded text-xs border border-white/10">{prop.name}</code>
                    </td>
                    <td className="p-4">
                      <code className="text-[#ff00ff] font-mono text-xs">{prop.type}</code>
                    </td>
                    <td className="p-4">
                      {prop.default ? (
                        <code className="text-[#00f3ff] font-mono text-xs bg-[#00f3ff]/10 px-1.5 py-0.5 rounded">{prop.default}</code>
                      ) : (
                        <span className="text-white/30 italic">-</span>
                      )}
                    </td>
                    <td className="p-4 text-white/60 font-light">{prop.description}</td>
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
