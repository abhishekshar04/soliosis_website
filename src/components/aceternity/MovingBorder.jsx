import { useRef } from 'react'
import { cn } from './utils'

export function MovingBorder({ children, className, containerClassName, borderRadius, duration, ...props }) {
  const radius = borderRadius || '0.75rem'
  const dur = duration || 4000

  return (
    <div
      className={cn('relative overflow-hidden p-[1px]', containerClassName)}
      style={{ borderRadius: radius }}
    >
      {/* Rotating conic gradient border */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '300%',
          height: '300%',
          top: '-100%',
          left: '-100%',
          background: 'conic-gradient(from 0deg, transparent 0%, #d0bcff 25%, #c0c1ff 35%, transparent 50%)',
          animation: `moving-border-spin ${dur}ms linear infinite`,
          willChange: 'transform',
        }}
      />
      {/* Blur glow layer */}
      <div
        className="absolute pointer-events-none blur-sm"
        style={{
          width: '300%',
          height: '300%',
          top: '-100%',
          left: '-100%',
          background: 'conic-gradient(from 0deg, transparent 0%, rgba(208,188,255,0.4) 25%, rgba(192,193,255,0.4) 35%, transparent 50%)',
          animation: `moving-border-spin ${dur}ms linear infinite`,
          willChange: 'transform',
        }}
      />
      <style>{`
        @keyframes moving-border-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      {/* Content */}
      <div
        className={cn('relative z-10', className)}
        style={{ borderRadius: `calc(${radius} - 1px)` }}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
