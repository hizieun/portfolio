"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/profile";

const NAV_ITEMS = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#side-projects", label: "Building" },
  { href: "/#publications", label: "Papers" },
  { href: "/#skills", label: "Skills" },
  { href: "/#background", label: "Background" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // close on Escape, lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight hover:text-highlight transition-colors"
        >
          {profile.name}.ai
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm text-muted">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* mobile menu button */}
        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 -mr-2 rounded-md hover:bg-muted-bg transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* mobile menu panel */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden fixed inset-x-0 top-14 bottom-0 bg-background border-t border-border overflow-y-auto"
        >
          <nav className="max-w-5xl mx-auto px-6 py-6">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 border-b border-border text-base font-medium hover:text-highlight transition-colors"
                  >
                    {item.label}
                    <span className="text-xs text-muted font-mono">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
