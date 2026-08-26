# To My Pottooda, Varshini — A Letter

A single-page cinematic letter, built as a plain **React + JavaScript** app (Vite).

## What changed from the original project

- **Converted from TypeScript to plain JavaScript/JSX** — no `.ts`/`.tsx`, no type
  annotations, no `tsconfig.json`.
- **Converted from TanStack Start (SSR) to a plain client-rendered React app** — no
  server, no router, no React Query. It's one page, so it's just `index.html` +
  `main.jsx` + `App.jsx`.
- **Removed all Lovable-specific code**: the `.lovable/` project metadata, the
  `@lovable.dev/vite-tanstack-config` build plugin, and `lib/lovable-error-reporting.ts`
  (which forwarded errors to `window.__lovableEvents`, the "Edit with Lovable"
  editor hook). None of that ships anymore — there is no watermark, badge, or
  telemetry hook left anywhere in the app.
- **Dropped the unused shadcn/Radix UI kit** and TanStack/React Query dependencies
  that the letter page never actually used, so the project is much lighter.
- **Added a small original rakhi (Raksha Bandhan thread) motif** — hand-drawn as an
  inline SVG in the site's own violet/crimson palette — at the very start (above the
  opening title) and at the very end (in the closing section), to fit the
  brother–sister ("Anna"/"Pottooda") theme of the letter.
- **No text or colors were changed.** Every line of the letter, every color token in
  `styles.css`, and every animation is identical to the original.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static `dist/` folder
you can host anywhere (Netlify, Vercel static, GitHub Pages, etc.) — no server
runtime required.

## Optional background music

Drop a soft instrumental track at `public/music/varshini.mp3` and it will play
(muted at first, then eased in) once the letter is opened. The page works fine
without it — the music control just shows a small note that the file is missing.
