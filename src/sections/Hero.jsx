import { motion } from 'framer-motion'
import { brand, flavors } from '../data/brand.js'
import { ArrowRight, Bolt } from '../components/Icons.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero({ onCta }) {
  return (
    <section
      id="hero"
      className="pointer-events-none relative flex min-h-[100svh] flex-col items-center justify-center px-5 text-center"
    >
      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 max-w-4xl">
        <motion.span
          variants={item}
          className="pill glass pointer-events-auto mb-6 inline-flex items-center gap-2 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-lime"
        >
          <Bolt width={14} height={14} /> Electric craft soda · est. {brand.founded}
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-[18vw] font-black leading-[0.82] tracking-tightest text-cream sm:text-[15vw] lg:text-[12rem]"
        >
          ZAP
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-2 max-w-xl font-display text-xl font-semibold text-cream sm:text-2xl"
        >
          {brand.tagline}
        </motion.p>
        <motion.p variants={item} className="mx-auto mt-4 max-w-lg text-balance text-muted">
          Real fruit. Plant-powered caffeine. Zero refined sugar. Grab a can and
          throw it around — yes, really.
        </motion.p>

        <motion.div variants={item} className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onCta}
            className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105 active:scale-95"
          >
            Taste the voltage
            <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => document.getElementById('flavors')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full border border-line px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-white/5"
          >
            See flavors
          </button>
        </motion.div>

        <motion.div variants={item} className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-2">
          {flavors.map((f) => (
            <span
              key={f.slug}
              className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: f.color }} />
              {f.name}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted"
      >
        <span className="block animate-float">drag a can ↓ scroll</span>
      </motion.div>
    </section>
  )
}
