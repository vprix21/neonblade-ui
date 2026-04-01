"use client";
import React, { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import "./glitch-text.css";

interface GlitchTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  text: string;
  mode?: "active" | "hover";
  className?: string;
  glitchDuration?: number; // In seconds. Determines the loop cycle.
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  text,
  mode = "hover",
  className = "",
  glitchDuration = 4,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseClass = "glitch-wrapper";
  const modeClass = mode === "active" ? "activeglitch" : "hoverglitch";
  
  return (
    <span 
      className={`${baseClass} ${modeClass} ${className}`} 
      data-text={text}
      style={{
        "--glitch-duration": `${glitchDuration}s`,
      } as React.CSSProperties}
      {...props}
    >
      {mounted ? children : <span className="invisible">{children}</span>}
      {!mounted && <span className="absolute inset-0">{children}</span>}
    </span>
  );
};

export default GlitchText;
