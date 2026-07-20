'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FloatingShapes from '@/components/ui/FloatingShapes'
import GlassBadge from '@/components/ui/GlassBadge'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Your', 'Everyday', 'Chill', 'Spot']

const GRAIN = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
  backgroundSize: '200px 200px',
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([lineRef.current, labelRef.current, subRef.current, bottomRef.current], {
        opacity: 0,
      })

      const words = headingRef.current?.querySelectorAll('.word')
      gsap.set(words || [], { y: '110%', opacity: 0 })

      const tl = gsap.timeline({ delay: 0.4 })

      tl.to(lineRef.current, { opacity: 1, scaleX: 1, duration: 1.2, ease: 'power4.inOut' })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to(subRef.current, { opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .to(words || [], { y: '0%', opacity: 1, duration: 1.1, stagger: 0.13, ease: 'power4.out' }, '-=0.2')
        .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')

      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.to(headingRef.current, {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: '10% top', end: '50% top', scrub: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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
        justifyContent: 'center',
      }}
    >
      {/* [VID-HERO-BACKGROUND-LOOP] — 24s muted loop per Hub spec.
          Mobile: swap to [IMG-HERO-MOBILE-VERTICAL] via media query, per doc's data-saving note. */}
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, top: '-20%', bottom: '-20%' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#080808' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(11,12,16,0.6), rgba(11,12,16,0.9))',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, ...GRAIN }} />
      </div>
      <FloatingShapes />

      <div className="hero-content-padding" style={{ position: 'relative', zIndex: 10, padding: '80px 0 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <div
            ref={lineRef}
            style={{ width: '56px', height: '1px', background: '#c9a96e', transform: 'scaleX(1)', transformOrigin: 'left center' }}
          />
          <div ref={labelRef}>
            <GlassBadge>Milimani, Meru</GlassBadge>
          </div>
        </div>

        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '11px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.3)',
            marginBottom: '32px',
          }}
        >
          Open 24/7
        </p>

        <h1
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(3.2rem,9vw,8.5rem)',
            lineHeight: 0.95,
            color: '#f0ede6',
            marginBottom: '64px',
            fontWeight: 300,
          }}
        >
          {WORDS.map((word, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
              <span
                className="word"
                style={{
                  display: 'inline-block',
                  color: i === 2 || i === 3 ? '#c9a96e' : undefined,
                  fontStyle: i === 2 || i === 3 ? 'italic' : undefined,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div ref={bottomRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px', opacity: 0 }}>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '13px',
              color: 'rgba(240,237,230,0.4)',
              maxWidth: '340px',
              lineHeight: 1.7,
            }}
          >
            From daytime coffee meetings and relaxing spa treatments to vibrant family lunches
            and the ultimate nightlife experience.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            
              href="#reserve"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#080808',
                background: '#c9a96e',
                padding: '16px 32px',
                transition: 'transform 0.3s ease',
              }}
            >
              Book a Table
            </a>
            
              href="#pillars"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(240,237,230,0.7)',
                border: '2px solid rgba(240,237,230,0.5)',
                padding: '14px 32px',
              }}
            >
              Explore Our Services
            </a>
          </div>
        </div>
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
        }}
      >
        <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.2)' }}>
          Scroll
        </span>
        <div style={{ width: '1px', height: '56px', background: 'rgba(240,237,230,0.08)', position: 'relative', overflow: 'hidden' }}>
          <div className="animate-scroll-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#c9a96e' }} />
        </div>
      </div>
    </section>
  )
}