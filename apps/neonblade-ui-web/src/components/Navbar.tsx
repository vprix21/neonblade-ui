"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "../lib/utils";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { VscGithub } from "react-icons/vsc";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [scrolled]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/5",
          scrolled
            ? "bg-black/95 backdrop-blur-md py-4"
            : mobileOpen
              ? "bg-black/95 backdrop-blur-md py-6"
              : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/neonblade_ui_logo.png"
              alt="NeonBlade UI Logo"
              width={24}
              height={24}
              className="object-contain drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
            />
            <span className="font-orbitron font-bold text-xl tracking-wider text-white group-hover:text-glow-cyan transition-all">
              {/* NeonBlade<span className="text-[#00f3ff]">UI</span> */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
                NeonBlade UI
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 font-orbitron text-sm tracking-wide">
            <Link
              href="/components"
              className="text-white/80 hover:text-[#00f3ff] hover:text-glow-cyan transition-all cursor-pointer"
            >
              Components
            </Link>
            <Link
              href="/docs"
              className="text-white/80 hover:text-[#00f3ff] hover:text-glow-cyan transition-all cursor-pointer"
            >
              Docs
            </Link>
            <Link
              href="/templates"
              className="text-white/80 hover:text-[#00f3ff] hover:text-glow-cyan transition-all cursor-pointer"
            >
              Templates
            </Link>
            <a
              href="https://github.com/vprix21/neonblade-ui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/80 hover:text-[#00f3ff] hover:text-glow-cyan transition-all"
            >
              <VscGithub size={18} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-white/70 hover:text-[#00f3ff] transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown — outside nav so navbar border-b stays clean */}
      {mobileOpen && (
        <div
          className="fixed left-0 w-full z-50 md:hidden border-t border-[#00f3ff]/20 bg-black/95 backdrop-blur-md"
          style={{ top: navHeight }}
        >
          <div className="container mx-auto px-6 max-w-7xl py-4 flex flex-col gap-1 font-orbitron text-sm tracking-wide">
            <Link
              href="/components"
              className="py-3 px-2 text-white/70 hover:text-[#00f3ff] hover:bg-[#00f3ff]/5 rounded transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Components
            </Link>
            <Link
              href="/docs"
              className="py-3 px-2 text-white/70 hover:text-[#00f3ff] hover:bg-[#00f3ff]/5 rounded transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/templates"
              className="py-3 px-2 text-white/70 hover:text-[#00f3ff] hover:bg-[#00f3ff]/5 rounded transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Templates
            </Link>
            <a
              href="https://github.com/vprix21/neonblade-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-2 flex items-center gap-2 text-white/70 hover:text-[#00f3ff] hover:bg-[#00f3ff]/5 rounded transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <VscGithub size={16} />
              GitHub
            </a>
          </div>
        </div>
      )}

      {/* Backdrop overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
