
import './Services.css'

const services = [
  {
    id: 'ai-agents',
    icon: 'smart_toy',
    title: 'AI Agents',
    desc: 'Deploy autonomous workflows that learn and adapt. Our AI agents handle complex, multi-step processes, freeing your team to focus on strategic initiatives.',
    link: '/contact',
    linkLabel: 'Explore AI Solutions',
    size: 'large',
    hasGlow: true,
  },
  {
    id: 'analytics',
    icon: 'insights',
    title: 'Data Analytics',
    desc: 'Transform raw data into actionable intelligence. Gain real-time visibility into operations and predictive insights for growth.',
    size: 'small',
    hasGlow: true,
    glowColor: 'secondary',
  },
  {
    id: 'cloud',
    icon: 'cloud',
    title: 'Cloud Consulting',
    desc: 'Build resilient, scalable infrastructure. We design cloud architectures optimized for performance, security, and cost-efficiency.',
    size: 'small',
  },
  {
    id: 'web',
    icon: 'code',
    title: 'Web Development',
    desc: 'Engineer enterprise-grade web applications. We utilize modern frameworks to deliver high-performance, secure digital experiences.',
    size: 'small',
  },
  {
    id: 'mobile',
    icon: 'ad_units',
    title: 'App Development',
    desc: 'Craft intuitive native and cross-platform mobile experiences that drive engagement and seamlessly integrate with your ecosystem.',
    size: 'small',
  },
  {
    id: 'email',
    icon: 'mark_email_read',
    title: 'Email Marketing',
    desc: 'Drive engagement with high-conversion automation sequences. We design targeted, data-driven campaigns that nurture leads and maximize customer lifetime value.',
    size: 'wide',
    hasAction: true,
  },
]

export default function Services() {
  return (
    <div className="services-page">
      {/* Ambient bg */}
      <div className="services-bg" aria-hidden="true">
        <div className="services-bg-blob services-bg-blob--tl" />
        <div className="services-bg-blob services-bg-blob--br" />
      </div>

      {/* Hero */}
      <section className="services-hero container">
        <div className="services-hero-inner" data-reveal>
          <div className="services-badge">
            <span className="material-symbols-outlined services-badge-icon" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <span className="text-label-sm services-badge-text">Our Capabilities</span>
          </div>
          <h1 className="services-headline">
            Architecting the{' '}
            <span className="text-gradient">Future</span>{' '}
            of Enterprise Tech.
          </h1>
          <p className="text-body-lg services-subtext">
            We deliver high-impact technology solutions designed to scale, secure, and accelerate
            your business in a digital-first world.
          </p>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="services-bento container">
        <div className="services-grid">
          {/* AI Agents – large */}
          <div className="svc-card svc-card--large glass-panel" data-reveal data-delay="1">
            <div className="svc-glow" />
            <div className="svc-top">
              <div className="svc-icon">
                <span className="material-symbols-outlined svc-icon-sym">smart_toy</span>
              </div>
              <h3 className="text-headline-md svc-title">AI Agents</h3>
              <p className="text-body-md svc-desc">
                Deploy autonomous workflows that learn and adapt. Our AI agents handle complex,
                multi-step processes, freeing your team to focus on strategic initiatives.
              </p>
            </div>
            <a href="#contact" className="svc-link text-label-md" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Explore AI Solutions
              <span className="material-symbols-outlined svc-link-icon">arrow_forward</span>
            </a>
          </div>

          {/* Data Analytics – small */}
          <div className="svc-card svc-card--small glass-panel" data-reveal data-delay="2">
            <div className="svc-glow svc-glow--secondary" />
            <div className="svc-icon">
              <span className="material-symbols-outlined svc-icon-sym">insights</span>
            </div>
            <h3 className="text-headline-md svc-title">Data Analytics</h3>
            <p className="text-body-md svc-desc">
              Transform raw data into actionable intelligence. Gain real-time visibility into
              operations and predictive insights for growth.
            </p>
          </div>

          {/* Cloud Consulting – small */}
          <div className="svc-card svc-card--small glass-panel" data-reveal data-delay="3">
            <div className="svc-icon">
              <span className="material-symbols-outlined svc-icon-sym">cloud</span>
            </div>
            <h3 className="text-headline-md svc-title">Cloud Consulting</h3>
            <p className="text-body-md svc-desc">
              Build resilient, scalable infrastructure. We design cloud architectures optimized
              for performance, security, and cost-efficiency.
            </p>
          </div>

          {/* Web Dev – small */}
          <div className="svc-card svc-card--small glass-panel" data-reveal data-delay="4">
            <div className="svc-icon">
              <span className="material-symbols-outlined svc-icon-sym">code</span>
            </div>
            <h3 className="text-headline-md svc-title">Web Development</h3>
            <p className="text-body-md svc-desc">
              Engineer enterprise-grade web applications. We utilize modern frameworks to deliver
              high-performance, secure digital experiences.
            </p>
          </div>

          {/* App Dev – small */}
          <div className="svc-card svc-card--small glass-panel" data-reveal data-delay="5">
            <div className="svc-icon">
              <span className="material-symbols-outlined svc-icon-sym">ad_units</span>
            </div>
            <h3 className="text-headline-md svc-title">App Development</h3>
            <p className="text-body-md svc-desc">
              Craft intuitive native and cross-platform mobile experiences that drive engagement
              and seamlessly integrate with your ecosystem.
            </p>
          </div>

          {/* Email Marketing – wide */}
          <div className="svc-card svc-card--wide glass-panel" data-reveal data-delay="6">
            <div className="svc-wide-left">
              <div className="svc-icon svc-icon--lg">
                <span className="material-symbols-outlined svc-icon-sym svc-icon-sym--lg">mark_email_read</span>
              </div>
              <div>
                <h3 className="text-headline-md svc-title">Email Marketing</h3>
                <p className="text-body-md svc-desc">
                  Drive engagement with high-conversion automation sequences. We design targeted,
                  data-driven campaigns that nurture leads and maximize customer lifetime value.
                </p>
              </div>
            </div>
            <a href="#contact" className="svc-case-btn text-label-md" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              View Case Studies
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
