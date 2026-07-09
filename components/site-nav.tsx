'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'Contact', href: '/contact' },
]

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="sticky top-4 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-3xl">
        {/* Pill navbar */}
        <header className="flex items-center justify-between gap-4 rounded-full border border-border/60 bg-background/90 backdrop-blur-md px-4 h-14 shadow-lg">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center justify-center">
            <img src="/sage-logo.png" alt="Sage" className="h-11 w-auto object-contain" />
          </Link>

          {/* Desktop links — centered */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            {links.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-foreground',
                    active ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            {/* Hamburger — mobile only */}
            <button
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </header>

        {/* Mobile dropdown — rounded card below pill */}
        {open && (
          <nav
            className="mt-2 rounded-2xl border border-border bg-background/95 backdrop-blur-md shadow-xl overflow-hidden md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col py-2">
              {links.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'px-6 py-3 text-sm font-medium transition-colors hover:bg-accent text-center',
                      active ? 'text-primary' : 'text-muted-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  )
}
