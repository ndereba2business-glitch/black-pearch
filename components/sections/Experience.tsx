// components/sections/Experience.tsx
//
// "Experience The Black Perch" — sits between Featured Menu and the
// Brand Heritage / Reservation flow (id="gallery", already linked from
// Navbar.tsx and SectionNav.tsx).
//
// Built from scratch with GSAP + ScrollTrigger (no pre-existing Zoom
// Parallax component in this repo). Uses CSS `position: sticky` for the
// pin effect rather than ScrollTrigger's own `pin: true` — this mirrors
// how every other section in the codebase drives scroll animation
// (trigger + scrub / toggleActions only), so it doesn't introduce a new
// animation pattern alongside the established one.
//
// Desktop/tablet: a calm, restrained "zoom parallax" mosaic — 7 cinematic
// atmosphere shots (not food; Featured Menu already covers the cuisine)
// drift from a subtle zoom (1.10–1.40) down to rest as the section
// scrolls through its pinned stage, with 3 floating testimonial cards
// woven between them.
// Mobile: the mosaic reflows into a static staggered grid (no pin, no
// scrub) via CSS only — same DOM, so no duplicate image requests.

'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TestimonialCard from '@/components/ui/TestimonialCard'
import { EXPERIENCE_IMAGES, EXPERIENCE_TESTIMONIALS } from '@/data/experience'

gsap.registerPlugin(ScrollTrigger)

