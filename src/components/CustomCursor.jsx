import { useEffect, useRef, useState } from 'react'

/**
 * A custom two-part cursor (dot + ring) that grows over interactive elements
 * and switches to a "grab" label over draggable cans. Only active on devices
 * with a fine pointer; falls back to the native cursor otherwise.
 */
export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [hot, setHot] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.body.classList.add('custom-cursor')

    let rx = window.innerWidth / 2
    let ry = window.innerHeight / 2
    let dx = rx
    let dy = ry
    let raf

    const onMove = (e) => {
      dx = e.clientX
      dy = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${dx}px, ${dy}px)`
      const t = e.target
      const interactive = t.closest('a, button, [data-cursor="grab"], input, textarea, label')
      setHot(!!interactive)
    }
    const loop = () => {
      rx += (dx - rx) * 0.18
      ry += (dy - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
      document.body.classList.remove('custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-1 -mt-1 h-2 w-2 rounded-full bg-lime"
      />
      <div
        ref={ring}
        className={`pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-cream transition-[width,height,opacity] duration-200 ${
          hot ? 'h-12 w-12 opacity-100' : 'h-8 w-8 opacity-60'
        }`}
        style={{ marginLeft: hot ? -24 : -16, marginTop: hot ? -24 : -16 }}
      />
    </>
  )
}
