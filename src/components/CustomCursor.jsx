import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const glowRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const glowPos = useRef({ x: -100, y: -100 })
  const lastPos = useRef({ x: -100, y: -100 })
  const raf = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const cursor = cursorRef.current
    const glow = glowRef.current
    if (!cursor || !glow) return

    let isHovering = false
    let isClicking = false
    let lastSparkTime = 0

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

    // Leaves a short-lived spark behind the star. Each element animates
    // itself out via the CSS `star-trail` keyframe and removes itself on
    // completion, so nothing here needs to track a particle list. This is
    // the only "shooting star" motion effect now — there's no drawn tail,
    // just sparks thrown off while the cursor is actually travelling.
    //
    // Each spark is stretched (scaleX) and rotated to align with the
    // current direction of travel via CSS custom properties the shared
    // `star-trail` keyframe reads — so a fast flick leaves elongated
    // streaks rather than round dots, and with sparks now spawning nearly
    // every frame, the overlapping streaks read as one continuous moving
    // tail instead of a sparse trail of separate dots.
    const spawnSpark = (x, y, angleDeg, speed) => {
      const spark = document.createElement('div')
      spark.className = 'cursor-star'
      const size = 3 + Math.random() * 3.5
      spark.style.width = `${size}px`
      spark.style.height = `${size}px`
      spark.style.left = `${x}px`
      spark.style.top = `${y}px`
      spark.style.setProperty('--r', `${angleDeg}deg`)
      spark.style.setProperty('--sx', String(Math.min(1 + speed / 18, 3.2)))
      // Faster flicks throw brighter sparks
      spark.style.setProperty('--peak-o', String(Math.min(0.75 + speed / 35, 1)))
      document.body.appendChild(spark)
      spark.addEventListener('animationend', () => spark.remove(), { once: true })
    }

    // Single consolidated RAF loop using translate3d for hardware acceleration
    const animate = (now) => {
      const px = pos.current.x
      const py = pos.current.y
      const dx = px - lastPos.current.x
      const dy = py - lastPos.current.y
      const speed = Math.hypot(dx, dy)

      cursor.style.transform = `translate3d(${px}px, ${py}px, 0)`

      // Smooth lagging nebula aura
      const lerp = 0.12
      glowPos.current.x += (px - glowPos.current.x) * lerp
      glowPos.current.y += (py - glowPos.current.y) * lerp
      glow.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`

      // Sparks trail off the star only while it's actually travelling.
      // Throttled to roughly once per frame (rather than by a longer
      // cooldown) so the trail stays dense and continuous like a tail
      // instead of a scatter of separate dots; the low speed floor means
      // even a moderate, steady movement keeps a trail going, not just
      // fast flicks.
      if (!reducedMotion && speed > 1.2 && now - lastSparkTime > 16) {
        lastSparkTime = now
        const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI)
        spawnSpark(px, py, angleDeg, speed)
      }

      lastPos.current.x = px
      lastPos.current.y = py
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
  }, [reducedMotion])

  return (
    <>
      {/* Soft nebula aura, lagging behind the star */}
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />

      {/* Shooting star cursor: just the bright head — the "shooting" comes
          from the spark trail thrown off while moving, not a drawn tail */}
      <div ref={cursorRef} className="cursor-comet" aria-hidden="true">
        <div className="comet-head" />
      </div>
    </>
  )
}
