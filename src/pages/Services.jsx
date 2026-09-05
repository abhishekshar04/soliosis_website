
import { CardHoverEffect } from '../components/aceternity/CardHoverEffect'
import { BackgroundBeams } from '../components/aceternity/BackgroundBeams'
import './Services.css'

const services = [
  {
    id: 'business-ai-integration',
    icon: 'hub',
    tag: 'Enterprise Intelligence',
    title: 'Business and AI Integration',
    desc: 'Seamlessly embed artificial intelligence directly into core business operations. We bridge legacy enterprise systems with autonomous neural pipelines, predictive modeling, and intelligent workflow automation to unlock exponential operational efficiency.',
    quote: 'Cut our manual reporting time in half within the first month.',
    metrics: ['Custom Neural Pipelines', 'Automated Decision Engines', 'Predictive Modeling'],
    colSpan: 'svc-card--span-7',
    glowClass: 'svc-glow--primary',
  },
  {
    id: 'ai-chatbots',
    icon: 'smart_toy',
    tag: 'Conversational AI',
    title: 'AI Chatbots',
    desc: 'Deploy state-of-the-art conversational agents powered by fine-tuned LLMs and retrieval-augmented generation (RAG). Deliver 24/7 hyper-personalized customer experiences, instant query triage, and zero-downtime tier-1 support.',
    quote: 'Resolved most tier-1 tickets without a human ever touching them.',
    metrics: ['RAG Architectures', 'Omnichannel Deploy', 'Sub-second Latency'],
    colSpan: 'svc-card--span-5',
    glowClass: 'svc-glow--secondary',
  },
  {
    id: 'seo',
    icon: 'trending_up',
    tag: 'Organic Growth',
    title: 'SEO',
    desc: 'Technical search engine optimization architected for enterprise market domination. We engineer semantic content graphs, core web vital speed enhancements, and high-authority link structures that capture high-intent organic demand.',
    quote: 'Organic traffic finally started moving after years of being flat.',
    metrics: ['Technical Audits', 'Semantic Search Graphs', '100% Core Web Vitals'],
    colSpan: 'svc-card--span-4',
    glowClass: 'svc-glow--tertiary',
  },
  {
    id: 'website',
    icon: 'language',
    tag: 'Platform Engineering',
    title: 'Website',
    desc: 'Engineer ultra-fast, visually breathtaking, and conversion-optimized websites and digital platforms. Built with modern reactive frameworks, fluid micro-animations, and military-grade security for maximum digital authority.',
    quote: 'The new site loads instantly and actually converts visitors.',
    metrics: ['React / Vite Architecture', 'Zero-Lag Fluid UX', 'Enterprise Security'],
    colSpan: 'svc-card--span-4',
    glowClass: 'svc-glow--primary',
  },
  {
    id: 'email-marketing',
    icon: 'mark_email_read',
    tag: 'Lifecycle Marketing',
    title: 'Email Marketing',
    desc: 'High-conversion lifecycle automation sequences and behavioral lead nurturing. We design data-backed trigger campaigns that turn cold prospects into loyal advocates while maximizing customer lifetime value (LTV).',
    quote: 'Abandoned cart recovery alone paid for the whole engagement.',
    metrics: ['Dynamic Personalization', 'Behavioral Segmentation', 'High Deliverability'],
    colSpan: 'svc-card--span-4',
    glowClass: 'svc-glow--secondary',
  },
  {
    id: 'it-consulting',
    icon: 'settings_suggest',
    tag: 'Strategic Advisory',
    title: 'IT Consulting',
    desc: 'Strategic technology advisory and infrastructure modernization for high-growth enterprises. From multi-cloud migrations and zero-trust cybersecurity architectures to DevOps maturity, we align technical roadmaps with measurable business outcomes.',
    quote: 'Gave us a migration plan we could actually execute.',
    metrics: ['Cloud Architecture', 'Zero-Trust Security', 'DevOps & CI/CD'],
    colSpan: 'svc-card--span-6',
    glowClass: 'svc-glow--primary',
  },
  {
    id: 'kpo',
    icon: 'analytics',
    tag: 'Knowledge Operations',
    title: 'KPO',
    desc: 'High-value Knowledge Process Outsourcing delivered by vetted subject matter experts. We handle complex research, financial modeling, deep data telemetry processing, and advanced business intelligence under strict enterprise SLAs.',
    quote: 'Freed up two analysts’ worth of time without hiring anyone new.',
    metrics: ['Advanced Data Analysis', 'Domain Expert Teams', 'SOC-2 Compliance'],
    colSpan: 'svc-card--span-6',
    glowClass: 'svc-glow--secondary',
  },
]

export default function Services() {
  return (
    <div className="services-page">
      {/* Background beams on entire services section */}
      <BackgroundBeams className="services-beams-bg" />

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
          {services.map((svc, i) => (
            <CardHoverEffect
              key={svc.id}
              className={`svc-card ${svc.colSpan} glass-panel`}
              data-reveal
              data-delay={String((i % 4) + 1)}
            >
              <div className={`svc-glow ${svc.glowClass || ''}`} />
              <div className="svc-top">
                <div className="svc-icon-row">
                  <div className="svc-icon">
                    <span className="material-symbols-outlined svc-icon-sym">{svc.icon}</span>
                  </div>
                  <span className="svc-tag text-label-sm">{svc.tag}</span>
                </div>
                <h3 className="text-headline-md svc-title">{svc.title}</h3>
                <p className="svc-quote">&ldquo;{svc.quote}&rdquo;</p>
              </div>

              {/* Revealed on hover/focus only — collapsed otherwise so the
                  grid reads as a clean icon-title-quote bento at rest. */}
              <div className="svc-reveal">
                <div className="svc-reveal-inner">
                  <p className="text-body-md svc-desc">{svc.desc}</p>
                  <div className="svc-bottom">
                    <div className="svc-metrics-pills">
                      {svc.metrics.map(m => (
                        <span key={m} className="svc-metric-pill text-label-sm">{m}</span>
                      ))}
                    </div>
                    <a
                      href="#contact"
                      className="svc-link text-label-md"
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Get started
                      <span className="material-symbols-outlined svc-link-icon">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </CardHoverEffect>
          ))}
        </div>
      </section>
    </div>
  )
}
