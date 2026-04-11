"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import "./navbar.css";

// ---- Types -------------------------------------------------

/** Named color presets or any valid CSS color string */
export type NavBarColor = "cyan" | "pink" | "green" | (string & {});

/**
 * Visual variant:
 * - `standard` — full-width horizontal top bar
 * - `dock`     — compact floating pill anchored to top or bottom of viewport
 */
export type NavBarVariant = "standard" | "dock";

/**
 * Horizontal alignment of desktop nav items:
 * - `left`   — items pushed to the left after the logo
 * - `center` — items centered in the bar (default)
 * - `right`  — items pushed to the far right (logo stays left)
 */
export type NavAlign = "left" | "center" | "right";

/**
 * Dropdown placement relative to the trigger button:
 * - `left`   — dropdown left edge aligns with trigger left edge
 * - `center` — dropdown centered under the trigger (default)
 * - `right`  — dropdown right edge aligns with trigger right edge
 */
export type DropdownAlign = "left" | "center" | "right";

/**
 * Positioning mode:
 * - `fixed`    — sticks to viewport (default)
 * - `sticky`   — sticks when scrolled to
 * - `floating` — centered floating bar above content (standard only)
 * - `static`   — no special positioning; flows with the document
 */
export type NavBarPosition = "fixed" | "sticky" | "floating" | "static";

/**
 * Background transparency style:
 * - `transparent` — fully transparent (works best with scrollEffect)
 * - `glass`       — frosted glass backdrop blur (default)
 * - `solid`       — opaque dark background
 */
export type NavBarTransparency = "transparent" | "glass" | "solid";

/**
 * Dock pin position (dock variant only):
 * - `top`    — floats near the top of the viewport
 * - `bottom` — floats near the bottom of the viewport (default)
 */
export type DockPosition = "top" | "bottom";

/** A single navigation link — may nest children to create a submenu */
export interface NavItem {
  /** Display label */
  label: string;
  /** href for anchor navigation */
  href?: string;
  /** Optional icon rendered before the label */
  icon?: ReactNode;
  /** onClick handler (alternative to href) */
  onClick?: () => void;
  /** Nested children create a dropdown submenu (standard variant) */
  children?: NavItem[];
  /** Marks the item as the active route for the dock indicator dot */
  active?: boolean;
}

/** A single item in the profile dropdown menu */
export interface ProfileMenuItem {
  /** Unique identifier — built-in preset keys: "profile" | "settings" | "logout" */
  key: string;
  /** Display label */
  label?: string;
  /** Optional icon rendered before the label */
  icon?: ReactNode;
  /** Custom click handler (fires before onProfileAction callback) */
  onClick?: () => void;
  /** When true renders a horizontal divider line instead of a menu item */
  divider?: boolean;
}

// ---- Color helpers -----------------------------------------

const COLOR_PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};

// ---- Default profile menu items ----------------------------

/** Ready-to-use profile menu preset — pass as `profileItems` or extend it */
export const PRESET_PROFILE_ITEMS: ProfileMenuItem[] = [
  { key: "profile", label: "Profile" },
  { key: "settings", label: "Settings" },
  { key: "divider", divider: true },
  { key: "logout", label: "Logout" },
];

// ---- NavBar props ------------------------------------------

export interface NavBarProps {
  /**
   * Visual variant.
   * - `standard` — full-width top navbar with optional submenus and profile
   * - `dock`     — compact floating pill (great for app layouts)
   * @default "standard"
   */
  variant?: NavBarVariant;

  /**
   * Positioning mode for `standard` variant; dock always positions itself.
   * `floating` renders as a centered floating bar above page content.
   * @default "fixed"
   */
  position?: NavBarPosition;

  /**
   * Background transparency.
   * Pair `"transparent"` with `scrollEffect` to get a cinematic hero-to-solid transition.
   * @default "glass"
   */
  transparency?: NavBarTransparency;

  /**
   * Accent color — preset ("cyan" | "pink" | "green") or any CSS color.
   * @default "cyan"
   */
  color?: NavBarColor;

  /**
   * Logo: an image URL string (rendered as `<img>`) or any ReactNode.
   */
  logo?: string | ReactNode;

  /**
   * Text displayed next to the logo.
   */
  logoText?: string;

