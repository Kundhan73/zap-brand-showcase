import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { flavors } from '../data/brand.js'
import { useSound } from '../context/SoundContext.jsx'
import CanVisual from '../components/CanVisual.jsx'
import Reveal from '../components/Reveal.jsx'
import { ArrowRight } from '../components/Icons.jsx'

export default function Showcase() {
  const [active, setActive] = useState(0)
  const flavor = flavors[active]
  const { zap } = useSound()

  const select = (i) => {
    setActive(i)
    zap(flavors[i].pitch)
  }

  return (
    <section id="flavors" className="relative z-10 overflow-hidden bg-ink px-5 py-24 sm:px-8 sm:py-32">
      {/* color wash that follows the active flavor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-colors duration-700"
        style={{ background: `radial-gradient(60% 50% at 70% 30%, ${flavor.color}55, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime">Three flavors</p>
            <h2 className="mt-3 max-w-xl font-display text-5xl font-black leading-[0.9] tracking-tightest text-cream sm:text-6xl">
              Pick your voltage.
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            Every can: 80mg plant caffeine, 0g refined sugar, real cold-pressed fruit. Tap a
            flavor to charge it up.
          </p>
        </Reveal>

        {/* Tabs */}
        <div className="mb-10 flex flex-wrap gap-3">
          {flavors.map((f, i) => (
            <button
              key={f.slug}
              onClick={() => select(i)}
              className={`group relative overflow-hidden rounded-full border px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                active === i ? 'border-transparent text-ink' : 'border-line text-muted hover:text-cream'
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="flavor-pill"
                  className="absolute inset-0 -z-10"
                  style={{ background: f.color }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: active === i ? f.text : f.color }} />
                {f.name}
              </span>
            </button>
          ))}
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={flavor.slug}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-sm uppercase tracking-widest" style={{ color: flavor.color }}>
                {flavor.nickname}
              </span>
              <h3 className="mt-2 font-display text-5xl font-black tracking-tightest text-cream sm:text-6xl">
                {flavor.name}
              </h3>
              <p className="mt-4 max-w-md text-lg text-muted">{flavor.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {flavor.notes.map((n) => (
                  <span key={n} className="pill border-line px-3 py-1.5 font-mono text-xs text-cream">
                    {n}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid max-w-sm grid-cols-3 gap-4">
                <Stat label="Caffeine" value={`${flavor.caffeine}mg`} />
                <Stat label="Sugar" value={`${flavor.sugar}g`} />
                <Stat label="Calories" value={flavor.calories} />
              </div>

              <Link
                to={`/flavor/${flavor.slug}`}
                onClick={() => zap(flavor.pitch)}
                className="group mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105 active:scale-95"
                style={{ background: flavor.color }}
              >
                Explore {flavor.name}
                <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="relative flex justify-center">
            <div
              className="absolute h-72 w-72 rounded-full blur-3xl transition-colors duration-700"
              style={{ background: `${flavor.color}40` }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={flavor.slug}
                initial={{ opacity: 0, y: 40, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -40, rotate: 6 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <CanVisual flavor={flavor} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="font-display text-2xl font-black text-cream">{value}</div>
      <div className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">{label}</div>
    </div>
  )
}
