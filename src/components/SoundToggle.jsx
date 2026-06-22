import { useSound } from '../context/SoundContext.jsx'
import { SoundOn, SoundOff } from './Icons.jsx'

export default function SoundToggle({ className = '' }) {
  const { enabled, toggle, zap } = useSound()
  return (
    <button
      onClick={() => {
        toggle()
        if (!enabled) zap(1.1)
      }}
      aria-label={enabled ? 'Mute sound' : 'Unmute sound'}
      aria-pressed={enabled}
      className={`pill glass flex h-10 w-10 items-center justify-center text-cream transition-transform hover:scale-110 active:scale-95 ${className}`}
    >
      {enabled ? <SoundOn width={18} height={18} /> : <SoundOff width={18} height={18} />}
    </button>
  )
}
