const usage = `import { GlyphCity } from "@/lib/components/ui/backgrounds/GlyphCity";

// Solid mode
export function SolidCity() {
  return (
    <div className="relative w-screen h-screen">
      <GlyphCity
        cityType="solid"
        variant="downtown"
        colorPrimary="#00ffff"
        colorSecondary="#ff00ff"
        colorTertiary="#ffff00"
        bgColor="#020208"
        fontSize={12}
        speed={80}
        showVehicles
        blinkingLights
        opacity={92}
      />
    </div>
  );
}

// Outline silhouette mode
export function OutlineCity() {
  return (
    <div className="relative w-screen h-screen">
      <GlyphCity
        cityType="outline"
        outlineVariant="sparse"
        colorPrimary="#00ffff"
        colorSecondary="#ff00ff"
        colorTertiary="#ffff00"
        bgColor="#020208"
        speed={80}
        showVehicles
        blinkingLights
        opacity={92}
      />
    </div>
  );
}`;

export default usage;
