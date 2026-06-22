import { brand } from '../data/brand.js'

const words = ['0G REFINED SUGAR', 'PLANT CAFFEINE', 'REAL FRUIT', 'CARBON NEUTRAL', '100% RECYCLABLE', 'NO CRASH']

export default function Marquee({ speed = 'animate-marquee' }) {
  const strip = [...words, ...words]
  return (
    <div className="relative z-10 border-y border-line bg-magenta py-4">
      <div className="marquee-mask overflow-hidden">
        <div className={`flex w-max ${speed} whitespace-nowrap`}>
          {strip.map((w, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-6 font-display text-lg font-extrabold uppercase tracking-tight text-cream">
              {w}
              <span aria-hidden className="text-2xl">⚡</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
