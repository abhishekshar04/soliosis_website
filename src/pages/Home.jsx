
import { Suspense, lazy } from 'react'
import { SparklesCore } from '../components/aceternity/SparklesCore'
import { TypewriterEffect } from '../components/aceternity/TypewriterEffect'
import { MovingBorder } from '../components/aceternity/MovingBorder'
import { InfiniteMovingCards } from '../components/aceternity/InfiniteMovingCards'
import { useIsMobile } from '../hooks/useMediaQuery'
import './Home.css'

// Lazy-load Three.js globe to avoid blocking initial render
const HeroGlobe = lazy(() => import('../components/HeroGlobe'))

// Three headlines the hero rotates through, one at a time, every 6 seconds
// (see loopInterval on the TypewriterEffect below).
const heroWordSets = [
  [
    { text: 'Architecting' },
    { text: 'the' },
    { text: 'Future', className: 'hero-word-gradient' },
    { text: 'of', className: 'hero-word-gradient' },
    { text: 'Technology.',className: 'hero-word-gradient' },
  ],
  [
    { text: 'Intelligence' },
    { text: 'Built' },
    { text: 'for' },
    { text: 'the' },
    { text: 'Real', className: 'hero-word-gradient' },
    { text: 'World.', className: 'hero-word-gradient' },
  ],
  [
    { text: 'We' },
    { text: 'Engineer' },
    { text: 'What' },
    { text: 'Comes' },
    { text: 'Next.', className: 'hero-word-gradient' },
  ],
]

const testimonials = [
  {
    quote: 'Solisio Solutions didn\'t just rebuild our infrastructure; they completely re-engineered our operational velocity. Their AI-driven data pipelines reduced our processing latency by 84%, enabling real-time market responses that were previously impossible.',
    name: 'Sarah Jenkins',
    role: 'CTO, Nexus Financial',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy56Rbt5pcT_6JRRzSYIh0bKgGEWIeT4NkckoBeTEhYZjLAUOimFvbgxNx4ZMgpt9LkSTTC6vrDNBOp7ZT36vXb_xvP8EAGa8drEGwOtJt7a2dIjCqtpoSrXWH0yIm9-4PuLhBVI0PGPa1SIEZvxNVKG3md4liRBNETEIdaTguTXtdieeXpyE3wQ_cLaV2cFV73b67FbU0EWkngWUePQdGZ9Rc0UCdMoBgE9yL7-wMXDgwwh5r4Eon_g',
  },
  {
    quote: 'The precision and depth of their architectural consulting is unmatched. Moving to a decentralized, zero-trust cloud model under their guidance secured our platform while simultaneously cutting overhead costs. True visionaries in the space.',
    name: 'Marcus Vance',
    role: 'VP Engineering, Quantum Health',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_JtljBaeh3kjm8GJm4g3tszlPW0qaFav4QSP0llruWxC-hBUQ1Cv-RD8VjuIMSr5jpyJ7pj_mVtSJZeyErGFsgqORrQB5yYDtyA_8_U43u1zG0-68qucKpwhktAwZqRFJLx0kH3w9o97cwdf2Dc1_5TqfA9oa-PJml629PvaU7_PpVPoV-5jnQPJ_ji2dY-TB82gShwZQz3SxR3451BP_YnfhmQbXTRGGeVrfkDJdxX19sd-sQrrSkw',
  },
  {
    quote: 'Within 6 months of deployment, our autonomous AI agents were handling 73% of tier-1 support queries autonomously. The ROI was immediate and the quality bar set by their team is genuinely world-class.',
    name: 'Priya Subramaniam',
    role: 'Head of Engineering, TechFront Global',
    avatar: null,
  },
  {
    quote: 'Their cloud architecture blueprint saved us $4.2M annually in infrastructure costs, while doubling our deployment frequency. Solisio Solutions isn\'t just a vendor — they\'re an extension of our core team.',
    name: 'James Holloway',
    role: 'CEO, Apex Systems',
    avatar: null,
  },
]

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <div className="home-page">
      {/* ── Hero ── */}
      <section className="hero container">
        {/* Sparkle particles behind headline – thinned out on phones, where
            the canvas is small and the GPU budget is shared with the globe. */}
        <div className="hero-sparkles" aria-hidden="true">
          <SparklesCore
            id="hero-sparkles"
            particleDensity={isMobile ? 30 : 80}
            particleColor="#d0bcff"
            minSize={0.3}
            maxSize={1.0}
            speed={0.3}
          />
        </div>

        <h1 className="hero-headline animate-fade-in-up animate-delay-1">
          <TypewriterEffect
            wordSets={heroWordSets}
            cursorClassName="hero-cursor"
            loop
            loopInterval={6000}
          />
        </h1>

        <p className="hero-subtext text-body-lg animate-fade-in-up animate-delay-2">
          We design and deploy scalable, high-precision technical architectures for visionary enterprises.
          Transform complexity into your most powerful competitive advantage.
        </p>

        <div className="hero-actions animate-fade-in-up animate-delay-3">
          <MovingBorder
            containerClassName="hero-moving-border-wrap"
            className="btn-primary-hero btn-primary-hero--inner"
            borderRadius="0.625rem"
            duration={3000}
          >
            <a
              href="#contact"
              className="btn-primary-hero-link"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Launch Solution
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </MovingBorder>

          <a
            href="#services"
            className="btn-ghost-hero glass-panel linear-glow-border"
            onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            <span className="material-symbols-outlined">terminal</span>
            View Services
          </a>
        </div>

        {/* Three.js Globe */}
        <div className="hero-visual animate-fade-in-up animate-delay-4">
          <div className="hero-globe-wrap">
            <Suspense fallback={<div className="hero-globe-fallback" />}>
              <HeroGlobe />
            </Suspense>
            <div className="hero-globe-glow" />
          </div>
        </div>
      </section>
    </div>
  )
}

// Rendered separately by Layout, positioned after Services rather than
// immediately following the hero — kept in this file since it shares
// Home.css and the testimonials data defined above.
export function ClientImpact() {
  return (
    <section className="testimonials container">
      <div className="text-center" data-reveal>
        <h2 className="text-headline-lg section-title">Testimonials</h2>
        <p className="text-body-md section-subtitle" style={{ margin: '0 auto', maxWidth: 600 }}>
          Transformative outcomes realized by organizations operating at the bleeding edge.
        </p>
      </div>

      <div className="testimonials-scroller" data-reveal data-delay="1">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
          pauseOnHover
        />
        <InfiniteMovingCards
          items={[...testimonials].reverse()}
          direction="right"
          speed="slow"
          pauseOnHover
          className="mt-4"
        />
      </div>
    </section>
  )
}
