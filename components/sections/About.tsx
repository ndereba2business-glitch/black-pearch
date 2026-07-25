'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldCheck, Zap, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  {
    icon: ShieldCheck,
    label: 'Absolute Safety',
  },
  {
    icon: Zap,
    label: 'Exceptional Service Speed',
  },
  {
    icon: Users,
    label: 'Deep Local Community Connection',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = statementRef.current?.querySelectorAll('.line-inner')
      gsap.set(lines || [], { y: '110%' })

      gsap.to(lines || [], {
        y: '0%',
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: statementRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.about-label', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.about-copy, .about-cta', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-copy',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.value-item', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-row',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.mosaic-large, .mosaic-small', {
        opacity: 0,
        x: 40,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story-mosaic',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 0',
        background: '#080808',
        overflow: 'hidden',
      }}
    >
      <div
        className="about-label"
        style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}
      >
        <div style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
        <span
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#c9a96e',
          }}
        >
          Our Story
        </span>
      </div>

      {/* ── 2-column: narrative left, mosaic right ─────────────── */}
      <div className="story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
        {/* ── Left: heading + copy + CTA + values ────────────── */}
        <div>
          <h2
            ref={statementRef}
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
              fontWeight: 300,
              color: '#f0ede6',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              marginBottom: '32px',
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="line-inner" style={{ display: 'block' }}>
                Redefining hospitality
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="line-inner" style={{ display: 'block' }}>
                in the heart of <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Mount Kenya</span> —
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="line-inner" style={{ display: 'block', color: 'rgba(240,237,230,0.35)' }}>
                born in Milimani, Meru Town.
              </span>
            </span>
          </h2>

          <p
            className="about-copy"
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'rgba(240,237,230,0.55)',
              maxWidth: '480px',
              marginBottom: '20px',
            }}
          >
            To bridge the gap between premium international luxury standards and local cultural authenticity.
          </p>

          <p
            className="about-copy"
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'rgba(240,237,230,0.55)',
              maxWidth: '480px',
              marginBottom: '40px',
            }}
          >
            The Black Perch emerged from a clear vision: to create a fluid, premium destination that
            effortlessly adapts to your day. We believe that modern life shouldn&apos;t be segmented.
            Your morning remote workspace, your afternoon relaxation hour, and your late-night
            celebration crew all deserve an uncompromised home. Built on the core values of absolute
            safety, exceptional service speed, and deep local community connection, we invite you to
            experience hospitality crafted with intentional luxury.
          </p>

          {/* ── Fixed CTA Tag ── */}
          <a
            href="#"
            className="about-cta"
            style={{
              position: 'relative',
              display: 'inline-block',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c9a96e',
              paddingBottom: '6px',
              marginBottom: '64px',
            }}
          >
            Read Our Full Story
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '1px',
                background: '#c9a96e',
                transform: 'scaleX(1)',
                transformOrigin: 'left center',
              }}
            />
          </a>

          {/* ── Core values ── */}
          <div
            className="values-row"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
              borderTop: '1px solid rgba(240,237,230,0.08)',
              paddingTop: '32px',
            }}
          >
            {VALUES.map((value, i) => {
              const Icon = value.icon
              return (
                <div
                  key={i}
                  className="value-item"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '180px' }}
                >
                  <Icon size={18} color="#c9a96e" strokeWidth={1.5} />
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: '11px',
                      letterSpacing: '0.05em',
                      color: 'rgba(240,237,230,0.6)',
                      lineHeight: 1.4,
                    }}
                  >
                    {value.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Right: image mosaic ── */}
        <div className="story-mosaic" style={{ position: 'relative' }}>
          <div
            className="mosaic-large"
            style={{
              width: '100%',
              aspectRatio: '4 / 3',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #101010 100%)',
              border: '1px dashed rgba(240,237,230,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: 'rgba(240,237,230,0.25)',
                textAlign: 'center',
                padding: '0 24px',
              }}
            >
              [IMG-ABOUT-MOSAIC-LARGE]
              <br />
              Architectural facade at sunset
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div
              className="mosaic-small"
              style={{
                aspectRatio: '1 / 1',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #101010 100%)',
                border: '1px dashed rgba(240,237,230,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '9px',
                  letterSpacing: '0.08em',
                  color: 'rgba(240,237,230,0.25)',
                  textAlign: 'center',
                  padding: '0 12px',
                }}
              >
                [IMG-ABOUT-MOSAIC-SMALL-1]
                <br />
                Chef preparing ingredients
              </span>
            </div>

            <div
              className="mosaic-small"
              style={{
                aspectRatio: '1 / 1',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #101010 100%)',
                border: '1px dashed rgba(240,237,230,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '9px',
                  letterSpacing: '0.08em',
                  color: 'rgba(240,237,230,0.25)',
                  textAlign: 'center',
                  padding: '0 12px',
                }}
              >
                [IMG-ABOUT-MOSAIC-SMALL-2]
                <br />
                Community charity event
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}