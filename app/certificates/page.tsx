'use client'

import { useState } from 'react'
import { Award, X } from 'lucide-react'

const certificates = [
  {
    title: 'Java',
    issuer: 'Programming Hub',
    date: 'Month Year',
    embed: 'https://drive.google.com/file/d/1KnH91NPPXmguP8JtBlpfFfu2Fvcw2e09/preview',
  },
  {
    title: 'JavaScript',
    issuer: 'Programming Hub',
    date: 'Month Year',
    embed: 'https://drive.google.com/file/d/1HS9VSHDdZuGyFOzplND_T2siJgwWNlLg/preview',
  },
  {
    title: 'Dart',
    issuer: 'Programming Hub',
    date: 'Month Year',
    embed: 'https://drive.google.com/file/d/12Bb1J32eHv11NsQt4YGzMUnRDuzghHWj/preview',
  },
  {
    title: 'Python',
    issuer: 'Programming Hub',
    date: 'Month Year',
    embed: 'https://drive.google.com/file/d/1yMP_8LuicNagfmQu8xnDF4TFWlY1u-Vh/preview',
  },
  {
    title: 'TypeScript',
    issuer: 'Programming Hub',
    date: 'Month Year',
    embed: 'https://drive.google.com/file/d/1a0Ia1zohZPNSu9W7FkNT5rByB6rjFLED/preview',
  },
]

export default function CertificatesPage() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section className="mx-auto w-full max-w-4xl px-4 pt-20 pb-24 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Certificates</h1>
        <p className="mt-2 text-muted-foreground">Courses and certifications I&apos;ve completed.</p>
      </div>

      <h2 className="mb-4 text-xl font-bold tracking-tight text-muted-foreground uppercase">Languages</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {certificates.map((cert) => (
          <div
            key={cert.embed}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Award className="size-5" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold leading-tight">{cert.title}</h2>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              <p className="text-xs text-muted-foreground">{cert.date}</p>
              <button
                onClick={() => setSelected(cert.embed)}
                className="mt-2 w-fit text-xs font-medium text-primary hover:underline"
              >
                View Certificate →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
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
              title="Certificate Preview"
            />
          </div>
        </div>
      )}
    </section>
  )
}
