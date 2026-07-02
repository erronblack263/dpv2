'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, ArrowLeft, Monitor, Smartphone, ExternalLink, Code2, Star } from 'lucide-react'
import { Skills } from '@/components/skills'

const featured = {
  title: 'GreenSpace 🏆',
  description:
    'An award-winning agricultural intelligence platform powered by Sage — a custom-trained machine learning model for soil classification, fertility prediction, and accurate soil naming. Features smart image recognition for soil scanning via camera, a React Native (TypeScript) frontend, and rich community engagement tools including event planning, a social forum, and real-time messaging — all backed by Supabase BaaS.',
  image: '/placeholder.jpg',
  tags: ['React Native', 'TypeScript', 'Python', 'Machine Learning', 'Supabase', 'Image Recognition'],
  demo: '#',
  github: '#',
  artifacts: '#',
}

const projects = [
  {
    title: 'Task Management App',
    description: 'A Kanban-style task manager with drag-and-drop, team collaboration, and real-time updates.',
    image: '/placeholder.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    demo: '#',
    github: '#',
  },
  {
    title: 'Mobile Fitness Tracker',
    description: 'Cross-platform mobile app to track workouts, nutrition, and progress with charts and insights.',
    image: '/placeholder.jpg',
    tags: ['Flutter', 'Dart', 'Firebase'],
    demo: '#',
    github: '#',
  },
  {
    title: 'AI Chat Assistant',
    description: 'A conversational AI interface powered by OpenAI, with chat history and markdown rendering.',
    image: '/placeholder.jpg',
    tags: ['Next.js', 'OpenAI', 'TypeScript', 'Tailwind CSS'],
    demo: '#',
    github: '#',
  },
  {
    title: 'Portfolio CMS',
    description: 'A headless CMS for managing portfolio content with a drag-and-drop page builder.',
    image: '/placeholder.jpg',
    tags: ['React', 'Spring Boot', 'PostgreSQL'],
    demo: '#',
    github: '#',
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather dashboard with location search, forecasts, and interactive maps.',
    image: '/placeholder.jpg',
    tags: ['React', 'Python', 'REST API'],
    demo: '#',
    github: '#',
  },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [showEmpty, setShowEmpty] = useState(false)
  const emptyRef = useRef<HTMLDivElement>(null)

  function handleViewProjects() {
    setShowEmpty((prev) => {
      const next = !prev
      if (next) {
        setTimeout(() => {
          emptyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
      }
      return next
    })
  }

  return (
    <>
      <Skills onViewProjects={handleViewProjects} />

      {showEmpty && (
        <div ref={emptyRef} className="mx-auto w-full max-w-6xl px-4 pt-4 pb-24 sm:px-6">

          {/* Featured project */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="size-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Featured Project</span>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-xl">
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-56 md:h-auto bg-gradient-to-br from-green-900/40 to-emerald-800/30 overflow-hidden flex items-center justify-center">
                  {/* decorative blurred blobs */}
                  <div className="absolute top-4 left-4 size-32 rounded-full bg-green-500/20 blur-3xl" />
                  <div className="absolute bottom-4 right-4 size-24 rounded-full bg-emerald-400/20 blur-2xl" />
                  {/* SVG illustration */}
                  <svg viewBox="0 0 200 200" className="relative w-48 h-48 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* soil layers */}
                    <ellipse cx="100" cy="155" rx="70" ry="18" fill="#6b4f2a" opacity="0.8"/>
                    <ellipse cx="100" cy="145" rx="70" ry="18" fill="#8B6340" opacity="0.9"/>
                    <ellipse cx="100" cy="135" rx="70" ry="18" fill="#A0784E"/>
                    {/* plant stem */}
                    <path d="M100 130 Q100 90 100 60" stroke="#4ade80" strokeWidth="3" strokeLinecap="round"/>
                    {/* leaves */}
                    <path d="M100 95 Q80 75 60 80 Q80 95 100 95Z" fill="#22c55e" opacity="0.9"/>
                    <path d="M100 80 Q120 60 140 65 Q120 80 100 80Z" fill="#16a34a" opacity="0.9"/>
                    <path d="M100 65 Q85 48 90 35 Q100 50 100 65Z" fill="#4ade80"/>
                    {/* scan lines (image recognition) */}
                    <rect x="30" y="30" width="60" height="60" rx="8" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6"/>
                    <line x1="30" y1="60" x2="90" y2="60" stroke="#4ade80" strokeWidth="1" opacity="0.5"/>
                    {/* ML dots */}
                    <circle cx="155" cy="50" r="4" fill="#86efac"/>
                    <circle cx="165" cy="65" r="3" fill="#4ade80" opacity="0.7"/>
                    <circle cx="148" cy="70" r="2.5" fill="#22c55e" opacity="0.6"/>
                    <line x1="155" y1="50" x2="165" y2="65" stroke="#4ade80" strokeWidth="0.8" opacity="0.5"/>
                    <line x1="165" y1="65" x2="148" y2="70" stroke="#4ade80" strokeWidth="0.8" opacity="0.5"/>
                    <line x1="155" y1="50" x2="148" y2="70" stroke="#4ade80" strokeWidth="0.8" opacity="0.5"/>
                    {/* award star */}
                    <text x="158" y="28" fontSize="18" textAnchor="middle">🏆</text>
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60 hidden md:block" />
                </div>
                {/* Info */}
                <div className="flex flex-col justify-between p-8">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">{featured.title}</h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{featured.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {featured.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={featured.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-primary/90"
                    >
                      <ExternalLink className="size-4" />
                      Live Demo
                    </a>
                    <a
                      href={featured.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-2xl border border-border bg-background px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
                    >
                      <Code2 className="size-4" />
                      GitHub
                    </a>
                    <a
                      href={featured.artifacts}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-2xl border border-border bg-background px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
                    >
                      <ExternalLink className="size-4" />
                      Artifacts
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-44 bg-muted overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Info */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div>
                    <h3 className="font-bold text-base">{project.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-2 pt-2">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground py-2 text-xs font-semibold transition-colors hover:bg-primary/90"
                    >
                      <ExternalLink className="size-3.5" />
                      Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-xs font-semibold transition-colors hover:bg-accent"
                    >
                      <Code2 className="size-3.5" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No projects fallback — only shown if arrays are empty */}
      {showEmpty === false && false && (
        <div className="flex items-center justify-center px-4 pb-24">
          <div className="w-full max-w-4xl rounded-3xl border border-border bg-card shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="flex flex-col justify-between gap-8 p-8 border-b border-border md:border-b-0 md:border-r">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Coming Soon</p>
                  <h2 className="text-2xl font-extrabold leading-snug text-foreground">No projects here yet. But the stack is ready.</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Projects are currently in the works.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium">
                    <Monitor className="size-4 text-primary" /> React / Next.js
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium">
                    <Smartphone className="size-4 text-primary" /> Flutter / Dart
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-8 p-8">
                <div>
                  <p className="text-8xl font-black text-foreground leading-none">0</p>
                  <p className="mt-2 text-xl font-bold">No Projects Yet</p>
                </div>
                <div className="flex gap-3">
                  <Link href="/" className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-foreground text-background py-2.5 text-sm font-semibold hover:opacity-90">
                    <Home className="size-4" /> Return Home
                  </Link>
                  <button onClick={() => router.back()} className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-background py-2.5 text-sm font-semibold hover:bg-accent">
                    <ArrowLeft className="size-4" /> Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
