// components/ui/TestimonialCard.tsx
//
// Premium floating testimonial card used inside the Experience section.
// Dark translucent glass background, soft gold border — same visual
// language as GlassBadge and MenuCard, scaled up for quote content.

import type { Testimonial } from '@/types/experience'

export default function TestimonialCard({
  testimonial,
  className = '',
}: {
  testimonial: Testimonial
  className?: string
}) {
  return (
    <div className={`exp-testimonial ${className}`}>
      <div className="exp-testimonial-stars" aria-hidden="true">
        ★★★★★
      </div>
      <p className="exp-testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
      <span className="exp-testimonial-name">— {testimonial.name}</span>

      <style jsx>{`
        .exp-testimonial {
          background: rgba(8, 8, 8, 0.55);
          border: 1px solid rgba(201, 169, 110, 0.35);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 4px;
          padding: 24px 26px;
          box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.7);
        }

        .exp-testimonial-stars {
          color: #c9a96e;
          font-size: 13px;
          letter-spacing: 0.15em;
          margin-bottom: 14px;
        }

        .exp-testimonial-quote {
          font-family: var(--font-cormorant), serif;
          font-size: 1.15rem;
          font-weight: 300;
          font-style: italic;
          line-height: 1.5;
          color: #f0ede6;
          margin-bottom: 16px;
        }

        .exp-testimonial-name {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(240, 237, 230, 0.5);
        }
      `}</style>
    </div>
  )
}