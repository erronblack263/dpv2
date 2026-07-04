'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Trophy, X, ChevronLeft, ChevronRight } from 'lucide-react'

const sections = [
  {
    title: 'Auth Screens',
    images: [
      { src: '/artifacts/greenspace/auth/splash.jpg', caption: 'Splash Screen' },
      { src: '/artifacts/greenspace/auth/auth_selection screen.jpg', caption: 'Auth Selection' },
      { src: '/artifacts/greenspace/auth/login screen.jpg', caption: 'Login Screen' },
      { src: '/artifacts/greenspace/auth/signup screen.jpg', caption: 'Sign Up Screen' },
      { src: '/artifacts/greenspace/auth/4got pass.jpg', caption: 'Forgot Password' },
    ],
  },
]

const INITIAL_SHOW = 4
const allImages = sections.flatMap((s) => s.images)

function SectionGallery({
  section,
  globalOffset,
  onOpen,
}: {
  section: typeof sections[0]
  globalOffset: number
  onOpen: (idx: number) => void
}) {
  const [page, setPage] = useState(1)
  const perPage = 4
  const total = section.images.length
  const totalPages = Math.ceil(total / perPage)
  const visible = section.images.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="mb-14">
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">{section.title}</h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Grid — 2 cols on mobile, 4 on larger */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((img) => {
          const globalIdx = globalOffset + section.images.findIndex((i) => i.src === img.src)
          return (
            <button
              key={img.src}
              onClick={() => onOpen(globalIdx)}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <div className="h-36 w-full overflow-hidden bg-muted sm:h-40">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="px-2 py-2 text-xs font-medium text-muted-foreground truncate text-left">{img.caption}</p>
            </button>
          )
        })}
      </div>

      {/* Pagination — only shows if more than 4 images */}
      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-sm transition-colors hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="size-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`flex size-8 items-center justify-center rounded-lg border text-xs font-semibold transition-colors ${
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
            className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-sm transition-colors hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function GreenSpaceArtifactsPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  function prev() {
    setLightbox((i) => (i !== null ? (i - 1 + allImages.length) % allImages.length : null))
  }

  function next() {
    setLightbox((i) => (i !== null ? (i + 1) % allImages.length : null))
  }

  // Calculate global offset for each section
  let offset = 0

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pt-12 pb-24 sm:px-6">
        <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Projects
        </Link>

        <div className="mb-10 flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-green-500/15">
            <Trophy className="size-6 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">GreenSpace 🏆 — Project Artifacts</h1>
            <p className="mt-2 text-muted-foreground">Tap any image to view full size.</p>
          </div>
        </div>

        {sections.map((section) => {
          const sectionOffset = offset
          offset += section.images.length
          return (
            <SectionGallery
              key={section.title}
              section={section}
              globalOffset={sectionOffset}
              onOpen={setLightbox}
            />
          )
        })}
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="size-6" />
          </button>

          <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-4 max-h-full w-full max-w-lg">
            <img
              src={allImages[lightbox].src}
              alt={allImages[lightbox].caption}
              className="max-h-[70vh] max-w-[85vw] rounded-2xl object-contain shadow-2xl"
            />
            <p className="text-sm font-medium text-white/80">{allImages[lightbox].caption}</p>
            <p className="text-xs text-white/40 mb-1">{lightbox + 1} / {allImages.length}</p>
            {/* Close button at bottom — always visible */}
            <button
              onClick={() => setLightbox(null)}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="size-4" /> Close
            </button>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </>
  )
}
