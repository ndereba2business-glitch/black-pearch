'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenis } from '@/lib/scroll'

gsap.registerPlugin(ScrollTrigger)

/**
 * The page's entire scroll choreography, mounted once in the root layout:
 *
 *  - `[data-reveal]`   entrance when an element scrolls into view (CSS-driven)
 *  - `[data-parallax]` slow vertical drift of a picture inside its frame
 *  - `[data-drift]`    whole-element drift, in px, for depth between columns
 *  - smooth wheel scrolling and in-page anchor links (Lenis)
 *
 * Everything but the reveals is skipped under prefers-reduced-motion, and the
 * reveals themselves resolve instantly there (see globals.css).
 */
export default function ScrollEffects() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ lerp: 0.11, anchors: true })
      setLenis(lenis)
      lenis.on('scroll', ScrollTrigger.update)

      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -5.5 },
          {
            yPercent: 5.5,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })

      return () => {
        gsap.ticker.remove(tick)
        lenis.destroy()
        setLenis(null)
      }
    })

    // Column drift only where the layout actually has columns.
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 64rem)', () => {
      gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
        const distance = Number(el.dataset.drift) || 0
        gsap.fromTo(
          el,
          { y: distance },
          {
            y: -distance,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      })
    })

    return () => {
      observer.disconnect()
      mm.revert()
    }
  }, [])

  return null
}
