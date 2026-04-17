import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Components", href: "/components" },
  { label: "Docs", href: "/docs" },
  { label: "Templates", href: "/templates" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-12 pb-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent opacity-20"></div>

      <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center relative z-10">
        <Link
          href="/"
          className="flex items-center gap-3 mb-6 opacity-100 hover:opacity-100 transition-opacity"
        >
          <Image
            src="/neonblade_ui_logo.png"
            alt="NeonBlade UI Logo"
            width={32}
            height={32}
            className="object-contain drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
          />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] font-orbitron font-bold text-lg tracking-wider">
            NeonBlade UI
          </span>
        </Link>

        {/* <p className="text-sm text-white/40 mb-6 font-mono">
          Engineered for the future of digital frontier.
        </p> */}

        <nav className="flex flex-wrap justify-center gap-6 mb-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-orbitron tracking-widest text-white/65 hover:text-[#00f3ff] uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social links */}
        <div className="flex items-center gap-4 mb-6">
          <a
            href="https://x.com/vi_x1x6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-white/65 hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>

        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-xs font-orbitron text-white/65 tracking-wider">
            Developed by{" "}
            <a
              href="https://x.com/vi_x1x6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00f2ff] hover:text-white transition-colors"
            >
              Vinay Kalwale
            </a>{" "}
            © {new Date().getFullYear()}
          </p>
          <p className="text-[11px] font-orbitron text-white/65 tracking-wider">
            A{" "}
            <a
              href="https://neuronrush.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00f2ff] hover:text-white transition-colors"
            >
              NeuronRush
            </a>{" "}
            Project
          </p>
        </div>
      </div>
    </footer>
  );
}
