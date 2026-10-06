import type { CSSProperties, ElementType, ReactNode } from 'react'

type RevealProps = {
  as?: ElementType
  /** `up` slides and fades, `fade` only fades, `mask` wipes an image frame open. */
  variant?: 'up' | 'fade' | 'mask'
  /** Delay in milliseconds, for staggering siblings. */
  delay?: number
  id?: string
  className?: string
  children: ReactNode
}

/**
 * Marks an element for a scroll-triggered entrance. The animation itself is
 * CSS (see globals.css); ScrollEffects flips it on when the element enters
 * the viewport, so this stays a server component.
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  id,
  className,
  children,
}: RevealProps) {
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined

  return (
    <Tag id={id} data-reveal={variant} className={className} style={style}>
      {children}
    </Tag>
  )
}
