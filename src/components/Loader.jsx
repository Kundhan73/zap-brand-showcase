import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/** First-load "charging" screen. Counts to 100, then animates away. */
export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    const dur = 1500
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      // ease-out so it feels like it is filling a battery
      const eased = 1 - Math.pow(1 - p, 3)
      setPct(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => onDone?.(), 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
    >
      <div className="flex items-end gap-3">
        <span className="font-display text-6xl font-black tracking-tightest text-cream sm:text-8xl">
          ZAP
        </span>
        <span className="mb-2 font-mono text-lime sm:mb-3 sm:text-xl">{pct}%</span>
      </div>
      <div className="mt-6 h-2 w-56 overflow-hidden rounded-full bg-ink2 sm:w-72">
        <div
          className="h-full rounded-full bg-gradient-to-r from-lime via-cyan to-magenta transition-[width] duration-75"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">Charging the can</p>
    </motion.div>
  )
}
