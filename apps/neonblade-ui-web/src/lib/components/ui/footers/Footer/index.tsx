"use client";

import React, { ReactNode, useState } from "react";
import "./footer.css";

// ---- Types -------------------------------------------------

/** Named color presets or any valid CSS color string */
export type FooterColor = "cyan" | "pink" | "green" | (string & {});

/**
 * Visual layout variant:
 * - `minimal`  — single-row copyright + nav + socials
 * - `columns`  — logo + multi-column link sections + bottom bar
 * - `centered` — centered logo, links, socials, copyright
 * - `mega`     — full-width: logo/description + columns + newsletter + socials
 */
export type FooterVariant = "minimal" | "columns" | "centered" | "mega";

/** A single link item */
export interface FooterLink {
  /** Display label */
  label: string;
  /** href for navigation */
  href?: string;
  /** onClick handler */
  onClick?: () => void;
  /** Opens in new tab when true */
  external?: boolean;
}

/** A column of links (used in columns/mega variants) */
export interface FooterLinkGroup {
  /** Column heading */
  title: string;
  /** Links in this column */
  links: FooterLink[];
}

/** Social icon link */
export interface FooterSocialLink {
  /** Accessible label */
  label: string;
  /** href */
  href: string;
  /** Icon node (any ReactNode, recommend 20×20 SVG) */
  icon: ReactNode;
}

// ---- Color helpers -----------------------------------------

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

// ---- Built-in social icons ---------------------------------

export const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-full h-full"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const TwitterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-full h-full"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const DiscordIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-full h-full"
    aria-hidden="true"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-full h-full"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ---- Component Props ----------------------------------------

export interface FooterProps {
  /**
   * Visual layout variant.
   * - `minimal`  — single-row: brand/copyright left, nav links center/right, socials right
   * - `columns`  — multi-column link groups with a bottom copyright bar
   * - `centered` — all content center-aligned: logo → links → socials → copyright
   * - `mega`     — full layout: logo+desc left, link columns, optional newsletter, bottom bar
   * @default "columns"
   */
  variant?: FooterVariant;

  /**
   * Accent color — preset ("cyan" | "pink" | "green") or any CSS color.
   * @default "cyan"
   */
  color?: FooterColor;

  /**
   * Logo: an image URL string (rendered as <img>) or any ReactNode.
   */
  logo?: string | ReactNode;

  /**
   * Text displayed next to / below the logo.
   */
  logoText?: string;

  /**
   * href the logo links to.
   * @default "/"
   */
  logoHref?: string;

  /**
   * Short brand description shown below the logo (mega variant).
   */
  description?: string;

  /**
   * Navigation link groups. Each group has a title and links array.
   * Used in `columns` and `mega` variants.
   */
  linkGroups?: FooterLinkGroup[];

  /**
   * Simple flat nav links — used in `minimal` and `centered` variants.
   */
  navLinks?: FooterLink[];

  /**
   * Social icon links shown in all variants.
   */
  socialLinks?: FooterSocialLink[];

  /**
   * Copyright text. Supports {year} placeholder.
   * @default "© {year} All rights reserved."
   */
  copyright?: string;

  /**
   * Show a newsletter email input section (mega variant only).
   * @default false
   */
  showNewsletter?: boolean;

  /**
   * Placeholder text for newsletter input.
   * @default "Enter your email"
   */
  newsletterPlaceholder?: string;

  /**
   * Label for the newsletter submit button.
   * @default "Subscribe"
   */
  newsletterButtonLabel?: string;

  /**
   * Fired when the newsletter form is submitted with the email value.
   */
  onNewsletterSubmit?: (email: string) => void;

  /**
   * Background style.
   * - `transparent` — fully transparent
   * - `glass`       — frosted glass
   * - `solid`       — opaque dark surface
   * @default "solid"
   */
  background?: "transparent" | "glass" | "solid";

  /**
   * Show a top border glow line.
   * @default true
   */
  topBorder?: boolean;

  /**
   * Extra CSS class names applied to the `<footer>` element.
   */
  className?: string;
}

// ---- Helpers -----------------------------------------------

function resolveCopyright(text: string): string {
  return text.replace("{year}", String(new Date().getFullYear()));
}

function FooterLinkNode({ link }: { link: FooterLink }) {
  const props = {
    className: "ftc-link",
    href: link.href ?? "#",
    ...(link.external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}),
    onClick: link.onClick,
  };
  return <a {...props}>{link.label}</a>;
}

function SocialBtn({ s }: { s: FooterSocialLink }) {
  return (
    <a
      href={s.href}
      className="ftc-social-btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={s.label}
      title={s.label}
    >
      <span className="ftc-social-icon">{s.icon}</span>
    </a>
  );
}

// ---- Newsletter sub-component ------------------------------

function Newsletter({
  placeholder,
  buttonLabel,
  color,
  onSubmit,
}: {
  placeholder: string;
  buttonLabel: string;
  color: string;
  onSubmit?: (email: string) => void;
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit?.(email.trim());
      setEmail("");
    }
  };

  return (
    <form
      className="ftc-newsletter"
      onSubmit={handleSubmit}
      style={{ "--ftc-color": color } as React.CSSProperties}
    >
      <input
        type="email"
        className="ftc-newsletter-input"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email for newsletter"
      />
      <button type="submit" className="ftc-newsletter-btn">
        {buttonLabel}
      </button>
    </form>
  );
}

// ---- Main Component ----------------------------------------

