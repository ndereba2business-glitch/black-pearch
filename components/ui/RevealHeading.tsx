import type { CSSProperties, ReactNode } from 'react'

type RevealHeadingProps = {
  as?: 'h1' | 'h2' | 'h3'
  /** One entry per visual line; each rises out of its own baseline. */
  lines: ReactNode[]
  /** Play on page load (pure CSS) instead of waiting for scroll. */
  onLoad?: boolean
  delay?: number
  id?: string
  className?: string
}

export default function RevealHeading({
  as: Tag = 'h2',
  lines,
  onLoad = false,
  delay = 0,
  id,
  className,
}: RevealHeadingProps) {
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined

  return (
    <Tag id={id} data-reveal="lines" data-on-load={onLoad ? '' : undefined} className={className} style={style}>
      {lines.map((line, index) => (
        <span key={index} className="line">
          <span style={{ '--line': index } as CSSProperties}>{line} </span>
        </span>
      ))}
    </Tag>
  )
}
