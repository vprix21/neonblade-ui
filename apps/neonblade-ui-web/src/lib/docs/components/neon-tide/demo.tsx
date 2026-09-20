import { NeonTide } from "../../../components/ui/backgrounds/NeonTide";

export default function NeonTideDemo() {
  return (
    <div className="absolute inset-0 min-h-[400px]">
      <NeonTide
        colorA="#00f3ff"
        colorB="#ff00e6"
        origin="top-right"
        amplitude={1.1}
        speed={0.5}
        planeWidth={30}
        planeDepth={30}
        cameraHeight={9}
      />

      {/* hero overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none select-none z-10">
        <h2
          className="font-orbitron font-black uppercase leading-none tracking-tight text-center"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            color: "#ffffff",
            textShadow:
              "0 0 20px #00f3ffcc, 0 0 50px #ff00e666, 0 0 90px #00f3ff33",
          }}
        >
          Neon
          <br />
          Tide
        </h2>
      </div>
    </div>
  );
}
