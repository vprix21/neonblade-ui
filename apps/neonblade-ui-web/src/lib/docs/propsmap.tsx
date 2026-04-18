import type { PropDefinition } from "./types";
import datalinesProps from "./components/datalines-with-grid/props";
import asciiRainProps from "./components/ascii-rain/props";
import borderBeamProps from "./components/border-beam-corner-cut-card/props";
import accentFrameProps from "./components/accent-frame/props";
import glitchTextProps from "./components/glitch-text/props";
import cornerCutButtonProps from "./components/corner-cut-button/props";
import neonGlowProps from "./components/neon-glow-corner-cut-card/props";
import badgeProps from "./components/badge/props";
import navbarProps from "./components/navbar/props";
import footerProps from "./components/footer/props";
import timelineProps from "./components/timeline/props";
import neonGlowTextProps from "./components/neon-glow/props";

const propsMap: Record<string, PropDefinition[]> = {
  "datalines-with-grid": datalinesProps,
  "ascii-rain": asciiRainProps,
  "border-beam-corner-cut-card": borderBeamProps,
  "accent-frame": accentFrameProps,
  "glitch-text": glitchTextProps,
  "corner-cut-button": cornerCutButtonProps,
  "neon-glow-corner-cut-card": neonGlowProps,
  badge: badgeProps,
  navbar: navbarProps,
  footer: footerProps,
  timeline: timelineProps,
  "neon-glow": neonGlowTextProps,
};

export default propsMap;
