import { useCallback, useEffect, useRef, useState } from "react";
import { CinematicBackground } from "../components/story/CinematicBackground.jsx";
import { MoodCue } from "../components/story/MoodCue.jsx";
import { MusicControl } from "../components/story/MusicControl.jsx";
import { OpeningScreen } from "../components/story/OpeningScreen.jsx";
import { Reveal } from "../components/story/Reveal.jsx";
import { RakhiIcon } from "../components/story/RakhiIcon.jsx";

/* ---------- typography pieces ---------- */

function P({ children, delay = 0 }) {
  return (
    <Reveal
      as="p"
      delay={delay}
      threshold={0.15}
      className="text-pretty text-[1.0625rem] leading-[1.95] text-foreground/80 sm:text-lg sm:leading-[2]"
    >
      {children}
    </Reveal>
  );
}

/** larger typography moment — same words, more air */
function Emphasis({ children, tone = "violet", delay = 0 }) {
  const toneClass =
    tone === "crimson"
      ? "text-gradient-crimson text-glow-crimson"
      : tone === "violet"
        ? "text-gradient-violet text-glow-violet"
        : "text-foreground/90";
  return (
    <Reveal
      as="p"
      delay={delay}
      threshold={0.15}
      className={`py-4 font-display text-[1.75rem] font-light leading-[1.25] tracking-[0.02em] sm:text-4xl ${toneClass}`}
    >
      {children}
    </Reveal>
  );
}

function Telugu({ children, delay = 0 }) {
  return (
    <Reveal
      as="p"
      delay={delay}
      threshold={0.15}
      className="border-l border-violet-royal/50 pl-4 font-display text-xl italic leading-relaxed text-blush/90 sm:pl-5 sm:text-2xl"
    >
      {children}
    </Reveal>
  );
}

function Breath({ size = "md" }) {
  const h = size === "lg" ? "h-[38vh]" : size === "sm" ? "h-10" : "h-[18vh]";
  return <div aria-hidden className={h} />;
}

/* ---------- page ---------- */

/** invisible marker that sets the music volume as it passes mid-viewport */
function VolumeCue({ level, onActive }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) onActive(level);
      },
      { threshold: 0.01, rootMargin: "-45% 0px -45% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [level, onActive]);
  return <div ref={ref} aria-hidden className="h-px w-full" />;
}

