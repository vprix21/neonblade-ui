import Link from "next/link";

const footerLinks = [
  { label: "Components", href: "/components" },
  { label: "Docs", href: "/docs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] font-orbitron font-bold text-lg tracking-wider">
            NeonBlade UI
          </span>
        </Link>

        <p className="text-sm text-white/40 mb-6 font-mono">
          Engineered for the future of digital frontier.
        </p>

        <nav className="flex flex-wrap justify-center gap-6 mb-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-orbitron tracking-widest text-white/40 hover:text-[#00f3ff] uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>

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
