"use client";

import { useState } from "react";
import Image from "next/image";
import { X, BadgeCheck, ChevronDown, ChevronUp } from "lucide-react";
import { ScrollIndicator } from "@/components/scroll-indicator";

const VISIBLE = 4;

const certificates = [
  {
    title: "Java",
    issuer: "Programming Hub",
    date: "Month Year",
    embed:
      "https://drive.google.com/file/d/1KnH91NPPXmguP8JtBlpfFfu2Fvcw2e09/preview",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    bg: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "JavaScript",
    issuer: "Programming Hub",
    date: "Month Year",
    embed:
      "https://drive.google.com/file/d/1HS9VSHDdZuGyFOzplND_T2siJgwWNlLg/preview",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    bg: "from-yellow-400/20 to-yellow-600/20",
  },
  {
    title: "Dart",
    issuer: "Programming Hub",
    date: "Month Year",
    embed:
      "https://drive.google.com/file/d/12Bb1J32eHv11NsQt4YGzMUnRDuzghHWj/preview",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    bg: "from-cyan-400/20 to-blue-500/20",
  },
  {
    title: "Python",
    issuer: "Programming Hub",
    date: "Month Year",
    embed:
      "https://drive.google.com/file/d/1yMP_8LuicNagfmQu8xnDF4TFWlY1u-Vh/preview",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    bg: "from-blue-500/20 to-yellow-400/20",
  },
  {
    title: "TypeScript",
    issuer: "Programming Hub",
    date: "Month Year",
    embed:
      "https://drive.google.com/file/d/1a0Ia1zohZPNSu9W7FkNT5rByB6rjFLED/preview",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    bg: "from-blue-600/20 to-blue-400/20",
  },
];

const frameworks = [
  {
    title: "Spring Boot",
    issuer: "Programming Hub",
    date: "Month Year",
    embed:
      "https://drive.google.com/file/d/1Dfr3MiE4edrNApKehrTFgn0aQ2bB2mgC/preview",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    bg: "from-green-500/20 to-emerald-600/20",
  },
  {
    title: "React",
    issuer: "Programming Hub",
    date: "Month Year",
    embed:
      "https://drive.google.com/file/d/1ajroacrHht3FVy9LJU7fMzJfAXMKWUSB/preview",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    bg: "from-cyan-400/20 to-blue-500/20",
  },
  {
    title: "Next.js",
    issuer: "Programming Hub",
    date: "Month Year",
    embed:
      "https://drive.google.com/file/d/1n4mSLZ8BP6SmgtOpx0k17DoA7rMwzwLh/preview",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    bg: "from-gray-500/20 to-gray-700/20",
  },
  {
    title: "Flutter",
    issuer: "Programming Hub",
    date: "Month Year",
    embed:
      "https://drive.google.com/file/d/1O8r7n7cZmgBwsbNqWlB4JL3JrILYAQGc/preview",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    bg: "from-blue-400/20 to-cyan-500/20",
  },
  {
    title: "PyTorch",
    issuer: "Programming Hub",
    date: "Month Year",
    embed:
      "https://drive.google.com/file/d/15qtgFGRdxyZLK_g72ExzG32eOUFD2zZf/preview",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    bg: "from-orange-400/20 to-red-600/20",
  },
];

type Cert = {
  title: string;
  issuer: string;
  date: string;
  embed: string;
  icon: string;
  bg: string;
};

function CertCard({
  cert,
  onSelect,
}: Readonly<{ cert: Cert; onSelect: (embed: string) => void }>) {
  return (
    <div className="flex flex-col rounded-3xl border border-border bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/40">
      <div
        className={`relative h-32 w-full overflow-hidden bg-gradient-to-br ${cert.bg} flex items-center justify-center`}
      >
        <Image
          src={cert.icon}
          alt=""
          aria-hidden="true"
          width={112}
          height={112}
          loading="lazy"
          className="absolute opacity-20 blur-xl scale-150 pointer-events-none"
        />
        <Image
          src={cert.icon}
          alt={cert.title}
          width={64}
          height={64}
          loading="lazy"
          className="relative drop-shadow-lg"
        />
      </div>
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
          onClick={() => onSelect(cert.embed)}
          className="mt-1 w-full rounded-2xl bg-secondary text-secondary-foreground py-2 text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          View Certificate
        </button>
      </div>
    </div>
  );
}

function CertSection({
  title,
  items,
  onSelect,
}: Readonly<{
  title: string;
  items: Cert[];
  onSelect: (embed: string) => void;
}>) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, VISIBLE);
  const hasMore = items.length > VISIBLE;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          {title}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((cert) => (
          <CertCard key={cert.embed} cert={cert} onSelect={onSelect} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="size-4" /> Show less
              </>
            ) : (
              <>
                <ChevronDown className="size-4" /> See {items.length - VISIBLE}{" "}
                more
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default function CertificatesPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full">
      <ScrollIndicator />
      {/* Hero banner */}
      <div className="relative w-full h-56 sm:h-72 overflow-hidden -mt-16">
        <Image
          src="/cert.jpg"
          alt="Certificates banner"
          fill
          className="w-full h-full object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 pb-8 pt-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-primary">My</span>{" "}
            <span className="text-white">Certificates</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/70 max-w-lg">
            Courses and certifications I&apos;ve completed across languages and
            frameworks.
          </p>
        </div>
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 pt-6 pb-24 sm:px-6">
        <div className="grid gap-10 xl:grid-cols-2">
          <CertSection
            title="Languages"
            items={certificates}
            onSelect={setSelected}
          />
          <CertSection
            title="Frameworks"
            items={frameworks}
            onSelect={setSelected}
          />
        </div>

        {/* Modal */}
        {selected && (
          <dialog
            open
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 w-full h-full max-w-none max-h-none border-0 bg-transparent"
            onClose={() => setSelected(null)}
          >
            <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-card shadow-2xl">
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
                style={{ height: "80vh" }}
                allow="autoplay"
                loading="lazy"
                title="Certificate Preview"
              />
            </div>
          </dialog>
        )}
      </section>
    </div>
  );
}
