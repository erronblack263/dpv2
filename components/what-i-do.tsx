"use client";

import Link from "next/link";
import { useEffect } from "react";
import { animate, stagger } from "animejs";
import { ArrowUpRight, Code2, Database, Pencil, Cloud } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Fullstack Development",
    tagline: "Service · Engineering",
    description:
      "Building robust end-to-end applications with modern web and mobile stacks.",
    iconBg:
      "bg-violet-500/15 border-violet-400/30 text-violet-500 dark:text-violet-400",
    iconGlow: "shadow-[0_0_16px_rgba(167,139,250,0.35)]",
  },
  {
    icon: Database,
    title: "Backend Engineering",
    tagline: "Service · Architecture",
    description:
      "Designing scalable APIs, databases and cloud-ready microservice architectures.",
    iconBg: "bg-sky-500/15 border-sky-400/30 text-sky-500 dark:text-sky-400",
    iconGlow: "shadow-[0_0_16px_rgba(56,189,248,0.35)]",
  },
  {
    icon: Pencil,
    title: "UI/UX Development",
    tagline: "Service · Product Design",
    description:
      "Crafting responsive, sleek, and highly intuitive user interfaces.",
    iconBg:
      "bg-emerald-500/15 border-emerald-400/30 text-emerald-600 dark:text-emerald-400",
    iconGlow: "shadow-[0_0_16px_rgba(52,211,153,0.35)]",
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    tagline: "Service · Cloud Systems",
    description:
      "Containerization, automated CI/CD pipelines and seamless cloud deployments.",
    iconBg:
      "bg-fuchsia-500/15 border-fuchsia-400/30 text-fuchsia-500 dark:text-fuchsia-400",
    iconGlow: "shadow-[0_0_16px_rgba(232,121,249,0.35)]",
  },
];

export function WhatIDo() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-home-service]");
    if (!cards.length) return;

    const animation = animate(cards, {
      opacity: [0, 1],
      translateY: [16, 0],
      delay: stagger(90, { start: 520 }),
      duration: 580,
      ease: "outCubic",
    });

    return () => {
      animation.cancel();
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-1 sm:pt-1.5 pb-2 sm:pb-3">
      <div className="text-center mb-2.5 sm:mb-3">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          What I do
        </h2>
        <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
          Turning ideas into powerful digital experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {services.map(
          ({ icon: Icon, title, tagline, description, iconBg, iconGlow }) => (
            <article
              key={title}
              data-home-service
              className="group relative overflow-hidden rounded-xl border border-border bg-card/60 dark:bg-black/30 backdrop-blur-2xl p-4 transition-all duration-300 hover:border-violet-400/30 hover:bg-card dark:hover:bg-black/40 hover:shadow-[0_8px_28px_rgba(124,58,237,0.12)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />

              <div
                className={`relative size-9 rounded-lg border flex items-center justify-center mb-3 ${iconBg} ${iconGlow}`}
              >
                <Icon className="size-4" />
              </div>

              <span className="relative text-[10px] font-semibold text-violet-600 dark:text-violet-400 tracking-wide uppercase">
                {tagline}
              </span>
              <h3 className="relative text-sm font-bold text-foreground leading-snug mt-1">
                {title}
              </h3>
              <p className="relative text-xs text-muted-foreground leading-relaxed mt-1.5 line-clamp-2 pr-6">
                {description}
              </p>

              <div className="relative flex items-center justify-between pt-3 mt-3 border-t border-border">
                <span className="text-[11px] font-medium text-violet-600 dark:text-violet-400">
                  View projects
                </span>
                <Link
                  href="/projects"
                  aria-label={`Explore ${title}`}
                  className="flex size-7 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-all group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-500 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.45)]"
                >
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
}
