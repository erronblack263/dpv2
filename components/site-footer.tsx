import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-background/80 backdrop-blur-xl z-10 relative">
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Copyright notice */}
        <p className="text-xs text-muted-foreground font-medium text-center sm:text-left">
          &copy; Powered by Sage 2026.
        </p>

        {/* Social & Contact Icon Links */}
        <div className="flex items-center gap-2">
          <a
            href="mailto:musonzahw@gmail.com"
            aria-label="Email Witness Musonza"
            title="Email: musonzahw@gmail.com"
            className="flex size-8 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-all hover:bg-accent hover:text-foreground hover:border-border/80 hover:scale-105"
          >
            <Mail className="size-4" />
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            title="GitHub"
            className="flex size-8 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-all hover:bg-accent hover:text-foreground hover:border-border/80 hover:scale-105"
          >
            <GitHubIcon className="size-4" />
          </a>

          <a
            href="tel:+263784112233"
            aria-label="Phone Contact"
            title="Phone"
            className="flex size-8 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-all hover:bg-accent hover:text-foreground hover:border-border/80 hover:scale-105"
          >
            <Phone className="size-3.5" />
          </a>

          <a
            href="https://www.linkedin.com/in/witnessmusonza"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
            className="flex size-8 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-all hover:bg-accent hover:text-foreground hover:border-border/80 hover:scale-105"
          >
            <LinkedInIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
