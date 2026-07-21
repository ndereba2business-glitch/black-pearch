// components/ui/AmbientParticles.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Particle {
  left: string
  size: number
  delay: number
  duration: number
}

// Deliberately sparse — 7 embers, not a snowfall. Restraint over spectacle.
const PARTICLES: Particle[] = [
  { left: '8%', size: 3, delay: 0, duration: 9 },
  { left: '22%', size: 2, delay: 1.4, duration: 11 },
  { left: '38%', size: 3, delay: 2.8, duration: 8 },
  { left: '55%', size: 2, delay: 0.6, duration: 10 },
  { left: '68%', size: 3, delay: 3.6, duration: 12 },
  { left: '82%', size: 2, delay: 2, duration: 9.5 },
  { left: '92%', size: 3, delay: 1, duration: 10.5 },
]

/**
 * A handful of slow-floating embers rising from the base of the hero,
 * fading in and out on loop. Kept small and few — this is atmosphere,
 * not a particle-system showcase.
 */
export default function AmbientParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dots = containerRef.current?.querySelectorAll<HTMLSpanElement>('.ember')
    if (!dots) return

    const tweens = Array.from(dots).map((dot, i) => {
      const cfg = PARTICLES[i]
      gsap.set(dot, { opacity: 0, y: 0 })
      return gsap.to(dot, {
        y: -120,
        opacity: 0.6,
        duration: cfg.duration,
        delay: cfg.delay,
        repeat: -1,
        ease: 'sine.inOut',
        yoyo: true,
      })
    })

    return () => tweens.forEach((t) => t.kill())
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="ember"
          style={{
            position: 'absolute',
            bottom: '10%',
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: '#c9a96e',
            boxShadow: '0 0 6px 1px rgba(201,169,110,0.6)',
          }}
        />
      ))}
    </div>
  )
}