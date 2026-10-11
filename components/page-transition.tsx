"use client";

import { animate } from "animejs";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const content = contentRef.current;
    if (!content || previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      content.style.opacity = "1";
      content.style.transform = "";
      return;
    }

    animate(content, {
      opacity: [0, 1],
      translateY: [32, 0],
      duration: 420,
      ease: "outCubic",
      onComplete: () => {
        content.style.transform = "";
      },
    });
  }, [pathname]);

  return <div ref={contentRef}>{children}</div>;
}