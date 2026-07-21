// lib/animations.ts
//
// Shared GSAP animation helpers. Extracted out of individual components so
// the same cinematic language (reveal timing, easing, magnetic hover) can be
// reused across Hero, future restaurant sections, and other projects.

import { gsap } from 'gsap'

/**
 * Ken Burns hero background reveal:
 * fades in, settles from a slight zoom-in, then holds a very slow
 * continuous scale drift so the frame never feels static.
 */
export function heroImageReveal(el: HTMLElement | null) {
  if (!el) return

  gsap.set(el, { scale: 1.08, opacity: 0 })

  const tl = gsap.timeline()

  tl.to(el, { opacity: 1, duration: 1.6, ease: 'power2.out' })
    .to(el, { scale: 1, duration: 3.2, ease: 'power3.out' }, '<')
    .to(el, {
      scale: 1.045,
      duration: 20,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

  return tl
}

/**
 * Word-reveal for hero headings — upward slide with a blur-removal pass,
 * matching the existing site's line-reveal pattern (see About.tsx / Contact.tsx)
 * but with the added filmic blur-in touch requested for the restaurant hero.
 */
export function heroHeadingReveal(
  words: NodeListOf<Element> | Element[] | null,
  delay = 0
) {
  if (!words) return

  gsap.set(words, { y: '110%', opacity: 0, filter: 'blur(8px)' })

  return gsap.to(words, {
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    duration: 1.2,
    stagger: 0.12,
    ease: 'power4.out',
    delay,
  })
}

/**
 * Standard fade-up used for badges, paragraphs, and CTA rows.
 */
export function fadeUp(el: gsap.TweenTarget, delay = 0, distance = 24) {
  gsap.set(el, { opacity: 0, y: distance })
  return gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    delay,
  })
}

/**
 * Magnetic hover for premium CTA buttons. Returns a cleanup function —
 * call it on unmount / gsap.context revert.
 */
export function magneticHover(el: HTMLElement | null, strength = 0.35) {
  if (!el) return () => {}

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }

  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)

  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  }
}