import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  /** `solid` is the one primary action per view; `outline` supports it. */
  variant?: 'solid' | 'outline'
  /** `dark` sits on ink/moss sections, `light` on the paper-coloured menu. */
  tone?: 'dark' | 'light'
  icon?: ReactNode
  external?: boolean
  className?: string
}

const base =
  'group/btn relative isolate inline-flex min-h-13 items-center justify-center gap-3 overflow-hidden px-7 text-[0.75rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ease-out-expo ' +
  // fill that sweeps up from the bottom edge on hover
  'before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:transition-transform before:duration-500 before:ease-out-expo hover:before:scale-y-100 focus-visible:before:scale-y-100'

const variants = {
  dark: {
    solid: 'bg-brass text-ink before:bg-bone',
    outline:
      'border border-bone/30 text-bone before:bg-bone hover:border-bone hover:text-ink focus-visible:text-ink',
  },
  light: {
    solid: 'bg-ink text-bone before:bg-brass-deep',
    outline:
      'border border-ink/30 text-ink before:bg-ink hover:border-ink hover:text-bone focus-visible:text-bone',
  },
} as const

export default function ButtonLink({
  href,
  children,
  variant = 'solid',
  tone = 'dark',
  icon,
  external = false,
  className,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={cn(base, variants[tone][variant], className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {icon}
      <span>{children}</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}
