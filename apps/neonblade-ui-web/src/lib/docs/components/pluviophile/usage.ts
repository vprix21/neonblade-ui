const usage = `import Pluviophile from "@/lib/components/ui/backgrounds/Pluviophile";

export default function App() {
  return (
    <div className="relative w-full h-screen">

      {/* Default rain */}
      <Pluviophile />

      {/* Straight falling, slow drizzle */}
      <Pluviophile
        angle={0}
        speed={5}
        dropCount={80}
        dropMinLength={10}
        dropMaxLength={22}
        opacity={0.55}
      />

      {/* Heavy downpour */}
      <Pluviophile
        dropCount={280}
        speed={18}
        dropMinLength={22}
        dropMaxLength={55}
        dropWidth={1.2}
        opacity={0.85}
      />

      {/* Strong crosswind — steep angle */}
      <Pluviophile
        angle={-40}
        dropCount={200}
        speed={16}
        dropMinLength={25}
        dropMaxLength={60}
      />

      {/* Neon cyan sci-fi rain */}
      <Pluviophile
        dropColor="rgba(0,243,255,0.7)"
        backgroundColor="#000d0f"
        dropCount={160}
      />

      {/* Neon pink rain */}
      <Pluviophile
        dropColor="rgba(255,0,200,0.7)"
        backgroundColor="#0d000a"
      />

    </div>
  );
}`;

export default usage;
