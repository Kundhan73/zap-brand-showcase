import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * Smooth-scroll to an in-page section by id. Works under HashRouter: if we are
 * on another route, navigate home first, then scroll once it has mounted.
 */
export function useSectionNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return useCallback(
    (id) => {
      const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(scroll, 160)
      } else {
        scroll()
      }
    },
    [location.pathname, navigate]
  )
}
