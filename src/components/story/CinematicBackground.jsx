import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/utils.js";

export const MOODS = ["void", "violet", "warm", "crimson", "soft"];

const MOOD_STYLE = {
  void: { violet: 0.12, crimson: 0.02, vignette: 0.95 },
  violet: { violet: 0.6, crimson: 0.08, vignette: 0.8 },
  warm: { violet: 0.85, crimson: 0.22, vignette: 0.7 },
  crimson: { violet: 0.35, crimson: 0.75, vignette: 0.85 },
  soft: { violet: 0.5, crimson: 0.14, vignette: 0.72 },
};

function useDust(count) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        size: 1 + ((i * 13) % 3),
        duration: 26 + ((i * 7) % 26),
        delay: -((i * 11) % 40),
        drift: `${(((i * 17) % 60) - 30) * 1.5}px`,
        opacity: 0.25 + ((i * 5) % 5) / 12,
        crimson: i % 7 === 0,
      })),
    [count],
  );
}

export function CinematicBackground({ mood = "violet" }) {
  const dust = useDust(26);
  const glowRef = useRef(null);
  const [pointerEnabled, setPointerEnabled] = useState(false);
  const tone = MOOD_STYLE[mood];

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setPointerEnabled(true);

    let frame = 0;
    const onMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const node = glowRef.current;
        if (node) {
          node.style.transform = `translate3d(${event.clientX - 300}px, ${event.clientY - 300}px, 0)`;
        }
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* base gradient wash */}
      <div
        className="absolute inset-0 transition-opacity duration-[2500ms]"
        style={{
          opacity: tone.violet,
          background:
            "radial-gradient(120% 90% at 15% 10%, color-mix(in oklab, var(--violet-deep) 90%, transparent), transparent 60%), radial-gradient(100% 80% at 85% 85%, color-mix(in oklab, var(--violet-royal) 40%, transparent), transparent 65%)",
        }}
      />

      {/* slow drifting violet orb */}
      <div
        className="absolute left-[10%] top-[20%] h-[60vmax] w-[60vmax] rounded-full blur-[120px] transition-opacity duration-[2500ms]"
        style={{
          opacity: tone.violet * 0.5,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--violet-royal) 55%, transparent), transparent 70%)",
          animation: "drift-slow 46s ease-in-out infinite",
        }}
      />

      {/* crimson emphasis glow */}
      <div
        className="absolute bottom-[-10%] right-[-5%] h-[55vmax] w-[55vmax] rounded-full blur-[130px] transition-opacity duration-[2500ms]"
        style={{
          opacity: tone.crimson * 0.55,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--crimson) 60%, transparent), transparent 70%)",
          animation: "drift-slow 62s ease-in-out infinite reverse",
        }}
      />

      {/* light streaks */}
      {[18, 54, 82].map((left, i) => (
        <span
          key={left}
          className="absolute top-[-20vh] h-[45vh] w-px"
          style={{
            left: `${left}%`,
            background: `linear-gradient(to bottom, transparent, ${
              i === 1
                ? "color-mix(in oklab, var(--crimson) 70%, transparent)"
                : "color-mix(in oklab, var(--violet-soft) 70%, transparent)"
            }, transparent)`,
            opacity: 0,
            animation: `streak-pass ${22 + i * 9}s ease-in-out ${i * 11}s infinite`,
          }}
        />
      ))}

      {/* floating dust */}
      <div
        className="absolute inset-0 transition-opacity duration-[2000ms]"
        style={{ opacity: mood === "crimson" ? 0.25 : 1 }}
      >
        {dust.map((d) => (
          <span
            key={d.id}
            className={cn("absolute bottom-[-10vh] rounded-full")}
            style={{
              left: d.left,
              width: d.size,
              height: d.size,
              background: d.crimson ? "var(--crimson)" : "var(--violet-soft)",
              boxShadow: `0 0 ${d.size * 5}px currentColor`,
              color: d.crimson ? "var(--crimson)" : "var(--violet-soft)",
              "--dust-x": d.drift,
              "--dust-opacity": d.opacity,
              animation: `dust-float ${d.duration}s linear ${d.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* mouse-following soft glow */}
      {pointerEnabled && (
        <div
          ref={glowRef}
          className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full blur-[100px] opacity-40 transition-transform duration-300 ease-out"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--violet-soft) 22%, transparent), transparent 65%)",
          }}
        />
      )}

      {/* vignette */}
      <div
        className="absolute inset-0 transition-opacity duration-[2500ms]"
        style={{
          opacity: tone.vignette,
          background:
            "radial-gradient(115% 105% at 50% 45%, transparent 35%, color-mix(in oklab, var(--ink) 92%, transparent) 100%)",
        }}
      />

      {/* grain */}
      <div className="grain-overlay absolute inset-0 opacity-[0.045] mix-blend-soft-light" />
    </div>
  );
}
