import Image from 'next/image'
import Link from 'next/link'
import { Mail, Sparkles, FolderGit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GitHubIcon, GitLabIcon, LinkedInIcon } from '@/components/social-icons'

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedInIcon },
  { label: 'Email', href: 'mailto:musonzahw@gmail.com', Icon: Mail },
  { label: 'GitHub', href: 'https://github.com', Icon: GitHubIcon },
  { label: 'GitLab', href: 'https://gitlab.com', Icon: GitLabIcon },
]

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] items-center"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:text-left">
          <div className="relative shrink-0">
            <div className="absolute -inset-1 rounded-full bg-primary/30 blur-md" aria-hidden="true" />
            <Image
              src="/witness-avatar.png"
              alt="Portrait of Witness"
              width={120}
              height={120}
              priority
              className="relative size-28 rounded-full border-2 border-primary/40 object-cover sm:size-32"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="inline-flex flex-wrap items-center gap-x-3">
                Hey, I&apos;m <span className="text-primary">Witness</span>
                <Sparkles className="size-7 text-primary" aria-hidden="true" />
              </span>
              <br />
              I am a <span className="text-primary">Software Developer</span>
            </h1>

            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
              A <span className="font-semibold text-foreground">fullstack developer</span> with solid
              foundations in <span className="font-semibold text-foreground">design.</span> Passionate
              about crafting seamless user experiences, I thrive at the intersection of creativity and
              functionality.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
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
  )
}
