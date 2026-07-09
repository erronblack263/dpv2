'use client'

import { useState } from 'react'
import { ExternalLink, Code2, Star, LayoutGrid, X } from 'lucide-react'
import { Skills } from '@/components/skills'
import { Button } from '@/components/ui/button'

const featured = {
  title: 'GreenSpace 🏆',
  description:
    'An award-winning agricultural intelligence platform powered by Sage — a custom-trained machine learning model for soil classification, fertility prediction, and accurate soil naming. Features smart image recognition for soil scanning via camera, a React Native (TypeScript) frontend, and rich community engagement tools including event planning, a social forum, and real-time messaging — all backed by Supabase BaaS.',
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
  const [showProjects, setShowProjects] = useState(false)
  const [page, setPage] = useState(1)
  const [descExpanded, setDescExpanded] = useState(false)
  const PER_PAGE = 3 // 3 grid cards per page (+ featured on page 1 = 4 total)
  const totalPages = Math.ceil(projects.length / PER_PAGE)
  const paginated = projects.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="w-full">
      {/* Hero banner — always visible */}
      <div className="relative w-full h-48 sm:h-64 overflow-hidden">
        <img
          src="/projects.jpg.jpg"
          alt="Projects banner"
          className="w-full h-full object-cover object-top"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-primary">My Projects</span>{' '}
            <span className="text-white">Portfolio</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/70 max-w-lg">
            A showcase of applications, tools and systems I&apos;ve designed and built.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pt-8 pb-24 sm:px-6">

      {/* Skills section — hidden when projects are shown */}
      {!showProjects && (
        <Skills onViewProjects={() => setShowProjects(true)} />
      )}

      {/* Projects section — shown when toggled */}
      {showProjects && (
        <div>
          {/* Header row with dismiss button */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">My Projects</h2>
              <p className="mt-1 text-sm text-muted-foreground">A selection of things I&apos;ve built.</p>
            </div>
            <Button variant="outline" className="shrink-0" onClick={() => { setShowProjects(false); setPage(1) }}>
              <X className="size-4" />
              Close
            </Button>
          </div>

          {/* Featured project — page 1 only */}
          {page === 1 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="size-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Featured Project</span>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-xl">
              <div className="grid lg:grid-cols-2">
                {/* SVG illustration */}
                <div className="relative h-36 lg:h-auto bg-gradient-to-br from-green-900/40 to-emerald-800/30 overflow-hidden flex items-center justify-center">
                  <div className="absolute top-4 left-4 size-32 rounded-full bg-green-500/20 blur-3xl" />
                  <div className="absolute bottom-4 right-4 size-24 rounded-full bg-emerald-400/20 blur-2xl" />
                  <svg viewBox="0 0 200 200" className="relative w-28 h-28 lg:w-48 lg:h-48 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="100" cy="155" rx="70" ry="18" fill="#6b4f2a" opacity="0.8"/>
                    <ellipse cx="100" cy="145" rx="70" ry="18" fill="#8B6340" opacity="0.9"/>
                    <ellipse cx="100" cy="135" rx="70" ry="18" fill="#A0784E"/>
                    <path d="M100 130 Q100 90 100 60" stroke="#4ade80" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M100 95 Q80 75 60 80 Q80 95 100 95Z" fill="#22c55e" opacity="0.9"/>
                    <path d="M100 80 Q120 60 140 65 Q120 80 100 80Z" fill="#16a34a" opacity="0.9"/>
                    <path d="M100 65 Q85 48 90 35 Q100 50 100 65Z" fill="#4ade80"/>
                    <rect x="30" y="30" width="60" height="60" rx="8" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6"/>
                    <line x1="30" y1="60" x2="90" y2="60" stroke="#4ade80" strokeWidth="1" opacity="0.5"/>
                    <circle cx="155" cy="50" r="4" fill="#86efac"/>
                    <circle cx="165" cy="65" r="3" fill="#4ade80" opacity="0.7"/>
                    <circle cx="148" cy="70" r="2.5" fill="#22c55e" opacity="0.6"/>
                    <line x1="155" y1="50" x2="165" y2="65" stroke="#4ade80" strokeWidth="0.8" opacity="0.5"/>
                    <line x1="165" y1="65" x2="148" y2="70" stroke="#4ade80" strokeWidth="0.8" opacity="0.5"/>
                    <line x1="155" y1="50" x2="148" y2="70" stroke="#4ade80" strokeWidth="0.8" opacity="0.5"/>
                    <text x="158" y="28" fontSize="18" textAnchor="middle">🏆</text>
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60 hidden md:block" />
                </div>
                {/* Info */}
                <div className="flex flex-col justify-between p-5 lg:p-8">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">{featured.title}</h2>
                    {/* Collapsible description on mobile */}
                    <p className={`mt-3 text-muted-foreground leading-relaxed ${descExpanded ? '' : 'line-clamp-3 lg:line-clamp-none'}`}>
                      {featured.description}
                    </p>
                    <button
                      onClick={() => setDescExpanded((v) => !v)}
                      className="mt-1 text-xs font-semibold text-primary hover:underline lg:hidden"
                    >
                      {descExpanded ? 'Show less ↑' : 'Read more ↓'}
                    </button>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {featured.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="/projects/greenspace/demo" className="flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-primary/90">
                      <ExternalLink className="size-4" /> Live Demo
                    </a>
                    <a href={featured.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-2xl border border-border bg-background px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
                      <Code2 className="size-4" /> GitHub
                    </a>
                    <a href="/projects/greenspace/artifacts" className="flex items-center gap-2 rounded-2xl border border-border bg-background px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
                      <ExternalLink className="size-4" /> Artifacts
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )} {/* end page 1 featured */}

          {/* Project grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((project) => (
              <div key={project.title} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg">
                <div className="relative h-44 bg-muted overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div>
                    <h3 className="font-bold text-base">{project.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-2 pt-2">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground py-2 text-xs font-semibold transition-colors hover:bg-primary/90">
                      <ExternalLink className="size-3.5" /> Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-xs font-semibold transition-colors hover:bg-accent">
                      <Code2 className="size-3.5" /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex size-9 items-center justify-center rounded-xl border border-border bg-background text-sm font-medium transition-colors hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex size-9 items-center justify-center rounded-xl border text-sm font-medium transition-colors ${
                    p === page
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background hover:bg-accent'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex size-9 items-center justify-center rounded-xl border border-border bg-background text-sm font-medium transition-colors hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
              >
                ›
              </button>
            </div>
          )}

          {/* Back to skills */}
          <div className="mt-10 flex justify-center">
            <Button variant="outline" onClick={() => { setShowProjects(false); setPage(1) }}>
              <LayoutGrid className="size-4" />
              Back to Skills
            </Button>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