// Subtle, restrained scale-in values per cell — all within the
// 1.10–1.40 range called for, no aggressive zooming.
const CELL_SCALE_FROM = [1.15, 1.2, 1.3, 1.25, 1.4, 1.1, 1.35]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading + label entrance — identical pattern to every other
      //    section (About.tsx / FeaturedMenu.tsx) ──────────────────────
      const lines = headingRef.current?.querySelectorAll('.line-inner')
      gsap.set(lines || [], { y: '110%' })
      gsap.to(lines || [], {
        y: '0%',
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.exp-label', {
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

      gsap.from('.exp-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      // ── Responsive scroll behaviour ──────────────────────────────────
      const mm = gsap.matchMedia()

      // Desktop + tablet: calm, restrained pinned "zoom parallax".
      mm.add('(min-width: 641px)', () => {
        const cells = gsap.utils.toArray<HTMLElement>('.exp-cell')

        cells.forEach((cell, i) => {
          const from = CELL_SCALE_FROM[i] || 1.2
          gsap.fromTo(
            cell.querySelector('.exp-cell-img'),
            { scale: from, yPercent: i % 2 === 0 ? 4 : -4 },
            {
              scale: 1,
              yPercent: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
              },
            }
          )
        })

        // Testimonials fade upward into view as the pinned stage scrolls
        // through three sequential windows — calm, premium easing via scrub.
        const testimonialRanges: [string, string][] = [
          ['8% top', '35% top'],
          ['38% top', '62% top'],
          ['65% top', '92% top'],
        ]
        gsap.utils.toArray<HTMLElement>('.exp-testimonial-slot').forEach((slot, i) => {
          const range = testimonialRanges[i]
          gsap.fromTo(
            slot,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: range[0],
                end: range[1],
                scrub: 1,
              },
            }
          )
        })

        return () => {
          // gsap.context() below handles killing these ScrollTriggers
        }
      })

      // Mobile: static staggered grid, gentle one-time fade-up reveals,
      // no pin, no scrub — matches the light-touch entrance used
      // elsewhere in the site.
      mm.add('(max-width: 640px)', () => {
        gsap.utils.toArray<HTMLElement>('.exp-cell, .exp-testimonial-slot').forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          })
        })

        return () => {}
      })

      return () => mm.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="section-padding"
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '120px',
        paddingBottom: '120px',
        background: '#080808',
        overflow: 'hidden',
      }}
    >
      <div
        className="exp-label"
        style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}
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
          Experience
        </span>
      </div>

      <h2
        ref={headingRef}
        style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 300,
          color: '#f0ede6',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: '20px',
          maxWidth: '900px',
        }}
      >
        <span style={{ display: 'block', overflow: 'hidden' }}>
          <span className="line-inner" style={{ display: 'block' }}>
            Experience The <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Black Perch</span>
          </span>
        </span>
      </h2>

      <p
        className="exp-subtitle"
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '15px',
          lineHeight: 1.8,
          color: 'rgba(240,237,230,0.5)',
          maxWidth: '560px',
          marginBottom: '72px',
        }}
      >
        Step inside the ambience, energy and unforgettable moments that make every visit
        more than just dinner.
      </p>

      <div className="exp-parallax-wrapper">
        <div ref={stageRef} className="exp-stage">
          {EXPERIENCE_IMAGES.map((image, i) => (
            <div key={image.id} className={`exp-cell exp-cell-${i + 1}`}>
              <div className="exp-cell-img" data-cursor-hover>
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                <div className="exp-cell-overlay" aria-hidden="true" />
              </div>

              {/* Testimonials interleaved in DOM order so mobile's static
                  flow stacks them naturally between images, per spec. */}
              {i === 1 && (
                <div className="exp-testimonial-slot exp-testimonial-slot-1">
                  <TestimonialCard testimonial={EXPERIENCE_TESTIMONIALS[0]} />
                </div>
              )}
              {i === 3 && (
                <div className="exp-testimonial-slot exp-testimonial-slot-2">
                  <TestimonialCard testimonial={EXPERIENCE_TESTIMONIALS[1]} />
                </div>
              )}
              {i === 6 && (
                <div className="exp-testimonial-slot exp-testimonial-slot-3">
                  <TestimonialCard testimonial={EXPERIENCE_TESTIMONIALS[2]} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ── Full-bleed breakout from .section-padding ─────────────── */
        .exp-parallax-wrapper {
          position: relative;
          margin: 0 -80px;
        }
        @media (max-width: 1024px) {
          .exp-parallax-wrapper {
            margin: 0 -48px;
          }
        }
        @media (max-width: 640px) {
          .exp-parallax-wrapper {
            margin: 0;
          }
        }

        /* ── Desktop / tablet: pinned mosaic stage ─────────────────── */
        .exp-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }

        .exp-parallax-wrapper {
          height: 176vh;
        }

        .exp-cell {
          position: absolute;
          border-radius: 6px;
          overflow: hidden;
        }

        .exp-cell-img {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.65);
        }

        .exp-cell-img :global(img) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
          will-change: transform;
        }

        .exp-cell-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 40%,
            rgba(201, 169, 110, 0.22) 0%,
            transparent 65%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        @media (hover: hover) and (pointer: fine) {
          .exp-cell-img:hover :global(img) {
            transform: scale(1.02);
            filter: brightness(1.08) saturate(1.05);
          }
          .exp-cell-img:hover .exp-cell-overlay {
            opacity: 1;
          }
        }

        /* Mosaic positions — desktop */
        .exp-cell-1 {
          width: 36%;
          height: 52%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
        }
        .exp-cell-2 {
          width: 20%;
          height: 26%;
          top: 6%;
          left: 4%;
          z-index: 3;
        }
        .exp-cell-3 {
          width: 18%;
          height: 24%;
          top: 8%;
          right: 5%;
          z-index: 2;
        }
        .exp-cell-4 {
          width: 22%;
          height: 28%;
          bottom: 6%;
          left: 8%;
          z-index: 3;
        }
        .exp-cell-5 {
          width: 20%;
          height: 26%;
          bottom: 5%;
          right: 4%;
          z-index: 2;
        }
        .exp-cell-6 {
          width: 13%;
          height: 18%;
          top: 36%;
          left: 0%;
          z-index: 1;
        }
        .exp-cell-7 {
          width: 13%;
          height: 18%;
          top: 40%;
          right: 0%;
          z-index: 1;
        }

        /* Testimonial slots — desktop: floating over the mosaic */
        .exp-testimonial-slot {
          position: absolute;
          z-index: 10;
          width: 260px;
        }
        .exp-testimonial-slot-1 {
          top: 12%;
          left: 27%;
        }
        .exp-testimonial-slot-2 {
          bottom: 14%;
          right: 27%;
        }
        .exp-testimonial-slot-3 {
          top: 44%;
          left: 25%;
        }

        /* ── Tablet: simplify positioning, keep depth ──────────────── */
        @media (max-width: 1024px) {
          .exp-cell-6,
          .exp-cell-7 {
            display: none;
          }
          .exp-cell-1 {
            width: 46%;
            height: 48%;
          }
          .exp-cell-2 {
            width: 24%;
            height: 24%;
          }
          .exp-cell-3 {
            width: 22%;
            height: 22%;
          }
          .exp-cell-4 {
            width: 26%;
            height: 26%;
          }
          .exp-cell-5 {
            width: 24%;
            height: 24%;
          }
          .exp-testimonial-slot {
            width: 220px;
          }
          .exp-testimonial-slot-1 {
            left: 20%;
          }
          .exp-testimonial-slot-3 {
            left: 18%;
          }
        }

        /* ── Mobile: static staggered grid, no pin, no overlap ─────── */
        @media (max-width: 640px) {
          .exp-parallax-wrapper {
            height: auto;
          }
          .exp-stage {
            position: static;
            height: auto;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 0 24px;
          }
          .exp-cell {
            position: static;
            width: 100% !important;
            height: auto;
          }
          .exp-cell:nth-child(odd) {
            margin-right: 8%;
          }
          .exp-cell:nth-child(even) {
            margin-left: 8%;
          }
          .exp-cell-img {
            aspect-ratio: 4 / 3;
          }
          .exp-testimonial-slot {
            position: static;
            width: 100%;
            margin: 4px 0;
          }
        }
      `}</style>
    </section>
  )
}