import Link from "next/link";
import { profile } from "@/lib/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight hover:text-highlight transition-colors"
        >
          {profile.name}.ai
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm text-muted">
          <a href="/#about" className="hover:text-foreground transition-colors">
            About
          </a>
          <a href="/#experience" className="hover:text-foreground transition-colors">
            Experience
          </a>
          <a href="/#projects" className="hover:text-foreground transition-colors">
            Projects
          </a>
          <a
            href="/#side-projects"
            className="hover:text-foreground transition-colors"
          >
            Building
          </a>
          <a
            href="/#publications"
            className="hover:text-foreground transition-colors"
          >
            Papers
          </a>
          <a href="/#skills" className="hover:text-foreground transition-colors">
            Skills
          </a>
          <a
            href="/#background"
            className="hover:text-foreground transition-colors"
          >
            Background
          </a>
          <a href="/#contact" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
