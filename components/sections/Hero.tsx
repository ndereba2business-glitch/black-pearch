// components/sections/Hero.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IconInstagram, IconFacebook, IconMapPin, IconClock, IconArrowDown } from '@/components/ui/icons'

import GlassBadge from '@/components/ui/GlassBadge'
import GrainOverlay from '@/components/ui/GrainOverlay'
import CinematicFog from '@/components/ui/CinematicFog'
import CursorGlow from '@/components/ui/CursorGlow'
import AmbientParticles from '@/components/ui/AmbientParticles'
import { heroImageReveal, heroHeadingReveal, fadeUp, magneticHover } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

const TITLE_WORDS = ['The', 'Black', 'Perch']

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const metaRowRef = useRef<HTMLDivElement>(null)
  const ctaRowRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const primaryBtnRef = useRef<HTMLAnchorElement>(null)
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null)

  const [imageFailed, setImageFailed] = useState(false)

  // ── Entrance timeline + scroll parallax ─────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Layer 1 — Ken Burns background reveal
      heroImageReveal(imageRef.current)

      gsap.set([lineRef.current, labelRef.current, subRef.current, metaRowRef.current, ctaRowRef.current], {
        opacity: 0,
      })

      const words = headingRef.current?.querySelectorAll('.word')

      const tl = gsap.timeline({ delay: 0.5 })

      tl.to(lineRef.current, { opacity: 1, scaleX: 1, duration: 1.2, ease: 'power4.inOut' })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .add(() => heroHeadingReveal(words || null), '-=0.3')
        .to(subRef.current, { opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.6')
        .to(metaRowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .to(ctaRowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')

      // Layer 1 — subtle scroll parallax on the background image
      gsap.to(imageWrapRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Heading + content lift out as user scrolls past
      gsap.to(headingRef.current, {
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '10% top',
          end: '55% top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ── Soft floating camera movement based on mouse position ───
  useEffect(() => {
    const wrap = imageWrapRef.current
    if (!wrap) return
    if (window.matchMedia('(hover: none)').matches) return // skip on touch

    const xTo = gsap.quickTo(wrap, 'x', { duration: 1.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(wrap, 'y', { duration: 1.4, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const relX = e.clientX / window.innerWidth - 0.5
      const relY = e.clientY / window.innerHeight - 0.5
      xTo(relX * 24) // small, deliberate range — never exaggerated
      yTo(relY * 14)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // ── Magnetic hover on CTAs ───────────────────────────────────
  useEffect(() => {
    const cleanups = [
      magneticHover(primaryBtnRef.current, 0.3),
      magneticHover(secondaryBtnRef.current, 0.3),
    ]
    return () => cleanups.forEach((fn) => fn())
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
        background: '#080808', // shows through instantly if the hero image is missing/loading
      }}
    >
      {/* ══════════════ LAYER 1 — Cinematic background image ══════════════ */}
      <div
        ref={imageWrapRef}
        style={{ position: 'absolute', inset: 0, top: '-10%', bottom: '-10%', willChange: 'transform' }}
      >
        <div ref={imageRef} style={{ position: 'absolute', inset: 0 }}>
          {!imageFailed && (
            <Image
              src="/hero/black-perch-hero-desktop.png"
              alt="The Black Perch — cinematic restaurant interior at night"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              onError={() => setImageFailed(true)}
            />
          )}
          {/* Fallback wash so the frame still reads as intentional if the asset is missing */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(60,45,20,0.35) 0%, transparent 60%), linear-gradient(160deg, #0f0d0a 0%, #080808 60%)',
            }}
          />
        </div>

        {/* Readability + mood overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.35) 35%, rgba(8,8,8,0.75) 80%, rgba(8,8,8,0.95) 100%)',
          }}
        />
      </div>

      {/* ══════════════ LAYER 2 — Drifting fog ══════════════ */}
      <CinematicFog />

      {/* ══════════════ LAYER 3 — Film grain ══════════════ */}
      <GrainOverlay opacity={0.045} />

      {/* Ambient embers, sitting alongside the grain/fog atmosphere layers */}
      <AmbientParticles />

      {/* ══════════════ LAYER 4 — Cursor-reactive golden glow ══════════════ */}
      <CursorGlow range={36} />

      {/* ══════════════ LAYER 5 — Hero content ══════════════ */}
      <div
        className="hero-content-padding"
        style={{ position: 'relative', zIndex: 10, padding: '0 80px 120px 80px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <div
            ref={lineRef}
            style={{
              width: '56px',
              height: '1px',
              background: '#c9a96e',
              transform: 'scaleX(1)',
              transformOrigin: 'left center',
            }}
          />
          <div ref={labelRef}>
            <GlassBadge>Fine Dining · Meru</GlassBadge>
          </div>
        </div>

        <h1
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(3.5rem, 10vw, 8.5rem)',
            lineHeight: 0.95,
            color: '#f0ede6',
            marginBottom: '28px',
            fontWeight: 300,
            letterSpacing: '-0.01em',
          }}
        >
          {TITLE_WORDS.map((word, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}>
              <span
                className="word"
                style={{
                  display: 'inline-block',
                  color: word === 'Perch' ? '#c9a96e' : '#f0ede6',
                  fontStyle: word === 'Perch' ? 'italic' : 'normal',
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
            color: 'rgba(240,237,230,0.55)',
            maxWidth: '480px',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}
        >
          An unforgettable dining experience crafted with passion — lounge, cafe, spa
          and sherehe nights, all under one roof in Milimani, Meru.
        </p>

        {/* Meta row — hours + location badges */}
        <div
          ref={metaRowRef}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '44px' }}
        >
          <GlassBadge>
            <IconClock width={12} height={12} style={{ marginRight: 2 }} />
            Open 24/7
          </GlassBadge>
          <GlassBadge>
            <IconMapPin width={12} height={12} style={{ marginRight: 2 }} />
            Milimani Road, Meru
          </GlassBadge>
        </div>

        {/* CTA row */}
        <div ref={ctaRowRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <a
            ref={primaryBtnRef}
            href="#reserve"
            onClick={scrollToId('reserve')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0b0c10',
              background: '#c9a96e',
              padding: '18px 36px',
              borderRadius: '8px',
              transition: 'transform 0.3s ease',
            }}
          >
            Reserve Table
          </a>

          <a
            ref={secondaryBtnRef}
            href="#menu"
            onClick={scrollToId('menu')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#f0ede6',
              background: 'transparent',
              border: '1.5px solid rgba(240,237,230,0.4)',
              padding: '18px 36px',
              borderRadius: '8px',
              transition: 'background 0.3s ease, border-color 0.3s ease',
            }}
          >
            Explore Menu
          </a>
        </div>
      </div>

      {/* Social icons — right edge */}
      <div
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
        className="hero-social-rail"
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

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '80px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
        className="hero-scroll-indicator"
      >
        <IconArrowDown width={14} height={14} color="rgba(240,237,230,0.35)" />
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
      </div>

      {/* ══════════════ LAYER 6 — Bottom fade into next section ══════════════ */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '160px',
          background: 'linear-gradient(to bottom, transparent 0%, #080808 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
    </section>
  )
}