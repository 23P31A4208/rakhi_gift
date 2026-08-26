import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

/**
 * Optional cinematic background music.
 * Drop your own soft instrumental track at /public/music/varshini.mp3 to replace it.
 * Nothing plays until the reader clicks OPEN LETTER.
 */
export function MusicControl({ active, autoStart = false, volume = 0.4 }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [available, setAvailable] = useState(true);
  const startedRef = useRef(false);

  // start once, on the user's OPEN LETTER gesture
  useEffect(() => {
    if (!autoStart || startedRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;
    startedRef.current = true;
    audio.volume = 0;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [autoStart]);

  // smooth volume ramp toward the target
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let frame = 0;
    const tick = () => {
      const diff = volume - audio.volume;
      if (Math.abs(diff) < 0.005) {
        audio.volume = Math.min(1, Math.max(0, volume));
        return;
      }
      audio.volume = Math.min(1, Math.max(0, audio.volume + diff * 0.05));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [volume, playing]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      setAvailable(false);
    }
  };

  if (!active) return null;

  return (
    <div className="fixed bottom-4 right-3 z-40 flex items-center gap-1 rounded-full border border-white/10 bg-ink-2/70 px-2 py-1.5 backdrop-blur-md sm:bottom-6 sm:right-6">
      <audio
        ref={audioRef}
        src="/music/varshini.mp3"
        loop
        preload="auto"
        onError={() => setAvailable(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="flex h-10 w-10 items-center justify-center rounded-full text-violet-soft transition-colors hover:bg-violet-royal/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-soft"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>

      <div className="flex h-4 items-end gap-[3px] px-1" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[2px] origin-bottom rounded-full bg-violet-soft/80"
            style={{
              height: "100%",
              transform: playing && !muted ? undefined : "scaleY(0.2)",
              animation:
                playing && !muted
                  ? `eq-bar ${0.9 + i * 0.22}s ease-in-out ${i * 0.1}s infinite`
                  : undefined,
            }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          const audio = audioRef.current;
          if (!audio) return;
          audio.muted = !muted;
          setMuted(!muted);
        }}
        aria-label={muted ? "Unmute music" : "Mute music"}
        className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-violet-royal/25 hover:text-violet-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-soft"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      {!available && (
        <span className="hidden max-w-[9rem] pr-1 text-[10px] leading-tight text-muted-foreground sm:block">
          add /music/varshini.mp3
        </span>
      )}
    </div>
  );
}
