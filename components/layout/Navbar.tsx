'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { Menu } from 'lucide-react'

const LEFT_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reservations', href: '#reserve' },
]

const RIGHT_LINKS = [
  { label: 'Our Story', href: '#heritage' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#location' },
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
        stagger: 0.08,
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
        className="fixed top-0 left-0 right-0 w-full z-[100] grid grid-cols-3 items-center section-padding py-6 transition-all duration-700"
        style={scrolled ? { background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' } : {}}
      >
        <div className="hidden md:flex items-center gap-8">
          {LEFT_LINKS.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-item relative font-body text-[11px] tracking-[0.2em] uppercase text-forge-eleven-text/60 hover:text-forge-eleven-text transition-colors duration-300"
            >
              {item.label}
              {i === 0 && <span className="absolute -bottom-2 left-0 w-full h-px bg-forge-eleven-accent" />}
            </Link>
          ))}
        </div>

        <Link href="#home" className="nav-item flex flex-col items-center justify-self-center text-center">
          <span className="font-heading text-2xl md:text-3xl text-forge-eleven-accent tracking-wide">
            The Black Pearch
          </span>
          <span className="font-body text-[9px] tracking-[0.4em] uppercase text-forge-eleven-text/50 mt-1">
            Dine. Unwind. Indulge.
          </span>
        </Link>

        <div className="hidden md:flex items-center justify-end gap-8">
          {RIGHT_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-item font-body text-[11px] tracking-[0.2em] uppercase text-forge-eleven-text/60 hover:text-forge-eleven-text transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
          <button
            className="nav-item w-10 h-10 rounded-full border border-forge-eleven-accent/40 flex items-center justify-center text-forge-eleven-accent hover:border-forge-eleven-accent transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={16} />
          </button>
        </div>

        <button
          className="nav-item md:hidden col-start-3 justify-self-end w-9 h-9 rounded-full border border-forge-eleven-accent/40 flex items-center justify-center text-forge-eleven-accent"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={16} />
        </button>
      </nav>

      <div
        className="fixed inset-0 z-[99] bg-forge-eleven-bg flex flex-col items-center justify-center transition-all duration-500"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        {[...LEFT_LINKS, ...RIGHT_LINKS].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="font-heading text-5xl text-forge-eleven-text hover:text-forge-eleven-accent transition-colors duration-300 py-3"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  )
}