import Link from "next/link";
import Image from "next/image";
import { VscMail, VscGithub } from "react-icons/vsc";
import { RiTwitterXFill } from "react-icons/ri";

const footerLinks = [
  { label: "Components", href: "/components" },
  { label: "Docs", href: "/docs" },
  { label: "Templates", href: "/templates" },
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
            <RiTwitterXFill size={20} />
          </a>
          <a
            href="https://github.com/vprix21/neonblade-ui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/65 hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          >
            <VscGithub size={20} />
          </a>
          <a
            href="mailto:contact@neuronrush.com"
            aria-label="Email Contact"
            className="text-white/65 hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          >
            <VscMail size={20} />
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
