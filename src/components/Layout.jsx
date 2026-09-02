import { useState, useEffect } from 'react'
import Home from '../pages/Home'
import Services from '../pages/Services'
import About from '../pages/About'
import Contact from '../pages/Contact'
import CustomCursor from './CustomCursor'
import ParticleField from './ParticleField'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Layout.css'

const navLinks = [
  { to: '#home', label: 'Home' },
  { to: '#services', label: 'Services' },
  { to: '#about', label: 'About Us' },
  { to: '#contact', label: 'Contact' },
]

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  useScrollReveal('[data-reveal]')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section based on scroll position
      const sections = ['home', 'services', 'about', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, hash) => {
    e.preventDefault()
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <div className="site-wrapper">
      {/* Custom cursor */}
      <CustomCursor />

      {/* Floating particle field */}
      <ParticleField count={55} />

      {/* Ambient background glows */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-blob ambient-blob--top-left" />
        <div className="ambient-blob ambient-blob--bottom-right" />
      </div>

      {/* Header */}
      <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`} id="global-header">
        <div className="container header-inner">
          {/* Brand */}
          <a
            href="#home"
            className="brand"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <div className="brand-icon">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hexagon</span>
            </div>
            Lumina Logic
          </a>

          {/* Desktop Nav */}
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map(({ to, label }) => (
              <a
                key={to}
                href={to}
                className={`nav-link${activeSection === to.replace('#', '') ? ' nav-link--active' : ''}`}
                onClick={(e) => handleNavClick(e, to)}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="cta-btn desktop-only"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Get Started
          </a>

          {/* Mobile toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="mobile-nav glass-panel" role="navigation" aria-label="Mobile navigation">
            {navLinks.map(({ to, label }) => (
              <a
                key={to}
                href={to}
                className={`mobile-nav-link${activeSection === to.replace('#', '') ? ' mobile-nav-link--active' : ''}`}
                onClick={(e) => handleNavClick(e, to)}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="cta-btn"
              style={{ marginTop: '8px', textAlign: 'center' }}
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Get Started
            </a>
          </div>
        )}
      </header>

      {/* Page Content – all sections on one page */}
      <main className="site-main">
        <section id="home">
          <Home />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '16px' }}>hexagon</span>
              Lumina Logic
            </div>
            <p className="text-body-md footer-tagline">Engineering scalable intelligence for the digital frontier.</p>
          </div>

          <div className="footer-links-group">
            <span className="footer-group-title text-label-md">Capabilities</span>
            <a href="#services" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#services')}>Services</a>
            <a href="#services" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#services')}>Cloud Architecture</a>
            <a href="#services" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#services')}>AI Strategy</a>
            <a href="#services" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#services')}>Cybersecurity</a>
          </div>

          <div className="footer-links-group">
            <span className="footer-group-title text-label-md">Company</span>
            <a href="#about" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#about')}>About Us</a>
            <a href="#contact" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
          </div>

          <div className="footer-links-group">
            <span className="footer-group-title text-label-md">Legal</span>
            <a href="#" className="footer-link text-body-md">Privacy Policy</a>
            <a href="#" className="footer-link text-body-md">Terms of Service</a>
          </div>

          <div className="footer-copy">
            <p className="text-body-md">© 2024 Lumina Logic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
