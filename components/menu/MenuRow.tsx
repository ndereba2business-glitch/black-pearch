import Image from 'next/image'
import mark from '@/public/images/brand/mark.png'
import { BADGE_LABELS, DIETARY_LABELS, MENU_CURRENCY } from '@/data/menu'
import type { MenuItem } from '@/types/menu'
import { cn } from '@/lib/cn'

type MenuRowProps = {
  item: MenuItem
  active: boolean
  onActivate: () => void
  index: number
}

/** One line of the menu: thumbnail, name, description, notes and price. */
export default function MenuRow({ item, active, onActivate, index }: MenuRowProps) {
  const notes = [
    item.pairing && `Pairs with ${item.pairing}`,
    ...(item.dietaryTags ?? []).map((tag) => DIETARY_LABELS[tag]),
  ].filter(Boolean)

  return (
    <li
      onPointerEnter={onActivate}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
      className="group/row grid animate-rise grid-cols-[4.5rem_1fr] gap-x-5 border-b border-ink/15 py-6 sm:grid-cols-[5.5rem_1fr_auto] sm:gap-x-7 md:py-7"
    >
      <div className="relative row-span-2 aspect-[4/5] self-start overflow-hidden bg-ink/10 sm:row-span-1">
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="88px"
            placeholder="blur"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover/row:scale-105"
            style={{ objectPosition: item.imagePosition }}
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center bg-moss">
            <Image src={mark} alt="" className="h-auto w-9 opacity-80" />
          </span>
        )}
      </div>

      <div className="min-w-0">
        {item.badge && <p className="eyebrow mb-2 text-brass-deep">{BADGE_LABELS[item.badge]}</p>}
        <h3 className={cn('text-display-sm', active && 'lg:italic')}>{item.title}</h3>
        <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink/75">
          {item.description}
        </p>
        {notes.length > 0 && (
          <p className="mt-3 text-[0.8125rem] text-ink/70">{notes.join(' · ')}</p>
        )}
      </div>

      <p className="col-start-2 mt-3 font-display text-[1.125rem] tabular-nums text-ink sm:col-start-3 sm:mt-0 sm:text-right sm:text-[1.25rem]">
        <span className="mr-1.5 font-sans text-[0.6875rem] font-medium tracking-[0.14em] text-ink/70">
          {MENU_CURRENCY}
        </span>
        {item.price.toLocaleString('en-KE')}
      </p>
    </li>
  )
}
