"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check, Terminal, ArrowRight, ExternalLink } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiTypescript,
  SiNpm,
  SiPnpm,
  SiYarn,
} from "react-icons/si";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Badge from "@/lib/components/ui/badges/Badge";
import CornerCutButton from "@/lib/components/ui/buttons/CornerCutButton";

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("tsx", tsx);

function CodeBlock({
  code,
  language = "bash",
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code);
    } else {
      const el = document.createElement("textarea");
      el.value = code;
      el.style.position = "absolute";
      el.style.left = "-999999px";
      document.body.prepend(el);
      el.select();
      try {
        document.execCommand("copy");
      } finally {
        el.remove();
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-3">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.25rem 1.5rem",
          background: "#0a0a0a",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 0,
          fontSize: "0.875rem",
        }}
        className="corner-cut-bottom-right custom-scrollbar"
      >
        {code}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 text-white/30 hover:text-[#00f3ff] transition-colors z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <Check size={14} className="text-[#39ff14]" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  );
}

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08 },
  }),
};

const frameworks = [
  { icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { icon: SiReact, label: "React", color: "#61dafb" },
  { icon: SiVite, label: "Vite", color: "#a78bfa" },
  { icon: SiTypescript, label: "TypeScript", color: "#3b82f6" },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "#38bdf8" },
];

