import { useState } from 'react'
import { WavyBackground } from '../components/aceternity/WavyBackground'
import { TypewriterEffect } from '../components/aceternity/TypewriterEffect'
import './Contact.css'

// Defined once at module scope, like Home.jsx's heroWords — TypewriterEffect
// resets whenever this array's reference changes, so it must stay stable
// across renders rather than being written inline in the JSX below.
const contactHeadlineWords = [
  { text: 'Just' },
  { text: 'Take' },
  { text: 'a' },
  { text: 'STEP', className: 'contact-title-emphasis' },
]

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
          <h1 className="contact-title">
            {/* The opening quote is static so it's visible before typing
                even starts. The closing quote is passed as `suffix`, which
                TypewriterEffect only renders once typing completes — kept
                separate from the "STEP" word itself so the quote mark
                stays white instead of inheriting STEP's purple color. */}
            &ldquo;<TypewriterEffect
              words={contactHeadlineWords}
              cursorClassName="contact-cursor"
              loop
              loopInterval={7000}
              suffix="”"
            />
          </h1>
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
        </div>
      </div>
    </WavyBackground>
  )
}
