// components/ui/CursorGlow.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * A soft golden radial glow that gently follows the cursor within a
 * limited range (never fully tracks — that reads as gimmicky, not premium).
 * Automatically disabled on touch devices via a hover-capability check.
 */
export default function CursorGlow({ range = 40 }: { range?: number }) {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return
    if (window.matchMedia('(hover: none)').matches) return // skip on touch devices

    const xTo = gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const relX = (e.clientX / innerWidth - 0.5) * 2 // -1 → 1
      const relY = (e.clientY / innerHeight - 0.5) * 2
      xTo(relX * range)
      yTo(relY * range)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [range])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '900px',
        height: '900px',
        marginLeft: '-450px',
        marginTop: '-450px',
        background:
          'radial-gradient(circle, rgba(201,169,110,0.16) 0%, rgba(201,169,110,0.05) 40%, transparent 70%)',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  )
}