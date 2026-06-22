// ---------------------------------------------------------------------------
// Single source of truth for all ZAP brand content. Swap these values to
// re-skin the entire site for a different (real) brand.
// ---------------------------------------------------------------------------

export const brand = {
  name: 'ZAP',
  wordmark: 'ZAP',
  tagline: 'Charge your taste buds.',
  mission:
    'Electric craft soda for people who refuse to run flat. Real fruit, plant-powered caffeine, and absolutely zero refined sugar — engineered to give an ordinary afternoon a jolt.',
  founded: 2019,
  city: 'Austin, TX',
  email: 'hey@zap.example.com',
}

export const nav = [
  { label: 'Flavors', to: '/#flavors' },
  { label: 'Story', to: '/#story' },
  { label: 'Proof', to: '/#testimonials' },
  { label: 'Contact', to: '/#contact' },
]

export const flavors = [
  {
    slug: 'citrus-strike',
    name: 'Citrus Strike',
    nickname: 'The Original Jolt',
    color: '#c6ff3a',
    accent: '#ffe600',
    text: '#14210a',
    pitch: 1.25,
    blurb: 'A high-voltage hit of yuzu, blood orange and a snap of ginger.',
    notes: ['Yuzu', 'Blood Orange', 'Ginger'],
    caffeine: 80,
    sugar: 0,
    calories: 15,
    description:
      'Citrus Strike is the can that started it all. We cold-press blood orange and yuzu, then charge it with a ginger kick that lands like static on the tongue. Bright, dry, and relentlessly refreshing.',
  },
  {
    slug: 'berry-bolt',
    name: 'Berry Bolt',
    nickname: 'Tart & Electric',
    color: '#ff2d8e',
    accent: '#b14bff',
    text: '#2a0a1c',
    pitch: 1.0,
    blurb: 'Blackberry and hibiscus with a lime finish that crackles.',
    notes: ['Blackberry', 'Hibiscus', 'Lime'],
    caffeine: 80,
    sugar: 0,
    calories: 15,
    description:
      'Berry Bolt is deep, tart and a little dangerous. Wild blackberry meets steeped hibiscus, then a squeeze of lime pulls the whole thing taut. The most-requested flavor at every pop-up we have ever run.',
  },
  {
    slug: 'mango-surge',
    name: 'Mango Surge',
    nickname: 'Tropical High-Voltage',
    color: '#ff7a1a',
    accent: '#ffd23f',
    text: '#2a1405',
    pitch: 0.82,
    blurb: 'Alphonso mango and passionfruit with a whisper of chili heat.',
    notes: ['Alphonso Mango', 'Passionfruit', 'Chili'],
    caffeine: 80,
    sugar: 0,
    calories: 20,
    description:
      'Mango Surge is sunshine with a current running through it. Velvety Alphonso mango and tangy passionfruit get a barely-there chili warmth on the finish. Sweet up front, electric on the way down.',
  },
]

export const features = [
  {
    title: '0g refined sugar',
    body: 'Sweetened only with a touch of real fruit and monk fruit. No cane sugar, no syrups, no crash.',
    icon: 'sugar',
  },
  {
    title: 'Plant-powered caffeine',
    body: '80mg of natural caffeine from green tea — clean energy without the jitters.',
    icon: 'bolt',
  },
  {
    title: 'Real cold-pressed fruit',
    body: 'Every flavor starts with actual fruit, never "natural flavor" mystery dust.',
    icon: 'fruit',
  },
  {
    title: '100% recyclable',
    body: 'Infinitely recyclable aluminium and carbon-neutral production since 2024.',
    icon: 'leaf',
  },
]

export const stats = [
  { value: 12, suffix: 'M+', label: 'Cans charged' },
  { value: 0, suffix: 'g', label: 'Refined sugar' },
  { value: 80, suffix: 'mg', label: 'Plant caffeine' },
  { value: 4.9, decimals: 1, suffix: '/5', label: 'Average rating' },
]

export const timeline = [
  {
    year: '2019',
    title: 'One blender, one garage',
    body: 'Two friends in Austin try to fix the 3pm slump. The first batch of Citrus Strike is brewed in a kitchen blender.',
  },
  {
    year: '2020',
    title: 'First 1,000 cans',
    body: 'A single stall at a Saturday farmers market sells out by noon three weeks running. ZAP becomes a real thing.',
  },
  {
    year: '2022',
    title: '500 stores strong',
    body: 'Berry Bolt launches and instantly outsells everything. ZAP lands on shelves in 500 independent shops.',
  },
  {
    year: '2024',
    title: 'Carbon-neutral',
    body: 'Production goes fully carbon-neutral and every can ships in 100% recyclable aluminium.',
  },
  {
    year: '2026',
    title: '12 million and counting',
    body: 'Three flavors, a national footprint, and a community that genuinely runs on ZAP.',
  },
]

export const testimonials = [
  {
    quote: 'I quit my afternoon coffee for Berry Bolt and never looked back. It tastes like a treat but moves like rocket fuel.',
    name: 'Priya N.',
    handle: '@priyaruns',
    flavor: 'Berry Bolt',
  },
  {
    quote: 'Finally a soda I can hand my kids and actually feel good about. Zero sugar, real fruit, and they fight over the last can.',
    name: 'Marcus D.',
    handle: '@marcus.eats',
    flavor: 'Mango Surge',
  },
  {
    quote: 'Citrus Strike is the only thing in our studio fridge that disappears faster than the snacks. The whole team is hooked.',
    name: 'Lena K.',
    handle: '@lenamakes',
    flavor: 'Citrus Strike',
  },
  {
    quote: 'The cleanest energy I have found, full stop. No jitters, no crash, and it actually tastes incredible cold.',
    name: 'Theo R.',
    handle: '@theolifts',
    flavor: 'Berry Bolt',
  },
]

export const pressLogos = ['FIZZ WEEKLY', 'GOODTASTE', 'THE DAILY POUR', 'CRAVE', 'SODA NATION', 'BREW & BUZZ']

export function getFlavor(slug) {
  return flavors.find((f) => f.slug === slug)
}
