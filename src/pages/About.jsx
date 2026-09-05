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
            <img src="/solisio-icon.png" alt="Solisio Solutions" className="about-brand-pill-icon" />
          </div>
          <h1 className="about-headline">
            Where Vision Becomes <span className="hero-word-gradient">Innovation</span>
          </h1>
          <p className="text-body-lg about-subtext">
            We bridge the gap between abstract strategic vision and concrete technical implementation.
            At Solisio Solutions, we architect high-performance digital ecosystems for forward-thinking enterprises, empowering visionaries to chase and realize their most ambitious dreams.
          </p>
        </div>

        {/* Solisio Brand Identity Showcase Card */}
        <div className="about-brand-showcase glass-panel linear-glow-border" data-reveal data-delay="1">
          <div className="about-brand-showcase-visual">
            <div className="about-brand-visual-glow" aria-hidden="true" />
            <img src="/solisio-logo-full.png" alt="Solisio Solutions Master Logo" className="about-brand-master-logo" />
          </div>
          <div className="about-brand-showcase-info">
            <span className="text-label-sm showcase-tag">
              <span className="material-symbols-outlined showcase-tag-icon" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              Enterprise Identity
            </span>
            <h3 className="showcase-title">Solisio Solutions Pvt Ltd.</h3>
            <p className="showcase-motto">&ldquo;Chase your dreams&rdquo;</p>
            <p className="showcase-description text-body-md">
              Engineered with mathematical precision and cosmic velocity. Solisio Solutions combines fault-tolerant cloud engineering, autonomous neural workflows, and zero-trust cybersecurity into a unified operational platform.
            </p>
            <div className="showcase-metrics">
              <div className="showcase-metric-chip">
                <span className="material-symbols-outlined showcase-metric-icon">verified</span>
                <div className="showcase-metric-text">
                  <span className="showcase-metric-val">100%</span>
                  <span className="showcase-metric-lbl">Architecture Integrity</span>
                </div>
              </div>
              <div className="showcase-metric-chip">
                <span className="material-symbols-outlined showcase-metric-icon">bolt</span>
                <div className="showcase-metric-text">
                  <span className="showcase-metric-val">Tier-1</span>
                  <span className="showcase-metric-lbl">Autonomous AI Agents</span>
                </div>
              </div>
              <div className="showcase-metric-chip">
                <span className="material-symbols-outlined showcase-metric-icon">public</span>
                <div className="showcase-metric-text">
                  <span className="showcase-metric-val">Global</span>
                  <span className="showcase-metric-lbl">Cloud Corridors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

