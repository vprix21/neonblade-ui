import {
  Footer,
  GithubIcon,
  TwitterIcon,
  DiscordIcon,
  LinkedInIcon,
} from "../../../components/ui/footers/Footer";

export default function FooterDemo() {
  const SOCIAL = [
    { label: "GitHub", href: "#", icon: <GithubIcon /> },
    { label: "Twitter", href: "#", icon: <TwitterIcon /> },
    { label: "Discord", href: "#", icon: <DiscordIcon /> },
    { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
  ];
  const GROUPS = [
    {
      title: "Product",
      links: [
        { label: "Components", href: "#" },
        { label: "CLI Tool", href: "#" },
        { label: "Templates", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Docs",
      links: [
        { label: "Getting Started", href: "#" },
        { label: "Installation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Examples", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ];
  const NAV_LINKS = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Status", href: "#" },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Minimal — Cyan */}
      <div className="space-y-2">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest px-4 pt-4">
          Minimal · Cyan
        </p>
        <Footer
          variant="minimal"
          color="cyan"
          logoText="NeonBlade"
          navLinks={[
            { label: "Components", href: "#" },
            { label: "Docs", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Privacy", href: "#" },
          ]}
          socialLinks={SOCIAL}
          copyright="© {year} NeonBlade UI"
        />
      </div>

      <div className="border-t border-white/5" />

      {/* Centered — Pink */}
      <div className="space-y-2">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest px-4 pt-4">
          Centered · Pink
        </p>
        <Footer
          variant="centered"
          color="pink"
          logoText="NeonBlade"
          navLinks={[
            { label: "Components", href: "#" },
            { label: "Docs", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Privacy", href: "#" },
          ]}
          socialLinks={SOCIAL}
          copyright="© {year} NeonBlade UI · All rights reserved."
        />
      </div>

      <div className="border-t border-white/5" />

      {/* Columns — Green */}
      <div className="space-y-2">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest px-4 pt-4">
          Columns · Green
        </p>
        <Footer
          variant="columns"
          color="green"
          logoText="NeonBlade"
          description="A futuristic UI component library built for modern web applications."
          linkGroups={GROUPS}
          navLinks={NAV_LINKS}
          socialLinks={SOCIAL}
          copyright="© {year} NeonBlade UI"
        />
      </div>

      <div className="border-t border-white/5" />

      {/* Mega — Cyan + newsletter */}
      <div className="space-y-2">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest px-4 pt-4">
          Mega · Cyan · With Newsletter
        </p>
        <Footer
          variant="mega"
          color="cyan"
          logoText="NeonBlade UI"
          description="Futuristic, copy-paste ready components for the modern web. Built with neon aesthetics and developer experience in mind."
          linkGroups={GROUPS}
          navLinks={NAV_LINKS}
          socialLinks={SOCIAL}
          showNewsletter
          newsletterPlaceholder="your@email.com"
          newsletterButtonLabel="Subscribe"
          copyright="© {year} NeonBlade UI"
        />
      </div>
    </div>
  );
}
