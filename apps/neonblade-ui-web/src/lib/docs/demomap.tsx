import DatalinesWithGridDemo from "./components/datalines-with-grid/demo";
import NeonLineChartDemo from "./components/neon-line-chart/demo";
import NeonBarChartDemo from "./components/neon-bar-chart/demo";
import NeonDonutChartDemo from "./components/neon-donut-chart/demo";
import NeonSparklineDemo from "./components/neon-sparkline/demo";
import StatCardDemo from "./components/stat-card/demo";
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
import CyberCircuitDemo from "./components/cyber-circuit/demo";
import NeonInputDemo from "./components/neon-input/demo";
import HexagonsDemo from "./components/hexagons/demo";
import CardSliderDemo from "./components/card-slider/demo";
import NotchCardDemo from "./components/notch-card/demo";
import CrosshairDemo from "./components/crosshair/demo";
import OutlineTextDemo from "./components/outline-text/demo";
import PluviophileDemo from "./components/pluviophile/demo";
import HolographicTerrainDemo from "./components/holographic-terrain/demo";
import NeonModalDemo from "./components/modal/demo";

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
  "cyber-circuit": CyberCircuitDemo,
  "neon-input": NeonInputDemo,
  hexagons: HexagonsDemo,
  "card-slider": CardSliderDemo,
  "notch-card": NotchCardDemo,
  crosshair: CrosshairDemo,
  "outline-text": OutlineTextDemo,
  pluviophile: PluviophileDemo,
  "holographic-terrain": HolographicTerrainDemo,
  "neon-modal": NeonModalDemo,
  "neon-line-chart": NeonLineChartDemo,
  "neon-bar-chart": NeonBarChartDemo,
  "neon-donut-chart": NeonDonutChartDemo,
  "neon-sparkline": NeonSparklineDemo,
  "stat-card": StatCardDemo,
};

export default demoMap;
