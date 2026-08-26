/**
 * A small, original line-art rakhi motif — a mauli thread with a mandala
 * pendant — rendered in the letter's own violet/crimson palette so it reads
 * as part of the design rather than a pasted-in clipart sticker.
 */
export function RakhiIcon({ className = "", glow = true }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden
      style={
        glow
          ? { filter: "drop-shadow(0 0 18px color-mix(in oklab, var(--violet-soft) 55%, transparent))" }
          : undefined
      }
    >
      <defs>
        <linearGradient id="rakhi-thread" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--violet-soft)" />
          <stop offset="100%" stopColor="var(--crimson)" />
        </linearGradient>
        <radialGradient id="rakhi-center" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="var(--blush)" />
          <stop offset="55%" stopColor="var(--crimson)" />
          <stop offset="100%" stopColor="var(--crimson-deep)" />
        </radialGradient>
      </defs>

      {/* thread */}
      <path
        d="M4 60 Q 30 46 46 60"
        stroke="url(#rakhi-thread)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M74 60 Q 90 46 116 60"
        stroke="url(#rakhi-thread)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* outer petals */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 360) / 8;
        return (
          <ellipse
            key={i}
            cx="60"
            cy="60"
            rx="9"
            ry="20"
            fill="none"
            stroke="var(--violet-soft)"
            strokeWidth="1.4"
            opacity="0.7"
            transform={`rotate(${angle} 60 60) translate(0 -22)`}
          />
        );
      })}

      {/* center pendant */}
      <circle cx="60" cy="60" r="16" fill="url(#rakhi-center)" />
      <circle cx="60" cy="60" r="16" fill="none" stroke="var(--blush)" strokeWidth="1" opacity="0.6" />
      <circle cx="60" cy="60" r="5.5" fill="var(--blush)" opacity="0.9" />

      {/* small hanging beads */}
      <circle cx="52" cy="80" r="2.6" fill="var(--violet-soft)" opacity="0.85" />
      <circle cx="60" cy="84" r="3" fill="var(--crimson)" opacity="0.9" />
      <circle cx="68" cy="80" r="2.6" fill="var(--violet-soft)" opacity="0.85" />
      <path d="M55 74 L52 80 M60 76 L60 84 M65 74 L68 80" stroke="var(--blush)" strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}
