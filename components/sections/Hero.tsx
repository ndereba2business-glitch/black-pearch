'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IconInstagram, IconFacebook, IconMapPin, IconClock, IconArrowDown } from '@/components/ui/icons'

import GlassBadge from '@/components/ui/GlassBadge'
import GrainOverlay from '@/components/ui/GrainOverlay'
import CinematicFog from '@/components/ui/CinematicFog'
import CursorGlow from '@/components/ui/CursorGlow'
import AmbientParticles from '@/components/ui/AmbientParticles'
import { magneticHover } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const primaryBtnRef = useRef<HTMLAnchorElement>(null)

  // ── Entrance timeline + scroll parallax ─────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.2, ease: 'power3.out' }
      )

      // Subtle parallax on scroll
      gsap.to(imageWrapRef.current, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ── Soft camera movement on mouse move ───────────────────
  useEffect(() => {
    const wrap = imageWrapRef.current
    if (!wrap || window.matchMedia('(hover: none)').matches) return

    const xTo = gsap.quickTo(wrap, 'x', { duration: 1.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(wrap, 'y', { duration: 1.4, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const relX = e.clientX / window.innerWidth - 0.5
      const relY = e.clientY / window.innerHeight - 0.5
      xTo(relX * 16)
      yTo(relY * 10)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // ── Magnetic hover ──────────────────────────────────────────
  useEffect(() => {
    const cleanup = magneticHover(primaryBtnRef.current, 0.3)
    return () => cleanup && cleanup()
  }, [])

  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: '#080808',
      }}
    >
      {/* ══════════════ LAYER 1 — Background Image ══════════════ */}
      <div
        ref={imageWrapRef}
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'transform',
        }}
      >
        <img
          src="/hero/black-perch-hero-desktop.png" /* Update path if your image file is named differently in /public */
          alt="The Black Perch Exterior"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 45%', /* Adjusted framing so top building sign isn't cut off */
            display: 'block',
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />

        {/* Cinematic Vignette & Readability Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.2) 35%, rgba(8,8,8,0.75) 80%, #080808 100%)',
          }}
        />
      </div>

      {/* ══════════════ TOP BRAND HEADER — "The Black Perch" / "DINE. DRINK. INDULGE." ══════════════ */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)',
            color: '#c9a96e',
            fontWeight: 300,
            letterSpacing: '0.08em',
            lineHeight: 1,
            margin: 0,
          }}
        >
          The Black Perch
        </h2>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '8px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.5)',
            marginTop: '6px',
          }}
        >
          DINE. DRINK. INDULGE.
        </span>
      </div>

      {/* ══════════════ LAYER 2 — Atmosphere ══════════════ */}
      <CinematicFog />
      <GrainOverlay opacity={0.045} />
      <AmbientParticles />
      <CursorGlow range={36} />

      {/* ══════════════ LAYER 3 — Main Hero Content ══════════════ */}
      <div
        ref={contentRef}
        className="hero-content-padding"
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 80px 85px 80px',
          maxWidth: '750px',
        }}
      >
        {/* Main Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            lineHeight: '1.05',
            color: '#f0ede6',
            marginBottom: '18px',
            fontWeight: 300,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          A New Level <br /> Of Indulgence
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 'clamp(0.75rem, 0.9vw, 0.88rem)',
            color: 'rgba(240,237,230,0.6)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '26px',
            lineHeight: 1.6,
          }}
        >
          Exquisite Cuisine. Timeless Ambience. <br />
          Unforgettable Experiences.
        </p>

        {/* Status Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <GlassBadge>
            <IconClock width={12} height={12} style={{ marginRight: 6 }} />
            OPEN 24/7
          </GlassBadge>
          <GlassBadge>
            <IconMapPin width={12} height={12} style={{ marginRight: 6 }} />
            MILIMANI ROAD, MERU
          </GlassBadge>
        </div>

        {/* CTA Button */}
        <div>
          <a
            ref={primaryBtnRef}
            href="#reserve"
            onClick={scrollToId('reserve')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#f0ede6',
              background: 'transparent',
              border: '1px solid rgba(201, 169, 110, 0.6)',
              padding: '16px 32px',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
          >
            Reserve a Table &rarr;
          </a>
        </div>
      </div>

      {/* Social Rail (Right) */}
      <div
        className="hero-social-rail"
        style={{
          position: 'absolute',
          right: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <span style={{ width: '1px', height: '48px', background: 'rgba(240,237,230,0.2)' }} />
        <a href="#" aria-label="Instagram" style={{ color: 'rgba(240,237,230,0.5)' }}>
          <IconInstagram />
        </a>
        <a href="#" aria-label="Facebook" style={{ color: 'rgba(240,237,230,0.5)' }}>
          <IconFacebook />
        </a>
        <span style={{ width: '1px', height: '48px', background: 'rgba(240,237,230,0.2)' }} />
      </div>

      {/* Scroll Indicator (Bottom Center) */}
      <div
        className="hero-scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '9px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.35)',
          }}
        >
          Scroll
        </span>
        <IconArrowDown width={12} height={12} color="rgba(240,237,230,0.35)" />
      </div>

      {/* Bottom Fade Gradient */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, transparent 0%, #080808 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
    </section>
  )
}