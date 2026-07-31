"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      data-site-nav
      className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <div className="flex h-12 w-full items-center justify-between px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">


        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/sage-logo.png"
            alt="Sage"
            width={44}
            height={44}
            className="h-9 w-auto object-contain"
            priority
          />
          <span className="hidden sm:block text-sm font-semibold text-foreground">
            Witness H Musonza
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-foreground pb-0.5",
                  active ? "text-foreground font-semibold" : "text-muted-foreground",
                )}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-4 py-1.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:shadow-[0_0_28px_rgba(124,58,237,0.6)] hover:brightness-110"
          >
            Let&apos;s Talk
            <ArrowUpRight className="size-3.5" />
          </Link>

          <button
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-background/95 backdrop-blur-md md:hidden"
          aria-label="Mobile"
        >
          <div className="flex w-full flex-col px-5 py-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "py-3 text-sm font-medium transition-colors hover:text-foreground border-b border-border/40 last:border-0",
                    active ? "text-foreground font-semibold" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 mb-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Let&apos;s Talk
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
