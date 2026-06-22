/** Small inline icon set — no external icon dependency. */
const base = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function Bolt(props) {
  return (
    <svg {...base} {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  )
}
export function Sugar(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M5 5l14 14" />
    </svg>
  )
}
export function Fruit(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 7c2-4 7-4 7 1 0 5-4 9-7 9s-7-4-7-9c0-5 5-5 7-1Z" />
      <path d="M12 7c0-2 1-4 3-5" />
    </svg>
  )
}
export function Leaf(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14Z" />
      <path d="M5 19c4-4 7-6 10-7" />
    </svg>
  )
}
export function ArrowRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
export function Sun(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  )
}
export function Moon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}
export function SoundOn(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M16 9a4 4 0 0 1 0 6M18.5 7a7 7 0 0 1 0 10" />
    </svg>
  )
}
export function SoundOff(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M17 9l4 6M21 9l-4 6" />
    </svg>
  )
}

export const featureIcon = { bolt: Bolt, sugar: Sugar, fruit: Fruit, leaf: Leaf }
