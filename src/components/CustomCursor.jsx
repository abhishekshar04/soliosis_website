import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const glowRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const glowPos = useRef({ x: -100, y: -100 })
  const raf = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const glow = glowRef.current
    if (!cursor || !glow) return

    let isHovering = false
    let isClicking = false

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const onDown = () => {
      if (!isClicking) {
        isClicking = true
        cursor.classList.add('cursor--click')
      }
    }

    const onUp = () => {
      if (isClicking) {
        isClicking = false
        cursor.classList.remove('cursor--click')
      }
    }

    const onOver = (e) => {
      const isInteractive = !!e.target.closest('a, button, [role="button"], input, textarea, select, label')
      if (isInteractive !== isHovering) {
        isHovering = isInteractive
        if (isInteractive) cursor.classList.add('cursor--hover')
        else cursor.classList.remove('cursor--hover')
      }
    }

    // Single consolidated RAF loop using translate3d for hardware acceleration
    const animate = () => {
      const px = pos.current.x
      const py = pos.current.y

      // Direct cursor snap (GPU compositor accelerated)
      cursor.style.transform = `translate3d(${px}px, ${py}px, 0)`

      // Smooth lagging nebula aura
      const lerp = 0.12
      glowPos.current.x += (px - glowPos.current.x) * lerp
      glowPos.current.y += (py - glowPos.current.y) * lerp
      glow.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`

      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mousedown', onDown, { passive: true })
    document.addEventListener('mouseup', onUp, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      {/* Galaxy nebula glow aura (lagging behind) */}
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />

      {/* Galaxy triangle cursor */}
      <div ref={cursorRef} className="cursor-galaxy" aria-hidden="true">
        <div className="cursor-triangle">
          <div className="cursor-nebula-1" />
          <div className="cursor-nebula-2" />
          <div className="cursor-nebula-3" />
          <div className="cursor-stars-layer" />
        </div>
      </div>
    </>
  )
}
