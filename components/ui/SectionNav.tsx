// components/ui/SectionNav.tsx
'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'home', label: '01' },
  { id: 'story', label: '02' },
  { id: 'menu', label: '03' },
  { id: 'gallery', label: '04' },
  { id: 'contact', label: '05' },
]

export default function SectionNav() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="hidden lg:flex"
      style={{
        position: 'fixed',
        right: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '28px',
      }}
    >
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: active === s.id ? '#f0ede6' : 'rgba(240,237,230,0.25)',
            transition: 'color 0.3s ease',
          }}
        >
          {s.label}
          <span
            style={{
              display: 'inline-block',
              width: active === s.id ? '20px' : '0px',
              height: '1px',
              background: '#c9a96e',
              transition: 'width 0.3s ease',
            }}
          />
        </a>
      ))}
    </div>
  )
}