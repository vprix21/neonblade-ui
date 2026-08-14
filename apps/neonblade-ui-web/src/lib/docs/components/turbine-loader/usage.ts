const usage = `import TurbineLoader from "@/components/neonblade-ui/turbine-loader";

export default function App() {
  return (
    <>
      {/* Default twin-ring turbine */}
      <TurbineLoader />

      {/* Large high-glow boot indicator */}
      <TurbineLoader
        color="#00f3ff"
        size="xl"
        ringCount={3}
        bladeCount={10}
        speed={2400}
        glowIntensity="high"
      />

      {/* Compact inline spinner */}
      <TurbineLoader color="pink" size="sm" bladeCount={6} speed={900} />

      {/* Custom proportions */}
      <TurbineLoader
        color="#ffb800"
        size={80}
        ringCount={2}
        bladeCount={12}
        hubSize={0.12}
        bladeWidth={0.35}
        bladeTaper={0.2}
        direction="counter-clockwise"
      />
    </>
  );
}`;

export default usage;
