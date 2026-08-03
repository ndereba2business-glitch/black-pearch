'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IconInstagram, IconFacebook, IconTiktok, IconMapPin, IconClock, IconArrowDown } from '@/components/ui/icons'

import GlassBadge from '@/components/ui/GlassBadge'
import GrainOverlay from '@/components/ui/GrainOverlay'
import CinematicFog from '@/components/ui/CinematicFog'
import CursorGlow from '@/components/ui/CursorGlow'
import AmbientParticles from '@/components/ui/AmbientParticles'
import { magneticHover } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

// TODO: paste real profile URLs here when ready, e.g.
// instagram: 'https://instagram.com/theblackperch'
// facebook: 'https://facebook.com/theblackperch'
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/the_blackperch/',
  facebook: 'https://www.facebook.com/p/The-Black-Perch-100054397995777/',
  tiktok: 'https://www.tiktok.com/@theblackperch',
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
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
          src="/hero/black-perch-hero.png"
          alt="The Black Perch Exterior"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 25%',
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

      {/* ══════════════ TOP BRAND HEADER ══════════════ */}
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
          DINE. CHILL. INDULGE.
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
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(1.9rem, 3.4vw, 3.4rem)',
            lineHeight: '1.2',
            color: '#f0ede6',
            marginBottom: '24px',
            fontWeight: 300,
            maxWidth: '620px',
          }}
        >
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span className="line-inner" style={{ display: 'block' }}>
              An unforgettable dining
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span className="line-inner" style={{ display: 'block' }}>
              and lifestyle experience
            </span>
          </span>
        </h1>

        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '15px',
            color: 'rgba(240,237,230,0.55)',
            letterSpacing: '0.12em',
            marginBottom: '28px',
            lineHeight: 1.7,
            maxWidth: '28rem',
          }}
        >
          — lounge, cafe, spa and sherehe nights, all under one roof
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
        
        <a
          href={SOCIAL_LINKS.instagram || '#'}
          target={SOCIAL_LINKS.instagram ? '_blank' : undefined}
          rel={SOCIAL_LINKS.instagram ? 'noopener noreferrer' : undefined}
          aria-label="Instagram"
          style={{ color: 'rgba(240,237,230,0.5)' }}
        >
          <IconInstagram />
        </a>

        <a
          href={SOCIAL_LINKS.facebook || '#'}
          target={SOCIAL_LINKS.facebook ? '_blank' : undefined}
          rel={SOCIAL_LINKS.facebook ? 'noopener noreferrer' : undefined}
          aria-label="Facebook"
          style={{ color: 'rgba(240,237,230,0.5)' }}
        >
          <IconFacebook />
        </a>

        <a
          href={SOCIAL_LINKS.tiktok || '#'}
          target={SOCIAL_LINKS.tiktok ? '_blank' : undefined}
          rel={SOCIAL_LINKS.tiktok ? 'noopener noreferrer' : undefined}
          aria-label="TikTok"
          style={{ color: 'rgba(240,237,230,0.5)' }}
        >
          <IconTiktok />
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