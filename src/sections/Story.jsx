import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap.js'
import { timeline } from '../data/brand.js'
import Reveal from '../components/Reveal.jsx'

export default function Story() {
  const root = useRef(null)
  const line = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      if (line.current) line.current.style.height = '100%'
      return
    }
    const ctx = gsap.context(() => {
      // Draw the spine as the section scrolls through the viewport.
      gsap.fromTo(
        line.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        }
      )

      // Reveal each milestone.
      gsap.utils.toArray('.tl-item').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="story" ref={root} className="relative z-10 bg-ink2 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-magenta">The story</p>
          <h2 className="mt-3 font-display text-5xl font-black tracking-tightest text-cream sm:text-6xl">
            From a garage blender<br className="hidden sm:block" /> to 12 million cans.
          </h2>
        </Reveal>

        <div className="relative pl-10 sm:pl-0">
          {/* spine */}
          <div className="absolute left-3 top-0 h-full w-1 rounded-full bg-line sm:left-1/2 sm:-translate-x-1/2">
            <div ref={line} className="w-full rounded-full bg-gradient-to-b from-lime via-cyan to-magenta" />
          </div>

          <div className="space-y-12 sm:space-y-20">
            {timeline.map((t, i) => (
              <div
                key={t.year}
                className={`tl-item relative sm:flex sm:items-center sm:gap-8 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* node */}
                <span className="absolute -left-[1.85rem] top-1.5 z-10 h-5 w-5 rounded-full border-4 border-ink2 bg-lime sm:left-1/2 sm:-translate-x-1/2" />
                <div className="sm:w-1/2" />
                <div className={`sm:w-1/2 ${i % 2 === 0 ? 'sm:pl-8 sm:text-left' : 'sm:pr-8 sm:text-right'}`}>
                  <span className="font-display text-4xl font-black text-cyan sm:text-5xl">{t.year}</span>
                  <h3 className="mt-1 font-display text-xl font-bold text-cream">{t.title}</h3>
                  <p className="mt-2 text-muted">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
