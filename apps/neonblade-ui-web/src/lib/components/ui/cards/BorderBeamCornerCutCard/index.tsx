import React, { HTMLAttributes, ReactNode } from "react";
import "./border-beam.css";

export interface BorderBeamCornerCutCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  beamColor?: string;
  duration?: number;
  borderWidth?: number | string;
  innerBgColor?: string;
}

export const BorderBeamCornerCutCard: React.FC<BorderBeamCornerCutCardProps> = ({
  children,
  className = "",
  innerClassName = "",
  beamColor = "var(--neon-pink)",
  duration = 4,
  borderWidth = "2px",
  innerBgColor,
  ...props
}) => {
  return (
    <div
      className={`relative w-full corner-cut overflow-hidden bg-white/5 ${className}`}
      style={{ padding: typeof borderWidth === 'number' ? `${borderWidth}px` : borderWidth }}
      {...props}
    >
      {/* 
        The spinning beam background 
        Using an absolute div larger than the container that spins 
      */}
      <div 
        className="absolute inset-[-100%] animate-spin"
        style={{
          animationDuration: `${duration}s`,
          background: `conic-gradient(from 90deg at 50% 50%, #00000000 50%, ${beamColor} 100%)`,
        }}
      />
      
      {/* 
        Inner Card Content 
        The dark background hides the center of the spinning gradient, leaving only the border visible
      */}
      <div 
        className={`relative z-10 h-full w-full corner-cut bg-background p-6 ${innerClassName}`}
        style={innerBgColor ? { backgroundColor: innerBgColor } : undefined}
      >
        {children}
      </div>
    </div>
  );
};

export default BorderBeamCornerCutCard;
