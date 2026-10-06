'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import mark from '@/public/images/brand/mark.png'
import { NAV_LINKS, SITE } from '@/lib/site'
import { lockScroll } from '@/lib/scroll'
import { cn } from '@/lib/cn'

const FOCUSABLE = 'a[href], button:not([disabled])'

export default function Navbar() {
  const rootRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // Solid bar once the page moves; tuck away on the way down, return on the way up.
  useEffect(() => {
    let last = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 24)
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > window.innerHeight * 0.6)
        last = y
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Highlight the link for whichever section sits across the middle of the viewport.
  useEffect(() => {
    const sections = ['#top', ...NAV_LINKS.map((link) => link.href)]
      .map((hash) => document.querySelector<HTMLElement>(hash))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // While the mobile menu is open: freeze the page, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return
    lockScroll(true)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !rootRef.current) return

      const items = Array.from(rootRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      )
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    // The overlay only exists below the desktop breakpoint.
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onBreakpoint = () => desktop.matches && setOpen(false)

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      lockScroll(false)
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [open])

  return (
    <div ref={rootRef}>
      <header
        onFocusCapture={() => setHidden(false)}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color] duration-500 ease-out-expo',
          scrolled || open ? 'border-bone/10 bg-ink/95' : 'border-transparent bg-transparent',
          hidden && !open && '-translate-y-full'
        )}
      >
        <div className="shell flex h-(--header-h) items-center justify-between gap-6">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
            aria-label={`${SITE.name} — back to top`}
          >
            <Image src={mark} alt="" className="h-6 w-auto md:h-7" />
            <span className="font-display text-[1.125rem] leading-none tracking-[-0.01em] md:text-[1.25rem]">
              {SITE.name}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={active === link.href ? 'true' : undefined}
                    className={cn(
                      'link-line text-[0.8125rem] tracking-[0.04em] transition-colors duration-300',
                      active === link.href ? 'text-bone' : 'text-bone/70 hover:text-bone'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={SITE.reserveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 items-center border border-brass/70 px-5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-bone transition-colors duration-300 hover:bg-brass hover:text-ink xs:inline-flex"
            >
              Reserve
              <span className="sr-only"> a table on WhatsApp (opens in a new tab)</span>
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="-mr-2 flex size-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden="true" className="relative block h-2.5 w-6">
                <span
                  className={cn(
                    'absolute inset-x-0 top-0 h-px bg-bone transition-transform duration-500 ease-out-expo',
                    open && 'translate-y-[4.5px] rotate-45'
                  )}
                />
                <span
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-px bg-bone transition-transform duration-500 ease-out-expo',
                    open && '-translate-y-[4.5px] -rotate-45'
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        data-lenis-prevent
        className={cn(
          'fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pt-(--header-h) transition-[clip-path,visibility] duration-700 ease-in-out-quart lg:hidden',
          open ? 'visible [clip-path:inset(0)]' : 'invisible [clip-path:inset(0_0_100%_0)]'
        )}
      >
        <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center py-10">
          <ul>
            {NAV_LINKS.map((link, index) => (
              <li key={link.href} className="overflow-clip border-b border-bone/10">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{ '--i': index } as CSSProperties}
                  className={cn(
                    'block py-4 font-display text-[clamp(2.25rem,11vw,3.5rem)] leading-[1.1] tracking-[-0.02em] transition-transform duration-700 ease-out-expo',
                    open ? 'translate-y-0 delay-[calc(var(--i)*70ms+180ms)]' : 'translate-y-full',
                    active === link.href && 'italic text-brass'
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={cn(
            'shell pb-8 transition-opacity duration-700',
            open ? 'opacity-100 delay-500' : 'opacity-0'
          )}
        >
          <a
            href={SITE.reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-13 items-center justify-center bg-brass text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ink"
          >
            Reserve a table
            <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
          <div className="mt-7 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 text-sm text-bone/70">
            <p>
              {SITE.address.street}, {SITE.address.locality}
              <br />
              {SITE.hours}
            </p>
            <a href={SITE.phone.href} className="link-line text-bone">
              {SITE.phone.display}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
