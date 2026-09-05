import { useRef, useState } from 'react'
import { cn } from './utils'

export function CardHoverEffect({ children, className }) {
  const divRef = useRef(null)
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    divRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    divRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('relative', className)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(208,188,255,0.10), transparent 60%)`,
        }}
      />
      {children}
    </div>
  )
}
