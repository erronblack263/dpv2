"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Clock,
  Code2,
  MessageSquareText,
  Sparkles,
  CheckCircle2,
  Gauge,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { animate, stagger } from "animejs";
import { openContactDrawer } from "@/components/contact-drawer";

type ProjectIconName = "code" | "message";

interface ProjectComingSoonPageProps {
  title: string;
  description: string;
  tech: string[];
  icon: ProjectIconName;
  backHref?: string;
  variant?: "minimal" | "ai";
}

const ICON_MAP = {
  code: Code2,
  message: MessageSquareText,
} as const;

const FEATURE_HIGHLIGHTS = [
  { label: "Smart conversations", icon: MessageSquareText },
  { label: "Fast responses", icon: Zap },
  { label: "Secure workflows", icon: Shield },
];

export function ProjectComingSoonPage({
  title,
  description,
  tech,
  icon,
  backHref = "/projects",
  variant = "minimal",
}: ProjectComingSoonPageProps) {
  const [notified, setNotified] = useState(false);
  const Icon = ICON_MAP[icon];

  useEffect(() => {
    const mockup = document.querySelector<HTMLElement>(
      "[data-coming-soon-mockup]",
    );
    const pills = document.querySelectorAll<HTMLElement>(
      "[data-coming-soon-pill]",
    );
    const cta = document.querySelector<HTMLElement>("[data-coming-soon-cta]");
    const elements = [mockup, ...pills, cta].filter(
      (element): element is HTMLElement => Boolean(element),
    );
    if (!elements.length) return;

    const animation = animate(elements, {
      opacity: [0, 1],
      translateY: [14, 0],
      delay: stagger(70),
      duration: 560,
      ease: "outCubic",
    });

    return () => {
      animation.cancel();
    };
  }, []);

  if (variant === "ai") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),transparent_22%)]" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full bg-violet-600/12 blur-[120px]" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl">
          <div className="mb-6">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground hover:bg-accent"
            >
              <ArrowLeft className="size-3.5" />
              Back to Projects
            </Link>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Clock className="size-3.5" />
                Coming Soon
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {title}
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-muted/80 px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div
                data-coming-soon-cta
                className="flex flex-col gap-3 sm:flex-row"
              >
                <button
                  onClick={() => {
                    setNotified(true);
                    openContactDrawer();
                  }}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    notified
                      ? "bg-emerald-600 text-white"
                      : "bg-violet-600 text-white shadow-[0_0_28px_rgba(124,58,237,0.45)] hover:bg-violet-500"
                  }`}
                >
                  {notified ? (
                    <>
                      <CheckCircle2 className="size-4" /> You&apos;re on the
                      list!
                    </>
                  ) : (
                    <>
                      <Bell className="size-4" /> Notify me when ready
                    </>
                  )}
                </button>

                <Link
                  href={backHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-accent"
                >
                  Explore other projects
                </Link>
              </div>

              <div className="grid max-w-lg grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
                {FEATURE_HIGHLIGHTS.map(({ label, icon: FeatureIcon }) => (
                  <div
                    key={label}
                    data-coming-soon-pill
                    className="flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-3 py-2 text-sm text-muted-foreground backdrop-blur-sm"
                  >
                    <span className="flex size-8 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                      <FeatureIcon className="size-4" />
                    </span>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-12 h-52 w-52 rounded-full bg-violet-500/20 blur-[100px]" />
              <div className="absolute -right-4 bottom-8 h-52 w-52 rounded-full bg-cyan-500/20 blur-[100px]" />

              <div
                data-coming-soon-mockup
                className="relative overflow-hidden rounded-[28px] border border-border bg-card/70 p-4 shadow-[0_25px_70px_rgba(76,29,149,0.25)] backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center justify-between rounded-2xl border border-border bg-background/80 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {title}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Live preview
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-500">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    online
                  </span>
                </div>

                <div className="space-y-3 rounded-2xl border border-border bg-background/70 p-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                      AI
                    </div>
                    <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-violet-500/10 px-3 py-2 text-sm text-foreground">
                      Summarize my latest project updates and suggest a launch
                      plan.
                    </div>
                  </div>

                  <div className="flex items-start justify-end gap-2">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-violet-600 px-3 py-2 text-sm text-white shadow-lg shadow-violet-500/20">
                      I can help draft a launch brief, highlight milestones, and
                      prepare stakeholder-ready summaries.
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl border border-border bg-card p-3">
                      <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        <Gauge className="size-3.5" /> Speed
                      </div>
                      <div className="text-xl font-bold text-foreground">
                        3.2s
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-3">
                      <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        <Sparkles className="size-3.5" /> Accuracy
                      </div>
                      <div className="text-xl font-bold text-foreground">
                        96%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/8 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-xl text-center flex flex-col items-center gap-6">
        <Link
          href={backHref}
          className="self-start inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to Projects
        </Link>

        <div className="flex size-20 items-center justify-center rounded-2xl bg-violet-600/10 border border-violet-500/20 text-violet-500">
          <Icon className="size-10" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          <Clock className="size-3.5" />
          Coming Soon
        </span>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground"
            >
              {item}
            </span>
          ))}
        </div>

        <div
          data-coming-soon-cta
          className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center"
        >
          <button
            onClick={() => {
              setNotified(true);
              openContactDrawer();
            }}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
              notified
                ? "bg-emerald-600 text-white"
                : "bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_24px_rgba(124,58,237,0.4)]"
            }`}
          >
            {notified ? (
              <>
                <Sparkles className="size-4" /> You&apos;re on the list!
              </>
            ) : (
              <>
                <Bell className="size-4" /> Notify me when ready
              </>
            )}
          </button>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-all"
          >
            Explore other projects
          </Link>
        </div>
      </div>
    </div>
  );
}
