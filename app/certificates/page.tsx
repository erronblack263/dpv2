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
  gradient: string;
}

const allCerts: Cert[] = [
  // Languages
  {
    title: "Python",
    issuer: "Programming Hub",
    category: "Programming",
    description: "Credential validating core Python programming concepts and practical development skills.",
    embed: "https://drive.google.com/file/d/1yMP_8LuicNagfmQu8xnDF4TFWlY1u-Vh/preview",
    gradient: "from-blue-800 via-blue-700 to-indigo-900",
  },
  {
    title: "JavaScript Developer",
    issuer: "Programming Hub",
    category: "Programming",
    description: "Credential demonstrating modern JavaScript patterns, application architecture and best practices.",
    embed: "https://drive.google.com/file/d/1HS9VSHDdZuGyFOzplND_T2siJgwWNlLg/preview",
    gradient: "from-yellow-700 via-amber-600 to-orange-800",
  },
  {
    title: "Dart",
    issuer: "Programming Hub",
    category: "Programming",
    description: "Credential validating Dart programming concepts and practical development skills.",
    embed: "https://drive.google.com/file/d/12Bb1J32eHv11NsQt4YGzMUnRDuzghHWj/preview",
    gradient: "from-cyan-700 via-teal-600 to-blue-900",
  },
  {
    title: "Java Certificate",
    issuer: "Programming Hub",
    category: "Programming",
    description: "Verified Java programming certificate issued by Programming Hub.",
    embed: "https://drive.google.com/file/d/1KnH91NPPXmguP8JtBlpfFfu2Fvcw2e09/preview",
    gradient: "from-red-800 via-rose-700 to-orange-900",
  },
  {
    title: "TypeScript",
    issuer: "Programming Hub",
    category: "Programming",
    description: "Credential validating TypeScript development skills and typed JavaScript patterns.",
    embed: "https://drive.google.com/file/d/1a0Ia1zohZPNSu9W7FkNT5rByB6rjFLED/preview",
    gradient: "from-blue-700 via-sky-600 to-indigo-800",
  },
  // Frameworks
  {
    title: "Spring Boot",
    issuer: "Programming Hub",
    category: "Framework",
    description: "Credential demonstrating Spring Boot backend development and REST API design.",
    embed: "https://drive.google.com/file/d/1Dfr3MiE4edrNApKehrTFgn0aQ2bB2mgC/preview",
    gradient: "from-green-800 via-emerald-700 to-green-900",
  },
  {
    title: "React",
    issuer: "Programming Hub",
    category: "Framework",
    description: "Credential demonstrating React component architecture and modern frontend patterns.",
    embed: "https://drive.google.com/file/d/1ajroacrHht3FVy9LJU7fMzJfAXMKWUSB/preview",
    gradient: "from-sky-600 via-cyan-500 to-blue-800",
  },
  {
    title: "Next.js",
    issuer: "Programming Hub",
    category: "Framework",
    description: "Credential validating Next.js full-stack development and server-side rendering skills.",
    embed: "https://drive.google.com/file/d/1n4mSLZ8BP6SmgtOpx0k17DoA7rMwzwLh/preview",
    gradient: "from-zinc-700 via-zinc-600 to-zinc-900",
  },
  {
    title: "Flutter",
    issuer: "Programming Hub",
    category: "Framework",
    description: "Credential demonstrating cross-platform mobile app development with Flutter and Dart.",
    embed: "https://drive.google.com/file/d/1O8r7n7cZmgBwsbNqWlB4JL3JrILYAQGc/preview",
    gradient: "from-blue-600 via-indigo-500 to-violet-800",
  },
  {
    title: "PyTorch",
    issuer: "Programming Hub",
    category: "Machine Learning",
    description: "Credential validating machine learning model development skills using PyTorch.",
    embed: "https://drive.google.com/file/d/15qtgFGRdxyZLK_g72ExzG32eOUFD2zZf/preview",
    gradient: "from-orange-700 via-red-600 to-rose-900",
  },
];

/* ─── Thumbnail ───────────────────────────────────────────────── */

function CertThumbnail({ gradient }: Readonly<{ gradient: string }>) {
  return (
    <div
      className={`w-full aspect-[16/9] rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-10 text-white/20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
}

/* ─── Card ────────────────────────────────────────────────────── */

function CertCard({ cert, onView }: Readonly<{ cert: Cert; onView: (embed: string) => void }>) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-700/8 bg-gray-900/6 overflow-hidden transition-all duration-200 hover:border-gray-400/12 hover:shadow-sm">
      {/* Thumbnail */}
      <div className="p-3 pb-0">
        <CertThumbnail gradient={cert.gradient} />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Issuer label */}
        <div className="text-xs font-medium text-gray-400">
          {cert.issuer} · {cert.category}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground leading-snug">
          {cert.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {cert.description}
        </p>

        {/* Action */}
        <div className="mt-auto pt-3">
          <button
            onClick={() => onView(cert.embed)}
            className="flex items-center gap-1.5 rounded-full border border-gray-700/12 bg-transparent px-3 py-1 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-800/12"
          >
            View certificate
          </button>
        </div>
      </div>
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
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-6 pb-14">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mt-5 text-left">
            <p className="text-sm font-semibold tracking-wide text-violet-500">
              Professional development · {total} credentials
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Certificates and credentials.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
              A growing record of focused learning across software engineering, cloud platforms and modern development practices.
            </p>
          </div>

          {/* Grid */}
          <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {allCerts.map((cert) => (
              <CertCard key={cert.embed} cert={cert} onView={setSelected} />
            ))}
          </div>
        </div>
      </div>

      {/* Certificate modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Certificate preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelected(null)}
          tabIndex={-1}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
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
