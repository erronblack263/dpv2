import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Witness H Musonza, a software developer building digital products, experiences, and systems with a product-first mindset.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-border bg-card/60 p-6 shadow-[0_0_50px_rgba(124,58,237,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">
              About Me
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              I design and build software that solves real problems.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              I&apos;m Witness H Musonza, a full-stack developer and product-minded engineer
              focused on web, mobile, and backend systems. I enjoy turning ambiguity into
              clean architecture, polished interfaces, and reliable products that people can
              actually use.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              My work sits at the intersection of engineering, design, and product thinking,
              helping founders and teams ship features faster without losing quality or clarity.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-background/60 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card/70 p-4">
                <div className="text-3xl font-black text-foreground">5+</div>
                <div className="mt-2 text-sm text-muted-foreground">Years building digital products</div>
              </div>
              <div className="rounded-2xl border border-border bg-card/70 p-4">
                <div className="text-3xl font-black text-foreground">10+</div>
                <div className="mt-2 text-sm text-muted-foreground">Technologies mastered</div>
              </div>
              <div className="rounded-2xl border border-border bg-card/70 p-4">
                <div className="text-3xl font-black text-foreground">2</div>
                <div className="mt-2 text-sm text-muted-foreground">Core strengths: systems + experiences</div>
              </div>
              <div className="rounded-2xl border border-border bg-card/70 p-4">
                <div className="text-3xl font-black text-foreground">∞</div>
                <div className="mt-2 text-sm text-muted-foreground">Curiosity for better solutions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
