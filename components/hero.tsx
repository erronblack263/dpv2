"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Mail, Sparkles, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon, GitLabIcon, LinkedInIcon } from "@/components/social-icons";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/witnessmusonza", Icon: LinkedInIcon },
  { label: "Email", href: "mailto:musonzahw@gmail.com", Icon: Mail },
  { label: "GitHub", href: "https://github.com", Icon: GitHubIcon },
  { label: "GitLab", href: "https://gitlab.com", Icon: GitLabIcon },
];

const skillIcons = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", label: "Java" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", label: "Flutter" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", label: "Spring Boot" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", label: "Python" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", label: "TypeScript" },
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
    // Responsive radius — smaller on mobile
    const isMobile = window.innerWidth < 640;
    const radius = isMobile ? 100 : 150;
    const cx = isMobile ? 120 : 170;
    const cy = isMobile ? 120 : 170;
    const speed = 0.4;

    function animate() {
      angleRef.current = (angleRef.current + speed) % 360;
      icons.forEach((el, i) => {
        const angle = ((angleRef.current + (360 / count) * i) * Math.PI) / 180;
        const x = cx + radius * Math.cos(angle) - 20;
        const y = cy + radius * Math.sin(angle) - 20;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      });
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-visible" aria-hidden="true" style={{ pointerEvents: 'none' }}>
      {skillIcons.map(({ src, label }) => (
        <div
          key={label}
          data-orbit-icon
          className="absolute hidden sm:flex size-10 items-center justify-center rounded-full bg-card/90 border border-border shadow-lg backdrop-blur-sm"
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
      className="relative flex min-h-[calc(78vh-4rem)] items-center pt-8 sm:min-h-[calc(100vh-4rem)] sm:pt-0"
    >
      <div className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6 sm:pb-0">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-8 lg:flex-row lg:items-center lg:text-left lg:justify-start">

          {/* Avatar + orbiting icons */}
          <div
            className="relative shrink-0"
            style={{ width: "340px", height: "340px" }}
          >
            <OrbitingIcons />
            <div className="absolute -inset-1 rounded-full bg-primary/30 blur-md" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '230px', height: '230px' }} aria-hidden="true" />
            <Image
              src="/msonzah.jpg"
              alt="Portrait of Witness"
              width={448}
              height={448}
              priority
              quality={100}
              className="absolute rounded-full border-2 border-primary/40 object-cover"
              style={{ width: '210px', height: '210px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          </div>

          <div className="flex flex-col gap-3 sm:gap-6">
            <h1 className="text-balance text-[1.8rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:justify-start">
                Hey, I&apos;m <span className="text-primary">Witness H Musonza </span>
                <Sparkles className="size-6 text-primary sm:size-7" aria-hidden="true" />
              </span>
              <br />I am a{" "}
              <span className="text-primary">Software Engineer/Developer</span>
            </h1>

            <p className="mx-auto max-w-[20rem] text-pretty text-xs leading-relaxed text-muted-foreground sm:max-w-xl sm:text-base lg:mx-0">
              A{" "}
              <span className="font-semibold text-foreground">Fullstack software developer/engineer</span>{" "}
              with solid foundations in{" "}
              <span className="font-semibold text-foreground">Software Development Life Cycle (SDLC), systems architecture, database management and creating sleek UI/UX components.</span>{" "}
              Passionate about crafting seamless user experiences, I thrive at the intersection of creativity and functionality.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:justify-start">
              <Button className="rounded-full px-5" nativeButton={false} render={<Link href="/contact" />}>
                <Mail className="size-4" />
                Contact Me
              </Button>
              <Button className="rounded-full px-5" nativeButton={false} variant="outline" render={<Link href="/projects" />}>
                <FolderGit2 className="size-4" />
                View Projects
              </Button>

              <span className="mx-1 hidden h-6 w-px bg-border sm:block" aria-hidden="true" />

              <div className="flex items-center gap-1">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
