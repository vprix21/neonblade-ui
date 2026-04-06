import React from "react";

export function AudienceStrip() {
  return (
    <div className="w-full border-y border-white/10 bg-[#050505] py-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f3ff]/5 to-transparent"></div>
      <div className="container mx-auto px-4 flex justify-center items-center">
        <p className="font-orbitron text-xs md:text-sm text-white/70 tracking-[0.2em] md:tracking-[0.3em] uppercase relative z-10 flex items-center gap-4 md:gap-6 text-center">
          <span className="hidden md:block w-1.5 h-1.5 bg-[#00f3ff] transform rotate-45 shadow-[0_0_10px_#00f3ff]"></span>
          For developers building beyond conventional UI
          <span className="hidden md:block w-1.5 h-1.5 bg-[#ff00ff] transform rotate-45 shadow-[0_0_10px_#ff00ff]"></span>
        </p>
      </div>
    </div>
  );
}
