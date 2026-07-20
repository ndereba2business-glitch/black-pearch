'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Pillars', href: '#pillars' },
  { label: 'Menu', href: '#menu' },
  { label: 'Events', href: '#events' },
  { label: 'Reserve', href: '#reserve' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1.5,
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 w-full z-[100] flex items-center justify-between section-padding py-7 transition-all duration-700"
        style={scrolled ? { background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' } : {}}
      >
        <Link href="/" className="nav-item flex items-center gap-[2px]">
          <span className="font-heading text-xl tracking-[0.15em] text-forge-eleven-text uppercase">The Black Pearch</span>
          <span className="font-heading text-xl text-forge-eleven-accent">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-item relative font-body text-[11px] tracking-[0.2em] uppercase text-forge-eleven-text/50 hover:text-forge-eleven-text transition-colors duration-300 group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-forge-eleven-accent group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </div>

        <Link
          href="#reserve"
          className="nav-item hidden md:flex font-body text-[11px] tracking-[0.2em] uppercase text-forge-eleven-text/60 hover:text-forge-eleven-accent transition-colors duration-300 border border-forge-eleven-text/15 hover:border-forge-eleven-accent px-6 py-3"
        >
          Book VIP Table
        </Link>

        <button
          className="nav-item md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-px bg-forge-eleven-text block" />
          <span className="w-4 h-px bg-forge-eleven-text block" />
        </button>
      </nav>

      <div
        className="fixed inset-0 z-[99] bg-forge-eleven-bg flex flex-col items-center justify-center transition-all duration-500"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        {NAV_LINKS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="font-heading text-6xl text-forge-eleven-text hover:text-forge-eleven-accent transition-colors duration-300 py-4"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  )
}