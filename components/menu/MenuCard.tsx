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
      <div ref={imageWrapRef} className="menu-card-image-wrap">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 28vw"
          style={{ objectFit: 'cover' }}
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
          transition: border-color 0.5s ease, box-shadow 0.5s ease;
        }
        .menu-card:hover {
          border-color: rgba(201, 169, 110, 0.5);
          box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.7),
            0 0 40px -12px rgba(201, 169, 110, 0.15);
        }

        .menu-card-image-wrap {
          position: relative;
          width: 88%;
          aspect-ratio: 4 / 3;
          margin: -36px auto 24px auto;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.6);
          transition: transform 0.5s ease;
          will-change: transform;
        }
        .menu-card:hover .menu-card-image-wrap {
          transform: translateY(-6px) scale(1.03);
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