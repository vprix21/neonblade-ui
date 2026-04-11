import datalinesUsage from "./components/datalines-with-grid/usage";
import asciiRainUsage from "./components/ascii-rain/usage";
import borderBeamUsage from "./components/border-beam-corner-cut-card/usage";
import accentFrameUsage from "./components/accent-frame/usage";
import glitchTextUsage from "./components/glitch-text/usage";
import cornerCutButtonUsage from "./components/corner-cut-button/usage";
import neonGlowUsage from "./components/neon-glow-corner-cut-card/usage";
import badgeUsage from "./components/badge/usage";
import navbarUsage from "./components/navbar/usage";
import footerUsage from "./components/footer/usage";
import timelineUsage from "./components/timeline/usage";

const usageMap: Record<string, string> = {
  "datalines-with-grid": datalinesUsage,
  "ascii-rain": asciiRainUsage,
  "border-beam-corner-cut-card": borderBeamUsage,
  "accent-frame": accentFrameUsage,
  "glitch-text": glitchTextUsage,
  "corner-cut-button": cornerCutButtonUsage,
  "neon-glow-corner-cut-card": neonGlowUsage,
  badge: badgeUsage,
  navbar: navbarUsage,
  footer: footerUsage,
  timeline: timelineUsage,
};

export default usageMap;
