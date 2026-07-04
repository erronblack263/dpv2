import Link from 'next/link'
import { ArrowLeft, Trophy } from 'lucide-react'

// Add your GreenSpace screenshot filenames here
// Place images in /public/artifacts/greenspace/
const images: { src: string; caption: string }[] = [
  // Example — uncomment and replace with real filenames:
  // { src: '/artifacts/greenspace/home-screen.png', caption: 'Home Screen' },
  // { src: '/artifacts/greenspace/soil-scan.png', caption: 'Soil Scan Feature' },
  // { src: '/artifacts/greenspace/results.png', caption: 'Scan Results' },
]

export default function GreenSpaceArtifactsPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-12 pb-24 sm:px-6">
      {/* Back button */}
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="mb-10 flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-green-500/15">
          <Trophy className="size-6 text-green-500" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            GreenSpace 🏆 — Project Artifacts
          </h1>
          <p className="mt-2 text-muted-foreground">
            Screenshots, mockups and design artifacts from the GreenSpace agricultural intelligence platform.
          </p>
        </div>
      </div>

      {/* Gallery */}
      {images.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.src}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {img.caption && (
                <p className="px-4 py-3 text-sm font-medium text-muted-foreground">{img.caption}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-muted">
            <Trophy className="size-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold">No artifacts yet</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Add your GreenSpace screenshots to{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">/public/artifacts/greenspace/</code>{' '}
            and update the images array in this page.
          </p>
        </div>
      )}
    </section>
  )
}
