import { useEffect, useRef, useState } from 'react'
import { cn } from './utils'

export function SparklesCore({
  id,
  className,
  background,
  minSize,
  maxSize,
  particleDensity,
  particleColor,
  particleClassName,
  speed,
}) {
  const canvasRef = useRef(null)
  const [ctx, setCtx] = useState(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  const bgColor = background || 'transparent'
  const min = minSize || 0.4
  const max = maxSize || 1.2
  const density = particleDensity || 120
  const pColor = particleColor || '#d0bcff'
  const pSpeed = speed || 0.5

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    setCtx(context)

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles(canvas.width, canvas.height)
    }

    const initParticles = (w, h) => {
      particlesRef.current = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * (max - min) + min,
        opacity: Math.random(),
        fadeDir: Math.random() > 0.5 ? 1 : -1,
        fadeSpeed: Math.random() * 0.008 + 0.002,
        vx: (Math.random() - 0.5) * pSpeed * 0.3,
        vy: (Math.random() - 0.5) * pSpeed * 0.3,
      }))
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [density, max, min, pSpeed])

  useEffect(() => {
    if (!ctx || !canvasRef.current) return
    const canvas = canvasRef.current

    let isVisible = true
    let isRunning = false

    const draw = () => {
      if (!isRunning) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = pColor

      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.opacity += p.fadeDir * p.fadeSpeed
        if (p.opacity >= 1) { p.opacity = 1; p.fadeDir = -1 }
        if (p.opacity <= 0) { p.opacity = 0; p.fadeDir = 1 }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1.0

      animationRef.current = requestAnimationFrame(draw)
    }

    const start = () => {
      if (!isRunning && isVisible && !document.hidden) {
        isRunning = true
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    const stop = () => {
      if (isRunning) {
        isRunning = false
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
      }
    }

    start()

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) start()
      else stop()
    }, { threshold: 0.05 })
    io.observe(canvas)

    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else if (isVisible) start()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [ctx, pColor])

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn('absolute inset-0 w-full h-full', className)}
      style={{ background: bgColor }}
    />
  )
}
