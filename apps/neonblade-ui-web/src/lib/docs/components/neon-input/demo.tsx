"use client";

import { useState } from "react";
import { Eye, EyeOff, LogIn, Mail, Search } from "lucide-react";
import NeonInput from "../../../components/ui/inputs/NeonInput";
import { CornerCutButton } from "../../../components/ui/buttons/CornerCutButton";

export default function NeonInputDemo() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex flex-col gap-10 w-full max-w-lg mx-auto">
      {/* â”€â”€ Search input with icon â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Search
        </p>
        <NeonInput
          placeholder="Search components..."
          color="cyan"
          corner="all"
          cornerSize={10}
          prefix={<Search className="w-3.5 h-3.5" />}
        />
      </div>

      {/* Corner cut variants */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Corner Cuts
        </p>
        <div className="flex flex-col gap-4">
          <NeonInput
            corner="bottom-right"
            placeholder="Single - bottom-right (default)"
            color="cyan"
          />
          <NeonInput
            corner="tl-br"
            placeholder="Diagonal - top-left + bottom-right"
            color="pink"
          />
          <NeonInput
            corner="bl-tr"
            placeholder="Diagonal - bottom-left + top-right"
            color="green"
          />
          <NeonInput
            corner="all"
            cornerSize={10}
            placeholder="All corners"
            color="cyan"
          />
        </div>
      </div>

      {/* Border styles */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Border Styles
        </p>
        <div className="flex flex-col gap-4">
          <NeonInput
            borderStyle="full"
            placeholder="Full border (default)"
            color="cyan"
          />
          <NeonInput
            borderStyle="bottom"
            placeholder="Bottom only underline style"
            color="pink"
          />
          <NeonInput
            borderStyle="none"
            placeholder="Borderless — background only"
            color="green"
          />
        </div>
      </div>

      {/* Background opacity */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Background Opacity
        </p>
        <div className="flex flex-col gap-4">
          <NeonInput
            bgOpacity={100}
            placeholder="Fully opaque (default)"
            color="cyan"
          />
          <NeonInput
            bgOpacity={50}
            placeholder="50% fades toward page bg"
            color="cyan"
          />
          <NeonInput
            bgOpacity={0}
            placeholder="Transparent — page bg shows through"
            color="cyan"
          />
          <NeonInput
            bgColor="#00f3ff"
            bgOpacity={12}
            placeholder="Tinted — bgColor=cyan bgOpacity=12"
            color="cyan"
          />
        </div>
      </div>

      {/* States  */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          States
        </p>
        <div className="flex flex-col gap-4">
          <NeonInput
            label="Error State"
            placeholder="ACCESS-CODE"
            error="Invalid access code. Please try again."
          />
          <NeonInput
            label="Disabled"
            placeholder="Cannot edit"
            color="cyan"
            disabled
          />
        </div>
      </div>

      {/* â”€â”€ Login form â€” real use-case showcase â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="space-y-3">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Login Form
        </p>
        <div
          className="flex flex-col gap-4 rounded p-6 border border-white/[0.06]"
          style={{ background: "color-mix(in srgb, #00f3ff 3%, #050a0f)" }}
        >
          <div className="mb-1">
            <p className="text-sm font-orbitron text-[#00f3ff] tracking-widest uppercase">
              System Access
            </p>
            <p className="text-[10px] font-mono text-white/30 mt-1">
              Enter your credentials to continue
            </p>
          </div>

          <NeonInput
            label="Email"
            type="email"
            placeholder="neo@example.com"
            color="cyan"
            corner="tl-br"
            prefix={<Mail className="w-3.5 h-3.5" />}
          />

          <NeonInput
            label="Password"
            type={showPass ? "text" : "password"}
            placeholder="............."
            color="cyan"
            corner="tl-br"
            hint="Min 8 characters"
            suffix={
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="opacity-50 hover:opacity-100 transition-opacity"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
            }
          />

          <CornerCutButton
            color="cyan"
            corner="bottom-right"
            hoverEffect="glow"
            className="w-full mt-1 [&_span]:justify-center"
          >
            <LogIn className="w-3.5 h-3.5" />
            Access System
          </CornerCutButton>
        </div>
      </div>
    </div>
  );
}
