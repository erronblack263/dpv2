'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, BadgeCheck } from 'lucide-react'

const certificates = [
  {
    title: 'Java',
    issuer: 'Programming Hub',
    date: 'Month Year',
    embed: 'https://drive.google.com/file/d/1KnH91NPPXmguP8JtBlpfFfu2Fvcw2e09/preview',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    bg: 'from-orange-500/20 to-red-500/20',
  },
  {
    title: 'JavaScript',
    issuer: 'Programming Hub',
    date: 'Month Year',
    embed: 'https://drive.google.com/file/d/1HS9VSHDdZuGyFOzplND_T2siJgwWNlLg/preview',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    bg: 'from-yellow-400/20 to-yellow-600/20',
  },
  {
    title: 'Dart',
    issuer: 'Programming Hub',
    date: 'Month Year',
    embed: 'https://drive.google.com/file/d/12Bb1J32eHv11NsQt4YGzMUnRDuzghHWj/preview',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
    bg: 'from-cyan-400/20 to-blue-500/20',
  },
  {
    title: 'Python',
    issuer: 'Programming Hub',
    date: 'Month Year',
    embed: 'https://drive.google.com/file/d/1yMP_8LuicNagfmQu8xnDF4TFWlY1u-Vh/preview',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    bg: 'from-blue-500/20 to-yellow-400/20',
  },
  {
    title: 'TypeScript',
    issuer: 'Programming Hub',
    date: 'Month Year',
    embed: 'https://drive.google.com/file/d/1a0Ia1zohZPNSu9W7FkNT5rByB6rjFLED/preview',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    bg: 'from-blue-600/20 to-blue-400/20',
  },
]

export default function CertificatesPage() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pt-20 pb-24 sm:px-6">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Certificates</h1>
        <p className="mt-2 text-muted-foreground">Courses and certifications I&apos;ve completed.</p>
      </div>

      {/* Section header */}
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Languages</h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <div
            key={cert.embed}
            className="flex flex-col rounded-3xl border border-border bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/40"
          >
            {/* Preview thumbnail */}
            <div className={`relative h-32 w-full overflow-hidden bg-gradient-to-br ${cert.bg} flex items-center justify-center`}>
              {/* blurred large logo in background */}
              <Image
                src={cert.icon}
                alt=""
                aria-hidden="true"
                width={112}
                height={112}
                loading="lazy"
                className="absolute opacity-20 blur-xl scale-150 pointer-events-none"
              />
              {/* sharp logo in foreground */}
              <Image
                src={cert.icon}
                alt={cert.title}
                width={64}
                height={64}
                loading="lazy"
                className="relative drop-shadow-lg"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2 p-4">
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base leading-tight">{cert.title}</h3>
                  <BadgeCheck className="size-4 text-green-500 shrink-0" />
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground">{cert.date}</p>
              </div>

              <button
                onClick={() => setSelected(cert.embed)}
                className="mt-1 w-full rounded-2xl bg-secondary text-secondary-foreground py-2 text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                View Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
          onKeyDown={(e) => e.key === 'Escape' && setSelected(null)}
          tabIndex={0}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            <iframe
              src={selected}
              className="w-full"
              style={{ height: '80vh' }}
              allow="autoplay"
              loading="lazy"
              title="Certificate Preview"
            />
          </div>
        </div>
      )}
    </section>
  )
}
