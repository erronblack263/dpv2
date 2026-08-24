"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { animate, stagger } from "animejs";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Database,
  Layers,
  Package,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { VideoPlayer } from "@/components/video-player";

function streamUrl(videoUrl: string) {
  return videoUrl.replace(
    "/video/upload/",
    "/video/upload/q_auto,f_auto,vc_auto,fl_progressive/",
  );
}

function cloudinaryThumb(videoUrl: string) {
  return videoUrl
    .replace(
      "/video/upload/",
      "/video/upload/so_0,w_900,q_auto,f_auto/",
    )
    .replace(/\.mp4$/, ".jpg");
}

type DemoCategory =
  | "All demos"
  | "Overview"
  | "Authentication"
  | "Products"
  | "Categories"
  | "Customers"
  | "User management"
  | "Orders"
  | "Search & updates"
  | "Delete operations"
  | "Summary";

interface DemoFrame {
  readonly title: string;
  readonly category: Exclude<DemoCategory, "All demos">;
  readonly description: string;
  readonly video: string;
}

const DEMO_FRAMES: readonly DemoFrame[] = [
  {
    title: "Introduction",
    category: "Overview",
    description: "A quick tour of the Reda Inventory Management System.",
    video: "https://res.cloudinary.com/virfpzu4/video/upload/v1787568897/1.intro_lia72w.mp4",
  },
  {
    title: "Authentication",
    category: "Authentication",
    description: "Sign-in and account access flow for the inventory system.",
    video: "https://res.cloudinary.com/virfpzu4/video/upload/v1787568940/2.authentication_kaipha.mp4",
  },
  {
    title: "Products Page",
    category: "Products",
    description: "Create, view, update, and delete product records.",
    video: "https://res.cloudinary.com/virfpzu4/video/upload/v1787568915/3.products_CRUD_kd5gyy.mp4",
  },
  {
    title: "Categories Page",
    category: "Categories",
    description: "Manage the categories that organize inventory products.",
    video: "https://res.cloudinary.com/virfpzu4/video/upload/v1787568933/4.categories_CRUD_wedhck.mp4",
  },
  {
    title: "Customers Page",
    category: "Customers",
    description: "Maintain customer records through the full CRUD workflow.",
    video: "https://res.cloudinary.com/virfpzu4/video/upload/v1787568931/5.customers_CRUD_nbelp2.mp4",
  },
  {
    title: "User Management",
    category: "User management",
    description: "Manage system users and their account records.",
    video: "https://res.cloudinary.com/virfpzu4/video/upload/v1787568901/6.user_management_CRUD_awx9qj.mp4",
  },
  {
    title: "Orders Page",
    category: "Orders",
    description: "Create and manage order records across the system.",
    video: "https://res.cloudinary.com/virfpzu4/video/upload/v1787568928/7.orders_CRUD_vtgyym.mp4",
  },
  {
    title: "Search & Update Operations",
    category: "Search & updates",
    description: "Find records quickly and update inventory information.",
    video: "https://res.cloudinary.com/virfpzu4/video/upload/v1787568942/8.search_update_operations_io7ihc.mp4",
  },
  {
    title: "Delete Operations",
    category: "Delete operations",
    description: "Remove records cleanly from the inventory workflow.",
    video: "https://res.cloudinary.com/virfpzu4/video/upload/v1787568934/9.delete_operations_b7ggnf.mp4",
  },
  {
    title: "Outro & Summary",
    category: "Summary",
    description: "A closing summary of the Reda system and its capabilities.",
    video: "https://res.cloudinary.com/virfpzu4/video/upload/v1787568867/10.outro_plus_final_exp_ds8cr1.mp4",
  },
];

const CATEGORIES: readonly DemoCategory[] = [
  "All demos",
  "Overview",
  "Authentication",
  "Products",
  "Categories",
  "Customers",
  "User management",
  "Orders",
  "Search & updates",
  "Delete operations",
  "Summary",
];

const PROJECT_DETAILS = [
  { label: "Category", value: "Inventory", icon: Layers },
  { label: "Platform", value: "C# Desktop", icon: Package },
  { label: "Database", value: "MySQL Server", icon: Database },
  { label: "Scope", value: "Full CRUD", icon: ShieldCheck },
];

