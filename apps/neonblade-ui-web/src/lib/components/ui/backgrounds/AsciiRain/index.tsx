"use client";

import { useEffect, useRef } from "react";

export interface AsciiRainProps {
  textColor?: string;
  bgColor?: string;
  fontSize?: number;
  speed?: number;
  characters?: string;
  opacity?: number;
}

export function AsciiRain({
  textColor = "#d43dd4ff",
  bgColor = "rgba(0, 0, 0, 0.05)",
  fontSize = 14,
  speed = 33,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+~`|}{[]:;?><,./-=",
  opacity = 60
}: AsciiRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const charArray = characters.split("");

    let columns = Math.ceil(canvas.width / fontSize);

    let drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = (Math.random() * canvas.height) / fontSize;
    }

    const draw = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = textColor;
      ctx.font = `${fontSize}px monospace`;
      
      const currentColumns = Math.ceil(canvas.width / fontSize);
      if (currentColumns > drops.length) {
        for (let x = drops.length; x < currentColumns; x++) {
          drops[x] = (Math.random() * canvas.height) / fontSize;
        }
      }

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, speed);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [textColor, bgColor, fontSize, speed, characters]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{ opacity: opacity / 100 }}
      />
    </div>
  );
}
