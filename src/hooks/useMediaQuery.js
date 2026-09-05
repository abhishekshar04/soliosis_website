import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribe to a CSS media query from React.
 *
 * Uses useSyncExternalStore because a MediaQueryList is exactly that: an
 * external, mutable source. It reads synchronously during render, so the
 * very first paint is already correct — no desktop-only widget flashing
 * in on a phone — and it cannot tear or miss a change that fires between
 * render and effect.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onStoreChange) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onStoreChange)
      return () => mql.removeEventListener('change', onStoreChange)
    },
    [query],
  )

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  }, [query])

  // Server/prerender snapshot: assume the desktop layout.
  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** True on touch-first devices (phones, tablets) — no precise hover pointer. */
export const useIsTouchDevice = () => useMediaQuery('(hover: none), (pointer: coarse)')

/** True below the 768px desktop breakpoint used across the stylesheets. */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')

/** True when the visitor has asked the OS to reduce animation. */
export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')
