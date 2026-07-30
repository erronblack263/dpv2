import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function LandingCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 pb-6 sm:pb-8 pt-2">
      <div className="rounded-xl border border-border bg-card/40 backdrop-blur-md px-4 py-3 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground text-center sm:text-left">
          <Sparkles className="size-3.5 text-violet-400 shrink-0" />
          Let&apos;s build something amazing together
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-500/20 transition-all hover:from-violet-500 hover:to-indigo-500 shrink-0"
        >
          Let&apos;s Talk
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
