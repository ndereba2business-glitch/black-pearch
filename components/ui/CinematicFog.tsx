// components/ui/CinematicFog.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Slow-drifting fog band across the bottom of the hero.
 * Purely decorative — pointer-events disabled, transform-only animation
 * (GPU-accelerated, no layout thrash).
 */
export default function CinematicFog() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layers = containerRef.current?.querySelectorAll<HTMLDivElement>('.fog-layer')
    if (!layers || layers.length === 0) return

    const tweens = Array.from(layers).map((layer, i) =>
      gsap.fromTo(
        layer,
        { xPercent: -10 },
        {
          xPercent: 10,
          duration: 22 + i * 6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      )
    )

    return () => tweens.forEach((t) => t.kill())
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '38%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div
        className="fog-layer"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-20%',
          width: '140%',
          height: '100%',
          background:
            'radial-gradient(ellipse 60% 100% at 30% 100%, rgba(240,237,230,0.10) 0%, transparent 70%)',
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
      />
      <div
        className="fog-layer"
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-30%',
          width: '160%',
          height: '90%',
          background:
            'radial-gradient(ellipse 50% 90% at 70% 100%, rgba(201,169,110,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}