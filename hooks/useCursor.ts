// hooks/useCursor.ts
'use client'

import { useEffect, useRef, useState } from 'react'
import { lerp } from '@/lib/cursor-utils'

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  const [isDisabled, setIsDisabled] = useState(false)

  const pos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 })
  const state = useRef({
    scale: 1,
    targetScale: 1,
    opacity: 0,
    targetOpacity: 1,
    scaleY: 1,
    targetScaleY: 1,
    label: '',
    variant: 'default',
  })

  const idleTimer = useRef<NodeJS.Timeout | null>(null)
  const scrollTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Disable on touch / mobile devices or reduced motion preference
    const mediaTouch = window.matchMedia('(pointer: coarse)')
    const mediaReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (mediaTouch.matches || mediaReducedMotion.matches) {
      setIsDisabled(true)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX
      pos.current.targetY = e.clientY
      state.current.targetOpacity = 1

      // Reset idle timer
      if (cursorRef.current) cursorRef.current.classList.remove('cursor-idle')
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => {
        if (cursorRef.current) cursorRef.current.classList.add('cursor-idle')
      }, 2000)

      // Dynamic Element Interaction Detection
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactiveEl = target.closest(
        'a, button, input, textarea, [data-cursor], [role="button"]'
      ) as HTMLElement | null

      if (interactiveEl) {
        const cursorType = interactiveEl.getAttribute('data-cursor') || ''
        const cursorText = interactiveEl.getAttribute('data-cursor-text') || ''

        if (cursorType === 'view' || cursorText) {
          state.current.targetScale = 2.4
          state.current.label = cursorText || 'VIEW'
          state.current.variant = 'view'
        } else if (cursorType === 'reservation' || interactiveEl.getAttribute('href') === '#reserve') {
          state.current.targetScale = 1.6
          state.current.label = ''
          state.current.variant = 'reservation'
        } else if (interactiveEl.tagName === 'INPUT' || interactiveEl.tagName === 'TEXTAREA') {
          state.current.targetScale = 0.6
          state.current.label = ''
          state.current.variant = 'text'
        } else {
          state.current.targetScale = 1.35
          state.current.label = ''
          state.current.variant = 'button'
        }
      } else {
        state.current.targetScale = 1
        state.current.label = ''
        state.current.variant = 'default'
      }
    }

    const handleMouseLeave = () => {
      state.current.targetOpacity = 0
    }

    const handleMouseEnter = () => {
      state.current.targetOpacity = 1
    }

    const handleScroll = () => {
      // Squeeze cursor slightly vertically during fast scrolling
      state.current.targetScaleY = 0.75
      if (scrollTimer.current) clearTimeout(scrollTimer.current)
      scrollTimer.current = setTimeout(() => {
        state.current.targetScaleY = 1
      }, 150)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Animation Loop (rAF)
    let animationFrameId: number

    const render = () => {
      // Smooth inertia (lerp)
      pos.current.x = lerp(pos.current.x, pos.current.targetX, 0.18)
      pos.current.y = lerp(pos.current.y, pos.current.targetY, 0.18)

      state.current.scale = lerp(state.current.scale, state.current.targetScale, 0.15)
      state.current.scaleY = lerp(state.current.scaleY, state.current.targetScaleY, 0.15)
      state.current.opacity = lerp(state.current.opacity, state.current.targetOpacity, 0.1)

      if (cursorRef.current) {
        const x = pos.current.x
        const y = pos.current.y
        const s = state.current.scale
        const sy = state.current.scaleY
        const op = state.current.opacity

        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${s}, ${s * sy})`
        cursorRef.current.style.opacity = op.toFixed(3)
      }

      if (labelRef.current) {
        if (state.current.label) {
          labelRef.current.textContent = state.current.label
          labelRef.current.style.opacity = '1'
        } else {
          labelRef.current.style.opacity = '0'
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('scroll', handleScroll)
      if (idleTimer.current) clearTimeout(idleTimer.current)
      if (scrollTimer.current) clearTimeout(scrollTimer.current)
    }
  }, [])

  return { cursorRef, dotRef, labelRef, isDisabled }
}