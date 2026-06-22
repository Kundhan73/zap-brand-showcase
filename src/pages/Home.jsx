import { useEffect, useMemo, useRef, useState } from 'react'
import Scene3D from '../three/Scene3D.jsx'
import SEO from '../components/SEO.jsx'
import Hero from '../sections/Hero.jsx'
import Marquee from '../sections/Marquee.jsx'
import Showcase from '../sections/Showcase.jsx'
import Features from '../sections/Features.jsx'
import Story from '../sections/Story.jsx'
import Stats from '../sections/Stats.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import CTA from '../sections/CTA.jsx'
import { flavors } from '../data/brand.js'
import { useSound } from '../context/SoundContext.jsx'

export default function Home() {
  const { zap } = useSound()
  const heroRef = useRef(null)
  const [active, setActive] = useState(true) // pause WebGL when hero off-screen
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Pause the canvas render loop once the hero scrolls out of view.
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.02 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const [citrus, berry, mango] = flavors

  const cans = useMemo(() => {
    if (isMobile) {
      return [
        { key: 'c', flavor: citrus, home: [-1.15, 1.5, 0], scale: 0.78, spin: 0.32 },
        { key: 'b', flavor: berry, home: [1.2, -0.2, -0.5], scale: 0.92, spin: 0.26 },
        { key: 'm', flavor: mango, home: [-0.6, -2.1, -0.4], scale: 0.7, spin: 0.4 },
      ]
    }
    return [
      { key: 'c', flavor: citrus, home: [-3.1, 0.4, 0], scale: 1.12, spin: 0.3 },
      { key: 'b', flavor: berry, home: [3.0, -0.5, -0.6], scale: 1.25, spin: 0.24 },
      { key: 'm', flavor: mango, home: [0.4, 1.7, -1.2], scale: 0.85, spin: 0.4 },
      { key: 'c2', flavor: citrus, home: [4.4, 1.6, -1.8], scale: 0.6, spin: 0.5 },
      { key: 'b2', flavor: berry, home: [-2.0, -1.9, 0.4], scale: 0.7, spin: 0.42 },
    ]
  }, [isMobile, citrus, berry, mango])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <SEO />

      {/* Fixed interactive 3D backdrop — grabbable in the hero, covered by
          opaque sections as you scroll. */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Scene3D
          cans={cans}
          lightA="#ff2d8e"
          lightB="#46e6ff"
          bubbleColor="#c6ff3a"
          bubbles={isMobile ? 70 : 140}
          frameloop={active ? 'always' : 'never'}
          onGrab={(p) => zap(p)}
          className="!pointer-events-auto"
        />
        {/* atmospheric overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,transparent,var(--ink)_85%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* z-10 layer is pointer-events-none so the hero region lets clicks reach
          the cans; the lower block re-enables events for its opaque sections. */}
      <div className="pointer-events-none relative z-10">
        <div ref={heroRef}>
          <Hero onCta={() => scrollTo('flavors')} />
        </div>
        <div className="pointer-events-auto">
          <Marquee />
          <Showcase />
          <Features />
          <Story />
          <Stats />
          <Testimonials />
          <CTA />
        </div>
      </div>
    </>
  )
}
