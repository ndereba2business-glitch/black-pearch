'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CalendarCheck, Trees, Lock, Sparkles, Phone } from 'lucide-react'
import { IconClock } from '@/components/ui/icons'
import GlassBadge from '@/components/ui/GlassBadge'
import { magneticHover } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

// ── Reservation copy — edit freely, no structural changes needed ────────
const RESERVATION_BENEFITS = [
  { icon: CalendarCheck, label: 'RSVP for Groups' },
  { icon: Trees, label: 'Sports Screening Nights' },
  { icon: Lock, label: 'Private Events Available' },
  { icon: Sparkles, label: 'Live DJ Nights' },
]

// Phone number confirmed via Space Next Door's public Facebook page (RSVP line).
const RESERVATION_PHONE_DISPLAY = '+254 140 524140'
const RESERVATION_PHONE_TEL = '+254140524140'

// wa.me requires the number in international format with no "+", spaces, or leading zeros.
// TODO (verify): confirm this line also accepts WhatsApp before launch — it's
// currently listed as their RSVP phone number, not confirmed as a WhatsApp number.
const RESERVATION_WHATSAPP_NUMBER = '254140524140'
const RESERVATION_WHATSAPP_MESSAGE =
  "Hi Space Next Door, I'd like to reserve a table."
const RESERVATION_WHATSAPP_URL = `https://wa.me/${RESERVATION_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  RESERVATION_WHATSAPP_MESSAGE
)}`

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const primaryBtnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Reservation headline — line-by-line reveal ─────────────
      const lines = headingRef.current?.querySelectorAll('.line-inner')
      gsap.set(lines || [], { y: '110%' })

      gsap.to(lines || [], {
        y: '0%',
        duration: 1.1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // ── Reservation eyebrow label ───────────────────────────────
      gsap.from('.reserve-label', {
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

      // ── Reservation supporting copy ─────────────────────────────
      gsap.from('.reserve-copy', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reserve-copy',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })

      // ── Benefit list ─────────────────────────────────────────────
      gsap.from('.reserve-benefit-item', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reserve-benefits',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })

      // ── CTA row ──────────────────────────────────────────────────
      gsap.from('.reserve-cta-row', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reserve-cta-row',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })

      // ── Info row ─────────────────────────────────────────────────
      gsap.from('.reserve-info-item', {
        opacity: 0,
        y: 16,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reserve-info-row',
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      })


      // ── Existing footer content (unchanged) ─────────────────────
      gsap.from('.contact-row', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-details',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.footer-row', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-row',
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ── Magnetic hover on the primary CTA ────────────────────────────
  useEffect(() => {
    const cleanup = magneticHover(primaryBtnRef.current, 0.25)
    return () => cleanup && cleanup()
  }, [])

  const infoLabelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-dm-sans), sans-serif',
    fontSize: '12.5px',
    letterSpacing: '0.04em',
    color: 'rgba(240,237,230,0.55)',
  }

  return (
    <section
      ref={sectionRef}
      id="reserve"
      className="contact-section-padding"
      style={{
        position: 'relative',
        width: '100%',
        padding: '160px 80px 60px 80px',
        background: '#080808',
        overflow: 'hidden',
      }}
    >

      {/* ── Eyebrow ──────────────────────────────────────────────── */}
      <div className="reserve-label" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
        <div style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
        <span style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '10px',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#c9a96e',
        }}>
          Reservations
        </span>
      </div>

      {/* ── Reservation: two-column conversion block ────────────── */}
      <div className="reserve-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
        marginBottom: '120px',
      }}>

        {/* ── LEFT — headline, copy, benefits, CTAs, info ───────── */}
        <div>
          <h2
            ref={headingRef}
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(2.8rem, 6vw, 5.6rem)',
              fontWeight: 300,
              color: '#f0ede6',
              lineHeight: 0.98,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="line-inner" style={{ display: 'block' }}>
                RSVP Your
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="line-inner" style={{ display: 'block' }}>
                <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Table.</span>
              </span>
            </span>
          </h2>

          <p
            className="reserve-copy"
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'rgba(240,237,230,0.55)',
              maxWidth: '440px',
              marginBottom: '40px',
            }}
          >
            Whether it&apos;s match day, a group night out, or a private event — get in touch and
            we&apos;ll set you up.
          </p>

          {/* ── Benefits ── */}
          <ul
            className="reserve-benefits"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px 28px',
              listStyle: 'none',
              borderTop: '1px solid rgba(240,237,230,0.08)',
              borderBottom: '1px solid rgba(240,237,230,0.08)',
              padding: '32px 0',
              marginBottom: '40px',
            }}
          >
            {RESERVATION_BENEFITS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="reserve-benefit-item"
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <Icon size={17} color="#c9a96e" strokeWidth={1.5} />
                <span style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '12.5px',
                  letterSpacing: '0.03em',
                  color: 'rgba(240,237,230,0.65)',
                  lineHeight: 1.4,
                }}>
                  {label}
                </span>
              </li>
            ))}
          </ul>

          {/* ── CTAs ── */}
          <div className="reserve-cta-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', marginBottom: '44px' }}>
            <a
              ref={primaryBtnRef}
              href={RESERVATION_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reserve-cta-primary"
              aria-label="RSVP a table via WhatsApp"
            >
              RSVP a Table
            </a>

            <a
              href={`tel:${RESERVATION_PHONE_TEL}`}
              className="reserve-cta-secondary"
              aria-label={`Call us at ${RESERVATION_PHONE_DISPLAY}`}
            >
              <Phone size={14} strokeWidth={1.75} style={{ marginRight: '10px' }} />
              Call Us
            </a>
          </div>

          {/* ── Refined info row ── */}
          <div
            className="reserve-info-row"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              borderTop: '1px solid rgba(240,237,230,0.08)',
              paddingTop: '28px',
            }}
          >
            {/* TODO (verify): confirm real opening hours with the client before launch */}
            <div className="reserve-info-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IconClock width={13} height={13} color="rgba(201,169,110,0.8)" />
              <span style={infoLabelStyle}>Call or WhatsApp to Confirm Hours</span>
            </div>
            <div className="reserve-info-item" style={infoLabelStyle}>
              Busiest on Weekend Nights — Arrive Early
            </div>
            <div className="reserve-info-item" style={infoLabelStyle}>
              Private Events &amp; Group Bookings Available
            </div>
          </div>
        </div>

        {/* ── RIGHT — cinematic dining photograph ───────────────── */}
        <div className="reserve-image-wrap">
          <GlassBadge>
            <span style={{ display: 'inline' }}>The Space To Be</span>
          </GlassBadge>

          {/* PLACEHOLDER — drop the real photo at
              /public/images/reservation/space-next-door.jpg and it will
              replace this placeholder automatically — no code changes needed. */}
          <img
            src="/images/reservation/space-next-door.jpg"
            alt="Space Next Door venue photo"
            className="reserve-photo"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="reserve-image-overlay" aria-hidden="true" />
        </div>
      </div>

      {/* ── Existing contact/footer details (unchanged) ──────────── */}
      <div
        className="contact-details"
        style={{
          borderTop: '1px solid rgba(240,237,230,0.08)',
          paddingTop: '48px',
          marginBottom: '120px',
        }}
      >
        <div className="contact-row">
          <p style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.3)',
            marginBottom: '14px',
          }}>
            Based In
          </p>
          <p style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '1.4rem',
            color: '#f0ede6',
            fontWeight: 300,
          }}>
            Nakuru, Kenya
          </p>
        </div>

        <div className="contact-row">
          <p style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.3)',
            marginBottom: '14px',
          }}>
            Availability
          </p>
          <p style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '1.4rem',
            color: '#f0ede6',
            fontWeight: 300,
          }}>
            Call or WhatsApp to Confirm Hours
          </p>
        </div>

        <div className="contact-row">
          <p style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.3)',
            marginBottom: '14px',
          }}>
            Social media
          </p>
          {/* Instagram not yet verified — links to '#' until confirmed. */}
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { label: 'Instagram', href: '#' },
              { label: 'Facebook', href: 'https://www.facebook.com/p/Space-Next-Door-Nakuru-61553804610351/' },
              { label: 'TikTok', href: 'https://www.tiktok.com/@spacenextdoornkr' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href !== '#' ? '_blank' : undefined}
                rel={href !== '#' ? 'noopener noreferrer' : undefined}
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '1.4rem',
                  color: 'rgba(240,237,230,0.5)',
                  fontWeight: 300,
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="footer-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(240,237,230,0.08)',
          paddingTop: '32px',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'rgba(240,237,230,0.25)',
        }}>
          © 2026 Space Next Door. All rights reserved.
        </span>
        <span style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'rgba(240,237,230,0.25)',
        }}>
          Designed & Built with Care
        </span>
      </div>

    </section>
  )
}