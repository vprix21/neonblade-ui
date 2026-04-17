"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Badge from "@/lib/components/ui/badges/Badge";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[#00f3ff] selection:text-black">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-4 sm:px-6">
        <div className="w-full max-w-lg px-1">
          <div className="space-y-4">
            <Badge shape="corner-cut" color="cyan" dot="flicker">
              Contact
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold font-orbitron tracking-tight text-white mb-4 leading-tight">
              Get in Touch
            </h1>
            <p className="text-white/65 leading-relaxed mb-12">
              Questions, feedback, or ideas? We&apos;d love to hear from you.
            </p>

            <div className="w-full h-px bg-gradient-to-r from-[#fb29ff]/40 via-white/10 to-transparent mb-10" />

            <a
              href="https://x.com/vi_x1x6"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-white/[0.03] border border-white/10 hover:border-white/50 px-6 py-5 transition-all hover:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-white/20 bg-white/5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[18px] h-[18px] text-white"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-orbitron text-white/50 uppercase tracking-widest mb-0.5">
                    X (Twitter)
                  </p>
                  <p className="font-mono text-white/80 group-hover:text-white transition-colors text-sm">
                    @vi_x1x6
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-white/20 group-hover:text-white transition-colors"
              />
            </a>

            <a
              href="mailto:contact@neuronrush.com"
              className="group flex items-center justify-between bg-white/[0.03] border border-white/10 hover:border-[#00f3ff]/50 px-6 py-5 transition-all hover:bg-[#00f3ff]/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[#00f3ff]/30 bg-[#00f3ff]/5">
                  <Mail size={18} className="text-[#00f3ff]" />
                </div>
                <div>
                  <p className="text-xs font-orbitron text-white/50 uppercase tracking-widest mb-0.5">
                    Email
                  </p>
                  <p className="font-mono text-white/80 group-hover:text-white transition-colors text-sm">
                    contact@neuronrush.com
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-white/20 group-hover:text-[#00f3ff] transition-colors"
              />
            </a>

            <div className="w-full h-px bg-gradient-to-r from-[#00f3ff]/20 via-white/5 to-transparent mt-10" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
