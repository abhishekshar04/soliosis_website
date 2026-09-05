import { useRef, useEffect, useState } from 'react'
import { cn } from './utils'

export function InfiniteMovingCards({ items, direction = 'left', speed = 'slow', pauseOnHover = true, className }) {
  const containerRef = useRef(null)
  const scrollerRef = useRef(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return

    const scroller = scrollerRef.current
    // Clone all items
    Array.from(scroller.children).forEach(child => {
      const clone = child.cloneNode(true)
      scroller.appendChild(clone)
    })

    // Set CSS variables
    const container = containerRef.current
    container.style.setProperty('--animation-direction', direction === 'left' ? 'forwards' : 'reverse')
    const durations = { fast: '20s', normal: '40s', slow: '80s' }
    container.style.setProperty('--animation-duration', durations[speed] || '40s')

    setStart(true)
  }, [direction, speed])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={start ? {
          animation: `scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite`,
          willChange: 'transform',
        } : {}}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border px-8 py-6 md:w-[450px]"
            style={{
              background: 'linear-gradient(180deg, rgba(33,30,39,0.8), rgba(21,18,27,0.8))',
              borderColor: 'rgba(208,188,255,0.12)',
            }}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              />
              <span
                className="relative z-20 text-sm font-normal leading-[1.6]"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center gap-3">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full object-cover border border-purple-400/20" />
                ) : (
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #4338ca)',
                      color: '#f1f5f9',
                      border: '1px solid rgba(208, 188, 255, 0.3)',
                      boxShadow: '0 0 12px rgba(124, 58, 237, 0.3)',
                    }}
                  >
                    {item.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--color-on-surface-variant)' }}
                  >
                    {item.role}
                  </span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  )
}
