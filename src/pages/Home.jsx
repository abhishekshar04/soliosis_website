
import { Suspense, lazy } from 'react'
import { SparklesCore } from '../components/aceternity/SparklesCore'
import { TypewriterEffect } from '../components/aceternity/TypewriterEffect'
import { MovingBorder } from '../components/aceternity/MovingBorder'
import { InfiniteMovingCards } from '../components/aceternity/InfiniteMovingCards'
import './Home.css'

// Lazy-load Three.js globe to avoid blocking initial render
const HeroGlobe = lazy(() => import('../components/HeroGlobe'))

const heroWords = [
  { text: 'Engineering' },
  { text: 'the' },
  { text: 'Next', className: 'hero-word-gradient' },
  { text: 'Era', className: 'hero-word-gradient' },
  { text: 'of' },
  { text: 'Digital' },
  { text: 'Intelligence' },
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
  return (
    <div className="home-page">
      {/* ── Hero ── */}
      <section className="hero container">
        {/* Sparkle particles behind headline */}
        <div className="hero-sparkles" aria-hidden="true">
          <SparklesCore
            id="hero-sparkles"
            particleDensity={80}
            particleColor="#d0bcff"
            minSize={0.3}
            maxSize={1.0}
            speed={0.3}
          />
        </div>

        <div className="hero-badge animate-fade-in-up">
          <img src="/solisio-icon.png" alt="Solisio" className="hero-badge-emblem" />
          <span>Solisio Solutions • Chase Your Dreams</span>
        </div>

        <h1 className="hero-headline animate-fade-in-up animate-delay-1">
          <TypewriterEffect
            words={heroWords}
            cursorClassName="hero-cursor"
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

      {/* ── Core Expertise Bento ── */}
      <section className="expertise container">
        <div className="section-header" data-reveal data-delay="1">
          <div>
            <h2 className="text-headline-md section-title">Core Expertise</h2>
            <p className="text-body-md section-subtitle">
              Our specialized disciplines integrate seamlessly to form robust, future-proof operational ecosystems.
            </p>
          </div>
          <a
            href="#services"
            className="explore-link text-label-md"
            onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Explore all capabilities
            <span className="material-symbols-outlined explore-icon">east</span>
          </a>
        </div>

        <div className="bento-grid">
          {/* Cloud – large */}
          <div className="bento-card bento-card--large glass-panel linear-glow-border" data-reveal data-delay="2">
            <div className="bento-glow" />
            <div className="bento-icon">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_sync</span>
            </div>
            <div className="bento-content bento-content--wide">
              <h3 className="text-headline-md">Cloud Architecture</h3>
              <p className="text-body-md bento-desc">
                Distributed systems engineered for absolute resilience. We architect multi-cloud environments
                that scale dynamically with your computational demands while maintaining rigorous security postures.
              </p>
              <div className="bento-tags">
                {['AWS', 'Kubernetes', 'Multi-Region', 'Zero-Trust'].map(tag => (
                  <span key={tag} className="bento-tag text-label-sm">{tag}</span>
                ))}
              </div>

              {/* Live Cluster Telemetry Grid */}
              <div className="cloud-telemetry-grid" aria-label="Global cluster status">
                <div className="cloud-node">
                  <div className="node-status">
                    <span className="node-dot" />
                    <span className="node-name">us-east-1</span>
                  </div>
                  <span className="node-metric">99.99%</span>
                </div>
                <div className="cloud-node">
                  <div className="node-status">
                    <span className="node-dot" />
                    <span className="node-name">eu-west-1</span>
                  </div>
                  <span className="node-metric">99.98%</span>
                </div>
                <div className="cloud-node">
                  <div className="node-status">
                    <span className="node-dot" />
                    <span className="node-name">ap-south-1</span>
                  </div>
                  <span className="node-metric">100.0%</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI – tall */}
          <div className="bento-card bento-card--tall glass-panel linear-glow-border" data-reveal data-delay="3">
            <div className="bento-icon">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <div className="bento-content">
              <h3 className="text-headline-md">AI Integration</h3>
              <p className="text-body-md bento-desc">
                Embedding machine intelligence into core workflows. From predictive analytics to autonomous agents,
                we operationalize AI at scale.
              </p>
              <div className="ai-metrics-row">
                <span className="ai-badge">12ms latency</span>
                <span className="ai-badge">4.8k req/s</span>
              </div>
            </div>
            <div className="ai-bars" aria-hidden="true">
              {[33, 67, 50, 100, 80, 40].map((h, i) => (
                <div key={i} className="ai-bar" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Data Ops – wide */}
          <div className="bento-card bento-card--wide glass-panel linear-glow-border" data-reveal data-delay="4">
            <div className="bento-icon bento-icon--lg">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '32px' }}>database</span>
            </div>
            <div className="bento-content" style={{ flex: 1 }}>
              <h3 className="text-headline-md">Data Operations &amp; Pipelines</h3>
              <p className="text-body-md bento-desc">
                High-throughput data engineering transforming raw telemetry into structured, actionable intelligence.
                We build pipelines that process petabytes with sub-second latency.
              </p>
            </div>
            <a
              href="#services"
              className="bento-arrow-btn"
              aria-label="Learn more about Data Operations"
              onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Testimonials (Infinite Scroll) ── */}
      <section className="testimonials container">
        <div className="text-center" data-reveal>
          <h2 className="text-headline-md section-title">Client Impact</h2>
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
    </div>
  )
}
