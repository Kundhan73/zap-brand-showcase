import { Link } from 'react-router-dom'
import { brand, flavors } from '../data/brand.js'
import { useSectionNav } from '../lib/useSectionNav.js'

export default function Footer() {
  const go = useSectionNav()
  return (
    <footer className="relative z-10 border-t border-line bg-ink2 px-5 pb-10 pt-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-3xl font-black tracking-tightest text-cream">
              {brand.wordmark}
            </span>
            <p className="mt-3 max-w-xs text-sm text-muted">{brand.tagline} {brand.mission}</p>
          </div>

          <FooterCol title="Flavors">
            {flavors.map((f) => (
              <Link key={f.slug} to={`/flavor/${f.slug}`} className="footer-link">
                {f.name}
              </Link>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            <button onClick={() => go('story')} className="footer-link">Our story</button>
            <button onClick={() => go('stats')} className="footer-link">By the numbers</button>
            <button onClick={() => go('testimonials')} className="footer-link">Reviews</button>
            <button onClick={() => go('contact')} className="footer-link">Stockists</button>
          </FooterCol>

          <FooterCol title="Connect">
            <a href={`mailto:${brand.email}`} className="footer-link">{brand.email}</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-link">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="footer-link">TikTok</a>
            <button onClick={() => go('contact')} className="footer-link">Newsletter</button>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono text-xs uppercase tracking-widest text-muted sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {brand.name} Beverages — {brand.city}</span>
          <span>Made with caffeine + Three.js. Demo brand, not a real product.</span>
        </div>
      </div>

      <style>{`.footer-link{display:block;padding:.25rem 0;font-size:.875rem;text-align:left;color:var(--muted);transition:color .2s;background:none;border:0;cursor:pointer} .footer-link:hover{color:var(--cream)}`}</style>
    </footer>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cream">{title}</h4>
      <div className="flex flex-col items-start">{children}</div>
    </div>
  )
}
