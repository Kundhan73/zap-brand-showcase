import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap.js'
import { stats } from '../data/brand.js'

function format(val, decimals = 0) {
  return decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString('en-US')
}

export default function Stats() {
  const root = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.stat-num').forEach((el) => {
        const target = parseFloat(el.dataset.value)
        const decimals = parseInt(el.dataset.decimals || '0', 10)
        const suffix = el.dataset.suffix || ''
        if (reduce) {
          el.textContent = format(target, decimals) + suffix
          return
        }
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = format(obj.v, decimals) + suffix
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="stats" ref={root} className="relative z-10 overflow-hidden bg-lime px-5 py-20 sm:px-8 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl">
        <h2 className="mb-12 max-w-2xl font-display text-4xl font-black tracking-tightest text-ink sm:text-5xl">
          Numbers that hum.
        </h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-t-2 border-ink/20 pt-5">
              <div
                className="stat-num font-display text-5xl font-black leading-none text-ink sm:text-6xl"
                data-value={s.value}
                data-decimals={s.decimals || 0}
                data-suffix={s.suffix || ''}
              >
                0{s.suffix || ''}
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-widest text-ink/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
