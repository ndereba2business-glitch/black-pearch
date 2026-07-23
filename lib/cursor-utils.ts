// lib/cursor-utils.ts

export interface CursorState {
  x: number
  y: number
  targetX: number
  targetY: number
  scale: number
  targetScale: number
  opacity: number
  targetOpacity: number
  label: string
  isHovered: boolean
  variant: 'default' | 'button' | 'nav' | 'cta' | 'card' | 'view' | 'reservation' | 'text' | 'hidden'
  isScrolling: boolean
  isIdle: boolean
}

/**
 * Calculates magnetic offset for target elements
 */
export function calculateMagneticOffset(
  e: MouseEvent,
  element: HTMLElement,
  threshold = 30,
  strength = 0.25
) {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const distanceX = e.clientX - centerX
  const distanceY = e.clientY - centerY
  const distance = Math.hypot(distanceX, distanceY)

  if (distance < threshold) {
    return {
      x: distanceX * strength,
      y: distanceY * strength,
    }
  }

  return { x: 0, y: 0 }
}

/**
 * Lerp helper function for smooth interpolation
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}