export function LetterPage() {
  const [opened, setOpened] = useState(false);
  const [mood, setMood] = useState("void");
  const [volume, setVolume] = useState(0.34);

  const onMood = useCallback((next) => setMood(next), []);
  const onVolume = useCallback((next) => setVolume(next), []);
  const done = useCallback(() => setOpened(true), []);

  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
    setMood("violet");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [opened]);

  return (
    <>
      <CinematicBackground mood={opened ? mood : "void"} />
      {!opened && <OpeningScreen onOpen={done} />}

      {/* Rendered outside <main> on purpose: <main> is scaled/blurred during the
          open transition, and a CSS transform or filter on an ancestor creates a
          new containing block for position:fixed children — which would make the
          music control scroll away with the page instead of staying pinned to the
          viewport. Keeping it as a sibling here keeps it truly fixed at all times. */}
      <MusicControl active={opened} autoStart={opened} volume={volume} />

      <main
        className={`relative transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          opened ? "scale-100 opacity-100 blur-0" : "scale-[0.985] opacity-0 blur-sm"
        }`}
        aria-hidden={!opened}
      >
        <article className="relative mx-auto w-full max-w-[42rem] px-5 sm:px-8">
          {/* subtle paper-inspired texture behind the words (not a literal sheet) */}
          <div
            aria-hidden
            className="grain-overlay pointer-events-none absolute inset-x-0 -top-10 bottom-0 -z-10 opacity-[0.05] mix-blend-soft-light"
          />
          {/* opening of the letter */}
          <header className="flex flex-col items-center pt-[18vh] text-center sm:pt-[22vh]">
            <Reveal
              as="h1"
              className="text-gradient-violet font-display text-[2.1rem] font-light leading-[1.2] tracking-[0.03em] sm:text-6xl"
            >
              To My Pottooda, Varshini <span className="text-crimson">❤️</span>
            </Reveal>
            <Reveal as="p" delay={700} className="mt-12 text-[11px] tracking-[0.4em] text-muted-foreground/70">
              SCROLL SLOWLY
            </Reveal>
            <div
              aria-hidden
              className="mt-6 h-20 w-px bg-gradient-to-b from-violet-soft/60 to-transparent"
            />
          </header>

          <Breath />

          {/* the letter, continuous */}
          <div className="space-y-10 sm:space-y-12">
            <MoodCue mood="violet" onActive={onMood} />
            <VolumeCue level={0.34} onActive={onVolume} />

            <Emphasis tone="crimson">Happy Rakhi, Pottooda. ❤️</Emphasis>
            <P>This Rakhi, I didn&apos;t want to give you just another gift.</P>
            <P>I wanted to give you something that carries a little piece of my heart with it.</P>

            <P>
              There are some people who enter our life without us knowing how important they are
              going to become.
            </P>
            <P>You were one of those people.</P>
            <P>
              When I first came to college, I never thought that the person who would become my
              first real bond there would be you. Somehow, within a short time, you became much more
              than just a friend or even a sister to me.
            </P>
            <Reveal className="py-2">
              <p className="font-display text-[1.6rem] leading-snug text-foreground sm:text-4xl">
                You became my{" "}
                <span className="font-script text-4xl text-blush sm:text-6xl">pottooda</span>. 🥹❤️
              </p>
            </Reveal>

            <MoodCue mood="warm" onActive={onMood} />

            <P>
              I don&apos;t know exactly when it happened, but somewhere along the way, I started
              looking after you like you were my own daughter. I worried about you, cared about you,
              irritated you, protected you, and sometimes probably acted like I had the right to
              scold you for everything. 😂
            </P>
            <P>But behind all of that, there was always one simple thing—</P>

            <Emphasis tone="crimson">I cared about you.</Emphasis>

            <Breath size="sm" />
            <MoodCue mood="void" onActive={onMood} />

            <P>Then, because of someone else, things between us changed.</P>
            <Emphasis tone="plain">You left.</Emphasis>
            <Breath size="sm" />
            <P>
              For that one year, a lot happened. Maybe I was angry. Maybe I was hurt. Maybe I kept
              wondering what I had done wrong.
            </P>

            <MoodCue mood="violet" onActive={onMood} />

            <P>
              But when you finally realized what had happened and came back to me, I didn&apos;t
              think twice.
            </P>
            <Emphasis>I accepted you again.</Emphasis>
            <P>Because for me, our bond was never about keeping score.</P>
            <Telugu>&ldquo;Nuvvu naatho unnaava? Leda?&rdquo;</Telugu>
            <P>That was never the question.</P>
            <Reveal as="p" className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
              For me, you were still my{" "}
              <span className="font-script text-3xl text-blush sm:text-5xl">pottooda</span>.
            </Reveal>

            <Breath size="sm" />
            <MoodCue mood="void" onActive={onMood} />

            <P>Then, after three months, you left again.</P>
            <P>And honestly...</P>
            <Emphasis tone="crimson">I still don&apos;t know why.</Emphasis>
            <P>Maybe someday I&apos;ll understand. Maybe I won&apos;t.</P>
            <P>But I don&apos;t want this letter to be about asking why you left.</P>
            <P>I want it to be about something much more important.</P>

            <MoodCue mood="violet" onActive={onMood} />

            <Emphasis>Even after everything, I still care about you the same way.</Emphasis>
            <P>Sometimes you may see me looking away.</P>
            <P>Sometimes I may not talk to you.</P>
            <P>Sometimes I may act like I don&apos;t care.</P>
            <P>But please don&apos;t mistake my silence for the absence of care.</P>
            <Telugu>Nenu choodakunda unna ani, nenu pattinchukovatledu ani kaadu.</Telugu>
            <div className="space-y-4 font-display text-2xl text-foreground sm:text-3xl">
              {["I still notice.", "I still worry.", "I still care."].map((line, i) => (
                <Reveal as="p" key={line} delay={i * 260} threshold={0.15}>
                  {line}
                </Reveal>
              ))}
            </div>

            <P>
              And if life ever becomes difficult for you, if you ever feel completely alone, or if
              you ever genuinely need someone—
            </P>
          </div>

          {/* ---- the ONE CALL moment: quiet, dark, slow ---- */}
          <MoodCue mood="crimson" onActive={onMood} />
          <VolumeCue level={0.52} onActive={onVolume} />
          <section
            aria-label="One call"
            className="relative -mx-6 my-[8vh] flex min-h-[92vh] flex-col items-center justify-center gap-12 px-6 text-center sm:-mx-8 sm:px-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{ background: "radial-gradient(70% 55% at 50% 50%, var(--ink) 55%, transparent)" }}
            />
            <Reveal className="relative">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 blur-[90px]"
                style={{
                  background:
                    "radial-gradient(50% 60% at 50% 50%, color-mix(in oklab, var(--crimson) 40%, transparent), transparent 70%)",
                }}
              />
              <p className="text-gradient-crimson text-glow-crimson font-display text-[3rem] font-light leading-none sm:text-8xl">
                One call.
              </p>
              <p className="mt-5 font-display text-2xl tracking-[0.15em] text-foreground/85 sm:text-4xl">
                That&apos;s all.
              </p>
            </Reveal>

            <div className="space-y-6 text-left">
              <P>I don&apos;t care what happened between us.</P>
              <P delay={160}>I don&apos;t care who is against you.</P>
              <P delay={320}>
                I don&apos;t care whether the entire world is standing on the other side.
              </P>
            </div>

            <div className="w-full space-y-6 text-left">
              <Telugu>Nuvvu okkasari call chesthe chaalu.</Telugu>
              <Telugu delay={420}>Nenu nee venakala nilabadatha.</Telugu>
            </div>

            <Reveal delay={500} className="relative">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 blur-[80px]"
                style={{
                  background:
                    "radial-gradient(50% 70% at 50% 50%, color-mix(in oklab, var(--crimson-deep) 80%, transparent), transparent 70%)",
                }}
              />
              <p className="font-display text-2xl italic leading-snug text-foreground sm:text-4xl">
                Even if it&apos;s against the whole world.
              </p>
            </Reveal>
          </section>

          {/* ---- the letter continues ---- */}
          <MoodCue mood="soft" onActive={onMood} />
          <VolumeCue level={0.34} onActive={onVolume} />
          <div className="space-y-10 sm:space-y-12">
            <P>Because that&apos;s what you became to me.</P>
            <P>Not just a college friend.</P>
            <P>Not just a sister.</P>
            <P>Not just someone from my past.</P>

            <Emphasis>You became family.</Emphasis>

            <P>And family isn&apos;t always about staying together every single day.</P>
            <P>Sometimes family means...</P>
            <div className="space-y-4 font-display text-xl text-muted-foreground sm:text-2xl">
              {[
                "Even after distance.",
                "Even after misunderstandings.",
                "Even after silence.",
                "Even after people come between you.",
              ].map((line, i) => (
                <Reveal as="p" key={line} delay={i * 220} threshold={0.15}>
                  {line}
                </Reveal>
              ))}
            </div>
            <Reveal
              as="p"
              className="text-gradient-violet font-display text-2xl leading-snug sm:text-4xl"
            >
              Somewhere inside, you still wish they are okay.
            </Reveal>
            <P>That&apos;s exactly how I feel about you.</P>

            <MoodCue mood="void" onActive={onMood} />

            <P>I don&apos;t expect anything from you.</P>
            <P>I don&apos;t expect you to come back.</P>
            <P>I don&apos;t expect you to explain everything.</P>
            <P>I don&apos;t even expect you to understand how much you meant to me.</P>
            <P>I just want you to know one thing.</P>
            <P>Whatever happens...</P>

            <Emphasis tone="crimson">my care for you was never temporary.</Emphasis>

            <MoodCue mood="violet" onActive={onMood} />

            <P>You were my first bond in college.</P>
            <Reveal as="p" className="font-display text-2xl text-foreground sm:text-3xl">
              You were my{" "}
              <span className="font-script text-3xl text-blush sm:text-5xl">pottooda</span>.
            </Reveal>
            <P>And no matter how many chapters come after this one,</P>
            <P>that part of my story with you will always remain special.</P>
          </div>

          {/* ---- final moment ---- */}
          <MoodCue mood="soft" onActive={onMood} />
          <section
            aria-label="Final words"
            className="flex flex-col items-center gap-10 py-[16vh] text-center"
          >
            <Reveal as="p" className="font-display text-xl italic text-muted-foreground sm:text-2xl">
              So, Varshini...
            </Reveal>
            <Reveal as="p" delay={200} className="text-lg text-foreground/80 sm:text-xl">
              If someday you ever wonder,
            </Reveal>
            <Reveal as="p" delay={360} className="font-display text-2xl italic text-blush sm:text-3xl">
              &ldquo;Does Satya still care about me?&rdquo;
            </Reveal>
            <Breath size="sm" />
            <Reveal as="p" className="text-lg text-foreground/80 sm:text-xl">
              You already know the answer.
            </Reveal>
            <Reveal className="relative">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 blur-[90px]"
                style={{
                  background:
                    "radial-gradient(50% 60% at 50% 50%, color-mix(in oklab, var(--violet-royal) 50%, transparent), transparent 70%)",
                }}
              />
              <p className="text-gradient-violet text-glow-violet font-display text-[2.75rem] font-light leading-tight sm:text-7xl">
                Avunu. Eppatiki. <span className="text-crimson">❤️</span>
              </p>
            </Reveal>
            <Breath size="sm" />
            <Reveal as="p" className="font-display text-2xl text-foreground sm:text-3xl">
              Take care of yourself,{" "}
              <span className="font-script text-3xl text-blush sm:text-5xl">pottooda</span>.
            </Reveal>
            <Reveal as="p" delay={200} className="font-display text-xl italic text-muted-foreground sm:text-2xl">
              And if you ever need me...
            </Reveal>
            <Reveal as="p" delay={360} className="text-lg text-foreground/80 sm:text-xl">
              You know where to find me.
            </Reveal>
            <Reveal
              as="p"
              delay={520}
              className="text-gradient-crimson text-glow-crimson font-display text-[2.5rem] font-light leading-none sm:text-6xl"
            >
              One call.
            </Reveal>
            <Reveal as="p" delay={700} className="font-display text-2xl italic text-foreground/90 sm:text-3xl">
              I&apos;ll be there.
            </Reveal>
            <Breath size="sm" />
            <Reveal
              as="p"
              delay={860}
              className="text-gradient-crimson text-glow-crimson font-display text-2xl sm:text-3xl"
            >
              Happy Rakhi once again, my Pottooda. ❤️
            </Reveal>
            <Breath size="sm" />
            <Reveal as="p" delay={200} className="font-display text-xl text-foreground sm:text-2xl">
              — Your Anna, Satya <span className="text-crimson">❤️</span>
            </Reveal>
          </section>
        </article>

        {/* fade toward black, one faint violet glow, then the last words */}
        <MoodCue mood="void" onActive={onMood} />
        <VolumeCue level={0.08} onActive={onVolume} />
        <section
          aria-label="Closing"
          className="relative flex min-h-[80vh] flex-col items-center justify-center px-6"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ background: "linear-gradient(to bottom, transparent, var(--ink) 45%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--violet-royal) 22%, transparent), transparent 70%)",
              animation: "glow-breathe 8s ease-in-out infinite",
            }}
          />
          <Reveal delay={200}>
            <div
              aria-hidden
              className="mx-auto mb-8 h-14 w-14 opacity-80 sm:h-16 sm:w-16"
              style={{ animation: "glow-breathe 7s ease-in-out infinite" }}
            >
              <RakhiIcon className="h-full w-full" />
            </div>
          </Reveal>
          <Reveal
            as="p"
            delay={400}
            className="text-center text-[11px] leading-relaxed tracking-[0.3em] text-muted-foreground/60"
          >
            SOME BONDS DON&apos;T END.
            <br />
            THEY JUST BECOME SILENT.
          </Reveal>
        </section>
      </main>
    </>
  );
}
