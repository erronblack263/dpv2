import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Use requestAnimationFrame to ensure the initial state is painted first
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.05,
      rootMargin: "0px 0px -50px 0px",
      ...options,
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