export const Footer: React.FC<FooterProps> = ({
  variant = "columns",
  color = "cyan",
  logo,
  logoText,
  logoHref = "/",
  description,
  linkGroups = [],
  navLinks = [],
  socialLinks = [],
  copyright = "© {year} All rights reserved.",
  showNewsletter = false,
  newsletterPlaceholder = "Enter your email",
  newsletterButtonLabel = "Subscribe",
  onNewsletterSubmit,
  background = "solid",
  topBorder = true,
  className = "",
}) => {
  const resolvedColor = COLOR_PRESETS[color] ?? color;
  const cssVars = { "--ftc-color": resolvedColor } as React.CSSProperties;
  const copyrightText = resolveCopyright(copyright);

  const bgClass =
    background === "glass"
      ? "ftc-bg-glass"
      : background === "transparent"
        ? "ftc-bg-transparent"
        : "ftc-bg-solid";

  const borderClass = topBorder ? "ftc-border-top" : "";

  // Logo node
  const logoNode =
    logo || logoText ? (
      <a href={logoHref} className="ftc-logo">
        {typeof logo === "string" ? (
          <img src={logo} alt="Logo" className="ftc-logo-img" />
        ) : (
          logo
        )}
        {logoText && <span className="ftc-logo-text">{logoText}</span>}
      </a>
    ) : null;

  // Social row
  const socialRow =
    socialLinks.length > 0 ? (
      <div className="ftc-social-row">
        {socialLinks.map((s, i) => (
          <SocialBtn key={i} s={s} />
        ))}
      </div>
    ) : null;

  // ==========================================================
  // MINIMAL
  // ==========================================================
  if (variant === "minimal") {
    return (
      <footer
        className={`ftc-root ftc-minimal ${bgClass} ${borderClass} ${className}`}
        style={cssVars}
        aria-label="Site footer"
      >
        <div className="ftc-minimal-inner">
          <div className="ftc-minimal-brand">
            {logoNode}
            {!logo && !logoText && (
              <span className="ftc-copyright-text">{copyrightText}</span>
            )}
          </div>

          {navLinks.length > 0 && (
            <nav className="ftc-minimal-nav" aria-label="Footer navigation">
              {navLinks.map((link, i) => (
                <FooterLinkNode key={i} link={link} />
              ))}
            </nav>
          )}

          <div className="ftc-minimal-right">
            {socialRow}
            {(logo || logoText) && (
              <span className="ftc-copyright-text">{copyrightText}</span>
            )}
          </div>
        </div>
      </footer>
    );
  }

  // ==========================================================
  // CENTERED
  // ==========================================================
  if (variant === "centered") {
    return (
      <footer
        className={`ftc-root ftc-centered ${bgClass} ${borderClass} ${className}`}
        style={cssVars}
        aria-label="Site footer"
      >
        <div className="ftc-centered-inner">
          {logoNode && <div className="ftc-centered-logo">{logoNode}</div>}

          {navLinks.length > 0 && (
            <nav className="ftc-centered-nav" aria-label="Footer navigation">
              {navLinks.map((link, i) => (
                <FooterLinkNode key={i} link={link} />
              ))}
            </nav>
          )}

          {socialRow && <div className="ftc-centered-social">{socialRow}</div>}

          <span className="ftc-copyright-text">{copyrightText}</span>
        </div>
      </footer>
    );
  }

  // ==========================================================
  // COLUMNS
  // ==========================================================
  if (variant === "columns") {
    return (
      <footer
        className={`ftc-root ftc-columns ${bgClass} ${borderClass} ${className}`}
        style={cssVars}
        aria-label="Site footer"
      >
        <div className="ftc-columns-inner">
          {/* Brand column */}
          <div className="ftc-columns-brand">
            {logoNode}
            {description && (
              <p className="ftc-brand-desc">{description}</p>
            )}
            {socialRow}
          </div>

          {/* Link columns */}
          {linkGroups.map((group, gi) => (
            <div key={gi} className="ftc-link-group">
              <p className="ftc-link-group-title">{group.title}</p>
              {group.links.map((link, li) => (
                <FooterLinkNode key={li} link={link} />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="ftc-bottom-bar">
          <span className="ftc-copyright-text">{copyrightText}</span>
          {navLinks.length > 0 && (
            <nav className="ftc-bottom-nav" aria-label="Bottom footer navigation">
              {navLinks.map((link, i) => (
                <FooterLinkNode key={i} link={link} />
              ))}
            </nav>
          )}
        </div>
      </footer>
    );
  }

  // ==========================================================
  // MEGA
  // ==========================================================
  return (
    <footer
      className={`ftc-root ftc-mega ${bgClass} ${borderClass} ${className}`}
      style={cssVars}
      aria-label="Site footer"
    >
      <div className="ftc-mega-inner">
        {/* Left brand section */}
        <div className="ftc-mega-brand">
          {logoNode}
          {description && (
            <p className="ftc-brand-desc">{description}</p>
          )}
          {showNewsletter && (
            <div className="ftc-mega-newsletter-wrap">
              <p className="ftc-newsletter-label">Stay in the loop</p>
              <Newsletter
                placeholder={newsletterPlaceholder}
                buttonLabel={newsletterButtonLabel}
                color={resolvedColor}
                onSubmit={onNewsletterSubmit}
              />
            </div>
          )}
          {socialRow}
        </div>

        {/* Right link columns */}
        <div className="ftc-mega-columns">
          {linkGroups.map((group, gi) => (
            <div key={gi} className="ftc-link-group">
              <p className="ftc-link-group-title">{group.title}</p>
              {group.links.map((link, li) => (
                <FooterLinkNode key={li} link={link} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="ftc-bottom-bar">
        <span className="ftc-copyright-text">{copyrightText}</span>
        {navLinks.length > 0 && (
          <nav className="ftc-bottom-nav" aria-label="Bottom footer navigation">
            {navLinks.map((link, i) => (
              <FooterLinkNode key={i} link={link} />
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
};

export default Footer;
