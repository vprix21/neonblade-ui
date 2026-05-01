import DatalinesWithGridDemo from "./components/datalines-with-grid/demo";
import AsciiRainDemo from "./components/ascii-rain/demo";
import BorderBeamCornerCutCardDemo from "./components/border-beam-corner-cut-card/demo";
import AccentFrameDemo from "./components/accent-frame/demo";
import GlitchTextDemo from "./components/glitch-text/demo";
import CornerCutButtonDemo from "./components/corner-cut-button/demo";
import NeonGlowCornerCutCardDemo from "./components/neon-glow-corner-cut-card/demo";
import BadgeDemo from "./components/badge/demo";
import NavBarDemo from "./components/navbar/demo";
import FooterDemo from "./components/footer/demo";
import TimelineDemo from "./components/timeline/demo";
import NeonGlowDemo from "./components/neon-glow/demo";
import GlyphCityDemo from "./components/glyph-city/demo";
// import NeonTriangleDemo from "./components/neon-triangle/demo";
// import DataBusesDemo from "./components/databuses/demo";
import CyberCircuitDemo from "./components/cyber-circuit/demo";
import NeonInputDemo from "./components/neon-input/demo";
import HexagonsDemo from "./components/hexagons/demo";
import CardSliderDemo from "./components/card-slider/demo";

const demoMap: Record<string, React.FC> = {
  "datalines-with-grid": DatalinesWithGridDemo,
  "ascii-rain": AsciiRainDemo,
  "border-beam-corner-cut-card": BorderBeamCornerCutCardDemo,
  "accent-frame": AccentFrameDemo,
  "glitch-text": GlitchTextDemo,
  "corner-cut-button": CornerCutButtonDemo,
  "neon-glow-corner-cut-card": NeonGlowCornerCutCardDemo,
  badge: BadgeDemo,
  navbar: NavBarDemo,
  footer: FooterDemo,
  timeline: TimelineDemo,
  "neon-glow": NeonGlowDemo,
  "glyph-city": GlyphCityDemo,
  // "neon-triangle": NeonTriangleDemo,
  // "databuses": DataBusesDemo,
  "cyber-circuit": CyberCircuitDemo,
  "neon-input": NeonInputDemo,
  hexagons: HexagonsDemo,
  "card-slider": CardSliderDemo,
};

export default demoMap;
