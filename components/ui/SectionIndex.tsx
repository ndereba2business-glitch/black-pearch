'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'heritage', label: 'Heritage' },
  { id: 'menu', label: 'Menu' },
  { id: 'reserve', label: 'Reserve' },
]

export default function SectionIndex() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const elements = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === entry.target.id)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="hidden lg:flex flex-col items-end gap-6 fixed right-10 top-1/2 -translate-y-1/2 z-[90]"
      aria-hidden="true"
    >
      {SECTIONS.map((s, i) => {
        const isActive = i === active
        return (
          <div key={s.id} className="flex items-center gap-3">
            <span
              className="font-body text-[11px] tracking-[0.15em] transition-colors duration-500"
              style={{ color: isActive ? '#c9a96e' : 'rgba(240,237,230,0.25)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className="block h-px transition-all duration-500"
              style={{ width: isActive ? '28px' : '0px', background: '#c9a96e' }}
            />
          </div>
        )
      })}
    </div>
  )
}