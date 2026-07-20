'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE_LINES = ['Your Everyday', 'Chill Spot']
const SUB_PHRASES = ['Coffee By Day.', 'Cocktails By Night.', 'Indulge Always.']

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
  const bgRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([lineRef.current, subRef.current, bottomRef.current], { opacity: 0 })

      const lines = headingRef.current?.querySelectorAll('.line-inner')
      gsap.set(lines || [], { y: '110%' })

      const tl = gsap.timeline({ delay: 0.4 })

      tl.to(lineRef.current, { opacity: 1, scaleX: 1, duration: 1.2, ease: 'power4.inOut' })
        .to(lines || [], { y: '0%', duration: 1.1, stagger: 0.15, ease: 'power4.out' }, '-=0.6')
        .to(subRef.current, { opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')

      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.to(headingRef.current, {
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: '10% top', end: '50% top', scrub: true },
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
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, top: '-15%', bottom: '-15%' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 90% 60% at 50% 20%, rgba(60,48,26,0.35) 0%, transparent 60%), #060605',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(6,6,5,0.97) 0%, rgba(6,6,5,0.55) 45%, rgba(6,6,5,0.75) 100%)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, ...GRAIN }} />
      </div>

      <div
        className="hero-content-padding section-padding"
        style={{ position: 'relative', zIndex: 10, paddingBottom: '140px', maxWidth: '900px' }}
      >
        <div
          ref={lineRef}
          style={{ width: '56px', height: '1px', background: '#c9a96e', transform: 'scaleX(1)', transformOrigin: 'left center', marginBottom: '28px' }}
        />

        <h1
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(2.6rem,6.5vw,5.5rem)',
            lineHeight: 1.05,
            color: '#f0ede6',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
            marginBottom: '32px',
          }}
        >
          {HEADLINE_LINES.map((line, i) => (
            <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
              <span className="line-inner" style={{ display: 'block' }}>{line}</span>
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.55)',
            marginBottom: '48px',
          }}
        >
          {SUB_PHRASES.join('  ')}
        </p>

        <div ref={bottomRef} style={{ opacity: 0 }}>
          <a
            href="#reserve"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#f0ede6',
              border: '1px solid rgba(240,237,230,0.4)',
              padding: '18px 32px',
              transition: 'border-color 0.3s ease, color 0.3s ease',
            }}
          >
            Reserve A Table
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', left: 'clamp(24px, 8%, 80px)', display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10 }}>
        {['IG', 'FB', 'TT'].map((s, i, arr) => (
          <span key={s} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="#" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(240,237,230,0.5)' }}>
              {s}
            </a>
            {i < arr.length - 1 && <span style={{ color: 'rgba(240,237,230,0.2)' }}>|</span>}
          </span>
        ))}
        <span style={{ width: '48px', height: '1px', background: 'rgba(240,237,230,0.2)' }} />
      </div>

      <div style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.35)' }}>
          Scroll
        </span>
        <span style={{ fontSize: '11px', color: 'rgba(240,237,230,0.3)' }}>↓</span>
        <div style={{ width: '1px', height: '40px', background: 'rgba(240,237,230,0.08)', position: 'relative', overflow: 'hidden' }}>
          <div className="animate-scroll-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#c9a96e' }} />
        </div>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', border: '1px solid rgba(240,237,230,0.3)' }} />
      </div>
    </section>
  )
}