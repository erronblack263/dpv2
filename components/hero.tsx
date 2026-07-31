"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Mail, FolderGit2, ArrowUpRight } from "lucide-react";
import { GitHubIcon, GitLabIcon, LinkedInIcon } from "@/components/social-icons";
import { Terminal } from "@/components/terminal";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/witnessmusonza", Icon: LinkedInIcon },
  { label: "Email", href: "mailto:musonzahw@gmail.com", Icon: Mail },
  { label: "GitHub", href: "https://github.com", Icon: GitHubIcon },
  { label: "GitLab", href: "https://gitlab.com", Icon: GitLabIcon },
];

const skillIcons = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", label: "Flutter" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", label: "Spring Boot" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", label: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", label: "Java" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", label: "Docker" },
];

function OrbitingIcons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const icons = Array.from(container.querySelectorAll<HTMLDivElement>("[data-orbit-icon]"));
    const count = icons.length;
    const radius = 150;
    const cx = 170;
    const cy = 170;
    const speed = 0.35;

    function animate() {
      angleRef.current = (angleRef.current + speed) % 360;
      icons.forEach((el, i) => {
        const angle = ((angleRef.current + (360 / count) * i) * Math.PI) / 180;
        el.style.left = `${cx + radius * Math.cos(angle) - 20}px`;
        el.style.top = `${cy + radius * Math.sin(angle) - 20}px`;
      });
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-visible" aria-hidden="true" style={{ pointerEvents: "none" }}>
      {skillIcons.map(({ src, label }) => (
        <div
          key={label}
          data-orbit-icon
          className="absolute hidden sm:flex size-10 items-center justify-center rounded-full bg-card/90 dark:bg-[#0c0c12]/90 border border-border shadow-lg backdrop-blur-sm"
          style={{ left: 0, top: 0 }}
          title={label}
        >
          <img src={src} alt={label} className="size-5" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pt-4 pb-2"
    >
      <div className="grid lg:grid-cols-[340px_1fr_300px] lg:items-center gap-6 lg:gap-8">

        {/* Avatar + orbit */}
        <div className="relative shrink-0 mx-auto lg:-ml-2" style={{ width: "340px", height: "340px" }}>
          <OrbitingIcons />
          {/* Glow ring */}
          <div
            className="absolute rounded-full"
            style={{
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "230px", height: "230px",
              background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
            aria-hidden="true"
          />
          {/* Avatar border glow */}
          <div
            className="absolute rounded-full"
            style={{
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "216px", height: "216px",
              background: "linear-gradient(135deg, rgba(124,58,237,0.7), rgba(79,70,229,0.5))",
              padding: "2px",
            }}
            aria-hidden="true"
          />
          <Image
            src="/msonzah.jpg"
            alt="Portrait of Witness"
            width={448}
            height={448}
            priority
            quality={100}
            className="absolute rounded-full object-cover border-2 border-violet-500/50"
            style={{ width: "210px", height: "210px", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          />
          {/* Available badge */}
          <div
            className="absolute flex items-center gap-1.5 rounded-full bg-card/90 dark:bg-[#0c0c12]/90 border border-border px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-sm"
            style={{ bottom: "48px", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}
          >
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            Available for new opportunities
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-3 text-center lg:text-left">
          <p className="text-sm font-medium text-foreground/70">Hey there! 👋</p>

          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              I&apos;m{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #7c3aed, #4f46e5, #60a5fa)" }}
              >
                Witness H Musonza
              </span>
            </h1>
            <p className="mt-2 text-xl sm:text-2xl font-bold text-foreground/90 leading-snug">
              I build scalable digital solutions that{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
              >
                solve real problems.
              </span>
            </p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
            A <span className="font-semibold text-foreground">Fullstack software developer/engineer</span> with expertise in SDLC, systems architecture, database management and sleek UI/UX. Passionate about crafting seamless user experiences.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-1">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:shadow-[0_0_28px_rgba(124,58,237,0.65)] hover:brightness-110"
            >
              <Mail className="size-4" />
              Contact Me
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <FolderGit2 className="size-4" />
              View Projects
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-3 mt-1">
            <span className="text-xs text-muted-foreground">Find me on</span>
            <div className="flex items-center gap-1">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="hidden lg:block">
          <Terminal />
        </div>

      </div>
    </section>
  );
}
