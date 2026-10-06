import { useId } from 'react'
import { cn } from '@/lib/cn'

/**
 * A hairline divider drawn as a woven zigzag — a quiet nod to the basket
 * lamps that hang over the main room.
 */
export default function WeaveRule({ className }: { className?: string }) {
  const id = useId()

  return (
    <svg aria-hidden="true" className={cn('block h-3 w-full text-brass/45', className)}>
      <defs>
        <pattern id={id} width="14" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 7 7 2l7 5M0 11l7-5 7 5" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill={`url(#${id})`} />
    </svg>
  )
}