  /**
   * `href` the logo links to.
   * @default "/"
   */
  logoHref?: string;

  /**
   * Navigation items. Nest `children` on an item to create a dropdown submenu.
   * @default []
   */
  items?: NavItem[];

  /**
   * Show the user profile avatar button on the right side.
   * @default false
   */
  showProfile?: boolean;

  /**
   * Avatar: an image URL string (rendered as `<img>`) or any ReactNode.
   * Falls back to the first letter of `profileName` when omitted.
   */
  profileAvatar?: string | ReactNode;

  /**
   * User display name shown at the top of the profile dropdown.
   */
  profileName?: string;

  /**
   * Profile dropdown menu items.
   * Use the exported `PRESET_PROFILE_ITEMS` array or build your own.
   * @default PRESET_PROFILE_ITEMS
   */
  profileItems?: ProfileMenuItem[];

  /**
   * Fires when a profile menu item is clicked. Receives the item `key`.
   */
  onProfileAction?: (key: string) => void;

  /**
   * When true the navbar transitions from `transparency` to glass/solid on scroll.
   * Best paired with `transparency="transparent"` for a hero-to-navbar effect.
   * @default true
   */
  scrollEffect?: boolean;

  /**
   * Scroll distance in px before the scroll effect triggers.
   * @default 20
   */
  scrollThreshold?: number;

  /**
   * Dock pin position (dock variant only).
   * @default "bottom"
   */
  dockPosition?: DockPosition;

  /**
   * Show text labels beneath icons in the dock variant.
   * @default true
   */
  dockShowLabels?: boolean;

  /**
   * Horizontal alignment of desktop nav items.
   * - `left`   — items start right after the logo
   * - `center` — items are centered in the bar (default)
   * - `right`  — items are pushed to the far right
   * @default "center"
   */
  navAlign?: NavAlign;

  /**
   * Horizontal alignment for item dropdown menus (standard variant).
   * - `left`   — dropdown aligns to the trigger's left edge
   * - `center` — dropdown is centered under the trigger (default)
   * - `right`  — dropdown aligns to the trigger's right edge
   * @default "center"
   */
  dropdownAlign?: DropdownAlign;

  /** Extra CSS class names applied to the `<nav>` element. */
  className?: string;
}

// ---- Sub-components ----------------------------------------

function SubMenuDropdown({
  items,
  color,
  align = "center",
}: {
  items: NavItem[];
  color: string;
  align?: DropdownAlign;
}) {
  const alignClass =
    align === "left"
      ? "nbr-submenu--left"
      : align === "right"
        ? "nbr-submenu--right"
        : "nbr-submenu--center";

  return (
    <div
      className={`nbr-submenu ${alignClass}`}
      style={{ "--nbr-color": color } as React.CSSProperties}
    >
      {items.map((item, idx) =>
        item.href ? (
          <a key={idx} href={item.href} className="nbr-submenu-item">
            {item.icon && (
              <span className="nbr-submenu-item-icon">{item.icon}</span>
            )}
            {item.label}
          </a>
        ) : (
          <button key={idx} className="nbr-submenu-item" onClick={item.onClick}>
            {item.icon && (
              <span className="nbr-submenu-item-icon">{item.icon}</span>
            )}
            {item.label}
          </button>
        ),
      )}
    </div>
  );
}

function NavDesktopItem({
  item,
  color,
  dropdownAlign = "center",
}: {
  item: NavItem;
  color: string;
  dropdownAlign?: DropdownAlign;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const hasChildren = !!item.children?.length;
  const style = { "--nbr-color": color } as React.CSSProperties;

  if (!hasChildren) {
    return item.href ? (
      <a
        href={item.href}
        className="nbr-nav-item"
        style={style}
        onClick={item.onClick}
      >
        {item.icon && <span className="nbr-nav-item-icon">{item.icon}</span>}
        {item.label}
      </a>
    ) : (
      <button className="nbr-nav-item" style={style} onClick={item.onClick}>
        {item.icon && <span className="nbr-nav-item-icon">{item.icon}</span>}
        {item.label}
      </button>
    );
  }

  return (
    <div ref={wrapRef} className="nbr-nav-item-wrap">
      <button
        className="nbr-nav-item nbr-nav-item--has-sub"
        style={style}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.icon && <span className="nbr-nav-item-icon">{item.icon}</span>}
        {item.label}
        <span className={`nbr-chevron${open ? " nbr-chevron--open" : ""}`}>
          ▾
        </span>
      </button>
      {open && (
        <SubMenuDropdown
          items={item.children!}
          color={color}
          align={dropdownAlign}
        />
      )}
    </div>
  );
}

