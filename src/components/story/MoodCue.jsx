import { useEffect, useRef } from "react";

/**
 * An invisible marker inside the letter flow. When it passes the middle of the
 * viewport it shifts the cinematic background mood — the emotional progression
 * lives in the atmosphere, not in section headings.
 */
export function MoodCue({ mood, onActive }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) onActive(mood);
      },
      { threshold: 0.01, rootMargin: "-45% 0px -45% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mood, onActive]);

  return <div ref={ref} aria-hidden className="h-px w-full" />;
}
