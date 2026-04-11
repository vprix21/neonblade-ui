"use client";

/**
 * NeonBlade UI — Software Developer Portfolio Template
 * ─────────────────────────────────────────────────────
 * Free & open-source. Built with NeonBlade UI components.
 * Customise the CONFIG object below to make it yours.
 *
 * Sections: Hero · About · Projects · Experience · Contact · Footer
 */

import { NavBar } from "../../../lib/components/ui/navbars/NavBar";
import { CornerCutButton } from "../../../lib/components/ui/buttons/CornerCutButton";
import { NeonGlowCornerCutCard } from "../../../lib/components/ui/cards/NeonGlowCornerCutCard";
import { Badge } from "../../../lib/components/ui/badges/Badge";
import { Timeline } from "../../../lib/components/ui/timelines/Timeline";
import {
  Footer,
  GithubIcon,
  TwitterIcon,
  LinkedInIcon,
} from "../../../lib/components/ui/footers/Footer";
import { AccentFrame } from "../../../lib/components/ui/frames/AccentFrame";
import { GlitchText } from "../../../lib/components/ui/text/GlitchText";
import { DatalinesWithGrid } from "../../../lib/components/ui/backgrounds/DatalinesWithGrid";

// ─── CONFIG ────────────────────────────────────────────────────────────────────
// Edit everything here to personalise. Nothing else needs to change.