function ProfileDropdown({
  avatar,
  name,
  items,
  color,
  onAction,
}: {
  avatar?: string | ReactNode;
  name?: string;
  items: ProfileMenuItem[];
  color: string;
  onAction?: (key: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const style = { "--nbr-color": color } as React.CSSProperties;

  const avatarContent =
    typeof avatar === "string" ? (
      <img src={avatar} alt="User avatar" className="nbr-avatar-img" />
    ) : avatar !== undefined ? (
      avatar
    ) : (
      <span className="nbr-avatar-initials">
        {name ? name.charAt(0).toUpperCase() : "U"}
      </span>
    );

  return (
    <div ref={wrapRef} className="nbr-profile-wrap">
      <button
        className="nbr-avatar-btn"
        style={style}
        onClick={() => setOpen((v) => !v)}
        aria-label="User account menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {avatarContent}
      </button>

      {open && (
        <div className="nbr-profile-menu" style={style}>
          {name && <div className="nbr-profile-menu-header">{name}</div>}
          {items.map((item, idx) => {
            if (item.divider) {
              return <div key={idx} className="nbr-profile-divider" />;
            }
            return (
              <button
                key={item.key}
                className="nbr-profile-menu-item"
                onClick={() => {
                  item.onClick?.();
                  onAction?.(item.key);
                  setOpen(false);
                }}
              >
                {item.icon && (
                  <span className="nbr-profile-item-icon">{item.icon}</span>
                )}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---- Main Component ----------------------------------------

export const NavBar: React.FC<NavBarProps> = ({
  variant = "standard",
  position = "fixed",
  transparency = "glass",
  color = "cyan",
  logo,
  logoText,
  logoHref = "/",
  items = [],
  showProfile = false,
  profileAvatar,
  profileName,
  profileItems = PRESET_PROFILE_ITEMS,
  onProfileAction,
  scrollEffect = true,
  scrollThreshold = 20,
  dockPosition = "bottom",
  dockShowLabels = true,
  navAlign = "center",
  dropdownAlign = "center",
  className = "",
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileIdx, setOpenMobileIdx] = useState<number | null>(null);

  const resolvedColor = COLOR_PRESETS[color] ?? color;
  const cssVars = { "--nbr-color": resolvedColor } as React.CSSProperties;

  // Scroll effect
  useEffect(() => {
    if (!scrollEffect || variant === "dock") return;
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollEffect, scrollThreshold, variant]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ---- Logo node -------------------------------------------

  const logoNode = (
    <a href={logoHref} className="nbr-logo">
      {typeof logo === "string" ? (
        <img src={logo} alt="Logo" className="nbr-logo-img" />
      ) : (
        logo
      )}
      {logoText && <span className="nbr-logo-text">{logoText}</span>}
    </a>
  );

  // ===========================================================
  // DOCK VARIANT
  // ===========================================================

  if (variant === "dock") {
    const dockPosClass =
      position === "static"
        ? "nbr-pos-static"
        : position === "sticky"
          ? "nbr-pos-sticky"
          : "nbr-pos-fixed";

    return (
      <nav
        className={`nbr-dock nbr-dock--${dockPosition} ${dockPosClass} ${className}`}
        style={cssVars}
        aria-label="Navigation"
      >
        <div className="nbr-dock-inner">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className={`nbr-dock-item${item.active ? " nbr-dock-item--active" : ""}`}
              onClick={item.onClick}
              title={item.label}
              aria-label={item.label}
            >
              {item.icon && (
                <span className="nbr-dock-item-icon">{item.icon}</span>
              )}
              {dockShowLabels && (
                <span className="nbr-dock-item-label">{item.label}</span>
              )}
            </a>
          ))}

          {showProfile && (
            <>
              <div className="nbr-dock-profile-sep" aria-hidden />
              <div className="nbr-dock-item">
                <ProfileDropdown
                  avatar={profileAvatar}
                  name={profileName}
                  items={profileItems}
                  color={resolvedColor}
                  onAction={onProfileAction}
                />
                {dockShowLabels && (
                  <span className="nbr-dock-item-label">Account</span>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    );
  }

  // ===========================================================
  // STANDARD VARIANT
  // ===========================================================

  const posClass =
    position === "floating"
      ? "nbr-pos-floating"
      : position === "sticky"
        ? "nbr-pos-sticky"
        : position === "static"
          ? "nbr-pos-static"
          : "nbr-pos-fixed";

  // Determine background class — transparent can upgrade to glass on scroll
  const bgClass =
    scrollEffect && transparency === "transparent" && scrolled
      ? "nbr-bg-glass nbr-scrolled"
      : `nbr-bg-${transparency}`;

  return (
    <>
      <nav
        className={`nbr-root ${posClass} ${bgClass} ${className}`}
        style={cssVars}
        aria-label="Navigation"
      >
        <div className="nbr-inner">
          {/* Logo */}
          {logoNode}

          {/* Desktop nav items */}
          <div
            className={`nbr-desktop-nav nbr-desktop-nav--${navAlign}`}
          >
            {items.map((item, idx) => (
              <NavDesktopItem
                key={idx}
                item={item}
                color={resolvedColor}
                dropdownAlign={dropdownAlign}
              />
            ))}
          </div>

          {/* Right side: profile avatar + mobile toggle */}
          <div className="nbr-right">
            {showProfile && (
              <ProfileDropdown
                avatar={profileAvatar}
                name={profileName}
                items={profileItems}
                color={resolvedColor}
                onAction={onProfileAction}
              />
            )}

            <button
              className="nbr-hamburger"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
            >
              <span
                className={`nbr-ham-icon${mobileOpen ? " nbr-ham-icon--open" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="nbr-mobile-menu" style={cssVars}>
            {items.map((item, idx) => {
              const hasChildren = !!item.children?.length;
              const isOpen = openMobileIdx === idx;

              return (
                <div key={idx} className="nbr-mobile-item-wrap">
                  {hasChildren ? (
                    <>
                      <button
                        className="nbr-mobile-item nbr-mobile-item--has-sub"
                        onClick={() => setOpenMobileIdx(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                      >
                        {item.icon && (
                          <span className="nbr-nav-item-icon">{item.icon}</span>
                        )}
                        <span>{item.label}</span>
                        <span
                          className={`nbr-chevron${isOpen ? " nbr-chevron--open" : ""}`}
                        >
                          ▾
                        </span>
                      </button>

                      {isOpen && (
                        <div className="nbr-mobile-submenu">
                          {item.children!.map((child, cidx) =>
                            child.href ? (
                              <a
                                key={cidx}
                                href={child.href}
                                className="nbr-mobile-submenu-item"
                                onClick={() => {
                                  child.onClick?.();
                                  setMobileOpen(false);
                                }}
                              >
                                {child.icon && (
                                  <span className="nbr-nav-item-icon">
                                    {child.icon}
                                  </span>
                                )}
                                {child.label}
                              </a>
                            ) : (
                              <button
                                key={cidx}
                                className="nbr-mobile-submenu-item"
                                onClick={() => {
                                  child.onClick?.();
                                  setMobileOpen(false);
                                }}
                              >
                                {child.icon && (
                                  <span className="nbr-nav-item-icon">
                                    {child.icon}
                                  </span>
                                )}
                                {child.label}
                              </button>
                            ),
                          )}
                        </div>
                      )}
                    </>
                  ) : item.href ? (
                    <a
                      href={item.href}
                      className="nbr-mobile-item"
                      onClick={() => {
                        item.onClick?.();
                        setMobileOpen(false);
                      }}
                    >
                      {item.icon && (
                        <span className="nbr-nav-item-icon">{item.icon}</span>
                      )}
                      {item.label}
                    </a>
                  ) : (
                    <button
                      className="nbr-mobile-item"
                      onClick={() => {
                        item.onClick?.();
                        setMobileOpen(false);
                      }}
                    >
                      {item.icon && (
                        <span className="nbr-nav-item-icon">{item.icon}</span>
                      )}
                      {item.label}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </nav>

      {/* Backdrop — closes mobile menu when tapping outside */}
      {mobileOpen && (
        <div
          className="nbr-mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
};

export default NavBar;
