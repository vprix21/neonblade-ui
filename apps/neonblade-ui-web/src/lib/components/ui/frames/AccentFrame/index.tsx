import React, { HTMLAttributes } from "react";

export interface AccentFrameProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  text?: React.ReactNode;
  className?: string;
  color?: string;
  cornerLength?: number;
  cornerThickness?: number;
  hoverLength?: number;
  transitionDuration?: number;
  mode?: "duo" | "quad";
}

export const AccentFrame: React.FC<AccentFrameProps> = ({
  children,
  text,
  className = "",
  color = "#00f3ff",
  cornerLength = 16,
  cornerThickness = 2,
  hoverLength = 32,
  transitionDuration = 300,
  mode = "duo",
  ...props
}) => {
  const commonCornerClasses = "absolute transition-all bg-[var(--accent-color)]";
  
  return (
    <div
      className={`px-6 py-4 relative group ${className}`}
      style={{ 
        '--accent-color': color,
        '--hover-length': `${hoverLength}px`, 
        '--corner-length': `${cornerLength}px`, 
        '--corner-thickness': `${cornerThickness}px`,
        '--transition-duration': `${transitionDuration}ms`
      } as React.CSSProperties}
      {...props}
    >
      {/* Top Left Corner */}
      <div 
        className={`${commonCornerClasses} top-0 left-0 w-[var(--corner-length)] h-[var(--corner-thickness)] group-hover:w-[var(--hover-length)]`} 
        style={{ marginTop: `-${cornerThickness/2}px`, marginLeft: `-${cornerThickness/2}px`, transitionDuration: `var(--transition-duration)` }} 
      />
      <div 
        className={`${commonCornerClasses} top-0 left-0 w-[var(--corner-thickness)] h-[var(--corner-length)] group-hover:h-[var(--hover-length)]`} 
        style={{ marginTop: `-${cornerThickness/2}px`, marginLeft: `-${cornerThickness/2}px`, transitionDuration: `var(--transition-duration)` }} 
      />
      
      {/* Bottom Right Corner */}
      <div 
        className={`${commonCornerClasses} bottom-0 right-0 w-[var(--corner-length)] h-[var(--corner-thickness)] group-hover:w-[var(--hover-length)]`} 
        style={{ marginBottom: `-${cornerThickness/2}px`, marginRight: `-${cornerThickness/2}px`, transitionDuration: `var(--transition-duration)` }} 
      />
      <div 
        className={`${commonCornerClasses} bottom-0 right-0 w-[var(--corner-thickness)] h-[var(--corner-length)] group-hover:h-[var(--hover-length)]`} 
        style={{ marginBottom: `-${cornerThickness/2}px`, marginRight: `-${cornerThickness/2}px`, transitionDuration: `var(--transition-duration)` }} 
      />
      
      {mode === "quad" && (
        <>
          {/* Top Right Corner */}
          <div 
            className={`${commonCornerClasses} top-0 right-0 w-[var(--corner-length)] h-[var(--corner-thickness)] group-hover:w-[var(--hover-length)]`} 
            style={{ marginTop: `-${cornerThickness/2}px`, marginRight: `-${cornerThickness/2}px`, transitionDuration: `var(--transition-duration)` }} 
          />
          <div 
            className={`${commonCornerClasses} top-0 right-0 w-[var(--corner-thickness)] h-[var(--corner-length)] group-hover:h-[var(--hover-length)]`} 
            style={{ marginTop: `-${cornerThickness/2}px`, marginRight: `-${cornerThickness/2}px`, transitionDuration: `var(--transition-duration)` }} 
          />

          {/* Bottom Left Corner */}
          <div 
            className={`${commonCornerClasses} bottom-0 left-0 w-[var(--corner-length)] h-[var(--corner-thickness)] group-hover:w-[var(--hover-length)]`} 
            style={{ marginBottom: `-${cornerThickness/2}px`, marginLeft: `-${cornerThickness/2}px`, transitionDuration: `var(--transition-duration)` }} 
          />
          <div 
            className={`${commonCornerClasses} bottom-0 left-0 w-[var(--corner-thickness)] h-[var(--corner-length)] group-hover:h-[var(--hover-length)]`} 
            style={{ marginBottom: `-${cornerThickness/2}px`, marginLeft: `-${cornerThickness/2}px`, transitionDuration: `var(--transition-duration)` }} 
          />
        </>
      )}

      <div className="relative z-10">
        {text || children}
      </div>
    </div>
  );
};

export default AccentFrame;
