"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";

/* ─── Data ────────────────────────────────────────────────────── */

interface Cert {
  title: string;
  issuer: string;
  category: string;
  description: string;
  embed: string;
}

const allCerts: Cert[] = [
  // Languages
  {
    title: "Python",
    issuer: "Programming Hub",
    category: "Programming",
    description: "Credential validating core Python programming concepts and practical development skills.",
    embed: "https://drive.google.com/file/d/1yMP_8LuicNagfmQu8xnDF4TFWlY1u-Vh/preview",
  },
  {
    title: "JavaScript Developer",
    issuer: "Programming Hub",
    category: "Programming Hub",
    description: "Credential demonstrating modern JavaScript patterns, application architecture and best practices.",
    embed: "https://drive.google.com/file/d/1HS9VSHDdZuGyFOzplND_T2siJgwWNlLg/preview",
  },
  {
    title: "Dart",
    issuer: "Programming Hub",
    category: "Programming",
    description: "Credential validating Dart programming concepts and practical development skills.",
    embed: "https://drive.google.com/file/d/12Bb1J32eHv11NsQt4YGzMUnRDuzghHWj/preview",
  },
  {
    title: "Java Certificate",
    issuer: "Programming Hub",
    category: "Programming Hub",
    description: "Verified Java programming certificate issued by Programming Hub.",
    embed: "https://drive.google.com/file/d/1KnH91NPPXmguP8JtBlpfFfu2Fvcw2e09/preview",
  },
  {
    title: "TypeScript",
    issuer: "Programming Hub",
    category: "Programming Hub",
    description: "Credential validating TypeScript development skills and typed JavaScript patterns.",
    embed: "https://drive.google.com/file/d/1a0Ia1zohZPNSu9W7FkNT5rByB6rjFLED/preview",
  },
  // Frameworks
  {
    title: "Spring Boot",
    issuer: "Programming Hub",
    category: "Programming Hub",
    description: "Credential demonstrating Spring Boot backend development and REST API design.",
    embed: "https://drive.google.com/file/d/1Dfr3MiE4edrNApKehrTFgn0aQ2bB2mgC/preview",
  },
  {
    title: "React",
    issuer: "Programming Hub",
    category: "Programming Hub",
    description: "Credential demonstrating React component architecture and modern frontend patterns.",
    embed: "https://drive.google.com/file/d/1ajroacrHht3FVy9LJU7fMzJfAXMKWUSB/preview",
  },
  {
    title: "Next.js",
    issuer: "Programming Hub",
    category: "Programming Hub",
    description: "Credential validating Next.js full-stack development and server-side rendering skills.",
    embed: "https://drive.google.com/file/d/1n4mSLZ8BP6SmgtOpx0k17DoA7rMwzwLh/preview",
  },
  {
    title: "Flutter",
    issuer: "Programming Hub",
    category: "Programming Hub",
    description: "Credential demonstrating cross-platform mobile app development with Flutter and Dart.",
    embed: "https://drive.google.com/file/d/1O8r7n7cZmgBwsbNqWlB4JL3JrILYAQGc/preview",
  },
  {
    title: "PyTorch",
    issuer: "Programming Hub",
    category: "Programming Hub",
    description: "Credential validating machine learning model development skills using PyTorch.",
    embed: "https://drive.google.com/file/d/15qtgFGRdxyZLK_g72ExzG32eOUFD2zZf/preview",
  },
];

/* ─── Card ────────────────────────────────────────────────────── */

function CertCard({ cert, onView }: Readonly<{ cert: Cert; onView: (embed: string) => void }>) {
  return (
    <div className="w-full flex-col rounded-2xl border border-border bg-card p-4 gap-3 transition-all hover:border-violet-500/40 hover:shadow-lg">
      {/* Eyebrow */}
      <p className="text-[10px] font-bold uppercase tracking-widest text-violet-500">
        {cert.issuer}
      </p>
      {/* Title */}
      <h3 className="text-lg font-bold text-foreground leading-snug">{cert.title}</h3>
      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
      {/* CTA */}
      <button
        onClick={() => onView(cert.embed)}
        className="text-sm font-semibold text-violet-500 hover:text-violet-400 transition-colors text-left"
      >
        View certificate →
      </button>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */

export default function CertificatesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const total = allCerts.length;

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <div className="w-full max-w-none px-5 sm:px-8 pt-6 pb-14">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mt-4 text-left">
            <p className="text-sm font-semibold tracking-wide text-violet-500">
              Professional development · {total} credentials
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Certificates and credentials.
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground leading-relaxed">
              A growing record of focused learning across software engineering, mobile development and modern development practices.
            </p>
          </div>

          {/* Grid */}
          <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {allCerts.map((cert) => (
              <CertCard key={cert.embed} cert={cert} onView={setSelected} />
            ))}
          </div>
        </div>
      </div>

      {/* Certificate modal */}
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
              style={{ height: "80vh" }}
              allow="autoplay"
              loading="lazy"
              title="Certificate Preview"
            />
          </div>
        </div>
      )}
    </>
  );
}
