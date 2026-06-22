/** Fixed SVG grain overlay for filmic texture. Pointer-events disabled. */
export default function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] mix-blend-overlay"
      style={{ opacity: 'var(--grain-opacity)' }}
    >
      <svg className="h-full w-full">
        <filter id="zap-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#zap-grain)" />
      </svg>
    </div>
  )
}
