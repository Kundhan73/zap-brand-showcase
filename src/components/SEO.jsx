import { Helmet } from 'react-helmet-async'
import { brand } from '../data/brand.js'

/** Per-route document head: title, description, canonical, social tags. */
export default function SEO({ title, description, path = '/' }) {
  const fullTitle = title ? `${title} · ${brand.name}` : `${brand.name} — ${brand.tagline}`
  const desc = description || brand.mission
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={`https://zap.example.com${path}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  )
}
