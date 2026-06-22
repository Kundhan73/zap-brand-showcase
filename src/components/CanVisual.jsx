/**
 * Lightweight CSS soda-can illustration. Used where a full WebGL canvas would
 * be overkill (cards, showcase). Driven entirely by the flavor's colors.
 */
export default function CanVisual({ flavor, className = '', float = true }) {
  return (
    <div className={`relative ${className} ${float ? 'animate-float' : ''}`} aria-hidden>
      <div
        className="relative mx-auto h-[22rem] w-[10rem] rounded-[2.2rem] shadow-2xl"
        style={{
          background: `linear-gradient(100deg, ${shade(flavor.color, -16)} 0%, ${flavor.color} 28%, ${shade(
            flavor.color,
            22
          )} 50%, ${flavor.color} 72%, ${shade(flavor.color, -16)} 100%)`,
          boxShadow: `0 30px 60px -20px ${flavor.color}66`,
        }}
      >
        {/* top rim */}
        <div className="absolute inset-x-3 -top-2 h-5 rounded-full bg-gradient-to-b from-zinc-200 to-zinc-400" />
        <div className="absolute inset-x-6 -top-3 h-3 rounded-full bg-zinc-300" />
        {/* label rails */}
        <div className="absolute inset-x-0 top-8 h-7" style={{ background: flavor.text, opacity: 0.92 }} />
        <div className="absolute inset-x-0 bottom-8 h-7" style={{ background: flavor.text, opacity: 0.92 }} />
        {/* wordmark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div
            className="grid h-20 w-28 place-items-center rounded-2xl font-display text-4xl font-black"
            style={{ background: flavor.accent, color: flavor.text }}
          >
            ZAP
          </div>
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: flavor.text }}>
            {flavor.name}
          </span>
        </div>
        {/* sheen */}
        <div className="pointer-events-none absolute inset-y-0 left-6 w-3 rounded-full bg-white/40 blur-[2px]" />
      </div>
    </div>
  )
}

function shade(hex, amt) {
  const num = parseInt(hex.replace('#', ''), 16)
  let r = Math.max(0, Math.min(255, (num >> 16) + Math.round((255 * amt) / 100)))
  let g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + Math.round((255 * amt) / 100)))
  let b = Math.max(0, Math.min(255, (num & 0xff) + Math.round((255 * amt) / 100)))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
