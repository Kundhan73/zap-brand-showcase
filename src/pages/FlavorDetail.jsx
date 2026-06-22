import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Scene3D from '../three/Scene3D.jsx'
import SEO from '../components/SEO.jsx'
import { getFlavor, flavors } from '../data/brand.js'
import { useSound } from '../context/SoundContext.jsx'
import { useSectionNav } from '../lib/useSectionNav.js'
import { ArrowRight } from '../components/Icons.jsx'

export default function FlavorDetail() {
  const { slug } = useParams()
  const flavor = getFlavor(slug)
  const { zap } = useSound()
  const go = useSectionNav()
  const others = useMemo(() => flavors.filter((f) => f.slug !== slug), [slug])

  if (!flavor) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center">
        <h1 className="font-display text-4xl font-black text-cream">Flavor not found</h1>
        <Link to="/" className="rounded-full bg-lime px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-ink">
          Back to ZAP
        </Link>
      </div>
    )
  }

  const can = [{ key: slug, flavor, home: [0, 0, 0], scale: 1.7, spin: 0.45 }]

  return (
    <>
      <SEO
        title={flavor.name}
        description={`${flavor.blurb} ${flavor.caffeine}mg plant caffeine, ${flavor.sugar}g refined sugar.`}
        path={`/flavor/${slug}`}
      />

      <section className="relative min-h-screen overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: `radial-gradient(60% 60% at 70% 40%, ${flavor.color}55, transparent 70%)` }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-2 lg:pt-32">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-cream"
            >
              ← All flavors
            </Link>
            <p className="font-mono text-sm uppercase tracking-[0.3em]" style={{ color: flavor.color }}>
              {flavor.nickname}
            </p>
            <h1 className="mt-2 font-display text-6xl font-black leading-[0.85] tracking-tightest text-cream sm:text-7xl">
              {flavor.name}
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">{flavor.description}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {flavor.notes.map((n) => (
                <span key={n} className="pill border-line px-4 py-2 font-mono text-xs text-cream">
                  {n}
                </span>
              ))}
            </div>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
              <Spec label="Caffeine" value={`${flavor.caffeine}mg`} color={flavor.color} />
              <Spec label="Refined sugar" value={`${flavor.sugar}g`} color={flavor.color} />
              <Spec label="Calories" value={flavor.calories} color={flavor.color} />
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                onClick={() => zap(flavor.pitch)}
                className="rounded-full px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105 active:scale-95"
                style={{ background: flavor.color }}
              >
                Add to crate
              </button>
              <button
                onClick={() => go('contact')}
                className="rounded-full border border-line px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-white/5"
              >
                Find a stockist
              </button>
            </div>
          </motion.div>

          {/* Interactive 3D can */}
          <div className="relative h-[55vh] min-h-[360px] lg:h-[78vh]">
            <Scene3D
              cans={can}
              lightA={flavor.color}
              lightB={flavor.accent}
              bubbleColor={flavor.color}
              bubbles={90}
              className="!pointer-events-auto"
              onGrab={(p) => zap(p)}
            />
            <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted">
              drag the can ·
            </span>
          </div>
        </div>
      </section>

      {/* More flavors */}
      <section className="relative z-10 bg-ink2 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 font-display text-3xl font-black tracking-tightest text-cream">More voltage</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((f) => (
              <Link
                key={f.slug}
                to={`/flavor/${f.slug}`}
                onClick={() => zap(f.pitch)}
                className="group flex items-center justify-between rounded-3xl border border-line p-6 transition-all hover:-translate-y-1"
                style={{ background: `linear-gradient(90deg, ${f.color}1a, transparent)` }}
              >
                <span>
                  <span className="block font-mono text-xs uppercase tracking-widest" style={{ color: f.color }}>
                    {f.nickname}
                  </span>
                  <span className="block font-display text-2xl font-black text-cream">{f.name}</span>
                </span>
                <ArrowRight className="text-cream transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Spec({ label, value, color }) {
  return (
    <div className="border-t-2 pt-3" style={{ borderColor: color }}>
      <div className="font-display text-3xl font-black text-cream">{value}</div>
      <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-muted">{label}</div>
    </div>
  )
}
