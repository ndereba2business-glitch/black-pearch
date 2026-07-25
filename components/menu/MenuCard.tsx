// components/menu/MenuCard.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import MenuBadge from './MenuBadge'
import PriceTag from './PriceTag'
import { DIETARY_TAG_META } from '@/data/menu'
import type { MenuItem } from '@/types/menu'

export default function MenuCard({ item }: { item: MenuItem }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const xTo = useRef<((v: number) => void) | null>(null)
  const yTo = useRef<((v: number) => void) | null>(null)

  // Subtle mouse-parallax on the floating image — same gsap.quickTo
  // pattern used for the Hero background and CursorGlow.
  useEffect(() => {
    if (!imageWrapRef.current) return
    xTo.current = gsap.quickTo(imageWrapRef.current, 'x', {
      duration: 0.6,
      ease: 'power3.out',
    })
    yTo.current = gsap.quickTo(imageWrapRef.current, 'y', {
      duration: 0.6,
      ease: 'power3.out',
    })
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect || !xTo.current || !yTo.current) return
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    xTo.current(relX * 10)
    yTo.current(relY * 8)

    // Cinematic spotlight — follows the cursor very subtly inside the
    // hovered card. Updated imperatively (CSS custom properties) rather
    // than via React state, so it costs nothing extra beyond the parallax
    // update already happening on this same mousemove tick.
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty('--spot-x', `${(relX + 0.5) * 100}%`)
      spotlightRef.current.style.setProperty('--spot-y', `${(relY + 0.5) * 100}%`)
    }
  }

  const handleMouseLeave = () => {
    setHovered(false)
    xTo.current?.(0)
    yTo.current?.(0)
  }

  return (
    <div
      ref={cardRef}
      className="menu-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      data-cursor-hover
    >
      {/* Warm ambient spotlight — sits behind all card content, bleeds
          past the card edges into the dark background. Hover-capable
          devices only; see @media (hover: hover) below. */}
      <div ref={spotlightRef} className="menu-card-spotlight" aria-hidden="true" />

      <div ref={imageWrapRef} className="menu-card-image-wrap">
        {/* Blurred backdrop — a soft, dimmed duplicate of the same photo,
            scaled and blurred. This is what fills the space around the
            main image instead of a hard black bar, so portrait, landscape
            or square source photos all look intentional, never cropped,
            never distorted. */}
        <div
          className="menu-card-image-backdrop"
          style={{ backgroundImage: `url(${item.image})` }}
          aria-hidden="true"
        />
        <div className="menu-card-image-scrim" aria-hidden="true" />

        {/* Main image — object-fit: contain guarantees the full dish,
            plating and composition are always visible, exactly as shot,
            regardless of aspect ratio. */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 28vw"
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className="menu-card-body">
        {item.badge && <MenuBadge type={item.badge} />}

        <h3 className="menu-card-title">{item.title}</h3>
        <p className="menu-card-description">{item.description}</p>

        <div className="menu-card-rating">
          ★★★★★ <span>{item.rating.toFixed(1)}</span>
        </div>

        {item.pairing && (
          <p className="menu-card-pairing">
            Pairs with: <span>{item.pairing}</span>
          </p>
        )}

        {item.dietaryTags && item.dietaryTags.length > 0 && (
          <div className="menu-card-tags">
            {item.dietaryTags.map((tag) => (
              <span key={tag} className="menu-card-tag">
                {DIETARY_TAG_META[tag].icon} {DIETARY_TAG_META[tag].label}
              </span>
            ))}
          </div>
        )}

        <div className="menu-card-footer">
          <PriceTag price={item.price} currency={item.currency} active={hovered} />
          <span className="menu-card-cta">Explore Dish →</span>
        </div>
      </div>

      <style jsx>{`
        .menu-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(240, 237, 230, 0.08);
          border-radius: 4px;
          backdrop-filter: blur(10px);
          padding: 0 28px 32px 28px;
          display: flex;
          flex-direction: column;
          height: 100%;
          filter: brightness(1);
          transition: border-color 0.5s ease, box-shadow 0.5s ease, filter 0.5s ease;
        }
        .menu-card:hover {
          border-color: rgba(201, 169, 110, 0.5);
          box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.7),
            0 0 40px -12px rgba(201, 169, 110, 0.15);
        }

        /* ── Cinematic spotlight ──────────────────────────────────────
           Sits at z-index: -1 inside the (already position: relative)
           .menu-card, so it paints above the card's own faint background
           but behind every normal-flow child (image, text) — nothing is
           ever washed out. It bleeds past the card's own edges to read
           as ambient light rather than a card-bound glow. */
        .menu-card-spotlight {
          position: absolute;
          inset: -18% -14%;
          z-index: -1;
          opacity: 0;
          pointer-events: none;
          background: radial-gradient(
            circle at var(--spot-x, 50%) var(--spot-y, 30%),
            rgba(201, 169, 110, 0.16) 0%,
            rgba(201, 169, 110, 0.07) 35%,
            transparent 65%
          );
          transition: opacity 0.6s ease;
          will-change: opacity;
        }

        /* Hover-capable devices only (desktop/laptop with a mouse).
           Touch devices never get a persistent hover state, so we don't
           try to fake one here — see the (hover: none) block below. */
        @media (hover: hover) and (pointer: fine) {
          .menu-card:hover {
            filter: brightness(1.04);
          }
          .menu-card:hover .menu-card-spotlight {
            opacity: 1;
          }
        }

        /* Touch devices — no spotlight, just a light tap acknowledgement. */
        @media (hover: none) {
          .menu-card:active {
            transform: scale(0.985);
            box-shadow: 0 16px 40px -18px rgba(0, 0, 0, 0.6);
            transition: transform 0.15s ease, box-shadow 0.15s ease;
          }
        }

        .menu-card-image-wrap {
          position: relative;
          width: 88%;
          aspect-ratio: 4 / 3;
          margin: -36px auto 24px auto;
          border-radius: 4px;
          overflow: hidden;
          background: #0c0c0c;
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.6);
          transition: transform 0.5s ease;
          will-change: transform;
        }
        .menu-card:hover .menu-card-image-wrap {
          transform: translateY(-6px) scale(1.03);
        }

        /* Blurred, dimmed duplicate of the dish photo — fills the frame
           behind the (uncropped) main image so there's never a hard
           black letterbox bar, whatever the source photo's orientation. */
        .menu-card-image-backdrop {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: blur(28px) brightness(0.55) saturate(1.15);
          transform: scale(1.2);
        }

        /* Warm scrim over the backdrop so it reads as ambient restaurant
           light rather than a raw blurred photo — ties into the same
           gold accent used by the spotlight and badges. */
        .menu-card-image-scrim {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 45%,
            rgba(8, 8, 8, 0.35) 80%,
            rgba(8, 8, 8, 0.55) 100%
          );
        }

        .menu-card-title {
          font-family: var(--font-cormorant), serif;
          font-size: 1.7rem;
          font-weight: 300;
          color: #f0ede6;
          margin: 14px 0 10px 0;
          line-height: 1.2;
        }

        .menu-card-description {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 13px;
          line-height: 1.75;
          color: rgba(240, 237, 230, 0.5);
          margin-bottom: 16px;
        }

        .menu-card-rating {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 12px;
          color: #c9a96e;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
        }
        .menu-card-rating span {
          color: rgba(240, 237, 230, 0.5);
          margin-left: 6px;
        }

        .menu-card-pairing {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(240, 237, 230, 0.35);
          margin-bottom: 16px;
        }
        .menu-card-pairing span {
          color: #c9a96e;
        }

        .menu-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .menu-card-tag {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 10px;
          letter-spacing: 0.05em;
          color: rgba(240, 237, 230, 0.5);
          border: 1px solid rgba(240, 237, 230, 0.1);
          border-radius: 999px;
          padding: 5px 10px;
          white-space: nowrap;
        }

        .menu-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-top: 1px solid rgba(240, 237, 230, 0.08);
          padding-top: 20px;
        }

        .menu-card-cta {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #c9a96e;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.4s ease, transform 0.4s ease;
          white-space: nowrap;
        }
        .menu-card:hover .menu-card-cta {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </div>
  )
}