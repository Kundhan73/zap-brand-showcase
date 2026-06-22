/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        ink2: 'var(--ink-2)',
        cream: 'var(--cream)',
        lime: 'var(--lime)',
        magenta: 'var(--magenta)',
        tangerine: 'var(--tangerine)',
        cyan: 'var(--cyan)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        surface: 'var(--surface)',
      },
      fontFamily: {
        display: ['Unbounded', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        spin360: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 26s linear infinite',
        'marquee-slow': 'marquee 44s linear infinite',
        float: 'float 6s ease-in-out infinite',
        spin360: 'spin360 12s linear infinite',
      },
    },
  },
  plugins: [],
}
