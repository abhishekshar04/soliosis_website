import { useEffect, useRef } from 'react'

/**
 * useScrollReveal — attaches an IntersectionObserver to add
 * `is-visible` class to elements matching `selector` inside `root`.
 */
export function useScrollReveal(selector = '[data-reveal]', threshold = 0.15) {
  const observerRef = useRef(null)

  useEffect(() => {
    const elements = document.querySelectorAll(selector)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            // Once revealed, stop watching
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )

    elements.forEach((el) => observerRef.current.observe(el))

    return () => observerRef.current?.disconnect()
  }, [selector, threshold])
}
