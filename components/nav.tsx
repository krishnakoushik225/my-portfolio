"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0d1f]/80 backdrop-blur-xl border-b border-white/5 nav-scrolled"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="text-xl sm:text-2xl font-extrabold tracking-tight">
          <span className="text-white">Krishna&apos;s </span>
          <span className="text-purple-400">Portfolio</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const id = l.href.replace("#", "");
            return (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  active === id
                    ? "text-purple-400 border-b-2 border-purple-400 pb-0.5"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            );
          })}
          <ThemeToggle />
        </nav>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-9 h-9 flex items-center justify-center text-slate-300"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#0d0d1f]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4 nav-mobile">
          {links.map((l) => {
            const id = l.href.replace("#", "");
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium ${
                  active === id ? "text-purple-400" : "text-slate-400"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
