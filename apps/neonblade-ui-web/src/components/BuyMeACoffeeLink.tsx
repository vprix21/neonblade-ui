import NeonGlow from "@/lib/components/ui/text/NeonGlow";

export interface BuyMeACoffeeLinkProps {
  /** Destination URL. Defaults to the NeonBlade UI Buy Me a Coffee page. */
  href?: string;
  /** Link label. */
  label?: string;
  /** Extra class names applied to the anchor. */
  className?: string;
}

export function BuyMeACoffeeLink({
  href = "https://buymeacoffee.com/vinaykalwale",
  label = "Buy me a coffee",
  className,
}: BuyMeACoffeeLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — support NeonBlade UI`}
      className={className}
    >
      <NeonGlow
        colors={["cyan", "pink"]}
        gradientDirection="left-right"
        gradientGlow
        glowIntensity="normal"
        animationType="shift"
        animate
        animationSpeed="normal"
        className="font-orbitron text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-80"
      >
        {label}
      </NeonGlow>
    </a>
  );
}
