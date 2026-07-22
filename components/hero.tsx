import Image from "next/image";
import Link from "next/link";
import { Mail, Sparkles, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  GitHubIcon,
  GitLabIcon,
  LinkedInIcon,
} from "@/components/social-icons";

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
      className="relative flex min-h-[calc(84vh-4rem)] items-center pt-16 sm:min-h-[calc(100vh-4rem)] sm:pt-0"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8 lg:flex-row lg:items-center lg:text-left">
          <div className="relative shrink-0">
            <div
              className="absolute -inset-1 rounded-full bg-primary/30 blur-md"
              aria-hidden="true"
            />
            <Image
              src="/msonzah.jpg"
              alt="Portrait of Witness"
              width={448}
              height={448}
              priority
              quality={100}
              className="relative size-48 rounded-full border-2 border-primary/40 object-cover sm:size-56"
            />
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            <h1 className="text-balance text-[2.15rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:justify-start">
                Hey, I&apos;m <span className="text-primary">Witness H Musonza </span>
                <Sparkles className="size-6 text-primary sm:size-7" aria-hidden="true" />
              </span>
              <br />I am a{" "}
              <span className="text-primary">Software Engineer/Developer</span>
            </h1>

            <p className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0">
              A{" "}
              <span className="font-semibold text-foreground">
                Fullstack software developer/engineer
              </span>{" "}
              with solid foundations in{" "}
              <span className="font-semibold text-foreground"> Software Development Life Cycle (SDLC),systems architecture, database management and creating sleek UI/UX components.</span>{" "}
              Passionate about crafting seamless user experiences, I thrive at
              the intersection of creativity and functionality.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button
                className="rounded-full px-5"
                nativeButton={false}
                render={<Link href="/contact" />}
              >
                <Mail className="size-4" />
                Contact Me
              </Button>
              <Button
                className="rounded-full px-5"
                nativeButton={false}
                variant="outline"
                render={<Link href="/projects" />}
              >
                <FolderGit2 className="size-4" />
                View Projects
              </Button>

              <span
                className="mx-1 hidden h-6 w-px bg-border sm:block"
                aria-hidden="true"
              />

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
