"use client";

import { BiCoffeeTogo } from "react-icons/bi";

import CornerCutButton from "@/lib/components/ui/buttons/CornerCutButton";

export interface BuyMeACoffeeButtonProps {
  /** Destination URL. Defaults to the NeonBlade UI Buy Me a Coffee page. */
  href?: string;
  /** Button label. */
  label?: string;
  /** Extra class names applied to the button wrapper. */
  className?: string;
}

export function BuyMeACoffeeButton({
  href = "https://buymeacoffee.com/vinaykalwale",
  label = "Buy me a coffee",
  className,
}: BuyMeACoffeeButtonProps) {
  return (
    <CornerCutButton
      color="cyan"
      size="xs"
      variant="outline"
      corner="bottom-right"
      cornerSize={10}
      hoverEffect="shine"
      glowIntensity="low"
      className={className}
      aria-label={`${label} — support NeonBlade UI`}
      onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
    >
      <BiCoffeeTogo size={15} color={"#eb13ed"} />
      {label}
    </CornerCutButton>
  );
}
