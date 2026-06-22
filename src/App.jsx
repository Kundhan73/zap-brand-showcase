import { Suspense, lazy, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Grain from './components/Grain.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Loader from './components/Loader.jsx'

// Route-level code splitting for performance.
const Home = lazy(() => import('./pages/Home.jsx'))
const FlavorDetail = lazy(() => import('./pages/FlavorDetail.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink">
      <span className="animate-pulse font-mono text-sm uppercase tracking-[0.3em] text-muted">
        loading…
      </span>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  // Lock scroll while the intro loader is on screen.
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" onDone={() => setLoading(false)} />}</AnimatePresence>

      <ScrollProgress />
      <Grain />
      <CustomCursor />
      <Navbar />
      <ScrollToTop />

      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flavor/:slug" element={<FlavorDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  )
}
