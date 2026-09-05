import { useEffect, useRef } from 'react'
import './ParticleField.css'

export default function ParticleField({ count = 55 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Particle config
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      radius: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      alphaSpeed: Math.random() * 0.003 + 0.001,
      // Each particle gets a hue near purple/indigo
      hue: Math.floor(Math.random() * 60) + 220,
    }))

    let raf = null
    let isRunning = false
    const MAX_DIST = 110
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST

    const draw = () => {
      if (!isRunning) return
      ctx.clearRect(0, 0, width, height)

      // Fast connection lines: check squared distance first (no Math.sqrt for 95% of pairs)
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j]
          const dx = pi.x - pj.x
          const dy = pi.y - pj.y
          const distSq = dx * dx + dy * dy
          if (distSq < MAX_DIST_SQ) {
            const dist = Math.sqrt(distSq)
            ctx.beginPath()
            ctx.moveTo(pi.x, pi.y)
            ctx.lineTo(pj.x, pj.y)
            ctx.strokeStyle = `rgba(208,188,255,${0.05 * (1 - dist / MAX_DIST)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Breathe alpha
        p.alpha += p.alphaSpeed * p.alphaDir
        if (p.alpha >= 0.55 || p.alpha <= 0.05) p.alphaDir *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 80%, ${p.alpha})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (!isRunning && !document.hidden) {
        isRunning = true
        raf = requestAnimationFrame(draw)
      }
    }

    const stop = () => {
      if (isRunning) {
        isRunning = false
        if (raf) {
          cancelAnimationFrame(raf)
          raf = null
        }
      }
    }

    start()

    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else start()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    let resizeTimer = null
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
      }, 100)
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      stop()
      clearTimeout(resizeTimer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('resize', onResize)
    }
  }, [count])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
