import { CodeXml, Layers, Palette, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'

const cards = [
  {
    Icon: CodeXml,
    title: 'What I can do',
    intro: 'I can help develop solutions that will help you grow your business:',
    items: [
      'UI/UX Design',
      'Fullstack Web Development',
      'Mobile App Development',
      'Database Design',
      'API Integration',
    ],
  },
  {
    Icon: Layers,
    title: 'Tools I Use',
    intro: 'I use the latest tools and technologies to build functional and scalable products:',
    items: [
      { label: 'Frontend:', detail: 'Tailwind CSS, React, TypeScript' },
      { label: 'Backend:', detail: 'Node.js, Fastify, MongoDB, PostgreSQL' },
      { label: 'Design:', detail: 'Figma, Framer, Photoshop' },
    ],
  },
  {
    Icon: Palette,
    title: 'UI/UX Design',
    intro: 'I am a designer first, developer second. I can help design clean and modern interfaces:',
    items: [
      'User-Centered Design',
      'Modern & Clean UI',
      'Responsive Layouts',
      'Wireframes & Prototypes',
    ],
  },
]

interface SkillsProps {
  onViewProjects?: () => void
}

export function Skills({ onViewProjects }: Readonly<SkillsProps>) {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-4 pt-12 pb-6 sm:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Building Digital Experiences</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Crafting stunning UIs and high-quality applications that stand out.
          </p>
        </div>
        <Button variant="outline" className="shrink-0" onClick={onViewProjects}>
          <LayoutGrid className="size-4" />
          View Projects
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map(({ Icon, title, intro, items }) => (
          <article
            key={title}
            className="rounded-2xl border border-border bg-card p-6 text-card-foreground transition-colors hover:border-primary/50"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="text-lg font-bold">{title}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{intro}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {items.map((item) =>
                typeof item === 'string' ? (
                  <li key={item} className="flex items-start gap-2 font-medium">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {item}
                  </li>
                ) : (
                  <li key={item.label} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>
                      <span className="font-semibold">{item.label}</span>
                      <br />
                      <span className="text-muted-foreground">{item.detail}</span>
                    </span>
                  </li>
                ),
              )}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-0 flex justify-end hidden">
        <Button variant="outline" onClick={onViewProjects}>
          <LayoutGrid className="size-4" />
          View My Projects
        </Button>
      </div>
    </section>
  )
}
