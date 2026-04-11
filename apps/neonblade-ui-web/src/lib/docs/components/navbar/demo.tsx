import { NavBar } from "../../../components/ui/navbars/NavBar";

export default function NavBarDemo() {
  return (
    <div className="flex flex-col gap-8 w-full p-6">
      {/* Standard — Glass */}
      <div className="space-y-2 relative z-[50]">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Standard · Glass · Cyan
        </p>
        <div className="relative border border-white/10">
          <NavBar
            variant="standard"
            position="static"
            transparency="glass"
            color="cyan"
            logoText="NeonBlade"
            scrollEffect={false}
            items={[
              { label: "Home", href: "#" },
              {
                label: "Products",
                href: "#",
                children: [
                  { label: "Component Library", href: "#" },
                  { label: "CLI Tool", href: "#" },
                  { label: "Templates", href: "#" },
                ],
              },
              { label: "Docs", href: "#" },
              { label: "Contact", href: "#" },
            ]}
          />
        </div>
      </div>

      {/* Standard — Solid + Profile */}
      <div className="space-y-2 relative z-[45]">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Standard · Solid · Pink · With Profile Menu
        </p>
        <div className="relative border border-white/10">
          <NavBar
            variant="standard"
            position="static"
            transparency="solid"
            color="pink"
            logoText="NeonBlade"
            scrollEffect={false}
            items={[
              { label: "Dashboard", href: "#" },
              { label: "Analytics", href: "#" },
              {
                label: "Settings",
                href: "#",
                children: [
                  { label: "Account", href: "#" },
                  { label: "Security", href: "#" },
                  { label: "Billing", href: "#" },
                ],
              },
            ]}
            showProfile
            profileName="Jane Doe"
            profileItems={[
              { key: "profile", label: "Profile" },
              { key: "settings", label: "Settings" },
              { key: "divider", divider: true },
              { key: "logout", label: "Logout" },
            ]}
          />
        </div>
      </div>

      {/* Standard — Transparent */}
      <div className="space-y-2 relative z-[40]">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Standard · Transparent · Green
        </p>
        <div className="relative border border-white/10">
          <NavBar
            variant="standard"
            position="static"
            transparency="transparent"
            color="green"
            logoText="NeonBlade"
            scrollEffect={false}
            items={[
              { label: "Home", href: "#" },
              { label: "Work", href: "#" },
              { label: "About", href: "#" },
            ]}
            showProfile
            profileName="Dev User"
          />
        </div>
      </div>

      {/* Standard — navAlign right */}
      <div className="space-y-2 relative z-[35]">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Standard · navAlign=&quot;right&quot; · Logo Left · Items Right · Cyan
        </p>
        <div className="relative border border-white/10">
          <NavBar
            variant="standard"
            position="static"
            transparency="glass"
            color="cyan"
            logoText="NeonBlade"
            scrollEffect={false}
            navAlign="right"
            dropdownAlign="right"
            items={[
              { label: "Home", href: "#" },
              { label: "Docs", href: "#" },
              {
                label: "Products",
                href: "#",
                children: [
                  { label: "Component Library", href: "#" },
                  { label: "CLI Tool", href: "#" },
                  { label: "Templates", href: "#" },
                ],
              },
              { label: "Contact", href: "#" },
            ]}
          />
        </div>
      </div>

      {/* Standard — navAlign right + Profile */}
      <div className="space-y-2 relative z-[30]">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Standard · navAlign=&quot;right&quot; · Pink · With Profile
        </p>
        <div className="relative border border-white/10">
          <NavBar
            variant="standard"
            position="static"
            transparency="solid"
            color="pink"
            logoText="NeonBlade"
            scrollEffect={false}
            navAlign="right"
            dropdownAlign="right"
            items={[
              { label: "Features", href: "#" },
              { label: "Pricing", href: "#" },
              { label: "Blog", href: "#" },
            ]}
            showProfile
            profileName="Ada"
          />
        </div>
      </div>

      {/* Dock — Cyan with labels */}
      <div className="space-y-2 relative z-[20]">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Dock Variant · Cyan
        </p>
        <div
          className="relative overflow-hidden border border-white/10 bg-black flex items-center justify-center"
          style={{ height: 110 }}
        >
          <NavBar
            variant="dock"
            position="static"
            color="cyan"
            dockShowLabels
            items={[
              {
                label: "Home",
                href: "#",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ),
                active: true,
              },
              {
                label: "Explore",
                href: "#",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                ),
              },
              {
                label: "Docs",
                href: "#",
                icon: (
                  <svg
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
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                ),
              },
            ]}
            showProfile
            profileName="NB"
          />
        </div>
      </div>

      {/* Dock — Pink, no labels */}
      <div className="space-y-2 relative z-[10]">
        <p className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
          Dock Variant · Pink · No Labels
        </p>
        <div
          className="relative overflow-hidden border border-white/10 bg-black flex items-center justify-center"
          style={{ height: 80 }}
        >
          <NavBar
            variant="dock"
            position="static"
            color="pink"
            dockShowLabels={false}
            items={[
              {
                label: "Home",
                href: "#",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ),
                active: true,
              },
              {
                label: "Star",
                href: "#",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ),
              },
              {
                label: "Settings",
                href: "#",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
