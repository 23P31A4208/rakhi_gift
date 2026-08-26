import { useEffect, useState } from "react";
import { cn } from "../../lib/utils.js";
import { RakhiIcon } from "./RakhiIcon.jsx";

/**
 * Minimal cinematic opening screen: rakhi motif, title, signature line, one
 * elegant button. No envelope, no letter text — just the invitation.
 */
export function OpeningScreen({ onOpen }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStep(1), 500),
      window.setTimeout(() => setStep(2), 1600),
      window.setTimeout(() => setStep(3), 2400),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, []);

  const open = () => {
    setLeaving(true);
    window.setTimeout(onOpen, 900);
  };

  return (
    <section
      aria-label="Opening"
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        leaving ? "pointer-events-none scale-[1.06] opacity-0 blur-sm" : "scale-100 opacity-100",
      )}
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--violet-royal) 45%, transparent), transparent 70%)",
          animation: "glow-breathe 9s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[8%] right-[12%] h-[40vmin] w-[40vmin] rounded-full blur-[100px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--crimson) 45%, transparent), transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center">
        <div
          aria-hidden
          className={cn(
            "mb-6 h-16 w-16 transition-all duration-[1400ms] sm:h-20 sm:w-20",
            step >= 1 ? "opacity-90 blur-0" : "translate-y-2 opacity-0 blur-sm",
          )}
          style={{ animation: step >= 1 ? "glow-breathe 7s ease-in-out infinite" : undefined }}
        >
          <RakhiIcon className="h-full w-full" />
        </div>

        <h1
          className={cn(
            "text-gradient-violet font-display text-[2rem] font-light leading-[1.25] tracking-[0.03em] transition-all duration-[1600ms] sm:text-6xl",
            step >= 1 ? "opacity-100 blur-0" : "translate-y-3 opacity-0 blur-sm",
          )}
        >
          To My Pottooda, Varshini <span className="text-crimson">❤️</span>
        </h1>

        <p
          className={cn(
            "mt-7 font-display text-base italic text-muted-foreground transition-all duration-[1400ms] sm:text-lg",
            step >= 2 ? "opacity-100 blur-0" : "translate-y-2 opacity-0 blur-sm",
          )}
        >
          — Your Anna, Satya
        </p>

        <button
          type="button"
          onClick={open}
          className={cn(
            "group relative mt-14 min-h-[3.25rem] rounded-full border border-violet-royal/60 px-9 py-4 text-[11px] tracking-[0.34em] text-foreground/90 transition-all duration-700",
            "shadow-[0_0_45px_-14px_var(--violet-royal)] hover:border-violet-soft hover:text-violet-soft hover:shadow-[0_0_70px_-10px_var(--violet-soft)]",
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-soft active:scale-[0.98]",
            step >= 3 ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 50%, color-mix(in oklab, var(--crimson) 45%, transparent), transparent 70%)",
            }}
          />
          OPEN LETTER
        </button>
      </div>
    </section>
  );
}
