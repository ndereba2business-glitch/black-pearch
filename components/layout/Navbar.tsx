// components/layout/Navbar.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'

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
  const [menuOpen, setMenuOpen] = useState(false)
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
    setMenuOpen(false)
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
          justifyContent: 'space-between',
          ...(scrolled
            ? {
                background: 'rgba(8,8,8,0.85)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }
            : {}),
        }}
      >
        {/* Left links */}
        <div className="hidden md:flex items-center gap-8">
          {LEFT_LINKS.map((item) => (
            
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

        {/* Right links + menu toggle */}
        <div className="flex items-center justify-end gap-8">
          <div className="hidden md:flex items-center gap-8">
            {RIGHT_LINKS.map((item) => (
              
                key={item.href}
                href={item.href}
                onClick={handleNavClick(item.href)}
                className="nav-item"
                style={linkStyle(item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className="nav-item flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-300 shrink-0"
            style={{ borderColor: 'rgba(240,237,230,0.25)', color: '#f0ede6' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-6 transition-all duration-500"
        style={{
          background: '#080808',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {[...LEFT_LINKS, ...RIGHT_LINKS].map((item) => (
          
            key={item.href}
            href={item.href}
            onClick={handleNavClick(item.href)}
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '2.5rem',
              color: '#f0ede6',
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}