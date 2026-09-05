import { useEffect, useRef } from 'react'

/**
 * useScrollReveal — attaches an IntersectionObserver to add
 * `is-visible` class to elements matching `selector` inside `root`.
 */
export function useScrollReveal(selector = '[data-reveal]', threshold = 0.05) {
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px 50px 0px' }
    )

    const observeElements = () => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((el) => {
        if (!el.classList.contains('is-visible')) {
          observerRef.current?.observe(el)
        }
      })
    }

    observeElements()

    const mutationObserver = new MutationObserver(observeElements)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observerRef.current?.disconnect()
      mutationObserver.disconnect()
    }
  }, [selector, threshold])
}
