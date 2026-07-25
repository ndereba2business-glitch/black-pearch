// components/layout/Navbar.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Menu } from 'lucide-react'

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

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setActiveHref(href)
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
      {/* Left links — always visible, no responsive hiding */}
      <div className="flex items-center gap-8">
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

      {/* Right links + decorative icon — pushed right via margin-left:auto,
          not justify-content:space-between, so it never depends on how
          many siblings are visible */}
      <div className="flex items-center gap-8" style={{ marginLeft: 'auto' }}>
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

        <span
          className="nav-item flex items-center justify-center w-10 h-10 rounded-full border shrink-0"
          style={{ borderColor: 'rgba(240,237,230,0.25)', color: '#f0ede6' }}
          aria-hidden="true"
        >
          <Menu size={16} />
        </span>
      </div>
    </nav>
  )
}