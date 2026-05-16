"use client";

import { useState, useEffect } from "react";

const ANNOUNCEMENTS = [
  {
    tag: "New",
    color: "#39ff14",
    text: "New component: Crosshair",
  },
  {
    tag: "Announcement",
    color: "#00f3ff",
    text: "Showcase submissions are open!",
  },
];

export function AnnouncementBanner() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRolling(true);
      setTimeout(() => {
        setActiveIdx((i) => (i + 1) % ANNOUNCEMENTS.length);
        setRolling(false);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const item = ANNOUNCEMENTS[activeIdx];

  return (
    <div className="flex items-center gap-2.5 mb-6 sm:mb-8 px-3 py-1.5 overflow-hidden rounded-full bg-black border border-white/10">
      {/* Pulse dot — color changes with item */}
      <div
        className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse transition-[background,box-shadow] duration-300"
        style={{
          background: item.color,
          boxShadow: `0 0 6px ${item.color}`,
        }}
      />

      {/* Rolling content */}
      <div className="overflow-hidden h-[1.1em] flex items-center">
        <div
          className="flex items-center gap-2 whitespace-nowrap"
          style={{
            transform: rolling ? "translateY(-120%)" : "translateY(0%)",
            opacity: rolling ? 0 : 1,
            transition: rolling
              ? "transform 0.25s ease-in, opacity 0.2s ease-in"
              : "transform 0.25s ease-out, opacity 0.2s ease-out",
          }}
        >
          <span className="text-[11px] sm:text-xs tracking-wide text-white/80">
            {item.text}
          </span>
        </div>
      </div>
    </div>
  );
}
