const usage = `import CardSlider from "@/lib/components/ui/sliders/CardSlider";

// ── Basic usage: image/video slider ──────────────────────────────────────────
export function HeroSlider() {
  return (
    <CardSlider
      visibleCount={1}          // one slide at a time
      gap={0}                   // no gap (full-bleed)
      accentColor="#00f3ff"
      progressStyle="bar"       // "bar" | "dots" | "counter"
      buttonPosition="sides"    // "sides" (default) | "bottom"
      loop                      // wrap around at ends
    >
      <img src="/slide-1.jpg" alt="Slide 1" className="w-full h-64 object-cover" />
      <img src="/slide-2.jpg" alt="Slide 2" className="w-full h-64 object-cover" />
      <img src="/slide-3.jpg" alt="Slide 3" className="w-full h-64 object-cover" />
    </CardSlider>
  );
}

// ── Responsive card slider ────────────────────────────────────────────────────
export function FeatureCards() {
  return (
    <CardSlider
      visibleCount={{ sm: 1, md: 2, lg: 3 }} // responsive breakpoints
      gap={16}
      accentColor="#ff00ff"
      progressStyle="dots"
      buttonPosition="bottom"
      showCornerAccents             // per-card corner accents
      cornerAccentStyle="plus"     // "frame" | "plus"
    >
      <div className="bg-white/5 border border-white/10 p-6 rounded-sm h-48 flex items-center justify-center">Card 1</div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-sm h-48 flex items-center justify-center">Card 2</div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-sm h-48 flex items-center justify-center">Card 3</div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-sm h-48 flex items-center justify-center">Card 4</div>
    </CardSlider>
  );
}

// ── Auto-play with CRT effect ─────────────────────────────────────────────────
export function AutoSlider() {
  return (
    <CardSlider
      visibleCount={1}
      accentColor="#39ff14"
      progressStyle="bar"
      loop
      autoPlay
      autoPlayInterval={3000}      // ms between slides (hover pauses)
      scanLines                    // CRT scan-line overlay
      showEdgeFades                // gradient fade on left/right edges
      edgeFadeColor="#050505"      // set to your page background
      buttonVisibility="hover"     // buttons appear only on hover
    >
      {/* …slides… */}
    </CardSlider>
  );
}

// ── Counter style + bottom buttons ────────────────────────────────────────────
export function CounterSlider() {
  return (
    <CardSlider
      visibleCount={2}
      gap={12}
      accentColor="#fbbf24"
      progressStyle="counter"     // shows "03 / 08"
      buttonPosition="bottom"     // prev + progress + next in footer
      swipeThreshold={40}         // minimum drag px to register a swipe
    >
      {/* …slides… */}
    </CardSlider>
  );
}`;

export default usage;
