import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function LandingCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-4 pt-1">
      <div
        className="rounded-2xl p-[1px] shadow-[0_0_30px_rgba(139,92,246,0.2)]"
        style={{
          background:
            "linear-gradient(90deg, rgba(167,139,250,0.5), rgba(56,189,248,0.3), rgba(236,72,153,0.3), rgba(139,92,246,0.5))",
        }}
      >
        <div className="rounded-2xl bg-card/90 dark:bg-[#0a0b16]/60 backdrop-blur-2xl border border-border/80 dark:border-white/10 px-4 py-2.5 sm:px-5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground text-center sm:text-left">
            <Sparkles className="size-3.5 text-violet-500 dark:text-violet-400 shrink-0 drop-shadow-[0_0_10px_rgba(167,139,250,0.9)] animate-pulse" />
            Let&apos;s build something amazing together
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-1.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all hover:shadow-[0_0_28px_rgba(99,102,241,0.75)] hover:brightness-110 shrink-0"
          >
            Let&apos;s Talk
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
