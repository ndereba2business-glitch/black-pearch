// components/sections/Hero.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, MapPin } from 'lucide-react'

// Safe import fallback for FloatingShapes
let FloatingShapes: React.ComponentType = () => null
try {
  FloatingShapes = require('@/components/ui/FloatingShapes').default
} catch (e) {
  // Component not created yet, render null
}

gsap.registerPlugin(ScrollTrigger)

const GRAIN = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
  backgroundSize: '200px 200px',
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([subRef.current, badgesRef.current, ctaRef.current, socialRef.current], {
        opacity: 0,
        y: 20,
      })

      const lines = headingRef.current?.querySelectorAll('.line-inner')
      gsap.set(lines || [], { y: '110%' })

      const tl = gsap.timeline({ delay: 0.3 })

      tl.to(lines || [], {
        y: '0%',
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
      })
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .to(badgesRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .to(socialRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '10% top',
          end: '55% top',
          scrub: true,
        },
      })

      gsap.to(bgRef.current, {
        yPercent: 20,
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

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* ── Background layer ────────────────────────────────── */}
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, top: '-20%', bottom: '-20%' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#080808' }} />
        <img
          src="/hero/black-perch-exterior.jpg"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(11,12,16,0.55) 0%, rgba(11,12,16,0.85) 100%), radial-gradient(ellipse 70% 40% at 60% 0%, rgba(201,169,110,0.13) 0%, transparent 70%)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, ...GRAIN }} />
      </div>

      <FloatingShapes />

      <div
        ref={contentRef}
        className="hero-content-padding"
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 80px 100px 80px',
        }}
      >
        <h1
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(1.9rem, 3.4vw, 3.4rem)',
            lineHeight: 1.2,
            color: '#f0ede6',
            fontWeight: 300,
            marginBottom: '24px',
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
              experience crafted with passion
            </span>
          </span>
        </h1>

        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'rgba(240,237,230,0.55)',
            maxWidth: '460px',
            marginBottom: '28px',
          }}
        >
          — lounge, cafe, spa and sherehe nights, all under one roof in Milimani, Meru.
        </p>

        <div ref={badgesRef} style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {[
            { icon: <Clock size={13} color="#c9a96e" />, label: 'Open 24/7' },
            { icon: <MapPin size={13} color="#c9a96e" />, label: 'Milimani Road, Meru' },
          ].map((badge) => (
            <span
              key={badge.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '999px',
                background: 'rgba(240,237,230,0.04)',
                border: '1px solid rgba(240,237,230,0.1)',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(240,237,230,0.65)',
              }}
            >
              {badge.icon}
              {badge.label}
            </span>
          ))}
        </div>

        <div ref={ctaRef}>
          <a
            href="#reservations"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#0B0C10',
              background: '#c9a96e',
              padding: '18px 40px',
              borderRadius: '8px',
              transition: 'transform 0.3s ease',
            }}
          >
            Reserve a Table
          </a>
        </div>
      </div>

      <div
        ref={socialRef}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          zIndex: 10,
        }}
      >
        {['IG', 'FB', 'TT'].map((s, i) => (
          <span key={s} style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <a
              href="#"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'rgba(240,237,230,0.4)',
              }}
            >
              {s}
            </a>
            {i < 2 && <span style={{ color: 'rgba(240,237,230,0.2)' }}>|</span>}
          </span>
        ))}
        <span style={{ width: '40px', height: '1px', background: 'rgba(240,237,230,0.15)', marginLeft: '8px' }} />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '9px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.25)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '56px',
            background: 'rgba(240,237,230,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            className="animate-scroll-line"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#c9a96e' }}
          />
        </div>
      </div>
    </section>
  )
}