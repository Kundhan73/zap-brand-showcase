import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  // Initialise from saved preference or system setting (once, on mount).
  useEffect(() => {
    const saved = typeof window !== 'undefined' && window.localStorage.getItem('zap-theme')
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#0d0a1f' : '#fbf7ee'
    )
    try {
      window.localStorage.setItem('zap-theme', theme)
    } catch (e) {
      /* storage may be unavailable; non-fatal */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
