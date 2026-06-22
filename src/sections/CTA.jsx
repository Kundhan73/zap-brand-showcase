import { useState, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { brand } from '../data/brand.js'
import { useSound } from '../context/SoundContext.jsx'
import { ArrowRight, Bolt } from '../components/Icons.jsx'

const CTA = forwardRef(function CTA(_, ref) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | success
  const { zap } = useSound()

  const onSubmit = (e) => {
    e.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      setStatus('error')
      return
    }
    setStatus('success')
    zap(1.3)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 overflow-hidden bg-ink px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="bg-radial-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-4xl text-center">
        <span className="pill glass mb-6 inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-lime">
          <Bolt width={14} height={14} /> Get charged
        </span>
        <h2 className="font-display text-5xl font-black leading-[0.9] tracking-tightest text-cream sm:text-7xl">
          Ready to feel<br /> the voltage?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Join the list for first dibs on new flavors, pop-up drops and a launch-day discount.
          No spam — just the good stuff.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-10 max-w-md rounded-3xl border border-lime bg-lime/10 p-6"
            >
              <p className="font-display text-2xl font-bold text-lime">You're charged up! ⚡</p>
              <p className="mt-2 text-muted">
                Welcome to ZAP. Check <span className="text-cream">{email}</span> for your launch code.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                placeholder="you@example.com"
                className={`flex-1 rounded-full border bg-ink2 px-6 py-4 font-mono text-sm text-cream outline-none transition-colors placeholder:text-muted ${
                  status === 'error' ? 'border-magenta' : 'border-line focus:border-lime'
                }`}
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-lime px-7 py-4 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105 active:scale-95"
              >
                Charge me
                <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        {status === 'error' && (
          <p className="mt-3 font-mono text-xs text-magenta">Please enter a valid email address.</p>
        )}

        <div className="mt-12 flex flex-col items-center justify-center gap-2 font-mono text-sm text-muted sm:flex-row sm:gap-8">
          <a href={`mailto:${brand.email}`} className="transition-colors hover:text-cream">
            {brand.email}
          </a>
          <span className="hidden sm:inline">·</span>
          <span>{brand.city}</span>
        </div>
      </div>
    </section>
  )
})

export default CTA
