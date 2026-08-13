"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/hooks/useTheme";

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Music", href: "/music" },
  { label: "images", href: "/imagesgalary" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#Education" },
  { label: "Contact", href: "#contact" },
  { label: "certificates", href: "/certificates" },
];

function scrollToSection(href: string): void {
  const element = document.querySelector(href);
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar(): JSX.Element {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handler, { passive: true });

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const handleNav = useCallback((href: string): void => {
    setMenuOpen(false);

    if (href.startsWith("#")) {
      scrollToSection(href);
    } else {
      window.location.href = href;
    }
  }, []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--bg2)]/90 backdrop-blur-xl border-b border-[var(--border)] shadow-lg"
            : "",
        ].join(" ")}
      >
        <div className="c-container">
          <div className="flex items-center justify-between h-[72px]">
            <button
              onClick={() => scrollToSection("#hero")}
              aria-label="Go to top"
              className="font-syne text-[22px] font-black tracking-tight bg-gradient-to-r from-[var(--accent)] to-[var(--accent3)] bg-clip-text text-transparent"
            >
              !!Rajesh
            </button>

            <ul className="hidden md:flex gap-9 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="c-nav-link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label={
                  isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                className="w-10 h-10 rounded-[10px] border border-[var(--border2)] bg-[var(--surface)] text-[var(--text2)] flex items-center justify-center transition-all hover:bg-[var(--surface2)] hover:text-[var(--text)] hover:border-[var(--accent)]"
              >
                {isDark ? "🌙" : "☀️"}
              </button>

              <button
                onClick={() => handleNav("#contact")}
                className="hidden md:block c-btn-primary py-2 px-5 text-sm"
              >
                Hire Me
              </button>

              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="md:hidden flex flex-col gap-[5px] p-2"
              >
                <span className="w-[22px] h-0.5 bg-[var(--text)] rounded" />
                <span className="w-[22px] h-0.5 bg-[var(--text)] rounded" />
                <span className="w-[22px] h-0.5 bg-[var(--text)] rounded" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          role="navigation"
          aria-label="Mobile navigation"
          className="fixed top-[72px] left-0 right-0 z-40 bg-[var(--bg2)] border-b border-[var(--border)] backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1 p-5 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="w-full text-left px-4 py-3 rounded-lg text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-all text-sm font-medium"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}