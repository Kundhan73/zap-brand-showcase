import { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle.jsx'
import SoundToggle from './SoundToggle.jsx'
import { brand } from '../data/brand.js'

const sections = [
  { id: 'flavors', label: 'Flavors' },
  { id: 'story', label: 'Story' },
  { id: 'stats', label: 'Numbers' },
  { id: 'testimonials', label: 'Proof' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToSection = useCallback(
    (id) => {
      setOpen(false)
      const scroll = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(scroll, 120)
      } else {
        scroll()
      }
    },
    [location.pathname, navigate]
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 sm:px-6 ${
          scrolled ? 'glass mx-3 py-2 sm:mx-auto' : 'bg-transparent py-2'
        }`}
        style={{ maxWidth: scrolled ? '72rem' : '80rem' }}
      >
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2"
          aria-label="ZAP home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime font-display text-lg font-black text-ink transition-transform group-hover:rotate-12">
            Z
          </span>
          <span className="font-display text-xl font-extrabold tracking-tightest text-cream">
            {brand.wordmark}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => goToSection(s.id)}
              className="rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-cream"
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SoundToggle className="hidden sm:flex" />
          <ThemeToggle />
          <button
            onClick={() => goToSection('contact')}
            className="hidden rounded-full bg-magenta px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-cream transition-transform hover:scale-105 active:scale-95 sm:block"
          >
            Get ZAP
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="pill glass flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-0.5 w-5 bg-cream transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-cream transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-cream transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass mx-3 mt-2 overflow-hidden rounded-3xl p-4 md:hidden"
          >
            <div className="flex flex-col">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => goToSection(s.id)}
                  className="rounded-2xl px-4 py-3 text-left font-display text-lg font-bold text-cream hover:bg-white/5"
                >
                  {s.label}
                </button>
              ))}
              <button
                onClick={() => goToSection('contact')}
                className="mt-2 rounded-2xl bg-magenta px-4 py-3 font-mono text-sm font-bold uppercase tracking-widest text-cream"
              >
                Get ZAP
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
