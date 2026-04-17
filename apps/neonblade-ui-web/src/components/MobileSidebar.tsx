"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { categories } from "@/lib/docs/data";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center justify-start gap-4 mb-8 border-b border-white/10 pb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white transition-colors flex-shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-[#00f3ff]" />
        </button>
        <h2 className="text-xl font-orbitron font-bold text-white">
          Components
        </h2>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className="relative w-3/4 max-w-sm h-full bg-[#050505] border-r border-[#00f3ff]/30 shadow-[4px_0_24px_rgba(0,243,255,0.1)] p-6 flex flex-col overflow-hidden animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h2 className="text-xl font-orbitron font-bold text-white">
                Components
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-cyan-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              <div className="space-y-8 pb-12">
                {categories.map((category) => (
                  <div key={category.slug} className="space-y-3">
                    <h4 className="font-orbitron font-semibold text-sm text-[#00f3ff] tracking-wide">
                      {category.name}
                    </h4>
                    <ul className="space-y-2 border-l border-white/10 ml-2 pl-4">
                      {category.components.map((component) => (
                        <li key={component.slug}>
                          <Link
                            href={`/components/${category.slug}/${component.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="block text-white/75 hover:text-white hover:translate-x-1 transition-all text-sm py-1"
                          >
                            {component.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-auto border-t border-white/10">
              <div className="flex gap-4">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-orbitron text-white/65 hover:text-[#00f3ff] transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/docs"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-orbitron text-white/65 hover:text-[#ff00ff] transition-colors"
                >
                  Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
