"use client";

/**
 * CommunityFeedback — real Reddit comments from the React community,
 * displayed as neon-styled feedback cards.
 *
 * To update quotes: edit the FEEDBACK array below.
 */

import { MessageSquareQuote } from "lucide-react";
import NeonGlowCornerCutCard from "@/lib/components/ui/cards/NeonGlowCornerCutCard";

// ---- Data --------------------------------------------------

interface FeedbackItem {
  quote: string;
  author: string;
  color: "cyan" | "pink" | "green" | string;
}

/** Real Reddit comments. Update as new quotes come in. */
const FEEDBACK: FeedbackItem[] = [
  {
    quote: "Absolutely awesome, I love it!",
    author: "r/react community member",
    color: "cyan",
  },
  {
    quote:
      "This looks really cool, reminds me of those old winamp skins from back in the day. The ASCII rain component is a pretty neat touch. Gonna try this out, been wanting to make something with that retro-futuristic vibe for ages",
    author: "r/reactjs community member",
    color: "pink",
  },
  {
    quote: "I dig this. Reminds me of the cyberpunk vibes",
    author: "r/reactjs community member",
    color: "green",
  },
  {
    quote:
      "Looks really nice. It fits the aesthetic of something I'm gonna be building well :)",
    author: "r/reactjs community member",
    color: "cyan",
  },
  {
    quote:
      "I thought for sure it was going to be some trash from someone that just discovered shadows, but thats actually super cool",
    author: "r/react community member",
    color: "pink",
  },
  {
    quote: "It's just so sick",
    author: "r/reactjs community member",
    color: "green",
  },
];

// ---- Component ---------------------------------------------

export function CommunityFeedback() {
  return (
    <section className="relative py-24 bg-black border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Heading */}
        <div className="flex flex-col items-center mb-14 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron tracking-tighter mb-4">
            Loved by the React Community
          </h2>
          <p className="text-white/65 max-w-xl text-base">
            Real feedback from developers across Reddit who found NeonBlade in
            the wild.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEEDBACK.map((item, i) => (
            <FeedbackCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- FeedbackCard -----------------------------------------

function FeedbackCard({ item }: { item: FeedbackItem }) {
  const resolved = resolveColor(item.color);
  return (
    <NeonGlowCornerCutCard
      colorA={item.color}
      colorB={item.color}
      size="md"
      corner="bottom-right"
      hoverEffect="glow-only"
      glowIntensity="low"
      className="h-full"
    >
      {/* Quote mark */}
      <div
        className="text-3xl font-serif leading-none mb-3 select-none"
        style={{ color: resolved, opacity: 0.5 }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote text */}
      <p className="text-white/65 text-md leading-relaxed mb-6 flex-1">
        {item.quote}
      </p>

      {/* Attribution */}
      <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.07]">
        <div
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{
            backgroundColor: resolved,
            boxShadow: `0 0 6px ${resolved}`,
          }}
        />
        <div className="flex flex-col">
          <span
            className="text-xs font-orbitron font-semibold"
            style={{ color: resolved }}
          >
            {item.author}
          </span>
        </div>
      </div>
    </NeonGlowCornerCutCard>
  );
}

// ---- Helpers -----------------------------------------------

const COLOR_MAP: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

function resolveColor(c: string): string {
  return COLOR_MAP[c] ?? c;
}
