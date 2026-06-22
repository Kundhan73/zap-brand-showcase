import { useTheme } from '../context/ThemeContext.jsx'
import { Sun, Moon } from './Icons.jsx'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className={`pill glass flex h-10 w-10 items-center justify-center text-cream transition-transform hover:scale-110 active:scale-95 ${className}`}
    >
      {theme === 'dark' ? <Sun width={18} height={18} /> : <Moon width={18} height={18} />}
    </button>
  )
}
