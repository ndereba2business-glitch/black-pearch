// components/layout/Navbar.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const LEFT_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reservations', href: '#reservations' },
]

const RIGHT_LINKS = [
  { label: 'Our Story', href: '#story' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeHref, setActiveHref] = useState('#home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 1,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 1.2,
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setActiveHref(href)
    setMobileMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const linkStyle = (href: string): React.CSSProperties => ({
    fontFamily: 'var(--font-dm-sans), sans-serif',
    fontSize: '10px',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: activeHref === href ? '#f0ede6' : 'rgba(240,237,230,0.45)',
    position: 'relative',
    transition: 'color 0.3s ease',
    whiteSpace: 'nowrap',
  })

  return (
    <>
      <nav
        ref={navRef}
        className="absolute top-0 left-0 right-0 w-full z-[100] section-padding py-6 transition-all duration-700"
        style={{
          display: 'flex',
          alignItems: 'center',
          ...(scrolled
            ? {
                background: 'rgba(8,8,8,0.85)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }
            : {}),
        }}
      >
        {/* Left links — visible on desktop/tablet, hidden on mobile */}
        <div className="hidden md:flex items-center" style={{ gap: '32px' }}>
          {LEFT_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick(item.href)}
              className="nav-item"
              style={linkStyle(item.href)}
            >
              {item.label}
              {activeHref === item.href && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    width: '100%',
                    height: '1px',
                    background: '#c9a96e',
                  }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right links + toggle — pushed right via margin-left:auto so
            it stays correctly placed regardless of what's hidden beside it */}
        <div className="flex items-center" style={{ gap: '32px', marginLeft: 'auto' }}>
          <div className="hidden md:flex items-center" style={{ gap: '32px' }}>
            {RIGHT_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick(item.href)}
                className="nav-item"
                style={linkStyle(item.href)}
              >
                {item.label}
                {activeHref === item.href && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: 0,
                      width: '100%',
                      height: '1px',
                      background: '#c9a96e',
                    }}
                  />
                )}
              </a>
            ))}
          </div>

          <button
            className="nav-item"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              width: '40px',
              height: '40px',
              flexShrink: 0,
              borderRadius: '9999px',
              border: '1px solid rgba(240,237,230,0.25)',
              background: 'transparent',
              cursor: 'pointer',
            }}
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span
              style={{
                display: 'block',
                width: '16px',
                height: '1.5px',
                background: '#f0ede6',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: mobileMenuOpen ? 'translateY(5.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '16px',
                height: '1.5px',
                background: '#f0ede6',
                transition: 'opacity 0.3s ease',
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '16px',
                height: '1.5px',
                background: '#f0ede6',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: mobileMenuOpen ? 'translateY(-5.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay — only reachable on < md, since the toggle
          button is the only way to open it there (links are always
          visible directly on md+) */}
      <div
        className="md:hidden fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-500"
        style={{
          gap: '28px',
          background: '#080808',
          zIndex: 200,
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
      >
        {[...LEFT_LINKS, ...RIGHT_LINKS].map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={handleNavClick(item.href)}
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '2.2rem',
              fontWeight: 300,
              color: activeHref === item.href ? '#c9a96e' : '#f0ede6',
              transition: 'color 0.3s ease',
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}