import { NumberTicker } from '../components/aceternity/NumberTicker'
import { BackgroundBeams } from '../components/aceternity/BackgroundBeams'
import './Stats.css'

const stats = [
  { value: 35, suffix: '+', label: 'Projects Delivered', desc: 'Shipped for early-stage startups and growing SMBs', badge: 'Client Trusted' },
  { value: 99.5, suffix: '%', label: 'Uptime SLA', desc: 'Reliable infrastructure behind every deployment', decimalPlaces: 1, badge: 'Dependable Infra' },
  { value: 42, suffix: '%', label: 'Avg. Latency Reduction', desc: 'Through optimized pipelines and smart caching', badge: 'Performance Gains' },
  { value: 1.2, suffix: 'M+', label: 'Data Points Processed Daily', desc: 'Across active client dashboards and integrations', decimalPlaces: 1, badge: 'Growing Scale' },
]

export default function Stats() {
  return (
    <section className="stats-section">
      <BackgroundBeams className="stats-beams" />
      <div className="stats-inner container">
        <div className="stats-header" data-reveal>
          <span className="stats-eyebrow text-label-md">Measured Impact</span>
          <h2 className="stats-title text-headline-lg">Our Digital Impact</h2>
        </div>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card glass-panel linear-glow-border" data-reveal data-delay={String(i + 1)}>
              <div className="stat-card-top">
                <span className="stat-badge text-label-sm">{stat.badge}</span>
              </div>
              <div className="stat-value text-headline-xl">
                <NumberTicker
                  value={stat.value}
                  suffix={stat.suffix}
                  decimalPlaces={stat.decimalPlaces || 0}
                  delay={i * 0.15}
                  className="stat-ticker"
                />
              </div>
              <div className="stat-label text-label-md">{stat.label}</div>
              <p className="stat-desc text-body-md">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
