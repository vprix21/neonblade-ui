import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-12 pb-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent opacity-20"></div>

      <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center relative z-10">
        <Link
          href="/"
          className="flex items-center gap-3 mb-6 opacity-50 hover:opacity-100 transition-opacity"
        >
          <img
            src="/neonblade_ui_logo.png"
            alt="NeonBlade UI Logo"
            className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
          />
          <span className="font-orbitron font-bold text-lg tracking-wider text-white">
            NeonBlade<span className="text-[#00f3ff]">UI</span>
          </span>
        </Link>

        <p className="text-sm text-white/40 mb-2 font-mono">
          Engineered for the future of digital frontier.
        </p>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>

        <p className="text-sm font-orbitron text-white/50 tracking-wider">
          Developed by{" "}
          <a
            href="https://neuronrush.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00f3ff] text-glow-cyan animate-pulse hover:text-white transition-colors"
          >
            NeuronRush
          </a>{" "}
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
