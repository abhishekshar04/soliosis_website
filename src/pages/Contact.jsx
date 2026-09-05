import { useState } from 'react'
import { WavyBackground } from '../components/aceternity/WavyBackground'
import './Contact.css'


const projectOptions = [
  { value: '', label: 'Select an area of focus...', disabled: true },
  { value: 'business-ai-integration', label: 'Business and AI Integration' },
  { value: 'ai-chatbots', label: 'AI Chatbots' },
  { value: 'seo', label: 'SEO' },
  { value: 'website', label: 'Website' },
  { value: 'email-marketing', label: 'Email Marketing' },
  { value: 'it-consulting', label: 'IT Consulting' },
  { value: 'kpo', label: 'KPO' },
  { value: 'other', label: 'Other Technical Inquiry' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <WavyBackground
      containerClassName="contact-page"
      className=""
      colors={['rgba(124,58,237,0.15)', 'rgba(208,188,255,0.08)', 'rgba(76,29,149,0.12)']}
      waveOpacity={0.8}
      blur={30}
      speed="slow"
    >
      {/* Ambient glows */}
      <div className="contact-glow contact-glow--tr" aria-hidden="true" />
      <div className="contact-glow contact-glow--bl" aria-hidden="true" />

      <div className="contact-container container">
        {/* Page header */}
        <div className="contact-header" data-reveal>
          <h1 className="contact-title">Initiate Consultation</h1>
          <p className="text-body-lg contact-subtitle">
            Connect with our engineering leads to discuss secure, scalable solutions for your enterprise architecture.
          </p>
        </div>

        {/* Bento layout */}
        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-wrap glass-panel" data-reveal data-delay="1">
            {submitted ? (
              <div className="contact-success">
                <span className="material-symbols-outlined success-icon" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <h2 className="text-headline-md">Request Transmitted</h2>
                <p className="text-body-lg">Our engineering team will get back to you within 24 hours.</p>
                <button className="submit-btn" onClick={() => setSubmitted(false)}>Send another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label text-label-sm" htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      className="form-input text-body-md"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label text-label-sm" htmlFor="email">Corporate Email</label>
                    <input
                      id="email"
                      type="email"
                      className="form-input text-body-md"
                      placeholder="jane@enterprise.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label text-label-sm" htmlFor="project">Project Scope</label>
                  <div className="select-wrapper">
                    <select
                      id="project"
                      className="form-input form-select text-body-md"
                      value={form.project}
                      onChange={handleChange}
                    >
                      {projectOptions.map(o => (
                        <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined select-chevron">expand_more</span>
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label text-label-sm" htmlFor="message">Executive Summary</label>
                  <textarea
                    id="message"
                    className="form-input form-textarea text-body-md"
                    placeholder="Briefly describe your current infrastructure challenges and strategic goals..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn text-label-md">
                    Transmit Request
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>send</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="contact-sidebar" data-reveal data-delay="2">
            {/* Details card */}
            <div className="contact-details glass-panel">
              <h3 className="text-headline-md contact-details-title">Command Center</h3>

              <div className="detail-item">
                <div className="detail-icon-wrap">
                  <span className="material-symbols-outlined detail-icon">location_on</span>
                </div>
                <div>
                  <h4 className="text-label-md detail-label">Global Headquarters</h4>
                  <p className="text-body-md detail-value">
                    100 Innovation Drive, Floor 42<br />Silicon Valley, CA 94025
                  </p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon-wrap">
                  <span className="material-symbols-outlined detail-icon">encrypted</span>
                </div>
                <div>
                  <h4 className="text-label-md detail-label">Encrypted Direct Line</h4>
                  <p className="text-body-md detail-value">+1 (800) 555-SOLISIO</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon-wrap">
                  <span className="material-symbols-outlined detail-icon">alternate_email</span>
                </div>
                <div>
                  <h4 className="text-label-md detail-label">Enterprise Inquiries</h4>
                  <p className="text-body-md detail-value">contact@solisio.com</p>
                </div>
              </div>

              <div className="status-bar">
                <div className="status-dot" />
                <span className="text-label-sm status-text">Systems Nominal • Support Active 24/7</span>
              </div>
            </div>

            {/* Map visualization */}
            <div className="contact-map glass-panel">
              <div className="map-overlay" />
              <div
                className="map-grid"
                aria-label="Global network visualization"
              >
                {/* Decorative grid lines */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="map-h-line" style={{ top: `${(i + 1) * 14}%` }} />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="map-v-line" style={{ left: `${(i + 1) * 11}%` }} />
                ))}
                {/* Nodes */}
                {[
                  { top: '25%', left: '20%' },
                  { top: '55%', left: '40%' },
                  { top: '35%', left: '65%' },
                  { top: '70%', left: '75%' },
                  { top: '20%', left: '82%' },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="map-node"
                    style={{ top: pos.top, left: pos.left }}
                  />
                ))}
              </div>
              <div className="map-footer">
                <span className="material-symbols-outlined map-loc-icon">my_location</span>
                <span className="text-label-sm map-label">NODE_SV_42</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WavyBackground>
  )
}
