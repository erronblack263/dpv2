"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const activeTheme = mounted ? resolvedTheme : "dark";

  return (
    <div
      className="inline-flex h-9 items-center gap-0.5 rounded-full border border-border bg-muted/70 p-1 shadow-sm"
      aria-label="Choose color theme"
      role="group"
    >
      <button
        type="button"
        aria-label="Switch to light mode"
        aria-pressed={activeTheme === "light"}
        title="Switch to light mode"
        onClick={() => setTheme("light")}
        className={`inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold transition-colors ${
          activeTheme === "light"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Sun className="size-3.5" />
        <span>Light</span>
      </button>
      <button
        type="button"
        aria-label="Switch to dark mode"
        aria-pressed={activeTheme === "dark"}
        title="Switch to dark mode"
        onClick={() => setTheme("dark")}
        className={`inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold transition-colors ${
          activeTheme === "dark"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Moon className="size-3.5" />
        <span>Dark</span>
      </button>
    </div>
  );
}
