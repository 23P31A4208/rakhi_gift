import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils.js";

/**
 * Reveals its children with a soft rise/blur transition once they scroll
 * into view. `as` lets the caller pick the rendered tag (p, div, ...).
 */
export function Reveal({ children, delay = 0, as: Tag = "div", className, threshold = 0.25 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform,filter] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]",
        shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[6px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
