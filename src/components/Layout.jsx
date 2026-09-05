import { useState, useEffect } from 'react'
import Home, { ClientImpact } from '../pages/Home'
import Services from '../pages/Services'
import Stats from '../pages/Stats'
import About from '../pages/About'
import Contact from '../pages/Contact'
import CustomCursor from './CustomCursor'
import ParticleField from './ParticleField'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useIsTouchDevice, useIsMobile } from '../hooks/useMediaQuery'
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
  const isTouch = useIsTouchDevice()
  const isMobile = useIsMobile()
  useScrollReveal('[data-reveal]')

  // The drawer only exists below the desktop breakpoint. Deriving this
  // rather than syncing it in an effect means rotating the phone or
  // resizing the window can never leave a stuck-open menu or scroll lock.
  const drawerOpen = menuOpen && isMobile

  // Lock the page behind the open drawer, and restore the exact scroll
  // position afterwards (position:fixed otherwise jumps to the top).
  useEffect(() => {
    if (!drawerOpen) return

    const scrollY = window.scrollY
    const { body } = document
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.width = prev.width
      body.style.overflow = prev.overflow
      window.scrollTo(0, scrollY)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [drawerOpen])

  useEffect(() => {
    let ticking = false
    let lastScrolled = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50
          if (isScrolled !== lastScrolled) {
            lastScrolled = isScrolled
            setScrolled(isScrolled)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Non-blocking IntersectionObserver for active section highlighting — zero scroll layout recalculation
    const sections = ['home', 'services', 'stats', 'about', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const handleNavClick = (e, hash) => {
    e.preventDefault()
    const id = hash.replace('#', '')

    const scrollToSection = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    if (drawerOpen) {
      // The drawer holds a position:fixed scroll lock. Close it first and
      // scroll on the next frame, once the lock has been released — otherwise
      // the unlock restores the old offset and cancels the jump.
      setMenuOpen(false)
      requestAnimationFrame(() => requestAnimationFrame(scrollToSection))
    } else {
      scrollToSection()
    }
  }

  return (
    <div className="site-wrapper">
      {/* Custom cursor – pointer devices only; on touch there is no cursor
          to replace and the RAF loop would just burn battery. */}
      {!isTouch && <CustomCursor />}

      {/* Floating particle field – the link-drawing pass is O(n²), so keep
          the count well down on phone GPUs. */}
      <ParticleField count={isMobile ? 22 : 55} />

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
            <div className="brand-icon solisio-brand-icon">
              <img src="/solisio-icon.png" alt="Solisio Solutions Logo" className="brand-logo-img" />
            </div>
            <div className="brand-text-block">
              <span className="brand-name">Solisio Solutions</span>
              <span className="brand-tagline">Chase your dreams</span>
            </div>
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
            Book an appointment
          </a>

          {/* Mobile toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
          >
            <span className="material-symbols-outlined">{drawerOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="mobile-nav glass-panel" id="mobile-nav" role="navigation" aria-label="Mobile navigation">
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
              Book an appointment
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
        <ClientImpact />
        <section id="stats">
          <Stats />
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
              <img src="/solisio-icon.png" alt="Solisio Solutions" className="footer-logo-img" />
              <span>Solisio Solutions</span>
            </div>
            <p className="footer-motto">Chase your dreams</p>
            <p className="text-body-md footer-tagline">Engineering scalable intelligence and high-velocity digital architectures for forward-thinking enterprises.</p>
          </div>

          <div className="footer-links-group">
            <span className="footer-group-title text-label-md">Capabilities</span>
            <a href="#services" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#services')}>Business & AI Integration</a>
            <a href="#services" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#services')}>AI Chatbots</a>
            <a href="#services" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#services')}>SEO & Website</a>
            <a href="#services" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#services')}>Email Marketing</a>
            <a href="#services" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#services')}>IT Consulting & KPO</a>
          </div>

          <div className="footer-links-group">
            <span className="footer-group-title text-label-md">Company</span>
            <a href="#about" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#about')}>About Us</a>
            <a href="#contact" className="footer-link text-body-md" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
          </div>

          <div className="footer-links-group">
            <span className="footer-group-title text-label-md">Legal</span>
            <a href="#privacy" className="footer-link text-body-md" onClick={(e) => { e.preventDefault(); alert('Solisio Solutions Enterprise Privacy Standards: Zero third-party telemetry, end-to-end data segregation, and SOC-2 compliant processing.') }}>Privacy Policy</a>
            <a href="#terms" className="footer-link text-body-md" onClick={(e) => { e.preventDefault(); alert('Solisio Solutions Terms of Engagement: Enterprise SLA with 99.9% uptime and dedicated technical advisory.') }}>Terms of Service</a>
          </div>

          <div className="footer-copy">
            <p className="text-body-md">© 2025 Solisio Solutions Inc. All rights reserved.</p>
            <p className="text-body-md" style={{ color: 'var(--color-primary)', fontSize: '13px', opacity: 0.8 }}>Chase your dreams • Built for Enterprise Scale</p>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <button
        type="button"
        className={`back-to-top-btn${scrolled ? ' back-to-top-btn--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll back to top"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_upward</span>
      </button>
    </div>
  )
}
