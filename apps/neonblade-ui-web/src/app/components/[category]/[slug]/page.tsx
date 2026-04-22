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
      const cssFile = files.find((f) => f.endsWith(".css"));
      if (cssFile) {
        cssSource = await fs.readFile(path.join(basePath, cssFile), "utf-8");
      }
    } catch {
      // Ignore if not found
    }

    // Read meta
    let meta: { dependencies?: string[]; [key: string]: unknown } = {
      dependencies: [],
    };
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
  const { source, cssSource, meta } = await getComponentFiles(
    category,
    folderName,
  );
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

      <NeonGlowCornerCutCard hoverEffect="none" size="sm">
        <div className="flex items-center gap-4 justify-between w-full">
          <div className="flex items-center gap-4">
            <Terminal className="text-[#00f3ff] w-5 h-5" />
            <code className="text-sm font-mono text-white">
              npx neonblade add {slug}
            </code>
          </div>
          <CopyButton text={`npx neonblade add ${slug}`} />
        </div>
      </NeonGlowCornerCutCard>

      <ComponentTabs
        source={source}
        cssSource={cssSource}
        usage={usageMap[slug]}
        dependencies={meta.dependencies || []}
      >
        <div
          className={`w-full flex items-center justify-center bg-[#050505] border border-white/10 relative ${slug === "navbar" ? "p-0 min-h-0 overflow-visible" : "p-8 min-h-[400px] overflow-hidden"}`}
        >
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
