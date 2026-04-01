import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-12 pb-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent opacity-20"></div>
      
      <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center relative z-10">
        <Link href="/" className="flex items-center gap-2 mb-6 opacity-50 hover:opacity-100 transition-opacity">
          {/* <div className="w-6 h-6 bg-[#00f3ff] corner-cut flex items-center justify-center text-black font-bold font-orbitron text-xs">
            N
          </div> */}
          <span className="font-orbitron font-bold text-lg tracking-wider text-white">
            NeonBlade<span className="text-[#00f3ff]">UI</span>
          </span>
        </Link>
        
        <p className="text-sm text-white/40 mb-2 font-mono">
          Engineered for the future of digital frontier.
        </p>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>
        
        <p className="text-sm font-orbitron text-white/50 tracking-wider">
          Created by <span className="text-[#00f3ff] text-glow-cyan animate-pulse">NeuronRush</span> © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
