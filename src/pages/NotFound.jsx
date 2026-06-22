import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'

export default function NotFound() {
  return (
    <>
      <SEO title="404" description="This page fizzled out." />
      <section className="flex min-h-screen flex-col items-center justify-center gap-5 bg-ink px-6 text-center">
        <span className="font-display text-[28vw] font-black leading-none tracking-tightest text-lime sm:text-[12rem]">
          404
        </span>
        <p className="font-display text-2xl font-bold text-cream">This page fizzled out.</p>
        <p className="max-w-sm text-muted">The link you followed has gone flat. Let's get you back to something refreshing.</p>
        <Link
          to="/"
          className="mt-2 rounded-full bg-lime px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105 active:scale-95"
        >
          Back to ZAP
        </Link>
      </section>
    </>
  )
}