const packageManagers = [
  { icon: SiNpm, label: "npm", color: "#cb3837" },
  { icon: SiPnpm, label: "pnpm", color: "#f69220" },
  { icon: SiYarn, label: "yarn", color: "#2c8ebb" },
];

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[#00f3ff] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-32 pb-12">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Header */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-14 space-y-4"
          >
            {/* <span className="inline-flex items-center gap-2 px-3 py-1 border border-[#00f3ff]/30 bg-[#00f3ff]/5 text-[#00f3ff] text-xs font-orbitron tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-flicker" />
              Documentation
            </span> */}
            <Badge shape="corner-cut" color="cyan" dot="flicker">
              Documentation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-orbitron tracking-tight text-white mb-5 leading-tight">
              Get Started with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
                NeonBlade UI
              </span>
            </h1>
            <p className="text-white/50 text-xl leading-relaxed max-w-2xl">
              A futuristic React component library with sci-fi aesthetics built
              with Tailwind CSS. No wrappers. Just code that&apos;s yours.
            </p>
          </motion.div>

          <div className="w-full h-px bg-gradient-to-r from-[#00f3ff]/40 via-white/10 to-transparent mb-14" />

          {/* Section: The Rule */}
          <motion.section
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-14"
          >
            <h2 className="font-orbitron font-bold text-xl text-white mb-3 tracking-wide">
              <span className="text-[#00f3ff] mr-2">01</span>The Rule Is Simple
            </h2>
            <p className="text-white/55 leading-relaxed mb-4 ">
              NeonBlade UI has zero lock-in. Components are downloaded directly
              into your project — they live in your codebase, not inside a
              node_modules black box. The only real requirement is{" "}
              <span className="text-[#38bdf8] font-semibold">Tailwind CSS</span>
              . That&apos;s it. Install Tailwind, run the CLI, and you&apos;re
              building.
            </p>
            <ul className="space-y-2 text-white/55  leading-relaxed list-none">
              {[
                "Have Tailwind CSS set up in your project",
                "Run the CLI to add components",
                "Components drop straight into your source code",
                "Customise however you want — it's your code now",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ArrowRight
                    size={14}
                    className="text-[#00f3ff] mt-0.5 shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Section: Tailwind CSS */}
          <motion.section
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-14"
          >
            <h2 className="font-orbitron font-bold text-xl text-white mb-3 tracking-wide">
              <span className="text-[#00f3ff] mr-2">02</span>Installing Tailwind
              CSS
            </h2>
            <p className="text-white/55 leading-relaxed mb-5">
              NeonBlade UI is built on top of{" "}
              {/* <span className="inline-flex items-center gap-1.5"> */}
              <SiTailwindcss className="text-[#38bdf8] inline" size={14} />
              <span className="text-[#38bdf8] font-semibold">
                Tailwind CSS v4{" "}
              </span>
              {/* </span>{" "} */}
              as the primary styling engine. If you don&apos;t have it yet,
              here&apos;s how to get set up.
            </p>

            <p className="text-white/90 text-xs font-orbitron uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <SiNextdotjs size={14} className="inline" />
              Next.js
            </p>
            <CodeBlock code={`npm install tailwindcss @tailwindcss/postcss`} />
            <p className="text-white/50 text-xs font-mono mb-5">
              Then add{" "}
              <code className="text-white/50">{'@import "tailwindcss"'}</code>{" "}
              to your global CSS file.
            </p>

            <p className="text-white/90 text-xs font-orbitron uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <SiReact size={14} className="inline" color="#61dafb" />
              Vite (React)
            </p>
            <CodeBlock code={`npm install tailwindcss @tailwindcss/vite`} />
            <p className="text-white/50 text-xs font-mono mb-5">
              Add the Tailwind Vite plugin, then import Tailwind in your CSS
              entry.
            </p>

            <a
              href="https://tailwindcss.com/docs/installation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#00f3ff] hover:text-white border border-[#00f3ff]/30 hover:border-white/30 px-4 py-2 transition-all font-orbitron tracking-wide"
            >
              <SiTailwindcss size={14} />
              Tailwind CSS Official Docs
              <ExternalLink size={12} className="opacity-60" />
            </a>
          </motion.section>

          {/* Section: CLI */}
          <motion.section
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-14"
          >
            <h2 className="font-orbitron font-bold text-xl text-white mb-3 tracking-wide">
              <span className="text-[#00f3ff] mr-2">03</span>The NeonBlade CLI
            </h2>
            <p className="text-white/55 leading-relaxed mb-4 ">
              NeonBlade UI ships its{" "}
              <span className="text-white/50 font-semibold">own CLI</span>.
              It&apos;s built from scratch for NeonBlade and talks directly to
              our component registry. No config files, no init steps. Run it
              anywhere in your project.
            </p>

            <p className="text-white/90 text-xs font-orbitron uppercase tracking-widest mb-2">
              Add a component
            </p>
            <CodeBlock code={`npx neonblade add <component-name>`} />

            <p className="text-white/90 text-xs font-orbitron uppercase tracking-widest mb-2">
              List all available components
            </p>
            <CodeBlock code={`npx neonblade add`} />

            <p className="text-white/55 text-sm leading-relaxed mt-5">
              The CLI will automatically detect your package manager ({" "}
              <span className="inline-flex items-center gap-1">
                <SiNpm className="text-[#cb3837]" size={12} /> npm
              </span>
              ,{" "}
              <span className="inline-flex items-center gap-1">
                <SiPnpm className="text-[#f69220]" size={12} /> pnpm
              </span>
              ,{" "}
              <span className="inline-flex items-center gap-1">
                <SiYarn className="text-[#2c8ebb]" size={12} /> yarn
              </span>
              ) and install any required dependencies.
            </p>
          </motion.section>

          {/* Section: Example Usage */}
          <motion.section
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-14"
          >
            <h2 className="font-orbitron font-bold text-xl text-white mb-3 tracking-wide">
              <span className="text-[#00f3ff] mr-2">04</span>Example Usage
            </h2>
            <p className="text-white/55 leading-relaxed mb-4 ">
              Let&apos;s add the{" "}
              <code className="text-[#00f3ff] text-sm">corner-cut-button</code>{" "}
              component to your project:
            </p>
            <CodeBlock code={`npx neonblade add corner-cut-button`} />
            <p className="text-white/50 text-sm mb-4">
              The CLI fetches the files, installs dependencies, and places them
              in your project.
            </p>
            <p className="text-white/55 leading-relaxed mb-3">Then use it:</p>
            <CodeBlock
              language="tsx"
              code={`export default function Page() {
  return (
    <CornerCutButton>
      Hello, Future
    </CornerCutButton>
  );
}`}
            />
          </motion.section>

          {/* Section: Supported Frameworks */}
          <motion.section
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-14"
          >
            <h2 className="font-orbitron font-bold text-xl text-white mb-3 tracking-wide">
              <span className="text-[#00f3ff] mr-2">05</span>Supported
              Environments
            </h2>
            <p className="text-white/55 leading-relaxed mb-6 ">
              NeonBlade UI components are standard React components — anything
              that runs React and Tailwind CSS is supported. Here&apos;s what we
              directly test and recommend:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {frameworks.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-4 py-3 hover:border-white/20 transition-colors"
                >
                  <Icon size={18} style={{ color }} />
                  <span className="text-sm font-orbitron text-white/70">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-white/90 text-xs font-orbitron uppercase tracking-widest mb-3">
              Package Managers
            </p>
            <div className="flex flex-wrap gap-3">
              {packageManagers.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/[0.03] border border-white/10 px-3 py-2 text-sm text-white/60 font-orbitron"
                >
                  <Icon size={14} style={{ color }} />
                  {label}
                </div>
              ))}
            </div>

            <p className="text-white/50 text-sm mt-5 leading-relaxed">
              NeonBlade UI also plays well with{" "}
              <span className="text-white">Remix</span> and{" "}
              <span className="text-white">Astro</span> (with React integration)
              — anywhere you can import a React component and have Tailwind
              scanning your files.
            </p>
          </motion.section>

          {/* Section: Browse Components */}
          <motion.section
            custom={6}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-14"
          >
            <h2 className="font-orbitron font-bold text-xl text-white mb-3 tracking-wide">
              <span className="text-[#00f3ff] mr-2">06</span>Browse Components
            </h2>
            <p className="text-white/55 leading-relaxed mb-5 ">
              All available components — backgrounds, buttons, cards, text
              effects, frames — are documented in the component library. Live
              previews, prop tables, and usage code included.
            </p>
            <Link
              href="/components"
              //   className="inline-flex items-center gap-2 font-orbitron text-sm tracking-wide text-black bg-[#00f3ff] hover:bg-white px-5 py-3 transition-colors shadow-[0_0_20px_rgba(0,243,255,0.25)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            >
              {/* <Terminal size={15} />
              View All Components
              <ArrowRight size={14} /> */}
              <CornerCutButton variant="solid" color="cyan" showArrow={true}>
                View All Components
              </CornerCutButton>
            </Link>
          </motion.section>

          <div className="w-full h-px bg-gradient-to-r from-[#00f3ff]/30 via-white/5 to-transparent mb-10" />

          {/* Closing */}
          <motion.div
            custom={7}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center py-6"
          >
            <Badge color="green" size="md" dot="flicker" className="mb-4">
              System ready
            </Badge>
            <p className="text-2xl font-orbitron font-bold text-white/80 leading-snug">
              Start building with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
                NeonBlade UI
              </span>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