const CONFIG = {
  // Personal info
  name: "Alex Mercer",
  title: "Full Stack Developer",
  tagline:
    "I build digital experiences that live at the intersection of design and engineering.",
  location: "San Francisco, CA",
  email: "alex@example.com",
  resumeUrl: "#",
  accentColor: "cyan" as const, // "cyan" | "pink" | "green"
  accentColorB: "pink" as const,

  // Nav
  navItems: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],

  // Skills / tech stack
  skills: [
    { label: "TypeScript", color: "cyan" as const },
    { label: "React", color: "cyan" as const },
    { label: "Next.js", color: "cyan" as const },
    { label: "Node.js", color: "green" as const },
    { label: "PostgreSQL", color: "green" as const },
    { label: "Docker", color: "pink" as const },
    { label: "AWS", color: "pink" as const },
    { label: "Python", color: "cyan" as const },
    { label: "GraphQL", color: "pink" as const },
    { label: "Tailwind CSS", color: "green" as const },
  ],

  // Projects
  projects: [
    {
      title: "Orbital Dashboard",
      description:
        "Real-time analytics platform processing 2M+ events/day. Built with Next.js, ClickHouse, and WebSockets. Reduced report load time by 80%.",
      tags: ["Next.js", "ClickHouse", "WebSocket"],
      colorA: "cyan" as const,
      colorB: "pink" as const,
      githubUrl: "#",
      liveUrl: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      title: "Nexus Auth",
      description:
        "Open-source authentication SDK with OAuth 2.0 / OIDC, passkeys, and MFA. 1.2k GitHub stars. Zero dependencies in the core.",
      tags: ["OAuth 2.0", "TypeScript", "Open Source"],
      colorA: "pink" as const,
      colorB: "cyan" as const,
      githubUrl: "#",
      liveUrl: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      title: "Pulse CMS",
      description:
        "Headless CMS with a visual block builder, multi-tenant support, and edge-deployed preview. Used in production by 40+ teams.",
      tags: ["React", "Node.js", "PostgreSQL"],
      colorA: "green" as const,
      colorB: "cyan" as const,
      githubUrl: "#",
      liveUrl: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
  ],

  // Experience timeline
  experience: [
    {
      date: "2023 – Present",
      title: "Senior Software Engineer",
      description:
        "Spectrum Labs · Leading the real-time data pipeline team. Architecting the move from monolith to event-driven microservices.",
      badge: "Current",
      active: true,
    },
    {
      date: "2021 – 2023",
      title: "Software Engineer II",
      description:
        "Axiom Technologies · Shipped the v2 API platform, cutting response times by 60%. Mentored 3 junior engineers.",
      badge: "2 yrs",
    },
    {
      date: "2019 – 2021",
      title: "Frontend Engineer",
      description:
        "Pixel & Co · Built React component library used across 5 products. Drove adoption of TypeScript across the frontend guild.",
      badge: "2 yrs",
    },
    {
      date: "2018 – 2019",
      title: "Junior Developer",
      description:
        "Freelance · Delivered 12 client projects — landing pages, e-commerce stores, and internal tooling.",
      badge: "1 yr",
    },
  ],

  // Footer social links
  socialLinks: [
    { label: "GitHub", href: "#", icon: <GithubIcon /> },
    { label: "Twitter", href: "#", icon: <TwitterIcon /> },
    { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
  ],
};

// ─── TEMPLATE ──────────────────────────────────────────────────────────────────

export default function SoftwareDeveloperPortfolio() {
  return (
    <div className="min-h-screen bg-[#050505] text-white antialiased selection:bg-[#00f3ff] selection:text-black">
      {/* ── NAVBAR ── */}
      <NavBar
        variant="standard"
        position="fixed"
        transparency="transparent"
        color={CONFIG.accentColor}
        logoText={CONFIG.name}
        scrollEffect
        items={CONFIG.navItems}
      />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <DatalinesWithGrid overlay />
        </div>
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-[#050505] opacity-80 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <Badge color="green" dot="pulse" variant="outline">
              Available for work
            </Badge>
          </div>

          {/* Name */}
          <h1 className="text-6xl md:text-8xl font-bold font-orbitron tracking-tight mb-4 leading-none">
            <GlitchText
              text={CONFIG.name}
              mode="hover"
              intensity="subtle"
              neon
              glowColor={CONFIG.accentColor}
            >
              {CONFIG.name}
            </GlitchText>
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] mb-6 tracking-wider">
            {CONFIG.title}
          </p>

          {/* Tagline */}
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            {CONFIG.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#projects">
              <CornerCutButton
                color={CONFIG.accentColor}
                showArrow
                hoverEffect="glow"
                size="lg"
              >
                View Projects
              </CornerCutButton>
            </a>
            <a
              href={CONFIG.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CornerCutButton
                color={CONFIG.accentColorB}
                variant="outline"
                hoverEffect="shift"
                size="lg"
              >
                Download Resume
              </CornerCutButton>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-xs font-orbitron tracking-widest uppercase">
            Scroll
          </span>
          <span className="w-px h-10 bg-gradient-to-b from-[#00f3ff] to-transparent" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-orbitron tracking-widest text-[#00f3ff] uppercase mb-4">
            01 · About
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Bio */}
            <div>
              <AccentFrame
                color={CONFIG.accentColor}
                colorB={CONFIG.accentColorB}
                mode="quad"
                hoverEffect="glow"
                bgVariant="subtle"
                className="p-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold font-orbitron mb-6 leading-tight">
                  Building things that{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
                    matter
                  </span>
                </h2>
                <p className="text-white/60 leading-loose mb-4">
                  I&apos;m a full-stack engineer with 6+ years of experience
                  building scalable web applications. I care deeply about
                  developer experience, performance, and clean architecture.
                </p>
                <p className="text-white/60 leading-loose">
                  When I&apos;m not coding, I contribute to open-source
                  projects, write about system design, and tinker with Raspberry
                  Pi experiments.
                </p>
              </AccentFrame>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-sm font-orbitron tracking-widest text-white/40 uppercase mb-6">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {CONFIG.skills.map((skill) => (
                  <Badge
                    key={skill.label}
                    color={skill.color}
                    variant="outline"
                    size="md"
                    shape="corner-cut"
                  >
                    {skill.label}
                  </Badge>
                ))}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-10 border-t border-white/10">
                {[
                  { value: "6+", label: "Years Exp." },
                  { value: "30+", label: "Projects" },
                  { value: "1.2k", label: "GitHub Stars" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
                      {stat.value}
                    </p>
                    <p className="text-xs font-orbitron tracking-widest text-white/40 uppercase mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-32 px-6 relative">
        {/* Subtle top glow line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00f3ff]/30 to-transparent" />

        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-orbitron tracking-widest text-[#00f3ff] uppercase mb-4">
            02 · Projects
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-4">
            Selected Work
          </h2>
          <p className="text-white/40 mb-14 max-w-lg">
            A handful of things I&apos;ve built or shipped. More on{" "}
            <a href="#" className="text-[#00f3ff] hover:underline">
              GitHub
            </a>
            .
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONFIG.projects.map((project) => (
              <NeonGlowCornerCutCard
                key={project.title}
                title={project.title}
                description={project.description}
                colorA={project.colorA}
                colorB={project.colorB}
                hoverEffect="gradient"
                icon={project.icon}
              >
                {/* Tags + links */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      color={project.colorA}
                      variant="ghost"
                      size="xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3 mt-5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CornerCutButton
                      color={project.colorA}
                      variant="outline"
                      size="xs"
                      cornerSize={8}
                      hoverEffect="glow"
                    >
                      GitHub
                    </CornerCutButton>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CornerCutButton
                      color={project.colorA}
                      variant="solid"
                      size="xs"
                      cornerSize={8}
                      hoverEffect="shine"
                      showArrow
                    >
                      Live
                    </CornerCutButton>
                  </a>
                </div>
              </NeonGlowCornerCutCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-32 px-6 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff00ff]/30 to-transparent" />

        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-orbitron tracking-widest text-[#00f3ff] uppercase mb-4">
            03 · Experience
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-14">
            Work History
          </h2>

          <Timeline
            items={CONFIG.experience}
            color={CONFIG.accentColor}
            variant="glow"
            dotAnim="pulse"
            lineStyle="glow"
            animate
          />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00f3ff]/30 to-transparent" />

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-orbitron tracking-widest text-[#00f3ff] uppercase mb-4">
            04 · Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-6">
            Let&apos;s build something
          </h2>
          <p className="text-white/50 text-lg mb-14 max-w-xl mx-auto">
            Open to senior / staff roles and interesting freelance projects.
            Send me a message and I&apos;ll get back within 24 hours.
          </p>

          <AccentFrame
            color={CONFIG.accentColor}
            colorB={CONFIG.accentColorB}
            mode="quad"
            hoverEffect="pulse"
            animated
            bgVariant="subtle"
            className="p-10 max-w-lg mx-auto"
          >
            <p className="font-orbitron text-2xl font-bold text-white mb-2">
              {CONFIG.name}
            </p>
            <p className="text-white/40 font-orbitron text-sm tracking-widest uppercase mb-8">
              {CONFIG.title} · {CONFIG.location}
            </p>

            <a href={`mailto:${CONFIG.email}`} className="block mb-6">
              <CornerCutButton
                color={CONFIG.accentColor}
                size="lg"
                corner="all"
                hoverEffect="glow"
                glowIntensity="high"
                showArrow
                className="w-full justify-center"
              >
                {CONFIG.email}
              </CornerCutButton>
            </a>

            <div className="flex gap-3 justify-center">
              {CONFIG.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CornerCutButton
                    color={CONFIG.accentColorB}
                    variant="outline"
                    size="sm"
                    cornerSize={10}
                    hoverEffect="glow"
                  >
                    {link.label}
                  </CornerCutButton>
                </a>
              ))}
            </div>
          </AccentFrame>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer
        variant="minimal"
        color={CONFIG.accentColor}
        logoText={CONFIG.name}
        navLinks={[
          { label: "About", href: "#about" },
          { label: "Projects", href: "#projects" },
          { label: "Experience", href: "#experience" },
          { label: "Contact", href: "#contact" },
        ]}
        socialLinks={CONFIG.socialLinks}
        copyright={`© {year} ${CONFIG.name} · Built with NeonBlade UI`}
      />
    </div>
  );
}
