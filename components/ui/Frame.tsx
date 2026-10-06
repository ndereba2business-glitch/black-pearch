import Image, { type StaticImageData } from 'next/image'
import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

type FrameProps = {
  image: StaticImageData
  alt: string
  /** Responsive `sizes` hint — keep it honest so the right file is served. */
  sizes: string
  /** Sets the frame's shape, e.g. `aspect-[3/4]`. */
  className?: string
  /** CSS `object-position` for the crop. */
  position?: string
  delay?: number
  preload?: boolean
}

/**
 * A photograph in a fixed-ratio frame. The frame wipes open on scroll and
 * the picture drifts slightly inside it as the page moves (see ScrollEffects).
 */
export default function Frame({
  image,
  alt,
  sizes,
  className,
  position = 'center',
  delay = 0,
  preload = false,
}: FrameProps) {
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined

  return (
    <div data-reveal="mask" className={cn('relative overflow-hidden', className)} style={style}>
      <div data-reveal-inner className="absolute inset-0">
        <div data-parallax className="absolute inset-x-0 -inset-y-[7%]">
          <Image
            src={image}
            alt={alt}
            fill
            sizes={sizes}
            placeholder="blur"
            preload={preload}
            className="object-cover"
            style={{ objectPosition: position }}
          />
        </div>
      </div>
    </div>
  )
}
