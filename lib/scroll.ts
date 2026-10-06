import type Lenis from 'lenis'

// The smooth-scroll instance is owned by ScrollEffects; other components
// only ever need to pause it (e.g. while the mobile menu is open).
let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
