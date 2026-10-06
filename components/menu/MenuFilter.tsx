'use client'

import { useRef, type KeyboardEvent } from 'react'
import { CATEGORY_LABELS, MENU_CATEGORIES } from '@/data/menu'
import type { MenuFilterCategory } from '@/types/menu'
import { cn } from '@/lib/cn'

type MenuFilterProps = {
  active: MenuFilterCategory
  onChange: (category: MenuFilterCategory) => void
  /** id of the tabpanel these tabs control. */
  panelId: string
}

/** Category tabs for the menu, with roving focus and arrow-key support. */
export default function MenuFilter({ active, onChange, panelId }: MenuFilterProps) {
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = MENU_CATEGORIES.indexOf(active)
    const last = MENU_CATEGORIES.length - 1
    const next =
      event.key === 'ArrowRight'
        ? (current + 1) % MENU_CATEGORIES.length
        : event.key === 'ArrowLeft'
          ? (current + last) % MENU_CATEGORIES.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1
    if (next === -1) return

    event.preventDefault()
    onChange(MENU_CATEGORIES[next])
    tabsRef.current[next]?.focus()
    tabsRef.current[next]?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }

  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      onKeyDown={onKeyDown}
      className="no-scrollbar -mx-(--gutter) flex gap-x-8 overflow-x-auto border-b border-ink/15 px-(--gutter) md:mx-0 md:gap-x-10 md:px-0"
    >
      {MENU_CATEGORIES.map((category, index) => {
        const selected = active === category
        return (
          <button
            key={category}
            ref={(el) => {
              tabsRef.current[index] = el
            }}
            type="button"
            role="tab"
            id={`menu-tab-${category}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(category)}
            className={cn(
              'relative min-h-11 shrink-0 cursor-pointer whitespace-nowrap pb-4 pt-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300',
              // sliding underline
              'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-ink after:transition-transform after:duration-500 after:ease-out-expo',
              selected ? 'text-ink after:scale-x-100' : 'text-ink/65 after:scale-x-0 hover:text-ink'
            )}
          >
            {CATEGORY_LABELS[category]}
          </button>
        )
      })}
    </div>
  )
}
