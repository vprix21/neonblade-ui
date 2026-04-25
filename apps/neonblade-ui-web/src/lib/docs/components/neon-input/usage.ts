const usage = `import NeonInput from "@/lib/components/ui/inputs/NeonInput";

// ── Minimal — default corner-cut, cyan ─────────────────────────────────────
export function MinimalExample() {
  return (
    <NeonInput
      placeholder="Enter username"
      label="Username"
    />
  );
}

// ── Password field ─────────────────────────────────────────────────────────
export function PasswordExample() {
  return (
    <NeonInput
      type="password"
      label="Password"
      placeholder="••••••••"
      color="pink"
      hint="At least 8 characters"
    />
  );
}

// ── Rectangle shape with filled variant ────────────────────────────────────
export function FilledRectangle() {
  return (
    <NeonInput
      shape="rectangle"
      variant="filled"
      color="green"
      label="API Key"
      placeholder="sk-••••••••••••••••"
      size="lg"
    />
  );
}

// ── Corner-cut all corners ─────────────────────────────────────────────────
export function AllCornersExample() {
  return (
    <NeonInput
      shape="corner-cut"
      corner="all"
      cornerSize={10}
      color="purple"
      label="Search"
      placeholder="Search components..."
      glowIntensity="strong"
    />
  );
}

// ── Bottom border (underline) style ────────────────────────────────────────
export function BottomBorderExample() {
  return (
    <NeonInput
      borderStyle="bottom"
      label="Username"
      placeholder="Enter username"
      color="cyan"
    />
  );
}

// ── Borderless ─────────────────────────────────────────────────────────────
export function BorderlessExample() {
  return (
    <NeonInput
      borderStyle="none"
      label="Notes"
      placeholder="No borders, background only"
      color="cyan"
    />
  );
}

// ── Transparent background ─────────────────────────────────────────────────
export function TransparentBgExample() {
  return (
    <NeonInput
      bgOpacity={0}
      label="Transparent"
      placeholder="Fully transparent background"
      color="cyan"
    />
  );
}

// ── Tinted transparent background ──────────────────────────────────────────
export function TintedBgExample() {
  return (
    <NeonInput
      bgColor="cyan"
      bgOpacity={15}
      label="Tinted"
      placeholder="Subtle cyan tint"
      color="cyan"
    />
  );
}

// ── With prefix and suffix icons ───────────────────────────────────────────
export function WithPrefixSuffix() {
  return (
    <NeonInput
      label="Email Address"
      type="email"
      placeholder="pilot@neonblade.dev"
      color="cyan"
      prefix={<span>@</span>}
      suffix={<span>✓</span>}
    />
  );
}

// ── Error state ────────────────────────────────────────────────────────────
export function ErrorExample() {
  return (
    <NeonInput
      label="Access Code"
      placeholder="XXXX-XXXX"
      error="Invalid access code. Please try again."
    />
  );
}

// ── Custom colors ──────────────────────────────────────────────────────────
export function CustomColors() {
  return (
    <NeonInput
      label="Call Sign"
      placeholder="GHOST-7"
      color="#ff9900"
      bgColor="#0d0800"
      textColor="#ffcc66"
      placeholderColor="#ff990055"
      labelColor="#ff9900aa"
      glowIntensity="strong"
    />
  );
}`;

export default usage;