export default function InventoryManagementDemoPage() {
  const [activeCategory, setActiveCategory] = useState<DemoCategory>("All demos");
  const [activeFrame, setActiveFrame] = useState(0);
  const [previewPage, setPreviewPage] = useState(0);
  const filteredFrames =
    activeCategory === "All demos"
      ? DEMO_FRAMES
      : DEMO_FRAMES.filter((frame) => frame.category === activeCategory);
  const frame = filteredFrames[activeFrame] ?? filteredFrames[0];
  const previewPageSize = 3;
  const previewPageCount = Math.ceil(filteredFrames.length / previewPageSize);
  const visibleFrames = filteredFrames.slice(
    previewPage * previewPageSize,
    (previewPage + 1) * previewPageSize,
  );

  useEffect(() => {
    const video = document.querySelector<HTMLElement>("[data-demo-video]");
    if (!video) return;
    const animation = animate(video, {
      opacity: [0.35, 1],
      scale: [0.985, 1],
      duration: 420,
      ease: "outCubic",
    });
    return () => {
      animation.cancel();
    };
  }, [activeFrame, activeCategory]);

  useEffect(() => {
    const surfaces = document.querySelectorAll<HTMLElement>(
      "[data-demo-details], [data-demo-workflow], [data-demo-preview-card]",
    );
    if (!surfaces.length) return;
    const animation = animate(surfaces, {
      opacity: [0, 1],
      translateY: [10, 0],
      delay: stagger(45),
      duration: 400,
      ease: "outCubic",
    });
    return () => {
      animation.cancel();
    };
  }, [activeFrame, activeCategory, previewPage]);

  function changeCategory(category: DemoCategory) {
    setActiveCategory(category);
    setActiveFrame(0);
    setPreviewPage(0);
  }

  function changePreviewPage(page: number) {
    const nextPage = Math.max(0, Math.min(previewPageCount - 1, page));
    setPreviewPage(nextPage);
    setActiveFrame(nextPage * previewPageSize);
  }

  function nextFrame() {
    setActiveFrame((index) => (index + 1) % filteredFrames.length);
  }

  function previousFrame() {
    setActiveFrame(
      (index) => (index - 1 + filteredFrames.length) % filteredFrames.length,
    );
  }

  return (
    <div className="min-h-screen bg-background pb-10 font-sans text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-5 pt-3 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
          <ChevronRight className="size-3" />
          <Link href="/projects" className="transition-colors hover:text-foreground">Projects</Link>
          <ChevronRight className="size-3" />
          <span className="font-medium text-foreground">Reda Inventory Management System</span>
        </nav>

        <div className="grid items-start gap-5 lg:grid-cols-12">
          <section data-demo-details className="relative lg:col-span-4">
            <div className="pointer-events-none absolute -left-10 -top-10 size-64 rounded-full bg-orange-500/15 blur-3xl" />
            <div className="relative z-10">
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                <ArrowLeft className="size-3.5" /> Back to Projects
              </Link>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">SAGE · VIDEO DEMO</p>
              <h1 className="mt-2 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">Inventory control,<br />kept simple.</h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">A C# inventory management system backed by MySQL Server for organizing products, tracking stock records, and keeping daily operations clear.</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-orange-500/40 bg-orange-500/10 px-2.5 py-1 text-[10px] font-semibold text-orange-500"><Database className="size-3" /> Full CRUD</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-500"><Database className="size-3" /> MySQL Server</span>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-2 lg:col-span-5">
            <div data-demo-video className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-orange-500/25 bg-zinc-950 shadow-[0_0_40px_rgba(249,115,22,0.16)]">
              <VideoPlayer key={frame.video} src={streamUrl(frame.video)} thumbnail={cloudinaryThumb(frame.video)} title={frame.title} />
            </div>
            <div data-demo-details className="flex items-center justify-between rounded-xl border border-border bg-card/80 p-3 backdrop-blur-md">
              <div className="min-w-0"><h2 className="truncate text-xs font-bold text-foreground">{frame.title}</h2><p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">{frame.description}</p></div>
              <div className="flex shrink-0 items-center gap-1.5"><span className="font-mono text-[11px] font-bold">{activeFrame + 1}/{filteredFrames.length}</span><button type="button" onClick={previousFrame} className="rounded-md border border-orange-500/30 bg-orange-500/10 p-1 text-orange-500 hover:bg-orange-500/20" aria-label="Previous video"><ChevronLeft className="size-3.5" /></button><button type="button" onClick={nextFrame} className="rounded-md border border-orange-500/30 bg-orange-500/10 p-1 text-orange-500 hover:bg-orange-500/20" aria-label="Next video"><ChevronRight className="size-3.5" /></button></div>
            </div>
          </section>

          <aside data-demo-details className="flex flex-col gap-3 lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-4 shadow-xl"><div className="mb-3 flex items-center gap-2 border-b border-border pb-2.5"><Calendar className="size-3.5 text-orange-500" /><h2 className="text-xs font-bold tracking-wide">Project Details</h2></div><div className="flex flex-col gap-3 text-[11px] text-muted-foreground">{PROJECT_DETAILS.map(({ label, value, icon: Icon }) => <div key={label} className="flex justify-between gap-3"><span className="flex items-center gap-1.5"><Icon className="size-3.5" /> {label}</span><strong className="text-foreground">{value}</strong></div>)}</div></div>
            <Link href="/projects/weather-dashboard/artifacts" className="group rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 transition-colors hover:bg-orange-500/15"><div className="flex items-center justify-between"><span className="text-xs font-bold text-orange-500">Explore project details</span><ArrowRight className="size-4 text-orange-500 transition-transform group-hover:translate-x-1" /></div><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">View the inventory system project page and implementation details.</p></Link>
          </aside>
        </div>

        <div className="mt-5 flex items-center gap-0 overflow-x-auto border-y border-border py-3 scrollbar-none">
          {CATEGORIES.map((category, index) => { const isActive = activeCategory === category; return <div key={category} className="flex shrink-0 items-center"><button type="button" onClick={() => changeCategory(category)} className="group flex flex-col items-center gap-1.5"><span className={`flex size-8 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all ${isActive ? "border-orange-500 bg-orange-500 text-zinc-950 shadow-[0_0_12px_rgba(249,115,22,0.4)]" : "border-border bg-muted text-muted-foreground group-hover:border-orange-500/60 group-hover:text-orange-500"}`}>{index + 1}</span><span className={`whitespace-nowrap text-[10px] font-semibold ${isActive ? "text-orange-500" : "text-muted-foreground group-hover:text-foreground"}`}>{category}</span></button>{index < CATEGORIES.length - 1 && <span className="mx-2 mb-4 h-0.5 w-6 rounded-full bg-border sm:w-10" />}</div>; })}
        </div>

        <section className="mt-5 rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur-md sm:p-4">
          <div className="mb-3 flex items-center justify-between"><h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">Video demos</h2><div className="flex items-center gap-2 text-[10px] text-muted-foreground"><span>{filteredFrames.length} videos in {activeCategory}</span>{previewPageCount > 1 && <span className="flex items-center gap-1.5 border-l border-border pl-2"><button type="button" onClick={() => changePreviewPage(previewPage - 1)} disabled={previewPage === 0} className="flex size-6 items-center justify-center rounded-md border border-orange-500/30 text-orange-500 transition-colors hover:bg-orange-500/10 disabled:pointer-events-none disabled:opacity-30" aria-label="Previous video page"><ChevronLeft className="size-3.5" /></button><span className="font-mono">{previewPage + 1}/{previewPageCount}</span><button type="button" onClick={() => changePreviewPage(previewPage + 1)} disabled={previewPage === previewPageCount - 1} className="flex size-6 items-center justify-center rounded-md border border-orange-500/30 text-orange-500 transition-colors hover:bg-orange-500/10 disabled:pointer-events-none disabled:opacity-30" aria-label="Next video page"><ChevronRight className="size-3.5" /></button></span>}</div></div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{visibleFrames.map((demoFrame, index) => { const frameIndex = previewPage * previewPageSize + index; return <button data-demo-preview-card key={demoFrame.video} type="button" onClick={() => setActiveFrame(frameIndex)} className={`group relative overflow-hidden rounded-xl border p-2 text-left transition-all ${frameIndex === activeFrame ? "border-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.18)]" : "border-border bg-background/50 hover:border-orange-500/40"}`}><div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-950"><Image src={cloudinaryThumb(demoFrame.video)} alt={demoFrame.title} fill quality={65} sizes="(max-width: 640px) 90vw, 30vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-black/25" /><span className="absolute left-2 top-2 rounded-md bg-zinc-950/75 px-1.5 py-0.5 font-mono text-[9px] text-white">{String(frameIndex + 1).padStart(2, "0")}</span><span className="absolute bottom-2 right-2 rounded-md bg-orange-400 px-1.5 py-0.5 text-[9px] font-bold text-zinc-950">VIDEO</span></div><p className="mt-2 truncate text-[11px] font-bold">{demoFrame.title}</p><span className="mt-1 inline-flex w-fit rounded-full border border-orange-500/25 bg-orange-500/10 px-2 py-0.5 text-[9px] font-semibold text-orange-500">{demoFrame.category}</span></button>; })}</div>
        </section>

        <section data-demo-workflow className="mt-5 rounded-xl border border-border bg-card p-4 shadow-xl"><div className="mb-4 flex items-center gap-2 border-b border-border pb-3"><Package className="size-3.5 text-orange-500" /><h2 className="text-xs font-bold tracking-wide">Full CRUD workflow</h2></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{ title: "Create", description: "Add products, categories, customers, users, and orders.", icon: Package }, { title: "Read", description: "Search and review records across the system.", icon: Search }, { title: "Update", description: "Edit product and account data as operations change.", icon: Database }, { title: "Delete", description: "Remove outdated records from the database.", icon: Users }].map(({ title, description, icon: Icon }) => <div key={title} className="flex items-start gap-2.5"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-400 text-zinc-950"><Icon className="size-3.5" /></span><div><h3 className="text-[11px] font-bold">{title}</h3><p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{description}</p></div></div>)}</div></section>

        <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground"><ShieldCheck className="size-4 text-orange-500" /> Ten guided recordings covering the complete C# and MySQL Server inventory workflow.</div>
      </div>
    </div>
  );
}