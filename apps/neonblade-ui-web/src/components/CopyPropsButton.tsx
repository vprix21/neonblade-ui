"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import CornerCutButton from "@/lib/components/ui/buttons/CornerCutButton";

export interface CopyPropsButtonProps {
  /** JSX code to place on the clipboard. */
  code: string;
  /** Accent color for the button. */
  color?: string;
  /** Extra class names applied to the button wrapper. */
  className?: string;
}

export function CopyPropsButton({
  code,
  color = "#00f3ff",
  className,
}: CopyPropsButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CornerCutButton
      size="xs"
      variant="ghost"
      color={color}
      corner="bottom-right"
      cornerSize={8}
      hoverEffect="shift"
      glowIntensity="low"
      className={`[&>button]:px-2.5 [&>button]:py-1 [&>button]:text-[9px] ${className ?? ""}`}
      onClick={copy}
      aria-label="Copy current props as JSX"
    >
      {copied ? (
        <Check size={12} aria-hidden="true" />
      ) : (
        <Copy size={12} aria-hidden="true" />
      )}
      {copied ? "Copied" : "Copy"}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Props code copied to clipboard" : ""}
      </span>
    </CornerCutButton>
  );
}
