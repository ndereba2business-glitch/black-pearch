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

// TODO: drop real photography into /public/images/about/ using these
// exact filenames, or update the paths below once final assets are ready.
const MOSAIC_IMAGES = {
  large: {
    src: '/images/about/venue-exterior-night.png',
    alt: 'Space Next Door venue exterior at night',
    label: '[IMG-ABOUT-MOSAIC-LARGE]',
    caption: 'Venue exterior at night',
  },
  small1: {
    src: '/images/about/grill-food-prep.png',
    alt: 'Grill and food preparation',
    label: '[IMG-ABOUT-MOSAIC-SMALL-1]',
    caption: 'Grill and food preparation',
  },
  small2: {
    src: '/images/about/live-dj-crowd.png',
    alt: 'Live DJ set with crowd',
    label: '[IMG-ABOUT-MOSAIC-SMALL-2]',
    caption: 'Live DJ / event night',
  },
}

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
      id="story"
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
                Redefining nightlife
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="line-inner" style={{ display: 'block' }}>
                in the heart of <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Nakuru</span> —
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="line-inner" style={{ display: 'block', color: 'rgba(240,237,230,0.35)' }}>
                the former Tuskys building, reborn.
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
            {/* PLACEHOLDER copy — grounded in Space Next Door's own public
                positioning (FB/TikTok). Refine once the client shares their
                preferred brand voice / official description. */}
            Good food, cold drinks, live music and Nakuru&apos;s most electric nightlife — all under
            one roof.
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
            Since opening its doors in February 2024, Space Next Door has grown into a fixture of
            Nakuru&apos;s social calendar — a sports bar and grill by day, and one of the city&apos;s
            go-to nightclub destinations after dark. Whether you&apos;re here for the grill, the game
            on screen, or a night out with friends, it&apos;s one address for however you want to
            spend your evening.
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
          {/* Large mosaic image */}
          <div
            className="mosaic-large"
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4 / 3',
              overflow: 'hidden',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
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
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  color: 'rgba(240,237,230,0.25)',
                  textAlign: 'center',
                  padding: '0 24px',
                }}
              >
                {MOSAIC_IMAGES.large.label}
                <br />
                {MOSAIC_IMAGES.large.caption}
              </span>
            </div>

            <img
              src={MOSAIC_IMAGES.large.src}
              alt={MOSAIC_IMAGES.large.alt}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Small mosaic image 1 */}
            <div
              className="mosaic-small"
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
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
                  {MOSAIC_IMAGES.small1.label}
                  <br />
                  {MOSAIC_IMAGES.small1.caption}
                </span>
              </div>

              <img
                src={MOSAIC_IMAGES.small1.src}
                alt={MOSAIC_IMAGES.small1.alt}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>

            {/* Small mosaic image 2 */}
            <div
              className="mosaic-small"
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
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
                  {MOSAIC_IMAGES.small2.label}
                  <br />
                  {MOSAIC_IMAGES.small2.caption}
                </span>
              </div>

              <img
                src={MOSAIC_IMAGES.small2.src}
                alt={MOSAIC_IMAGES.small2.alt}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}