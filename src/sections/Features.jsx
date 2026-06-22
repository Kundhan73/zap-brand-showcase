import { features } from '../data/brand.js'
import { featureIcon } from '../components/Icons.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Features() {
  return (
    <section className="relative z-10 bg-ink px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Why ZAP</p>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tightest text-cream sm:text-5xl">
            Built different, on purpose.
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = featureIcon[f.icon]
            return (
              <Reveal key={f.title} delay={i * 0.07}>
                <article className="group h-full rounded-3xl border border-line bg-ink2 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-lime">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-lime text-ink transition-transform group-hover:rotate-12">
                    {Icon && <Icon width={24} height={24} />}
                  </div>
                  <h3 className="font-display text-lg font-bold text-cream">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted">{f.body}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
