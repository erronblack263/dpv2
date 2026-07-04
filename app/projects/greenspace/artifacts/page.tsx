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

// Flatten all images for lightbox navigation
const allImages = sections.flatMap((s) => s.images)

export default function GreenSpaceArtifactsPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  function prev() {
    setLightbox((i) => (i !== null ? (i - 1 + allImages.length) % allImages.length : null))
  }

  function next() {
    setLightbox((i) => (i !== null ? (i + 1) % allImages.length : null))
  }

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pt-12 pb-24 sm:px-6">
        {/* Back */}
        <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-10 flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-green-500/15">
            <Trophy className="size-6 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">GreenSpace 🏆 — Project Artifacts</h1>
            <p className="mt-2 text-muted-foreground">Tap any image to view full size.</p>
          </div>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.title} className="mb-14">
            <div className="mb-6 flex items-center gap-3">
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground">{section.title}</h2>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {section.images.map((img, idx) => {
                const globalIdx = allImages.findIndex((i) => i.src === img.src)
                return (
                  <button
                    key={img.src}
                    onClick={() => setLightbox(globalIdx)}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <div className="h-40 w-full overflow-hidden bg-muted">
                      <img
                        src={img.src}
                        alt={img.caption}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="px-2 py-2 text-xs font-medium text-muted-foreground truncate">{img.caption}</p>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Image */}
          <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-3 max-h-full">
            <img
              src={allImages[lightbox].src}
              alt={allImages[lightbox].caption}
              className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
            <p className="text-sm font-medium text-white/80">{allImages[lightbox].caption}</p>
            <p className="text-xs text-white/40">{lightbox + 1} / {allImages.length}</p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </>
  )
}
