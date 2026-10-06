// Inline SVG icons on a shared 24×24 grid. They inherit `currentColor` and
// are decorative by default — pair them with visible text or an aria-label.

import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const stroke = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  )
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  )
}

export function IconWhatsapp(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6L3 21z" />
      <path d="M9 9.2c0 3 2.8 5.8 5.8 5.8.6 0 1.2-.5 1.2-1.1l-1.9-.9-.9.8a4.8 4.8 0 0 1-2.2-2.2l.8-.9-.9-1.9C9.5 8 9 8.6 9 9.2z" />
    </svg>
  )
}

export function IconInstagram(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  )
}

export function IconFacebook(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function IconTiktok(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.3 2.6 2 4.4 4.5 4.7" />
    </svg>
  )
}
