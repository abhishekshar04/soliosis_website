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

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      // Snap cursor to exact position
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      spawnStar(e.clientX, e.clientY)
    }

    const onDown = () => {
      cursor.classList.add('cursor--click')
    }

    const onUp = () => {
      cursor.classList.remove('cursor--click')
    }

    const onEnterInteractive = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        cursor.classList.add('cursor--hover')
      }
    }

    const onLeaveInteractive = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        cursor.classList.remove('cursor--hover')
      }
    }

    // Spawn tiny star particle — very sparse
    const spawnStar = (x, y) => {
      if (Math.random() > 0.18) return
      const star = document.createElement('div')
      const size = Math.random() * 2 + 0.8
      star.className = 'cursor-star'
      star.style.cssText = `
        left:${x + (Math.random() - 0.5) * 14}px;
        top:${y + (Math.random() - 0.5) * 14}px;
        width:${size}px;height:${size}px;
      `
      document.body.appendChild(star)
      setTimeout(() => star.remove(), 750)
    }

    // Smooth glow follow with lerp
    const animate = () => {
      const lerp = 0.1
      glowPos.current.x += (pos.current.x - glowPos.current.x) * lerp
      glowPos.current.y += (pos.current.y - glowPos.current.y) * lerp
      glow.style.transform = `translate(${glowPos.current.x}px, ${glowPos.current.y}px) translate(-50%, -50%)`
      raf.current = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onEnterInteractive)
    document.addEventListener('mouseout', onLeaveInteractive)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onEnterInteractive)
      document.removeEventListener('mouseout', onLeaveInteractive)
      cancelAnimationFrame(raf.current)
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
