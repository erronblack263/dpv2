import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function LandingCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 pb-6 sm:pb-8 pt-2">
      <div
        className="rounded-2xl p-[1px] shadow-[0_0_30px_rgba(139,92,246,0.12)]"
        style={{
          background:
            "linear-gradient(90deg, rgba(167,139,250,0.35), rgba(56,189,248,0.15), rgba(139,92,246,0.25))",
        }}
      >
        <div className="rounded-2xl bg-card/70 dark:bg-[#0c0c12]/85 backdrop-blur-xl px-4 py-3 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground text-center sm:text-left">
            <Sparkles className="size-3.5 text-violet-400 shrink-0 drop-shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
            Let&apos;s build something amazing together
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.45)] transition-all hover:shadow-[0_0_32px_rgba(124,58,237,0.65)] hover:brightness-110 shrink-0"
          >
            Let&apos;s Talk
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
