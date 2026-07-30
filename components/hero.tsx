"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Mail, FolderGit2 } from "lucide-react";
import { GitHubIcon, GitLabIcon, LinkedInIcon } from "@/components/social-icons";
import { Terminal } from "@/components/terminal";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/witnessmusonza",
    Icon: LinkedInIcon,
  },
  {
    label: "Email",
    href: "mailto:musonzahw@gmail.com",
    Icon: Mail,
  },
  { label: "GitHub", href: "https://github.com", Icon: GitHubIcon },
  { label: "GitLab", href: "https://gitlab.com", Icon: GitLabIcon },
];

const skillIcons = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    label: "Flutter",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    label: "Spring Boot",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    label: "Docker",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    label: "TypeScript",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    label: "React",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    label: "Java",
  },
];

function OrbitingIcons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const icons = Array.from(
      container.querySelectorAll<HTMLDivElement>("[data-orbit-icon]"),
    );
    const count = icons.length;
    const radius = 108;
    const cx = 120;
    const cy = 120;
    const speed = 0.32;

    function animate() {
      angleRef.current = (angleRef.current + speed) % 360;
      icons.forEach((el, i) => {
        const angle = ((angleRef.current + (360 / count) * i) * Math.PI) / 180;
        el.style.left = `${cx + radius * Math.cos(angle) - 16}px`;
        el.style.top = `${cy + radius * Math.sin(angle) - 16}px`;
      });
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-visible"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      {skillIcons.map(({ src, label }) => (
        <div
          key={label}
          data-orbit-icon
          className="absolute hidden sm:flex size-8 items-center justify-center rounded-full bg-[#12121a]/95 border border-white/15 shadow-[0_0_16px_rgba(99,102,241,0.35)] backdrop-blur-md"
          style={{ left: 0, top: 0 }}
          title={label}
        >
          <img src={src} alt={label} className="size-4" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative pt-3 pb-2 sm:pt-4 sm:pb-3">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)_250px] lg:items-center lg:gap-5 xl:gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center lg:items-start">
            <div
              className="relative shrink-0"
              style={{ width: "220px", height: "220px" }}
            >
              <OrbitingIcons />

              {/* Soft bloom behind portrait */}
              <div
                className="absolute rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "170px",
                  height: "170px",
                  background:
                    "radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(139,92,246,0.2) 45%, transparent 70%)",
                  filter: "blur(18px)",
                }}
                aria-hidden="true"
              />

              {/* Outer glow ring */}
              <div
                className="absolute rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "158px",
                  height: "158px",
                  background:
                    "conic-gradient(from 180deg, #38bdf8, #8b5cf6, #22d3ee, #6366f1, #38bdf8)",
                  padding: "2px",
                  boxShadow:
                    "0 0 28px rgba(56,189,248,0.45), 0 0 56px rgba(139,92,246,0.25)",
                }}
                aria-hidden="true"
              >
                <div className="size-full rounded-full bg-background" />
              </div>

              {/* Inner cyan ring */}
              <div
                className="absolute rounded-full border-2 border-sky-400/70"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "148px",
                  height: "148px",
                  boxShadow:
                    "0 0 18px rgba(56,189,248,0.5), inset 0 0 12px rgba(56,189,248,0.2)",
                }}
                aria-hidden="true"
              />

              <Image
                src="/msonzah.jpg"
                alt="Portrait of Witness H Musonza"
                width={448}
                height={448}
                priority
                quality={100}
                className="absolute rounded-full object-cover"
                style={{
                  width: "136px",
                  height: "136px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 24px rgba(99,102,241,0.35)",
                }}
              />
            </div>

            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.2)] backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
              Available for new opportunities
            </span>
          </div>

          {/* Intro */}
          <div className="flex flex-col gap-2 sm:gap-2.5 text-center lg:text-left min-w-0">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Hey there! 👋
            </p>

            <h1 className="text-balance text-2xl sm:text-3xl lg:text-[2rem] font-extrabold leading-tight tracking-tight text-foreground">
              I&apos;m{" "}
              <span className="bg-gradient-to-r from-[#a78bfa] via-[#818cf8] to-[#22d3ee] bg-clip-text text-transparent">
                Witness H Musonza
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg font-bold text-foreground leading-snug">
              I build scalable digital solutions that{" "}
              <span className="bg-gradient-to-r from-[#22d3ee] to-[#38bdf8] bg-clip-text text-transparent">
                solve real problems.
              </span>
            </p>

            <p className="mx-auto max-w-lg text-xs sm:text-sm leading-relaxed text-muted-foreground lg:mx-0 line-clamp-2">
              Fullstack software developer with expertise in SDLC, systems
              architecture, and sleek UI/UX. Passionate about crafting seamless
              user experiences.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-0.5 lg:justify-start">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.45)] transition-all hover:shadow-[0_0_32px_rgba(124,58,237,0.65)] hover:brightness-110"
              >
                <Mail className="size-3.5" />
                Contact Me
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-4 py-2 text-xs font-semibold text-foreground backdrop-blur-md transition-all hover:border-violet-400/40 hover:bg-card hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
              >
                <FolderGit2 className="size-3.5" />
                View Projects
              </Link>
            </div>

            <div className="flex items-center justify-center gap-0.5 lg:justify-start">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-accent hover:text-violet-400 hover:shadow-[0_0_12px_rgba(167,139,250,0.3)]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div className="flex justify-center lg:justify-end relative">
            <div
              className="absolute -inset-4 rounded-3xl opacity-60 blur-2xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(34,211,238,0.15) 50%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
}
