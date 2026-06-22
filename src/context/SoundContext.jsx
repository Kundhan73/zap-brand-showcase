import { createContext, useContext, useRef, useState, useCallback } from 'react'

const SoundContext = createContext({ enabled: true, toggle: () => {}, zap: () => {} })

/**
 * Self-contained WebAudio "zap" — no external audio files. A short descending
 * blip with a touch of noise, pitched per interaction.
 */
export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(true)
  const ctxRef = useRef(null)

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return null
      ctxRef.current = new AC()
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
    return ctxRef.current
  }, [])

  const zap = useCallback(
    (pitch = 1) => {
      if (!enabled) return
      const ctx = ensureCtx()
      if (!ctx) return
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(520 * pitch, now)
      osc.frequency.exponentialRampToValueAtTime(120 * pitch, now + 0.18)
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.16, now + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22)
      osc.connect(gain).connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.24)
    },
    [enabled, ensureCtx]
  )

  const toggle = useCallback(() => setEnabled((e) => !e), [])

  return (
    <SoundContext.Provider value={{ enabled, toggle, zap }}>{children}</SoundContext.Provider>
  )
}

export const useSound = () => useContext(SoundContext)
