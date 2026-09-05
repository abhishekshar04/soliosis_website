import { cn } from './utils'

export function WavyBackground({ children, className, containerClassName, colors, waveWidth, backgroundFill, blur, speed, waveOpacity }) {
  const fill = backgroundFill || 'transparent'
  const bRadius = blur || 10
  const opacity = waveOpacity || 0.5
  const dur = speed === 'fast' ? '4s' : '8s'
  const wColors = colors || ['#d0bcff', '#c0c1ff', '#a78bfa', '#7c3aed', '#4c1d95']

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <svg
        className="absolute inset-0 z-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 560"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="wavy-blur">
            <feGaussianBlur stdDeviation={bRadius} />
          </filter>
        </defs>

        <rect width="1440" height="560" fill={fill} />

        {wColors.map((color, i) => (
          <path
            key={i}
            fill={color}
            fillOpacity={opacity / (i + 1)}
            filter="url(#wavy-blur)"
            style={{
              animation: `wavy-anim-${i} ${dur} ease-in-out infinite alternate`,
            }}
          >
            <animate
              attributeName="d"
              dur={`${parseFloat(dur) + i * 1.5}s`}
              repeatCount="indefinite"
              values={`
                M0,${280 + i * 20} C${200 + i * 40},${200 + i * 10} ${400 + i * 20},${350 - i * 15} ${720},${300 + i * 10} C${1000 - i * 20},${250 - i * 10} ${1200 + i * 30},${380 + i * 10} 1440,${320 + i * 20} L1440,560 L0,560 Z;
                M0,${300 - i * 10} C${200 - i * 20},${380 + i * 10} ${500 + i * 10},${220 - i * 5} ${720},${280 - i * 15} C${950 + i * 15},${340 + i * 10} ${1100 - i * 20},${260 - i * 8} 1440,${300 - i * 10} L1440,560 L0,560 Z;
                M0,${280 + i * 20} C${200 + i * 40},${200 + i * 10} ${400 + i * 20},${350 - i * 15} ${720},${300 + i * 10} C${1000 - i * 20},${250 - i * 10} ${1200 + i * 30},${380 + i * 10} 1440,${320 + i * 20} L1440,560 L0,560 Z
              `}
            />
          </path>
        ))}
      </svg>

      <div className={cn('relative z-10', className)}>{children}</div>
    </div>
  )
}
