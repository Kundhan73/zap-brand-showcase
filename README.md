# ZAP — Interactive 3D Brand Showcase

An immersive, production-grade brand showcase website built for the epic
**“Brand Showcase Website with Advanced Animations.”** It presents a (demo)
electric craft-soda brand, **ZAP**, through a playful, Bruno-Simon-style 3D
experience: floating soda cans you can **grab, drag and throw**, scroll-driven
storytelling, animated statistics, and a full set of marketing sections.

> ZAP is a fictional demo brand created to fill the showcase. Everything is
> driven from one content file (`src/data/brand.js`) — swap those values to
> re-skin the whole site for a real brand.

---

## Quick start

```bash
# 1. install dependencies
npm install

# 2. run the dev server (opens on http://localhost:5173)
npm run dev

# optional: production build + local preview
npm run build
npm run preview     # serves the built site on http://localhost:4173
```

Requires Node 18+ (built and verified on Node 22). No environment variables,
no API keys — it runs entirely client-side.

---

## Tech stack

| Concern            | Choice |
|--------------------|--------|
| Framework          | **React 18** + **Vite 5** |
| Routing            | **React Router v6** (HashRouter — works on any static host) |
| Styling            | **Tailwind CSS 3** with a CSS-variable theme system |
| 3D / WebGL         | **Three.js** + **@react-three/fiber** |
| UI animation       | **Framer Motion** |
| Scroll animation   | **GSAP** + **ScrollTrigger** |
| SEO                | **react-helmet-async** + semantic HTML + JSON-LD |

The 3D cans, can labels and bubble particles are **fully procedural** — there
are no external 3D model or image downloads, so the experience loads fast and
works offline once the bundle is served.

---

## How each requirement is met

| Spec requirement | Where it lives |
|---|---|
| Fully responsive React app | Whole app; mobile layouts in every section + reduced can count on small screens (`pages/Home.jsx`) |
| Animated hero section | `sections/Hero.jsx` + interactive 3D backdrop (`three/Scene3D.jsx`, `three/SodaCan.jsx`) |
| Scroll-triggered animations | `sections/Story.jsx` (GSAP ScrollTrigger spine + reveals), `components/Reveal.jsx` (Framer Motion in-view) |
| Interactive product/service showcase | `sections/Showcase.jsx` (flavor switcher) + `pages/FlavorDetail.jsx` (per-flavor route with draggable 3D can) |
| Brand story timeline | `sections/Story.jsx` (animated vertical timeline) |
| Testimonials & social proof | `sections/Testimonials.jsx` (auto-scrolling wall + press logos + rating) |
| Animated statistics & achievements | `sections/Stats.jsx` (GSAP count-up on scroll) |
| Contact & call-to-action | `sections/CTA.jsx` (validated email capture + success state) |
| Mobile-friendly responsive design | Tailwind breakpoints throughout; touch-friendly drag; `pan-y` so the page still scrolls over the canvas |
| Dark/Light theme | `context/ThemeContext.jsx` + `components/ThemeToggle.jsx` (persists to localStorage, respects system pref) |
| Performance optimization | Route-level `React.lazy` + Suspense, manual vendor chunks, capped device pixel ratio, WebGL render loop paused when the hero is off-screen |
| SEO best practices | `components/SEO.jsx` per-route meta, Open Graph/Twitter tags, canonical, JSON-LD in `index.html` |
| Accessibility | `prefers-reduced-motion` honored everywhere, focus-visible inputs, aria-labels, `sr-only` labels |
| React Router | `App.jsx` routes: `/`, `/flavor/:slug`, and a `404` |
| Framer Motion / GSAP | Both used (Framer for UI/micro-interactions, GSAP for scroll timelines/counters) |

---

## Project structure

```
src/
  main.jsx                 # entry: Router + Theme + Sound + Helmet providers
  App.jsx                  # layout shell, routes (lazy), loader, cursor, grain
  index.css                # Tailwind + theme tokens (dark/light)
  data/brand.js            # ← single source of truth for all brand content
  context/                 # ThemeContext, SoundContext (WebAudio "zap")
  lib/                     # gsap registration, useSectionNav hook
  three/                   # Scene3D, SodaCan (drag physics), Bubbles, canTexture
  components/              # Navbar, Footer, Loader, CustomCursor, Reveal, Icons…
  sections/                # Hero, Marquee, Showcase, Features, Story, Stats,
                           #   Testimonials, CTA
  pages/                   # Home, FlavorDetail, NotFound
public/                    # favicon.svg, social-card.svg
```

---

## Things to try

- **Grab a can** in the hero and fling it — it springs back with a bounce.
- Toggle **dark/light** (top-right sun/moon) and **sound** (speaker icon).
- Click a flavor in **“Pick your voltage”**, then **Explore** it for its own
  3D route page.
- Scroll the **timeline** — the spine charges up as you go.

## Customising for a real brand

Edit `src/data/brand.js`: name, tagline, flavors (colors drive the 3D cans and
all accents automatically), stats, timeline, and testimonials. Adjust theme
colors in `src/index.css` (`:root` and `[data-theme="light"]`).
