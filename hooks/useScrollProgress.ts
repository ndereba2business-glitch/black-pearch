// hooks/useScrollProgress.ts
'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

/**
 * Returns a 0 → 1 scroll progress value for the given section:
 * 0 when the section's top hits the bottom of the viewport,
 * 1 once the section has fully scrolled past the top.
 *
 * Deliberately dependency-free (no ScrollTrigger) so it's cheap to use
 * for small, isolated effects like tying fog drift speed or glow opacity
 * to scroll position, without adding another ScrollTrigger instance.
 */
export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const total = rect.height + window.innerHeight
      const scrolled = window.innerHeight - rect.top
      const value = Math.min(1, Math.max(0, scrolled / total))
      setProgress(value)
      rafId.current = null
    }

    const onScroll = () => {
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [ref])

  return progress
}