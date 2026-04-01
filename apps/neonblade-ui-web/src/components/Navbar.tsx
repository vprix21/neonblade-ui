"use client";

import Link from "next/link";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/5",
        scrolled
          ? "bg-black/80 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          {/* <div className="w-8 h-8 bg-[#00f3ff] corner-cut flex items-center justify-center text-black font-bold font-orbitron text-xl group-hover:box-glow-cyan transition-shadow">
            N
          </div> */}
          <span className="font-orbitron font-bold text-xl tracking-wider text-white group-hover:text-glow-cyan transition-all">
            NeonBlade<span className="text-[#00f3ff]">UI</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-orbitron text-sm tracking-wide bg-gradient-to-r from-transparent to-transparent">
          <Link href="/components" className="text-white/70 hover:text-[#00f3ff] hover:text-glow-cyan transition-all cursor-pointer">
            Components
          </Link>
          <Link href="/docs" className="text-white/70 hover:text-[#ff00ff] hover:text-glow-pink transition-all cursor-pointer">
            Docs
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-all cursor-pointer">
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
