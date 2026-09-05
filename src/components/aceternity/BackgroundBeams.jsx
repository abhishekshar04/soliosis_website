import { useEffect, useRef } from 'react'
import { cn } from './utils'

export function BackgroundBeams({ className }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const paths = svg.querySelectorAll('path')
    paths.forEach((path, i) => {
      const length = path.getTotalLength ? path.getTotalLength() : 1000
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
      path.style.animation = `beam-draw ${2 + i * 0.3}s ease forwards ${i * 0.15}s`
    })
  }, [])

  const beams = [
    'M-380 -189C-380 -189 -312 216 152 343',
    'M-373 -197C-373 -197 -305 208 159 335',
    'M-357 -177C-357 -177 -289 228 175 355',
    'M-340 -158C-340 -158 -272 247 192 374',
    'M-322 -137C-322 -137 -254 268 210 395',
    'M-300 -112C-300 -112 -232 293 232 420',
    'M-275 -83C-275 -83 -207 322 257 449',
    'M-248 -52C-248 -52 -180 353 284 480',
    'M-218 -17C-218 -17 -150 388 314 515',
    'M-185 22C-185 22 -117 427 347 554',
    'M-149 65C-149 65 -81 470 383 597',
    'M-110 113C-110 113 -42 518 422 645',
    'M-68 165C-68 165 0 570 464 697',
    'M-23 222C-23 222 45 627 509 754',
    'M26 282C26 282 94 687 558 814',
    'M79 345C79 345 147 750 611 877',
    'M136 411C136 411 204 816 668 943',
    'M197 480C197 480 265 885 729 1012',
  ]

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <style>{`
        @keyframes beam-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
      <svg
        ref={svgRef}
        className="absolute w-full h-full"
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="beamGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(208,188,255,0.3)" />
            <stop offset="100%" stopColor="rgba(208,188,255,0)" />
          </radialGradient>
        </defs>

        {beams.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={`rgba(208,188,255,${0.08 + (i % 4) * 0.03})`}
            strokeWidth="0.5"
            fill="none"
          />
        ))}

        {/* Glowing dot at convergence */}
        <circle cx="696" cy="316" r="4" fill="rgba(208,188,255,0.4)" />
        <circle cx="696" cy="316" r="12" fill="rgba(208,188,255,0.1)" />
        <circle cx="696" cy="316" r="24" fill="rgba(208,188,255,0.05)" />
      </svg>
    </div>
  )
}
