
import './Home.css'

const expertiseCards = [
  {
    id: 'cloud',
    icon: 'cloud_sync',
    title: 'Cloud Architecture',
    desc: 'Distributed systems engineered for absolute resilience. We architect multi-cloud environments that scale dynamically with your computational demands while maintaining rigorous security postures.',
    tags: ['AWS', 'Kubernetes', 'Zero-Trust'],
    size: 'large',
  },
  {
    id: 'ai',
    icon: 'psychology',
    title: 'AI Integration',
    desc: 'Embedding machine intelligence into core workflows. From predictive analytics to autonomous agents, we operationalize AI at scale.',
    size: 'tall',
  },
  {
    id: 'data',
    icon: 'database',
    title: 'Data Operations & Pipelines',
    desc: 'High-throughput data engineering transforming raw telemetry into structured, actionable intelligence. We build pipelines that process petabytes with sub-second latency, ensuring your decision engines run on pure, real-time context.',
    size: 'wide',
  },
]

const testimonials = [
  {
    quote: '"Lumina Logic didn\'t just rebuild our infrastructure; they completely re-engineered our operational velocity. Their AI-driven data pipelines reduced our processing latency by 84%, enabling real-time market responses that were previously impossible."',
    name: 'Sarah Jenkins',
    role: 'CTO, Nexus Financial',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy56Rbt5pcT_6JRRzSYIh0bKgGEWIeT4NkckoBeTEhYZjLAUOimFvbgxNx4ZMgpt9LkSTTC6vrDNBOp7ZT36vXb_xvP8EAGa8drEGwOtJt7a2dIjCqtpoSrXWH0yIm9-4PuLhBVI0PGPa1SIEZvxNVKG3md4liRBNETEIdaTguTXtdieeXpyE3wQ_cLaV2cFV73b67FbU0EWkngWUePQdGZ9Rc0UCdMoBgE9yL7-wMXDgwwh5r4Eon_g',
  },
  {
    quote: '"The precision and depth of their architectural consulting is unmatched. Moving to a decentralized, zero-trust cloud model under their guidance secured our platform while simultaneously cutting overhead costs. True visionaries in the space."',
    name: 'Marcus Vance',
    role: 'VP Engineering, Quantum Health',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_JtljBaeh3kjm8GJm4g3tszlPW0qaFav4QSP0llruWxC-hBUQ1Cv-RD8VjuIMSr5jpyJ7pj_mVtSJZeyErGFsgqORrQB5yYDtyA_8_U43u1zG0-68qucKpwhktAwZqRFJLx0kH3w9o97cwdf2Dc1_5TqfA9oa-PJml629PvaU7_PpVPoV-5jnQPJ_ji2dY-TB82gShwZQz3SxR3451BP_YnfhmQbXTRGGeVrfkDJdxX19sd-sQrrSkw',
  },
]

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero container">
        <div className="hero-badge animate-fade-in-up">
          <span className="hero-badge-dot animate-pulse animate-glow-ring" />
          Next-Gen Enterprise Architecture
        </div>

        <h1 className="hero-headline animate-fade-in-up animate-delay-1">
          Engineering the{' '}
          <span className="text-gradient">Next Era</span>{' '}
          of Digital Intelligence
        </h1>

        <p className="hero-subtext text-body-lg animate-fade-in-up animate-delay-2">
          We design and deploy scalable, high-precision technical architectures for visionary enterprises.
          Transform complexity into your most powerful competitive advantage.
        </p>

        <div className="hero-actions animate-fade-in-up animate-delay-3">
          <a href="#contact" className="btn-primary-hero" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Launch Solution
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
          <a href="#services" className="btn-ghost-hero glass-panel linear-glow-border" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <span className="material-symbols-outlined">terminal</span>
            View Services
          </a>
        </div>

        {/* Hero visual */}
        <div className="hero-visual animate-fade-in-up animate-delay-4 animate-float-slow">
          <div
            className="hero-visual-inner glass-panel linear-glow-border"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQoz-FuN1wXXvx6kEMh-snE2wuBkH2Nn96mXJ_dp8zmKogHl68XNM0y6GGdLsyflKcA1d8MA1TmucjVHaVHeVHQ406J-YY7FmHxxegF-JKMooWBO_hxl2DTANcQmFOG3fIclspUkXO_c_l9v95Kdv69xyWnVLeoosCZQIe3rs-f6ti015T3vO3mHNxCWHQkZT7MouBfVAXQ0TnBrJAlqy0mmn7rkOHrBkKUs3b4i_u23iIHhNZgbyEVQ')`,
            }}
            aria-label="Abstract data flow visualization"
          >
            <div className="hero-visual-gradient" />
          </div>
        </div>
      </section>

      {/* Core Expertise */}
      <section className="expertise container">
        <div className="section-header" data-reveal data-delay="1">
          <div>
            <h2 className="text-headline-md section-title">Core Expertise</h2>
            <p className="text-body-md section-subtitle">
              Our specialized disciplines integrate seamlessly to form robust, future-proof operational ecosystems.
            </p>
          </div>
          <a href="#services" className="explore-link text-label-md" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Explore all capabilities
            <span className="material-symbols-outlined explore-icon">east</span>
          </a>
        </div>

        <div className="bento-grid">
          {/* Cloud Card – large */}
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
                {['AWS', 'Kubernetes', 'Zero-Trust'].map(tag => (
                  <span key={tag} className="bento-tag text-label-sm">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Card – tall */}
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
            </div>
            {/* Decorative bar chart */}
            <div className="ai-bars" aria-hidden="true">
              {[33, 67, 50, 100, 80, 40].map((h, i) => (
                <div key={i} className="ai-bar" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Data Operations – full width */}
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
            <button className="bento-arrow-btn" aria-label="Learn more about Data Operations">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials container">
        <div className="text-center" data-reveal>
          <h2 className="text-headline-md section-title">Client Impact</h2>
          <p className="text-body-md section-subtitle" style={{ margin: '0 auto', maxWidth: 600 }}>
            Transformative outcomes realized by organizations operating at the bleeding edge.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card glass-panel" data-reveal data-delay={String(i + 1)}>
              <span className="material-symbols-outlined quote-icon">format_quote</span>
              <div className="stars" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="material-symbols-outlined star-icon" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-body-lg testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                <div>
                  <div className="text-label-md author-name">{t.name}</div>
                  <div className="text-label-sm author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
