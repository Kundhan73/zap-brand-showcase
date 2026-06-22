import { testimonials, pressLogos } from '../data/brand.js'
import Reveal from '../components/Reveal.jsx'

export default function Testimonials() {
  const row = [...testimonials, ...testimonials]
  return (
    <section id="testimonials" className="relative z-10 overflow-hidden bg-ink2 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="max-w-xl font-display text-4xl font-black tracking-tightest text-cream sm:text-5xl">
            People genuinely run on it.
          </h2>
          <div className="flex items-center gap-2 font-mono text-sm text-muted">
            <span className="text-2xl font-black text-lime">4.9</span>/5 · 8,400+ reviews
          </div>
        </Reveal>
      </div>

      {/* Auto-scrolling testimonial wall */}
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee-slow gap-5 px-5">
          {row.map((t, i) => (
            <figure
              key={i}
              className="w-[320px] shrink-0 rounded-3xl border border-line bg-ink p-6 sm:w-[380px]"
            >
              <div className="mb-3 font-mono text-xs uppercase tracking-widest text-lime">{t.flavor}</div>
              <blockquote className="text-lg leading-snug text-cream">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  className="grid h-10 w-10 place-items-center rounded-full font-display font-black text-ink"
                  style={{ background: 'var(--magenta)' }}
                >
                  {t.name[0]}
                </span>
                <span>
                  <span className="block font-bold text-cream">{t.name}</span>
                  <span className="block font-mono text-xs text-muted">{t.handle}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Press logos */}
      <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted">As seen in</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {pressLogos.map((p) => (
            <span key={p} className="font-display text-lg font-extrabold tracking-tight text-muted/70">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
