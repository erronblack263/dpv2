"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, FolderGit2 } from "lucide-react";
import {
  GitHubIcon,
  GitLabIcon,
  LinkedInIcon,
} from "@/components/social-icons";
import { Terminal } from "@/components/terminal";

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
  return (
    <section
      id="home"
      className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2 pb-1"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_320px] xl:grid-cols-[260px_1fr_350px] lg:items-center gap-4 lg:gap-6">
        {/* Avatar */}
        <div
          className="relative shrink-0 mx-auto"
          style={{ width: "250px", height: "250px" }}
        >
          {/* Radial glow background */}
          <div
            className="absolute rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "190px",
              height: "190px",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(56,189,248,0.1) 50%, transparent 70%)",
              filter: "blur(16px)",
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
              width: "172px",
              height: "172px",
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.8), rgba(56,189,248,0.6))",
              padding: "2px",
              boxShadow: "0 0 24px rgba(124,58,237,0.35)",
            }}
            aria-hidden="true"
          />
          <Image
            src="/msonzah.jpg"
            alt="Portrait of Witness H Musonza"
            width={330}
            height={330}
            priority
            quality={100}
            className="absolute rounded-full object-cover border-2 border-violet-500/50"
            style={{
              width: "166px",
              height: "166px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* Available status badge */}
          <div
            className="absolute flex items-center gap-1.5 rounded-full bg-card/95 dark:bg-[#0c0c16]/95 border border-border dark:border-white/10 px-3 py-1 text-[11px] font-medium text-foreground shadow-md backdrop-blur-md"
            style={{
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
            Available for new opportunities
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-2.5 text-center lg:text-left">
          <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 tracking-wide">
            Hey there! 👋
          </p>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-foreground">
              I&apos;m{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                Witness H Musonza
              </span>
            </h1>
            <p className="mt-1 text-base sm:text-lg lg:text-xl font-bold text-foreground/90 leading-snug">
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
            management and sleek UI/UX. Passionate about crafting seamless user
            experiences at the intersection of creativity and functionality.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-0.5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.45)] transition-all hover:shadow-[0_0_28px_rgba(99,102,241,0.7)] hover:brightness-110"
            >
              <Mail className="size-3.5" />
              Contact Me
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-full border border-border dark:border-white/15 bg-card/80 dark:bg-white/5 px-4 py-2 text-xs font-semibold text-foreground transition-all hover:bg-accent dark:hover:bg-white/10 hover:border-border/80 dark:hover:border-white/25"
            >
              <FolderGit2 className="size-3.5" />
              View Projects
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-2.5 mt-1">
            <span className="text-[11px] text-muted-foreground">
              Find me on
            </span>
            <div className="flex items-center gap-1">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-7 items-center justify-center rounded-lg border border-border dark:border-white/10 bg-card/60 dark:bg-white/5 text-muted-foreground transition-all hover:bg-accent dark:hover:bg-white/10 hover:text-foreground hover:border-border/80 dark:hover:border-white/20"
                >
                  <Icon className="size-3.5" />
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
    </section>
  );
}
