/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/aceternity/**/*.{js,jsx,ts,tsx}',
    './src/pages/Stats.jsx',
    './src/pages/Stats.css',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        'moving-border': 'moving-border 8s linear infinite',
        first: 'moveVertical 30s ease infinite',
        second: 'moveInCircle 20s reverse infinite',
        third: 'moveInCircle 40s linear infinite',
        fourth: 'moveHorizontal 40s ease infinite',
        fifth: 'moveInCircle 20s ease infinite',
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        scroll: {
          to: { transform: 'translate(calc(-50% - 0.5rem))' },
        },
        'moving-border': {
          '0%, 100%': { offsetDistance: '0%' },
          '50%': { offsetDistance: '50%' },
        },
        moveHorizontal: {
          '0%': { transform: 'translateX(-50%) translateY(-10%)' },
          '50%': { transform: 'translateX(50%) translateY(10%)' },
          '100%': { transform: 'translateX(-50%) translateY(-10%)' },
        },
        moveInCircle: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        moveVertical: {
          '0%': { transform: 'translateY(-50%)' },
          '50%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
