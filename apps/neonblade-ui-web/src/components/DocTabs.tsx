"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import NeonGlowCornerCutCard from "@/lib/components/ui/cards/NeonGlowCornerCutCard";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("css", css);

interface ComponentTabsProps {
  children: React.ReactNode;
  source: string;
  cssSource?: string;
  usage: string;
  dependencies: string[];
}

export default function DocTabs({
  children,
  source,
  cssSource,
  usage,
  dependencies,
}: ComponentTabsProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "source">(
    "preview",
  );
  const [copied, setCopied] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);

  const copyToClipboard = (
    text: string,
    setCopiedState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
      document.body.prepend(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (error) {
        console.error(error);
      } finally {
        textArea.remove();
      }
    }
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  const handleCopy = (text: string) => copyToClipboard(text, setCopied);
  const handleCopyCss = (text: string) => copyToClipboard(text, setCopiedCss);

  return (
    <div className="space-y-4 pt-6">
      <div className="flex border-b border-white/10 w-full overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab("preview")}
          className={`px-6 py-3 font-orbitron text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === "preview" ? "text-[#00f3ff] border-[#00f3ff]" : "text-white/60 border-transparent hover:text-white hover:border-white/20"}`}
        >
          Preview
        </button>
        <button
          onClick={() => setActiveTab("usage")}
          className={`px-6 py-3 font-orbitron text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === "usage" ? "text-[#00f3ff] border-[#00f3ff]" : "text-white/60 border-transparent hover:text-white hover:border-white/20"}`}
        >
          Usage
        </button>
        <button
          onClick={() => setActiveTab("source")}
          className={`px-6 py-3 font-orbitron text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === "source" ? "text-[#00f3ff] border-[#00f3ff]" : "text-white/60 border-transparent hover:text-white hover:border-white/20"}`}
        >
          Source Code
        </button>
      </div>

      <div className="relative mt-6 min-h-[400px]">
        {activeTab === "preview" && (
          <div className="animate-in fade-in duration-300">{children}</div>
        )}

        {activeTab === "usage" && (
          <div className="relative group animate-in fade-in duration-300">
            <button
              onClick={() => handleCopy(usage)}
              className="absolute top-4 right-6 p-2 text-white/50 hover:text-[#00f3ff] rounded transition-colors z-10"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#39ff14]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <SyntaxHighlighter
              language="tsx"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                background: "#0a0a0a",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              className="text-sm font-mono max-h-[600px] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] custom-scrollbar"
            >
              {usage}
            </SyntaxHighlighter>
          </div>
        )}

        {activeTab === "source" && (
          <div className="space-y-6">
            <div className="relative group animate-in fade-in duration-300">
              {cssSource && (
                <h3 className="text-white/70 font-orbitron mb-2 text-sm uppercase tracking-widest pl-2 border-l-2 border-[#00f3ff]">
                  Component
                </h3>
              )}
              <button
                onClick={() => handleCopy(source)}
                className={`absolute ${cssSource ? "top-10" : "top-4"} right-6 p-2 text-white/50 hover:text-[#00f3ff] rounded transition-colors z-10`}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-[#39ff14]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: "1.5rem",
                  background: "#0a0a0a",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                className="text-sm font-mono max-h-[600px] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] custom-scrollbar"
              >
                {source || "No source available."}
              </SyntaxHighlighter>
            </div>

            {cssSource && (
              <div className="relative group animate-in fade-in duration-300">
                <h3 className="text-white/70 font-orbitron mb-2 text-sm uppercase tracking-widest pl-2 border-l-2 border-[#ff00ff]">
                  CSS
                </h3>
                <button
                  onClick={() => handleCopyCss(cssSource)}
                  className="absolute top-10 right-6 p-2 text-white/50 hover:text-[#00f3ff] rounded transition-colors z-10"
                >
                  {copiedCss ? (
                    <Check className="w-4 h-4 text-[#39ff14]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <SyntaxHighlighter
                  language="css"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: "1.5rem",
                    background: "#0a0a0a",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  className="text-sm font-mono max-h-[600px] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] custom-scrollbar"
                >
                  {cssSource}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
        )}
      </div>

      {dependencies && dependencies.length > 0 && activeTab !== "preview" && (
        <div className="mt-8 pt-8 border-t border-white/5 select-none animate-in fade-in duration-300">
          <h4 className="text-xs font-orbitron text-white/40 mb-3 uppercase tracking-widest">
            Dependencies
          </h4>
          <div className="flex flex-wrap gap-2">
            {dependencies.map((dep: string) => (
              <span
                key={dep}
                className="px-3 py-1.5 bg-black border border-white/10 text-xs font-mono text-white/70 hover:text-[#00f3ff] hover:border-[#00f3ff]/50 transition-colors"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
