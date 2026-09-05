import { useScrollReveal } from '../hooks/useScrollReveal'
import './About.css'

export default function About() {
  useScrollReveal('[data-reveal]')

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero container">
        <div className="about-hero-glow" aria-hidden="true" />
        <div className="about-hero-content" data-reveal>
          <div className="about-brand-pill">
            <img src="/solisio-icon.png" alt="Solisio" className="about-brand-pill-icon" />
            <span>Solisio Solutions • Chase Your Dreams</span>
          </div>
          <h1 className="about-headline">
            Innovation Driven <br />
            <span className="text-gradient-br">by Logic &amp; Vision.</span>
          </h1>
          <p className="text-body-lg about-subtext">
            We bridge the gap between abstract strategic vision and concrete technical implementation.
            At Solisio Solutions, we architect high-performance digital ecosystems for forward-thinking enterprises, empowering visionaries to chase and realize their most ambitious dreams.
          </p>
        </div>

        {/* Solisio Brand Identity Showcase Card */}
        <div className="about-brand-showcase glass-panel linear-glow-border" data-reveal data-delay="1">
          <div className="about-brand-showcase-visual">
            <img src="/solisio-logo-full.png" alt="Solisio Solutions Master Logo" className="about-brand-master-logo" />
          </div>
          <div className="about-brand-showcase-info">
            <span className="text-label-sm showcase-tag">Enterprise Identity</span>
            <h3 className="showcase-title">Solisio Solutions</h3>
            <p className="showcase-motto">"Chase your dreams"</p>
            <p className="showcase-description text-body-md">
              Engineered with mathematical precision and cosmic velocity. Solisio Solutions combines fault-tolerant cloud engineering, autonomous neural workflows, and zero-trust cybersecurity into a unified operational platform.
            </p>
            <div className="showcase-metrics">
              <div className="showcase-metric-item">
                <span className="showcase-metric-val">100%</span>
                <span className="showcase-metric-lbl">Architecture Integrity</span>
              </div>
              <div className="showcase-metric-item">
                <span className="showcase-metric-val">Tier-1</span>
                <span className="showcase-metric-lbl">Autonomous AI Agents</span>
              </div>
              <div className="showcase-metric-item">
                <span className="showcase-metric-val">Global</span>
                <span className="showcase-metric-lbl">Cloud Corridors</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

