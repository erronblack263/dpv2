"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";
import { Mail, FolderGit2 } from "lucide-react";
import {
  GitHubIcon,
  GitLabIcon,
  LinkedInIcon,
} from "@/components/social-icons";
import { Terminal } from "@/components/terminal";
import { openContactDrawer } from "@/components/contact-drawer";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

const CURSOR_COLORS = ["#8b5cf6", "#06b6d4", "#f43f5e", "#f59e0b", "#10b981"];

type TypewriterTextProps = Readonly<{
  text: string;
  speed?: number;
  pause?: number;
}>;

function TypewriterText({
  text,
  speed = 50,
  pause = 3500,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [colorIdx, setColorIdx] = useState(0);
  const idxRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let typingId: ReturnType<typeof setInterval> | null = null;
    let pauseId: ReturnType<typeof setTimeout> | null = null;

    const runCycle = () => {
      if (cancelled) return;
      idxRef.current = 0;
      setDisplayed("");
      typingId = setInterval(() => {
        if (cancelled) {
          clearInterval(typingId!);
          return;
        }
        idxRef.current += 1;
        setDisplayed(text.slice(0, idxRef.current));
        if (idxRef.current >= text.length) {
          clearInterval(typingId!);
          pauseId = setTimeout(runCycle, pause);
        }
      }, speed);
    };

    runCycle();
    return () => {
      cancelled = true;
      if (typingId) clearInterval(typingId);
      if (pauseId) clearTimeout(pauseId);
    };
  }, [text, speed, pause]);

  useEffect(() => {
    const id = setInterval(() => {
      setColorIdx((i) => (i + 1) % CURSOR_COLORS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <span>
      {displayed}
      <span
        className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm animate-pulse transition-colors duration-700"
        style={{ backgroundColor: CURSOR_COLORS[colorIdx] }}
      />
    </span>
  );
}

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/witnessmusonza",
    Icon: LinkedInIcon,
  },
  { label: "Email", href: "mailto:musonzahw@gmail.com", Icon: Mail },
  { label: "GitHub", href: "https://github.com", Icon: GitHubIcon },
  { label: "GitLab", href: "https://gitlab.com", Icon: GitLabIcon },
];

export function Hero() {
  useEffect(() => {
    const headline = document.querySelector<HTMLElement>(
      "[data-hero-headline]",
    );
    const mockup = document.querySelector<HTMLElement>("[data-hero-mockup]");
    if (!headline || !mockup) return;

    const headlineAnimation = animate(headline, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 700,
      ease: "outCubic",
    });
    const mockupAnimation = animate(mockup, {
      opacity: [0, 1],
      translateX: [28, 0],
      scale: [0.97, 1],
      delay: 180,
      duration: 800,
      ease: "outCubic",
    });

    return () => {
      headlineAnimation.cancel();
      mockupAnimation.cancel();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 sm:py-6"
    >
      <div
        data-hero-mockup
        className="overflow-hidden rounded-[28px] border border-border bg-card/40 dark:bg-black/20 md:bg-card/70 md:dark:bg-black/35 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.2)] dark:shadow-[0_0_60px_rgba(0,0,0,0.35)] p-5 sm:p-6 lg:p-7"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] xl:grid-cols-[290px_1fr_310px] lg:items-center gap-5 lg:gap-6">
          {/* Avatar */}
          <div
            data-avatar-anchor
            className="relative shrink-0 mx-auto"
            style={{ width: "280px", height: "280px" }}
          >
            {/* Radial glow background */}
            <div
              className="absolute rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "230px",
                height: "230px",
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(56,189,248,0.1) 50%, transparent 70%)",
                filter: "blur(20px)",
              }}
              aria-hidden="true"
            />
            {/* Outer glowing border ring */}
            <div
              className="absolute rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "220px",
                height: "220px",
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.8), rgba(56,189,248,0.6))",
                padding: "2px",
                boxShadow: "0 0 35px rgba(124,58,237,0.38)",
              }}
              aria-hidden="true"
            />
            <Image
              src="/msonzah.jpg"
              alt="Portrait of Witness H Musonza"
              width={480}
              height={480}
              priority
              quality={100}
              className="absolute rounded-full object-cover border-2 border-violet-500/50"
              style={{
                width: "214px",
                height: "214px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            {/* Available status badge */}
            <div
              className="absolute flex items-center gap-1.5 rounded-full bg-card/95 dark:bg-[#0c0c16]/95 border border-border dark:border-white/10 px-3.5 py-1 text-[11px] font-medium text-foreground shadow-md backdrop-blur-md"
              style={{
                bottom: "4px",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />{" "}
              Available for new opportunities
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 tracking-wide">
              Hey there! 👋
            </p>

            <div>
              <h1
                data-hero-headline
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-foreground"
              >
                I&apos;m{" "}
                <span className="text-violet-600 dark:text-violet-400">
                  <TypewriterText text="Witness H Musonza" />
                </span>
              </h1>
              <p className="mt-1 text-base sm:text-lg lg:text-xl font-bold text-foreground leading-snug">
                I build scalable digital solutions that{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
                  solve real problems.
                </span>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              A{" "}
              <span className="font-semibold text-foreground">
                Fullstack software developer/engineer
              </span>{" "}
              with solid foundations in SDLC, systems architecture, database
              management and sleek UI/UX. Passionate about crafting seamless
              user experiences at the intersection of creativity and
              functionality.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-0.5">
              <MovingBorderButton
                as="button"
                borderRadius="9999px"
                duration={2200}
                containerClassName="inline-flex rounded-full overflow-hidden p-0"
                borderClassName="bg-white/30"
                className="inline-flex items-center gap-1.5 rounded-full border border-transparent bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all hover:bg-violet-500 hover:shadow-[0_0_28px_rgba(168,85,247,0.6)]"
                onClick={() => openContactDrawer()}
              >
                <Mail className="size-3.5" />
                Contact Me
              </MovingBorderButton>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 dark:bg-white/5 px-4 py-2 text-xs font-semibold text-foreground transition-all hover:bg-accent hover:border-primary/30"
              >
                <FolderGit2 className="size-3.5" />
                View Projects
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2.5 mt-1.5">
              <span className="text-xs text-muted-foreground">Find me on</span>
              <div className="flex items-center gap-1">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-8 items-center justify-center rounded-lg border border-border bg-background/60 dark:bg-white/5 text-muted-foreground transition-all hover:bg-accent hover:text-primary hover:border-primary/30"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="w-full">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
}
