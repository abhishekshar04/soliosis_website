import { useEffect, useRef, useState } from 'react'
import { cn } from './utils'

export function NumberTicker({ value, direction = 'up', delay = 0, className, decimalPlaces = 0, suffix = '', prefix = '' }) {
  const [displayValue, setDisplayValue] = useState(direction === 'up' ? 0 : value)
  const ref = useRef(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          setTimeout(() => animateTo(value), delay * 1000)
        }
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, delay])

  const animateTo = (target) => {
    const startVal = direction === 'up' ? 0 : target
    const endVal = direction === 'up' ? target : 0
    const duration = 2000
    const start = performance.now()

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)
      const current = startVal + (endVal - startVal) * eased
      setDisplayValue(parseFloat(current.toFixed(decimalPlaces)))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}{Number(displayValue).toLocaleString(undefined, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })}{suffix}
    </span>
  )
}
